# Zanistarast.com — Canonical Work Data Model

Status: LOCKED — Roadmap item 10

## Principle

The durable unit of zanistarast.com is a WORK, not a video file, article page or recommendation card. A work carries identity, meaning, provenance and governance. Media representations, translations, derivatives and discovery metadata attach to that work without replacing it.

The model must scale from a small launch catalogue to many thousands of works without flattening cultural, source, scientific or ethical distinctions.

## Core entities

### WORK
Represents the public intellectual/narrative object.

Minimum conceptual fields:
- work_id;
- canonical_title;
- work_kind;
- short_summary;
- public_explanation;
- primary_language;
- intended_audiences;
- ethical themes/values;
- source/provenance references;
- cultural contexts;
- adaptation relationship;
- scientific eligibility where applicable;
- Rasterast state;
- Müdebbir state where required;
- publication state;
- version;
- created/updated timestamps;
- correction/withdrawal state.

### REPRESENTATION
A media realization of a work: film, animation, documentary, video, audio, article, illustration, infographic, map, timeline, interactive work or future type.

It references work_id and carries representation-specific language, duration/format, accessibility, production provenance, rights, cultural setting, AI-use disclosure, review and version metadata.

### SOURCE
A traceable source record with source family/type, title, creator/collector where known, edition/identifier/location where applicable, culture/people, language, date/period, relied-upon portion/proposition, rights status and provenance uncertainty.

A work may use multiple sources. A source may support multiple works.

### PERSON_OR_CREATOR
Represents authors, collectors, translators, narrators, directors or other credited contributors without conflating their roles.

### CULTURAL_CONTEXT
Represents known people/culture, geography, historical period, language and contextual notes. It supports faithful adaptation; it is not an ethnic ranking or truth score.

### THEME_VALUE
Public discovery concepts such as mercy, justice, honesty, trust, modesty, manners, responsibility, patience, family or friendship. These are navigation/discovery metadata, not replacements for Zanistarast ontology.

### COLLECTION
Editorial groupings such as films, animations, children's stories, world classics or thematic series. Collection membership cannot override publication gates.

### LANGUAGE_VARIANT
Stores translated/localized titles, summaries, approved reading text and related language metadata. Translation remains versioned and reviewable.

### REVIEW_RECORD
Records applicable Rasterast, source, cultural, legal/copyright, scientific, accessibility and production-quality reviews, including status, version reviewed, time and decision provenance.

### RIGHTS_RECORD
Tracks public-domain basis, license, permission, restrictions, attribution requirements and review state for sources and representations.

## Identity rules

- work_id is stable across media representations.
- representation_id is stable for a particular media realization.
- source_id identifies provenance independently from the work.
- a new translation does not create a new source fact.
- a materially different adaptation may require a distinct work linked to its parent/inspiration.
- withdrawn/superseded records are not silently deleted when audit history is required.

## Relationship model

The model must support relationships such as:

WORK adapts SOURCE
WORK inspired_by SOURCE
WORK translates/retells WORK
WORK related_to WORK
REPRESENTATION represents WORK
REPRESENTATION derived_from REPRESENTATION
WORK has_theme THEME_VALUE
WORK situated_in CULTURAL_CONTEXT
WORK member_of COLLECTION
WORK reviewed_by REVIEW_RECORD

Relationship type must be explicit so “inspired by” cannot silently become “translation of” or “scientifically supported by.”

## Governance inheritance

A representation inherits relevant constraints from its parent work, but inheritance never means automatic approval. Representation-level review remains necessary when new visual, audio, translation, cultural, legal or meaning risks are introduced.

A work cannot become PUBLISHED while mandatory blocking review states are unresolved.

## Religious and moral constraint metadata

The data model must be capable of recording that a work/representation has passed the applicable governing review for Qur'anic-ruling and Prophetic-ethics compatibility under this project's publication framework.

This field records a review decision; it must not be used to fabricate religious authority or imply that Mira independently issues religious rulings. Unresolved questions remain review/escalation states.

## Zanistarast scientific linkage

Where a work derives from eligible Zanistarast scientific material, the model should retain:
- exact source/version;
- .org canonical record;
- legitimate DOI/persistent identifier if one exists;
- scientific status;
- eligibility decision;
- correction/retraction linkage.

Public adaptation never overwrites the scientific record.

## User preference separation

Likes, saves, watch progress and recommendation signals belong to a separate user-interaction domain. They reference work_id/representation_id but must not modify canonical provenance, review or publication records.

## Extensibility

Core records should use stable identifiers, explicit enums/statuses where governance requires them, and extensible metadata for media-specific details. New representation types or discovery themes should not require destructive schema redesign.

Unknown values must remain unknown/null with provenance notes rather than being guessed to satisfy required fields.

## Item 10 acceptance criteria

1. WORK is the canonical durable content identity.
2. REPRESENTATION, SOURCE, CULTURAL_CONTEXT, THEME_VALUE, COLLECTION, LANGUAGE_VARIANT, REVIEW_RECORD and RIGHTS_RECORD are separate concerns.
3. Many-to-many source/work relationships are supported.
4. Relationship semantics such as adaptation, inspiration and translation are explicit.
5. Review/governance cannot be overwritten by engagement data.
6. Representation inheritance never means automatic approval.
7. Religious compatibility is recorded as review state, not fabricated authority.
8. Scientific .org/version/identifier/correction linkage is preserved where applicable.
9. User preference/history data is separated from canonical content truth/provenance.
10. Unknown provenance is stored as unknown, never invented.
11. The model can grow to new media/languages without destructive redesign.
