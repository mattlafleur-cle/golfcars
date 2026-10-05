// All page copy lives here, separate from the templates in layout.mjs and pages.mjs.
// House rules: no prices, no guaranteed outcomes, no client names or results, no manufacturer names,
// no golf car industry history for the founders unless it is added in site.config.mjs.
// Write "golf car" and "golf cart" both; the trade says one and buyers search the other.
// The site is organized around four disciplines: sales, service, business operations, and leadership.

export default function content(site) {
  const advisors = site.links.advisors;
  const build = site.links.build;
  const offices = site.location.offices.join(' and ');

  // The four disciplines. Used on Home, What we teach, the scorecard, and llms.txt.
  const disciplines = [
    {
      id: 'sales',
      number: '01',
      name: 'Sales',
      promise: 'Turn showroom traffic into deliveries, and deliveries into repeat customers.',
      intro:
        'Golf cart buyers compare more than they used to, research online, and often walk in knowing what they want. The stores that win run one consistent process, price with discipline, and treat every delivery as the start of the next sale.',
      work: [
        'A written sales process from first visit to delivery, used by everyone on the floor',
        'Pricing and desking that protect gross profit on new, used, and custom builds',
        'Presenting accessories, service plans, and financing on every deal',
        'Trade-in appraisal and used inventory decisions',
        'Follow-up, reviews, and referral routines after delivery',
        'Staffing and scheduling the floor for the spring rush',
      ],
      signs: [
        'Two salespeople would sell the same cart two different ways',
        'Gross per unit swings month to month and nobody can say why',
        'Accessories get added when the customer asks, not because someone offered',
      ],
    },
    {
      id: 'service',
      number: '02',
      name: 'Service',
      promise: 'Make the service bay a profit center, not just a busy one.',
      intro:
        'Service keeps customers coming back and keeps cash moving when sales slow down. It only pays when the shop is run with the numbers in view: technician time, labor rates, parts on hand, and how work flows from drop-off to pickup.',
      work: [
        'Billed hours against paid hours, by technician',
        'Labor rates, flat-rate pricing for common jobs, and battery work',
        'Scheduling, write-ups, and moving carts from drop-off to pickup',
        'Comebacks, warranty claims, and quality checks before delivery',
        'Parts availability, so jobs do not stall waiting on stock',
        'Recruiting, training, and keeping good technicians',
      ],
      signs: [
        'The bay is full, but the department barely breaks even',
        'Customers call to ask where their cart is',
        'Your best technician is also the scheduler, the parts runner, and the trainer',
      ],
    },
    {
      id: 'operations',
      number: '03',
      name: 'Business operations',
      promise: 'See every department clearly, and run the business on real numbers.',
      intro:
        'A golf cart business is several businesses sharing one bank account. Running it well means reading each department on its own, planning cash around the season, and making inventory decisions with numbers instead of instinct.',
      work: [
        'Department profit and loss for new, used, service, parts, and accessories',
        'Floor plan management, inventory aging, and curtailment planning',
        'A month-by-month cash plan for the slow season and the stocking orders',
        'A one-page set of key numbers the team reviews every week',
        'Pricing and margin targets across the store',
        'Planning for a new location, a new brand, or an eventual sale',
      ],
      signs: [
        'The year looks profitable, but cash is tight every winter',
        'Units sit on floor plan longer than anyone planned',
        'Inventory decisions get made on feel',
      ],
    },
    {
      id: 'leadership',
      number: '04',
      name: 'Leadership',
      promise: 'Build a team that runs the business when you are not in the building.',
      intro:
        'Most golf cart businesses are built around one capable owner. Growth depends on turning that owner’s judgment into a team of managers who can make good decisions, hold each other accountable, and carry the culture without being told.',
      work: [
        'Developing sales, service, and parts managers into real leaders',
        'Clear roles, responsibilities, and accountability',
        'A weekly and monthly meeting rhythm that produces decisions',
        'Hiring for character and skill, and onboarding that sticks',
        'The owner’s role as the business grows',
        'Succession planning for family members and key people',
      ],
      signs: [
        'Every question still comes to the owner',
        'Managers report problems and wait for someone else to solve them',
        'The owner has not taken a real week off during the season',
      ],
    },
  ];

  // Short descriptions of each way to work with us, keyed by the offering ids in site.config.mjs.
  const offeringCopy = {
    coaching: {
      body: 'One-to-one coaching for dealer principals, owners, and general managers, and facilitated work with leadership teams.',
      linkLabel: 'About coaching',
    },
    training: {
      body: 'On-site and virtual training for sales, service, and management teams, built on the four disciplines.',
      linkLabel: 'What we teach',
    },
    education: {
      body: 'Structured courses, live webinars, and practical tools: worksheets, checklists, and templates you can use the same week.',
      linkLabel: 'Learning formats',
    },
    peer: {
      body: 'Small, confidential groups of golf cart business leaders who meet on a regular schedule to work through real decisions together.',
      linkLabel: 'About peer groups',
    },
    advisory: {
      body: `Hands-on financial leadership and fractional CFO work for golf cart businesses, delivered through ${advisors.name}.`,
      linkLabel: `Visit ${advisors.name}`,
    },
  };

  // Questions on Home. Each one is something a well-run golf cart business can answer quickly.
  const questions = [
    'What is your gross profit per unit on new carts, and on used?',
    'Which department paid for the others last year?',
    'How long has your oldest unit been on floor plan, and what has it cost you so far?',
    'What share of your technicians’ paid hours did you actually bill?',
    'How much cash do you need on hand in January to carry you through the spring rush?',
    'How much accessory revenue comes with the average new cart you deliver?',
    'Who makes the call when you are away for two weeks in July?',
    'If you sold the business in five years, what would make it worth more than it is today?',
  ];

  const audiences = [
    {
      id: 'dealers',
      title: 'Dealers and dealer groups',
      short: 'New and used sales, service, parts, and accessories, at one store or several.',
      body: 'A dealership is several businesses sharing a building and a bank account. Sales, service, parts, and accessories compete for the same cash, space, and people, and the season decides how much room there is for mistakes.',
      focus: [
        'Profitability by department, so you know which parts of the store carry the others',
        'Inventory mix, aging, and floor plan carrying cost',
        'Sales and service managers who can run their departments without the owner',
        'A sales process that carries cleanly from first visit to delivery and follow-up',
        'Adding a location or a brand, and running more than one store',
      ],
    },
    {
      id: 'course-fleets',
      title: 'Golf facility owners and operators',
      short: 'Courses, clubs, resorts, communities, and management companies that run cart fleets.',
      body: 'For a golf facility, the cart fleet is a major purchase, a daily operation, and a revenue line. Fleet decisions touch the budget, the guest experience, and the staff schedule, and they deserve the same discipline as any other part of the business.',
      focus: [
        'Lease, buy, or replace: building the decision with real numbers',
        'Cart revenue, utilization, and cost per round across the season',
        'Maintenance budgets, downtime, and tracking cost per cart',
        'Presenting fleet plans to an owner, a board, or a management company',
        'Leading the cart staff and planning seasonal coverage',
      ],
    },
    {
      id: 'builders',
      title: 'Manufacturers, builders, and upfitters',
      short: 'Production, custom builds, conversions, and dealer networks.',
      body: 'Building or upfitting carts means managing parts supply, shop capacity, and quotes that have to hold up once the work starts. Margin can disappear in the gap between the estimate and the finished build.',
      focus: [
        'Costing a build: parts, labor hours, overhead, and warranty exposure',
        'Pricing custom work and street-legal conversions so quoting time is covered',
        'Capacity planning across the season',
        'Production leads who can run the floor and train new builders',
        'Dealer relationships, terms, and cash timing',
      ],
    },
    {
      id: 'service',
      title: 'Service and repair shops',
      short: 'Independent shops and mobile service operations.',
      body: 'Service work stays steady when sales slow down, but only if the shop runs with the numbers in view. Technician time, parts on hand, and how work is scheduled decide whether a busy shop is also a profitable one.',
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
      title: 'Rental, resort, and event fleets',
      short: 'Rental operators, campgrounds, resorts, and event services.',
      body: 'A fleet earns money when carts are out and working. Utilization, maintenance, replacement timing, and seasonal staffing all show up in the numbers, and busy weekends leave little room to fix anything.',
      focus: [
        'Utilization and revenue per cart across the season',
        'Maintenance plans, downtime, and replacement cycles',
        'Rental pricing, deposits, and damage policies',
        'Seasonal hiring, training, and front-desk routines',
        'Deciding when to grow the fleet and how to pay for it',
      ],
    },
  ];

  // The scorecard on /scorecard/. Four statements per discipline, answered Not yet, Sometimes, or Consistently.
  const scorecard = {
    choices: [
      { value: 0, label: 'Not yet' },
      { value: 1, label: 'Sometimes' },
      { value: 2, label: 'Consistently' },
    ],
    areas: [
      {
        id: 'sales',
        statements: [
          'Every salesperson follows the same process from first visit to delivery.',
          'We know our gross profit per unit on new and used carts every month.',
          'Accessories and financing are offered on every deal, not only when the customer asks.',
          'Every customer hears from us after delivery, and we track repeat and referral business.',
        ],
        nextStep: 'Start with a written sales process and a monthly look at gross per unit, new and used. Those two habits change how the whole floor sells.',
      },
      {
        id: 'service',
        statements: [
          'We track billed hours against paid hours for every technician.',
          'Our labor rates and common job prices are reviewed at least once a year.',
          'Carts move from write-up to pickup on a schedule, even in peak season.',
          'We have technicians hired and trained before the spring rush begins.',
        ],
        nextStep: 'Start by measuring billed hours against paid hours for each technician for one month. The gap usually points straight at the fix.',
      },
      {
        id: 'operations',
        statements: [
          'We review a profit and loss statement for each department every month.',
          'We know the age and carrying cost of every unit on floor plan.',
          'We have a month-by-month cash plan that covers the slow season and the spring stocking orders.',
          'A short list of key numbers is in front of the management team every week.',
        ],
        nextStep: 'Start by splitting last year’s results by department and building a simple month-by-month cash plan for the coming season.',
      },
      {
        id: 'leadership',
        statements: [
          'Each department has a manager who can make decisions without the owner.',
          'Roles, responsibilities, and expectations are written down and understood.',
          'The leadership team meets on a regular rhythm and leaves with decisions and owners.',
          'The business could run for two weeks without the owner on site.',
        ],
        nextStep: 'Start by writing down who owns which decisions, then hold a weekly leadership meeting that ends with names next to every action.',
      },
    ],
    bands: [
      { min: 0, label: 'Building the foundation', body: 'Many of the core habits are not in place yet. That is common, and it means the biggest gains are close at hand.' },
      { min: 40, label: 'Solid, with clear gaps', body: 'The business has real strengths and a few areas holding it back. Closing those gaps is usually where the next stage of growth comes from.' },
      { min: 75, label: 'Running ahead of the pack', body: 'Most of the core habits are in place. The work now is consistency, deeper management talent, and planning for what comes next.' },
    ],
  };

  const ctaDefault = {
    heading: 'Let’s talk about where your business is headed',
    body: 'Tell us where the business is today and where you want it to be. We will tell you honestly whether we can help, and how.',
  };

  return {
    disciplines,
    offeringCopy,
    scorecard,
    nav: [
      { label: 'What we teach', href: '/what-we-teach/' },
      { label: 'Coaching', href: '/coaching/' },
      { label: 'Scorecard', href: '/scorecard/' },
      { label: 'Who we serve', href: '/who-we-serve/' },
      { label: 'About', href: '/about/' },
      { label: 'Contact', href: '/contact/' },
    ],
    footerBlurb: `${site.siteName} is business education and leadership coaching for the golf cart industry, from Josh Muller and Matt LaFleur. Sales, service, business operations, and leadership.`,
    // Shown beside an offering's status badge while it is not live.
    plannedNote: 'Formats, dates, and pricing are still being set. You can talk with us about it now.',
    eventsHeading: 'Upcoming dates',
    platformLabel: (name) => `Go to ${name}`,
    offeringsNote:
      'Not sure which fits? Start with a conversation, and we will recommend the right format for you and your team.',
    showsCopy: {
      eyebrow: 'Orlando, January 2027',
      heading: 'Meet us at the shows',
      intro: 'Josh and Matt will be in Orlando for both. If you are going too, set a time to sit down with us during the week.',
      linkLabel: (name) => `${name} website`,
    },

    pages: [
      {
        path: '/',
        title: `Golf Cart Dealer Training and Business Coaching | ${site.siteName}`,
        description:
          'Business education and leadership coaching for golf cart dealers, builders, service shops, and golf facility fleets: sales, service, operations, and leadership.',
        blocks: [
          {
            type: 'hero',
            eyebrow: 'For golf cart businesses ready for their next stage',
            title: 'Grow the business you\u2019ve already built.',
            lead:
              'You have the customers, the team, and a reputation in your market. Maple Creek Carts helps dealer principals, owners, and leadership teams build on that foundation, with business education and leadership coaching in the four disciplines that decide who leads the market: sales, service, business operations, and leadership.',
            secondary: { label: 'See where you stand', href: '/scorecard/' },
            board: true,
          },
          {
            type: 'statement',
            id: 'why',
            tone: 'dark',
            eyebrow: 'Why we exist',
            heading: 'The golf cart business grew up. The training did not.',
            paragraphs: [
              'Carts left the cart barn a long time ago. They are in neighborhoods, resorts, campgrounds, and on public roads as low-speed vehicles. Dealers now run new and used sales, service departments, parts counters, custom builds, rental fleets, and customer financing, usually with a team that learned it all on the job.',
              'We believe golf carts are one of the most underserved industries in business education. Owners have had to learn department accounting, floor plan management, service productivity, and leadership the hard way, on their own. We built Maple Creek Carts to change that.',
            ],
          },
          {
            type: 'pillars',
            id: 'disciplines',
            eyebrow: 'What we teach',
            heading: 'Four disciplines. One stronger business.',
            intro: 'Every program, workshop, and coaching relationship is built on the same four disciplines, taught with the realities of this industry in view.',
          },
          {
            type: 'questions',
            id: 'questions',
            tone: 'soft',
            eyebrow: 'A quick test',
            heading: 'Eight questions every dealer principal should be able to answer',
            intro: 'A well-run golf cart business can answer each of these quickly. The ones that take longer show where to start.',
            items: questions,
            action: { label: 'Take the full scorecard', href: '/scorecard/', note: 'Sixteen statements, about five minutes, no signup. Your answers stay in your browser.' },
          },
          {
            type: 'audienceStrip',
            id: 'who-its-for',
            eyebrow: 'Who we serve',
            heading: 'Built for the people who run the business',
            intro: 'Leaders across the whole industry, from the dealership showroom to the course cart barn.',
            items: audiences.map((a) => ({ title: a.title, body: a.short, href: `/who-we-serve/#${a.id}` })),
          },
          { type: 'shows', id: 'shows', tone: 'dark' },
          {
            type: 'offerings',
            id: 'work-with-us',
            eyebrow: 'Ways to work with us',
            heading: 'Coaching, training, and peer learning',
            intro: 'Choose the format that fits the business today. Many leaders combine coaching with team training.',
          },
          {
            type: 'founders',
            id: 'founders',
            variant: 'short',
            eyebrow: 'Who you will work with',
            heading: 'Josh Muller and Matt LaFleur',
            intro: 'A business coach who built and sold his own company, and a CPA who helps owners run on their numbers. Together they cover the people side and the numbers side of every decision.',
            link: { label: 'More about Josh and Matt', href: '/about/' },
          },
          { type: 'cta', ...ctaDefault },
        ],
      },

      {
        path: '/what-we-teach/',
        title: `Golf Cart Dealer Training: Sales, Service, Operations, Leadership | ${site.siteName}`,
        description:
          'Golf cart dealer training in four disciplines: sales process and gross profit, service department productivity, department numbers and floor plans, and leadership.',
        blocks: [
          {
            type: 'hero',
            eyebrow: 'What we teach',
            title: 'Sales, service, operations, and leadership for golf cart businesses',
            lead:
              'Four disciplines decide whether a good season turns into a great year. We teach each one with the realities of this industry in view: seasonality, floor plan inventory, and departments that each run on different math.',
            jump: disciplines.map((d) => ({ label: d.name, href: `#${d.id}` })),
          },
          { type: 'disciplines' },
          {
            type: 'offerings',
            id: 'formats',
            eyebrow: 'How it is delivered',
            heading: 'Formats for every kind of team',
            intro: 'The same four disciplines, delivered the way your business learns best.',
            showPlatform: true,
            showEvents: true,
          },
          {
            type: 'prose',
            id: 'peer-learning',
            tone: 'soft',
            eyebrow: 'Peer groups',
            heading: 'Learn from leaders who run the same kind of business',
            status: 'peer',
            paragraphs: [
              'Some of the most useful advice comes from someone who faced the same April last year. Our peer groups are designed to bring golf cart business leaders together in small, confidential groups to compare notes, work through real decisions, and hold each other to what they said they would do.',
              `Josh created ${build.name} (${build.fullName}), a peer community and practical method for business owners. That experience shapes how we run peer learning for this industry.`,
            ],
            links: [{ label: `Learn about ${build.name}`, href: build.url }],
          },
          {
            type: 'prose',
            id: 'advisory',
            eyebrow: 'Advisory and fractional CFO',
            heading: 'When you need hands-on financial leadership',
            status: 'advisory',
            paragraphs: [
              `Some businesses need more than training: someone to build the forecast, review the department numbers with you each month, and prepare for conversations with lenders, manufacturers, and partners. That work is delivered through ${advisors.name}, the advisory practice Josh and Matt run together.`,
            ],
            links: [{ label: `Golf cart advisory at ${advisors.name}`, href: site.links.advisorsCarts.url }],
          },
          { type: 'cta', heading: 'Tell us what your team needs most', body: 'A conversation helps us point you to the right discipline and format first, whether that is coaching for you, training for your team, or both.' },
        ],
      },

      {
        path: '/coaching/',
        title: `Golf Cart Dealership Leadership Coaching | ${site.siteName}`,
        description:
          'Leadership coaching for golf cart dealer principals, owners, general managers, and leadership teams, focused on decisions, accountability, and growth.',
        blocks: [
          {
            type: 'hero',
            eyebrow: 'Leadership coaching',
            title: 'Coaching for the people who lead golf cart businesses',
            lead:
              'If you came up selling, fixing, or building carts, running the business and leading the people in it is a different job. Coaching is where you work on that job on purpose, with someone whose only agenda is your success.',
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
                title: 'Dealer principals and owners',
                body: 'For owners who are still the answer to every question in sales, service, and parts, and want a business that grows without needing them in every decision.',
              },
              {
                title: 'General managers',
                body: 'For GMs who were promoted for being great at the work and now have to lead managers, hold people accountable, and report results to an owner.',
              },
              {
                title: 'Leadership teams',
                body: 'For the people running the departments, so sales, service, and parts pull in the same direction instead of competing for the same cash and people.',
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
              'Setting goals for the year and a plan the team can execute in season',
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
            eyebrow: 'How Josh coaches',
            heading: 'Practical and plainspoken, owner to owner',
            paragraphs: [
              'Josh built and sold a construction company before he started coaching, so he has carried the weight of owner decisions himself. He coaches owners, facilitates leadership teams, and created BUILD, a peer community and practical method for business owners.',
              'When a leadership question turns out to be a numbers question, Matt joins the conversation. You get both sides of the decision at the same table.',
            ],
          },
          { type: 'cta', heading: 'See whether coaching fits', body: 'A conversation is the fastest way to find out whether coaching fits where you and your business are right now.' },
        ],
      },

      {
        path: '/scorecard/',
        title: `Golf Cart Dealer Scorecard | ${site.siteName}`,
        description:
          'A free five-minute scorecard for golf cart dealers and businesses. Rate sixteen practices across sales, service, operations, and leadership and see where to focus.',
        blocks: [
          {
            type: 'hero',
            eyebrow: 'The dealer scorecard',
            title: 'Where is your business strong, and where is it leaking?',
            lead:
              'Rate sixteen practices across sales, service, business operations, and leadership. It takes about five minutes. Your answers stay in your browser: nothing is sent, saved, or tracked.',
          },
          { type: 'scorecard', id: 'scorecard' },
          { type: 'cta', heading: 'Bring your scorecard to a conversation', body: 'Walk us through your results and the area you most want to improve. We will tell you what we would work on first.' },
        ],
      },

      {
        path: '/who-we-serve/',
        title: `Coaching and Training for Golf Cart Dealers, Courses, and Fleets | ${site.siteName}`,
        description:
          'How Maple Creek Carts helps golf cart dealers, golf facility operators, builders and upfitters, service shops, accessory businesses, and rental fleets.',
        blocks: [
          {
            type: 'hero',
            eyebrow: 'Who we serve',
            title: 'Golf cart businesses are not all the same business',
            lead:
              'A dealer, a golf facility, a builder, and a rental fleet face different numbers and different people problems. Here is where we focus for each.',
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
          'Maple Creek Carts is business education and leadership coaching from Josh Muller and Matt LaFleur, built for one of the most underserved industries in business.',
        blocks: [
          {
            type: 'hero',
            eyebrow: 'About',
            title: 'The golf cart industry deserves better business education',
            lead:
              'Golf cart businesses carry a demanding mix: seasonal demand, floor plan inventory, a service bay, a parts counter, and often a family or founder at the center. General business advice rarely speaks to that mix. We built Maple Creek Carts to give this industry the coaching and training it has gone without.',
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
                body: 'Construction and golf cart businesses share a lot: seasonal demand, skilled crews, equipment and materials tied up in the work, and owners who end up in the middle of everything. Josh built and sold a company in that world, and now coaches owners through the same pressures.',
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
                body: `Josh and Matt run ${advisors.name} together, with offices in ${offices}, ${site.location.state}. Advisory and fractional CFO work for golf cart businesses is delivered through ${advisors.name}.`,
                href: advisors.url,
                linkLabel: `Visit ${advisors.name}`,
              },
              {
                title: build.name,
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
          'Schedule a conversation with Josh Muller and Matt LaFleur about coaching, training, or advisory work for your golf cart business or golf facility fleet.',
        blocks: [
          {
            type: 'hero',
            eyebrow: 'Contact',
            title: 'Let’s talk about your business',
            lead: 'The easiest way to start is to pick a time on the calendar. If you would rather write first, email either of us directly.',
          },
          { type: 'shows', id: 'shows', tone: 'dark' },
          {
            type: 'contact',
            id: 'reach-us',
            heading: 'Ways to reach us',
            includeHeading: 'What to include',
            include: [
              'What kind of business you run, and how many locations',
              'What you sell and service: new, used, rental, service, parts, accessories, or custom builds',
              'Roughly how many people work in the business',
              'Which of the four disciplines you most want to improve: sales, service, operations, or leadership',
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
        description: 'The page you were looking for is not here. Find what we teach, coaching, the dealer scorecard, and contact information for Maple Creek Carts.',
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
              { title: 'Home', body: 'Who we serve and what we teach.', href: '/', linkLabel: 'Go to the home page' },
              { title: 'What we teach', body: 'Sales, service, operations, and leadership.', href: '/what-we-teach/', linkLabel: 'See the four disciplines' },
              { title: 'Scorecard', body: 'Rate your business in five minutes.', href: '/scorecard/', linkLabel: 'Take the scorecard' },
              { title: 'Contact', body: 'Schedule a conversation or email us.', href: '/contact/', linkLabel: 'Contact us' },
            ],
          },
        ],
      },
    ],
  };
}
