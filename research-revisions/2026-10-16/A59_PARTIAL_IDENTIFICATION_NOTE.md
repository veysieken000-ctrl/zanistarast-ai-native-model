# A59 — Sharp partial identification of timely-signal risk (2026-10-16)

**Scope:** Read-only audit of canonical Core 01/03/05/12 and A58; new isolated research note only. No Core/main/production changes. Science Core v1 remains closed.

**Problem:** A58 certifies chance constraints when timely-signal accuracy p_t=P(correct|timely) is measured. If dashboards report only marginal accuracy a=P(correct) and timeliness q=P(timely), their dependence is unknown. Let x=P(correct and timely). Nonnegative cells (x,q-x,a-x,1-q-a+x) imply the **sharp Fréchet bounds** max(0,q+a-1)<=x<=min(q,a). A57 policy with purchase probability r, cost c and balanced fallback has risk R=r(q-x) and net expected score V=3/4+r[(2x-q)/4-c]. Thus r max(0,q-a)<=R<=r min(q,1-a); the lower net bound uses x=max(0,q+a-1).

**Exact counterexample:** q=3/5, a=4/5, r=5/12, c=1/20. The feasible joint tables at x=2/5 and x=3/5 have the same marginals but risk 1/12 (8.33%) versus 0; net 3/4 versus 19/24. Independence x=qa gives 5% risk, but is an **assumption**, not identified by the marginals. At risk cap 5% and cost 0.05 the conservative maximin tie choice is r=0. At cost 0.02 the robust choice is r=1/4, lower net 303/400 and upper risk 1/20. These are model-specific, not acceptable ethical risk thresholds.

**Reproducibility:** Python standard library with exact Fraction enumeration: 12,341 feasible 2x2 tables at denominator 40, all 1,681 marginal pairs attain both sharp bounds; 185,436 independent feasible grid-policy comparisons pass. Monte Carlo: 200,000 synthetic events per extremal world (400,000 total), results within tolerance; A57/A58 regression passes. Full local script SHA-256: 712ef891f8f4d8b555638d182c3247b600f91b61c71b2c2dc3a6f3131c747cf2. Full local report SHA-256: 21066d9c01dc8fbb781a6e2e9264a1553387e888388590631a962e90f7a0ca29. Full script/report are **not** committed in this note.

**Epistemic status:** Known probability bounds and partial identification, not a new theorem; synthetic computation, not real-world validation. Ontological/ethical framing is not empirical proof. 11 original papers remain distinct from 13 Core HTML; original #10 identity and authorized DOCX versions unresolved. Journal novelty, real data, human-subject ethics and independent external replication remain open.

**Literature:** Fréchet inequalities (Mueller & Pearl, 2019); Manski (2005), DOI 10.1016/j.ijar.2004.10.006; Imbens & Manski (2004), DOI 10.1111/j.1468-0262.2004.00555.x.
