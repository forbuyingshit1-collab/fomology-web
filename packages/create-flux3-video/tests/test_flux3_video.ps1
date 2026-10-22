#requires -version 5.1
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$helper = Join-Path $root "scripts\flux3_video.ps1"
$fixtures = Join-Path $root "tests\fixtures"
$hostExe = (Get-Process -Id $PID).Path
$passed = 0

function Invoke-Case {
    param([string]$Fixture, [int]$ExpectedExit)
    $path = Join-Path $fixtures $Fixture
    $previousErrorAction = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    $output = & $hostExe -NoProfile -NonInteractive -ExecutionPolicy Bypass -File $helper -Payload $path -DryRun 2>&1 | Out-String
    $actual = $LASTEXITCODE
    $ErrorActionPreference = $previousErrorAction
    if ($actual -ne $ExpectedExit) { throw "$Fixture expected exit $ExpectedExit, got $actual`n$output" }
    return $output
}

$sentinel = "BFL_" + "SECRET_MUST_NOT_LEAK"
$env:BFL_API_KEY = $sentinel
foreach ($name in @("valid_t2v.json", "valid_i2v.json", "valid_v2v.json", "valid_draft_enhance.json")) {
    $text = Invoke-Case $name 0
    if ($text -notmatch "DRY RUN") { throw "$name did not report DRY RUN" }
    if ($text -match [regex]::Escape($env:BFL_API_KEY)) { throw "$name leaked BFL_API_KEY" }
    $passed++
}
foreach ($name in @("invalid_draft_resolution.json", "invalid_unknown_field.json", "invalid_v2v_duration.json", "invalid_mode_field.json")) {
    [void](Invoke-Case $name 2)
    $passed++
}
Remove-Item Env:BFL_API_KEY
Write-Host "PowerShell helper tests passed: $passed"
