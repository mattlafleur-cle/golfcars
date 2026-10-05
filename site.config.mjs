// Site configuration. Every fact that can change, or that Josh and Matt still need to confirm, lives here.
// Change a value, run `npm run check`, and push. Pages read from this file; nothing is hard-coded in templates.
// Items marked LAUNCH GATE also appear in LAUNCH_CHECKLIST.md.

export default {
  siteName: 'Maple Creek Carts',

  // LAUNCH GATE: legal or registered name used in the copyright line. Until confirmed, the display name is used.
  legalName: null,

  // Domain served by GitHub Pages. Written to dist/CNAME on every build.
  domain: 'maplecreekcarts.com',
  canonicalUrl: 'https://maplecreekcarts.com',

  tagline: 'The education and business-building platform for the golf cart industry: sales, service, operations, and leadership.',

  // Shown in every page footer. Required wording; do not shorten.
  footerDisclosure:
    'Maple Creek Carts is not a registered CPA firm and does not provide tax preparation or attest services.',

  // LAUNCH GATE: search indexing. While false, every page carries <meta name="robots" content="noindex">.
  // robots.txt still allows crawling so search engines can read the noindex. Set true after launch approval.
  allowIndexing: false,

  // LAUNCH GATE: third-party analytics or tracking. Keep null. No tracking code exists in this build,
  // and adding a provider requires a code change plus a privacy page (see README).
  analytics: null,

  // Link preview image in src/assets/. Regenerate with `npm run og-image` after changing siteName or tagline.
  ogImage: { src: 'og-image.png', width: 1200, height: 630, alt: 'Maple Creek Carts: the education and business-building platform for the golf cart industry' },

  // The one primary action. Every page carries a "Schedule a conversation" button that goes to booking.url.
  // LAUNCH GATE: this is Matt's Maple Creek Advisors scheduling link, used until a Maple Creek Carts link exists.
  booking: {
    url: 'https://fantastical.app/mattlafleur/maple-creek-advisors',
    label: 'Schedule a conversation',
    isTemporary: true,
    // Shown on the Contact page while isTemporary is true, so visitors are not surprised by another name.
    temporaryNote: 'Scheduling currently runs through the Maple Creek Advisors calendar, the advisory practice Josh and Matt share.',
    // Leave null until the meeting length is confirmed. Nothing is shown while null.
    length: null,
  },

  // LAUNCH GATE: contact emails. These are temporary addresses until Maple Creek Carts addresses exist.
  contacts: [
    { founder: 'josh', email: 'josh@maplecreekcoaching.com', temporary: true },
    { founder: 'matt', email: 'matt@forestcity.pro', temporary: true },
  ],
  emailSubject: 'Maple Creek Carts conversation',
  // Leave null unless a response time is confirmed.
  responseTime: null,

  location: {
    region: 'Northeast Ohio',
    offices: ['Cuyahoga Falls', 'Elyria'],
    state: 'Ohio',
    // LAUNCH GATE: areas served. Leave empty until confirmed (for example ['United States']).
    // While empty, the site and structured data make no claim about where clients can be.
    areasServed: [],
    // No street address or phone is published. Add here only when approved; structured data stays without them.
    streetAddress: null,
    phone: null,
  },

  // Related organizations, linked from About and the advisory offering.
  links: {
    advisors: { name: 'Maple Creek Advisors', url: 'https://maplecreekadvisors.com/' },
    advisorsCarts: { name: 'Maple Creek Advisors golf cart advisory', url: 'https://maplecreekadvisors.com/carts/' },
    build: { name: 'BUILD', fullName: 'Business United in Leadership Development', url: 'https://buildowners.com/' },
  },

  // Founders. LAUNCH GATE: each founder approves their own bio. Use only confirmed facts.
  founders: [
    {
      id: 'josh',
      name: 'Josh Muller',
      role: 'Coaching, leadership, and vision',
      photo: { src: 'photos/josh-muller.jpg', width: 480, height: 480, alt: 'Josh Muller, smiling, outdoors in front of green trees' },
      short:
        'Josh founded Maple Creek Coaching after building and selling a construction company of his own. He coaches owners and facilitates leadership teams.',
      bio: [
        'Josh founded Maple Creek Coaching after building and selling a construction company of his own. He works as a business coach and facilitator for owners and their leadership teams.',
        'He also created BUILD (Business United in Leadership Development), a peer community and practical method for business owners.',
      ],
      // LAUNCH GATE: real golf car industry experience, in plain sentences. While null, the site claims none.
      industryExperience: null,
    },
    {
      id: 'matt',
      name: 'Matt LaFleur',
      role: 'Financial clarity, strategy, and operations',
      photo: { src: 'photos/matt-lafleur.jpg', width: 480, height: 480, alt: 'Matt LaFleur, smiling, outdoors with trees behind him' },
      short:
        'Matt is a CPA with more than 14 years of experience in accounting, financial reporting, and advisory work. He helps owners understand their numbers and act on them.',
      bio: [
        'Matt is a CPA licensed in Ohio and California, with more than 14 years of experience in accounting, financial reporting, and advisory work.',
        'He works as a financial and operating adviser and is an entrepreneur himself. His focus is helping owners see what their numbers are saying and use them to make better decisions.',
      ],
      // LAUNCH GATE: real golf car industry experience, in plain sentences. While null, the site claims none.
      industryExperience: null,
    },
  ],

  // Offering areas. LAUNCH GATE: set live to true only for an offering that exists today and can be bought or joined.
  // Status badges show only while showOfferingStatus is true. Matt chose on 2026-10-05 not to label any offering as
  // planned, so badges are off. `live` is kept for the day badges or purchase links are wanted again.
  offerings: [
    { id: 'coaching', name: 'Leadership coaching', live: false, href: '/programs/#coaching' },
    { id: 'training', name: 'Team training and workshops', live: false, href: '/programs/#team-training' },
    { id: 'education', name: 'Courses, webinars, and resources', live: false, href: '/programs/#courses' },
    { id: 'peer', name: 'Peer groups for leaders', live: false, href: '/programs/#peer-groups' },
    // Delivered through Maple Creek Advisors. The outbound link works today; the label still follows `live`.
    { id: 'advisory', name: 'Advisory and fractional CFO', live: false, href: 'https://maplecreekadvisors.com/carts/', provider: 'advisors' },
  ],
  showOfferingStatus: false,
  statusLabels: { live: 'Available now', planned: 'Planned' },

  // Industry shows. Matt confirmed on 2026-10-05 that Josh and Matt plan to attend both. Set attending: false to hide one. While no show is
  // marked attending, nothing about the shows appears on the site. Dates and venues verified 2026-10-05 on each
  // show's website; recheck them before publishing.
  shows: [
    { name: 'Golf Business Conference', dates: 'January 25 to 27, 2027', place: 'Rosen Centre, Orlando, Florida', url: 'https://golfbusinessconference.com/', attending: true },
    { name: 'PGA Show', dates: 'January 26 to 29, 2027', place: 'Orange County Convention Center, Orlando, Florida', url: 'https://www.pgashow.com/', attending: true },
  ],

  // LAUNCH GATE: course or learning platform. Set to { name, url } when one exists. Nothing renders while null.
  learningPlatform: null,

  // LAUNCH GATE: event dates. Add { title, date: 'YYYY-MM-DD', format, location, url } entries once scheduled.
  // Nothing renders while empty. Past dates are hidden automatically at build time.
  events: [],

  // LAUNCH GATE: prices. No prices appear anywhere on the site. Keep false until approved; the check fails
  // if a dollar amount appears in the built pages while this is false.
  pricesApproved: false,

  // LAUNCH GATE: email list or newsletter. Keep null. No signup form exists in this build.
  // When a provider is connected and tested end to end, set { provider, signupUrl } to show a link to the
  // provider's hosted signup page. Do not add an on-page form that has not been tested.
  newsletter: null,

  // Public profile links for structured data (sameAs). Leave null until each founder approves.
  profiles: { josh: null, matt: null },
};
