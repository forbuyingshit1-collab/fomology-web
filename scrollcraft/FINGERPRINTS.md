# Fingerprints

Every site you build with **scroll-craft** gets one row here, appended after it
ships. The registry exists so your next build can prove it is a different page
rather than a re-skin of one you already made.

This file is **yours**. It starts empty on purpose: the gate is about not
repeating *yourself*, so it has nothing to say until you have built something.

The rules and the gate live in the skill's
`references/uniqueness.md`. Short version:

**A new build must differ from EVERY row below on at least 4 of the 6
dimensions.** Four against each row individually, not four on average across the
table. If a planned build fails, change the plan. Never edit a row to make room
for it.

The six dimensions are: **grammar**, **nav treatment**, **hero device**,
**act-sequence shape**, **close pattern**, **signature move**.

Dimension 6 is free, because a signature move is unique by definition. So the
gate really asks for three more out of the remaining five, and a build that
changes only grammar and world will fail it.

---

## The registry

| Build | Grammar | Nav treatment | Hero device | Act-sequence shape | Close pattern | Signature move | World | Port |
|---|---|---|---|---|---|---|---|---|
| fomology-course-ready | Chaptered editorial | Sticky compact masthead; Course live, Lab inert | Typographic title page with idea-to-first-win trace | Flow → showcase reveals → raw evidence → journey → blue count peak → future process | Calm production CTA into ink colophon | Creator Trace | High-key Thai creator editorial | Next.js static export |
| fomology-professional-trust | Chaptered editorial | Sticky compact masthead; Services primary, Course and Lab secondary | Experience-led split with retained motion reel and capability strip | Hero → delivered client proof → paired service pillars → work process → Learn & Create → consultation | Direct Messenger consultation after a substantial non-interactive learning preview | Delivery Trace | Expert-studio editorial built around real responsibility and delivery | Next.js static export |
| fomology-learn-and-make | Custom learning gallery | Floating pill with course entry and named external hiring | Centered Thai invitation surrounded by original-work cards; mobile pair below type | Invitation → practice explorer → available course → field notes → destination pair | Primary course entry beside separate Fastwork hiring card | See it, then learn it: practice selection changes work and learning link together | Clean white, ink, FOMOLOGY red, original project posters | Next.js static export, local :3000 |
| fomology-work-and-learn | Custom case carousel with practice chapters | Floating neutral pill with equal-path entry and named external hiring | Perspective three-case coverflow with original motion, case-specific outcomes, and source disclosures | Case carousel → recorded proof → pinned practice chapters → equal paths → course and reading → equal close | Equally prominent learning and Fastwork commissioning cards | Proof to Path: inspect a case-bound result, explore the practice range, then choose an equal destination | Clean white, ink, FOMOLOGY red, original delivered work | Next.js static export, local :3000 |

*(empty: your first build has nothing to clear, so build whatever the interview
points at. From the second onwards, this table is the constraint.)*

---

## What is taken

Add a bullet here whenever a build claims something a later build should avoid
reusing: a grammar, a nav treatment, a close pattern, a signature move, an
act-count-and-length band. The shared columns are what the next build inherits
as a constraint, so writing them down is the whole point.

- `fomology-course-ready` claims the Chaptered Editorial grammar, compact sticky masthead, typographic title page, colophon close, seven-beat act band, and Creator Trace.
- `fomology-professional-trust` intentionally shares the Chaptered Editorial grammar and compact masthead family, while claiming the experience-led split Hero, delivered-work-first act sequence, paired service pillars, consultation close, and Delivery Trace.
- `fomology-learn-and-make` claims the custom learning-gallery structure, floating pill navigation, peripheral original-work collage, practice-to-learning explorer, and asymmetric learning/Fastwork close. It differs from each previous row on all six dimensions.
- `fomology-work-and-learn` claims the outcome-led depth carousel, inspectable source disclosures, pinned practice chapters, equal learning/commissioning close, and Proof to Path. It intentionally retains the floating-pill navigation family; it differs from each of the first two rows on 6/6 dimensions and from learn-and-make on 5/6.

---

## Appending a row

After shipping, add one line to the table and one bullet to **What is taken** if
the build claimed something new. Fill every column. Say what the build shares
with existing rows.

Rows are append-only. A build that has been superseded stays in the table,
because the space it occupies is still occupied.

---

## Worked example

The skill's author kept a registry of twelve builds across eight page grammars.
If you want to see what a filled-in table looks like, and which shapes tend to
collide, read `EXAMPLES.md` in the scroll-craft repository. Treat it as
illustration only: those rows are somebody else's builds and they do **not**
constrain yours.
