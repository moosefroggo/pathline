# Pathline — Concept Validation Study

*Unmoderated concept comparison · Presence (A) vs Solve-together (B) · recruiter audience*

---

## Overview

### Why we're testing
We made a strong, opinionated bet — **fix the moment of connection, don't automate the funnel** —
and an explicit *counter-bet* we set aside ("solve together"). Before the review, we want to put
both in front of real recruiters and answer three things honestly:

1. **Comprehension** — do recruiters *understand* what Pathline lets them do, with no one explaining it?
2. **Appeal & fit** — which concept feels more useful *and* more realistic inside their actual workflow?
3. **What breaks** — where does each concept lose people, and is our "what we set aside and why"
   story (Solve-together drifts to evaluation, is desktop-leaning, higher-friction) something
   recruiters *also* feel — or did we get it wrong?

The point isn't a statistically significant result. It's to **show independent validation, a
falsifiable bet, and the maturity to surface what didn't work** — which is exactly what a Staff
design review rewards.

### What we're comparing
| | Concept A — **Presence** | Concept B — **Solve-together** |
|---|---|---|
| One-liner | Meet a candidate *live, in an open consented moment* | Work a *real slice of the role* together, fit shows itself |
| Core bet | Presence + consent beats search | Doing-the-work beats talking-about-the-work |
| Fidelity | Clickable iOS flow | Clickable iOS flow (matched) |
| Stimulus | https://nectar-social-prototype.vercel.app/presence.html | https://nectar-social-prototype.vercel.app/explored/solve-together.html |

> Both concepts are now **full clickable prototypes of equal fidelity**, built in the same
> Citron / Sage neo-brutalist design system — so neither is flattered or penalized by polish. The
> root URL (`/`) is an earlier "Warm Signal" build kept as a separate artifact; **use the two URLs
> above for the test.**

### Method
- **Format:** Unmoderated, ~5–7 min, run on **Lyssna or Maze**.
- **Design:** Within-subjects (each person sees both), **order counterbalanced** (half see A first,
  half see B first) to cancel out order bias.
- **Stimuli:** both are live, equal-fidelity clickable prototypes in one shared design system. Run
  each as a short **task** ("click through this and think aloud / then answer") — no storyboard
  workaround needed now that B is a full flow. Keep the *same* task wording for both so the ask is
  symmetric.
- **Audience:** recruiters / in-house talent / founders who hire. Recruited via **own-link share**
  (see *Recruiting* below), not a generic panel.
- **Target n:** 6–10. Reported as directional.

### Honest caveats (state these in the deck — they build credibility, not doubt)
- Small, self-recruited sample → **directional, not significant**.
- Clickable prototypes with mock data, not lived products → measures *concept resonance*, not the
  usability of a shipped, populated flow.
- Recruiters self-selected from a network → some friendliness bias; we counter by asking for the
  *worry/objection* on every concept, not just what they like.

---

## The script

### 0 · Welcome (intro screen)
> You'll look at two early concepts for a mobile hiring app and tell us what you think. About 5
> minutes. There are no right answers and nothing is built yet — we want your honest gut reaction,
> especially what *wouldn't* work for you.

### 1 · Screener (skip if recruiting your own verified recruiters)
1. **Are you involved in hiring or recruiting at your company?**
   - Yes, it's my main job (recruiter / talent) → **continue**
   - Yes, I hire for my own team (manager / founder) → **continue**
   - No → *screen out (or route to a separate "candidate" segment if you want that view)*
2. **In the last 12 months, roughly how many people have you interviewed or screened?**
   *(0 / 1–10 / 11–50 / 50+ — context for segmenting answers, not a gate)*

### 2 · Context (one short card, shown once before either concept)
> Today, recruiters drown in low-signal applications and candidates get ghosted — most applicants
> never hear back. **Pathline is a mobile app for the recruiter side.** It's not trying to make the
> funnel faster. It's trying to fix the *first real conversation* between a recruiter and a
> candidate. Here are two different ideas for doing that.

### 3 · Concept block (run twice — once per concept, order counterbalanced)

> **Stimulus:** give the live prototype URL (A or B per order) with the caption below, and the task:
> *"Tap through this for a minute — start from the notification / the green button — then answer."*
> - **Concept A:** https://nectar-social-prototype.vercel.app/presence.html
> - **Concept B:** https://nectar-social-prototype.vercel.app/explored/solve-together.html

**Concept A caption:** *"A live board of a few candidates who are in an open moment right now and
have opted in. Tap one, see a composed brief (not a resume), and start a 2-minute live moment —
identity is revealed only when you both show up."*

**Concept B caption:** *"Instead of an interview, you and a candidate work a real slice of the role
together for 15 minutes. No grading — fit shows itself in how you think together."*

Ask, per concept — **3 questions only** (keep it short = higher completion):

1. **Comprehension (open, required):** *In your own words, what does this concept let you do?*
   → the single most important answer. We're checking it matches the intent unprompted.
2. **Usefulness (1–5):** *How useful would this be for how you actually hire?* (1 = not useful, 5 = very useful)
   → one number that folds appeal + workflow-fit, so the two concepts are directly comparable.
3. **Biggest worry (open, required):** *What's your biggest worry, or what would stop you using it?*

### 4 · Head-to-head (after both) — **2 questions**
1. **Which would you actually use?** Meet-Live / Solve-Together / Neither *(required)*
2. **Why? (open, required)** — this one open answer carries the qualitative weight (clarity,
   candidate-respect, realism all surface here without separate questions).

---

## What we measure
**8 questions total.** Lean on purpose — an unmoderated test over ~4 min completes far better.

| Signal | Source | Healthy result |
|---|---|---|
| **Comprehension** | Q3.1 open-text, coded match-to-intent | Most describe A as "meet a live, consented candidate"; B as "work together / try the job" |
| **Usefulness** | Q3.2 mean per concept | A ≥ B (our bet: presence fits the real workflow; B is higher-friction) |
| **Preference** | Q4.1 split | A leads, with *reasons* that match our thesis |
| **The "what broke" story** | Q3.3 worries + Q4.2 "why", coded | recurring themes per concept |

### Hypotheses we're trying to falsify
- **H1:** Recruiters comprehend Presence (A) faster/cleaner than Solve-together (B).
- **H2:** A rates higher on *workflow fit* because B reads as evaluation / higher effort / desktop work.
- **H3:** The top worry about A is **liquidity** ("will anyone actually be in a moment?") — the gap
  both our Product Leader and Recruiter reviewers flagged. If recruiters say it too, the deck's
  "here's the real risk and how we'd derisk it" slide writes itself.

If A *loses*, that's not a failure — it's the most interesting slide in the deck. Report it straight.

---

## Recruiting (how to get real recruiters by deadline)

**Fastest persona-accurate path: own-link share (free, no panel).**
Both Lyssna and Maze let you build the test once and get a shareable link. Send it to recruiters you
can reach — LinkedIn DMs, recruiting Slack/Discord communities (e.g. RecruitingBrainfood, HR/TA
groups), and your own network. Real recruiters, no panel thinness, results as fast as people click.

**Panel + screener (paid, optional, for breadth):** Lyssna/Maze panels *can* screen with a
qualifier ("Are you involved in hiring?"), but recruiters are a niche B2B segment — panels are thin,
so you pay per screen-out and may not fill by tonight. Use only if you want volume and have budget.

**Truly verified recruiters at scale:** Respondent.io / User Interviews verify job title — but
that's days, not tonight. Note it as the "how we'd run this properly with time" line.

**Recommendation for the deadline:** own-link share to 6–10 recruiters now; report directional.

---

## Deck usage
One slide: *"I didn't just assert the bet — I tested it."* Show the method, the n, the comprehension
quote that landed, the preference split, and the **one worry that recurred** (likely liquidity).
Then the maturity beat: *"Here's what I'd change / how I'd derisk it with more time."*
