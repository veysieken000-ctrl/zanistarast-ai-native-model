# Cross-domain transfer quality gate — Zanistarast papers
**Date:** 2026-10-09. **Status:** proposed scientific improvement + executed synthetic falsification example; **not** field evidence, proof of Zanistarast, completed three-referee review, or journal submission. **Branch:** `mira-org-completion-2026-10-08`. Existing manuscripts are unchanged.

## 1. Scope and what was checked

Reviewed current branch: `papers/L1-unity-root.md`, `L2-validation-rasterast.md`, `L3-circulation-mabun.md`, `L5-functional-alignment.md`, `L6-outcome-states.md`, `unified-zanistarast-framework.md`, and `papers/README.md`. Also checked previous Hebûn note, Rasterast/Zanabûn/Mabûn/Rabûn local quality protocols, L5/L6 simulation, and the already-committed causal-identification report. This package addresses a **new, distinct issue**: transfer/generalization across domains, not the earlier causal confounding, L5 task allocation, or Hebûn source claim.

**Canonical sequence:** Ehad → Tek → Yek → Hebûn → Zanabûn → Mabûn → Rabûn → Rasterast. Do not add Vahid as a stage. The historical `L1/L2/L3/L5/L6` manuscript labels are **not** a bijective mapping of the canonical sequence. Do not invent L4 or mark missing independent Zanabûn/Rabûn manuscripts as finished.

## 2. Root problem and three levels of cross-domain claims

The unified paper moves from recurring descriptions in physics, biology, computation and social systems to language suggesting a shared underlying structure. This is not yet justified by common terminology. **Analogical resemblance** is not the same as **mechanistic identity**; even a mechanism that predicts well in one domain may fail when transported to another.

- **Level A — analogy:** two systems can be described using similar words such as 'flow' or 'validation'. Report as analogy, not evidence.
- **Level B — operational mapping:** each domain has independently measurable variables and a documented structure-preserving mapping. Test measurement invariance; report mismatches.
- **Level C — predictive/causal transport:** a model estimated without target-domain outcomes retains a prespecified advantage over a simple target-relevant baseline on held-out target domains. Causal transport needs additional explicit assumptions and interventions.

**Repair:** replace 'the same underlying structure is demonstrated across domains' with 'the framework proposes a family of domain-specific models whose transportability is an empirical question'. Do not combine incommensurable physical, biological and social quantities into one unvalidated score.

## 3. Executed synthetic counterexample

The companion Python 3 standard-library script `2026-10-09-cross-domain-transfer-counterexample.py` trains a one-feature threshold rule on two hypothetical domains A and B, with 5% label noise. In a held-out domain C the input-output relationship is reversed. **C is never used for training or tuning.** All distributions are artificial choices, not observed natural laws.

Command: `python papers/quality-review/2026-10-09-cross-domain-transfer-counterexample.py`

Actual deterministic local run, independent 4,000-item evaluation samples per domain:

| Domain | Accuracy | Approx. 95% Wilson binomial interval | Meaning |
|---|---:|---:|---|
| A, source validation | 0.9507 | [0.9436, 0.9570] | Strong within-domain fit |
| B, source validation | 0.9510 | [0.9439, 0.9573] | Strong within-domain fit |
| C, unseen target | 0.0437 | [0.0378, 0.0505] | Catastrophic transfer failure |

A constant-label baseline would be approximately 0.50 in these balanced synthetic domains. The interval captures sampling variability **conditional on this toy data-generating mechanism**, not real-world model uncertainty. The test includes deterministic rerun and asserted failure detection. The result proves only that high source accuracy **does not logically entail** cross-domain transfer; it neither verifies nor falsifies Zanistarast as a whole.

## 4. Directly insertable manuscript paragraph (English)

**Cross-domain transfer and limits of generality.** *Zanistarast proposes a comparative modeling vocabulary for bounded natural, computational and human systems. Shared descriptors such as boundary, evidence validation, resource flow, coordination and outcome do not by themselves establish a common causal mechanism or transferable predictive law. Each domain must supply its own operational definitions, measurement validity, baseline models and scope conditions. We distinguish analogy, structure-preserving correspondence and successful out-of-domain prediction as progressively stronger claims. Generalization will be assessed using held-out domains and prespecified negative controls; failure in a target domain will be reported as a limit of the framework rather than concealed by pooled in-domain performance. Interpretive and theological correspondences remain separate from empirical evidence.*

## 5. Concrete improvements from Hebûn onward

| Workstream | Current risk | Proposed solution and falsification gate |
|---|---|---|
| **Hebûn** / L1 | A shared root metaphor is used as if it identifies biological or physical individuals. | Predefine candidate system boundaries for a cell, symbiotic consortium and computational service; test whether a boundary criterion predicts intervention response better than a naive component-count baseline. Report ambiguous or overlapping individuals. |
| **Zanabûn** (no independent paper in inspected `papers/`) | Evidence quality and prediction confidence may be confused with logical consistency. | Specify claim-level source provenance, uncertainty, calibration and abstention; evaluate on a *new* source/time period rather than only a training corpus. Negative control: coherent but false claims. Draft is not an accepted paper. |
| **Mabûn** / L3 | 'Flow' is conflated across thermodynamic energy, biological material, data and money. | Use domain-specific conservation equations/units and throughput; never claim all four obey one identical physical law. Held-out stress regimes and capacity constraints must be tested. Negative control: higher flow increases overload. |
| **Rabûn** (no independent paper in inspected `papers/`) | Operational efficiency could be mistaken for ethical validity. | Measure risk, consent/rights constraints and distribution of harm separately from throughput. Negative control: a highly stable but harmful system. Do not infer ethics from entropy or uptime. |
| **Rasterast** / L2 | Syntactic/constraint checks are presented as truth verification. | Compare factual error and abstention rates against evidence-aware baselines on a held-out source family. Negative control: consistent falsehood and legitimate new evidence. |
| **L5 functional alignment** | 'Correct role' transfers from designed systems to physics without a task specification. | Predeclare task-specific utility and fault tolerance; require an explicit objective before using 'alignment'. Compare to shortest-queue and random allocation under domain shift. |
| **L6 outcomes** | Binary stability/collapse language implies universal dynamics. | Specify finite horizon, oscillation, metastability, recovery and censoring; compare against domain-specific survival/trajectory baselines. |
| **Unified Zanistarast** | Similar diagrams are treated as universal proof. | Require a versioned mapping of constructs, held-out-domain prediction, negative controls and independent replication. Null or reversed effects narrow the scientific claim; they do not negate the conceptual interpretation. |

## 6. Proposed preregistered transfer protocol

1. **Scope:** choose one coherent domain family first (e.g., several queueing-service environments). Physics, ecology and institutions cannot be pooled without validated construct equivalence.
2. **Unit/measurement:** register units, system boundaries, observation horizon, domain membership and sampling process before inspecting target labels.
3. **Baselines:** compare against simple domain-specific workload/capacity and task-specific models, not only against an empty/no-model baseline.
4. **Split:** leave one environment/site/domain out. No tuning, feature selection or threshold selection on held-out target outcomes. Keep related clusters together to prevent leakage.
5. **Primary estimand:** preregister target-domain performance difference from baseline; report per-domain estimates and uncertainty, not just a pooled average.
6. **Negative controls:** reversed mappings, changes in task semantics, high-load regime, corrupted evidence and stable-but-harmful outcomes. Prespecify how each failure restricts a claim.
7. **Sensitivity:** report data drift, measurement changes, small-domain sample uncertainty, missing data and multiplicity. At least one external independent replication is needed before strong transport claims.
8. **Decision:** no superiority in held-out domains means 'cross-domain transfer not demonstrated'; do not rebrand the same failure as validation. A positive result is limited to tested domains and assumptions.

## 7. Journal-readiness and genuine referee evidence

For a conceptual systems journal: state definitions, comparison to existing systems theories, counterexamples, and formal propositions. For an empirical/computational journal: add preregistration, dataset provenance, versioned code, target-held-out results, confidence intervals, and independent replication. Do not describe this synthetic demonstration as domain validation.

Mira's **three independent referees × two rounds** must have actual model/provider IDs, time, manuscript version SHA, distinct written reports, author responses and second-round decisions. The existence of a prompt or this assistant's analysis does **not** establish their participation.

## 8. Verified methodological literature (not evidence for Zanistarast)

- Gulrajani, I., & Lopez-Paz, D. (2021). *In Search of Lost Domain Generalization*. ICLR. https://openreview.net/forum?id=lQdXeXDoWtI — fair out-of-domain baselines and model selection; OpenReview browser access can be gated; bibliographic record confirmed via https://mlanthology.org/iclr/2021/gulrajani2021iclr-search/.
- Yarkoni, T. (2022). *The generalizability crisis*. Behavioral and Brain Sciences, 45, e1. https://doi.org/10.1017/S0140525X20001685 — aligning verbal generalization claims with statistical sampling; publisher record verified.
- Lakens, D., Uygun Tunç, D., & Tunç, M. N. (2022). *There is no generalizability crisis*. Behavioral and Brain Sciences, 45, e25. https://doi.org/10.1017/S0140525X21000340 — published counterposition; acknowledges that generalization methodology is debated.

**Change safety:** additional review note and toy code only. Protected `main`, live sites, existing manuscripts, DOI, publication and journal submissions remain untouched.
