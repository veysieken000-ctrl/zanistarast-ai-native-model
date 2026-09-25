# Zanistarast.com — Multilingual Architecture

Status: LOCKED — Roadmap item 23

## Principle

Language is a representation layer of one canonical WORK, not a reason to duplicate the work into disconnected records. zanistarast.com must be able to grow from its initial languages to a genuinely multilingual public platform while preserving meaning, provenance, review state and cultural context.

Kurmancî/Kurdish is a first-class language in the platform architecture. Additional languages must be addable without redesigning the content model.

## Canonical identity

A WORK has one stable work_id regardless of how many language variants exist.

Language-specific material attaches through versioned LANGUAGE_VARIANT and REPRESENTATION records, including:
- localized title;
- short summary;
- public-language article;
- narration;
- subtitles/captions;
- dubbed audio;
- transcript;
- interface/discovery labels;
- representation-specific text.

A translation does not create a new source fact or silently replace the source language.

## Language metadata

Each variant should be able to record:
- language code;
- script where relevant;
- locale/region when meaningfully different;
- source language;
- translation direction;
- translator/production provenance;
- human/Mira-assisted status;
- version;
- review state;
- publication state;
- source/adaptation linkage;
- date/update metadata.

Unknown language/provenance must not be guessed.

## Kurmancî and Kurdish support

The system must treat Kurmancî as a first-class public language rather than an afterthought.

Architecture should also leave room for other Kurdish varieties/scripts when deliberately introduced. They must not be silently treated as interchangeable translations when vocabulary, script or meaning differs.

Canonical Zanistarast terms originating in Kurmancî should preserve their canonical spelling/meaning where required, with plain-language explanations in the target language rather than uncontrolled replacement.

## Translation fidelity

Translation may adapt syntax and idiom for natural comprehension, but must preserve:
- source meaning;
- epistemic status;
- uncertainty/caveats;
- source attribution;
- religious-source distinctions;
- scientific distinctions;
- cultural identity;
- moral/publication constraints.

A smoother translation must not become a stronger claim than the source.

## Religious material

Qur'anic text, translation/meaning, commentary, hadith/sirah material, Risale-i Nur material and Zanistarast/Mira explanation must remain distinguishable in every language.

Mira must not generate a translation that is presented as an authoritative sacred text or religious ruling merely because it is fluent.

Within this project's governing framework, translated/adapted public material remains subject to the applicable Qur'anic-ruling and Prophetic-ethics publication constraints and the relevant review process.

## Scientific material

For scientific-source adaptations, translation must preserve terms such as hypothesis, evidence, limitation, interpretation, analogy and uncertainty.

A translated .com explanation remains linked to the exact eligible .org/source version where applicable. Translation cannot invent a DOI, publication state or scientific conclusion.

## Subtitles and captions

Subtitle/caption tracks are versioned language assets. They should support:
- spoken-dialogue transcription;
- translated subtitles;
- meaningful non-speech audio descriptions where appropriate;
- speaker identification where needed for comprehension.

Automatic captions may be used as a draft, but material errors must be correctable/reviewable before they are treated as approved publication assets.

## Dubbing and narration

Dubbed audio/narration must remain synchronized to the approved meaning. Voice performance may adapt natural phrasing but must not introduce new claims or dialogue presented as source-authentic.

Voice/audio rights and provenance remain subject to Item 18. A generated or performed voice must not falsely impersonate a real person's authorized speech.

## UI localization

Navigation, controls, errors, accessibility labels and system messages must be localizable separately from work content.

No core action should be embedded only as hard-coded text inside media assets.

Layout must tolerate longer/shorter translated labels and, when later required, right-to-left scripts without changing the canonical work model.

## Discovery and search

Search should support language-aware titles, summaries and theme labels. A visitor may search in their selected language and reach a work even when the original source language differs, provided an appropriate indexed variant exists.

Recommendation may prefer available variants in the visitor's selected language but must not recommend an unapproved translation merely because the underlying work is approved.

## Fallback

When a requested language variant is unavailable, the UI must say so clearly and may offer another approved language.

It must never fabricate a translation on the fly and present it as reviewed content.

A future optional machine-translation preview, if ever introduced, must be explicitly labeled as unreviewed and must not replace the approved publication variant.

## Version and correction propagation

Language variants are independently versioned but linked to their source/base version.

When the canonical source or approved base text materially changes, dependent translations must be identifiable as potentially stale and routed for review.

A correction in one translation does not silently rewrite all other languages.

## Accessibility

Language selection must work with keyboard and assistive technologies. The document/player should expose the correct language metadata to browsers and screen readers.

Captions, transcripts and audio language tracks should be selectable through understandable controls.

## Item 23 acceptance criteria

1. One WORK can have many independently versioned language variants.
2. Kurmancî/Kurdish is first-class in the architecture.
3. Additional languages/scripts can be added without redesigning WORK identity.
4. Kurdish varieties/scripts are not silently conflated.
5. Translation preserves meaning, epistemic status, uncertainty and provenance.
6. Religious source text, translation and commentary remain distinct.
7. Scientific translation cannot strengthen claims or invent publication status.
8. Subtitles, captions, dubbing and narration are governed language assets.
9. Automatic language generation remains draft/unreviewed until applicable approval.
10. UI localization is separate from content translation.
11. Search/recommendation can prefer approved variants by language.
12. Missing languages fall back honestly rather than fabricating approved translations.
13. Source changes can mark dependent translations for re-review.
14. Language controls and metadata remain accessible.
