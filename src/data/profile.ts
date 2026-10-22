// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Muhamad Akmal Adha",
  shortName: "Akmal",
  nickname: "Jumma",
  role: "Software Engineer",
  roles: ["Software Engineer", "Laravel Engineer", "API Integrator", "Full-stack Builder"],
  location: "Seri Kembangan, Selangor, Malaysia",
  availability: "Open to new opportunities",
  email: "muhamadadha9973@gmail.com",
  whatsapp: "https://wa.me/601123053082",
  phone: "+60 11-2305 3082",
  github: "https://github.com/NotAjumma",
  linkedin: "https://www.linkedin.com/in/akmal-adha-9124642a6",
  resume: "/Akmal-Adha-Resume.pdf",
  tagline:
    "I build reliable software for real businesses: e-commerce, booking platforms, job portals and the APIs that connect them.",
  about: [
    "I'm a Software Engineer at LLL Inc., a software house where I ship features for production systems used by clients in Japan and Malaysia, mostly with Laravel, REST APIs and Next.js.",
    "Outside work I build and run Sistem Kami, a booking platform for Malaysian small businesses, end to end: product, code, payments, hosting.",
    "I like the unglamorous parts of engineering: finding why production returns 504s, proving a refactor changes nothing by replaying every past order, and turning a slow page into a fast one.",
    "I graduated from UiTM with a Bachelor of IT (Hons) and received the Vice Chancellor's Award twice, for both my degree and diploma.",
  ],
  stats: [
    { value: 2, suffix: "+", label: "years shipping production code" },
    { value: 390, suffix: "+", label: "commits shipped at LLL Inc." },
    { value: 450, suffix: "+", label: "commits on my own platform, Sistem Kami" },
    { value: 32714, suffix: "", label: "orders replayed to verify a refactor" },
  ],
};

export type Job = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  points: string[];
  tech: string[];
  current?: boolean;
};

export const experience: Job[] = [
  {
    company: "LLL Inc.",
    role: "Software Engineer",
    period: "Jan 2025 — Present",
    location: "Puchong, Selangor",
    current: true,
    summary: "Software house building client systems across e-commerce, catalogues and recruitment.",
    points: [
      "Own backend features on a Japanese B2B e-commerce platform: tax and order logic, courier exports, corporate accounts, payments.",
      "Built most of a manufacturer's product catalogue backend: data model, scraper-based import, faceted search API and admin screens.",
      "Build features end-to-end on a multilingual job platform with Next.js, Postgres and Drizzle: messaging, screening, applicant tracking.",
      "Investigate production incidents on AWS (ECS, CloudWatch) and write up root cause and fix for the team.",
    ],
    tech: ["Laravel", "Next.js", "PostgreSQL", "MySQL", "Meilisearch", "Docker", "AWS", "WordPress"],
  },
  {
    company: "Horuz Technology Sdn Bhd",
    role: "Back-end Developer",
    period: "Oct 2024 — Jan 2025",
    location: "Cyberjaya, Selangor",
    summary: "Led backend for new client CRM systems.",
    points: [
      "Led development of custom CRM systems in Laravel with multi-role access.",
      "Integrated third-party APIs to sync client data in both directions.",
      "Set up automated deployments from GitHub, hosting, domains and DNS for live systems.",
      "Turned Figma designs into responsive, mobile-friendly interfaces with the front-end team.",
    ],
    tech: ["Laravel", "PHP", "MySQL", "REST API", "CI/CD", "DNS"],
  },
  {
    company: "Azor Industries Sdn Bhd",
    role: "Software Engineer Intern → Freelance Programmer",
    period: "Mar 2024 — Sep 2024",
    location: "Petaling Jaya, Selangor",
    summary: "E-ticketing platform for events.",
    points: [
      "Built and maintained a Laravel e-ticket platform with promoter, organiser, customer and admin roles.",
      "Shipped new features from organiser and business requirements.",
      "Optimised SQL queries to cut page load times.",
    ],
    tech: ["Laravel", "MySQL", "JavaScript"],
  },
  {
    company: "Bluevy PLT",
    role: "PHP Developer Intern",
    period: "Sep 2021 — Jan 2022",
    location: "Kuala Lumpur",
    summary: "Front-end modernisation.",
    points: [
      "Migrated an existing system from Laravel Blade views to Vue.js.",
      "Debugged and filled functionality gaps in the Vue.js codebase.",
    ],
    tech: ["Laravel", "Vue.js"],
  },
];

export type CaseStudy = {
  id: string;
  title: string;
  client: string;
  kind: string;
  summary: string;
  flow: string[];
  problem: string;
  built: string[];
  highlights: { metric: string; label: string }[];
  tech: string[];
};

// Company projects: no names or screenshots, by agreement with clients.
// `built` is ordered biggest feature first (by size of my changes in git history).
export const caseStudies: CaseStudy[] = [
  {
    id: "b2b-commerce",
    title: "B2B e-commerce platform",
    client: "Japanese industrial parts supplier",
    kind: "Backend · Laravel",
    summary:
      "A live online store selling thousands of industrial parts to businesses in Japan, with an admin back-office for products, orders and delivery.",
    flow: ["Storefront", "Laravel API", "Payment gateway", "MySQL", "Courier CSV", "AWS ECS"],
    problem:
      "The store has run since 2021. Business rules changed (tax rates, couriers, corporate customers, payment requirements) while large parts of the logic were hardcoded, and production had intermittent timeouts.",
    built: [
      "Configurable consumption tax: replaced a hardcoded 10% in 12 places (cart, emails, admin, invoices, receipts) with per-product rates and per-rate breakdowns, as Japan's qualified-invoice rules require. Verified by replaying all 32,714 production orders through old and new formulas: 0 differences.",
      "Order and delivery exports: CSV exports for two Japanese couriers (Sagawa, Kuroneko) with multiple delivery addresses and carrier-specific field rules, exports of selected orders, and a 1:N SKU option for the client's core-system CSV integration.",
      "Corporate customer accounts: a separate corporate registration flow with stricter validation and a company lookup API.",
      "Membership ranks and small-lot fees: a scheduled job that recalculates each customer's rank from order history, with rank history and exports.",
      "Recommended products: database tables, a scheduled command, an API and an admin page to manage them.",
      "Admin command runner moved onto queues with live progress and a force-complete action, fixing request timeouts.",
      "Product search across names, descriptions, search words and product codes, with multi-keyword queries.",
      "Root-caused production 504 errors (PHP-FPM worker pool stuck at its default of 5) from CloudWatch logs and proposed a config-only fix.",
      "Payment fixes: gateway billing parameters, and a cart 500 error after an abandoned 3-D Secure checkout.",
    ],
    highlights: [
      { metric: "32,714", label: "orders verified, 0 diffs" },
      { metric: "300+", label: "commits on this platform" },
      { metric: "5 → 25", label: "PHP workers (504 fix)" },
    ],
    tech: ["Laravel 10", "PHP 8.2", "MySQL", "Meilisearch", "Redis", "Queues", "Docker", "AWS ECS / ECR", "CloudWatch"],
  },
  {
    id: "job-platform",
    title: "Multilingual job platform",
    client: "Recruitment product for the Malaysian market",
    kind: "Full-stack · Next.js",
    summary:
      "A job portal connecting job seekers and employers in English, Malay, Chinese and Japanese, with employer console, applicant tracking and admin moderation.",
    flow: ["Next.js 16", "Auth.js", "Server actions", "Drizzle ORM", "PostgreSQL", "Worker"],
    problem:
      "Employers needed more than a job board: a way to screen, track and talk to applicants, while seekers needed a profile that works in their own language.",
    built: [
      "Employer–seeker messaging with an interview scheduler.",
      "Screening questions employers attach to a job, with answers shown on each application.",
      "Job search filters and a job taxonomy, plus autocomplete suggestions, similar jobs, saved and hidden jobs, applied/viewed badges, and auto-closing expired jobs.",
      "Seeker CVs and photos: file storage and upload, CV details extracted from uploaded PDF/Word files, and applicants shown to employers.",
      "Account flows: email change and verification, forgot password, resend mail and password policy.",
      "Admin panel for running the platform.",
      "Company pages: a tabbed profile (About, Life, Jobs, Salary, Reviews), logo and cover images with member-role permissions, and a revamped mobile-friendly company panel.",
      "Applicant tracking: applicant list, notification centre, rejection reasons, internal notes, and seeker work experience.",
      "Kept QA test companies and jobs out of Google search results.",
    ],
    highlights: [
      { metric: "4", label: "languages (EN · BM · 中文 · 日本語)" },
      { metric: "3", label: "portals: seeker, employer, admin" },
      { metric: "70+", label: "commits shipped" },
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Drizzle", "Auth.js", "Zod", "Vitest", "Tailwind"],
  },
  {
    id: "catalogue",
    title: "Product catalogue & search",
    client: "Japanese manufacturer",
    kind: "Laravel API + WordPress",
    summary:
      "A product site for a Japanese manufacturer: WordPress for marketing pages, backed by a Laravel API I built to store the catalogue and power filtering by purpose, material and size.",
    flow: ["Scraper", "Laravel API", "MySQL", "Admin CRUD", "WordPress theme"],
    problem:
      "Marketing wanted to manage pages in WordPress, but thousands of products with categories, materials, purposes and sizes were too structured for WordPress alone, and the data had to come from the manufacturer's existing catalogue.",
    built: [
      "Admin screens with full CRUD for categories, product types, materials, purposes and sizes, plus a product editor with image upload and per-page SEO title, description and keywords.",
      "The product data model (13 tables: categories, product types, SKUs, materials, purposes, sizes, versions) and an import pipeline that scrapes the manufacturer's catalogue, including materials and thumbnails.",
      "Search API with faceted filters by purpose, category, sub-category, size, brand and material, including a fix for facets returning 0 results when keys were missing or duplicated.",
      "A daily statistics job that counts products by size.",
      "WordPress theme pages (home, categories, results) that call the API.",
      "Filter lists that sort correctly, including a size sort that understands standard size labels.",
    ],
    highlights: [
      { metric: "13", label: "product data tables" },
      { metric: "6", label: "faceted search filters" },
      { metric: "2", label: "systems joined by one API" },
    ],
    tech: ["Laravel", "PHP", "MySQL", "Web scraping", "REST API", "WordPress", "Scheduled jobs"],
  },
  {
    id: "crm",
    title: "Custom CRM systems",
    client: "Business clients of Horuz Technology",
    kind: "Backend · Laravel",
    summary:
      "New CRM systems built around each client's own process, kept in sync with the external systems they already use, and deployed live on their own domains.",
    flow: ["Figma UI", "Laravel", "MySQL", "Third-party APIs", "GitHub deploy", "NetShop hosting"],
    problem:
      "Each client needed a CRM shaped to how they work, not an off-the-shelf one. Customer data also lived in other systems, so the CRM had to pull from and push to them, and every system had to be hosted, deployed and reachable on the client's domain.",
    built: [
      "Led back-end development of new CRM systems in Laravel, tailored to each client's requirements.",
      "Third-party API integrations that retrieve and insert data in external systems, keeping the CRM up to date in both directions.",
      "Role-based access (admin, client and more) so each user manages and sees only the data relevant to them.",
      "Automated deployments from GitHub to NetShop servers, keeping live systems up and stable.",
      "Domain and DNS setup on GoDaddy so each live system routes correctly.",
      "Responsive, mobile-friendly screens built from Figma designs with the front-end team.",
    ],
    highlights: [
      { metric: "2-way", label: "third-party data sync" },
      { metric: "Auto", label: "deploys from GitHub" },
      { metric: "Lead", label: "back-end developer" },
    ],
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "REST API", "GitHub Actions", "NetShop hosting", "GoDaddy DNS"],
  },
];

export type Project = {
  id: string;
  title: string;
  tagline: string;
  year: string;
  kind: string;
  description: string;
  features: string[];
  tech: string[];
  images: { src: string; alt: string }[];
  device: "phone" | "desktop" | "photo";
  repo?: string;
  featured?: boolean;
  stats?: { metric: string; label: string }[];
};

// Sistem Kami is shown on its own as the flagship project.
export const flagship: Project = {
  id: "sistem-kami",
  title: "Sistem Kami",
  tagline: "Booking & business platform for Malaysian small businesses",
  year: "2025 — now",
  kind: "My own product · Full-stack",
  description:
    "A multi-vendor booking platform I designed, built and run. Vendors such as photo studios get a public booking page, a link-in-bio card and a full back-office: calendar, packages, payments, promotions, staff commissions and analytics. Customers book a slot and pay online in Malay, English or Chinese. I first built it in Laravel, then rebuilt it in Next.js with 1,000+ automated tests.",
  features: [
    "Concurrency-safe availability engine with slot holds, combo packages and add-ons",
    "Online payments (ToyyibPay) with deposits, invoices and full or partial refunds",
    "WhatsApp booking confirmations and reminders, with quiet hours",
    "Discount codes and automatic sales with countdowns",
    "Worker accounts with referral commissions and payouts, and a vendor wallet",
    "Reports with CSV export and a customer funnel (profile → package → slot → WhatsApp)",
    "Link-in-bio business card, service landing pages, SEO sitemap and structured data",
    "Rule-based booking assistant that answers from the vendor's live catalogue",
    "Superadmin: vendor approval, activity logs, platform settings",
  ],
  tech: ["Next.js 16", "TypeScript", "PostgreSQL", "Drizzle", "Auth.js", "Laravel", "ToyyibPay", "WhatsApp API", "Cloudflare R2", "Railway", "Vitest"],
  images: [
    { src: "/projects/sistemkami/hero.jpg", alt: "Vendor booking page" },
    { src: "/projects/sistemkami/landing.jpg", alt: "Package listing" },
    { src: "/projects/sistemkami/bookings.jpg", alt: "Booking calendar" },
    { src: "/projects/sistemkami/analytics.jpg", alt: "Analytics & customer funnel" },
    { src: "/projects/sistemkami/sales.jpg", alt: "Sales report" },
    { src: "/projects/sistemkami/payments.jpg", alt: "Vendor wallet" },
    { src: "/projects/sistemkami/team.jpg", alt: "Workers & commissions" },
    { src: "/projects/sistemkami/promotions.jpg", alt: "Promotions" },
    { src: "/projects/sistemkami/reminders.jpg", alt: "WhatsApp reminder settings" },
    { src: "/projects/sistemkami/card.jpg", alt: "Link-in-bio business card" },
  ],
  device: "desktop",
  stats: [
    { metric: "455", label: "commits" },
    { metric: "1,028", label: "automated tests" },
    { metric: "3", label: "languages (BM · EN · 中文)" },
    { metric: "2", label: "versions: Laravel → Next.js" },
  ],
};

export const projects: Project[] = [
  {
    id: "fishdex",
    title: "FishDex (KAST)",
    tagline: "Log real catches, collect every species",
    year: "2026",
    kind: "Mobile · Flutter",
    featured: true,
    description:
      "A mobile game for anglers: photograph a real catch, log its weight, length, method and location, and fill your FishDex. Catches earn XP, ranks and badges, and spots appear on a shared map. Phone numbers are verified over WhatsApp for the leaderboard. Available in English and Malay, with an Android beta and in-app update notices.",
    features: [
      "Catch logging with camera, GPS and offline storage",
      "Species collection with rarity tiers, habitats and pixel-art cards",
      "XP, ranks, 30 badges and a leaderboard",
      "Shared map of catch spots, with a private option",
      "Friends, Google sign-in and WhatsApp phone verification",
      "Firebase backend with Cloud Functions and App Check",
    ],
    tech: ["Flutter", "Riverpod", "Firebase", "Cloud Functions", "Google Maps", "Hive"],
    images: [
      { src: "/projects/fishdex/new-catch.jpg", alt: "Log a new catch" },
      { src: "/projects/fishdex/sprites.jpg", alt: "Pixel-art fish cards" },
      { src: "/projects/fishdex/badges.jpg", alt: "Habitat badges by rarity" },
      { src: "/projects/fishdex/verify.jpg", alt: "WhatsApp phone verification" },
    ],
    device: "phone",
  },
  {
    id: "movie-character-night",
    title: "Movie Character Night",
    tagline: "Event photo & video drop, straight into Google Drive",
    year: "2026",
    kind: "Web app · Vercel",
    featured: true,
    description:
      "Guests at an event scan a QR code, then upload photos and videos from their phone and browse a shared gallery, with no app and no sign-in. Files upload directly from the browser into Google Drive using resumable uploads, so large videos skip Vercel's 4.5 MB request limit entirely.",
    features: [
      "Browser → Google Drive resumable upload with live progress",
      "Video thumbnails captured in the browser for an instant gallery",
      "Swipeable full-screen viewer with streamed video playback",
      "Least-privilege Drive scope: the app only sees files it created",
    ],
    tech: ["Node.js", "Vercel Functions", "Google Drive API", "OAuth 2.0", "Vanilla JS"],
    images: [
      { src: "/projects/mcn/home.jpg", alt: "Event landing page" },
      { src: "/projects/mcn/upload.jpg", alt: "Upload screen with selected photos" },
      { src: "/projects/mcn/progress.jpg", alt: "Upload progress dialog" },
      { src: "/projects/mcn/gallery.jpg", alt: "Event gallery grid" },
    ],
    device: "phone",
  },
  {
    id: "smashon",
    title: "SmashON",
    tagline: "Badminton court booking & community app",
    year: "2023",
    kind: "Mobile · Final Year Project",
    description:
      "An Android app for badminton players to find courts, book them, chat with other players and enter the facility with a QR pass. Built end-to-end as my final year project.",
    features: [
      "Court search and facility details",
      "Booking with cart",
      "QR code entrance pass",
      "Player chat",
      "Google sign-in",
    ],
    tech: ["Flutter", "Firebase", "PHP", "MySQL", "REST API"],
    images: [
      { src: "/projects/smashon/homepage.jpg", alt: "Home screen" },
      { src: "/projects/smashon/search.jpg", alt: "Court search" },
      { src: "/projects/smashon/facilty-detail.jpg", alt: "Facility detail" },
      { src: "/projects/smashon/cart.jpg", alt: "Booking cart" },
      { src: "/projects/smashon/entrace.jpg", alt: "QR entrance pass" },
      { src: "/projects/smashon/chat.jpg", alt: "Player chat" },
    ],
    device: "photo",
  },
  {
    id: "swiftstay",
    title: "SwiftStay",
    tagline: "Hotel booking on top of the Booking.com API",
    year: "2023",
    kind: "Web · API integration",
    description:
      "A hotel booking site that pulls live hotel availability and prices from the Booking.com API, with accounts for managing bookings.",
    features: ["Live availability & pricing", "Search and booking", "Manage and update bookings", "Authentication"],
    tech: ["PHP", "REST API", "Booking.com API", "MySQL"],
    images: [
      { src: "/projects/swiftstay/homepage.jpg", alt: "Home page" },
      { src: "/projects/swiftstay/search.jpg", alt: "Hotel search" },
      { src: "/projects/swiftstay/view-booking.jpg", alt: "Booking details" },
      { src: "/projects/swiftstay/update.jpg", alt: "Update booking" },
    ],
    device: "desktop",
  },
  {
    id: "melody",
    title: "Melody",
    tagline: "Music album store with memberships",
    year: "2023",
    kind: "Web · CodeIgniter 4",
    description:
      "An online album store where monthly and yearly members get automatic discounts at checkout, with an admin panel for albums, plans and orders.",
    features: ["Membership plans with automatic discounts", "Albums by category", "Cart & checkout with receipt", "Admin panel"],
    tech: ["CodeIgniter 4", "PHP", "MySQL", "Bootstrap"],
    images: [
      { src: "/projects/melody/landing.jpg", alt: "Landing page" },
      { src: "/projects/melody/album-list.jpg", alt: "Album list" },
      { src: "/projects/melody/plan.jpg", alt: "Membership plans" },
      { src: "/projects/melody/checkout.jpg", alt: "Checkout" },
    ],
    device: "desktop",
  },
];

export const building = [
  { title: "Limb Brigade", text: "2D co-op game (2–4 players): puzzles, shooting and detachable body parts.", tech: "Godot" },
];

export const skills = [
  { group: "Backend", items: ["Laravel", "PHP", "Node.js", "NestJS", "REST API design", "Queues & scheduled jobs", "Web scraping", "PDF & Excel/CSV generation", "CodeIgniter 4"] },
  { group: "Data & search", items: ["MySQL", "PostgreSQL", "Drizzle ORM", "Meilisearch / Laravel Scout", "Redis", "Firestore", "Query optimisation"] },
  { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vue.js", "WordPress", "i18n (BM · EN · 中文 · 日本語)", "Figma"] },
  { group: "Mobile & games", items: ["Flutter", "Riverpod", "Firebase (Auth, Storage, Functions)", "Google Maps", "Godot"] },
  { group: "Automated messaging", items: ["Automated WhatsApp messages (Fonnte API)", "Booking confirmations & reminders", "WhatsApp OTP verification", "Transactional email (Mailgun, SMTP)", "Order, invoice & password emails", "Scheduled sends with quiet hours"] },
  { group: "Integrations", items: ["ToyyibPay", "Payment gateways & 3-D Secure", "Google Drive API", "Google OAuth", "Booking.com API", "Company lookup API"] },
  { group: "Cloud & DevOps", items: ["Docker", "AWS (ECS, ECR, S3, CloudFront, CloudWatch)", "Cloudflare R2", "Railway", "Vercel", "CI/CD", "DNS & domains", "Git / GitHub"] },
  { group: "Testing", items: ["Vitest", "Testing Library", "Production data replay"] },
];

export const aiWorkflow = {
  tools: ["Claude Code", "ChatGPT"],
  text: "I use AI coding tools daily for planning, refactoring, writing tests and hunting bugs. I review and test every change before it merges; the tools make me faster, and I stay responsible for the code.",
};

export const education = [
  {
    school: "Universiti Teknologi MARA (UiTM), Perlis",
    degree: "Bachelor of Information Technology (Hons)",
    period: "2022 — 2024",
    grade: "CGPA 3.64",
  },
  {
    school: "Universiti Teknologi MARA (UiTM), Kedah",
    degree: "Diploma in Computer Science",
    period: "2019 — 2022",
    grade: "CGPA 3.83",
  },
];

export const awards = [
  { title: "Vice Chancellor's Award", detail: "Bachelor's degree", year: "2024" },
  { title: "Vice Chancellor's Award", detail: "Diploma", year: "2022" },
  { title: "Dean's List", detail: "Degree, semesters 3–5", year: "2022–23" },
  { title: "Dean's List", detail: "Diploma, every semester", year: "2019–22" },
];
