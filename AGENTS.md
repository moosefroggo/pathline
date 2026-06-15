# Pathline — Project Instructions

Clickable prototype for the Nectar Social take-home (interviewing for **Staff Product Designer**).
Pathline = a two-sided job marketplace; we build the **employer/recruiter** side and demo the
**moment of connection**. Wedge: *fix the moment of connection, don't automate the funnel* —
presence + consent based matching. One-liner: "LinkedIn matches you to a keyword in a static
graph. Pathline matches you to a person in the right moment."

> Product thinking evolves as we pressure-test it. The crisp calls live in `DECISIONS.md`, the full
> reasoning trail in `DESIGN-JOURNAL.md`, and the trust/fraud analysis in `THREAT-MODEL.md`.
> **Where this file conflicts with those, those win.**

## The flow (recruiter POV — persona "Dana", hiring a Staff Product Engineer at Vela)
0. **Push opener** (lock screen) — "Maya just opened a moment for your role · active now" → tap in.
1. **Presence board** — a few candidates in an open moment *right now*. Header contrast: "5 open
   moments · vs 847 in your ATS." Cards are **anonymized** (role + company-type, no name/face),
   with behavioral signal (active now, opened 2h ago, replies ~12 min), light verified chips, and
   "opted in." No wall of results, no search bar.
3. **Moment brief = the profile** — composed, not authored; scoped to this role + moment; identity
   locked. Sections: Verified (with source tags), Vouched by peers, Track record (earned on
   Pathline), Declared intent (structured chips — the only thing the candidate wrote).
4. **Go live** — "you're both here → start a 2-min live moment" (audio-first, video optional).
5. **Live moment** — mocked (no WebRTC): ring → connect → **identity unlocks/reveals** → live
   waveform + timer + controls → "Book 15 min." Closing stat: connection in ~4 min vs 75% void.

## Unit of signal — replaces the resume (core thesis)
The resume is dead because AI made all candidate-*authored* text worthless. So **candidates never
author persuasive prose.** The **load-bearing signal is participation-free** — it needs no third
party and works on day one:
- **Behavioral liveness** — active now, response time, show-up rate, "opened this moment." (passive)
- **Verified facts — provenance without paperwork.** NEVER ask for documents/paystubs/background
  checks. Credibility comes from one-click **work-email magic link** (employer + title, not salary)
  and **OAuth-connecting** things the candidate already owns (GitHub, portfolio, linked URL). Every
  item **shows its source tag**.
- **Declared intent** — structured chips (stage, comp, role); the only thing the candidate writes.
- **The live conversation** — a liveness *layer*, not a guarantee. Real-time deepfakes exist, so
  liveness is **necessary, not sufficient**; heavy identity + anti-deepfake checks are *composed*
  downstream, not built (see `THREAT-MODEL.md`). Trust is layered.

**Enrichment — quality signal, NOT pillars and NOT fraud controls:**
- **Peer vouches** (double opt-in) and **earned track record** add quality and compound as the
  network grows — but they're never relied on for fraud, and a candidate with neither is still
  fully usable. (Why: vouches can't bootstrap, are Sybil-gameable, and depend on third-party
  participation — see `DECISIONS.md` / `DESIGN-JOURNAL.md`.)
- **Anonymized until mutual** — name/face reveal only when both start the live moment (protects
  passive supply + makes the reveal the emotional climax). No public profile page exists.

## Non-negotiable rules
- **Fake data only. No real backend.** No API/network calls, no database, no auth. All state is
  local mock data (`src/data/`) + scripted `setTimeout` timers for the live chat.
- **NO inline styles, ever.** No `style={{}}` props anywhere. Styling = **Tailwind utility classes
  only**; any custom CSS goes in a stylesheet via `@apply` / CSS files — never inline.
- **iOS / mobile-first.** Design to iPhone viewport; render the app inside an **iPhone device frame**.
  iOS patterns: bottom sheets, safe areas, native-feeling transitions, a mocked push notification.
- **Craft is the deliverable.** Design tokens first (type scale, spacing, color, motion). Every
  component needs empty / loading / hover / active / success states. Contrast-checked, focus states.

## Stack
React + Vite + TypeScript + Tailwind; Framer Motion for motion; deploy to Vercel for a hosted link.

## Visual language
Warm, human, trustworthy — **NOT LinkedIn blue.** Nectar accent (amber/coral) + calm neutral base
+ a live/present green. Avoid generic-AI aesthetics. Warmth over efficiency; presence over volume.

## Design principles
Presence over volume · Warmth over efficiency · Consent is visible · The moment is the hero.

## Out of scope (do not build)
Candidate-side app, real matching algorithm, real auth/messaging infra, ATS integrations,
assessment/evaluation layer, sourcing across millions. Pathline owns ONLY the moment of connection.
