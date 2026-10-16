# Independent Testimony, Consensus, and Common-Mode Error: An Epistemic Analysis within Zanabûn

**English research manuscript, version 0.1 — not peer reviewed; not journal ready.**  
**Source:** `research/yek-6tek-program/manuscripts/ZANABUN-01-bagimsiz-taniklik-ve-ortak-hata.md` (Turkish research draft). Related primary conceptual sources identified there: `zanistarast-ontology/papers/zanabun.md` and `zanistarast-ai-native-model/core-03.html`. This document is an English scholarly development of that draft, not a certified translation of all primary sources.

## Abstract

Agreement among observers is often treated as evidence of reliability, but consensus can coexist with systematic error. We examine a minimal model of testimony in which witnesses share a common disturbance in addition to individual noise. A four-witness counterexample demonstrates that zero between-witness variance does not imply accuracy relative to an external reference. Under a zero-mean common-error model, the variance of the mean estimator is the sum of the common-mode variance and the individual-error variance divided by the number of witnesses. Consequently, adding witnesses does not remove common-mode uncertainty. We interpret this result as a methodological caution relevant to Zanabûn's account of knowledge and testimony, rather than as empirical confirmation of its wider ontology. We formulate falsifiable hypotheses and outline an evaluation protocol that distinguishes agreement, independence, calibration, and external validity.

**Keywords:** social epistemology; testimony; correlated error; consensus; calibration; Zanabûn.

## 1. Introduction

Multiple independent measurements can reduce uncertainty, yet independence is an assumption to be established, not inferred from the number of observations. Witnesses may share an instrument, training data, institution, narrative, or calibration procedure. Their apparent agreement may therefore reflect a common error rather than an independently corroborated fact. The question addressed here is narrow: *Does agreement among witnesses guarantee greater accuracy when their errors are dependent?* The answer is no, as shown by a constructive counterexample.

The Zanabûn research program motivates examining the relationship between testimony, consistency, and justified knowledge. This paper does not claim that a statistical identity establishes a theological proposition or validates a complete ontological system.

## 2. Concepts and evidence boundaries

Let `theta` denote a quantity defined by an external reference standard, and let `W_i` denote witness `i`'s report. The sample mean is `K = (1/n) sum_i W_i`. A within-group dispersion statistic is `s² = (1/n) sum_i (W_i-K)²`. Small dispersion describes *agreement among reports*; it is not, by definition, a measurement of `|K-theta|`. The distinction requires an independently specified reference standard.

In this manuscript, mathematical derivations are conditional results, the proposed empirical studies are untested hypotheses, and Zanabûn's wider ontological interpretation remains philosophical. These evidence types must not be conflated.

## 3. A counterexample to consensus-as-truth

Take `theta = 0`, four witnesses, and a shared calibration offset `b = 5`. Each witness reports `W_i = theta + b = 5`. Then

`K = (5+5+5+5)/4 = 5`

and

`s² = [(5-5)²+(5-5)²+(5-5)²+(5-5)²]/4 = 0`.

Yet the absolute estimation error is `|K-theta| = 5`. Thus perfect internal agreement is compatible with an inaccurate collective estimate. This is a counterexample to the inference from agreement alone to truth; it does not show that agreement is never informative.

## 4. Common-mode uncertainty

Assume the observation model

`W_i = theta + B + epsilon_i`,

where `B` is a shared zero-mean error with variance `tau²`, each `epsilon_i` is zero-mean individual noise with variance `sigma²`, individual errors are mutually independent, and `B` is independent of all individual errors. The group mean is

`K = theta + B + (1/n) sum_i epsilon_i`.

By variance additivity under the stated independence assumptions,

`Var(K-theta) = tau² + sigma²/n`.

As `n` increases, the individual-error term tends to zero, but the common-mode component does not. This is a standard application of covariance algebra, **not a newly discovered mathematical theorem**. If the shared disturbance has nonzero mean, bias must also be considered; variance alone would understate mean-squared error.

## 5. Testable hypotheses

**H1 (shared calibration):** Groups using a common calibration source exhibit more correlated errors than groups using independent calibration procedures, conditional on comparable instruments and tasks.

**H2 (external accuracy):** At a prespecified total resource budget, ensembles assembled from differently sourced errors may achieve lower error against an independent reference than ensembles dominated by a common-mode error.

**H3 (agreement is insufficient):** Within-group agreement alone cannot reliably discriminate accurate from inaccurate estimates across settings with differing shared biases.

These are hypotheses for future experiments, not established field findings. H1 and H2 require operational definitions of independence, calibration, budget, and external accuracy.

## 6. Proposed reproducible evaluation

Pre-register a measurement task with an externally verified `theta`, sample sizes, instrument allocation, calibration protocol, and an explicit baseline. Compare (A) independent calibration and (B) shared calibration while matching resource budgets. Record group mean error, mean-squared error, between-witness variance, and empirical error correlation. Repeat across several controlled levels of common-mode disturbance. Report uncertainty intervals and sensitivity to violations of the independence and zero-mean assumptions.

Minimal deterministic illustration:

```python
theta = 0.0
reports = [5.0, 5.0, 5.0, 5.0]
mean = sum(reports) / len(reports)
dispersion = sum((x - mean)**2 for x in reports) / len(reports)
absolute_error = abs(mean - theta)
assert (mean, dispersion, absolute_error) == (5.0, 0.0, 5.0)
```

The code reproduces the counterexample only. It is not a simulation of social behavior or evidence that H1–H3 hold in practice.

## 7. Objections and limitations

Agreement can still increase credibility when independence, calibration, and measurement validity are independently supported. The model assumes a scalar quantity, a reference standard, and a simplified error decomposition; historical testimony and normative judgments often lack these conditions. Dependence may also be partial or time-varying. A full empirical study should compare robust estimators, correlated-noise models, and situations where no ground truth is observable. No field dataset or independent expert review is supplied here.

## 8. Implications for Zanabûn

The narrow epistemic lesson is to distinguish **mutual agreement** from **independent corroboration** and **external validation**. This distinction can inform the methodological development of Zanabûn without retroactively attributing the present statistical analysis to its primary source. The theological proposition that Ehad is Yek and created things according to Yek is preserved as a theological/ontological claim; it is neither tested nor inferred from the calculations above.

## 9. Publication-readiness statement

**Completed in this draft:** English argument, explicit assumptions, counterexample, mathematical derivation, testable hypotheses, proposed protocol, and executable illustration.

**Outstanding:** line-by-line comparison with original conceptual sources; independently verified peer-reviewed literature and bibliography; actual preregistered experiment and data; independent expert review; target-journal selection, formatting, and disclosure statements. **No submission, acceptance, DOI, or publication is claimed.**
