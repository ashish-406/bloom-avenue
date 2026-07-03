# Website Build Prompt — Bloom Avenue Le Spa
*Adapted from the Master Website Build Prompt v2*
*Paste everything below the line into Claude in VS Code*

---

I want to build a professional website for the following business.
Read the ENTIRE brief before writing a single line of code.

---

## PART 1 — BUSINESS BRIEF

```
BUSINESS NAME: Bloom Avenue Le Spa
BUSINESS TYPE: Beauty Salon & Spa
TAGLINE: A Luxurious & Relaxing Retreat
LOCATION: Vis-à-vis Market, Route Royale, Saint Pierre, Mauritius
PHONE / WHATSAPP: +230 5478 5001
PHONE 2: +230 5892 7354
EMAIL: bloomavenuelespa@gmail.com
WEBSITE GOAL: Attract new clients, drive bookings via WhatsApp and phone,
showcase services and treatments professionally
TARGET AUDIENCE: Women in Mauritius looking for beauty, wellness,
and self-care services — locals in Saint Pierre and surrounding areas,
young professionals, brides-to-be
LANGUAGE: Bilingual — English and French

SOCIAL MEDIA:
- Facebook: https://www.facebook.com/people/Bloom-Avenue-Le-Spa/100078854890417/
- Instagram: @bloom_avenue_spa
- TikTok: @bloom_avenue_le_spa

OPENING HOURS: (to be confirmed — leave as placeholder)

GOOGLE MAPS LINK: (to be confirmed — search "Bloom Avenue Le Spa Saint Pierre Mauritius")
GOOGLE MAPS COORDINATES: (to be confirmed)
GOOGLE MAPS EMBED SRC: (to be confirmed)

ABOUT THE BUSINESS:
Bloom Avenue Le Spa is a luxurious beauty salon and spa located in Saint Pierre,
Mauritius, vis-à-vis the local market on Route Royale. It offers a full menu of
premium spa and beauty services including advanced skin care, massages, body
treatments, manicures, pedicures, couple packages, hair services, and waxing.
The spa also has a second location in Quartier Militaire. Known for its warm,
welcoming atmosphere and skilled team, Bloom Avenue is a go-to destination
for self-care and pampering in the region.

UNIQUE SELLING POINTS:
- Full-service spa AND salon under one roof
- Couple packages available — ideal for gifts and special occasions
- Advanced skin care treatments and facial expertise
- Two locations: Saint Pierre & Quartier Militaire
- Active, engaged community on TikTok and Facebook

TRUST BADGES:
- Woman-Owned Business
- Two Locations in Mauritius
- Book via WhatsApp in seconds
```

---

## PART 2 — SERVICES

```
CATEGORY 1: Skin Care & Facials
- Advanced Skin Care Facial — (price TBC) — deep cleansing and rejuvenating facial treatment
- Anti-Aging Facial — (price TBC)
- Brightening Facial — (price TBC)
- Acne Treatment Facial — (price TBC)

CATEGORY 2: Massage & Body Treatments
- Relaxation Massage — (price TBC)
- Deep Tissue Massage — (price TBC)
- Body Scrub & Wrap — (price TBC)
- Aromatherapy Massage — (price TBC)

CATEGORY 3: Nails
- Manicure — (price TBC)
- Pedicure — (price TBC)
- Gel Nails — (price TBC)
- Nail Art — (price TBC)
- Mani-Pedi Combo — (price TBC)

CATEGORY 4: Hair Services
- Haircut & Styling — (price TBC)
- Keratin Treatment — (price TBC)
- Hair Colouring — (price TBC)
- Blowdry & Finish — (price TBC)

CATEGORY 5: Waxing
- Full Body Wax — (price TBC)
- Eyebrow Wax & Tint — (price TBC)
- Lip & Facial Wax — (price TBC)

CATEGORY 6: Packages
- Couple Package — (price TBC) — romantic spa experience for two
- Bridal Package — (price TBC) — full prep for brides
- Birthday Pamper Package — (price TBC)
- Full Day Retreat — (price TBC)

NOTE: Replace all "(price TBC)" with real prices once confirmed with the client.

FEATURED / HERO SERVICES:
- Couple Package — perfect for gifting and special occasions
- Advanced Skin Care Facial — signature treatment
- Mani-Pedi Combo — most booked service
- Keratin Treatment — popular hair service
```

---

## PART 3 — DESIGN

```
DESIGN VIBE:
Luxurious, feminine, and serene. Think high-end spa aesthetic —
soft, elegant, and calming. Not clinical. Not generic pink.
Premium and aspirational but still warm and welcoming.
Reference: think Glossier meets a luxury Bali spa.

COLOR PALETTE:
- Background: Soft Ivory #FAF7F2
- Primary accent: Dusty Rose #C9847A
- Secondary accent: Warm Gold #C9A84C
- Deep contrast: Charcoal #2C2C2C
- Text: #3A3A3A
- Colors to AVOID: Bright neon colors, harsh blacks, generic hot pink

TYPOGRAPHY:
- Display / Headings: Cormorant Garamond (elegant, luxury serif)
- Body text: DM Sans (clean, modern, readable)
- Accent / taglines: Italiana or Great Vibes (optional script for special callouts)

REFERENCE WEBSITES:
- https://www.thecalmspace.com (spa aesthetic reference)
- https://glossier.com (soft, feminine, premium)

LOGO: Not available — use elegant text logo:
"Bloom Avenue" in Cormorant Garamond + "Le Spa" smaller beneath it
Add a small floral or leaf icon if possible

PHOTOS: Use high-quality placeholder images from Unsplash
Search terms: "spa treatment", "manicure salon", "facial treatment",
"luxury spa interior", "massage treatment", "nail art"
Replace with real photos from their Facebook/TikTok content later

VIDEO: Not available yet — use static hero image for now
```

---

## PART 4 — SITE STRUCTURE

```
LAYOUT: Single-page scrollable

SECTIONS:
1. Navbar — sticky, logo left, smooth-scroll links right, "Book Now" CTA button
2. Hero — full-screen spa image, "Bloom Avenue Le Spa" headline,
   tagline "A Luxurious & Relaxing Retreat", two CTA buttons:
   "Book via WhatsApp" and "Explore Services"
3. About — warm brand story, mention of Saint Pierre location,
   woman-owned, welcoming atmosphere, 2 locations
4. Services — category tabs: Skin Care / Massage / Nails / Hair / Waxing / Packages
   Each service as a card with name, short description, price (or "From Rs X")
5. Why Bloom Avenue — 3 icon + text tiles:
   "Expert Therapists" / "Premium Products" / "Total Relaxation"
6. Packages Spotlight — highlight the Couple Package and Bridal Package
   as featured cards with a "Book Now" button on each
7. Gallery — horizontal scroll strip of treatment and salon photos
8. Testimonials — 3 client review cards (use placeholder quotes for now)
9. Find Us — Google Maps embed + opening hours + both phone numbers +
   email + WhatsApp link + note about second location in Quartier Militaire
10. Footer — logo, nav links, social icons (Facebook, Instagram, TikTok),
    address, email, copyright

PRIMARY CTA:
Text: "Book via WhatsApp"
Link: https://wa.me/23054785001

SECONDARY CTA:
Text: "Call Us"
Link: tel:+23054785001
```

---

## PART 5 — TECHNICAL STACK

```
FRAMEWORK: Next.js 14 (App Router)
STYLING: Tailwind CSS
ANIMATIONS: Framer Motion — fade-in on scroll for every section
ICONS: Lucide React
FONTS: Google Fonts — Cormorant Garamond + DM Sans
IMAGES: next/image for all photos
DEPLOYMENT: Vercel

FOLDER STRUCTURE:
app/
├── layout.jsx
└── page.jsx
components/
├── Navbar.jsx
├── Hero.jsx
├── About.jsx
├── Services.jsx
├── WhyBloom.jsx
├── PackagesSpotlight.jsx
├── Gallery.jsx
├── Testimonials.jsx
├── FindUs.jsx
├── Footer.jsx
└── JsonLd.jsx
public/
└── images/
styles/
└── globals.css

SPECIAL INTEGRATIONS:
- WhatsApp floating button (bottom-right corner, always visible, dusty rose color)
- Google Maps embed in Find Us section
- Smooth scroll navigation
- Bilingual copy — mix of English and French where appropriate
  (e.g. "Prenez soin de vous" as a section subheading)
```

---

## PART 6 — SEO

```
metadataBase: new URL('https://bloomavenuelespa.vercel.app')

title: 'Bloom Avenue Le Spa — Beauty Salon & Spa | Saint Pierre, Mauritius'

description: 'Bloom Avenue Le Spa offers luxurious spa and beauty treatments
in Saint Pierre, Mauritius — facials, massages, nails, hair services, waxing,
and couple packages. Book via WhatsApp: +230 5478 5001'

keywords: ['Bloom Avenue Le Spa', 'spa Mauritius', 'beauty salon Saint Pierre',
'salon Mauritius', 'facial Mauritius', 'massage Mauritius',
'manicure pedicure Mauritius', 'couple package spa Mauritius',
'keratin treatment Mauritius', 'bridal package Mauritius']

openGraph:
  title: 'Bloom Avenue Le Spa — Saint Pierre, Mauritius'
  description: 'Luxurious spa and beauty salon in Saint Pierre, Mauritius.
    Facials, massages, nails, hair & more. Book via WhatsApp.'
  url: 'https://bloomavenuelespa.vercel.app'
  siteName: 'Bloom Avenue Le Spa'
  images: [{ url: '/og-image.jpg', width: 1200, height: 630 }]
  locale: 'en_MU'
  type: 'website'

twitter:
  card: 'summary_large_image'
  title: 'Bloom Avenue Le Spa — Beauty Salon & Spa | Mauritius'
  description: 'Luxurious spa treatments in Saint Pierre, Mauritius.'
  images: ['/og-image.jpg']

JSON-LD Schema (@type: BeautySalon):
{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Bloom Avenue Le Spa",
  "image": "/og-image.jpg",
  "url": "https://bloomavenuelespa.vercel.app",
  "telephone": "+23054785001",
  "email": "bloomavenuelespa@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Route Royale, Vis-à-vis Market",
    "addressLocality": "Saint Pierre",
    "addressCountry": "MU"
  },
  "sameAs": [
    "https://www.facebook.com/people/Bloom-Avenue-Le-Spa/100078854890417/",
    "https://www.instagram.com/bloom_avenue_spa/",
    "https://www.tiktok.com/@bloom_avenue_le_spa"
  ]
}

Create app/sitemap.js and app/robots.js
Add alt text to every next/image
Create og-image.jpg: ivory background, "Bloom Avenue Le Spa" in
Cormorant Garamond, dusty rose accent, 1200×630px
```

---

## PART 7 — SECURITY

```
Add the following HTTP security headers to next.config.js:
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()
- X-DNS-Prefetch-Control: on
- Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

---

## PART 8 — BUILD INSTRUCTIONS

```
1. Read the entire brief before writing any code
2. Build the complete website in one go
3. Use the exact business name, colors, and fonts specified
4. Use Cormorant Garamond for all headings — it defines the luxury feel
5. The floating WhatsApp button must be dusty rose (#C9847A), always visible
6. Bilingual touches: sprinkle French subheadings naturally
   (e.g. "Prenez soin de vous", "Votre moment de détente")
7. Packages Spotlight section must feel premium — large cards, gold accents,
   clear "Book Now" CTA on each package
8. Use placehold.co for all missing images with descriptive labels
9. Every section fades in on scroll using Framer Motion useInView
10. Mobile-first — spa clients browse on their phones
11. Add all security headers to next.config.js
12. Add full SEO metadata to app/layout.jsx
13. Add JSON-LD BeautySalon schema as components/JsonLd.jsx
14. After building, list every file created and confirm folder structure
15. Do not ask clarifying questions — use best judgment
16. Do not leave TODO comments — complete everything

TONE OF VOICE:
Warm, luxurious, and feminine. Inviting and aspirational —
like a trusted friend recommending a place to treat yourself.
Mix English and French naturally for a local Mauritian feel.
Examples:
- "You deserve this."
- "Prenez soin de vous — because you're worth it."
- "Your moment of pure relaxation starts here."
```

---

## DEPLOYMENT CHECKLIST

- [ ] Test on mobile
- [ ] Replace placeholder images with real photos from Facebook/TikTok
- [ ] Confirm and fill in opening hours
- [ ] Confirm and fill in service prices
- [ ] Confirm Google Maps link and embed src
- [ ] Add second location (Quartier Militaire) details to Find Us section
- [ ] Push to GitHub
- [ ] Deploy on vercel.com
- [ ] Run through securityheaders.com
- [ ] Run through search.google.com/rich-results (verify JSON-LD)
- [ ] Update metadataBase and canonical with final domain
- [ ] Submit to Google Search Console

---

## THINGS TO COLLECT FROM CLIENT BEFORE GOING LIVE

- [ ] Service prices (all categories)
- [ ] Opening hours
- [ ] Google Maps link for Saint Pierre location
- [ ] Google Maps link for Quartier Militaire location
- [ ] High-quality photos (treatments, interior, staff)
- [ ] Logo file (PNG transparent background)
- [ ] Any promotions or seasonal packages to feature
- [ ] Real client testimonials (3–5 quotes with first name)
