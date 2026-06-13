# Pathline — Trust, Fraud & Known Gaps

Pathline's thesis is that AI made *authored* signal (résumés, cover letters) worthless, so we lean on **behavioral liveness + verified facts + the live conversation**. That's the right answer for the *common* case. But a sophisticated adversary can defeat parts of it — and intellectual honesty about that is part of the design. This doc documents where the model holds, where it breaks, and how Pathline should respond.

## Sources that informed this
- **DPRK IT worker threat** — Google Cloud / Mandiant threat intelligence: <https://cloud.google.com/blog/topics/threat-intelligence/mitigating-dprk-it-worker-threat>
- **AI fakers in hiring** — The Pragmatic Engineer (the Vidoc Security case): <https://newsletter.pragmaticengineer.com/p/ai-fakers>
- **"Might be fake" deepfake demos** — Tenfold: <https://thisistenfold.com/mightbefake#videos>

---

## Two very different problems (don't conflate them)

1. **Mass AI-authored noise — the ~95% case.** Everyone now ChatGPTs their résumé, cover letter, and "why I'm a fit" essay. Authored text is dead as signal. **Pathline handles this well by design** — we never ask candidates to author persuasive text; signal is connected/vouched/behavioral/live.
2. **Sophisticated, adversarial, often state-sponsored fraud — the ~5% case.** Real-time deepfakes, stolen real identities, fabricated vouches, facilitator networks. **No current tool fully solves this, and neither does Pathline as designed.** We must not claim we do.

The value of writing this down: it lets us make a *precise* claim ("we beat the common case, we raise the cost of the hard case") instead of an overclaim a sharp founder will puncture.

---

## What the sources actually show

**DPRK IT workers (Mandiant).** Operatives apply to 100% remote roles using **stolen but real identities**; one facilitator alone burned 60+ U.S. identities across 300+ companies for $6.8M+. Tactics: fabricated résumés reused across personas, **fake testimonials using stolen LinkedIn photos**, AI-modified profile pictures, fake portfolio sites (e.g., Netlify), and facilitator networks running **laptop farms, money laundering, and identity-verification using stolen IDs**. Recommended defenses are heavy and downstream: **biometric/notarized identity proof**, camera-on spot checks, VoIP-number checks, and device/network signals (VPN + geo mismatch, KVM devices, mouse-jigglers, laptop serial verification).

**AI fakers (Vidoc / Pragmatic Engineer).** Two candidates used **real-time deepfake masks during live video interviews** — one even passed the technical coding round while masked. Tells were soft (claimed a nationality but didn't speak the language; refused to put a hand in front of the face).

**Tenfold "might be fake."** The blunt update: **the liveness tests that used to work no longer do.** Real-time face replacement + voice cloning is 2025 state-of-the-art; the hand-wave / three-fingers / ear-to-shoulder checks now pass on fakes. *"Deepfake tech has outpaced our ability to spot it visually."*

---

## Where this hits Pathline — the gaps (be specific)

- **Gap 1 — "The live conversation is un-fakeable" is overstated.** Real-time deepfakes can spoof both the live moment *and* the identity reveal. Liveness is now **necessary but not sufficient.** Our README/deck language must soften from "AI collapses on a live call" to "raises the bar; one layer among several."
- **Gap 2 — Verified facts can ride on stolen-but-real identities.** A work-email confirmation, a real GitHub, or a linked portfolio can belong to a hijacked, purchased, or borrowed identity. Verifying *that an account exists* is not verifying *that this human is that account's owner.*
- **Gap 3 — Vouches can be fabricated.** DPRK explicitly uses fake testimonials with stolen photos. A vouch is only worth something if the *voucher* is independently real.
- **Gap 4 — A patient adversary can age an account.** Our "earned track record" is genuinely hostile to fast-hit fraud (a fresh fake has zero earned signal) — but a determined operator can build history over time.
- **Gap 5 — We collect none of the signals that actually catch these ops.** VPN/geo mismatch, VoIP numbers, device/laptop-farm patterns — the things that reliably flag DPRK workers — are nowhere in the current model.

---

## How Pathline should respond — defense in depth (no single magic signal)

1. **Reframe the claim.** Liveness is a *layer*, not a guarantee. Say so out loud — it's more credible, not less.
2. **Treat vouches as signal *quality*, not fraud defense.** The tempting fix — "only count vouches from independently-verified vouchers who have their own track record" — **does not actually work:**
   - **It can't bootstrap (circular).** A voucher only counts if they already have a track record, but at launch nobody does, so the graph has no credible root. This is the perennial web-of-trust failure (PGP never reached critical mass for exactly this reason).
   - **Sybil / collusion.** An adversary who can pass KYC with stolen identities (Gap 2) can stand up a *ring* of mutually-vouching "verified" accounts. Verified-voucher ≠ honest-voucher.
   - **It verifies a relationship, not the live human.** A vouch attests "I worked with this identity"; the deepfake/identity-swap happens *between* the vouch and the call.

   So vouches are a **richer-than-a-résumé quality signal** (great for *matching* and as a defensibility moat) — but **fraud defense must come from Layers A/B + platform trust-&-safety, never the social graph.** Don't sell vouching as anti-fraud.
3. **Reputation gating by time.** Don't let brand-new, history-less accounts surface in "moments." Earned track record as an entry requirement makes fast-hit fraud uneconomical.
4. **Passive trust-&-safety signals, server-side.** Geo/VPN consistency, VoIP detection, device continuity — collected quietly on the backend, **kept off the warm front-end** so the candidate experience stays respectful. This is a trust-&-safety layer, not a UX screen.
5. **Light, mutual liveness cues + a report/flag path.** Subtle, framed as mutual (both sides verified), plus easy reporting and post-moment review. Assume the arms race; design for recovery, not just prevention.
6. **Scope boundary — this is the important one.** **KYC-grade identity** (biometric / notarized ID, the device + onboarding controls Mandiant recommends) belongs at the **offer/onboarding stage, downstream of Pathline's connection moment** — most likely via partner integrations (Persona, background-check vendors), and **explicitly out of scope for this prototype.** Pathline raises *top-of-funnel* trust; it is **not the system of record for legal identity.** Being precise about that boundary is the honest, defensible position.

---

## The trust architecture — what Pathline integrates (and where)

Pathline builds none of this; it **composes identity utilities like Stripe-for-payments.** "KYC" is really three distinct layers — keep them separate, because only one of them touches the deepfake gap above.

**Layer A — Identity verification / KYC.** *"Is this a real, unique human who they claim to be?"* Document + biometric + database checks at signup; defeats **synthetic and stolen** identities.
- Vendors: [Persona](https://www.zyphe.com/resources/blog/identity-verification-software-comparison-2026), Stripe Identity, Onfido/Entrust, Socure, Veriff, Jumio, Sumsub, Trulioo.
- In Pathline: **one-time, candidate-side, at account creation** → a reusable **"verified human"** badge carried into every moment. Kept *off* the recruiter's warm path.
- Vendor note: **Socure** is excellent but oriented to high-volume **fintech / banking / government** fraud (heavy, data-network-driven, US-centric). For an early hiring marketplace, **Persona** (flexible identity infra, visual workflow builder, free tier) or **Stripe Identity** (~$1.50/verification, no minimum) fit better. **Hiring KYC ≠ financial KYC** — favor a light, reusable, candidate-controlled *"verify once, carry everywhere"* model over bank-grade checks at every step.

**Layer B — Liveness / anti-deepfake on the live moment.** *"Is this a present human, not a real-time face-swap?"* This is the category that directly patches **Gap 1**, run passively on the live video stream.
- Vendors: [iProov](https://www.iproov.com/liveness-detection) ("Verified Meetings" — real-time deepfake/presentation-attack analysis + a randomized light-flash presence check), [Reality Defender, AU10TIX, Sensity](https://shuftipro.com/blog/best-deepfake-detection-tools/).
- In Pathline: **passive during the live moment, mutual/symmetric** (both sides verified-live) so it reinforces the warmth brand instead of fighting it. (Gartner 2025: **62% of orgs** hit by a deepfake attack in the prior year.)

**Layer C — Employment / background.** *"Is the work history real?"* — Checkr, HireRight. **Downstream at offer/onboarding; out of Pathline's scope.**

**Who pays:** the employer/recruiter side (matches the revenue model).

**The decision that's actually Pathline's** is not the vendor (an implementation detail) but the **trust architecture**: verify-once reusable identity (A) + mutual liveness on the live moment (B) + web-of-trust vouches + earned track record. That's *"trust as layers, not one magic check,"* made concrete.

---

## The one-liner for the room

> "Pathline beats the 95% problem — AI-authored noise — by design. For the sophisticated 5% (state-grade deepfake fraud, stolen identities), we **raise the cost** but don't claim to eliminate it — that's an industry-wide arms race, and heavyweight identity verification belongs at *onboarding*, not at the *moment of connection*. We're deliberate about that boundary, and we design trust as layers, not a single magic check."

## Status in the prototype
These mitigations are **documented, not built** — the prototype is the happy path. The clearest *design* opportunity worth adding later: make **trust state visible** on the brief — e.g. "3 verified vouchers · 8-month track record" as a confidence signal, versus a cautionary "new account · limited history" / "connecting via VPN · location unverified" state — so the recruiter sees the trust gradient instead of a flat "verified" claim.
