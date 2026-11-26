# Exhibition photo assets — preparation only

20 source photographs produced 40 WebP images: one desktop and one mobile copy per photograph.
Total encoded image size: 3,962,730 bytes (3.78 MiB).
No gallery, animations, navigation controls, or HTML changes were made.

## Sources and conversion

- Actual source directory: `exhibit photos/` at the workspace root (the supplied path said `exhibition photos/`).
- 17 JPEG files, including JPEG/MPO camera files, and 3 Canon CR2 files were decoded successfully.
- The CR2 copies use their embedded **6000 × 4000 camera-rendered JPEGs**, decoded from TIFF/CR2 IFD0. No RAW sensor demosaicing or new color grading was performed. No RAW developer was installed.
- EXIF orientation was applied before export. Embedded sRGB profiles were normalized to sRGB; unprofiled sources declare EXIF ColorSpace=1 (sRGB). Output retains a small sRGB ICC profile for color consistency.
- No cropping, upscaling, retouching, generated imagery, or source edits. EXIF/GPS and XMP were stripped from the web copies.
- Desktop: maximum long edge 1920px, WebP quality 82. Mobile: maximum long edge 1080px, WebP quality 78. Each original aspect ratio is retained.
- Social has `social.JPG`, then suffixes (3), (4), (5), (6), (7). This is six supplied photographs; no missing (2) was invented.

## Manifest

`website/js/data/exhibition.json` is standalone JSON and is **not loaded into either page yet**.
Paths resolve from the website root. `sequence` is global 1–20; `chapterPosition` is local to each chapter. `chapters` defines the seven-chapter order. Each image includes descriptive alt text, source mapping, desktop dimensions/bytes, and a `mobile` variant with its own path/dimensions/bytes. Use the actual width values for future responsive `srcset` generation, especially for portrait images.

## Files in order

Every desktop filename below has a matching `-small.webp` mobile copy.

| Order | Chapter | Desktop filename | Original source |
| --- | --- | --- | --- |
| 01 | Preparation | `01-preparation-01.webp` | `preparation.jpg` |
| 02 | Preparation | `02-preparation-02.webp` | `preparation (2).jpg` |
| 03 | Booth | `03-booth-01.webp` | `booth.jpg` |
| 04 | Booth | `04-booth-02.webp` | `booth(2).jpg` |
| 05 | Showcase | `05-showcase-01.webp` | `showcase.jpg` |
| 06 | Showcase | `06-showcase-02.webp` | `showcase (2).jpg` |
| 07 | Showcase | `07-showcase-03.webp` | `showcase(3).CR2` |
| 08 | Social | `08-social-01.webp` | `social.JPG` |
| 09 | Social | `09-social-02.webp` | `social (3).JPG` |
| 10 | Social | `10-social-03.webp` | `social (4).JPG` |
| 11 | Social | `11-social-04.webp` | `social (5).JPG` |
| 12 | Social | `12-social-05.webp` | `social (6).JPG` |
| 13 | Social | `13-social-06.webp` | `social (7).JPG` |
| 14 | Instruments | `14-instruments-01.webp` | `instruments.JPG` |
| 15 | Instruments | `15-instruments-02.webp` | `instruments(2).CR2` |
| 16 | Instruments | `16-instruments-03.webp` | `instruments(3).CR2` |
| 17 | Entertainment | `17-entertainment-01.webp` | `entertainment.JPG` |
| 18 | Entertainment | `18-entertainment-02.webp` | `entertainment (2).JPG` |
| 19 | Entertainment | `19-entertainment-03.webp` | `entertainment (3).JPG` |
| 20 | Group Pic | `20-group-pic-01.webp` | `group pic.jpg` |

## Verification

All 40 exports were decoded, checked for WebP format, dimensions, aspect ratio, sRGB profile, and absent EXIF/XMP. SHA-256, file size, and modification timestamp checks confirm all originals were unchanged. SHA-256 checks also confirm `index.html` and `products.html` were unchanged.
Internal source audit and visual contact sheets remain under `checkpoints/`, outside production assets.

Final review: all 40 desktop/mobile files passed native Edge browser image decoding and matched manifest dimensions. Source and optimized contact sheets were visually inspected for correct ordering, orientation, color, and content.
