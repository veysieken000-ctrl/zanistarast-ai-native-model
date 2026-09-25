# Zanistarast.com — Rasterast Above Recommendation

Status: LOCKED — Roadmap item 20

## Principle

Recommendation is a discovery mechanism, never a publication authority.

Rasterast and the other mandatory admission gates determine whether a work/representation is eligible to enter the recommendation pool. Ranking systems operate only after eligibility has been established.

No engagement metric, machine-learning score, editorial popularity signal or commercial objective may reverse an ineligible decision.

## Mandatory order

The logical order is:

SOURCE / PROVENANCE
→ applicable SCIENTIFIC ELIGIBILITY
→ RIGHTS / COPYRIGHT
→ CULTURAL / HISTORICAL REVIEW
→ MORAL / AUDIENCE REVIEW
→ RASTERAST
→ required MÜDEBBIR DECISION
→ PUBLISHED / ADMITTED POOL
→ RECOMMENDATION ELIGIBILITY
→ PERSONALIZED / NON-PERSONALIZED RANKING

Stages that are genuinely inapplicable may be marked NOT_APPLICABLE with an auditable reason. They must not be silently skipped.

## Hard eligibility boundary

The recommendation service receives only works/representations that satisfy the current eligibility policy.

It must not directly query all drafts and then “penalize” prohibited content with a low score. Ineligible content is excluded before ranking.

Examples of blocking states include:
- DRAFT;
- RASTERAST_PENDING;
- NEEDS_REVISION;
- ESCALATED where approval is required;
- REJECTED;
- WITHDRAWN;
- unresolved blocking rights state;
- incompatible audience/context state;
- superseded representation where it should no longer be served.

## Governing moral boundary

Within this project's declared framework, content that fails the applicable Qur'anic-ruling or Prophetic-ethics publication constraints cannot enter the public recommendation pool.

A model cannot learn around this rule from clicks, likes, completion rates or similarity.

Where the religious/source application is uncertain, uncertainty remains an explicit review/escalation state; the recommender cannot resolve it by prediction.

## Ranking inputs

After eligibility, ranking may consider appropriate signals such as:
- explicit likes/dislikes;
- chosen themes;
- language;
- format preference;
- audience context;
- related works;
- collection membership;
- recency where editorially relevant;
- diversity/non-repetition;
- watch/read progress;
- explicit “show less” feedback.

These signals order eligible works; they do not alter canonical review states.

## Prohibited ranking behavior

The system must not:
- reward policy-borderline content because it drives engagement;
- create provocative thumbnails to improve click-through;
- infer that popularity proves truth or virtue;
- suppress required source/provenance disclosures;
- route users to withdrawn versions;
- use an unreviewed derivative when the parent work is approved;
- treat a high model-confidence score as Rasterast acceptance;
- create a shadow admission path through search, autoplay, notifications or “related” content.

## All discovery surfaces

The eligibility rule applies not only to the home feed but also to:
- related works;
- autoplay-next;
- search results intended for public consumption;
- trending/popular sections;
- collections;
- notifications;
- “because you liked” rows;
- embedded recommendations;
- promotional carousels.

Administrative/reviewer interfaces may intentionally access non-public states, but they must be clearly separated from public discovery.

## Version safety

Eligibility attaches to an exact work/representation version. If a representation changes materially, its prior recommendation eligibility cannot automatically authorize the new version.

Correction, withdrawal, rights change or review-state change must invalidate relevant recommendation caches/index entries promptly enough to prevent continued public serving.

## Explainability

Where useful, the product may show simple reasons such as:
- “Because you liked stories about patience”;
- “More from this collection”;
- “Related to this work.”

Explanations must not claim that Rasterast, Qur'anic compatibility, scientific proof or moral authority caused a recommendation unless that statement is accurate and appropriate.

## System boundaries

Recommendation code should consume a narrow eligibility contract, for example:

ELIGIBLE(work_id, representation_id, version, audience_context, language)

The recommender should not possess a privileged bypass flag capable of overriding a blocking governance state.

Emergency/admin controls for withdrawal or safety may remove content from serving; they cannot force blocked content into public eligibility.

## Auditing

The system should be able to answer:
- which exact version was recommended;
- whether it was eligible at that time;
- which audience/language context applied;
- what broad ranking reason/category was used;
- when eligibility changed or was revoked.

Auditing need not expose private user preference data publicly.

## Failure mode

If eligibility status cannot be determined because the policy service/data is unavailable or inconsistent, the public recommender must fail closed for the uncertain item rather than assume eligibility.

Infrastructure failure must never become permission to serve unreviewed content.

## Item 20 acceptance criteria

1. Admission is completed before recommendation ranking.
2. Ineligible content is excluded rather than merely down-ranked.
3. Rasterast remains above every public discovery surface.
4. Applicable Qur'anic-ruling and Prophetic-ethics constraints cannot be learned around.
5. Likes/watch time/model confidence cannot alter review status.
6. Search, autoplay, related works and notifications cannot create bypass paths.
7. Eligibility is tied to an exact version.
8. Review/rights/withdrawal changes invalidate serving eligibility.
9. Recommendation has no privileged governance-bypass flag.
10. Admin removal may block content but cannot force admission.
11. Recommendation decisions are auditable at an appropriate level.
12. Unknown eligibility fails closed.
