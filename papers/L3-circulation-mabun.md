# L3 – Circulation: Resource Flow, Entropy, and System Stability (Mabûn)

## Abstract

This paper examines whether specified patterns of resource circulation affect operational outcomes under declared system boundaries, capacities, and observation horizons.

Zanistarast defines this layer as **L3 – Circulation (Mabûn)**,
a proposed comparative construct for studying resource transport and allocation. Different domains require distinct governing equations and measures.

---

## 1. Introduction

Some open systems require resource exchange to maintain a specified function; this does not apply universally to closed or inactive systems.

When resources:

- stop moving
- concentrate excessively
- or become inaccessible

→ the risk of a defined failure may increase, depending on capacity, feedback and boundary conditions.

Zanistarast models this as:

> L3 – Circulation (Mabûn)

---

## 2. Physical Systems (Thermodynamics)

In physics:

- energy flows through systems
- gradients drive movement
- entropy production is nonnegative under the usual local-equilibrium accounting assumptions; restricting flow does not generally imply increasing stored entropy

Examples:

- heat flows from high to low temperature
- isolated systems lose usable energy
- blocked throughput can impair a flow-dependent process, but an insulated vessel can remain stable without material flow

This suggests:

> The effect of flow on a chosen stability endpoint is system-specific and requires measurement.

---

## 3. Biological Systems

In living systems:

- nutrients circulate
- oxygen flows
- waste is removed

Examples:

- blood circulation sustains life
- blocked arteries → system failure
- ecosystems require continuous exchange

Thus:

> Life depends on circulation.

---

## 4. Economic Systems

In economic structures:

- transactions and liquidity can affect access under specified institutions
- resources must be accessible
- distribution must adapt

Examples:

- extreme accumulation → inequality → instability
- lack of circulation → economic stagnation
- balanced flow → system resilience

Zanistarast reframes economy as:

> Circulation and equilibrium describe different properties; neither alone establishes economic resilience.

---

## 5. Computational Systems

In computing:

- data flows through processes
- memory is allocated and released
- tasks are distributed

Examples:

- memory leaks → system crash
- blocked pipelines → failure
- load balancing → stability

This indicates:

> Efficient circulation is required for system performance.

---

## 6. Zanistarast Interpretation

Zanistarast defines:

> L3 – Mabûn = The circulation layer of resources within a system

This includes:

- energy
- data
- capital
- biological inputs

Circulation:

- may reduce congestion under a suitable allocation rule
- can also increase overload when offered demand exceeds capacity
- requires measured outcomes before a benefit is inferred

---

## 7. Cross-Domain Convergence

Circulation appears across:

- physics → energy flow
- biology → metabolic cycles
- computing → data and resource flow
- economics → capital distribution

Zanistarast proposes these as analogies requiring domain-specific operationalization and independent transfer tests.

---

## 8. Hypothesis

**Conditional hypothesis M1:** For a specified service with offered arrival rate below measured capacity, a prespecified allocation policy may improve deadline completion relative to a capacity-matched baseline. **Counter-hypothesis:** gains disappear under overload or distribution shift. Neither result can be extrapolated to thermodynamics, biology or economics without separate evidence.

---

## 9. Functional Insight

Circulation is not randomness.

It is:

- regulated
- constrained
- directional

Too little flow → stagnation  
Too much uncontrolled flow → chaos  

Optimal systems:

→ maintain structured circulation.

---

## 10. Conclusion

Resource exchange is essential for some specified processes, but neither continuous circulation nor a single optimum is universal.

Across domains, systems require:

- movement
- distribution
- transformation

Zanistarast formalizes this as:

> L3 – Circulation (Mabûn)

---

## 11. Extended Interpretation (Optional)

Some traditions emphasize:

- sharing
- balance
- redistribution

Zanistarast explores whether such principles correspond to circulation-based system stability.



---

## 12. Scientific scope, entropy accounting and falsifiable benchmark (research revision)

<!-- mabun-scientific-integration-2026-10-09 -->
**Root cause and alternative models.** Resource *flow*, stored inventory, dissipation, queue length and reliability are different constructs. A blocked artery can impair an organism, while a stable sealed vessel need not exchange matter; excessive requests can destabilize a server. Therefore the examples cannot establish a universal monotonic flow–stability law. Biological homeostasis, economic liquidity and thermodynamic entropy need separate models and independent data.

**Thermodynamic accounting.** For a simple open control volume under local equilibrium, taking heat entering as positive, the entropy balance is

`dS_CV/dt = Σ_in(mdot*s) − Σ_out(mdot*s) + Σ_j(Qdot_j/T_j) + Sdot_gen,   Sdot_gen ≥ 0.`

Here `S_CV` is stored entropy [J/K], `mdot` is mass flow [kg/s], `s` is specific entropy [J/(kg K)], `Qdot` is heat transfer [W], `T` is boundary temperature [K], and `Sdot_gen` is internal entropy production [W/K]. This balance requires an explicitly defined boundary and suitable assumptions; `Sdot_gen ≥ 0` does **not** imply `dS_CV/dt ≥ 0` for an open system. It also does not imply a causal relation between flow and service uptime.

**Proposed computational test (not yet executed on real workloads).** Define independent service instance `k`, fixed horizon `H`, deadline `D`, offered workload `N_offered,k > 0`, resource budget and routing policy before observing outcomes. Randomize policy assignment to matched, independently seeded service instances. Primary outcome is `Y_k(a) = N_completed_by_D,k(a)/N_offered,k`, counting rejected and timed-out offered jobs in the denominator. Estimate the paired difference `Δ = mean_k[Y_k(candidate)−Y_k(baseline)]`; report a confidence interval over independent instances, not over correlated time steps. Secondary outcomes: rejection fraction, backlog, p95 latency, resource consumption, incident severity and subgroup disparities. Evaluate below-capacity, near-capacity, overloaded and held-out workload families.

**Competing explanations and falsification.** Added capacity, easier task selection, changed observation horizon and altered task mix can explain apparent gains. Keep budgets and offered streams equal, preregister a minimum meaningful improvement `δ`, and include a hard-task rejection negative control. The proposed *performance* claim is not supported if the confidence interval fails the preregistered superiority criterion or any independently declared safety threshold is exceeded. A failure to generalize beyond the service domain forbids cross-domain inference. This is a protocol, not experimental evidence for Mabûn.

**Method reference (scope-limited):** Little, J. D. C. (1961), “A Proof for the Queuing Formula: L = λW,” *Operations Research*, 9(3), 383–387, DOI: 10.1287/opre.9.3.383. The result is conditional and does not prove the proposed framework.
