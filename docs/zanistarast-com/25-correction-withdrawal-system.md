# Zanistarast.com — Correction, Supersession and Withdrawal System

Status: LOCKED — Roadmap item 25

## Principle

Publication is not the end of review. If a material factual, scientific, religious-source, cultural, translation, rights, safety or production error is discovered after release, zanistarast.com must be able to identify the affected exact version, stop inappropriate serving, trace dependent assets and publish a corrected state without erasing audit history.

Corrections must be proportional: not every typo requires withdrawal, and serious errors must not be hidden behind silent edits.

## Change classes

The system should distinguish at least:

### MINOR_CORRECTION
Formatting, spelling or similarly non-substantive changes that do not alter meaning.

### MATERIAL_CORRECTION
A change that affects meaning, factual accuracy, translation, attribution, provenance, cultural representation, audience suitability or another material property while the work can remain public after correction/review.

### SUPERSEDED
A newer approved version replaces an older public version.

### TEMPORARILY_PAUSED
Public serving is paused while a potentially material issue is investigated.

### WITHDRAWN
The affected version is no longer suitable for public serving.

### RIGHTS_BLOCKED
Serving is stopped because permission/license/rights basis is no longer sufficient or is disputed at a blocking level.

These states are operational/publication states and must not be used to rewrite the historical record.

## Triggers

Re-review may be triggered by:

- discovered factual/source error;
- scientific correction/retraction;
- mistranslation;
- incorrect quotation/attribution;
- religious-source/authenticity or interpretation issue;
- conflict with applicable Qur'anic-ruling/Prophetic-ethics publication constraints;
- cultural/historical misrepresentation;
- visual-policy violation;
- audience classification problem;
- copyright/license/permission change;
- plagiarism/similarity concern;
- accessibility defect that materially blocks access;
- corrupted/replaced media;
- material Mira/AI generation error;
- Müdebbir or authorized review decision.

A popularity decline or low engagement is not a correction trigger by itself.

## Dependency graph

The system must be able to traverse dependencies such as:

SOURCE
→ WORK
→ PUBLIC EXPLANATION
→ TRANSLATIONS
→ REPRESENTATIONS
→ SUBTITLES / DUBS / TRANSCRIPTS
→ THUMBNAILS / TRAILERS / CLIPS
→ RECOMMENDATION / SEARCH INDEX ENTRIES

A material change upstream identifies dependent records for impact review. It does not blindly rewrite every dependent record.

## Immediate containment

When a potentially serious issue is credible but not yet resolved, authorized review may temporarily pause the exact affected representation/version.

Pause/withdrawal must promptly remove the item from:
- public recommendation eligibility;
- autoplay-next;
- related works;
- promotional rows;
- public search results where serving would be inappropriate;
- cached eligibility/indexes as applicable.

Administrative/reviewer access may remain available for investigation.

## Correction workflow

1. REPORT/DETECT — record the issue and affected version.
2. TRIAGE — classify severity and affected dimensions.
3. CONTAIN — pause serving when warranted.
4. IMPACT TRACE — find dependent works/assets/languages.
5. RESEARCH/VERIFY — establish the correction basis.
6. REVISE — create a new candidate version; never mutate the reviewed artifact invisibly.
7. RE-REVIEW — run all gates affected by the change.
8. MÜDEBBIR — obtain final decision where governance requires it.
9. RELEASE — publish the approved corrected/superseding version.
10. PROPAGATE — update eligibility, indexes, caches and dependent review queues.
11. DISCLOSE — show a public correction/withdrawal notice when material.
12. AUDIT — retain old-version status and decision history.

## Religious-source corrections

If a Qur'anic citation, translation/meaning, hadith/sirah attribution, Risale-i Nur source relationship or later interpretation is materially wrong or misleading, the affected content must not be silently rewritten as if the error never occurred.

Mira must not resolve disputed authenticity or religious rulings by invention. Unresolved consequential questions remain paused/escalated through Rasterast and, where required, Müdebbir.

Within this project's framework, discovered conflict with applicable Qur'anic rulings or Prophetic ethics is a blocking publication issue until resolved.

## Scientific corrections and retractions

If an eligible .org/scientific source is corrected, retracted or materially reclassified, dependent .com works must be discoverable and evaluated.

A source retraction does not justify deleting history or automatically declaring every downstream sentence false; the exact dependency and claim must be reviewed. Public content must not continue presenting superseded scientific status as current.

## Translation propagation

A corrected base text marks dependent translations as potentially stale when the changed passage affects them. Each translation is reviewed/versioned independently.

A translation correction does not silently alter the source or unrelated language variants.

## Rights changes

Expired permission, changed license interpretation or a credible rights dispute may immediately block the affected asset while review occurs.

A rights-blocked representation may be replaced by an independently lawful/original asset without changing the canonical work when meaning remains equivalent and the replacement passes review.

## User reports

The future product may allow visitors to report factual, source, translation, cultural, rights or accessibility concerns.

A report is a signal, not proof. Reports enter triage and must not automatically withdraw content merely through volume or coordinated abuse.

## Public notice

For material changes, a public notice should state in plain language:
- what was corrected/withdrawn at an appropriate level;
- when;
- which version is current;
- whether a source/review status changed.

Notices should be informative rather than defensive or sensational.

Minor typographical corrections may be recorded internally without prominent public notices when they do not change meaning.

## Version and cache safety

Every served representation must resolve to an explicit current version. Search/recommendation caches must not keep serving a withdrawn/superseded version after its eligibility has been revoked.

Offline/PWA caches reconcile against current status when connectivity returns. Rights/withdrawal rules from Item 22 remain applicable.

## Audit invariants

- correction does not erase provenance;
- withdrawal does not mean the source never existed;
- old approval does not approve a corrected/replaced version;
- report count does not determine truth;
- retraction is not automatically proof that every downstream claim is false;
- unknown/disputed remains representable;
- only the approved current version returns to public serving.

## Item 25 acceptance criteria

1. Minor correction, material correction, supersession, pause, withdrawal and rights block are distinguishable.
2. Exact affected versions are recorded.
3. Material upstream changes can trace dependent representations/languages/derivatives.
4. Serious credible issues can be contained before final resolution.
5. Withdrawn/paused items leave public recommendation and related serving paths.
6. Corrections create reviewed versions rather than invisible material mutation.
7. Religious-source uncertainty is not resolved by Mira invention.
8. Applicable Qur'anic-ruling/Prophetic-ethics conflicts block publication until resolved.
9. Scientific corrections/retractions trigger targeted downstream review.
10. Translation dependencies are reviewed independently.
11. Rights changes can block/replace an asset without falsifying work history.
12. User reports are signals, not automatic verdicts.
13. Material corrections can carry understandable public notices.
14. Search/recommendation/PWA caches reconcile with current eligibility.
15. Audit history is preserved and only the approved current version is served.
