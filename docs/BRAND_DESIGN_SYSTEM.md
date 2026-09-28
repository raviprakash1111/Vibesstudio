# VIBES STUDIO — MASTER BRAND FOUNDATION & COMPONENT SPECIFICATIONS
> **Tagline:** “Feel the way you move”  
> **Core Identity:** Physical Studio (Orange Wall + Green Wall + Black Logo + Wood Floor)

---

## 1. BRAND COLOR TOKENS & RULES (STEP 1 & 1A)

```css
--brand-orange: #D57E4D;       /* Studio Orange — Energy, Dance & Action */
--brand-green: #266127;        /* Studio Green — Studio, Balance & Support */
--brand-dark-green: #103A18;   /* Studio Dark Green — Dark Hero, Footer & Cinematic */
--brand-black: #111111;        /* Studio Black — Exact Logo & Major Headings */
--brand-cream: #F7F2EA;        /* Studio Cream — Main Background Canvas */
--brand-wood: #C8B8A4;         /* Studio Wood — Cards, Borders & Accents */
--brand-white: #FFFFFF;        /* Clean White — Cards & Dark-Section Text */
--brand-muted: #6B6B63;        /* Muted Gray — Secondary Text & Metadata */
```

---

## 2. HEADER & NAVIGATION SPECIFICATIONS (STEP 2)

- **Logo Authority:** Exact uploaded logo (`assets/images/vibes-studio-logo-full.jpg`).
- **Desktop Nav Items:** `Home`, `Classes`, `Experience`, `Choreography`, `Gallery`, `Reviews`, `About`, `Contact`.
- **Primary Header Action:** `“Book a Free Demo”` CTA button in Studio Orange `#D57E4D`.
- **Scroll Behavior:** Starts transparent overlay on Hero, smoothly transitions into Dark Green glass blur (`rgba(16, 58, 24, 0.92)`) after 40px scroll.
- **Mobile Drawer:** Animated 3-bar hamburger toggle, full-screen slide-down overlay, touch-friendly menu links, WhatsApp CTA button.

---

## 3. HERO SECTION SPECIFICATIONS (STEP 3)

- **Background Media:** Widescreen cinematic dance studio photograph (`assets/images/hero-studio-bg.png`) depicting physical studio environment (orange wall, green accent wall, light wood floor).
- **Headline:** Official Tagline **“FEEL THE WAY YOU MOVE”** in ExtraBold uppercase (`Montserrat` 900) with Studio Orange highlight.
- **Supporting Copy:** *“Dance. Fitness. Creativity. Experience the VIBES in our high-energy physical studio space.”*
- **Action CTAs:** **“BOOK A FREE DEMO”** (Studio Orange `#D57E4D`) + **“EXPLORE CLASSES”** (Hero Outline).
- **Scroll Indicator:** Animated mouse icon wheel.

---

## 4. CLASSES SECTION SPECIFICATIONS (STEP 4)

- **Section Intro:** Label `“EXPLORE VIBES”`, Heading `“Find Your Rhythm”`, Copy `“Dance, fitness and creative learning experiences designed for different ages and interests.”`.
- **6 Class Categories:** `KIDS DANCE` (Featured span 8), `SENIOR / KIDS DANCE` (span 4), `ADULT DANCE` (span 4), `ZUMBA FITNESS` (span 4), `ART CLASSES` (span 4), `TUITIONS` (span 8).
- **Bottom CTA:** `“VIEW ALL CLASSES”` in Studio Orange `#D57E4D`.

---

## 5. STUDIO EXPERIENCE SECTION SPECIFICATIONS (STEP 5)

- **Section Intro:** Label `“THE VIBES EXPERIENCE”`, Heading `“More Than a Dance Studio”`, Copy `“An energetic space where movement, creativity and learning come together.”`.
- **Split Layout:** Authentic physical studio photograph (`assets/images/physical-studio-preview.png`) on the left, 5 established features on the right with Studio Green icon badges and hover accent bars.

---

## 6. CHOREOGRAPHY & EVENT SERVICES SPECIFICATIONS (STEP 6)

- **Section Environment:** Studio Dark Green `#103A18` cinematic dark section.
- **Section Intro:** Label `“CREATE • PERFORM • CELEBRATE”`, Heading `“Bring Your Event to Life”`, Copy `“From choreography to performances, VIBES STUDIO brings energy and creativity to special occasions and events.”`.
- **8 Event Services:** `SANGEETH CHOREOGRAPHY` (span 6), `PRE-WEDDING CHOREOGRAPHY` (span 6), `BIRTHDAY EVENTS` (span 4), `CORPORATE EVENTS` (span 4), `KITTY PARTIES` (span 4), `EVENT PERFORMANCES` (span 4), `DANCE WORKSHOPS` (span 4), `ANCHORING` (span 4).
- **Action Bar & CTAs:** `“ENQUIRE FOR YOUR EVENT”` (Studio Orange `#D57E4D`) + `“VIEW ALL SERVICES”` + WhatsApp Quick Contact.

---

## 7. GALLERY & VIDEO SHOWCASE SPECIFICATIONS (STEP 7)

- **Section Intro:** Label `“INSIDE VIBES STUDIO”`, Heading `“Feel the Energy”`, Copy `“Real moments. Real movement. Real VIBES.”`.
- **Dynamic Category Filter Tabs:** `ALL`, `DANCE`, `KIDS`, `ZUMBA`, `EVENTS`, `CHOREOGRAPHY`, `WORKSHOPS`, `STUDIO`.
- **Featured Hero Video & Lightbox Modal:** Fullscreen lightbox modal with ESC key and click-outside dismissal.
- **"Watch Us" YouTube & Social Area:** Official channel badge `@vibesstudiovizag`, 3 video cards, dual CTAs.

---

## 8. TESTIMONIALS & SOCIAL PROOF SPECIFICATIONS (STEP 8)

- **Section Intro:**
  - Label: `“WHAT OUR COMMUNITY SAYS”` (`.section-badge-pill`, Studio Green accent)
  - Heading: `“Real Experiences. Real VIBES.”` (`Montserrat` 800 uppercase)
  - Supporting Copy: `“Discover what our students, parents and clients say about their experience at VIBES STUDIO.”`
- **Authenticity Rules:** No fake testimonials, no fake star ratings, no exaggerated claims. Clearly marked verified placeholder cards.
- **Testimonial Card Frame:**
  - Studio Orange `#D57E4D` large decorative quotation mark (`“`).
  - Studio Cream `#F7F2EA` background with Studio Wood `#C8B8A4` border.
  - Testimonial body text (`Inter` 400 italic, 1.15rem).
  - Author Avatar badge, display name, relationship role, and class/category badge.
- **Interactive Carousel:**
  - Next / Prev round buttons with Studio Green hover state.
  - Active dot indicators with Studio Orange fill (`.carousel-dot.active`).
  - No aggressive autoplay.
- **Secondary Social Proof Strip:**
  - Heading: `“SEE MORE FROM VIBES STUDIO”`
  - Action Buttons: `YOUTUBE`, `INSTAGRAM`, and Primary CTA `“JOIN THE VIBES”` (`#D57E4D` Studio Orange).

---

## 9. SCHEDULE & FEES SPECIFICATIONS (STEP 9)

- **Section Intro:**
  - Label: `“PLAN YOUR VIBES”` (`.section-badge-pill`, Studio Green accent)
  - Heading: `“Classes & Schedule”` (`Montserrat` 800 uppercase)
  - Supporting Copy: `“Choose your class, find your batch and start your journey with VIBES STUDIO.”`
- **Category Filter Tabs:** `ALL`, `KIDS`, `DANCE`, `ZUMBA`, `FITNESS`, `ART`, `TUITIONS`.
- **Item Data Structure (`VIBES_SCHEDULE_DATA`):**
  - Structured JS array ready for future Admin Panel CRUD API connection: `id`, `className`, `category`, `batchName`, `ageGroup`, `days`, `startTime`, `endTime`, `monthlyFee`, `status`, `description`, `isActive`, `sortOrder`.
- **Card UI Layout:**
  - Class & Batch title with status badge (`OPEN`, `FEW SEATS`, `FULL`).
  - Details grid: Age Group, Days, Time range.
  - Monthly fee display: `₹X,XXX` bold with `per month` label.
  - Action buttons: Primary `“BOOK YOUR BATCH”` (`#D57E4D` Studio Orange) + Secondary WhatsApp quick icon (`btn-whatsapp-outline`) with pre-filled message.
- **Mobile Usability:** Responsive vertical card layout with horizontal scrolling category tabs for 2–3 second scanning.
- **Free Demo Offer:** Callout banner with `“BOOK A FREE DEMO”` CTA button.

---

## 10. ABOUT VIBES STUDIO & FOUNDER SPECIFICATIONS (STEP 10)

- **Section Intro:**
  - Label: `“ABOUT VIBES STUDIO”` (`.section-badge-pill`, Studio Green accent)
  - Heading: `“Where Movement Becomes an Experience”` (`Montserrat` 800 uppercase)
  - Brand Story Copy: `“VIBES STUDIO is a creative space focused on dance, fitness, choreography, performance and learning. The studio brings together movement, creativity and a positive learning environment for children, teenagers and adults.”`
- **Founder Profile:**
  - Name: `“S. Prakash Rao Surisetti”`
  - Role: `“Founder — VIBES STUDIO”`
  - Biography: Short editable bio representing holistic fitness, movement, and wellness leadership.
  - Credentials Checklist (Strict compliance, no unsupplied additions):
    1. `Official Zumba Instructor`
    2. `Diploma in Fitness`
    3. `Weight Loss, Diet & Nutrition`
    4. `Certified Law of Attraction Coach`
    5. `Certified Pranic Healer — Levels 1, 2 & 3`
- **Design Layout:**
  - Split layout on Desktop (Left: Editorial Photo Frame, Right: Bio, Credentials & Action CTAs).
  - Vertical stack on Mobile (Photo → Name + Role → Bio → Credentials → CTAs → Philosophy Banner).
- **Studio Philosophy Closing Banner:**
  - Background: Studio Dark Green `#103A18` with Studio Orange `#D57E4D` left accent border.
  - Closing Tagline: `“Feel the way you move.”` (`Caveat` cursive typography).
- **Action CTAs:** `“BOOK A FREE DEMO”` (Studio Orange `#D57E4D`) + `“MEET US AT VIBES STUDIO”` (Outline button).

---

## 11. FAQ + CONTACT + ENQUIRY + LOCATION SPECIFICATIONS (STEP 11)

- **Section 1 — FAQ:**
  - Label: `“FREQUENTLY ASKED QUESTIONS”` (`.section-badge-pill`, Studio Green accent)
  - Heading: `“Have Questions?”`
  - Accordion Component: 10 factual questions using established studio data (Classes, Timings, Monthly Fees, Free Demo, Sangeeth Choreography, Event Performance, Zumba, Location, Enquiry methods, Event Booking).
- **Section 2 — Contact Cards:**
  - Label: `“GET IN TOUCH”`, Heading: `“Let’s Create Something Together”`.
  - 3 Prominent Cards: `CALL US` (+91 98765 43210), `WHATSAPP` (Instant Chat Support), `VISIT US` (Aganampudi, Visakhapatnam, Andhra Pradesh).
- **Section 3 — Enquiry Form:**
  - Required Fields: Full Name *, Phone Number * (10-digit validation), Interested In *.
  - Dynamic Field: `Preferred Batch / Service` updates dynamically based on selected category (`BATCH_MAP`).
  - Form UX: Validation error states, loading submit button, success alert box (`“Thank you for contacting VIBES STUDIO. We’ll get back to you soon.”`).
  - Dynamic WhatsApp Alternative: `CHAT ON WHATSAPP` button generates custom pre-filled message string based on form selections without auto-submitting.
- **Section 4 — Location & Map:**
  - Visual Header: `VIBES STUDIO — Aganampudi, Visakhapatnam, Andhra Pradesh`.
  - Google Maps Embed Frame + Primary CTA `“GET DIRECTIONS”` linking to Google Maps.
- **Section 5 — Mobile Accessibility:**
  - Sticky Mobile Contact Bar (`CALL | WHATSAPP | ENQUIRE`) fixed at bottom on small viewports (`max-width: 640px`).

---

## 12. GLOBAL FOOTER + SOCIAL MEDIA SPECIFICATIONS (STEP 12)

- **Brand Area:**
  - Exact VIBES STUDIO logo in clean white badge frame (`assets/images/vibes-studio-logo-full.jpg` 100% untouched).
  - Official Tagline: `“Feel the way you move”` (`Caveat` cursive typography, `#D57E4D` Studio Orange).
  - Brand Statement: `“Dance • Fitness • Creativity • Events”`.
  - Social Links: YouTube (`@vibesstudiovizag`), Instagram (`https://instagram.com`), WhatsApp shortcut.
- **Navigation Columns:**
  - `EXPLORE`: Home, About, Classes, Schedule & Fees, Gallery, Workshops & Events, Contact.
  - `SERVICES`: Kids Dance, Adult Dance, Zumba Fitness, Art Classes, Tuitions, Sangeeth Choreography, Pre-Wedding Choreography, Event Performances.
  - `CONNECT`: Studio Location (Aganampudi, Visakhapatnam, Andhra Pradesh), Phone Direct (+91 98765 43210), WhatsApp Support.
- **Primary Action CTA:** `“BOOK A FREE DEMO”` (`#D57E4D` Studio Orange button).
- **Footer Bottom Bar:**
  - Copyright: `© 2026 VIBES STUDIO. All rights reserved.`
  - Interactive Legal Links: `Privacy Policy` • `Terms & Conditions`.
- **Responsive Layout:**
  - Desktop: 4-column layout (`1.5fr 1fr 1fr 1.2fr`).
  - Tablet: 2-column layout.
  - Mobile: Stacked 1-column layout with accessible touch targets.

---

## 13. MASTER COMPONENT REUSABILITY CHECKLIST
- [x] Step 1 Brand Foundation (Typography, Exact Logo Rules, Design Tokens)
- [x] Step 1A Physical Studio Master Color System (8 Master Colors, Ratio Guidelines)
- [x] Step 2 Header & Navigation (Sticky Header, Scroll Blur, Desktop Nav, Mobile Drawer)
- [x] Step 3 Hero Section (Cinematic Hero, Headline, Supporting Copy, Dual CTAs, Scroll Indicator)
- [x] Step 4 Classes Section (6 Categories, Asymmetric Editorial Grid, Hover Animations, Bottom CTA)
- [x] Step 5 Studio Experience Section (Split Layout, Physical Studio Photo, 5 Established Features)
- [x] Step 6 Choreography & Event Services (8 Services, Masonry Grid, Dark Environment, Enquiry Action Bar)
- [x] Step 7 Gallery & Video Showcase (8 Category Filters, Featured Hero Video, Lightbox Modal, YouTube Showcase, Dual CTAs)
- [x] Step 8 Testimonials & Social Proof (Authentic Placeholders, Carousel Controls, Social Proof Strip, Primary CTA)
- [x] Step 9 Schedule & Fees (7 Category Tabs, Editable Data Model, Availability Status, Pre-filled WhatsApp Enquiries, Free Demo Callout)
- [x] Step 10 About & Founder (Exact Credentials, Concise Brand Story, Editorial Split Layout, Studio Philosophy Closing Banner)
- [x] Step 11 FAQ + Contact + Enquiry + Location (10 Accordion Questions, 3 Contact Cards, Dynamic Batch Enquiry Form, Google Maps Embed, Mobile Sticky Contact Bar)
- [x] Step 12 Global Footer + Social Media (4-Column Layout, Exact Logo Authority, Tagline, Explore/Services/Connect Nav, Free Demo CTA, Social Icons, Legal Links)




