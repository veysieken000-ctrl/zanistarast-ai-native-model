# Zanabûn — Epistemic Reliability as a Testable Research Program
**Status:** Conceptual manuscript draft, 2026-10-09. **Not:** a validated empirical result, a peer-reviewed article, or an approved journal submission.
**Canonical position:** Ehad → Tek → Yek → Hebûn → **Zanabûn** → Mabûn → Rabûn → Rasterast. This is a conceptual ordering, not an experimentally proven natural law.

## Abstract
Zanabûn is proposed as an epistemic layer concerned with justified claims, evidence provenance, calibrated uncertainty, and the responsible withholding of conclusions. We distinguish logical consistency from factual correctness and confidence from evidence. Rather than claiming that a universal mechanism of knowing has been discovered, this paper specifies a falsifiable evaluation of evidence-aware claim verification against consistency-only and frequency-based baselines. Outcomes include factual support, probabilistic calibration, selective error under abstention, and reproducible source traceability. Philosophical and theological interpretations are kept separate from empirical results.

## 1. Motivation and boundaries
The existing repository defines Zanabûn as "Knowing, understanding, and transparent reasoning" in `papers/ontology_notes.md`, but the inspected `papers/` directory contains no independent Zanabûn manuscript. A definition alone does not identify a measurement model. A coherent assertion may be false; a correct answer may have inadequate provenance; a calibrated forecast may still cause harm. Zanabûn must not be treated as synonymous with Rasterast's downstream validation procedures.

Hebûn is a prerequisite only in the **modeling** sense: define the entity, observation boundary, and time of the claim before assessing what can be known about it. This does not derive epistemic truth from a theological premise.

## 2. Constructs and formal model
For each atomic claim `q_i`, register: `(entity, predicate, scope, time, evidence_set, source_timestamp, provenance, label, confidence, decision)`.
- **Truth status:** an independently adjudicated reference label, when obtainable; it is not inferred from consistency alone.
- **Evidence support:** whether the cited material entails the scoped claim, with contradiction and missing-evidence categories.
- **Confidence:** `p_i in [0,1]` for a clearly defined binary event `y_i`; confidence must not be interpreted as frequency until calibration is checked.
- **Traceability:** verifiable provenance, date, passage/record identifier, and permitted access.
- **Abstention:** a decision to decline a factual judgment when evidence is insufficient; not itself proof of safety.

For a binary prediction task, the Brier loss is `BS = (1/n) sum_i (p_i - y_i)^2`. A lower score is better; it does not replace evidence entailment or traceability. Define selective risk `R(c)= errors among answered claims / answered claims` at coverage `c = answered / all`; report both, since declining every claim trivially suppresses answered errors.

## 3. Competing hypotheses
- **H1 (factual verification):** an evidence-aware method yields lower held-out factual error than a consistency-only baseline under identical annotation rules.
- **H2 (uncertainty):** probability estimates improve Brier loss over a predeclared base-rate forecast on a held-out time/source split.
- **H3 (selective prediction):** at the same prespecified coverage, an evidence-aware abstention rule reduces answered-claim error compared with confidence-only abstention.
- **H4 (provenance):** traceability improves independent adjudication reproducibility; quantify disagreements and unresolved source claims.
All four may fail. Any observed gain is task- and dataset-specific, not a universal epistemological proof.

## 4. Study design (proposed; no data collected here)
1. Register claim classes (empirical, mathematical, historical, normative, interpretive) before annotation; **do not score normative or theological claims as if they were binary laboratory facts**.
2. Sample claims from multiple sources and times, including hard negatives: internally coherent falsehoods, time-shifted truths, quotations out of context, and unsupported but plausible assertions. Report source selection and licensing.
3. Create a blinded, adjudicated reference set with at least two initial independent annotations and a documented disagreement resolution; report raw agreement and category-specific error.
4. Split by source family and publication period, not merely by random claim row, to reduce contamination and duplicate leakage. Freeze prompts, model versions, source corpus, scoring rules, and decision thresholds before evaluation.
5. Compare (A) consistency-only, (B) evidence-retrieval plus entailment, and (C) evidence-aware plus calibrated confidence/abstention. Give every method the same permitted evidence.
6. Report per-category confusion matrices, sensitivity/specificity, Brier loss where valid, calibration by probability bins, risk–coverage curves, provenance completeness, bootstrap uncertainty **clustered by source**, and model failure cases.
7. Predeclare the primary endpoint, minimum practically meaningful difference, power/sample-size justification, handling of missing labels, and multiplicity policy before obtaining the final held-out results.
8. Include a **negative control** of coherent but factually false claims. If the consistency-only method succeeds equally well, the claimed added value is unsupported.

## 5. Scientific and ethical limits
A method can accurately evaluate a record and still be wrong about the world if the record is incomplete or deceptive. Absence of accessible evidence must be reported as uncertainty, not converted into a false verdict. The normative value of honesty and the theological meaning of knowledge may motivate inquiry, but they are not experimental observations. Zanabûn should be described as a *proposed epistemic evaluation framework*, not a proven natural law.

## 6. Insert-ready statement for the unified manuscript
**Zanabûn (epistemic layer).** We define Zanabûn operationally as the assessment of claim-level evidence, provenance, uncertainty, and the appropriateness of withholding judgment. Internal consistency is treated as a necessary check for some formal tasks but is neither sufficient for empirical truth nor a substitute for independent evidence. Its incremental value will be tested against prespecified consistency-only and base-rate baselines on held-out sources, with calibration, error, traceability, and abstention reported separately. Failure to improve these endpoints will limit the claimed usefulness of this operationalization.

## 7. Sources and status
- Gneiting, T. & Raftery, A. E. (2007). *Strictly Proper Scoring Rules, Prediction, and Estimation*. JASA 102(477), 359–378. https://doi.org/10.1198/016214506000001437 (methodological basis, not evidence for Zanabûn).
- Cronbach, L. J. & Meehl, P. E. (1955). *Construct Validity in Psychological Tests*. Psychological Bulletin 52(4), 281–302. https://doi.org/10.1037/h0040957 (construct-validity rationale; not direct proof for the proposed system).
- Repository: `papers/ontology_notes.md`, `papers/L1-unity-root.md`, `papers/L2-validation-rasterast.md`, and prior `papers/quality-review/` notes.
**Open:** independent data, annotation audit, statistical results, originality review against the full literature, target-journal selection, actual three-reviewer/two-round records.
