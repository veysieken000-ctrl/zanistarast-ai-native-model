# Run 7: unbiased outcome protocol and cross-paper corrections (2026-10-09)
Status: research draft, not empirical proof or completed independent review. The prior integrated manuscript v0.2 and 21-claim ledger remain local; this note addresses an unresolved measurement bias.

Canonical order: Ehad → Tek → Yek → Hebûn → Zanabûn → Mabûn → Rabûn → Rasterast. Ehad/Tek/Yek are conceptual, not physical variables. Historical L1/L2/L3/L5/L6 is a separate index; do not invent L4 or add Vahid.

## New issue: admission-selection bias in the unified protocol
A policy can reject difficult requests and improve latency among admitted jobs while reducing the fraction of all offered jobs served. This is a selection bias, not evidence of greater stability.

Copy-ready method: “For independently seeded service instance k and policy a, define N_offered before admission, N_deadline as offered jobs completed within the fixed deadline, and N_rejected as rejected offered jobs. Set Y_k(a)=N_deadline/N_offered for N_offered>0. Rejected jobs remain in the denominator. Under identical paired offered streams and matched resource budgets, compare Δ=(1/K)Σ_k[Y_k(full)−Y_k(baseline)] at the instance level. Predeclare the practical improvement δ, risk limits, environment splits, and cluster-level confidence interval. Superiority requires the lower confidence bound for Δ to exceed δ with no risk-gate violation. Report rejection rate, p95 latency, costs and subgroup harms separately. Never count correlated time steps as independent experiments.”

Counterexample: Rejecting 80% of difficult requests can lower admitted-only latency while worsening Y. Test this negative control before drawing conclusions.

## Cross-paper repair gates
- Hebûn/L1: declare observation boundary and time horizon; DNA and snowflakes are analogies, not proof of one physical origin. Compare rival boundary definitions on held-out perturbations.
- Zanabûn: source entailment differs from consistency; record source lineage, adjudicated labels, confidence and abstention. Test coherent falsehoods; Brier score applies only to adjudicated probabilistic outcomes.
- Mabûn/L3: do not infer that restricted flow always increases thermodynamic entropy. For a specified open control volume use dS/dt = Σ(mdot_in s_in) − Σ(mdot_out s_out) + Σ(Qdot_j/T_j) + Sdot_gen, Sdot_gen≥0, with units and signs stated. Test overload λ≥μ in computing separately.
- Rabûn: efficiency does not establish moral legitimacy. Define authorized harm limits, appeals, independent incident adjudication and subgroup rejection rates.
- Rasterast/L2: separate syntax, logic, source support, empirical truth and policy; checksum is integrity, not a truth certificate. Test verification overhead and coherent false claims.
- L5: intended role requires a designed task; particles do not execute assigned duties. Compare task performance under shifted workloads.
- L6: replace stability/collapse binary with finite-horizon operational, overload, oscillation, recovery, metastability, failure and censoring; report horizon sensitivity.
- Unified: test causality and held-out transfer; analogous vocabulary across domains is not shared mechanism.

Sources for methods, not validation of Zanistarast: Gneiting & Raftery 2007 DOI 10.1198/016214506000001437; Hernán & Robins 2020 Causal Inference: What If; Tabassi 2023 NIST AI RMF 1.0 DOI 10.6028/NIST.AI.100-1.

Pending: primary literature claim mapping, real data, journal-specific formatting, independent Mira three-reviewer two-round evidence. No main/site/DOI/submission changes.