# BANDA! — Milestones 1–4

Two-page brand showcase built with semantic HTML, CSS, and vanilla JavaScript. No installation or build step is required. Current architecture is documented below; earlier milestone notes describe prior checkpoints.

## Run

Open this `website` folder in VS Code. With Microsoft's **Live Preview** extension installed, open `index.html` and select **Show Preview**. Alternatively, use an existing static HTTP server with `website` as its root. Do not open the whole original artwork folder as a public hosting root.

## Files

- `index.html`: actual client overview, header, hero, introduction, and footer.
- `products.html`: editorial collection introduction, category gallery, and artwork spotlight.
- `css/tokens.css`: palette, fonts, spacing, and content width.
- `css/base.css`: shared browser defaults and accessibility rules.
- `css/layout.css`: desktop and mobile layout.
- `css/components.css`: branding, collage, and original CSS textures.
- `css/development.css`: Milestone 2 process layouts and small-screen navigation adjustment.
- `css/characters.css`: Meet the Noise posters, restrained hover depth, and responsive spotlight styling.
- `js/characters.js`: native-dialog enhancement, focus/scroll management, and backdrop closing.
- `js/dialog.js`: shared native dialog focus, backdrop, Escape, and scroll behavior for both spotlight types.
- `css/works.css`: category discovery, filtered gallery, pagination, and artwork spotlight styling.
- `js/data/works.js`: 35 PDF-sourced design records, image/view mappings, and category counts.
- `js/works.js`: category selection, six-item pagination, and artwork exploration.
- `WORKS_CONTENT_NOTES.md`: complete source-asset mapping and unresolved content discrepancies.
- `js/main.js`: keyboard focus handling for native anchor navigation.
- `assets/images/`: optimized copies and an original vector texture, with original source artwork untouched.
- `assets/fonts/`: self-hosted Barriecito and Barlow fonts, with their SIL Open Font License files.
- `review/375.png` and `review/1440.png`: reviewed mobile and desktop screenshots.

## Content and assets

Overview copy comes from page 2 of `DESIGN THEORY Group Website Info.pdf`. Process copy comes from pages 5–7. The three provisional character biographies, roles, tags, signature colors, and taglines come from the user's supplied Milestone 2 refinement request, which explicitly authorizes their use in the private preview. No additional lore or commerce information has been added.

The white borderless remade logo and character group image come from the supplied artwork folders. WebP copies trim transparent outer margins and resize the artwork; no character artwork was redrawn. The small group image supports mobile delivery. Texture, paper edges, and tape are CSS decoration, not borrowed mood-board imagery.

Typography uses **Barriecito Regular** for the expressive introduction heading and **Barlow Regular/Bold** for body text, labels, and navigation. Both are named in the client reference. Fonts are served locally with `font-display: swap`; Arial is the body fallback. Header, hero, and footer branding use the supplied custom wordmark artwork.

Fonts were obtained from the official Google Fonts repository: https://github.com/google/fonts/tree/main/ofl/barriecito and https://github.com/google/fonts/tree/main/ofl/barlow. Their original `OFL.txt` licenses are retained under descriptive filenames. No proprietary font has been substituted or redistributed. TTF files are used directly to avoid adding a font-processing dependency.

The refinement adds an original procedural SVG scuff/scratch texture, CSS halftone patches, a second paper layer, and textured tape. Pseudo-elements isolate decoration from content; opacity and masks keep paragraph areas quieter. The SVG uses vector shapes rather than enlarged PDF crops. Its tiling is intentional and can be adjusted through `background-size` and opacity in `components.css`.

All three source overview sentences are preserved. Repeated decorative merchandise category lists were removed; the full merchandise sentence remains in the introduction. The hero identifies the business, while the introduction introduces the characters and merchandise.

## Scope

Home, Products, Meet the Noise, Design Development, About, and Contact are linked. Team credits and contact details live in the homepage About and Contact sections. Nothing is deployed. Creative Works is a design portfolio without any purchasing functionality.

Current character experience: **MEET THE NOISE** uses clickable posters and native dialog spotlights. The current implementation described at the end supersedes the earlier character-refinement notes below.

## Manual review

Check the page at 375 px and desktop widths; review artwork size, visual rhythm, text wrapping, anchor navigation, keyboard focus, and browser zoom. Mobile hardware, Safari, and other installed font combinations require a real-device review. Review content and asset publication permissions before any future public release.

## Design reference pack refinement

Reviewed all four extracted backgrounds, the typography panel, licensing notes, and six-family specimen configuration alongside PDF pages 1–2. The pack's images are reference-only, and its six-font `@import` is not included in the website.

- Hero: stronger white-on-black halftone patches with faint background scuffs.
- Collage: official deep pink overlaid with black shading, white scratches, and print dots; existing white paper and tape remain.
- Introduction: original `dry-ink.svg` creates broken ink marks around the pink edges; halftone wear anchors the lower-left corner. Masks leave the main reading area quieter.
- Typography: retain client-listed Barriecito for the one display heading and Barlow Regular/Bold for reading/navigation. Roboto would duplicate Barlow's role; Oswald would add another display voice; Permanent Marker and Special Elite are unnecessary for the current content. No proprietary font is embedded. Existing font sources and OFL files remain unchanged.

The reference's photographic light/shadow is interpreted through shading on the collage, not through unlicensed photographs or new brand colors. All texture effects are static, non-interactive CSS/vector layers; no animation or extra runtime dependency was added.

Recovery copy: `../checkpoints/milestone-1-before-reference-pack.zip` contains the complete website before these changes. Extract it to a separate folder to compare or recover files without overwriting the current version.

## Full-bleed section layout

Hero and introduction sections span the viewport; their `.section-inner` wrappers center content within the existing 1440px maximum (including side padding). The grids live on the inner wrappers, while textures and torn edges stay on the full-width sections. Side padding stops growing at 69.12px, matching the previous 1440px layout. No content, font, artwork, or navigation logic was changed.

The pre-change version is preserved in `../checkpoints/milestone-1-before-full-bleed.zip`. Updated screenshots include `review/2560.png` for wide-desktop review.

## Milestone 2 — Design Development

The new section follows the actual three process headings on content PDF pages 5–6: Initial Sketches & Design, Photo Referencing (Digitalization), and Organizing the Elements. No dates, historical claims, or extra development stages were added. Paragraph breaks were introduced for readability without changing the source wording.

Five WebP copies under `assets/images/process/` use the supplied logo folder:

| Web copy | Original client asset |
| --- | --- |
| `lettering-explorations.webp` | `logo sketches/logo first concept attempts.png` |
| `wordmark-sketch.webp` | `logo sketches/logo sketch 1.png` |
| `circular-sketch.webp` | `logo sketches/logo sketch 2.png` |
| `digital-wordmark.webp` | `logo variations/FIRST VER. BANDA LOGO (malabo, borderless).png` |
| `developed-wordmark.webp` | `logo variations/REMADE BANDA LOGO (main).png` |

Originals remain untouched. Sketches retain their complete contents; transparent outer margins are trimmed on the two digital wordmarks. The five copies total 148,120 bytes, with lazy loading and explicit dimensions. The first digital wordmark is a small original; slight softness is inherent in that source.

Product Design & Development uses only the complete, consistent source sentence: “Our merchandise designs were created to not only be cute, but also relatable and funny.” Excluded: “Corr theme was music”; older Bam-only sticker/keychain and motif claims; glossy/matte options; and the button-pin terminology that conflicts with hard-enamel item descriptions. The category list is already present in the introduction. No History/Origin content exists to publish.

The mobile header uses a second row for navigation so the new completed-section link remains readable and tappable. Milestone 1 section markup, styles, fonts, and images remain unchanged.

Review captures: `review/milestone-2-375.png` and `review/milestone-2-1440.png` show the new section; corresponding `milestone-2-full-*.png` files show the complete page. Recovery: `../checkpoints/milestone-1-accepted.zip`.

## Milestone 2 refinement and character integration

- Hero: logo width reduced to 90% on desktop / 94% on mobile; explicit column gap adds breathing room without changing the two-column direction.
- Characters: three original-character posters within Introduction. Native `<details>` / `<summary>` exposes each full, unmodified supplied biography and tags. This is keyboard accessible without a dialog, script, motion, or external dependency. Each biography is identified as provisional by the preview note above the posters.
- Identity colors: the official pink/black/white page system remains. Yellow `#F2D34F` and red `#E84438` are small illustrative signature-color swatches only; these values are preview interpretations, not new approved brand tokens.
- Process: numbered editorial waypoints distinguish the supplied topics and give the developed wordmark a larger closing presentation. The circle sketch accompanies Organizing the Elements; the source's closing sentence now accompanies the wordmark. Numbers organize the exhibition; no dates or new historical claims are added.
- Product development: four selected artifacts accompany the existing sentence. No product listings, ordering controls, prices, or catalog behavior.

New optimized image copies (originals unchanged):

| Web copy | Supplied source |
| --- | --- |
| `characters/mel-portrait.webp` | `products/products/acrylic keychains/mel keychain/banda_keychain_mel.png` |
| `characters/bam-portrait.webp` | `products/products/acrylic keychains/bam keychain/banda_keychain_bam.png` |
| `characters/blaze-portrait.webp` | `products/products/acrylic keychains/blaze keychain/banda_keychain_blaze.png` |
| `artifacts/keep-quiet.webp` | `products/products/stickers/yuki_banda_sticker1.png` |
| `artifacts/guitar.webp` | `products/products/acrylic keychains/misc keychain 2/banda_keychain_guitar.png` |
| `artifacts/bags-coded.webp` | `products/products/pins/25mm/boys coded.png` (art reads Bags coded) |
| `artifacts/cherry-bomb.webp` | `products/products/bracelets/cherry bomb.png` |

These copies trim transparent margins, preserve proportions, and use WebP. The three portraits are existing character illustrations from front-side keychain artwork, not new character designs. Seven new images total 215,486 bytes. No old storefront code or files were accessed; the screenshots were visual references only.

Client review before public publication: approve all biographies, roles, tags, taglines, signature colors, and the character-art selection. In particular, Bam's supplied biography says yellow bandana while this supplied portrait appears orange/red. The biography is preserved provisionally and the image alt text avoids asserting a bandana color. No correction or invented explanation has been published.

Recovery: `../checkpoints/milestone-2-before-character-refinement.zip`. Current screenshots use the `review/refinement-*` filenames. Original content disputes from the previous milestone remain excluded. No subsequent milestone has been implemented.

## Current refinement — Meet the Noise interaction

The character heading is now **MEET THE NOISE**. The original introduction and all biographies, roles, and taglines remain intact. Signature-color labels/swatches and the visible development notice have been removed. Every poster uses the same official pink, black, and white framework; the existing illustrations provide individual identity. No other section was redesigned.

Default: each poster shows name, role, tagline, illustration, and an Explore caption. With JavaScript, a real button covers each poster. Fine-pointer hover lifts and tilts the poster slightly, with independent illustration movement; the caption changes contrast. Reduced motion disables transforms and transitions. Touch uses tap directly and requires no hover.

Expanded: one native `<dialog>` receives a clone of the selected card's existing artwork and profile text. The same biography stays in one HTML source. `showModal()` makes the rest of the page inert. Close is initially focused, Tab wraps inside the dialog, and Escape, the visible Close button, or a pointer press/release outside the dialog closes it. Background scrolling is locked while preserving the original scroll position and body styles, then focus and scroll return to the exact opening card. The close button stays reachable while the dialog scrolls on smaller screens.

Without JavaScript or native dialog support, posters retain their original `<details>` profiles instead. No biography depends on JavaScript being available.

**Internal publication status:** all supplied character biographies, roles, taglines, and tags are still provisional and require BANDA! team approval. This status is documented here rather than displayed in the design. The source's bandana-color statements remain verbatim in biographies; no separate signature-color claims are added. Bam's yellow-bandana wording versus the artwork still needs team confirmation. Nothing has been published.

Review: `review/noise-lineup-1440.png`, `review/noise-lineup-375.png`, `review/spotlight-1440.png`, and `review/spotlight-375.png`. Recovery: `../checkpoints/milestone-2-before-interactive-characters.zip`. The host-specific QA helper is outside the website at `../checkpoints/check-character-spotlight.cjs`; it is not a site dependency or deployment file.

## Focused hero and character color refinement

The hero collage no longer has visible name labels. An empty, accessibility-hidden spacer preserves the former caption's block height so the artwork and hero layout do not move.

Meet the Noise now uses official deeper pink `#D94283`. Black introduction copy sits on a matching solid background with a soft same-color shadow that keeps texture out of the reading area. Decorative ink opacity is reduced. All posters share black headers/footers, white outlines, and light-pink halftone artwork panels. Names, roles, taglines, biographies, hover behavior, and spotlight logic are unchanged. Other completed sections remain intact.

Current review screenshots: `review/colors-full-1440.png` and `review/colors-full-375.png`, with separate `colors-hero-*` and `colors-meet-the-noise-*` crops. Recovery: `../checkpoints/before-focused-character-colors.zip`. Earlier screenshots remain historical review captures.

## Interactive category discovery and Creative Works

The preserved Product Design & Development sentence now introduces four category posters. Each poster moves its actual artwork independently on fine-pointer hover: keychains swing/lift, pins tilt/lift, stickers angle/lift, and bracelets rotate/lift. These effects are triggered, not continuous, and reduced motion removes movement.

Selecting a poster activates its category, resets pagination, updates `#creative-works`, focuses that section, and scrolls to it. Reduced motion uses immediate scrolling. The four gallery buttons support category switching in place, with `aria-pressed` active states and a live collection/range status. Only the selected collection is rendered, six works at a time; Previous/Next controls make longer collections manageable.

The 35 unique records are 5 keychains, 15 pins, 10 stickers, and 5 bracelets. Titles, specification text, and descriptions were extracted from content PDF pages 2–5; source line wrapping is normalized but wording is preserved. There are 40 large artwork views (five keychains have front/back) and 35 smaller responsive thumbnails. Original images are untouched. Optimized gallery images total 3,839,054 bytes, loaded per selected collection/view rather than all at once.

Opening a work shows its title, category, original description/specification, and larger image. The five keychains have Front/Back buttons. Pin sizes remain in the original specification text, not invented image variants or duplicate designs. See `WORKS_CONTENT_NOTES.md` for the visual audit, missing size-specific files, repeated pin assets, and source discrepancies requiring client review.

Character and artwork spotlights share `createBandaSpotlight` in `js/dialog.js`, retaining native modal behavior, keyboard wrapping, close/backdrop/Escape handling, scroll lock, and return focus. Character content/rendering remains separate. Existing character regression tests passed after this refactor.

JavaScript is required for collection switching and artwork dialogs; a no-JS message explains that limit, while existing character details remain usable. Use the documented local server workflow. No API, backend, external font/image request, framework, or commerce control is added.

Screenshots: `review/discovery-1440.png`, `review/discovery-375.png`, `review/creative-works-1440.png`, `review/creative-works-375.png`, and `review/artwork-spotlight-*.png`. Recovery: `../checkpoints/before-creative-works.zip`. The preparation and QA helpers in `../checkpoints/` are host-specific development tools, not site dependencies or a required build step. Edit `js/data/works.js` for future approved content updates.

## Earlier two-page architecture (historical checkpoint)

- `index.html`: Meet BANDA! leads to `#introduction`; View Products opens `products.html`. Product Design & Development is its own full-bleed pink/textured section, with the existing 1440px inner container and a torn-paper transition. Its original statement and four object-specific hover treatments remain.
- `products.html`: oversized existing typography, Bam keychain art, and Keep Quiet sticker art introduce Creative Works. The original merchandise-category sentence and verified 35-design/4-category count provide context. The existing gallery, pagination, and artwork dialog follow.
- Both pages share matching static logo/navigation links and `aria-current="page"`. Section links include `index.html#...`, so they work from either page. Products has footer navigation home and Back to top.
- Homepage category links are real shareable links such as `products.html?category=pins`. The homepage no longer loads the collection dataset/gallery script.
- `js/works.js` validates the URL category against four known categories. Missing/invalid values use keychains. Switching categories resets pagination and pushes the category into browser history; Back/Forward reads the URL again. Unknown values are never inserted as content.
- Rendering, descriptions, all 35 records/40 views, and spotlight behavior are reused. No new artwork, dependencies, or commerce controls were added.

Run the same local preview server with `website/` as its root. Both HTML pages must stay together with their shared folders. Gallery interaction still requires JavaScript. Without JavaScript pages/category links navigate, but gallery controls remain disabled with an explanatory message.

Changed: `index.html`, new `products.html`, `css/works.css`, and `js/works.js`, plus documentation. Character profiles, logo process, shared dialog code, images, product data, and font files remain unchanged. Team & Contact remains outside scope.

Recovery: `../checkpoints/before-two-page-architecture.zip`. Updated screenshots: `review/two-pages-home-1440.png`, `review/two-pages-home-375.png`, `review/two-pages-products-1440.png`, `review/two-pages-products-375.png`, and `review/two-pages-discovery-*.png`.

## Current navigation and homepage sections

Home | Products | Meet the Noise | Design Development | About | Contact.
About links to `index.html#about`; Contact links to `index.html#contact` on both pages.
Team credits and Get in Touch appear only on the homepage. Same-page anchor navigation scrolls smoothly (instantly with reduced motion) and updates keyboard focus. The homepage marks the current reading section with `aria-current="location"`; Products retains its page-level active state.

The temporary standalone pages were removed after verifying complete content restoration. Recovery checkpoint: `../checkpoints/before-restoring-homepage-sections.zip`.
