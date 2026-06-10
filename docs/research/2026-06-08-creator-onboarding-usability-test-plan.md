# Creator Onboarding — Unmoderated Usability Test Plan

**Prototype:** Raptive Community creator application (6-stage flow)
**Live URL:** https://community-ds.vercel.app
**Flow under test:** `entry → gather → review → verify → submit`
**Method:** Unmoderated remote (Useberry)
**Timeline:** 1–2 weeks
**Author:** Miguel Arias
**Date:** 2026-06-08

---

## 1. Background

The prototype is a self-serve creator onboarding flow for Raptive Community. A creator
enters the flow, the system auto-gathers their public creator presence, they review and
correct that data, verify their identity (Instagram DM or creator email), and submit an
application for review.

This is a clickable, front-end-only prototype. The auto-gathered data is **canned** — every
participant sees the same demo creator profile. The plan is designed around that constraint
(see §4, Role-play framing).

---

## 2. Objectives & research questions

| # | Objective | Research questions |
|---|-----------|--------------------|
| O1 | **Usability / friction** | Can a creator complete all 6 steps unaided? Where do they stall, misclick, hesitate, or abandon? Which step has the highest drop-off? |
| O2 | **Trust & willingness** | Do creators trust the auto-gathered data? Do they feel safe verifying via Instagram DM / email and submitting their information? What raises or lowers trust? |
| O3 | **Comprehension of value** | After the entry screen, can a creator articulate what Raptive Community is and why they'd apply? Is the offer clear before they commit effort? |
| O4 | **_[Placeholder — secondary goal TBD]_** | _To be defined. Add the "something else" objective here and its question(s)._ |

**Success thresholds** (targets to evaluate findings against):
- O1: ≥80% task completion per task; no single step with >25% drop-off.
- O2: Mean trust score ≥4.0 / 5 on "I'd be comfortable submitting my real information."
- O3: ≥70% of participants give an accurate, unprompted description of what Raptive Community is.

---

## 3. Method overview

- **Type:** Unmoderated, remote, task-based usability test.
- **Tool:** Useberry, pointed at the live prototype URL (live website / prototype test).
- **Sessions:** Self-directed; participants complete tasks solo with recorded screen, clicks, and timing.
- **Why unmoderated:** Fast to field, scales to a meaningful sample in days, and captures real
  unaided behavior. Trade-off: no live probing — mitigated with structured follow-up questions
  after each task (§6).

---

## 4. Participants & recruiting

- **Target n:** 15–20 completed sessions (recruit ~25 to absorb drop-off and screen-outs).
  - 15+ is the practical floor for stable unmoderated completion-rate and time-on-task numbers.
- **Primary profile:** Active content creators in Raptive's target range — people who run a
  social or content presence (Instagram/blog/YouTube/etc.) and could plausibly monetize.
- **Acceptable proxies (scrappy fallback):** If target creators are hard to source in the window,
  recruit people who actively post/run any online audience. Tag proxy vs. target in results so
  trust/comprehension findings can be weighted.
- **Soft screener questions:**
  1. Do you currently create and publish content to an audience? (Yes required)
  2. On which platforms? (must select ≥1 of IG / YouTube / TikTok / blog / newsletter)
  3. Have you ever applied to a creator network or monetization program? (mix of yes/no)

### Role-play framing (critical for canned data)

Because the gathered data is the same demo creator for everyone, the test opens with a short
scenario that casts the participant **as** that creator:

> _"Imagine you're a content creator who just got invited to apply to Raptive Community.
> You've signed in and the screen below is set up with your account. Walk through it as if this
> profile and these numbers are your own."_

This lets review/verify/trust steps read coherently. **Known limitation:** role-played trust is
softer than trust in one's real data — treat O2 results as directional, not absolute (§9).

---

## 5. Task scenarios

Three tasks cover the six steps. Each has an explicit start point, instruction, and success
definition for Useberry path/heatmap analysis.

### Task 1 — Get started & understand the offer  (`entry`)
- **Setup:** Land on the prototype entry screen.
- **Instruction:** "You've just arrived. Get started with the application."
- **Success:** Advances past the entry screen into the data-gathering step.
- **Captures:** First impression, comprehension of the offer, hesitation before committing.

### Task 2 — Review your profile & fix anything wrong  (`gather → review`)
- **Setup:** Continue from Task 1 (or deep-link to the gather step).
- **Instruction:** "The system pulled together your creator profile. Check that it looks right
  and correct anything that's off, then continue."
- **Success:** Reaches the verification step having engaged with the review/correction UI.
- **Captures:** Trust in auto-gathered data, whether correction affordances are discoverable,
  reaction to the data-gathering ("wonder") sequence.

### Task 3 — Verify your identity & submit  (`verify → submit`)
- **Setup:** Continue from Task 2.
- **Instruction:** "Confirm it's really you and submit your application."
- **Success:** Reaches the submission success / confirmation screen.
- **Captures:** Verification-method comfort (IG DM vs. email), friction or anxiety at the
  point of submitting, sense of completion/exclusivity at the end.

---

## 6. Measures

### Behavioral (Useberry, automatic)
- Task completion rate (per task and end-to-end)
- Time on task
- Misclick / mis-tap rate and click paths
- Drop-off by step (funnel)
- Heatmaps and screen recordings

### Attitudinal — per task
- **Single Ease Question (SEQ):** "Overall, how easy or difficult was this task?" (1 = very
  difficult → 7 = very easy), asked immediately after each task.

### Targeted probes
- **Comprehension (after Task 1, free text):** "In your own words, what is Raptive Community and
  what were you just signing up for?" — scored accurate / partial / inaccurate.
- **Trust (after Task 2, 1–5 Likert):** "The profile information shown felt accurate and
  trustworthy." + open-end: "Anything here you'd hesitate to share or that felt off?"
- **Verification comfort (after Task 3, 1–5 Likert):** "I'd be comfortable verifying my identity
  and submitting my real information." + open-end: "What, if anything, would make you stop before
  submitting?"

### End-of-test
- **Confidence/value battery (1–5):** three items —
  "I understood what I was applying to," "I'd trust this with my real information," "This felt
  worth my time."
- **Optional SUS** (10-item) if you want a benchmarkable usability score; otherwise the SEQ +
  battery is sufficient for a scrappy round.
- **Final open-ends:** "What was the most confusing or frustrating moment?" / "What would make
  you more likely to finish a real application?"

---

## 7. Timeline (1–2 weeks)

| Day | Activity |
|-----|----------|
| 1 | Finalize objectives (incl. O4), success thresholds, and recruiting screener. |
| 2 | Build the Useberry study: role-play intro, 3 tasks, SEQ + probes, end battery. |
| 3 | **Pilot with n=2** (a colleague + one creator if possible). Fix confusing wording, broken paths, mislabeled success points. |
| 4 | Launch recruiting + open the study. |
| 5–8 | Field the study; monitor daily for drop-off and tech issues; top up recruiting to hit n=15–20. |
| 9–10 | Analyze and synthesize; write up findings. |

> If the prototype URL changes or a step breaks during fielding, pause new sessions rather than
> collecting invalid runs.

---

## 8. Analysis & synthesis

- **Friction log:** every observed stall/misclick/abandonment, tagged by step and rated on
  **severity × frequency** → ranked issue list.
- **Funnel:** completion and drop-off per step; flag any step above the 25% drop threshold.
- **Trust & comprehension:** mean scores vs. thresholds (§2), with supporting open-end quotes;
  segment target vs. proxy participants.
- **Deliverable:** a short report —
  1. Top 5 prioritized fixes (issue, evidence, recommendation),
  2. Funnel chart with drop-off callouts,
  3. Trust/comprehension scorecard vs. thresholds,
  4. Notable verbatim quotes,
  5. Open questions for a follow-up (e.g. moderated, real-data) round.

---

## 9. Limitations

- **Role-played trust:** participants react to a demo creator's data, not their own — O2 findings
  are directional. A real-data or moderated round is the natural follow-up to confirm.
- **Proxy participants:** to the extent non-target creators are used, weight comprehension/value
  findings accordingly.
- **No live probing:** the "why" comes from structured follow-ups, not real-time conversation;
  unexpected behaviors can't be interrogated on the spot.
- **Front-end prototype:** no real verification, fetch latency, or error states — submission
  anxiety and verification comfort are tested in an idealized happy path.

---

## 10. Open items before launch

- [ ] Define **O4** (the secondary goal) and its question(s).
- [ ] Confirm realistic **n** and creator profile for the recruiting window.
- [ ] Confirm the role-play intro copy reads naturally for the demo profile.
- [ ] Decide whether to include the optional SUS.
