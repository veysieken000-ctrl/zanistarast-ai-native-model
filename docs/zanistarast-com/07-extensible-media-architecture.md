# Zanistarast.com — Extensible Media Architecture

Status: LOCKED — Roadmap item 7

## Principle

Zanistarast.com is not architected as a video-only service. A public work is the durable conceptual object; media are one or more representations through which that work can be experienced.

The architecture must be able to add future media types without redefining the identity of the work or weakening its provenance, Rasterast status, ethical constraints or source relationships.

## Work and representation

A WORK may represent a story, ethical question, adaptation, documentary treatment, public explanation or other admitted public content.

A WORK may have multiple REPRESENTATIONS, for example:

- film or short film;
- documentary;
- animation;
- cartoon;
- AI-assisted original audiovisual production;
- long-form or short-form video;
- audio narration;
- public-language article;
- illustration or image sequence;
- infographic or chart;
- map or timeline;
- interactive explanation/model;
- transcript, subtitles and accessibility alternatives;
- future media types not yet known.

Representations inherit the work's governing source/provenance and publication eligibility but also carry their own production, rights, cultural and review metadata.

## Media selection

No representation type is mandatory merely for completeness. Mira should select media according to explanatory and narrative value, audience, source rights, cultural context and production quality.

A weak or misleading video is not preferable to a strong story, image, audio treatment or readable article.

## Common representation metadata

Each representation should be able to record:

- representation ID and parent work ID;
- media kind and format;
- language;
- intended audience/age context;
- duration or reading time where relevant;
- creator/production provenance;
- AI-assisted/generated status where relevant;
- source/adaptation relationship;
- copyright/license/permission status;
- cultural setting and period;
- accessibility assets such as captions/transcript/alt text;
- Rasterast/review state;
- version and publication state;
- correction/withdrawal relationship.

## Media-specific review

Passing review for the abstract work does not automatically approve every generated representation. A new film, image, narration or translation can introduce new errors, cultural problems, misleading scenes, rights issues or meaning changes and therefore requires the applicable representation-level checks.

## Governing moral boundary

Every representation remains subject to the platform's binding publication constraints. In the governing framework defined for this project, no published representation may conflict with the applicable Qur'anic rulings and Prophetic ethics.

Mira must not invent a religious ruling when the rule/source is uncertain. Unresolved interpretive or source questions must be represented as unresolved and routed through Rasterast and, where required, Müdebbir review.

The same boundary applies to story, dialogue, character behavior as endorsed by the work, visual presentation, clothing/costume policy, audio, recommendation packaging, thumbnails and promotional material. Depicting wrongdoing for an ethically meaningful narrative is distinct from endorsing or glamorizing it; later narrative policy must preserve that distinction.

## Cultural fidelity

Media representations must preserve the known cultural identity of their source. Visual/audio adaptation of another people's story should research that people's appropriate local/traditional clothing, setting, architecture, geography and period rather than defaulting to contemporary generic aesthetics.

Anonymous/unassigned and the specifically governed Islamic/Risale-i Nur adaptation contexts may use the later-defined Kurdistan default visual context, subject to historical truth and the dedicated Cultural & Moral Visual Policy.

## Technical extensibility

Implementation should use stable media-kind identifiers plus extensible metadata rather than hard-coded page logic for every possible type. The player/viewer layer may dispatch to video, audio, image, reading or interactive renderers while retaining one common work page and recommendation model.

Unknown future media kinds must fail safely: metadata may be stored, but unsupported media must not render as another type or bypass review.

## Derivatives

Thumbnails, trailers, clips, previews, dubbed audio, translations, subtitles and social excerpts are derivatives of a representation/work. They are not exempt from source, moral, cultural, copyright or Rasterast constraints simply because they are short promotional assets.

## Item 7 acceptance criteria

1. WORK is separate from REPRESENTATION.
2. One work can support multiple media forms.
3. Future media types can be added without redesigning the core content identity.
4. Media choice follows explanatory value rather than quotas.
5. Every representation has provenance, rights, review and accessibility metadata.
6. Work approval cannot blindly approve a newly generated representation.
7. Qur'anic-ruling and Prophetic-ethics constraints apply across all media and derivatives.
8. Mira does not invent religious rulings when uncertain.
9. Cultural fidelity remains mandatory for visual/audio adaptations.
10. Unsupported future media fails safely rather than bypassing gates.
11. Thumbnails, trailers and other derivatives remain governed content.
