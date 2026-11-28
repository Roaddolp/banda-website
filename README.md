# BANDA! — Brand Showcase Website

A responsive brand storytelling website for **BANDA!**, a creative merchandising brand led by Multimedia Arts students.

The website introduces the brand’s original characters, documents its creative development, showcases merchandise designs, and celebrates the people behind the project through a pink, black, and white punk-grunge visual identity.

This is a **brand showcase website**, not an online store. It does not include checkout, payments, customer accounts, or backend services.

## Live Website

- **Cloudflare Pages:** [banda-website.pages.dev](https://banda-website.pages.dev/)
- **GitHub Repository:** [Roaddolp/banda-website](https://github.com/Roaddolp/banda-website)
- **GitHub Pages:** [roaddolp.github.io/banda-website](https://roaddolp.github.io/banda-website/)
- **Original Merchandise Website:** [banda-shop.pages.dev](https://banda-shop.pages.dev/)

**Pre-orders on the original merchandise website are currently closed.**

## Website Content

### Homepage

- **Brand Introduction** — BANDA!’s identity, official logo, and character artwork.
- **Meet the Noise** — Interactive profiles introducing Bam, Melody, and Blaze.
- **Logo Design & Development** — Initial sketches, photo referencing, element organization, and the developed wordmark.
- **Product Design & Development** — Merchandise category cards and a “Behind the Designs” editorial panel presenting the client’s design narrative.
- **Behind the Noise** — Exhibition documentation through a continuous, draggable photo marquee.
- **About** — Team credits organized into Communications, Logistics, Finance, and Creatives.
- **Contact** — Official email and telephone links.

### Products Page

- Creative Works introduction featuring official BANDA! artwork.
- Showcase of **35 documented designs** across acrylic keychains, pins, stickers, and bracelets.
- Category filtering and pagination.
- Artwork spotlights, including front/back previews where available.
- External merchandise-site CTA with a closed-preorder notice.

## Features

- Responsive layouts for desktop, tablet, and mobile.
- Shared navigation with a mobile hamburger menu.
- Homepage section tracking and cross-page anchor links.
- Interactive character profiles and merchandise spotlights.
- Mouse hover, keyboard focus, and adaptive touch feedback.
- Subtle scroll-triggered reveals and scrapbook-inspired process animations.
- Reduced-motion support.
- Optimized image assets and self-hosted fonts.
- Consistent favicon branding using the official black BANDA! logo.

## Exhibition Gallery

The exhibition marquee contains **25 photographs** in the following order:

| Chapter | Photographs |
| --- | ---: |
| Preparation | 2 |
| Booth | 2 |
| Showcase | 3 |
| Social | 6 |
| Instruments | 3 |
| Entertainment | 3 |
| Photoshoot | 5 |
| Group Pic | 1 |

Chapter names are maintained internally and are not displayed as gallery labels.

The gallery supports:

- Continuous right-to-left autoplay.
- Seamless looping in both directions.
- Horizontal mouse dragging and touchscreen swiping.
- Temporary autoplay pause during manual interaction, followed by continuation from the current position.
- Keyboard browsing with Left, Right, Home, and End.
- Paused motion during keyboard focus.
- Manual browsing without autoplay when reduced motion is preferred.
- A scrollable photo-strip fallback when JavaScript is unavailable.

There is no visible Pause/Play control.

## Visual Identity

The website follows BANDA!’s supplied creative direction:

- **Light Pink:** `#F97BB2`
- **Deep Pink:** `#D94283`
- **Black:** `#000000`
- **White:** `#FFFFFF`
- **Fonts:** Barlow and Barriecito

Grunge textures, halftones, layered-paper details, collage compositions, and torn section transitions support the brand’s digital punk-zine presentation.

## Technologies

- Semantic HTML5
- CSS3
- Vanilla JavaScript
- Intersection Observer API
- Pointer Events
- `requestAnimationFrame`
- WebP, PNG, ICO, and SVG assets

No frontend framework, build step, database, or backend is required.

## Project Structure

```text
website/
├── index.html
├── products.html
├── favicon.ico
├── css/
│   ├── tokens.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── characters.css
│   ├── development.css
│   ├── works.css
│   ├── exhibition.css
│   ├── team.css
│   └── enhancements.css
├── js/
│   ├── main.js
│   ├── enhancements.js
│   ├── characters.js
│   ├── dialog.js
│   ├── sketch-pendulum.js
│   ├── works.js
│   ├── exhibition.js
│   └── data/
│       ├── works.js
│       └── exhibition.json
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── images/
└── README.md
```

In a repository clone, the contents shown inside `website/` are the repository root.

## Running Locally

1. Clone or download the repository.
2. Open the website folder in Visual Studio Code.
3. Start a local HTTP server using **Live Server**, **Live Preview**, or Python:

   ```sh
   python -m http.server 8000
   ```

4. Open:

   ```text
   http://localhost:8000/index.html
   http://localhost:8000/products.html
   ```

Use an HTTP server rather than opening the HTML files through `file://`, because the exhibition gallery loads its manifest using `fetch()`.

No dependency installation or build command is needed.

## Content and Asset Maintenance

- Update merchandise data in `js/data/works.js`.
- Update exhibition ordering, paths, dimensions, and alt text in `js/data/exhibition.json`.
- Keep the static exhibition strip in `index.html` synchronized with the manifest.
- Store optimized production images in `assets/images/`.
- Preserve original client artwork and full-resolution photographs separately.
- Keep client-authored copy and team information consistent with approved sources.

Exhibition photographs have desktop and smaller WebP variants. Original aspect ratios and orientation are preserved without unnecessary cropping.

## Accessibility and Verification

The implementation includes semantic controls, descriptive image text, visible keyboard focus, accessible dialog and navigation behavior, and reduced-motion alternatives.

Development checks have covered:

- Desktop and mobile layouts.
- Keyboard navigation and focus behavior.
- Emulated touchscreen interactions.
- Merchandise category links and gallery controls.
- Exhibition image loading, sequence, looping, and manual browsing.
- Scroll-reveal behavior and visibility fallbacks.
- Text-selection contrast on pink backgrounds.
- Horizontal overflow, missing resources, and browser errors.
- Favicon references and asset loading.

Browser emulation does not replace physical-device testing. Final visual and performance review on actual devices remains recommended.

## Project Status

BANDA! v1.1 includes the major content sections and is undergoing iterative client review and refinement.

Local changes may differ from the currently deployed version until they are reviewed and published. Public use of team details, contact information, and photographs remains subject to client authorization.

## Development Credits

- **Website Development:** Rodolfo Quim Jr., second-year BS Information Technology student at Cavite State University – Silang Campus.
- **Brand Identity, Illustrations, Characters, and Merchandise Designs:** BANDA! Creative Team.

## Acknowledgments

Developed through an AI-assisted workflow with human-led requirements, design decisions, implementation review, testing, and refinement.

## Asset Rights

BANDA! branding, illustrations, characters, merchandise artwork, and photographs belong to their respective creators and rights holders.

Barlow and Barriecito are used under the SIL Open Font License. Public redistribution or reuse of client assets requires appropriate authorization.
