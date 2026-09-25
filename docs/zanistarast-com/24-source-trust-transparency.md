# Zanistarast.com — Source and Trust Transparency

Status: LOCKED — Roadmap item 24

## Principle

A visitor should be able to understand where a work came from, what zanistarast.com changed or added, what review it passed, and what remains uncertain without needing to inspect internal repository data.

Transparency must clarify trust; it must not turn review badges, Rasterast status or attractive source cards into false claims of scientific or religious authority.

## Two-layer disclosure

Public pages should provide two levels:

### Simple public layer
Near the work, show concise information such as:
- source/adaptation relationship;
- source or creator name where known;
- culture/period where relevant;
- Mira/AI involvement where material;
- whether the work is a retelling, adaptation, commentary, public explanation or original production;
- important correction/withdrawal notices.

### Deeper provenance layer
An expandable/source view may expose:
- exact source records;
- editions/versions/identifiers;
- source language;
- relationship types;
- scientific .org/publication links where applicable;
- rights/license basis where appropriate;
- cultural/historical research basis;
- representation/version;
- review states and dates;
- meaningful uncertainty;
- corrections/retractions;
- production provenance.

## Trust is multidimensional

The interface must not collapse trust into one universal score.

Separate dimensions may include:
- source/provenance known;
- rights reviewed;
- cultural/historical review;
- scientific status where applicable;
- Rasterast publication state;
- audience/visual review;
- translation review;
- correction/withdrawal status.

Passing one dimension does not imply passing another.

## Rasterast disclosure

Rasterast status may be shown when useful, but its meaning must remain precise: it is a review/publication-admission state within the Zanistarast system.

RASTERAST_ACCEPTED must not be presented as:
- scientific proof;
- proof that every factual claim is true;
- independent religious authority;
- copyright clearance unless separately reviewed;
- proof that a source is canonical outside its actual source tradition.

## Religious-source transparency

Where religious material is involved, the interface/data model must preserve distinctions among:
- Qur'anic source text;
- translation/meaning;
- hadith/sirah source;
- commentary/interpretation;
- Risale-i Nur source;
- Zanistarast interpretation;
- Mira-generated public explanation/adaptation.

Within this project's framework, compatibility review against applicable Qur'anic rulings and Prophetic ethics is mandatory where relevant, but a compatibility decision must not be displayed as if Mira authored or independently established a religious ruling.

Unresolved authenticity/interpretation questions remain visible as unresolved/review states where material.

## Scientific transparency

For scientific material, public trust information should distinguish:
- source paper/data;
- reported result;
- interpretation;
- hypothesis;
- limitation/counterevidence;
- Zanistarast synthesis;
- public-language adaptation.

Where a verified .org/publication record exists, the .com work should link to the exact eligible version. DOI/persistent identifiers are displayed only when legitimately present in source records.

## Mira and AI disclosure

Material Mira/AI involvement should be traceable at representation/production level.

The system should be able to distinguish:
- human-authored/source material;
- Mira-assisted research/drafting;
- Mira-generated original media;
- AI-assisted translation/subtitles;
- human-reviewed/finalized assets.

Disclosure should be understandable and proportionate rather than a vague “AI used” label that explains nothing.

## Source confidence and uncertainty

Unknown provenance, disputed attribution, uncertain date or conflicting cultural evidence must not be silently normalized into certainty.

The UI may summarize uncertainty in plain language and offer deeper detail. “Unknown” is a valid state.

No numerical trust score should manufacture precision where the evidence is qualitative or disputed.

## Corrections and withdrawals

If a work is corrected, superseded or withdrawn:
- the affected version remains auditable;
- public serving follows the current valid state;
- material corrections are disclosed where needed to avoid misleading users;
- dependent translations/derivatives can be identified for review;
- withdrawn material is removed from recommendation eligibility.

A corrected page must not silently erase a material prior error when retaining a correction notice is appropriate.

## Citations and source navigation

Source links should help a visitor verify or deepen understanding. They must point to the actual relevant record/version when possible rather than a generic homepage.

Source navigation should not imply endorsement by an external author, journal, institution or religious authority unless such endorsement genuinely exists.

## Public-language design

Trust information should use plain labels such as:
- “Source”
- “Adapted from”
- “Inspired by”
- “Mira original production”
- “Public explanation”
- “Scientific source”
- “Translation reviewed”
- “Correction”
- “Withdrawn”

Internal enum names may remain in data/API layers but should not be exposed as unexplained technical jargon.

## Anti-badge inflation

The product must not create decorative badges whose purpose is to make weak evidence appear authoritative.

A badge/label must correspond to a defined review or provenance fact. Engagement metrics, follower counts and likes are never trust credentials.

## Item 24 acceptance criteria

1. Every suitable public work can expose a concise source/adaptation relationship.
2. A deeper provenance layer can expose exact records and versions.
3. Trust remains multidimensional rather than one universal score.
4. Rasterast acceptance is not displayed as scientific proof or independent religious authority.
5. Religious source, translation, commentary and Mira/Zanistarast interpretation remain distinguishable.
6. Scientific result, interpretation, uncertainty and public adaptation remain distinguishable.
7. Material Mira/AI involvement is traceable and meaningfully describable.
8. Unknown/disputed provenance remains representable as uncertainty.
9. Corrections/withdrawals propagate to public serving and dependent review.
10. Source links target relevant records/versions where possible.
11. External-source citation never fabricates endorsement.
12. Public trust labels use ordinary language.
13. Likes/popularity cannot become trust badges.
14. No fake precision or invented DOI/identifier is permitted.
