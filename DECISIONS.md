# Decisions

Each choice made while building the site, and why. Newest entries go at the bottom. When a newer instruction from Matt or Josh conflicts with the original brief, the newer instruction wins and is recorded here.

## 2026-10-05: Initial build

1. **Same architecture as Maple Creek Advisors.** The sibling site (repository `mattlafleur-cle/mca`) already uses a dependency-free Node build with one config file and content files. Matching it keeps both sites maintainable the same way.

2. **Portraits taken from the Maple Creek Advisors repository.** The brief said the circular portraits exist there and would be supplied. The repository is public, so the same two 480 x 480 files were copied into `src/assets/photos/` unchanged. Alt text matches what the photos show. If you want different files, replace them at the same paths.

3. **Visual direction: a sibling, moved onto the course.** The display face, Bricolage Grotesque, is shared with Maple Creek Advisors to tie the family together. The body face is Public Sans instead of a serif, which reads more practical and trade-facing. Colors are fairway greens and sand neutrals, with pin-flag yellow as the one accent, used for the primary button, list markers, and labels on dark bands. Motifs are mown stripes on dark bands and a dashed line of play from tee to pin in the mark and the hero illustration. No golf clip art, flags, clubs, balls, or carts are drawn.

4. **Fonts are self-hosted.** The Latin subsets of both fonts (SIL Open Font License) live in `src/assets/fonts/`. This avoids a request to Google on every page view, which keeps the site free of third-party requests and is faster.

5. **Indexing off at launch.** The brief left this open. Off is the safer default: every page carries `noindex` until `allowIndexing` is set to true. `robots.txt` still allows crawling, because blocking crawling would hide the `noindex` tag and can leave bare URLs in search results.

6. **Every offering is marked "Planned."** The brief says none should appear live until confirmed. Each offering has a `live` setting; while false, it shows a "Planned" badge, and the page hero adds "Formats, dates, and pricing are still being set. You can talk with us about it now." There are no coming-soon pages or menu items, and no purchase, enrollment, or signup buttons.

7. **Advisory card links out even though it reads "Planned."** The brief says to link to the Maple Creek Advisors golf cart page for this offering and not to mark anything live without confirmation. The link works today. This is the offering most likely to be flipped to live first; see the launch checklist.

8. **Pages: Home, Coaching, Training, Who we serve, About, Contact, 404.** Education, peer learning, and advisory are sections of the Training page (`/training/#education`, `#peer-learning`, `#advisory`) rather than separate pages, because none has enough confirmed detail yet to carry its own page. "For your business type" lives at `/who-we-serve/`, covering all six audience groups from the brief, each with an anchor.

9. **No privacy page.** The site has no form, cookie, analytics, or third-party request. Add one if any of those are added.

10. **Booking link is the Maple Creek Advisors calendar, with a note.** The Contact page says scheduling currently runs through the Maple Creek Advisors calendar, so visitors are not surprised by another name on the booking page. The note disappears when `booking.isTemporary` is set to false.

11. **Temporary emails shown on Contact only.** Josh and Matt each have an email card on the Contact page. The footer does not repeat the addresses, which keeps the temporary ones in a single place to change.

12. **No meeting length stated.** The Maple Creek Advisors site says 20 minutes, but that length is not confirmed for Maple Creek Carts. `booking.length` is null until it is.

13. **No claims of golf car industry history.** The founders' `industryExperience` fields are null. The About page instead ties their real backgrounds to the industry's patterns: construction shares seasonality, crews, and owner dependence; the questions golf car owners face are financial and operating questions of the kind Matt works on.

14. **Matt's bio leaves out his CPA firm.** The Maple Creek Advisors bio names the firm Matt founded. This site cannot, by rule, so the bio uses only the brief's facts. The check scans the whole repository, documents included, so this file and the README refer to it as "Matt's CPA firm."

15. **No areas served yet.** The site says the founders are based in Northeast Ohio with offices in Cuyahoga Falls and Elyria, which is confirmed. Whether Maple Creek Carts serves clients nationally, remotely, or in person is not confirmed, so `areasServed` is empty and neither the copy nor the structured data makes a claim.

16. **Structured data includes all five planned services.** The brief asks for schema.org services. Service entries describe what is offered and carry no prices, offers, or availability claims. The advisory service lists Maple Creek Advisors as its provider. The Organization has no address or phone.

17. **Link preview image is generated once and committed.** `npm run og-image` renders it with Playwright from the site name and tagline, using the local fonts. Committing the PNG keeps the site build itself dependency-free.

18. **Playwright is the only dev dependency.** It is pinned to 1.56.1 and used only by the browser test and the preview image generator. The build and the checks use Node's standard library only.

19. **Deploy gates.** The workflow runs `npm run check` and the browser test on every push and pull request. Only a push to `main` deploys, and only after both pass.

20. **Not pushed to `main`.** Development happened on the branch `claude/new-session-k9xrvi`, as assigned. Creating `main` is the first setup step in the README; no deploy happens until it exists.

21. **Manufacturer names are blocked by the check.** The check fails if names such as the major cart brands appear anywhere in the built site, so the copy speaks only in generic industry terms.
