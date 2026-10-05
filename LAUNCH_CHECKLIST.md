# Launch checklist

Everything that still needs a decision or input from Josh or Matt. Each item maps to a setting in `site.config.mjs` unless noted. After any change, run `npm run check` and push to `main`.

## Must do before the site is public

- [x] **Create `main`.** Done 2026-10-05. Confirm it is the default branch under Settings > General.
- [x] **Turn on GitHub Pages with "GitHub Actions" as the source.** Done; first deploy succeeded 2026-10-05.
- [x] **DNS records and custom domain.** Done and verified 2026-10-05.
- [ ] **Enforce HTTPS** in Settings > Pages once the certificate is ready.
- [ ] **Verify the domain** in account Settings > Pages (recommended). README, step 3.
- [ ] **Founders approve their bios.** Josh and Matt each read Home and About. `founders[].short` and `founders[].bio`.
- [ ] **Founders approve their portraits on this site.** The files are the same ones used on maplecreekadvisors.com. `founders[].photo`.
- [ ] **Read every page once for accuracy and voice.** Copy is in `src/content.mjs`.

## Launch gates (each defaults to the safe option)

- [ ] **Which offerings exist today.** Currently all five are "Planned." Set `live: true` for any that can be bought or joined now. Likely candidates: leadership coaching (Josh coaches owners today) and advisory (delivered through Maple Creek Advisors). `offerings`.
- [ ] **PGA Show and Golf Business Conference.** Will Josh or Matt attend either, or both? Set `attending: true` in `shows` to add a "Meet us at the shows" section to Home and Contact. This is the strongest single addition for that audience.
- [ ] **Course or learning platform.** Currently none. `learningPlatform`.
- [ ] **Event dates.** Currently none. `events`.
- [ ] **Prices.** None are published, and the check blocks any dollar amount. `pricesApproved`.
- [ ] **Email list or newsletter provider.** Currently none, and no signup form exists. Once a provider is connected and tested end to end, set `newsletter` and ask for the small template change to show a link to its hosted signup page.
- [ ] **Booking link.** Currently Matt's Maple Creek Advisors calendar. Provide a Maple Creek Carts link if you want one, and set `booking.isTemporary: false`. `booking`.
- [ ] **Meeting length.** Not shown. Set `booking.length`, for example `'20-minute'`, if it should appear.
- [ ] **Contact emails.** Currently josh@maplecreekcoaching.com and Matt's temporary address. Replace with Maple Creek Carts addresses when they exist. `contacts`.
- [ ] **Response time.** Not shown. `responseTime`.
- [ ] **Search indexing.** Currently off. Set `allowIndexing: true` when you approve launch.
- [ ] **Golf car industry experience.** None is claimed. Add real experience in plain sentences, or leave it blank. `founders[].industryExperience`.
- [ ] **Areas served.** No claim is made. For example `['United States']`, or a list of states. `location.areasServed`.
- [ ] **Legal name for the copyright line.** Currently "Maple Creek Carts." `legalName`.
- [ ] **Public profiles for structured data.** LinkedIn or similar, if each founder wants them linked. `profiles`.
- [ ] **Street address and phone.** Not published, and kept out of structured data. `location.streetAddress`, `location.phone`.
- [ ] **Analytics.** None. Approval needed before adding any, plus a privacy page. `analytics`.

## Worth confirming

- [ ] **Advisory badge.** The advisory card links to the live Maple Creek Advisors golf cart page but reads "Planned." Flip it to live if that service is available today.
- [ ] **BUILD link.** The site links to buildowners.com. Josh should confirm that is the destination he wants.
- [ ] **The four disciplines, eight questions, and scorecard.** Read them as a dealer principal would. Edit anything that does not match how you teach. All of it is in `src/content.mjs`.
- [ ] **After launch:** share a link in a message and check that the preview image appears, and submit the sitemap in Google Search Console once indexing is on.
