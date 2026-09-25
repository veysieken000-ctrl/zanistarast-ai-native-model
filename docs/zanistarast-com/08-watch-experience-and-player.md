# Zanistarast.com — Watch Experience and Player Architecture

Status: LOCKED — Roadmap item 8

## Principle

The primary watch experience should be as immediately understandable as mainstream video platforms while remaining recognizably Zanistarast.com and governed by its own ethical, provenance and accessibility rules. Familiar interaction patterns may be used; proprietary branding, visual assets or a pixel-for-pixel copy must not be reproduced.

## Core watch layout

Desktop:
- primary media/player is the dominant element;
- related eligible works may appear in a right-side discovery rail;
- title, compact context and actions sit directly beneath the player;
- the public-language reading layer and provenance/source layer continue below.

Mobile:
- primary media/player appears first;
- essential title/context/actions follow;
- expandable reading/source areas remain easy to reach;
- related works flow below rather than forcing a narrow side rail.

The layout must remain usable for non-video representations.

## Player controls

For video/audio where technically applicable, the player should support familiar controls:

- play/pause;
- seek backward/forward;
- scrub/progress timeline;
- elapsed/remaining duration;
- volume/mute;
- playback speed;
- captions/subtitles;
- quality selection when multiple renditions exist;
- fullscreen;
- picture-in-picture where platform/browser support and policy permit;
- keyboard controls and visible focus;
- touch-friendly controls on mobile.

Controls must not be intentionally hidden or made confusing to inflate watch time.

## Resume and state

A visitor may resume an unfinished work when consent/storage rules permit. Resume state is a convenience signal, not an ethical/recommendation judgment.

Future account-based history may synchronize progress, but anonymous use must remain possible unless a feature genuinely requires an account.

## Related-content rail

The right/below recommendation area may show:

- thematically related works;
- works about the same ethical value/question;
- works from the same source/culture/collection;
- age/context-appropriate continuations;
- personalized eligible works when preference data exists.

Only content admitted to the appropriate publishable pool may appear. Rasterast and other governing gates precede recommendation ranking.

## Actions beneath the work

The watch page should reserve a stable action area for features such as:

- Like;
- Save/Watch later when implemented;
- Share;
- Read/Understand;
- Source/Provenance.

A Like is a preference signal. It may improve future recommendations but cannot alter a work's truth, Rasterast or publication status.

## Reading below media

A concise public-language summary appears close to the work. Longer text can expand/collapse in place so a visitor can move from watching to reading without losing context.

The deeper source/provenance layer must remain reachable and must clearly identify adaptation/source status where required.

## Fullscreen and orientation

Fullscreen must enlarge the media rather than trap the visitor in a custom interface. Exiting fullscreen returns to the same work/context. Mobile orientation changes should preserve playback position where technically feasible.

## Accessibility

Player implementation must support semantic controls, keyboard operation, screen-reader labels, captions/subtitles and transcripts where applicable. Essential information must not depend solely on sound, color, hover or motion.

Autoplay with sound is prohibited by default. Motion/animation preferences should be respected.

## Ethical attention design

The platform may make continuing to another good work easy, but must not rely on deceptive infinite-scroll traps, false urgency, misleading thumbnails, forced autoplay with sound or controls designed to prevent stopping.

If autoplay-next is later enabled, it must be transparent and controllable, and every next item must already satisfy publication/admission gates.

## Performance and delivery

The player architecture should later support adaptive/rendition-based delivery, poster images, captions and efficient loading. The page should avoid downloading unrelated heavy media before the visitor needs it.

Media hosting/CDN/provider choices remain replaceable infrastructure details; the WORK/REPRESENTATION model must not depend on one vendor.

## Item 8 acceptance criteria

1. Desktop supports primary player plus related-content rail.
2. Mobile preserves the same hierarchy with recommendations below.
3. Standard playback, seek, speed, caption, volume and fullscreen controls are planned.
4. Controls are keyboard/touch accessible.
5. Public-language reading can expand beneath the media.
6. Source/provenance remains reachable.
7. Like is a preference signal, never an authority signal.
8. Recommendation can use preferences only inside the admitted content pool.
9. Autoplay with sound and deceptive attention patterns are excluded.
10. Resume/history is optional convenience and anonymous viewing remains possible.
11. Player infrastructure is vendor-independent.
12. Non-video representations can share the same work-page architecture.
