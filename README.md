
# BANDA! — Brand Showcase Website

A responsive, interactive brand showcase website for BANDA!, a creative brand that brings original characters, expressive illustrations, and merchandise designs together.

The website translates BANDA!'s visual identity into a digital experience through scrapbook-inspired layouts, textured backgrounds, expressive typography, and interactive artwork presentations.

## Overview

The project provides a dedicated digital space to explore the brand, its original characters, creative development process, merchandise designs, and the team behind BANDA!.

Built with semantic HTML, CSS, and vanilla JavaScript, the website operates without external frameworks, backend services, or build dependencies.

## Features

- Responsive layouts for desktop and mobile devices
- Interactive character profiles and artwork spotlights
- Creative Works gallery featuring 35 unique designs
- Category filtering and gallery pagination
- Front and back artwork previews for selected designs
- Brand design and development showcase
- Scroll-based animations and interactive visual effects
- Accessible navigation and keyboard interactions
- Reduced-motion support
- Optimized WebP image assets and self-hosted typography

## Website Structure

| Section | Description |
| --- | --- |
| Home | Brand introduction and visual identity |
| Merch | Interactive merchandise and artwork showcase |
| Meet the Noise | Original character profiles |
| Background | Creative process, sketches, and logo development |
| About | The creative team behind BANDA! |
| Contact | Contact information and communication channels |

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- SVG
- WebP

## Project Structure

```text
website/
├── index.html
├── products.html
├── css/
│   ├── tokens.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── development.css
│   ├── characters.css
│   └── works.css
├── js/
│   ├── main.js
│   ├── characters.js
│   ├── dialog.js
│   ├── works.js
│   └── data/
│       └── works.js
├── assets/
│   ├── images/
│   └── fonts/
└── README.md
```

## Getting Started

No installation or build process is required.

1. Clone or download the repository.
2. Open the project folder in Visual Studio Code.
3. Start a local static server using Live Preview or Live Server.
4. Open `index.html` in your browser.

## Design and Development

The website follows BANDA!'s existing visual identity, incorporating its original artwork, brand colors, typography, and creative direction.

The implementation emphasizes responsive design, interactive storytelling, accessibility, and efficient asset delivery.

## Project Status

Initial development completed.

Currently undergoing feedback, final review, and deployment preparation.

## Development Credits

- Website development: Rodolfo Quim Jr., Second-year BS Information Technology student at Cavite State University – Silang Campus.
- Brand identity, illustrations, characters, and merchandise designs: BANDA! Creative Team

## Acknowledgments

This project was developed using an AI-assisted development workflow, with human-led design decisions, implementation review, testing, and iterative refinement.

## Asset Rights

BANDA! branding, illustrations, characters, and merchandise artwork belong to their respective creators.

The website uses Barriecito and Barlow fonts under the SIL Open Font License.

Public distribution of brand assets is subject to the approval of their respective owners.

---

Developed by Rodolfo Quim Jr.

## BANDA! v1.1 — Task 5: functional exhibition gallery

`index.html#exhibition` sits after Product Design & Development and before About. It loads the prepared `js/data/exhibition.json` manifest; the image count is derived from its image entries (currently 20 across seven chapters). Existing navigation is unchanged.

- `css/exhibition.css`: responsive, fixed-height photo frame with contain sizing, metadata, and semantic controls. No stack transforms, rotations, or photo transitions.
- `js/exhibition.js`: sequential Previous/Next/Replay state, responsive image decoding before each swap, in-flight request guard, polite announcements, and focus preservation. Load failures leave the current image/index intact and allow retry.
- Without JavaScript or if the manifest cannot load, the first photograph and an ordered expandable list of all 20 image links remain available. Use the local HTTP preview workflow above for the interactive gallery.
- The final Group Pic remains visible; Next is disabled, and Replay returns to Preparation. Previous is disabled at the first photograph. Mobile control space is reserved to keep Replay from shifting the layout.

Verified: every photograph and chapter in forward/reverse order; first/last bounds; Replay; rapid input; failed-load/retry handling; mouse, keyboard and touch; 320, 375, 768 and 1440px layouts; no horizontal overflow; no normal-load console errors or broken resources; no-JS fallback; and existing character/category interactions. Products Page bytes remain unchanged. Desktop/mobile previews: `review/exhibition-functional-1440.png`, `review/exhibition-functional-375.png`.

Checkpoint: `../checkpoints/before-functional-exhibition.zip`. Task 6 card-stack animations are intentionally not implemented.

## Current exhibition: continuous photo marquee

The active `index.html#exhibition` now shows all 20 prepared photographs in manifest order in a continuous right-to-left row. Pause/Play preserves the current position. Touching or focusing the strip pauses motion for native horizontal browsing; keyboard Left/Right/Home/End also browse the photos. Reduced-motion mode disables autoplay and leaves a single static, scrollable group. Without JavaScript, the original HTML photo strip remains usable.

The seamless loop uses one inert, aria-hidden duplicate group; a group's measured width includes its final gap. A frame-rate-independent scroll position wraps by exactly that width. The first four small WebPs decode before enhancement; remaining prepared images load lazily.

The previous working photo-deck site is preserved outside this Git repository at `../archives/exhibition-card-stack-v1.zip`. Extract it into its own folder and serve that extracted root using the Run instructions above. ZIP integrity, source hashes, all referenced assets, independent archived-site photo navigation, 480ms animations, Replay, and Products interactions were verified before conversion.

Marquee verification: all 20 photos in both loop groups; native image decoding; identical loop geometry; Pause/Play; seam crossing; keyboard/touch panning; no-JS fallback; reduced motion; 320, 375, 768 and 1440px layouts; no browser errors or page-wide horizontal overflow. The Products Page and unrelated homepage sections are unchanged. Physical-device visual/performance review remains recommended.
