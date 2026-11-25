# Milestone 4 — Team & Contact

Source: `DESIGN THEORY Group Website Info.pdf`, Section D, pages 7–8.
Roster and contact details were checked against extracted text and rendered pages.
The PDF line wrap in Tasha Julag-ay was joined without changing its spelling.
Departments: Communications (4), Logistics (4), Finance (2), Creatives (6).
No individual titles, biographies, portraits, or additional contact channels were supplied or added.

Before public release, confirm client authorization to publish all 16 names and the supplied email and phone number. This is a release verification item, not a dependency for this local milestone review.

The email and telephone links use standard mailto/tel destinations. Opening an actual mail or phone application depends on the visitor's device; no email or call was sent during testing.

Recoverable pre-implementation snapshot: `checkpoints/before-milestone-4.zip` at the project root.

## Verified in local Edge browser

- All 16 names and department assignments matched pages 7–8 of the client PDF.
- Responsive checks: 320, 375, 768, 1440, and 1920px, without horizontal overflow on either page.
- Header navigation from both pages reaches the team anchor; keyboard Tab navigation reaches email then phone with visible focus.
- mailto and tel destinations match the PDF; no external mail or call application was launched.
- All homepage images decoded; no failed HTTP responses or browser JavaScript errors were observed.
- Palette contrast: white/black 21:1; light pink/black 8.50:1. Decorative textures remain subtle and away from the roster.
- Desktop and mobile screenshots were inspected in `review/team-contact-1440.png` and `review/team-contact-375.png`.
