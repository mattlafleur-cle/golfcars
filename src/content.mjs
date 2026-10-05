// All page copy lives here, separate from the templates in layout.mjs and pages.mjs.
// House rules: no prices, no guaranteed outcomes, no client names or results, no manufacturer names,
// no golf car industry history for the founders unless it is added in site.config.mjs.
// Write "golf car" and "golf cart" both; the trade says one and buyers search the other.
// The site is organized around four disciplines: sales, service, business operations, and leadership.

export default function content(site) {
  const advisors = site.links.advisors;
  const build = site.links.build;
  const offices = site.location.offices.join(' and ');

  // The four tracks of the curriculum. Used on Home, Curriculum, the scorecard, and llms.txt.
  // Each track has six modules and one free field guide (see guides below).
  const disciplines = [
    {
      id: 'sales',
      number: '01',
      name: 'Sales',
      guide: 'sales-process-everyone-follows',
      promise: 'Turn showroom traffic into deliveries, and deliveries into repeat customers.',
      intro:
        'Golf cart buyers compare more than they used to, research online, and often walk in knowing what they want. The stores that win run one consistent process, price with discipline, and treat every delivery as the start of the next sale.',
      modules: [
        { title: 'The sales process', body: 'Every step from first visit to delivery, written down and taught to everyone on the floor.' },
        { title: 'Pricing and gross profit', body: 'Desking deals that protect gross on new, used, and custom builds.' },
        { title: 'Accessories, service plans, and financing', body: 'Presenting the full package on every deal, without pressure.' },
        { title: 'Trades and used inventory', body: 'Appraising trades and deciding what to retail, wholesale, or rebuild.' },
        { title: 'Follow-up and referrals', body: 'Routines that turn one delivery into reviews, repeat business, and referrals.' },
        { title: 'Staffing the floor', body: 'Hiring, scheduling, and preparing salespeople for the spring rush.' },
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
      guide: 'billed-hours-vs-paid-hours',
      promise: 'Make the service bay a profit center, not just a busy one.',
      intro:
        'Service keeps customers coming back and keeps cash moving when sales slow down. It only pays when the shop is run with the numbers in view: technician time, labor rates, parts on hand, and how work flows from drop-off to pickup.',
      modules: [
        { title: 'Billed hours and paid hours', body: 'The one ratio that shows where technician time really goes.' },
        { title: 'Labor rates and job pricing', body: 'Posted rates, flat-rate pricing for common jobs, and battery work.' },
        { title: 'Scheduling and workflow', body: 'Moving every cart from write-up to pickup on a predictable schedule.' },
        { title: 'Quality, comebacks, and warranty', body: 'Checks before delivery, and claims that actually get paid.' },
        { title: 'Parts availability', body: 'Stocking what the bay uses most so jobs do not stall.' },
        { title: 'Building the technician bench', body: 'Recruiting, training, and keeping good technicians.' },
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
      guide: 'read-your-business-by-department',
      promise: 'See every department clearly, and run the business on real numbers.',
      intro:
        'A golf cart business is several businesses sharing one bank account. Running it well means reading each department on its own, planning cash around the season, and making inventory decisions with numbers instead of instinct.',
      modules: [
        { title: 'Department financial statements', body: 'Profit and loss for new, used, service, parts, and accessories.' },
        { title: 'Floor plan and inventory aging', body: 'Carrying cost, curtailments, and what to order next.' },
        { title: 'Seasonal cash planning', body: 'A month-by-month plan for the slow months and the stocking orders.' },
        { title: 'The weekly numbers', body: 'A one-page set of key numbers the team reviews every week.' },
        { title: 'Pricing and margin targets', body: 'Margin goals by department, and the pricing that reaches them.' },
        { title: 'Growth and exit planning', body: 'A new location, a new brand, or an eventual sale, planned with real numbers.' },
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
      guide: 'get-decisions-off-the-owners-desk',
      promise: 'Build a team that runs the business when you are not in the building.',
      intro:
        'Most golf cart businesses are built around one capable owner. Growth depends on turning that owner’s judgment into a team of managers who can make good decisions, hold each other accountable, and carry the culture without being told.',
      modules: [
        { title: 'From owner to leader', body: 'Getting decisions off the owner’s desk and onto the right person’s.' },
        { title: 'Developing department managers', body: 'Turning strong sales, service, and parts people into leaders.' },
        { title: 'Roles and accountability', body: 'Clear responsibilities, written down, with follow-through.' },
        { title: 'The meeting rhythm', body: 'Weekly and monthly meetings that end in decisions and owners.' },
        { title: 'Hiring and culture', body: 'Hiring for character and skill, and onboarding that sticks.' },
        { title: 'Succession and continuity', body: 'Preparing family members and key people for what comes next.' },
      ],
      signs: [
        'Every question still comes to the owner',
        'Managers report problems and wait for someone else to solve them',
        'The owner has not taken a real week off during the season',
      ],
    },
  ];

  // Short descriptions of each program, keyed by the offering ids in site.config.mjs.
  const offeringCopy = {
    coaching: {
      body: 'One-to-one coaching for dealer principals, owners, and general managers, and facilitated work with leadership teams.',
      linkLabel: 'About leadership coaching',
    },
    training: {
      body: 'On-site and virtual sessions for sales, service, and management teams, built from modules in any of the four tracks.',
      linkLabel: 'About team training',
    },
    education: {
      body: 'Structured courses, live webinars, field guides, and practical tools: worksheets, checklists, and templates you can use the same week.',
      linkLabel: 'About courses and resources',
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

  // Learning paths: a suggested route through the curriculum for each role. Steps name a track id and a module title.
  const paths = [
    {
      id: 'owner',
      role: 'Dealer principal or owner',
      summary: 'Step out of the middle of every decision, and run the business on numbers you trust.',
      steps: [
        ['leadership', 'From owner to leader'],
        ['operations', 'Department financial statements'],
        ['operations', 'Seasonal cash planning'],
        ['leadership', 'Succession and continuity'],
      ],
    },
    {
      id: 'gm',
      role: 'General manager',
      summary: 'Lead the managers, run the meetings, and own the weekly numbers.',
      steps: [
        ['leadership', 'Developing department managers'],
        ['leadership', 'The meeting rhythm'],
        ['operations', 'The weekly numbers'],
        ['sales', 'The sales process'],
      ],
    },
    {
      id: 'sales-manager',
      role: 'Sales manager',
      summary: 'Build a floor that sells the same way every time, at the right gross.',
      steps: [
        ['sales', 'The sales process'],
        ['sales', 'Pricing and gross profit'],
        ['sales', 'Accessories, service plans, and financing'],
        ['sales', 'Staffing the floor'],
      ],
    },
    {
      id: 'service-manager',
      role: 'Service manager',
      summary: 'Turn a busy bay into a profitable one, and keep it that way in peak season.',
      steps: [
        ['service', 'Billed hours and paid hours'],
        ['service', 'Scheduling and workflow'],
        ['service', 'Labor rates and job pricing'],
        ['service', 'Building the technician bench'],
      ],
    },
    {
      id: 'fleet-manager',
      role: 'Golf facility fleet manager',
      summary: 'Run the fleet like a business line, and make the case for it with numbers.',
      steps: [
        ['service', 'Quality, comebacks, and warranty'],
        ['operations', 'The weekly numbers'],
        ['operations', 'Growth and exit planning'],
        ['leadership', 'Hiring and culture'],
      ],
    },
  ];

  // Field guides: free, practical reading, one per track. Examples are illustrations, not benchmarks.
  const guides = [
    {
      slug: 'sales-process-everyone-follows',
      track: 'sales',
      title: 'Build a sales process everyone on the floor follows',
      description: 'A field guide for golf cart dealers: how to write, train, and measure a one-page sales process that protects gross profit and the customer experience.',
      summary: 'When two salespeople sell the same cart two different ways, gross profit and the customer experience both swing. A written process fixes that.',
      sections: [
        {
          heading: 'Why a written process matters',
          paragraphs: [
            'In many stores the sales process lives in the head of the best salesperson. That works until that person is busy, out sick, or gone. A written process makes good selling teachable, gives managers something specific to coach to, and makes results comparable from one salesperson to the next.',
          ],
        },
        {
          heading: 'The steps worth writing down',
          list: [
            'Greeting and first questions: how the customer will use the cart (course, neighborhood, property, or street-legal use) and who will ride in it',
            'Selection: matching new, used, or custom to that use and budget',
            'Demonstration and test drive',
            'Presenting the full package: accessories, a service plan, and financing options, offered every time',
            'Pricing and approval: who can discount, how far, and who signs off',
            'Paperwork and delivery: a walk-through that covers charging, care, and the first service visit',
            'Follow-up: a set schedule of contacts after delivery, with a request for a review or referral',
          ],
        },
        {
          heading: 'Make it stick',
          paragraphs: [
            'Keep the process to one page. Train it in a short meeting, then role-play the steps that slip most often. Each week, the sales manager checks a handful of deals against the page and coaches to the gaps. Revisit the page before every spring rush, when seasonal staff arrive.',
          ],
        },
        {
          heading: 'What to measure',
          list: [
            'Closing rate on test drives',
            'Gross profit per unit, new and used',
            'Accessory revenue per new cart delivered',
            'Share of deals where financing was offered',
            'Follow-up contacts completed on schedule',
          ],
        },
      ],
      takeaways: [
        'Write the process on one page',
        'Offer accessories and financing on every deal',
        'Coach to the page every week',
        'Retrain before the spring rush',
      ],
    },
    {
      slug: 'billed-hours-vs-paid-hours',
      track: 'service',
      title: 'Billed hours and paid hours: the service number that tells the truth',
      description: 'A field guide for golf cart service departments: how to compare billed hours with paid hours, find where technician time goes, and close the gap.',
      summary: 'A busy bay is not the same as a profitable one. Comparing the hours you bill with the hours you pay shows where technician time goes.',
      sections: [
        {
          heading: 'Two numbers, one ratio',
          paragraphs: [
            'Paid hours are the hours you pay each technician, whether or not they are working on a cart. Billed hours are the labor hours charged on repair orders: customer pay, warranty, and internal work. Divide billed hours by paid hours, for each technician and for the shop, every week.',
            'Shops use different names for this measure, such as productivity, proficiency, or efficiency. The name matters less than measuring it the same way every time.',
          ],
        },
        {
          heading: 'An example',
          paragraphs: [
            'A technician is paid for 40 hours in a week, and the repair orders show 28 hours billed. The ratio is 70 percent: 12 paid hours produced no billed labor. At your posted labor rate, those 12 hours are revenue the shop paid for and did not collect. These numbers are an illustration, not a benchmark.',
          ],
        },
        {
          heading: 'Where the hours go',
          list: [
            'Waiting on parts that were not on the shelf',
            'Carts parked while the shop waits for customer approval',
            'Diagnosis time that never makes it onto the repair order',
            'Comebacks redone at no charge',
            'The best technician pulled into scheduling, parts runs, or training',
            'Uneven scheduling: a crush on Monday and slack by Thursday',
          ],
        },
        {
          heading: 'How to close the gap',
          paragraphs: [
            'Measure for four weeks without changing anything, so you have an honest baseline. Then pick the largest cause on the list and fix that first. Common fixes include stocking the parts the bay uses most, getting approvals by text before work begins, writing diagnostic time onto every order, and moving non-technical tasks to someone else.',
            'Set a target from your own baseline, and review it every week with the service manager.',
          ],
        },
      ],
      takeaways: [
        'Measure billed against paid hours, by technician, every week',
        'Get a baseline before changing anything',
        'Fix the largest leak first',
        'Set targets from your own numbers',
      ],
    },
    {
      slug: 'read-your-business-by-department',
      track: 'operations',
      title: 'Read your business by department, not just the bottom line',
      description: 'A field guide for golf cart business owners: how to set up department financial statements, assign overhead, and review results each month.',
      summary: 'Total profit can hide a department that loses money every month. Department statements show which parts of the business carry the others.',
      sections: [
        {
          heading: 'Why the bottom line is not enough',
          paragraphs: [
            'A golf cart business is several businesses in one: new carts, used carts, service, parts, and accessories, and sometimes rentals or custom builds. Each has its own margins, overhead, and seasonal pattern. Blended together, a strong department can cover for a weak one for years.',
          ],
        },
        {
          heading: 'Set up the departments',
          list: [
            'Give each department its own revenue and cost of sales accounts, or use the class or department tracking in your accounting software',
            'Record parts used in service as a transfer between departments, so parts gets credit for the sale and service carries the cost',
            'Charge floor plan interest to the new and used departments that carry the inventory',
            'Keep warranty and internal work visible instead of mixing them into customer pay',
          ],
        },
        {
          heading: 'Assign overhead with a simple rule',
          paragraphs: [
            'Direct costs, such as a technician’s wages, belong to one department. Shared costs, such as rent, utilities, and office staff, need a rule. Square footage works well for rent; head count or revenue works for most of the rest. The exact rule matters less than using the same one every month and explaining it to your managers.',
          ],
        },
        {
          heading: 'What to review each month',
          list: [
            'Gross profit and gross margin by department',
            'Department net profit after assigned overhead',
            'The same figures for the same month last year, since seasonality makes month-to-month comparisons misleading',
            'Floor plan cost against new and used gross profit',
          ],
        },
      ],
      takeaways: [
        'Split revenue and cost by department',
        'Transfer internal parts properly',
        'Pick an overhead rule and keep it',
        'Compare each month with the same month last year',
      ],
    },
    {
      slug: 'get-decisions-off-the-owners-desk',
      track: 'leadership',
      title: 'Get decisions off the owner’s desk',
      description: 'A field guide for golf cart business owners: how to take a decision inventory, hand decisions to managers with clear limits, and make the handoff stick.',
      summary: 'If every question still comes to you, the business can only grow as fast as you can answer. A decision inventory is the place to start.',
      sections: [
        {
          heading: 'The cost of being the answer',
          paragraphs: [
            'When the owner makes every call, managers stop thinking and start asking. Customers wait, problems wait, and the owner spends the busiest weeks of the year answering questions someone else could handle.',
          ],
        },
        {
          heading: 'Take a decision inventory',
          paragraphs: [
            'For two weeks, write down every decision people bring to you and who brought it. Most owners find the same few dozen questions repeating: discounts, schedule changes, parts orders, warranty calls, refunds, and hiring.',
          ],
        },
        {
          heading: 'Sort and hand off',
          list: [
            'Keep: decisions only the owner should make, such as strategy, major purchases, senior hires, and anything that puts the business at risk',
            'Hand off with a limit: decisions a manager can make up to a set amount, such as a discount or a parts order',
            'Hand off fully: decisions a manager can make outright once they know the standard',
          ],
        },
        {
          heading: 'Make the handoff stick',
          paragraphs: [
            'Write down each handed-off decision with its limit and its owner, and tell the team who now decides what. When a manager brings you a decision they own, ask what they recommend, then let them make it. Review the list in your weekly leadership meeting, and widen the limits as trust builds.',
          ],
        },
      ],
      takeaways: [
        'Track every decision for two weeks',
        'Sort: keep, hand off with a limit, hand off fully',
        'Write down owners and limits',
        'Ask for a recommendation before you answer',
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
    body: 'Tell us where the business is today and where you want it to be. We will recommend where to start in the curriculum, and which program fits you and your team.',
  };

  const trackName = (id) => disciplines.find((d) => d.id === id).name;

  const guidePages = guides.map((g) => ({
    path: `/guides/${g.slug}/`,
    title: `${g.title} | ${site.siteName} Field Guide`,
    description: g.description,
    blocks: [
      {
        type: 'hero',
        eyebrow: `Field guide: ${trackName(g.track)} track`,
        title: g.title,
        lead: g.summary,
        compact: true,
      },
      { type: 'article', guide: g },
      { type: 'cta', heading: 'Want help putting this to work?', body: `This guide comes from the ${trackName(g.track)} track of the curriculum. A conversation is the fastest way to apply it to your business.` },
    ],
  }));

  return {
    disciplines,
    offeringCopy,
    scorecard,
    paths,
    guides,
    nav: [
      { label: 'Curriculum', href: '/curriculum/' },
      { label: 'Programs', href: '/programs/' },
      { label: 'Guides', href: '/guides/' },
      { label: 'Scorecard', href: '/scorecard/' },
      { label: 'Who we serve', href: '/who-we-serve/' },
      { label: 'About', href: '/about/' },
      { label: 'Contact', href: '/contact/' },
    ],
    footerBlurb: `${site.siteName} is the education and business-building platform for the golf cart industry, from Josh Muller and Matt LaFleur: a curriculum in sales, service, business operations, and leadership, with programs and tools to put it to work.`,
    plannedNote: 'Formats, dates, and pricing are still being set. You can talk with us about it now.',
    eventsHeading: 'Upcoming dates',
    platformLabel: (name) => `Go to ${name}`,
    offeringsNote:
      'Not sure which fits? Start with a conversation, and we will recommend the right program for you and your team.',
    showsCopy: {
      eyebrow: 'Orlando, January 2027',
      heading: 'Meet us at the shows',
      intro: 'Josh and Matt will be in Orlando for both. If you are going too, set a time to sit down with us during the week.',
      linkLabel: (name) => `${name} website`,
    },

    pages: [
      {
        path: '/',
        title: `Golf Cart Dealer Training and Business Education Platform | ${site.siteName}`,
        description:
          'The education and business-building platform for the golf cart industry: a curriculum, programs, and tools in sales, service, operations, and leadership.',
        blocks: [
          {
            type: 'hero',
            eyebrow: 'The business-building platform for the golf cart industry',
            title: 'Grow the business you’ve already built.',
            lead:
              'You have the customers, the team, and a reputation in your market. Maple Creek Carts is where golf cart businesses learn to build on it: a curriculum in sales, service, business operations, and leadership, programs for owners and their teams, and practical tools you can use this week.',
            secondary: { label: 'Explore the curriculum', href: '/curriculum/' },
            board: true,
          },
          {
            type: 'statement',
            id: 'why',
            tone: 'dark',
            eyebrow: 'Why a platform',
            heading: 'The golf cart business grew up. Its education should too.',
            paragraphs: [
              'Carts left the cart barn a long time ago. They are in neighborhoods, resorts, campgrounds, and on public roads as low-speed vehicles. Dealers now run new and used sales, service departments, parts counters, custom builds, rental fleets, and customer financing, usually with a team that learned it all on the job.',
              'We believe golf carts are one of the most underserved industries in business education. Maple Creek Carts gives the industry one place to learn the business: a single curriculum built around how golf cart businesses actually run, and programs that turn it into results.',
            ],
          },
          {
            type: 'steps',
            id: 'how-it-works',
            eyebrow: 'How the platform works',
            heading: 'Assess. Learn. Build.',
            intro: 'Every business starts in a different place. The platform meets you there.',
            items: [
              { number: '1', title: 'Assess', body: 'Take the dealer scorecard to see where your business is strong and where it is leaking, across all four tracks.', href: '/scorecard/', linkLabel: 'Take the scorecard' },
              { number: '2', title: 'Learn', body: 'Work through the curriculum: four tracks, twenty-four modules, and free field guides, with a learning path for every role.', href: '/curriculum/', linkLabel: 'See the curriculum' },
              { number: '3', title: 'Build', body: 'Put it to work with leadership coaching, team training, courses, and peer groups that keep you moving.', href: '/programs/', linkLabel: 'See the programs' },
            ],
          },
          {
            type: 'pillars',
            id: 'tracks',
            tone: 'soft',
            eyebrow: 'The curriculum',
            heading: 'Four tracks. Twenty-four modules.',
            intro: 'Every program, workshop, and coaching relationship draws on the same curriculum, taught with the realities of this industry in view.',
          },
          {
            type: 'paths',
            id: 'paths',
            eyebrow: 'Learning paths',
            heading: 'Start where your role starts',
            intro: 'A suggested route through the curriculum for each seat in the business.',
            limit: 3,
            link: { label: 'See every learning path', href: '/curriculum/#paths' },
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
            type: 'guideList',
            id: 'field-guides',
            eyebrow: 'Field guides',
            heading: 'Free reading for the people who run the business',
            intro: 'Practical guides from the curriculum, one from each track. Read one tonight and use it tomorrow.',
          },
          {
            type: 'audienceStrip',
            id: 'who-its-for',
            eyebrow: 'Who we serve',
            heading: 'Built for the whole industry',
            intro: 'Leaders across the business, from the dealership showroom to the course cart barn.',
            items: audiences.map((a) => ({ title: a.title, body: a.short, href: `/who-we-serve/#${a.id}` })),
          },
          { type: 'shows', id: 'shows', tone: 'dark' },
          {
            type: 'offerings',
            id: 'programs',
            eyebrow: 'Programs',
            heading: 'Ways to learn and build',
            intro: 'Choose the program that fits the business today. Many leaders pair coaching with team training.',
          },
          {
            type: 'founders',
            id: 'founders',
            variant: 'short',
            eyebrow: 'Who teaches',
            heading: 'Built by business builders',
            intro: 'A business coach who built and sold his own company, and a CPA who helps owners run on their numbers. Together they cover the people side and the numbers side of every decision.',
            link: { label: 'More about Josh and Matt', href: '/about/' },
          },
          { type: 'cta', ...ctaDefault },
        ],
      },

      {
        path: '/curriculum/',
        title: `Golf Cart Business Curriculum: Sales, Service, Operations, Leadership | ${site.siteName}`,
        description:
          'The Maple Creek Carts curriculum: four tracks and twenty-four modules in sales, service, business operations, and leadership, with learning paths for every role.',
        blocks: [
          {
            type: 'hero',
            eyebrow: 'The curriculum',
            title: 'Four tracks for running a golf cart business',
            lead:
              'Twenty-four modules in sales, service, business operations, and leadership, taught with the realities of this industry in view: seasonality, floor plan inventory, and departments that each run on different math.',
            jump: [...disciplines.map((d) => ({ label: `${d.name} track`, href: `#${d.id}` })), { label: 'Learning paths', href: '#paths' }],
          },
          { type: 'tracks' },
          {
            type: 'paths',
            id: 'paths',
            tone: 'soft',
            eyebrow: 'Learning paths',
            heading: 'A path for every seat in the business',
            intro: 'Each path is a suggested starting route. Coaching and team training adjust it to your business.',
          },
          { type: 'cta', heading: 'Find your starting point', body: 'A conversation helps us point you to the right track and program first, whether that is coaching for you, training for your team, or both.' },
        ],
      },

      {
        path: '/programs/',
        title: `Golf Cart Dealer Coaching, Training, and Peer Groups | ${site.siteName}`,
        description:
          'Programs for golf cart business owners, leaders, and teams: leadership coaching, team training and workshops, courses and resources, peer groups, and advisory.',
        blocks: [
          {
            type: 'hero',
            eyebrow: 'Programs',
            title: 'Programs for owners, leaders, and teams',
            lead:
              'The curriculum is the what. Programs are the how: the ways owners, managers, and whole teams learn it and put it to work.',
            jump: [
              { label: 'Leadership coaching', href: '#coaching' },
              { label: 'Team training', href: '#team-training' },
              { label: 'Courses and resources', href: '#courses' },
              { label: 'Peer groups', href: '#peer-groups' },
              { label: 'Advisory', href: '#advisory' },
            ],
          },
          {
            type: 'program',
            id: 'coaching',
            eyebrow: 'Program 1',
            heading: 'Leadership coaching',
            intro: 'If you came up selling, fixing, or building carts, running the business and leading the people in it is a different job. Coaching is where you work on that job on purpose.',
            paragraphs: [
              'For dealer principals and owners who are still the answer to every question, for general managers promoted for being great at the work, and for leadership teams who need sales, service, and parts pulling in the same direction.',
              'Josh built and sold a construction company before he started coaching, so he has carried the weight of owner decisions himself. When a leadership question turns out to be a numbers question, Matt joins the conversation.',
            ],
            listHeading: 'What coaching covers',
            list: [
              'Getting decisions off the owner’s desk and onto the right person’s',
              'Building department managers who can run their areas',
              'Setting goals for the year and a plan the team can execute in season',
              'Weekly and monthly meetings that produce decisions, not just updates',
              'Hard conversations with partners, family members, and long-time employees',
              'Growth, a new location, succession, or a sale',
            ],
          },
          {
            type: 'program',
            id: 'team-training',
            tone: 'soft',
            eyebrow: 'Program 2',
            heading: 'Team training and workshops',
            intro: 'On-site and virtual sessions for sales, service, and management teams, built from modules in any of the four tracks.',
            paragraphs: [
              'Training is assembled from the curriculum to fit your team: a sales floor working on its process and gross, a service team working on billed hours and workflow, or a management team building its weekly numbers and meeting rhythm.',
            ],
            listHeading: 'Popular combinations',
            list: [
              'Spring readiness: staffing the floor, scheduling and workflow, and seasonal cash planning',
              'The profitable bay: billed hours and paid hours, labor rates, and parts availability',
              'Selling the full package: the sales process, pricing and gross profit, and accessories, service plans, and financing',
              'The management team: the weekly numbers, the meeting rhythm, and roles and accountability',
            ],
          },
          {
            type: 'program',
            id: 'courses',
            eyebrow: 'Program 3',
            heading: 'Courses, webinars, and resources',
            intro: 'Structured courses, live webinars, and practical tools for leaders who want to learn on their own schedule.',
            paragraphs: [
              'Courses work through a track in order. Webinars take on timely questions facing golf cart businesses. Resources include worksheets, checklists, and templates, along with free field guides from every track.',
            ],
            links: [{ label: 'Read the free field guides', href: '/guides/' }],
            showPlatform: true,
            showEvents: true,
          },
          {
            type: 'program',
            id: 'peer-groups',
            tone: 'soft',
            eyebrow: 'Program 4',
            heading: 'Peer groups for leaders',
            intro: 'Some of the most useful advice comes from someone who faced the same April last year.',
            paragraphs: [
              'Peer groups bring golf cart business leaders together in small, confidential groups that meet on a regular schedule to compare notes, work through real decisions, and hold each other to what they said they would do.',
              `Josh created ${build.name} (${build.fullName}), a peer community and practical method for business owners. That experience shapes how we run peer learning for this industry.`,
            ],
            links: [{ label: `Learn about ${build.name}`, href: build.url }],
          },
          {
            type: 'program',
            id: 'advisory',
            eyebrow: 'Program 5',
            heading: 'Advisory and fractional CFO',
            intro: 'When you need hands-on financial leadership, not just training.',
            paragraphs: [
              `Some businesses need someone to build the forecast, review the department numbers each month, and prepare for conversations with lenders, manufacturers, and partners. That work is delivered through ${advisors.name}, the advisory practice Josh and Matt run together.`,
            ],
            links: [{ label: `Golf cart advisory at ${advisors.name}`, href: site.links.advisorsCarts.url }],
          },
          { type: 'cta', heading: 'Find the right program', body: 'Tell us about your business and your team. We will recommend where to start and which program fits.' },
        ],
      },

      {
        path: '/guides/',
        title: `Free Field Guides for Golf Cart Businesses | ${site.siteName}`,
        description:
          'Free field guides for golf cart dealers and businesses on the sales process, service productivity, department financials, and leadership, one from each track.',
        blocks: [
          {
            type: 'hero',
            eyebrow: 'Field guides',
            title: 'Free field guides for golf cart businesses',
            lead: 'Practical reading from the curriculum, one guide from each track. No signup: just read it and put it to work.',
          },
          { type: 'guideList', id: 'all-guides', heading: 'All field guides', full: true },
          { type: 'cta', heading: 'Go deeper than a guide', body: 'Each guide is one module from a track of six. Coaching and team training take your business through the rest.' },
        ],
      },

      ...guidePages,

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
              'Rate sixteen practices across the four tracks of the curriculum. It takes about five minutes, and your results point to the track and field guide to start with. Your answers stay in your browser: nothing is sent, saved, or tracked.',
          },
          { type: 'scorecard', id: 'scorecard' },
          { type: 'cta', heading: 'Bring your scorecard to a conversation', body: 'Walk us through your results and the track you most want to improve. We will tell you what we would work on first.' },
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
              'A dealer, a golf facility, a builder, and a rental fleet face different numbers and different people problems. Here is where the curriculum focuses for each.',
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
          'Maple Creek Carts is an education and business-building platform from Josh Muller and Matt LaFleur, built for one of the most underserved industries in business.',
        blocks: [
          {
            type: 'hero',
            eyebrow: 'About',
            title: 'An education platform built by business builders',
            lead:
              'Golf cart businesses carry a demanding mix: seasonal demand, floor plan inventory, a service bay, a parts counter, and often a family or founder at the center. General business advice rarely speaks to that mix. Maple Creek Carts was built to give this industry its own curriculum, programs, and tools.',
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
          'Schedule a conversation with Josh Muller and Matt LaFleur about the curriculum, coaching, team training, or advisory for your golf cart business or fleet.',
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
              'Which track you most want to improve: sales, service, operations, or leadership',
              'Your scorecard results, if you have taken it',
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
        description: 'The page you were looking for is not here. Find the curriculum, programs, field guides, the dealer scorecard, and contact information for Maple Creek Carts.',
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
              { title: 'Curriculum', body: 'Four tracks and twenty-four modules.', href: '/curriculum/', linkLabel: 'See the curriculum' },
              { title: 'Programs', body: 'Coaching, team training, courses, and peer groups.', href: '/programs/', linkLabel: 'See the programs' },
              { title: 'Field guides', body: 'Free, practical reading from every track.', href: '/guides/', linkLabel: 'Read the guides' },
              { title: 'Contact', body: 'Schedule a conversation or email us.', href: '/contact/', linkLabel: 'Contact us' },
            ],
          },
        ],
      },
    ],
  };
}
