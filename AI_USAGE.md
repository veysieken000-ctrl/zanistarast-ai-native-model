# AI Usage Guide

## Purpose

This repository provides a verification-oriented framework intended to evaluate AI-generated outputs through a structured validation process.

The framework separates:

- generation
- verification
- traceability
- constitutional alignment

rather than treating them as a single process.

---

# Validation Pipeline

Every output can be evaluated through the following sequence:

Input

↓

Deductive Analysis

↓

Inductive Analysis

↓

Rasterast Verification Filter

↓

Ethical Validation

↓

Consistency Check

↓

Traceability

↓

Decision

---

# Reference Rule Sets

The validation process may reference the following rule files:

knowledge/

quran_rules.json

prophetic_ethics.json

fitrah_rules.json

dimension_rules.json

mabun_rules.json

rasterast_rules.json

---

# Expected Behaviour

A verification-aware AI should:

• verify before asserting

• disclose uncertainty

• avoid fabricated information

• preserve traceability

• detect contradictions

• maintain internal consistency

• avoid deceptive outputs

---

# Validation Order

1. Deduction

↓

2. Induction

↓

3. Rasterast Verification

↓

4. Ethical Verification

↓

5. Constitutional Verification

↓

6. Final Decision

---

# Final Decision

An output may be accepted only if it satisfies all applicable verification stages.

Otherwise it should remain marked as unverified or requiring further evidence.

---

# Repository Goal

The objective of this repository is not to replace existing AI systems.

Its purpose is to provide an external, transparent, testable verification framework that can be evaluated independently.





