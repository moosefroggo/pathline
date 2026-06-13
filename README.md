# Pathline

**Hiring, in the moment.** A clickable iOS prototype for the recruiter side of Pathline — a two-sided job marketplace built around *the moment two people actually connect*, not the funnel that buries it.

> LinkedIn matches you to a keyword in a static graph. **Pathline matches you to a person in the right moment.**

This repo is a take-home prototype (interviewing for Staff Product Designer at Nectar Social). It's front-end only — **all data is mocked, there is no backend.**

---

## The problem

Hiring today is a collision of two broken modes:

- Candidates apply in idle, low-intent mobile moments → **67%** of applications are now mobile. The result is volume without signal — *"recruiters drown in low-signal applications."*
- Recruiters skim that pile in ~7-second autopilot glances between meetings.
- So **75% of applications get zero response** ("shouting into the void"), and both sides spiral into mutual ghosting.

Meanwhile, generative AI made the resume — and every candidate-*authored* document (cover letter, "why I'm a fit" essay) — **free to generate and therefore worthless as signal.**

Every current tool (LinkedIn, Indeed, the whole YC AI-recruiting wave) is busy **automating that broken funnel** — sourcing, screening, and messaging *faster*. Faster automation just makes the void deeper. Nobody is fixing **the moment of connection itself.** That's Pathline.

---

## The wedge

Pathline only does one thing: it connects a recruiter to a candidate **when both are present, opted-in, and in the right moment** — and makes that connection *live*. Two ideas carry it:

1. **Presence over volume.** You don't browse 847 résumés. You see the few people in an *open moment* right now, with a live window that's perishable (borrowed from how dating apps use "recently active").
2. **The unit of signal isn't authored text — it's un-fakeable.** Because AI killed written signal, Pathline never asks candidates to *write* a pitch. Credibility comes from three things AI can't generate:
   - **Behavioral liveness** — active now, response time, show-up rate.
   - **Verified facts — provenance without paperwork.** No résumés, no paystubs, no background checks. Just one-tap **work-email** confirmation, **OAuth-connected** things they already own (GitHub, a linked product/portfolio URL), and **peer vouches** (double opt-in). Every signal shows its source.
   - **The live conversation itself** — you talk to the real person, unscripted; an AI-generated profile collapses the moment it has to show up and speak.

---

## Who it's for

The **recruiter / hiring side**. The demo persona is *Dana, founding hiring lead at Vela (a Series A startup), hiring her first Staff Product Engineer.* Everything is framed from her phone — because real sourcing happens in the gaps between meetings, on mobile.

---

## Features — the end-to-end flow

The prototype is one tight flow (tap straight through it):

| # | Screen | What it does |
|---|--------|--------------|
| 0 | **Push opener** (lock screen) | A notification — *"A Senior PM just opened a moment for your Staff Product Engineer role · active now"* — establishes the whole thesis in 3 seconds: the right person comes to *you*. |
| 1 | **Presence board** | The home. Header contrast: **"5 open moments right now · vs 847 in your ATS."** Each card is **anonymized** (role + company-type, name locked), with a *live ticking* open-window countdown, a verified **why-now** trigger chip (layoffs / contract ended / lockup expired), behavioral signal, and an "opted in" badge. No search bar, no wall of results — the restraint is the point. |
| 2 | **Moment brief = the profile** | Tap a card. This *is* the profile, Pathline-style — composed, never authored, scoped to this role + moment, identity still locked. Four sections: **Verified** (each line tagged with its source — work email, GitHub, linked URL), **Vouched by peers**, **Track record earned on Pathline** (avg reply, show-up, → onsite), and **Declared** (structured chips — the only thing the candidate "wrote"). CTA: **"Start live moment."** |
| 3 | **Go live** | *"You're both here, right now."* Audio-first (video optional), with the guarantee: unscripted, no prep, you talk to the real person. |
| 4 | **The live moment** | The climax. Ring → connect → **identity unlocks** (the anonymous "Senior PM" becomes a real face and name) → live waveform, a ticking timer, the candidate's spoken line, and a **"Book 15 min"** card. |
| 5 | **Booked** | The payoff: *"You're connected with Maya Chen · Booked."* and the kill stat — **connection made in ~4 min vs. the 75% who never hear back. 0 cold messages sent · 0 résumés read.** |

### Interaction details (the craft)
- **Live ticking countdowns** on every board card (presence is perishable).
- **The identity reveal** at the live moment — anonymity-until-mutual turned into an emotional beat.
- **Audio waveform, pulsing presence dots, ring-out animation, a real running call timer.**
- iOS-native shell: device frame, status bar, dynamic island, bottom tab bar, native bubble/sheet shapes.

---

## Key product & design decisions

See **[DECISIONS.md](DECISIONS.md)** for the load-bearing calls and their rationale (e.g. *intent-as-input not candidates-as-output*; *cap on commitment & concurrency, never on discovery*; *silence becomes closure*; *don't price time-on-market*). The full reasoning trail — what we discovered, argued about, and resolved — is in **[DESIGN-JOURNAL.md](DESIGN-JOURNAL.md)**.

- **Who initiates?** The recruiter — but **only into an open, consented moment.** It's never a cold message.
- **What replaces the résumé?** The verified + behavioral + live signal above. Not authored prose.
- **Transparency stance.** Salary band shown upfront, consent made a visible UI element, declared intent in the open.
- **Anonymity.** Anonymized until the moment is mutual — protects passive candidates (70% of the workforce) and makes the reveal the emotional climax. There is **no public profile page**.
- **Cold-start (faking a marketplace honestly).** Seed **one narrow, dense vertical** (here: Series A startups hiring product/eng) and show depth *there*, concierge-style — never a thin global board.
- **Deliberately NOT built:** the candidate-side app, a real matching algorithm, auth/messaging infra, ATS integrations, an assessment/evaluation layer (that's Outship's turf), and sourcing across millions (that's the funnel). Pathline owns **only the moment of connection.**

## Why LinkedIn can't just copy it
**Counter-positioning.** Presence + consent *reduces* outreach volume — which cannibalizes LinkedIn's InMail/seat economics — and "I'm looking right now" contradicts their persistent, always-on professional identity. They won't follow without damaging what makes them LinkedIn. The defensible asset isn't the signal (a commodity — see Fiber) but the **consented, in-the-moment, two-sided connection** and the trust graph it builds.

---

## Design system

- **Palette encodes meaning:** warm **cream** canvas, **coral** = brand/action, **teal-green** = presence/live, **amber** = why-now trigger. Deliberately *not* LinkedIn blue.
- **Principles:** Presence over volume · Warmth over efficiency · Consent is visible · The moment is the hero.
- Typography: Inter. Motion: Framer Motion, tasteful and iOS-flavored.

## Tech & running it

- **Stack:** React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion + Tabler icons.
- **Constraints (enforced):** fake data only, no backend; **no inline styles** (Tailwind utilities + one stylesheet); mobile-first inside an iPhone device frame.

```bash
npm install
npm run dev      # open the printed URL (defaults to http://localhost:5173)
npm run build    # production build → dist/
```

Start on the lock screen and tap the notification to begin. **"Replay the demo"** on the final screen resets it.

## What's mocked (honest limitations)
The live moment is a **designed mock — no real WebRTC.** All candidates, signals, vouches, and the live exchange are hardcoded. In a real build, "verified" means lightweight OAuth + work-email confirmation + double-opt-in vouches — never documents — with the live conversation doing the heavy lifting.

## Trust, fraud & known gaps
The hardest open question — *can the live moment and "verified" signal survive real-time deepfakes and state-sponsored fake candidates (DPRK IT workers)?* — is documented honestly in **[THREAT-MODEL.md](THREAT-MODEL.md)**: where the model holds (mass AI-authored noise), where it breaks (sophisticated adversarial fraud), and how Pathline should respond with layered trust rather than a single magic check.
