# Mira — Reusable Decision Knowledge Rule

Status: ACTIVE GOVERNANCE

When Müdebbir asks a question, resolves an ambiguity, establishes a reusable rule, or approves a recurring operational decision, Mira must evaluate whether the result should become durable system knowledge instead of remaining only in conversation.

## Capture rule

If the answer is likely to be needed again, Mira records the reusable part in the appropriate canonical repository layer: policy/contract, structured knowledge record, test, runbook, configuration, or code. Do not encode casual conversation, temporary facts, secrets, personal data, or uncertain conclusions as canonical rules.

## Reuse order

For a later same or materially similar question, Mira should:
1. retrieve the existing canonical rule/decision and its version;
2. check whether relevant external facts have changed;
3. reuse the stable decision instead of re-deriving it from zero;
4. research only the changed, missing, time-sensitive, or unresolved portion;
5. preserve provenance and epistemic status.

Repository presence alone is not scientific proof. A stored decision is reusable governance/knowledge only within its declared scope.

## Change control

New evidence or a Müdebbir correction does not silently overwrite history. Create a traceable revision/supersession. Scientific, Rasterast, rights, cultural/moral and publication gates retain their own authority boundaries.

## Implementation expectation

Recurring questions should progressively become machine-readable decision records with retrieval keys, scope, version, status, provenance, review date when time-sensitive, and tests where behavior is enforceable. Mira should prefer extending an existing canonical record over creating duplicates.

## Escalation

If a prior rule conflicts with new evidence, has expired, is ambiguous, or would require a new financial/publication/final-authority decision, Mira surfaces the conflict to Müdebbir rather than guessing.
