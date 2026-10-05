// All page copy lives here, separate from the templates in layout.mjs and pages.mjs.
// House rules: no prices, no guaranteed outcomes, no client names or results, no manufacturer names,
// no golf car industry history for the founders unless it is added in site.config.mjs.
// Write "golf car" and "golf cart" both; the trade says one and buyers search the other.

export default function content(site) {
  const advisors = site.links.advisors;
  const build = site.links.build;
  const offices = site.location.offices.join(' and ');

  // Short descriptions of each offering area, keyed by the ids in site.config.mjs.
  const offeringCopy = {
    coaching: {
      body: 'One-to-one coaching for owners and general managers, and facilitated work with leadership teams.',
      linkLabel: 'About coaching',
    },
    training: {
      body: 'Practical training on department profitability, inventory and floor plans, seasonal cash, pricing, KPIs, service operations, hiring, and a steady management rhythm.',
      linkLabel: 'Training topics',
    },
    education: {
      body: 'Workshops, courses, webinars, and resources built around how golf car businesses actually run.',
      linkLabel: 'Education formats',
    },
    peer: {
      body: 'Small groups of golf car business leaders who meet to compare notes, work through decisions, and hold each other to what they said they would do.',
      linkLabel: 'Peer learning',
    },
    advisory: {
      body: `Advisory and fractional CFO work for golf car businesses, delivered through ${advisors.name}.`,
      linkLabel: `Visit ${advisors.name}`,
    },
  };

  // Industry realities, used on Home and in shorter form elsewhere.
  const realities = [
    {
      title: 'The spring rush',
      body: 'Sales, service, and accessory work all peak together. The decisions that shape the season get made in the winter: what to order, who to hire, and how much cash to hold back.',
    },
    {
      title: 'Inventory and floor plan costs',
      body: 'Every unit on the lot carries interest, and curtailment payments come due whether a cart sells or not. Aging and true cost per unit should drive what you order next.',
    },
    {
      title: 'Profit by department',
      body: 'New, used, service, parts, and accessories each have their own margins and their own overhead. It is common to know total profit without knowing which departments produce it.',
    },
    {
      title: 'Service department productivity',
      body: 'A full bay is not the same as a profitable one. Billed hours against paid hours, comebacks, and how a cart moves from write-up to pickup tell the real story.',
    },
    {
      title: 'Staffing ahead of the season',
      body: 'Technicians, detail help, and seasonal sales staff need to be hired and trained before the rush, not during it. That takes a people plan and a cash plan.',
    },
    {
      title: 'Pricing carts, accessories, and builds',
      body: 'Lift kits, seating, lighting, and full custom builds need prices that cover parts, labor, and the time it takes to quote and install them.',
    },
    {
      title: 'Customer financing',
      body: 'Offering financing can move more units and change when cash arrives. It also brings lender relationships, paperwork, and choices about who on the team owns the process.',
    },
    {
      title: 'Street-legal and LSV conversions',
      body: 'Low-speed vehicle and street-legal conversions add parts, labor, and paperwork, and the rules vary by state and town. Price and process both have to account for it.',
    },
    {
      title: 'Growth, succession, or sale',
      body: 'Adding a brand, a location, or a rental fleet changes the business. So does planning for a partner change, a family succession, or an eventual sale.',
    },
  ];

  const audiences = [
    {
      id: 'dealers',
      title: 'Dealers and dealer groups',
      short: 'New and used sales, service, parts, and accessories under one roof, or several.',
      body: 'A dealership is several businesses sharing a building and a bank account. Sales, service, parts, and accessories compete for the same cash, space, and people, and the season decides how much room there is for mistakes.',
      focus: [
        'Profitability by department, so you know which parts of the store carry the others',
        'Inventory mix, aging, and floor plan carrying cost',
        'Sales managers and service managers who can run their departments without the owner',
        'A sales process that carries cleanly from first visit to delivery and follow-up',
        'Adding a location or a brand, and running more than one store',
      ],
    },
    {
      id: 'builders',
      title: 'Manufacturers, builders, and upfitters',
      short: 'Production, custom builds, and conversions.',
      body: 'Building or upfitting carts means managing parts supply, shop capacity, and quotes that have to hold up once the work starts. Margins can disappear in the gap between the estimate and the finished build.',
      focus: [
        'Costing a build: parts, labor hours, overhead, and warranty exposure',
        'Pricing custom work and conversions so quoting time is covered',
        'Capacity planning across the season',
        'Production leads who can run the floor and train new builders',
        'Dealer and fleet relationships, terms, and cash timing',
      ],
    },
    {
      id: 'service',
      title: 'Service and repair shops',
      short: 'Independent shops and mobile service.',
      body: 'Service work is steady when sales slow down, but only if the shop is run with the numbers in view. Technician time, parts on hand, and how work is scheduled decide whether a busy shop is also a profitable one.',
      focus: [
        'Billed hours, paid hours, and technician productivity',
        'Labor rates and pricing for common jobs and battery work',
        'Scheduling, write-ups, and keeping carts moving through the bay',
        'Hiring and training technicians before the busy months',
        'Mobile service and route economics',
      ],
    },
    {
      id: 'accessories',
      title: 'Parts and accessory businesses',
      short: 'Retail counters, online stores, and installers.',
      body: 'Accessories can carry strong margins, and they can also tie up a lot of cash on the shelf. The work is knowing what turns, what sits, and what each install really costs.',
      focus: [
        'Inventory turns, dead stock, and what to reorder before spring',
        'Pricing parts and installed packages',
        'Online and counter sales running from the same inventory',
        'Install scheduling and labor cost',
        'Seasonal cash planning around big stocking orders',
      ],
    },
    {
      id: 'fleets',
      title: 'Rental, fleet, and resort operators',
      short: 'Rental fleets, resorts, campgrounds, and event operators.',
      body: 'A fleet earns money when carts are out and working. Utilization, maintenance, replacement timing, and seasonal staffing all show up in the numbers, and the busy weekends leave little room to fix things.',
      focus: [
        'Utilization and revenue per cart across the season',
        'Maintenance plans, downtime, and replacement cycles',
        'Rental pricing, deposits, and damage policies',
        'Seasonal hiring, training, and front-desk routines',
        'Deciding when to grow the fleet and how to pay for it',
      ],
    },
    {
      id: 'course-fleets',
      title: 'Golf course and community fleet managers',
      short: 'Courses, clubs, and communities that run their own carts.',
      body: 'Fleet managers at courses and communities answer to boards, owners, and budgets. The job mixes maintenance, purchasing, and people, and it rarely comes with training on the business side.',
      focus: [
        'Lease, buy, or replace: building the case with real numbers',
        'Maintenance budgets and tracking cost per cart',
        'Presenting fleet plans to a board, owner, or general manager',
        'Leading a small crew and planning seasonal coverage',
        'Battery, charging, and storage decisions as part of the full cost picture',
      ],
    },
  ];

  const trainingTopics = [
    {
      title: 'Department profitability',
      body: 'Read results by department, assign overhead sensibly, and see which parts of the business pay for the others.',
    },
    {
      title: 'Inventory and floor plans',
      body: 'Order mix, aging, curtailment schedules, and the true carrying cost of each unit on the lot.',
    },
    {
      title: 'Seasonal cash planning',
      body: 'A month-by-month cash plan for the slow months, the stocking orders, and the spring rush.',
    },
    {
      title: 'Pricing',
      body: 'Pricing new and used carts, accessories, installs, custom builds, conversions, and service labor.',
    },
    {
      title: 'KPIs that fit the business',
      body: 'Units sold, gross profit per unit, billed service hours, parts and accessory turns, and days in inventory, tracked on one page.',
    },
    {
      title: 'Service operations',
      body: 'Scheduling, write-ups, technician productivity, comebacks, and keeping the bay moving in peak season.',
    },
    {
      title: 'Hiring and onboarding',
      body: 'Finding, hiring, and training technicians and seasonal staff early enough to matter.',
    },
    {
      title: 'A management rhythm',
      body: 'Weekly and monthly meetings with the right numbers in front of the right people, so decisions do not wait for the owner.',
    },
  ];

  const educationFormats = [
    { title: 'Workshops', body: 'Focused sessions on a single topic, such as preparing for the season or reading your department numbers.' },
    { title: 'Courses', body: 'Structured learning paths that build skills over several weeks.' },
    { title: 'Webinars', body: 'Shorter live sessions on timely questions facing golf car businesses.' },
    { title: 'Resources', body: 'Worksheets, checklists, and guides you can put to work the same week.' },
  ];

  const ctaDefault = {
    heading: 'Start with a conversation',
    body: 'Tell us about your business, what is working, and what keeps landing on your desk. If we can help, we will say how. If we are not the right fit, we will say that too.',
  };

  return {
    offeringCopy,
    nav: [
      { label: 'Coaching', href: '/coaching/' },
      { label: 'Training', href: '/training/' },
      { label: 'Who we serve', href: '/who-we-serve/' },
      { label: 'About', href: '/about/' },
      { label: 'Contact', href: '/contact/' },
    ],
    footerBlurb: `${site.siteName} is education, leadership coaching, and business training for the golf car and golf cart industry, from Josh Muller and Matt LaFleur.`,
    // Shown beside an offering's status badge while it is not live.
    plannedNote: 'Formats, dates, and pricing are still being set. You can talk with us about it now.',
    eventsHeading: 'Upcoming dates',
    platformLabel: (name) => `Go to ${name}`,
    newsletterLabel: 'Get updates by email',
    offeringsNote:
      'We are opening these areas one at a time. Formats, dates, and pricing are being set now and will be published here when they are final. Today, the way in is a conversation with Josh and Matt.',

    pages: [
      {
        path: '/',
        title: `Golf Cart Business Coaching and Dealer Training | ${site.siteName}`,
        description:
          'Leadership coaching, business training, and education for golf car and golf cart dealers, builders, service shops, accessory businesses, and fleet operators.',
        blocks: [
          {
            type: 'hero',
            eyebrow: 'For the golf car and golf cart industry',
            title: 'Build a golf car business that runs well when you step out of the shop.',
            lead:
              `${site.siteName} is education, leadership coaching, and business training for owners, general managers, and leadership teams across the golf car industry. We help you build stronger leaders, better teams, healthier numbers, and a business that does not depend on you for every decision.`,
            secondary: { label: 'See who we work with', href: '/who-we-serve/' },
            art: true,
          },
          {
            type: 'audienceStrip',
            id: 'who-its-for',
            eyebrow: 'Who it is for',
            heading: 'Built for the people running the business',
            intro: 'Owners, general managers, and leaders across the industry, from the showroom floor to the course cart barn.',
            items: audiences.map((a) => ({ title: a.title, body: a.short, href: `/who-we-serve/#${a.id}` })),
          },
          {
            type: 'grid',
            id: 'realities',
            tone: 'dark',
            eyebrow: 'The real work',
            heading: 'What golf car businesses wrestle with',
            intro: 'Most business training is written for other industries. These are the questions golf car businesses face every year.',
            items: realities,
            columns: 3,
          },
          {
            type: 'offerings',
            id: 'offerings',
            eyebrow: 'What we offer',
            heading: 'Five ways we plan to help',
            intro: 'Each area is designed for golf car businesses specifically, and each one connects to the others.',
          },
          {
            type: 'founders',
            id: 'founders',
            variant: 'short',
            eyebrow: 'Who you will work with',
            heading: 'Josh Muller and Matt LaFleur',
            intro: 'Two business owners who work on the people side and the numbers side of the same decisions.',
            link: { label: 'More about Josh and Matt', href: '/about/' },
          },
          { type: 'cta', ...ctaDefault },
        ],
      },

      {
        path: '/coaching/',
        title: `Golf Cart Dealership Leadership Coaching | ${site.siteName}`,
        description:
          'Leadership coaching for golf car and golf cart business owners, general managers, and leadership teams, focused on decisions, accountability, and the busy season.',
        blocks: [
          {
            type: 'hero',
            eyebrow: 'Leadership coaching',
            title: 'Leadership coaching for golf car owners, GMs, and their teams',
            lead:
              'If you came up selling, fixing, or building carts, running the business and leading the people in it is a different job. Coaching is where you work on that job on purpose.',
            status: 'coaching',
          },
          {
            type: 'grid',
            id: 'who',
            eyebrow: 'Who it is for',
            heading: 'Three places coaching starts',
            columns: 3,
            items: [
              {
                title: 'Owners',
                body: 'For owners who are still the answer to every question in sales, service, and parts, and want a business that can run a week without them.',
              },
              {
                title: 'General managers',
                body: 'For GMs who were promoted for being good at the work and now have to lead managers, hold people accountable, and report to an owner.',
              },
              {
                title: 'Leadership teams',
                body: 'For the group running the departments, so sales, service, and parts pull in the same direction instead of competing for the same cash and people.',
              },
            ],
          },
          {
            type: 'list',
            id: 'topics',
            eyebrow: 'What coaching covers',
            heading: 'The conversations that move a business forward',
            items: [
              'Getting decisions off the owner’s desk and onto the right person’s',
              'Building department managers in sales, service, and parts who can run their areas',
              'Clear roles, handoffs, and accountability between the showroom and the shop',
              'Running weekly and monthly meetings that produce decisions, not just updates',
              'Preparing the team for the spring rush while there is still time to act',
              'Hard conversations with partners, family members, and long-time employees',
              'Thinking through growth, a new location, succession, or a sale',
            ],
          },
          {
            type: 'prose',
            id: 'approach',
            tone: 'soft',
            eyebrow: 'How Josh approaches it',
            heading: 'Practical, plainspoken, owner to owner',
            paragraphs: [
              'Josh built and sold a construction company before he started coaching, so he has carried the weight of owner decisions himself. He coaches owners and facilitates leadership teams, and he created BUILD, a peer community and practical method for business owners.',
              'Coaching for Maple Creek Carts brings that work to golf car businesses, with Matt alongside when a leadership question is really a numbers question.',
            ],
          },
          { type: 'cta', heading: 'Talk through what coaching could look like', body: 'Coaching formats, schedules, and pricing are still being set. A conversation is the best way to find out whether coaching fits where your business is right now.' },
        ],
      },

      {
        path: '/training/',
        title: `Golf Cart Dealer Training and Business Education | ${site.siteName}`,
        description:
          'Business training for golf car and golf cart businesses on department profitability, floor plans, seasonal cash, pricing, KPIs, service operations, and hiring.',
        blocks: [
          {
            type: 'hero',
            eyebrow: 'Training and education',
            title: 'Business training built for golf car businesses',
            lead:
              'Training on the parts of the business that decide whether a good season turns into a good year: the numbers, the service bay, the inventory, and the people.',
            status: 'training',
          },
          {
            type: 'grid',
            id: 'topics',
            eyebrow: 'Training topics',
            heading: 'What the training covers',
            intro: 'Each topic is taught with the realities of this industry in view: seasonality, floor plans, and departments that each run on different math.',
            items: trainingTopics,
            columns: 4,
          },
          {
            type: 'grid',
            id: 'education',
            tone: 'soft',
            eyebrow: 'Education',
            heading: 'Formats we are building',
            intro: 'We are building education in four formats. None are open for enrollment yet; dates and details will appear on this page when they are set.',
            items: educationFormats,
            columns: 4,
            status: 'education',
            showPlatform: true,
            showEvents: true,
          },
          {
            type: 'prose',
            id: 'peer-learning',
            eyebrow: 'Peer learning and community',
            heading: 'Learning from people who run the same kind of business',
            status: 'peer',
            paragraphs: [
              'Some of the most useful advice comes from someone who faced the same April last year. We plan to bring golf car business leaders together in small groups to compare notes, work through decisions, and keep each other accountable.',
              `Josh created ${build.name} (${build.fullName}), a peer community and practical method for business owners. That experience shapes how we plan to run peer learning for this industry.`,
            ],
            links: [{ label: `Learn about ${build.name}`, href: build.url }],
          },
          {
            type: 'prose',
            id: 'advisory',
            tone: 'soft',
            eyebrow: 'Advisory and fractional CFO',
            heading: 'When you need hands-on financial help',
            status: 'advisory',
            paragraphs: [
              `Some businesses need more than training: someone to build the forecast, read the department numbers with you each month, and prepare for conversations with lenders and partners. That work is delivered through ${advisors.name}, the advisory practice Josh and Matt run together.`,
            ],
            links: [{ label: `Golf cart advisory at ${advisors.name}`, href: site.links.advisorsCarts.url }],
          },
          { type: 'cta', heading: 'Tell us what your team needs to learn', body: 'Training is being shaped now around the questions golf car owners face. A conversation helps us build the right things first, and helps you decide whether to wait for a course or start working together sooner.' },
        ],
      },

      {
        path: '/who-we-serve/',
        title: `Coaching and Training for Golf Car Dealers, Shops, and Fleets | ${site.siteName}`,
        description:
          'How Maple Creek Carts helps golf cart dealers, builders and upfitters, service shops, accessory businesses, rental and resort fleets, and course fleet managers.',
        blocks: [
          {
            type: 'hero',
            eyebrow: 'For your business type',
            title: 'Golf car businesses are not all the same business',
            lead:
              'A dealer, a builder, a repair shop, and a resort fleet face different numbers and different people problems. Here is where we focus for each.',
            jump: audiences.map((a) => ({ label: a.title, href: `#${a.id}` })),
          },
          { type: 'audiences', items: audiences },
          { type: 'cta', ...ctaDefault },
        ],
      },

      {
        path: '/about/',
        title: `About Josh Muller and Matt LaFleur | ${site.siteName}`,
        description:
          'Maple Creek Carts is a platform from Josh Muller and Matt LaFleur for golf car business owners, combining leadership coaching with financial and operating clarity.',
        blocks: [
          {
            type: 'hero',
            eyebrow: 'About',
            title: 'Why we built Maple Creek Carts',
            lead:
              'Golf car businesses carry a particular mix of seasonal demand, floor plan inventory, a service bay, a parts counter, and often a family or founder at the center. General business advice rarely speaks to that mix. We are building something that does.',
          },
          {
            type: 'founders',
            id: 'founders',
            variant: 'full',
            eyebrow: 'The founders',
            heading: 'Josh Muller and Matt LaFleur',
          },
          {
            type: 'grid',
            id: 'what-we-bring',
            tone: 'soft',
            eyebrow: 'What we bring',
            heading: 'How our backgrounds fit this industry',
            columns: 2,
            items: [
              {
                title: 'The people side',
                body: 'Construction and golf car businesses share a lot: seasonal demand, skilled crews, equipment and materials tied up in the work, and owners who end up in the middle of everything. Josh built and sold a company in that world, and now coaches owners through the same pressures.',
              },
              {
                title: 'The numbers side',
                body: 'Which department makes money, how much inventory to carry, and whether the cash lasts until spring are financial and operating questions. Matt has spent more than 14 years in accounting, financial reporting, and advisory work answering questions like them.',
              },
            ],
            showIndustryExperience: true,
          },
          {
            type: 'links',
            id: 'related',
            eyebrow: 'Related work',
            heading: 'Maple Creek Advisors and BUILD',
            items: [
              {
                title: advisors.name,
                body: `Josh and Matt run ${advisors.name} together, with offices in ${offices}, ${site.location.state}. Advisory and fractional CFO work for golf car businesses is delivered through ${advisors.name}.`,
                href: advisors.url,
                linkLabel: `Visit ${advisors.name}`,
              },
              {
                title: `${build.name}`,
                body: `${build.fullName}. Josh created ${build.name} as a peer community and practical method for business owners.`,
                href: build.url,
                linkLabel: `Visit the ${build.name} website`,
              },
            ],
          },
          { type: 'cta', ...ctaDefault },
        ],
      },

      {
        path: '/contact/',
        title: `Contact and Schedule a Conversation | ${site.siteName}`,
        description:
          'Schedule a conversation with Josh Muller and Matt LaFleur about coaching, training, or advisory work for your golf car or golf cart business.',
        blocks: [
          {
            type: 'hero',
            eyebrow: 'Contact',
            title: 'Let’s talk about your business',
            lead: 'The easiest way to start is to pick a time on the calendar. If you would rather write first, email either of us directly.',
          },
          {
            type: 'contact',
            id: 'reach-us',
            heading: 'Ways to reach us',
            includeHeading: 'What to include',
            include: [
              'What kind of business you run, and how many locations',
              'What you sell and service: new, used, rental, service, parts, accessories, or custom builds',
              'Roughly how many people work in the business',
              'What is prompting you to reach out now',
              'What a good outcome would look like, and when you need it, for example before the spring rush',
            ],
            privacy: 'Please do not email bank statements, tax returns, account numbers, or other sensitive financial documents. If we work together, we will set up a secure way to share them.',
            where: `Josh and Matt are based in ${site.location.region}, with offices in ${offices}, ${site.location.state}.`,
          },
        ],
      },

      {
        path: '/404.html',
        notFound: true,
        title: `Page Not Found | ${site.siteName}`,
        description: 'The page you were looking for is not here. Find coaching, training, and contact information for Maple Creek Carts.',
        blocks: [
          {
            type: 'hero',
            eyebrow: 'Page not found',
            title: 'That page is not here',
            lead: 'The link may be old, or the address may have a typo. These pages are a good place to pick up again.',
          },
          {
            type: 'links',
            id: 'pages',
            heading: 'Try one of these',
            items: [
              { title: 'Home', body: 'Who we serve and what we offer.', href: '/', linkLabel: 'Go to the home page' },
              { title: 'Coaching', body: 'Leadership coaching for owners, GMs, and teams.', href: '/coaching/', linkLabel: 'Read about coaching' },
              { title: 'Training', body: 'Business training topics and education formats.', href: '/training/', linkLabel: 'See training topics' },
              { title: 'Contact', body: 'Schedule a conversation or email us.', href: '/contact/', linkLabel: 'Contact us' },
            ],
          },
        ],
      },
    ],
  };
}
