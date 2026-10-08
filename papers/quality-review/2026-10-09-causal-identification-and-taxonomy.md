# Cross-paper causal identification and taxonomy — 2026-10-09
**Status:** proposed scientific improvement + executed synthetic counterexample; not empirical validation, completed independent review, or journal acceptance. Based on branch files `papers/README.md`, `L1-unity-root.md`, `L2-validation-rasterast.md`, `L3-circulation-mabun.md`, `L5-functional-alignment.md`, `L6-outcome-states.md`, `unified-zanistarast-framework.md`, earlier committed Hebûn note, and previous local quality-control packages. Existing papers unchanged.

## Hebûn-first crosswalk
Canonical conceptual order: **Ehad → Tek → Yek → Hebûn → Zanabûn → Mabûn → Rabûn → Rasterast**. Vahid is NOT a canonical stage. This order is a conceptual taxonomy, not an experimentally established physical law.
- **Hebûn**: L1 discusses unity, but the existing Hebûn review correctly requires operationalized system boundaries and individuality; one-source metaphysics cannot be inferred from DNA, snowflakes or computing analogies.
- **Zanabûn**: epistemic reliability (truth, evidence, calibration, provenance); no standalone paper in the inspected `papers/` listing. Previous local proposal supplies a protocol, not empirical results.
- **Mabûn**: related to L3 resource circulation, not necessarily equivalent in full meaning. Flow/stability effects depend on workload, capacity and boundary conditions.
- **Rabûn**: governance, ethical effects, action and responsibility; no standalone paper in the inspected `papers/` listing. Ethical acceptability is distinct from operational stability.
- **Rasterast**: related to L2 validation, but consistency does not establish empirical truth; independently test error rates, evidence support and failure modes.
- **Unified Zanistarast**: the manuscript uses L1/L2/L3/L5/L6 with **no L4**. Do not invent an L4 definition or assume a one-to-one mapping to the eight-stage canonical order. Mark numbering as unresolved pending documented decision.

## New critical quality issue: association is not causal effect
The L2 and unified papers suggest stronger validation implies stability. Workload W can cause both greater verification use V and lower stability Y: W→V, W→Y, potentially V→Y. Observational comparison of V and Y does not identify the effect of intervention do(V). A downstream mediator such as verification-induced delay must not be mechanically controlled when estimating the total effect.

**Exact synthetic counterexample:** P(W=0)=P(W=1)=0.5; P(V=1|W=0)=0.2; P(V=1|W=1)=0.8; P(Y=1|W=0,V)=0.8; P(Y=1|W=1,V)=0.2. In this constructed process V has **zero causal effect**. Nonetheless P(Y=1|V=1)=0.32 and P(Y=1|V=0)=0.68, so the naive risk difference is **−0.36**. Standardization over W gives **0.00**. Thus even a large association cannot by itself prove that validation causes harm or benefit.

**Executed toy replication:** companion Python 3 script with n=100,000, seed=20261009: naive difference −0.3621, adjusted −0.0037. With n=200,000, seed=20261010: −0.3617, adjusted −0.0007. The analytic expectation and script assertions were checked locally. These are invented parameters and simulated observations, **not real-world findings**.

## Insert-ready scientific revision (English)
> **Causal interpretation and scope.** The association between validation, circulation, functional alignment and system stability is a research hypothesis, not an established cross-domain causal law. Workload, baseline reliability, environmental volatility and intervention-selection policies may jointly influence verification use and observed outcomes. Observational comparisons may therefore be misleading even when internally consistent. We distinguish descriptive association from causal effects, preregister a domain-specific causal graph, define interventions and estimands, and compare the proposed framework with simpler workload-only and capacity-only models. Stability evidence must include prespecified horizons, failure definitions, uncertainty intervals and negative controls. Null, adverse and heterogeneous effects remain reportable. Philosophical and theological interpretations are not empirical tests.

## Proposed experimental protocol
1. Select **one** domain first (e.g. queueing software services); do not pool physics, biology and human institutions as interchangeable samples.
2. Preregister unit of analysis, workload, capacity, time horizon and safe interventions: verification V, circulation policy C, task assignment F. Consider a 2×2×2 factorial design in simulation; randomize or use defensible causal identification. Avoid disabling essential safety controls on real systems.
3. Primary endpoint: prespecified service-level violation or completion rate. Secondary: latency, backlog, recovery, resource cost and Rabûn harm metrics.
4. Target estimand: ATE_V = E[Y|do(V=1)] − E[Y|do(V=0)] under explicitly stated identification assumptions; estimate interactions separately. Observational regression coefficients alone are not proof of causality.
5. Baselines: workload/capacity-only, V-only, C-only, F-only and full model. Use paired simulation seeds, negative controls, external holdout, uncertainty intervals, multiplicity control and a preregistered practically important difference.
6. Falsification: if full model does not beat a simpler baseline on held-out cases, or harms breach safety thresholds, its corresponding superiority claim is unsupported. This does not automatically refute the entire conceptual taxonomy.

## Open quality gates
**Critical:** explain L4 gap and relation between five L-layers and canonical stages; don't silently equate them. **High:** apply existing corrections to L2 (consistency vs truth), L3 (conditional flow/entropy), L5 (task roles vs physical laws), L6 (oscillation, adaptation and recovery vs binary collapse). **High:** standalone Zanabûn/Rabûn manuscript status, primary data, verified claim-to-source citations, statistics, journal article type and actual 3-reviewer × 2-round records remain to be established. ChatGPT is an improvement assistant, not a fourth independent referee.

**Method references, not Zanistarast validation:** Pearl & Paz (2010), *Confounding Equivalence in Causal Inference*, https://proceedings.mlr.press/r8/pearl10c.html ; Cinelli, Forney & Pearl, *A Crash Course in Good and Bad Controls*, https://doi.org/10.1177/00491241221099552 ; NIST AI RMF 1.0, https://doi.org/10.6028/NIST.AI.100-1 .
