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

20. **Development branch first.** Development happened on the branch `claude/new-session-k9xrvi`, as assigned.

21. **Manufacturer names are blocked by the check.** The check fails if names such as the major cart brands appear anywhere in the built site, so the copy speaks only in generic industry terms.

## 2026-10-05: Launch

22. **`main` created from the development branch.** At Matt's direction, `main` was pushed from `claude/new-session-k9xrvi`. The first deploy from `main` passed every check and published to GitHub Pages.
23. **DNS moved from Hostinger parking to GitHub Pages.** Matt replaced the parking records in Hostinger with the four GitHub Pages A records and a `www` CNAME to `mattlafleur-cle.github.io`. Verified the same day: both resolve correctly and the site loads at maplecreekcarts.com. Enforce HTTPS is the remaining step.

## 2026-10-05: Repositioning for the industry's leaders

Matt's newer instructions: the type looked too much like other generated sites; the site must be compelling to the leaders attending the PGA Show and the Golf Business Conference; Maple Creek Carts is an education platform and provider for an underserved industry; the major focus areas are sales, service, business operations, and leadership. These supersede the original brief where they conflict.

24. **New type.** Big Shoulders Display, a condensed face in the spirit of scoreboards and dealer signage, now carries headlines, labels, buttons, and the wordmark, with large uppercase headlines. Libre Franklin, a classic American gothic, is the reading face. Both are self-hosted (SIL Open Font License). This supersedes the type part of decision 3; colors and motifs are unchanged.

25. **The four disciplines are the spine of the site.** Sales, service, business operations, and leadership organize Home, the new What we teach page, and the scorecard. Each discipline has a promise, what we work on, and the signs that it needs attention. The earlier five offering areas are now "ways to work with us": leadership coaching, team training and workshops, courses and webinars and resources, peer groups, and advisory.

26. **`/training/` became `/what-we-teach/`.** The site was not indexed and had no inbound links yet, so the rename costs nothing. Education formats, peer groups, and advisory are sections of that page.

27. **Value before the ask.** Two additions give a visitor something useful on the spot: eight questions every dealer principal should be able to answer (Home), and a sixteen-statement dealer scorecard (`/scorecard/`) that scores sales, service, operations, and leadership and names the weakest area with a first step. The scorecard runs only in the browser, sends and stores nothing, needs no signup, and is not a form, so the no-forms rule still holds.

28. **Golf facility owners and operators moved up.** The Golf Business Conference audience is facility owners, operators, management-company executives, resort and municipal operators, and next-generation successors. "Golf facility owners and operators" is now the second audience listed, framed around the cart fleet as a purchase, an operation, and a revenue line.

29. **Underserved, stated as conviction.** The site says "We believe golf carts are one of the most underserved industries in business education." It is presented as the founders' view, not as a measured fact.

30. **Shows appear only when confirmed.** Both shows are in `shows` with dates and venues verified on their websites today (Golf Business Conference, January 25 to 27, 2027, Rosen Centre; PGA Show, January 26 to 29, 2027, Orange County Convention Center; both Orlando). Nothing about either show appears until `attending` is set to true, so the site never implies attendance or affiliation that is not real.

31. **Offerings still read "Planned."** The new copy is more confident, but no offering has been confirmed as available today, so the status rule from decision 6 stands. Flipping coaching or advisory to live is one setting each.

32. **"Next level" stays banned.** Matt confirmed on 2026-10-05 that "lead their market" is fine. It was in the brief's spirit of avoiding hype; the copy uses concrete language instead ("lead their market," "a team that runs the business when you are not in the building").

## 2026-10-05: Shows and offering labels

33. **Meet us at the shows.** Matt confirmed that Josh and Matt plan to attend both the Golf Business Conference and the PGA Show. Both are marked `attending: true`, so a "Meet us at the shows" band, with dates, venues, links to each show's site, and the booking button, appears on Home and Contact. The site names the shows only as events the founders will attend; it does not suggest any sponsorship or affiliation.

34. **No offering is labeled "Planned."** Matt's instruction supersedes decision 6 and decision 31. A new `showOfferingStatus` setting is false, so no status badge or "still being set" note appears anywhere, including `llms.txt`. Offerings are described plainly, and the note under them now says to start with a conversation for a format recommendation. Prices, dates, and a learning platform are still unpublished, so nothing on the site invites a purchase or enrollment that cannot happen.

## 2026-10-05: Hero rewrite

35. **The hero speaks to growing an existing business.** At Matt's direction, the home page now opens with "Grow the business you've already built." The lead acknowledges what the visitor already has (customers, a team, a reputation in their market) and positions Maple Creek Carts as building on it. The second button reads "See where you stand" and goes to the scorecard. The link preview image uses the same headline. "Sell more. Service better. Run tighter. Lead stronger." is retired from the hero.

## 2026-10-05: A platform, not a practice

Matt's instruction: the site should feel more like an educational and business-building platform for the golf cart industry.

36. **Curriculum with tracks and modules.** The four focus areas are now the four tracks of one curriculum (Sales, Service, Business operations, Leadership), each with six named modules, numbered 01.1 to 04.6. The `/what-we-teach/` page became `/curriculum/`. Module titles and descriptions describe what the curriculum covers; they are drafts for Josh and Matt to confirm, because the site now presents them as the curriculum.

37. **Learning paths by role.** Five suggested routes through the modules: dealer principal or owner, general manager, sales manager, service manager, and golf facility fleet manager. They show visitors where to start without a sales conversation.

38. **Programs page replaces Coaching.** `/coaching/` became `/programs/`, which covers all five ways to learn: leadership coaching, team training and workshops, courses and resources, peer groups, and advisory. Team training lists module combinations built from the curriculum. The old `/coaching/` and `/what-we-teach/` URLs now show the helpful 404 page; they were live for about an hour and never indexed, so no redirects were added.

39. **Free field guides.** One practical guide per track, at `/guides/<slug>/`, so the platform teaches something on the first visit: a one-page sales process, billed hours against paid hours, department financial statements, and a decision inventory for owners. They contain no statistics or benchmarks; the one worked example is labeled as an illustration. They carry Article structured data with Maple Creek Carts, not a named person, as author, until Josh and Matt review and choose bylines.

40. **Assess, learn, build.** Home now explains the platform in three steps: the scorecard (assess), the curriculum and guides (learn), and the programs (build). Scorecard results link to the weakest track and its field guide.

41. **Navigation.** Curriculum, Programs, Guides, Scorecard, Who we serve, About, Contact. The phone menu now appears below 1240 pixels wide so the desktop header stays on one line.

## 2026-10-05: Brand architecture

42. **Maple Creek Carts stays the platform brand, endorsed by Maple Creek Advisors.** Matt asked whether to rebrand as Maple Creek Advisors or create a new name. Recommendation accepted in part: keep "Maple Creek Carts" (it matches the domain and signals the industry), and show Maple Creek Advisors as the company behind it. Rebranding the site as Maple Creek Advisors would split one name across two domains and pull the positioning back toward a consulting firm. A new name was judged not worth the cost before the January shows; revisit if show visitors repeatedly assume the company sells carts, or if an industry partner takes equity.

43. **Changes made at Matt's direction.** The header wordmark carries "A Maple Creek Advisors company"; the footer repeats it with a link to maplecreekadvisors.com; the copyright line reads Maple Creek Advisors (`legalName`); and the Organization structured data lists Maple Creek Advisors as `parentOrganization`. All three are driven by `parent`, `endorsement`, and `legalName` in `site.config.mjs`.

44. **The Maple Creek Advisors `/carts/` page is unchanged.** Matt chose not to redirect or repoint it to maplecreekcarts.com for now. Both sites therefore describe golf cart work; keep their claims consistent.

## 2026-10-05: Ideas adapted from automotive education sites

Matt shared the ASE Education Foundation and ASE Connects sites as parallel, not identical, models. Ideas adapted, without borrowing names, statistics, partner logos, or claims:

45. **A stated standard.** The scorecard's sixteen practices are now presented as the Maple Creek Carts Standard, the platform's definition of a well-run golf cart business. It is described as our standard, not an industry or certification standard.

46. **Value for the business and for the industry.** The mission band on Home pairs "For your business" with "For the industry," following ASE Connects' pairing of direct value with industry impact. The mission line: raise the standard for how golf cart businesses are run.

47. **A pathway that ends in giving back.** "Assess. Learn. Build." became "Assess. Learn. Build. Lead.", with the fourth step about developing your own managers, peer groups, and raising the next generation of leaders and technicians, echoing ASE's career pathway that ends in mentoring.

48. **The technician pipeline.** The service track's technician module and the service shop focus list now name recruiting from trade schools, reflecting both sites' focus on the technician shortage.

49. **Not adopted, for now:** headline statistics, partner logo walls, success stories, and an industry pay and labor rate data exchange. The first three need real results and real partners. A data exchange could become a strong platform asset later, but it needs a form, a privacy page, and a data-handling plan.
