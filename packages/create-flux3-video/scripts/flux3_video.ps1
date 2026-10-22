#requires -version 5.1
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [ValidateNotNullOrEmpty()]
    [string]$Payload,
    [switch]$DryRun,
    [switch]$Wait,
    [ValidateRange(0.5, 300)]
    [double]$PollSeconds = 5,
    [ValidateRange(1, 10000)]
    [int]$MaxPolls = 180,
    [string]$Output,
    [string]$SaveResult,
    [string]$DraftCacheOutput
)

$ErrorActionPreference = "Stop"
$Endpoint = "https://api.bfl.ai/v1/flux-3-video"
$Ratios = @("auto", "21:9", "2:1", "16:9", "4:3", "1:1", "3:4", "9:16", "9:21")
$Resolutions = @("hd", "fhd", "qhd", "uhd")
$InProgress = @("Pending", "Reasoning", "Generating")
$Terminal = @("Ready", "Task not found", "Request Moderated", "Content Moderated", "Error")

function Test-HasProperty {
    param([object]$Object, [string]$Name)
    return $null -ne $Object.PSObject.Properties[$Name]
}

function Test-WholeNumber {
    param([object]$Value)
    return ($Value -is [byte] -or $Value -is [int16] -or $Value -is [int32] -or $Value -is [int64])
}

function Assert-FluxPayload {
    param([Parameter(Mandatory = $true)][pscustomobject]$Body)

    $modes = @("t2v", "i2v", "v2v", "draft_enhance")
    if ($modes -notcontains $Body.mode) { throw "mode must be t2v, i2v, v2v, or draft_enhance" }
    $mode = [string]$Body.mode

    if ($mode -eq "draft_enhance") {
        $allowed = @("mode", "draft_cache", "resolution", "safety_tolerance")
        if (-not (Test-HasProperty $Body "draft_cache") -or [string]::IsNullOrWhiteSpace([string]$Body.draft_cache)) {
            throw "draft_enhance requires draft_cache"
        }
    }
    else {
        $allowed = @("mode", "prompt", "aspect_ratio", "duration", "resolution", "version", "generate_audio", "safety_tolerance", "draft", "user")
        if (-not (Test-HasProperty $Body "prompt") -or [string]::IsNullOrWhiteSpace([string]$Body.prompt)) {
            throw "$mode requires a non-empty prompt"
        }
        if ($mode -eq "i2v") {
            $allowed += "keyframes"
            if (-not (Test-HasProperty $Body "keyframes")) { throw "i2v requires keyframes" }
            $frames = @($Body.keyframes)
            if ($frames.Count -lt 1 -or $frames.Count -gt 10) { throw "i2v keyframes must contain one to ten images or pairs" }
            $timed = @($frames | ForEach-Object { $_ -is [System.Collections.IList] -and -not ($_ -is [string]) })
            $timedCount = @($timed | Where-Object { $_ }).Count
            if ($timedCount -gt 0 -and $timedCount -ne $frames.Count) { throw "keyframes cannot mix timed pairs and untimed images" }
            if ($timedCount -eq $frames.Count) {
                $previous = -1.0
                foreach ($frame in $frames) {
                    $pair = @($frame)
                    if ($pair.Count -ne 2 -or -not ($pair[0] -is [ValueType]) -or [string]::IsNullOrWhiteSpace([string]$pair[1])) { throw "timed keyframes must be [seconds, image] pairs" }
                    $timestamp = [double]$pair[0]
                    if ($timestamp -lt 0 -or $timestamp -le $previous) { throw "keyframe timestamps must be non-negative and strictly increasing" }
                    if ((Test-HasProperty $Body "duration") -and (Test-WholeNumber $Body.duration) -and $timestamp -gt [double]$Body.duration) { throw "keyframe timestamp cannot exceed duration" }
                    $previous = $timestamp
                }
            }
            else {
                foreach ($frame in $frames) { if (-not ($frame -is [string]) -or [string]::IsNullOrWhiteSpace($frame)) { throw "untimed keyframes must be non-empty image strings" } }
                if ($frames.Count -ge 3 -and ((-not (Test-HasProperty $Body "duration")) -or $Body.duration -eq "auto")) { throw "three or more untimed keyframes require an explicit duration" }
            }
        }
        elseif ($mode -eq "v2v") {
            $allowed += "start_video"
            if (-not (Test-HasProperty $Body "start_video") -or [string]::IsNullOrWhiteSpace([string]$Body.start_video)) { throw "v2v requires start_video" }
        }
    }

    foreach ($property in $Body.PSObject.Properties.Name) {
        if ($allowed -notcontains $property) { throw "field not allowed for ${mode}: $property" }
    }

    $resolution = if (Test-HasProperty $Body "resolution") { [string]$Body.resolution } elseif ($mode -eq "draft_enhance") { "fhd" } else { "hd" }
    if ($Resolutions -notcontains $resolution) { throw "resolution must be hd, fhd, qhd, or uhd" }
    if ($mode -ne "draft_enhance" -and (Test-HasProperty $Body "draft") -and $Body.draft -eq $true -and $resolution -ne "hd") { throw "draft requests must use resolution hd" }

    $safety = if (Test-HasProperty $Body "safety_tolerance") { $Body.safety_tolerance } else { 2 }
    if (-not (Test-WholeNumber $safety) -or [int]$safety -lt 0 -or [int]$safety -gt 4) { throw "safety_tolerance must be an integer from 0 to 4" }

    if ($mode -ne "draft_enhance") {
        $ratio = if (Test-HasProperty $Body "aspect_ratio") { [string]$Body.aspect_ratio } else { "auto" }
        if ($Ratios -notcontains $ratio) { throw "invalid aspect_ratio: $ratio" }
        $duration = if (Test-HasProperty $Body "duration") { $Body.duration } else { "auto" }
        if ($mode -eq "v2v") {
            if (-not (Test-WholeNumber $duration) -or [int]$duration -lt 5 -or [int]$duration -gt 15) { throw "v2v duration must be a whole number from 5 to 15" }
        }
        elseif ($duration -ne "auto" -and (-not (Test-WholeNumber $duration) -or [int]$duration -lt 5 -or [int]$duration -gt 20)) {
            throw "duration must be auto or a whole number from 5 to 20"
        }
        if ((Test-HasProperty $Body "version") -and $Body.version -ne "latest") { throw "version must be latest" }
        if ((Test-HasProperty $Body "generate_audio") -and -not ($Body.generate_audio -is [bool])) { throw "generate_audio must be true or false" }
        if ((Test-HasProperty $Body "draft") -and -not ($Body.draft -is [bool])) { throw "draft must be true or false" }
        if (Test-HasProperty $Body "user") {
            $user = [string]$Body.user
            if ($user.Length -lt 1 -or $user.Length -gt 256) { throw "user must be a string from 1 to 256 characters" }
        }
    }
}

function Convert-MediaValue {
    param([object]$Value, [string]$BaseDirectory)
    if ($Value -is [System.Collections.IList] -and -not ($Value -is [string])) {
        $converted = @()
        foreach ($item in $Value) { $converted += ,(Convert-MediaValue $item $BaseDirectory) }
        return ,$converted
    }
    if (-not ($Value -is [string]) -or $Value.StartsWith("https://") -or $Value.StartsWith("http://")) { return $Value }
    $candidate = $Value
    if (-not [System.IO.Path]::IsPathRooted($candidate)) { $candidate = Join-Path $BaseDirectory $candidate }
    if (Test-Path -LiteralPath $candidate -PathType Leaf) { return [Convert]::ToBase64String([IO.File]::ReadAllBytes((Resolve-Path -LiteralPath $candidate))) }
    return $Value
}

function Convert-PayloadMedia {
    param([pscustomobject]$Body, [string]$BaseDirectory)
    $copy = $Body | ConvertTo-Json -Depth 50 | ConvertFrom-Json
    foreach ($field in @("keyframes", "start_video", "draft_cache")) {
        if (Test-HasProperty $copy $field) { $copy.$field = Convert-MediaValue $copy.$field $BaseDirectory }
    }
    return $copy
}

function Show-FluxSummary {
    param([pscustomobject]$Body)
    Write-Host ""
    Write-Host "FLUX.3 request summary"
    Write-Host "------------------------"
    if ($Body.mode -ne "draft_enhance") { Write-Host "Prompt:`n$($Body.prompt)" } else { Write-Host "Prompt: (preserved by draft cache; no new prompt)" }
    Write-Host "Settings:"
    foreach ($key in @("mode", "duration", "aspect_ratio", "resolution", "generate_audio", "draft", "safety_tolerance")) {
        if (Test-HasProperty $Body $key) { Write-Host "  ${key}: $($Body.$key)" }
        elseif ($key -eq "resolution") { Write-Host "  resolution: $(if ($Body.mode -eq 'draft_enhance') { 'fhd' } else { 'hd' })" }
    }
}

function Get-MaskedApiKey {
    if (-not [string]::IsNullOrWhiteSpace($env:BFL_API_KEY)) { return $env:BFL_API_KEY }
    $secure = Read-Host "BFL API key (masked, session only)" -AsSecureString
    $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    try { return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer) }
    finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer) }
}

function Get-HttpStatus {
    param([System.Management.Automation.ErrorRecord]$ErrorRecord)
    try { return [int]$ErrorRecord.Exception.Response.StatusCode } catch { return 0 }
}

function Invoke-BflJson {
    param([string]$Uri, [string]$ApiKey, [object]$Body, [switch]$RetryRead)
    $attempts = if ($RetryRead -and $null -eq $Body) { 5 } else { 1 }
    for ($attempt = 0; $attempt -lt $attempts; $attempt++) {
        try {
            $headers = @{ "x-key" = $ApiKey; "Accept" = "application/json" }
            if ($null -ne $Body) {
                return Invoke-RestMethod -Uri $Uri -Method Post -Headers $headers -ContentType "application/json" -Body ($Body | ConvertTo-Json -Depth 50 -Compress)
            }
            return Invoke-RestMethod -Uri $Uri -Method Get -Headers $headers
        }
        catch {
            $status = Get-HttpStatus $_
            if ($status -eq 402) { throw "Insufficient BFL credits (HTTP 402). Stop and add credits; no automatic resubmission." }
            if ($status -eq 429 -and $attempt + 1 -lt $attempts) {
                $retryAfter = 0
                try { [void][double]::TryParse($_.Exception.Response.Headers["Retry-After"], [ref]$retryAfter) } catch { $retryAfter = 0 }
                $delay = if ($retryAfter -gt 0 -and $retryAfter -le 60) { $retryAfter } else { [Math]::Min([Math]::Pow(2, $attempt), 30) }
                Start-Sleep -Seconds $delay
                continue
            }
            if ($status -eq 429) { throw "BFL rate limit reached (HTTP 429). Stop; the paid POST will not be resubmitted automatically." }
            throw "BFL request failed (HTTP $status): $($_.Exception.Message). The paid POST will not be resubmitted automatically."
        }
    }
    throw "request failed after bounded retries"
}

function Save-JsonFile {
    param([object]$Value, [string]$Path)
    $fullPath = [IO.Path]::GetFullPath($Path)
    $directory = [IO.Path]::GetDirectoryName($fullPath)
    if ($directory) { [IO.Directory]::CreateDirectory($directory) | Out-Null }
    $Value | ConvertTo-Json -Depth 50 | Set-Content -LiteralPath $fullPath -Encoding UTF8
}

try {
    $payloadPath = (Resolve-Path -LiteralPath $Payload).Path
    $body = Get-Content -LiteralPath $payloadPath -Raw -Encoding UTF8 | ConvertFrom-Json
    Assert-FluxPayload $body
    $prepared = Convert-PayloadMedia $body ([IO.Path]::GetDirectoryName($payloadPath))
    Show-FluxSummary $body

    if ($DryRun) {
        Write-Host ""
        Write-Host "DRY RUN - no API key read; no network request made"
        $printable = $body | ConvertTo-Json -Depth 50 | ConvertFrom-Json
        foreach ($field in @("keyframes", "start_video", "draft_cache")) {
            if ((Test-HasProperty $body $field) -and (($prepared.$field | ConvertTo-Json -Depth 50 -Compress) -ne ($body.$field | ConvertTo-Json -Depth 50 -Compress))) {
                $printable.$field = "<local media encoded as base64 at submission>"
            }
        }
        $printable | ConvertTo-Json -Depth 50
        exit 0
    }

    $approval = Read-Host "Submit this paid generation? [y/N]"
    if ($approval.Trim().ToLowerInvariant() -notin @("y", "yes")) {
        Write-Host "Cancelled - no network request made."
        exit 0
    }

    $apiKey = Get-MaskedApiKey
    if ([string]::IsNullOrWhiteSpace($apiKey)) { throw "BFL_API_KEY is missing; no request was sent" }
    $result = Invoke-BflJson -Uri $Endpoint -ApiKey $apiKey -Body $prepared
    Write-Host "Submitted once. id=$($result.id)"

    if ($Wait) {
        if (-not (Test-HasProperty $result "polling_url") -or -not ([string]$result.polling_url).StartsWith("https://")) { throw "submission response did not include a valid polling_url" }
        $pollingUrl = [string]$result.polling_url
        $finished = $false
        for ($poll = 0; $poll -lt $MaxPolls; $poll++) {
            Start-Sleep -Seconds ([Math]::Max($PollSeconds, 0.5))
            $result = Invoke-BflJson -Uri $pollingUrl -ApiKey $apiKey -Body $null -RetryRead
            $status = [string]$result.status
            Write-Host "status=$status"
            if ($Terminal -contains $status) { $finished = $true; break }
            if ($InProgress -notcontains $status) { throw "unknown BFL status: $status" }
        }
        if (-not $finished) { throw "polling stopped after the configured maximum; no resubmission was made" }
    }

    if ($SaveResult) { Save-JsonFile $result $SaveResult }
    $finalStatus = [string]$result.status
    if ($finalStatus -in @("Request Moderated", "Content Moderated")) { throw "$finalStatus. Stop and review the reason; no automatic resubmission." }
    if ($finalStatus -in @("Error", "Task not found")) { throw "$finalStatus. Keep the result JSON and stop; no automatic resubmission." }

    if ($Output -or $DraftCacheOutput) {
        if ($finalStatus -ne "Ready") { throw "cannot download from non-Ready status: $finalStatus" }
        if ($Output) {
            $videoUrl = [string]$result.result.sample
            if (-not $videoUrl.StartsWith("http")) { throw "Ready response contains no result.sample video URL" }
            $destination = [IO.Path]::GetFullPath($Output)
            [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($destination)) | Out-Null
            Invoke-WebRequest -Uri $videoUrl -OutFile $destination -UseBasicParsing
        }
        if ($DraftCacheOutput) {
            $cacheUrl = [string]$result.result.draft_cache
            if (-not $cacheUrl.StartsWith("http")) { throw "Ready response contains no draft_cache URL" }
            $destination = [IO.Path]::GetFullPath($DraftCacheOutput)
            [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($destination)) | Out-Null
            Invoke-WebRequest -Uri $cacheUrl -OutFile $destination -UseBasicParsing
        }
    }
    exit 0
}
catch {
    [Console]::Error.WriteLine("error: $($_.Exception.Message)")
    exit 2
}
