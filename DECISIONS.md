# Pathline — Key product decisions (log)

A lightweight record of the load-bearing calls and *why*, so the reasoning survives the demo. Newest first.

---

## D-007 · The presence board is a calm, scannable list — signals are lines, not badges

**Context.** The Moments board is the first real surface: a few people in an open moment right now. It briefly grew a 3D-angled, overlapping card stack over a WebGL "presence" shader, with each card boxing its why-now trigger (e.g. "Layoffs at her co confirmed · Jun 10") in a pill.

**Decision.**
- **Board = a flat, flush-aligned, evenly-spaced vertical list.** No 3D cascade, no overlap, no shader.
- **The why-now trigger is an inline signal line** (leading bolt icon + amber text), not a badge. Badges/chips stay reserved for short, enumerable tokens (declared-intent chips, the live "now").

**Why.**
1. **Presence over volume; the moment is the hero.** A leaning deck of overlapping cards hides each card's own signal behind the next one and reads as spectacle — the opposite of "reduce cognitive load." A calm list lets each present person be read in full.
2. **Avoid generic-AI aesthetics.** A decorative WebGL shimmer is exactly the generic-AI flourish the brand avoids; warmth comes from clarity, not effects.
3. **A pill is a token affordance; the trigger is a sentence.** Boxing sentence-length news in a chip can't wrap gracefully, competes with the real chips elsewhere, and created a third left-edge (the pill's inner padding) that broke the card's alignment. As a signal line, the bolt and clock icons form one clean left rail and long triggers can breathe.

**Consequence.** The board stays legible and human at a glance; chip styling now means one thing (short structured tokens), and behavioral signals read as what they are — short human sentences about why this person is here, now.

---

## D-006 · No visible seconds timer in the connection flow

**Context.** The prototype used live second-by-second timers in two places: the candidate cards counted down to a closing window, and the call state counted up during the live intro. That made the flow feel urgent, but also made it feel stressful.

**Decision.** Remove visible seconds from the experience. Keep timing as soft state: "opened 2h ago," "ready for a short intro," and "Live."

**Why.**
1. **Presence should feel calm.** The product is about catching a real person at the right moment, not racing a clock.
2. **A countdown changes behavior.** Recruiters may feel pushed to act fast instead of deciding carefully.
3. **The clock is still product logic, not UI pressure.** Windows can expire in the model, but the interface should show availability as a state, not a ticking threat.

**Consequence.** Pathline keeps the perishable-window idea, but presents it with lower anxiety. The reviewer can still understand scarcity, while the candidate/recruiter experience feels more human.

---

## D-005 · "Solve together" — explored, kept as an *alternative*, not the core

**Context.** Explored a different *shape* of the moment — **"solve, don't sell":** instead of two people talking, they work a **real slice of the role's work together, live**, so fit reveals itself as a *byproduct* (the *"evaluation is the enemy of connection"* principle). Mocked as two screens.

**Decision.** Keep the **low-stakes mobile presence/moment as the core**; carry "solve together" as a **deeper-stage alternative**, not the headline.

**Why (the three-part issue).**
1. **It drifts toward evaluation** — the very thing that kills connection. A shared task quietly becomes "watch me work," and the moment turns into a live **assessment** (Outship's layer, which we excluded).
2. **It's desktop-leaning** — real collaboration (code/design/docs) wants a keyboard and a big screen, which **fights the mobile-first thesis** (mobile is the *capability*, not a style choice — *the device line is the scope line*).
3. **Higher friction** — a 15-min live collab is a much bigger ask than a 2-min moment; it raises the barrier to *first* contact, the opposite of frictionless presence.

**Where it's still good.** As a *later* step (after the moment), for senior/considered roles where chemistry-of-working-together matters — and it's the most **deepfake-proof** signal of all. Documented + mocked as the "here's a direction I explored, the issue I hit, and the deliberate call I made" story.

---

## D-004 · Don't price *time-on-market*; surface *accountability*, not *tenure*

**Context.** Does a long-open role, or a candidate who's been searching a long time, count as signal? Bad signal, or unfair?

**Decision.** Suppress **tenure**; surface **behavioral accountability**.
- **Candidate staleness → not shown.** Time-on-market is a weak, biased, *self-fulfilling* proxy (duration discrimination is well-documented and independent of ability) that creates a doom-loop. **Presence resets the clock** — we judge present intent + verified work + the live moment, not history. Pathline is the **antidote to the staleness loop**: a fair shot for the long-term searcher, who is often a victim of bias.
- **Role staleness → not shown as raw age.** Reframed as **employer accountability** drawn from the SLA/reputation system: *"responds in ~3 days · 0 ghosted · fills 80% of roles."* That protects the candidate with behavioral truth, not a crude counter.

**Distinction.** Suppress *tenure* (biased history); surface *earned behavior* (consented, present, actionable). Reconciles with fraud: a new account still has no *earned track record* (mild caution), but is never penalized for job-search tenure.

**Honest tensions.** Recruiters may want the tenure data — answered human-to-human in the live moment + the consented why-now trigger, not a shaming counter. Gaming is handled by the cap + earned reputation, not a staleness penalty.

---

## D-003 · Turnaround SLAs — "silence becomes closure" (accountability layer, not ATS)

**Context.** Should each funnel stage carry a turnaround-time limit (applied → 48h, interviewed → decision, offered → response)?

**Decision.** Yes — but framed as a **guarantee to the ghosted, not a punishment of the ghoster**: if a clock runs out, the waiting party is **auto-released and notified**. The void cannot structurally happen.
- **On-platform stages** (the moment, first response): **hard SLA** — auto-release + access consequences.
- **Off-platform stages** (interview→decision, offer→response): **accountability by transparency + reputation.** Pathline is the **shared clock + the follow-through reputation score — not the ATS or the enforcer.** Pathline is the *referee, not the field.*

**Defaults** (set transparently; employers publish their own and **compete on responsiveness**): first response **48h**; decision **~5 working days**; offer **~3–5 days** (candidate-favorable, never an exploding offer). Two-sided but **asymmetric** — candidate clocks are lighter, given the power imbalance.

**Honest tensions.** Timeliness ≠ sincerity (lazy auto-rejects beat the clock — you can mandate *a* response, not a *good* one). Scope creep toward an ATS — resolved by owning the **accountability layer** (clock + reputation), not pipeline tooling.

---

## D-002 · Cap on *commitment & concurrency*, never on *discovery*

**Context.** To force real intent and make a *guaranteed-response* promise honorable, Pathline limits activity ("capped moments"). The risk: if we cap how many candidates a recruiter can see, or how many roles a candidate can pursue, we could **miss the best match through artificial scarcity.**

**Decision.** The cap applies to **concurrent, high-cost commitments — live moments *in flight* — not to who is discoverable.**
- **Candidate:** ~3–5 *active* open moments at once. A live moment is high-touch; you can't genuinely be present to fifty. This is a **concurrency limit, not a weekly quota.**
- **Recruiter (per role):** ~5 *active* live-moment slots — which is exactly what makes a guaranteed-response SLA possible. Further high-fit matches **queue**.
- The cap models a **real human constraint** (you can only hold a few genuine conversations at once), not a rationing of talent.

**Why this does *not* "miss the best."**
1. **Discovery is never capped.** The best candidate always surfaces; you simply can't be *live* with everyone simultaneously.
2. **Caps are time-boxed and self-clearing.** Windows expire, slots recycle fast, throughput stays high — the best person is *next*, not *excluded*.
3. **High-fit overrides the cap.** A stronger match is never silently blocked; it pings you — *"a stronger match just went live — swap one of your active moments?"* — so you never lose the best to an arbitrary number.

**Consequence.** The cap is a tool *against the void* (it makes "respond to everyone you engage" feasible and forces intent) — **not a gate against quality.**

---

## D-001 · Intent as input, not candidates as output (AI is invisible plumbing)

**Context.** We considered letting the recruiter "ask the AI to pull candidates" — natural-language sourcing.

**Decision.** Rejected "pull candidates." The recruiter may state their need in natural language, but the system **never returns a pool/list to judge.** It matches intent to **consented, present people** and surfaces a **human moment**.

**Why.**
- **"Pull candidates" is the funnel** — commodity sourcing (Juicebox/PeopleGPT/hireEZ), not the moment of connection. A better candidate-puller is just another late AI sourcing tool.
- **"Pull from a pool" = the scraped-database, non-consensual model** (Fiber's model, which we positioned *against*). Our unit isn't a row — it's a person who **opted into presence**.
- **A list to skim recreates the void** and puts AI in the **opaque-gatekeeper** seat — the exact dystopia we reject.

**The distinction.** Natural-language *intent* as **input** = good. *Candidates pulled from a pool* as **output** = bad. The output is a **consented, present, live moment**, not a pile to evaluate.

> ❌ "AI, pull me candidates" → ranked list from a database → skim → ghost. *(funnel + dystopia)*
> ✅ "Here's who I need" → matched to people present & opted-in right now → one human moment. *(the wedge)*

**Consequence.** **AI is invisible infrastructure** — it quietly matches intent to presence; it is *not* a featured candidate-pulling agent. This resolves the "feature the agent vs. invisible plumbing" fork in favor of **invisible plumbing**. The star of the product is the present, consented human; you are handed *one real person who is here now*, never a pile to judge.
