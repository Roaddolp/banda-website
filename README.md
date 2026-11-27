# BANDA! — Brand Showcase Website

A responsive brand storytelling website for BANDA!, a creative merchandising brand led by Multimedia Arts students. Original characters, artwork, the design process, exhibition documentation, and the team are presented through a pink, black, and white punk-grunge visual identity.

This is a brand showcase with an external merchandise-site link. It has no shopping cart, checkout, payments, accounts, or backend.

## Links and hosting

- [GitHub repository](https://github.com/Roaddolp/banda-website) — its root contains the website files and this README.
- [Live website on Cloudflare Pages](https://banda-website.pages.dev/).
- [GitHub Pages deployment](https://roaddolp.github.io/banda-website/) — also recorded as successful in the repository's deployment metadata.
- [Original BANDA! merchandise website](https://banda-shop.pages.dev/) — for exploration; **pre-orders are currently closed**.

Cloudflare Pages and the original merchandise URL were checked on November 27, 2026. Local changes do not imply that the deployed website has been updated.

## Pages and features

| Page / Section | Current implementation |
| --- | --- |
| `index.html` | Brand introduction, original artwork, and responsive hero |
| Meet the Noise | Interactive profiles for Bam, Melody, and Blaze |
| Logo Design & Development | Initial sketches, photo referencing, element organization, and developed wordmark |
| Product Design & Development | Four merchandise category cards and a contrasting Behind the Designs storytelling panel |
| Behind the Noise | Exhibition documentation through a continuous, swipeable photo marquee |
| About & Contact | The 16-member team grouped by department, plus email and telephone links |
| `products.html` | Creative Works: 35 documented designs, category filters, pagination, and artwork spotlights; selected works have front/back previews |
| Products closing CTA | External merchandise-site link with a closed-preorder notice |

Both pages share navigation for Meet the Noise, Merch, Background, Exhibition, About, and Contact. The BANDA! logo links home. A mobile hamburger menu, active-section tracking, keyboard focus feedback, touch interactions, scroll reveals, and reduced-motion support complement the responsive layouts.

## Exhibition marquee

The current gallery contains **25 photographs across eight internal chapters**:

Preparation (2) → Booth (2) → Showcase (3) → Social (6) → Instruments (3) → Entertainment (3) → Photoshoot (5) → Group Pic (1).

Chapter labels are not displayed in the gallery.

- Continuous right-to-left autoplay runs at 24 CSS pixels per second.
- Mouse dragging and horizontal touch swiping browse in both directions; vertical page scrolling remains available.
- Autoplay pauses during manual interaction and resumes from the current position afterward. Keyboard focus pauses motion while visitors browse with Left/Right/Home/End.
- Inert, accessibility-hidden duplicate groups on either side maintain seamless looping in both directions.
- Reduced-motion mode disables autoplay while retaining manual browsing. There is no Pause/Play button.
- Without JavaScript, the static HTML strip contains all 25 photographs. The enhanced gallery reads `js/data/exhibition.json`.

Optimized WebPs preserve orientation and aspect ratios, with desktop and smaller variants. The final Group Pic retains its original asset filename while its manifest sequence is now 25. See `assets/images/exhibition/README.md` for the photo inventory and preparation details.

## Technologies and structure

Semantic HTML5, CSS, vanilla JavaScript, inline SVG, and WebP. No framework, build step, runtime dependency installation, or backend is required. Fonts are self-hosted.

```text
index.html                  Homepage and exhibition
products.html               Creative Works page
css/                        Tokens, layouts, section styles, and enhancements
js/                         Navigation, dialogs, character/product interactions, exhibition
js/data/works.js             Merchandise data
js/data/exhibition.json      Ordered exhibition manifest and descriptive alt text
assets/images/              Optimized artwork, textures, and exhibition photographs
assets/fonts/               Self-hosted fonts and licenses
README.md
```

## Local development

1. Clone or download the repository and open its root in VS Code. In the supplied workspace, this is the `website/` folder.
2. Start Live Server / Live Preview from that folder, or use Python if installed:

   ```sh
   python -m http.server 8000
   ```

3. Open `http://localhost:8000/index.html` and `http://localhost:8000/products.html`.

Use HTTP rather than `file://`: the exhibition manifest loads through `fetch()`. No `npm install` or build command is needed. For static hosting, publish the repository root containing both HTML files and `assets/`.

## Status and review

BANDA! v1.1 is undergoing client feedback and local refinement. Recent changes include the editorial product narrative, separate merchandise-site CTA, exhibition marquee, updated navigation, responsive hero-height safeguards for tall Desktop Site viewports, and visible text-selection colors on pink surfaces.

Local browser checks cover desktop/mobile layouts, photo order and loading, loop boundaries, dragging/swiping, keyboard browsing, reduced motion, and the static fallback. Touch checks use browser emulation; final physical-device visual and performance review remains useful. Publication of team/contact details and exhibition imagery remains subject to client approval for public release.

The former card-stack implementation is archived outside this Git repository at `../archives/exhibition-card-stack-v1.zip` in the supplied workspace. This is a local recovery artifact, not a production dependency or a file included in a repository download.

## Development Credits

- Website development: Rodolfo Quim Jr., Second-year BS Information Technology student at Cavite State University – Silang Campus.
- Brand identity, illustrations, characters, and merchandise designs: BANDA! Creative Team

## Acknowledgments

This project was developed using an AI-assisted development workflow, with human-led design decisions, implementation review, testing, and iterative refinement.

## Asset Rights

BANDA! branding, illustrations, characters, and merchandise artwork belong to their respective creators.

The website uses Barriecito and Barlow fonts under the SIL Open Font License.

Public distribution of brand assets is subject to the approval of their respective owners.
