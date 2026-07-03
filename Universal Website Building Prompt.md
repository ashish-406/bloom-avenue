# Universal Website Building Master Prompt
*A reusable prompt template for building any professional business website*
*Developed through the Foodz by RG project*

---

## HOW TO USE THIS TEMPLATE

1. Fill in every section marked with `[ ]`
2. Remove any sections that don't apply to your business
3. Paste the entire filled prompt into Claude (VS Code, claude.ai, or any AI)
4. Claude will build a complete, production-ready website from it

---

## THE MASTER PROMPT

---

### PART 1 — BUSINESS BRIEF

```
I want to build a professional website for the following business.
Read the entire brief carefully before writing any code.

BUSINESS NAME: [name]
BUSINESS TYPE: [e.g. restaurant, gym, law firm, salon, hotel, retail store]
TAGLINE: [one-line description or slogan]
LOCATION: [full address]
PHONE / WHATSAPP: [number]
EMAIL: [email address]
WEBSITE GOAL: [e.g. attract customers, drive foot traffic, sell products, generate leads]
TARGET AUDIENCE: [e.g. local families, tourists, young professionals, businesses]

SOCIAL MEDIA:
- Instagram: [@handle]
- Facebook: [page name or URL]
- TikTok: [@handle]
- Other: [platform and handle]

OPENING HOURS: [e.g. Mon-Fri 9am-10pm, Sat-Sun 10am-11pm]

GOOGLE MAPS LINK: [paste link]
GOOGLE MAPS EMBED SRC: [paste iframe src if available]

ABOUT THE BUSINESS:
[2-5 sentences describing the business, its story, what makes it unique,
and the vibe or atmosphere. Be as detailed as possible.]

UNIQUE SELLING POINTS:
[List 3-5 things that make this business stand out from competitors]
- 
- 
- 

IMPORTANT NOTES / BADGES:
[e.g. 100% Halal, Vegan-friendly, Award-winning, Est. 2020, Family-owned]
```

---

### PART 2 — PRODUCTS / SERVICES / MENU

```
PRODUCTS OR SERVICES:
[List everything the business offers with names, descriptions, and prices.
Be as detailed as possible. Use the format below.]

CATEGORY 1: [category name]
- [Item name] — [price] — [short description]
- [Item name] — [price] — [short description]

CATEGORY 2: [category name]
- [Item name] — [price] — [short description]
- [Item name] — [price] — [short description]

[Add as many categories as needed]

FEATURED ITEMS:
[List 3-4 hero items to highlight prominently on the homepage]
- [Item name] — [why it's special]
- [Item name] — [why it's special]
```

---

### PART 3 — DESIGN PREFERENCES

```
DESIGN VIBE:
[Describe how you want the site to feel. Examples:]
[- Dark, moody, premium]
[- Bright, clean, minimal]
[- Warm, rustic, cozy]
[- Bold, energetic, street food cool]
[- Corporate, trustworthy, professional]
[- Playful, colorful, fun]

Your choice: [describe in your own words]

COLOR PREFERENCES:
- Primary color: [hex or description, e.g. deep black #0D0D0D]
- Accent color: [hex or description, e.g. flame orange #FF5C00]
- Background: [hex or description]
- Text: [hex or description]
- Any colors to AVOID: [list them]

FONT PREFERENCES:
- Headings: [e.g. Bebas Neue, Playfair Display, or "something bold and modern"]
- Body text: [e.g. DM Sans, Inter, or "clean and readable"]

REFERENCE WEBSITES:
[Paste URLs of websites whose design you like. Claude will take inspiration.]
- [URL]
- [URL]

LOGO: [describe or say "not available yet"]
PHOTOS AVAILABLE: [describe what photos you have or say "use placeholders"]
```

---

### PART 4 — WEBSITE STRUCTURE

```
LAYOUT TYPE:
[Choose one]
- Single-page scrollable (recommended for small businesses)
- Multi-page (recommended for larger businesses with lots of content)

SECTIONS NEEDED:
[Check all that apply and add any extras]
- [ ] Navbar (sticky, with smooth-scroll links)
- [ ] Hero (full-screen image or video with headline and CTA)
- [ ] About / Our Story
- [ ] Products / Services / Menu
- [ ] Gallery
- [ ] Testimonials / Reviews
- [ ] Team
- [ ] Pricing
- [ ] FAQ
- [ ] Blog
- [ ] Contact Form
- [ ] Location & Hours (with Google Maps embed)
- [ ] Footer (with social links)
- [ ] Other: [describe]

CALL TO ACTION:
[What is the #1 action you want visitors to take?]
[e.g. Call us, WhatsApp us, Book a table, Buy now, Get a quote]
Your CTA: [describe]

CTA BUTTON TEXT: [e.g. "WhatsApp Us", "Book Now", "Get a Quote"]
CTA LINK: [e.g. https://wa.me/[number], tel:[number], mailto:[email]]
```

---

### PART 5 — TECHNICAL REQUIREMENTS

```
TECH STACK:
- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS
- Animations: Framer Motion (fade-in on scroll for each section)
- Icons: Lucide React
- Fonts: Google Fonts (specified above)
- Images: next/image for all photos (optimized)
- Deployment: Vercel

PERFORMANCE REQUIREMENTS:
- Mobile-first design (majority of visitors are on phones)
- Fast load times (use next/image, lazy loading)
- SEO optimized (meta title, description, Open Graph tags for each page)
- Smooth scroll navigation

SECURITY:
Add the following HTTP security headers in next.config.js:
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()
- X-DNS-Prefetch-Control: on
- Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

FOLDER STRUCTURE (single-page):
app/
├── layout.jsx        ← Root layout, fonts, SEO metadata
└── page.jsx          ← All sections on one page
components/
├── Navbar.jsx
├── Hero.jsx
├── [SectionName].jsx ← One component per section
└── Footer.jsx
public/
└── images/           ← All photos and logo
styles/
└── globals.css

SPECIAL INTEGRATIONS:
- [ ] WhatsApp direct link button
- [ ] Google Maps embed
- [ ] Instagram feed link
- [ ] Downloadable PDF menu / brochure
- [ ] Contact form
- [ ] Other: [describe]
```

---

### PART 6 — BUILD INSTRUCTIONS

```
BUILD INSTRUCTIONS FOR CLAUDE:

1. Read the entire brief above before writing any code
2. Build the complete website in one go based on this brief
3. Use the exact business name, details, colors, and fonts specified
4. Use the exact products/services/menu items and prices provided
5. All sections should be on one page (app/page.jsx) unless multi-page specified
6. Navbar links should smooth-scroll to anchor IDs
7. Use placeholder images (via https://placehold.co) for any missing photos
8. Every section should fade in on scroll using Framer Motion
9. The site must look great on mobile first, then desktop
10. Add all security headers to next.config.js
11. Add SEO metadata to app/layout.jsx
12. Highlight any IMPORTANT NOTES / BADGES prominently (e.g. Halal, Vegan)
13. After building, list every file created and confirm the folder structure
14. Do not ask clarifying questions — use best judgment for anything not specified

TONE OF VOICE FOR COPY:
[Describe how the website text should sound]
[e.g. warm and welcoming, bold and confident, professional and trustworthy,
fun and casual, luxurious and exclusive]
Your choice: [describe]
```

---

## DEPLOYMENT CHECKLIST
*Run through this after Claude builds the site*

- [ ] Test on mobile (Chrome DevTools → mobile view)
- [ ] Push to GitHub
- [ ] Import repo on vercel.com → Deploy
- [ ] Run live URL through securityheaders.com (aim for B+ rating)
- [ ] Add custom domain in Vercel dashboard (Settings → Domains)
- [ ] Verify Google Maps embed is working
- [ ] Verify WhatsApp / CTA button links are correct
- [ ] Replace all placeholder images with real photos
- [ ] Submit site to Google Search Console for indexing

---

## OPTIONAL ENHANCEMENTS
*Add these to the prompt or ask Claude to add them after the initial build*

**AI-Powered:**
- AI product/menu recommender (Claude API in the site)
- AI chatbot for customer questions

**UX:**
- Dark/light mode toggle
- Menu search and filter by category or price
- Lightbox photo gallery
- Parallax hero scrolling effect
- "Most Popular" or "Chef's Special" badges on items

**Marketing:**
- Downloadable PDF menu/brochure (generate with Claude separately)
- Instagram feed embed (use Behold.so or SnapWidget)
- Google Reviews embed
- Promotional banner / announcement bar

**Video (generate with Pika, Runway, Kling, or Luma):**
- Hero background video loop
- Per-product/dish short clips
- Restaurant/business atmosphere clip

---

*Template built during the Foodz by RG project — Riverside Shopping Centre,*
*Rivière du Rempart, Mauritius — @_foodzbyrg*
