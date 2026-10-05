# Maple Creek Carts website

The public site for Maple Creek Carts at [maplecreekcarts.com](https://maplecreekcarts.com): education, leadership coaching, and business training for the golf car and golf cart industry, from Josh Muller and Matt LaFleur.

It is a plain static site. A small Node script with no dependencies turns one configuration file and one content file into HTML. There is no CMS, database, client-side framework, form, cookie, or tracking script.

## Run it

You need Node 20 or newer.

```bash
npm install          # installs Playwright, used only by the browser test and the preview image
npm run preview      # builds into dist/ and serves it at http://localhost:4173/
npm run check        # builds, then runs every automated check
npm run screenshots  # browser test at desktop and phone widths; screenshots land in screenshots/
```

The first time you run the browser test on a new computer, also run `npx playwright install chromium`.

## Where things live

| File | What it holds |
| --- | --- |
| `site.config.mjs` | Every fact that can change or is not yet confirmed: name, domain, booking link, emails, founders, offerings and whether each is live, events, platform, newsletter, areas served, indexing. Items marked LAUNCH GATE are on the launch checklist. |
| `src/content.mjs` | All page copy: headings, paragraphs, lists, titles, and meta descriptions. |
| `src/layout.mjs` | Page shell: head tags, header, menu, footer, brand mark, hero illustration. |
| `src/pages.mjs` | Turns content blocks into HTML and builds the schema.org structured data. |
| `src/assets/` | Stylesheet, menu script, self-hosted fonts, founder portraits, favicon, link preview image. |
| `scripts/build.mjs` | Builds `dist/`, including `sitemap.xml`, `robots.txt`, `llms.txt`, and `CNAME`. |
| `scripts/check.mjs` | The automated checks (below). |
| `scripts/screenshots.mjs` | The Playwright browser test. |
| `scripts/og-image.mjs` | Regenerates the 1200 x 630 link preview image. |
| `.github/workflows/deploy.yml` | Runs the checks and the browser test on every push; deploys to GitHub Pages from `main` only when both pass. |

## Common edits

- **Flip an offering to live:** in `site.config.mjs`, set that offering's `live: true`. Its badge changes from "Planned" to "Available now" everywhere, including `llms.txt`.
- **Change the booking link or emails:** edit `booking` and `contacts` in `site.config.mjs`. Set `booking.isTemporary: false` once a Maple Creek Carts calendar exists so the Contact page drops the note about Maple Creek Advisors.
- **Add an event:** add `{ title, date: 'YYYY-MM-DD', format, location, url }` to `events`. An "Upcoming dates" list appears on the Training page. Past dates drop off at the next build.
- **Add a learning platform:** set `learningPlatform: { name, url }`. A link appears in the Education section.
- **Add golf car industry experience:** set a founder's `industryExperience` to a plain sentence or two. It appears in their bio and on About.
- **Turn on search indexing:** set `allowIndexing: true`.
- **Change wording:** edit `src/content.mjs`. Keep titles and descriptions unique; the check enforces it.
- **Change the name or tagline:** edit `site.config.mjs`, then run `npm run og-image` and commit the new `src/assets/og-image.png`.
- **Newsletter:** keep `newsletter: null` until a provider is connected and tested end to end. The check fails on any `<form>`, so a form cannot ship by accident. A link to the provider's hosted signup page is the planned next step and needs a small template change.
- **Analytics:** none is included. Adding any requires approval, a code change, and a privacy page that describes the real data handling.

## Automated checks

`npm run check` fails the build, and blocks deployment, if any of these fail:

- Internal links and in-page anchors resolve; no insecure `http://` links; email links are well formed.
- Exactly one h1 per page, and heading levels never skip.
- Every page has a unique title and a unique description of 70 to 170 characters, plus Open Graph tags. The robots noindex tag matches the `allowIndexing` setting.
- Every image has alt text and width and height that match the actual file. The preview image is 1200 x 630.
- Every page has the "Schedule a conversation" link to the booking page inside its main content.
- Every page footer has the exact CPA firm disclosure.
- No banned hype words, no manufacturer or brand names, no dollar amounts while prices are unapproved, no forms, no third-party scripts or stylesheets.
- No em dashes or en dashes anywhere in the site or the repository, including these documents.
- The name of Matt's CPA firm appears nowhere in the repository except inside the one temporary email address. The pattern lives in `scripts/check.mjs`.
- Key color pairs meet WCAG 2.2 AA contrast, computed from the color tokens in `site.css`.
- Structured data parses, uses only expected types with their required fields, resolves every internal reference, uses absolute HTTPS URLs, and contains no address, phone, or price until approved.
- The sitemap lists exactly the built pages; `robots.txt` points to it; `CNAME` matches the domain; `llms.txt` exists.

`npm run screenshots` renders every page, plus a missing page, at 1366 px and 390 px wide. It fails on console errors, failed or third-party requests, images that do not load, or horizontal scrolling. It also tests from the keyboard that the skip link moves focus to the content, and that the phone menu opens with Enter or Space, moves focus to the first link, reaches the booking button, and closes with Escape, returning focus to the menu button.

## Deploy

Every push to `main` runs the checks and the browser test, then publishes to GitHub Pages. Other branches and pull requests run the same checks without deploying. Screenshots from each run are saved as a workflow artifact for 14 days.

### One-time setup

**1. Create the `main` branch.** This repository's first branch was the development branch, so `main` does not exist yet.

1. Open the repository on GitHub and click the branch dropdown (it shows the current branch name) above the file list.
2. Type `main`, then click **Create branch main from** the development branch.
3. Go to **Settings > General**, find **Default branch**, click the two-arrows button, choose `main`, and click **Update**. Confirm.

By default, the `github-pages` environment that GitHub creates only accepts deployments from the default branch, so this step matters.

**2. Turn on GitHub Pages.**

1. Go to **Settings > Pages**.
2. Under **Build and deployment > Source**, choose **GitHub Actions**.
3. Go to the **Actions** tab, open the latest "Check and deploy" run on `main`, and click **Re-run all jobs** if it ran before Pages was turned on. When it finishes, the site is live at the address shown on the Pages settings screen.

**3. Verify the domain (recommended, prevents someone else claiming it on GitHub).**

1. Click your profile picture, then **Settings > Pages** (account settings, not repository settings).
2. Click **Add a domain**, enter `maplecreekcarts.com`, and click **Add domain**.
3. GitHub shows a TXT record. Add it at your registrar (step 4), then come back and click **Verify**.

**4. Add DNS records at your registrar.** Delete any existing A, AAAA, or CNAME records for `@` and `www` first, including the registrar's parking records.

| Type | Host / Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `mattlafleur-cle.github.io` |
| TXT | the name GitHub shows in step 3 | the value GitHub shows in step 3 |

Optional, for IPv6: four AAAA records for `@` with `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, and `2606:50c0:8003::153`.

**5. Set the custom domain.**

1. Back in the repository, go to **Settings > Pages > Custom domain**.
2. Enter `maplecreekcarts.com` and click **Save**. GitHub runs a DNS check; it can take from a few minutes to a few hours after the DNS change.
3. When the check passes and the certificate is ready, tick **Enforce HTTPS**. If the box is greyed out, wait an hour and reload the page.
4. Visit `https://maplecreekcarts.com` and `https://www.maplecreekcarts.com`. The second should redirect to the first.

The build also writes `dist/CNAME`, but with GitHub Actions as the source the domain saved in step 5 is what GitHub uses.
