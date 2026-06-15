# Pathline — Design Journal

A running record of the *thinking*: what we **discovered**, what we **argued about**, and how we **resolved** it. Kept because for this take-home the reasoning *is* the deliverable — and this doubles as the "how I used AI / where I pushed back on the model" material for the deck.

Crisp final calls live in [DECISIONS.md](DECISIONS.md); the adversarial/trust analysis in [THREAT-MODEL.md](THREAT-MODEL.md). This file is the *story* of getting there.

---

### 1 · The angle: a behavioral lens, not "AI matching"
- **Discovered.** The two sides of hiring live in opposite *modes* on opposite devices: candidates apply in low-intent mobile moments (67% mobile), recruiters skim in ~7-sec desktop glances → 75% of applications get zero response; timing is the most leveraged variable (contacting in 5 min vs 30 converts 21×).
- **Argued.** The lazy framing was "AI matching." Pushed back — that's the commodity everyone builds.
- **Resolved.** Wedge = *fix the moment of connection, don't automate the funnel.* Presence + consent over volume.

### 2 · The landscape: everyone automates the funnel
- **Discovered.** Four generations (job boards → curated marketplaces → AI-funnel wave → vetted pools). The hot YC wave all makes the *same* broken loop faster. Outship attacks signal (proof-of-work); Fiber sells trigger *signals* as a cheap API.
- **Resolved.** White space = the *moment* itself. And: the signal is a commodity (Fiber) → it can't be the moat.

### 2.5 · The candidate is in market for weeks every few years
- **Argued.** "Presence" assumes overlapping activity, but hiring has brutal base rates vs. dating.
- **Resolved (later).** Redefine presence as *intent window + orchestration*, not spontaneous simultaneity. (See entry 11.)

### 3 · The unit of signal: AI killed authored text
- **Discovered/Argued.** "Are we still using text? The whole problem is AI-generated résumés." Correct — authored, async, persuasive text is dead signal.
- **Resolved.** Candidates never author prose. Signal = behavioral liveness + verified facts + the live conversation.

### 4 · Media & liveness: the medium isn't the cure
- **Argued.** What about audio/video/slides as signal?
- **Discovered.** Async media is *equally* fakeable (Gamma generates decks, HeyGen generates talking heads). What's AI-proof is **liveness**, not the medium.
- **Resolved.** The connection becomes a *live moment*; async media is never collected as signal.

### 5 · The profile: composed, not authored
- **Argued.** "If everything pre-written is fake, what does a profile even look like — or is there one?"
- **Resolved.** The profile *is* the moment brief — composed from verified sources + declared intent, scoped to the role, anonymized until mutual. No public profile page.

### 6 · Verification without paperwork
- **Argued.** "Are we asking candidates for paystubs?" — that's invasive and off-brand.
- **Resolved.** Provenance *without* paperwork: one-tap work-email, OAuth-connect (GitHub/portfolio), peer vouches. Never documents. Every signal shows its source.

### 7 · The fraud reality (the hardest input)
- **Discovered.** DPRK IT workers (stolen-but-real identities, fake testimonials, laptop farms); real-time deepfake masks pass live interviews (Vidoc); the old liveness tests are dead (Tenfold).
- **Argued.** This breaks our strongest claim — "the live conversation is un-fakeable."
- **Resolved.** Liveness is *necessary, not sufficient.* Trust is layered; KYC-grade identity belongs downstream of the moment. → [THREAT-MODEL.md](THREAT-MODEL.md).

### 8 · KYC = three layers we compose, not build
- **Discovered.** "Is it a platform like Socure?" → Socure is one option (fintech-leaning). Layer A = identity (Persona/Stripe/Socure); Layer B = anti-deepfake *liveness* on the live call (iProov); Layer C = background (Checkr). Only Layer B touches our deepfake gap.
- **Resolved.** Pathline composes identity utilities (Stripe-for-payments model), verify-once reusable identity, AI only on the recruiter side later.

### 9 · Vouches fall apart (twice)
- **Argued.** "Independently-verified vouchers with their own track record" — won't work: can't bootstrap (circular), Sybil/collusion, and it verifies a relationship not the live human. *Then:* "this relies on people actively using the platform to vouch."
- **Resolved.** Vouches are *signal quality / enrichment*, never a fraud control and never a pillar. Core signal must be **participation-free**: connected facts + declared intent + presence + the live conversation.

### 10 · The moat crisis
- **Argued.** "The solution feels weak; the moat is diluted now that we know all this."
- **Resolved.** The diluted parts (verification, signal) were *never* the moat — they're commodity + a losing arms race. The real moat is **structural**: counter-positioning vs LinkedIn + niche liquidity + the consented behavioral dataset + a trust brand. The deepfake/AI-spam crisis is a *tailwind for the need*, even as it commoditizes the tech. No tech moat; an executional one — said honestly, that's a *stronger* pitch.

### 11 · Interrogating the wedge
- **Argued.** Is presence/moment even strong enough? Attacks: simultaneity, presence-helps-where-least-needed, live-doesn't-scale, peer-copyability, the Hired/Otta graveyard.
- **Resolved (narrowed).** The wedge survives only focused: considered, high-value hiring of *in-demand/competed-for* talent, one dense niche, "presence" = orchestrated window. A beachhead, not "the LinkedIn killer."

### 12 · Reconsidering the core bet
- **Discovered.** The void = (infinite low-intent volume) × (zero accountability) × (low signal). Presence only attacks the *first* term; the real cause is **accountability**.
- **Argued.** Three candidate bets: reciprocity/ghosting-proof, AI-agent-brokered, candidate-first.
- **Open → leaning.** Reciprocity (accountability) is the most robust and reuses the build; presence demotes to one mechanic.

### 13 · The agent — and its limits
- **Discovered.** Nectar is an *agentic OS for marketing* (autonomous on-brand conversation agents); Bet 2 mirrors it.
- **Argued.** "I don't want any AI to chat with the candidate." → "Why can't the recruiter just ask the AI to pull candidates?"
- **Resolved → [D-001].** Intent-as-*input*, never candidates-as-*output*. AI is **invisible plumbing** that matches intent to consented presence — never a candidate-facing chatbot, never a pull-from-a-pool list (that's the funnel + the dystopia). The star is the present, consented human.

### 14 · The cap
- **Argued.** How do we cap without missing the best candidate?
- **Resolved → [D-002].** Cap *commitment/concurrency* (live moments in flight), never *discovery*. Time-boxed and self-clearing; high-fit overrides the cap ("swap?"). The cap fights the void; it's never a gate against quality.

### 15 · Turnaround SLAs
- **Argued.** Should each stage have a clock (applied→48h, interviewed→decision, offered→response)? Enforceable off-platform?
- **Resolved → [D-003].** Reframe from obligation to **guarantee: silence becomes closure** (auto-release the waiting party). Pathline is the **accountability layer** (shared clock + reputation), not an ATS. Tiered enforcement; employers publish their SLA and compete on it; two-sided but asymmetric.

### 16 · Staleness & tenure
- **Argued.** Role open a long time / candidate on market a long time — bad signal or unfair?
- **Resolved → [D-004].** Suppress *tenure* (a biased, self-fulfilling doom-loop); surface *behavioral accountability* instead. **Presence resets the clock** — Pathline is the antidote to the staleness loop, a fair shot for the long-term searcher.

---

### 17 · Validate it myself + find what doesn't work
- **Argued.** Should we usability-test? A formal test answers the wrong question (usability ≠ strategy) and can't recruit recruiters by Sunday.
- **Resolved.** Run a *self-driven, honestly-caveated* check (unmoderated, Lyssna/Maze) — the point is to *demonstrate independent validation* + surface a "here's what I tried that didn't work" finding, not to get bulletproof data.

### 18 · A wide search for a *truly* different direction
- **Discovered/Argued.** Brainstormed many alternatives: office-hours room, work-together, speed-rounds, reverse-auction, TikTok-duet, voice-notes, problem-first feed, drop-into-the-team. Each was pushed on ("that's just a moment with a tweak").
- **Resolved (mostly set aside).** Most either drift off "the moment of connection," reintroduce evaluation, or fight mobile (below). Kept "solve together" as the one worth mocking.

### 19 · Form factor → "the device line is the scope line"
- **Argued.** "If it's a mobile app, isn't work-together hard?" Yes — real collaboration is a desktop activity.
- **Resolved.** The **mobile/desktop boundary is the same as our scope boundary**: mobile-native = the connection moment (ours); desktop-native = deep evaluation/the funnel (not ours). Work-together fails on *both* axes at once — and that's not a coincidence.

### 20 · Mobile is the *capability*, not the form factor
- **Discovered.** The real thesis: a phone is always-on, in-pocket, camera-in-hand, and *personal* — so it can reach both people *in the moment, anywhere*, and let them connect *now*. Desktop physically can't catch the moment. "Desktop hiring tools are a dime a dozen *because* they're stuck in session-based, lean-in patterns."
- **Resolved.** Counter-positioning, sharpened: the moment of connection is a **mobile-only capability**, not a feature desktop could bolt on.

### 21 · First-principles reset → "evaluation is the enemy"
- **Argued.** "Imagine our solution doesn't exist — start brand new on the moment of connection."
- **Discovered.** Real connection never happens *while being evaluated* (it happens around shared problems, help, genuine interest, trusted intros). **Every hiring moment today — including ours — is secretly an evaluation, so both people perform, and the spark dies.**
- **Resolved (principle).** Design a moment with **zero evaluation**, built around a shared real thing, where **the job is the punchline, not the premise.**

### 22 · The fork under all the circling: two different products
- **Discovered.** A "behavior analyzer that ranks the strongest matches" kept resurfacing — and it's a *different product*: **Product B** (rank-the-best via proof-of-work; Outship/AI-matching turf) vs **Product A** (presence + the moment + *no ranking, no evaluation*). The pull toward B is "the gravity of the obvious."
- **Resolved.** Commit to **Product A** (connection, not analysis). Proof-of-work behavior is welcome only as a *byproduct of the moment*, never as an upfront ranker (consistent with `D-001`).

### 23 · "Solve together" — mocked, then deliberately shelved → `D-005`
- **Resolved.** The evaluation-free "solve, don't sell" shape is genuinely strong, so it's **mocked (2 screens) and documented as an explored alternative** — but kept *out* of the core because it drifts to evaluation, leans desktop, and adds friction. It's the "what I tried that didn't become the core, and why" story.

## Where it landed
- **Core bet — locked: Product A.** The mobile presence/moment is the hero (built). It's an evaluation-free *connection*, not a ranking/analysis engine. Reciprocity/accountability (SLAs, "silence becomes closure") and the *"job is the punchline"* principle are the through-line story; "solve together" is a documented alternative (`D-005`).
- **Mobile is the capability**, not a form factor (Entry 20) — the sharpest version of the wedge.

## Still open
- **Scope boundary** — stay "the connection moment," or own the **accountable relationship through to offer** (bigger product)? Leaning: own the accountability *layer* (clock + reputation), not the ATS. (Entry 15.)
- **Optional build** — whether to add an SLA status-tracker screen and/or mobile-native "ambient presence" touches to the prototype, or keep them as deck/vision.
- **The deck + the self-run validation** — not yet started; the real remaining work before Sunday 8 PM.

---

## My AI workflow on this project

I used AI like a small product studio, not a single generator. I had it act as a researcher, PM, product leader, design leader, brand designer, motion designer, visual designer, copy editor, and implementation partner. The goal was to pressure-test the product from different angles quickly, then use my judgment to decide what stayed.

The most useful pattern was not asking for finished answers. It was using AI to make the work easier to argue with. I would ask for strategy, deck structure, market validation, visual critique, or interface changes, then push back when the output felt too generic, too dramatic, too robotic, too orange, too AI-coded, or too hard to defend.

A few examples of where I pushed back:
- The deck started too dramatic, so I moved it toward simple PM/design language.
- The style drifted away from the Hidden Gem glassmorphic reference, so I forced the app and deck back into that system.
- The product kept drifting toward evaluation and proof-of-work, so I kept returning to the core wedge: fix the moment of connection, not the hiring funnel.
- The countdown timers made the experience feel stressful, so I removed visible seconds and documented the decision.
- The screen transitions were technically smooth but emotionally meaningless, so I changed them to match the intent of each beat.

AI also helped me do the utility work fast: scanning the repo, reducing redundant copy, checking for awkward language, implementing UI changes, running build/lint, doing browser QA, and documenting decisions as the product evolved.

The workflow was iterative: generate, critique, edit, test, document. The model gave me speed and breadth, but the important work was deciding what was strategically true, what felt human, and what I could defend in the review.
