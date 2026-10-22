# FLUX.3 course examples

Examples teach structure, not default style. Do not copy their setting, era, aspect ratio, performance, or negative constraints into unrelated work.

## Guided café project — `t2v`

Direction Lock: 8 seconds, 9:16, exactly one middle-aged Thai café owner, exactly one iced coffee, wooden street café at sunrise, eye-level wide then one motivated slow push-in, no dialogue/music, final image with drink foreground and owner behind.

```text
Create an 8-second vertical 9:16 text-to-video scene at a small wooden Thai street café just after sunrise. Exactly one middle-aged Thai café owner, wearing the same simple indigo apron throughout, begins inside the closed shop and opens the two wooden shutters once.

0.0–2.5s — Eye-level wide shot from the quiet pavement. The owner slides both shutters fully open. Soft morning side light enters the shop. Audio: wooden runners, two small birds, and distant light street ambience.

2.5–6.5s — Without a cut, the owner takes exactly one clear iced coffee in the right hand, steps to the counter, and places it once at the front edge. Begin one slow, steady push-in only as the glass moves toward the counter. The ice shifts audibly when the glass makes contact.

6.5–8.0s — The owner releases the glass and remains naturally behind it. Hold the composition for the final half-second: the iced coffee is sharp in the foreground, catching warm morning light, while the owner is stable and softly visible behind it.

Audio: natural wooden shutter movement, ice in one glass, birds, and quiet street ambience. No dialogue, narration, music, extra people, extra cups, logos, readable text, subtitles, abrupt cuts, orbiting camera, identity change, duplicated hands, or object morphing.

Final image: exactly one iced coffee in the foreground and the same owner behind it in the open café, held steady for 0.5 seconds.
```

```json
{
  "mode": "t2v",
  "prompt": "Create an 8-second vertical 9:16 scene at a small wooden Thai street café just after sunrise. Exactly one middle-aged Thai café owner opens the wooden shutters once, then places exactly one iced coffee on the counter. Begin one slow push-in only as the glass moves toward the counter. Audio: shutters, ice, birds, and quiet street ambience; no dialogue or music. Final image: the drink is sharp in the foreground and the same owner is stable behind it, held for 0.5 seconds.",
  "aspect_ratio": "9:16",
  "duration": 8,
  "resolution": "hd",
  "generate_audio": true,
  "safety_tolerance": 2,
  "draft": true
}
```

Reusable pattern: `one visible change + one anchor object + motivated camera + concrete sound sources + named final image`.

## Image-to-video motion pattern

Treat the supplied image as literal. Lock identity and failure-prone geometry, then spend the prompt on what begins moving, what remains fixed, and the endpoint.

```text
Maintain the exact subject identity, clothing, counter geometry, and opening-frame camera position. The owner turns toward the window, lifts the right hand once to open the curtain, and stops with morning light crossing the counter. One slow push-in begins only as the curtain moves. Final image: the owner holds the curtain open while the same counter remains foreground.
```

## Audit example

Overloaded: “In five seconds four people speak, a car explodes, the hero fights three moves, the camera orbits, and a title appears.”

Correction: preserve one core event, reduce to 2–3 beats, give each action an endpoint, or split the idea into multiple clips. Do not compress an impossible action list into smaller text.

## Thai dialogue rule

Keep exact dialogue in Thai script inside the English prompt:

```text
The visible reporter asks warmly in natural Thai: “โตขึ้นอยากเป็นอะไร”
```

Prompt dialogue is not evidence of the generated audio. Verify the actual result before publishing a transcript.

