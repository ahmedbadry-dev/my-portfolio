# 📅 DETAILED PROJECT PLAN — Portfolio Build

## 🗺️ Overview

| Phase | Name                     | Duration | Goal                                       |
| ----- | ------------------------ | -------- | ------------------------------------------ |
| 0     | Foundation Setup         | Day 1    | Project scaffold, tooling, config          |
| 1     | Design System            | Day 1-2  | Tokens, base components, fonts             |
| 2     | Sanity CMS               | Day 2-3  | Schemas, client, queries, seed data        |
| 3     | Layout Shell             | Day 3    | Navbar, Footer, page layout                |
| 4     | Hero + Ticker            | Day 4    | Hero section + testimonials bar            |
| 5     | About + Experience       | Day 5    | About, Experience, Education sections      |
| 6     | Services + Work          | Day 6    | Services accordion + Featured Work grid    |
| 7     | Testimonials + FAQ + CTA | Day 7    | Bottom sections                            |
| 8     | Projects Page            | Day 8    | All projects listing page                  |
| 9     | Animations               | Day 9-10 | GSAP scroll-triggered + Framer transitions |
| 10    | Performance + SEO        | Day 11   | Optimization, metadata, OG images          |
| 11    | QA + Launch              | Day 12   | Testing, fixes, deploy to Vercel           |

---

---

## ⚙️ PHASE 0 — Foundation Setup

### 🎯 Goal

تجهيز بيئة المشروع بالكامل بشكل صح من أول يوم — مفيش رجوع لإعادة إعداد.

### 📋 Tasks

#### Task 0.1 — Project Initialization

```bash
npx create-next-app@latest portfolio \
  --turbo \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd portfolio
```

#### Task 0.2 — Install Dependencies

```bash
# Core
npm install sanity next-sanity @sanity/image-url @sanity/vision

# Animation
npm install gsap @gsap/react framer-motion

# UI Utilities
npm install lucide-react clsx tailwind-merge

# Dev Tools
npm install -D @types/node prettier eslint-config-prettier
```

#### Task 0.3 — Folder Structure

إنشاء كل الفولدرز المطلوبة حسب الـ architecture الموضحة في CODEX_INSTRUCTIONS.md

#### Task 0.4 — TypeScript Config

```json
// tsconfig.json additions
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

#### Task 0.5 — ESLint + Prettier Config

```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "prettier"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "no-console": "warn"
  }
}
```

#### Task 0.6 — Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token
NEXT_PUBLIC_SITE_URL=https://yoursite.com
SANITY_WEBHOOK_SECRET=your_webhook_secret
```

### ✅ Acceptance Criteria

```
□ `npm run dev` يشتغل على port 3000 بدون errors
□ TypeScript strict mode مفعّل
□ ESLint بيشتغل بدون warnings
□ Folder structure موجودة بالكامل
□ Environment variables معمولة (مش committed)
□ .gitignore صح (يشمل .env.local, .next, node_modules)
```

### 🧪 Test

```bash
npm run build  # يجب أن يكتمل بدون errors
npm run lint   # يجب أن يعطي 0 errors
```

---

## 🎨 PHASE 1 — Design System

### 🎯 Goal

بناء الـ design foundation الكاملة — بعد الـ phase دي، كل component هيتبنى على base ثابتة وصح.

### 📋 Tasks

#### Task 1.1 — globals.css (Tailwind v4 Tokens)

```css
/* app/globals.css */
@import 'tailwindcss';

@theme {
  --color-bg-primary: #0a0a0a;
  --color-bg-secondary: #111111;
  --color-bg-card: #141414;
  --color-bg-elevated: #1a1a1a;
  --color-bg-ticker: #0d0d0d;

  --color-accent: #f5c400;
  --color-accent-hover: #e0b300;
  --color-text-primary: #ffffff;
  --color-text-secondary: #9a9a9a;
  --color-text-muted: #555555;
  --color-text-on-accent: #000000;

  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-hover: rgba(255, 255, 255, 0.15);

  --font-display: 'Syne', sans-serif;
  --font-body: 'Space Grotesk', sans-serif;

  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}

/* Base styles */
* {
  box-sizing: border-box;
}
html {
  scroll-behavior: smooth;
}
body {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}
```

#### Task 1.2 — Font Setup

```typescript
// app/layout.tsx
import { Syne, Space_Grotesk } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})
```

#### Task 1.3 — Utility Functions

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return new Date(date).getFullYear().toString()
}
```

#### Task 1.4 — Base UI Components

**SectionLabel.tsx** — ✦ Icon + Label

```typescript
// الـ component اللي بيظهر قبل كل section title
// مثال: ✦ About Me / ✦ Experience / ✦ Featured Work
interface SectionLabelProps {
  label: string
  className?: string
}
```

**YellowButton.tsx** — CTA Button

```typescript
// Yellow pill button مع icon
// Variants: "download" (↓ icon) | "external" (↗ icon) | "default"
interface YellowButtonProps {
  children: React.ReactNode
  variant?: 'download' | 'external' | 'default'
  href?: string
  onClick?: () => void
  className?: string
}
```

**DateBadge.tsx** — Year Range Pill

```typescript
// Dark pill مع yellow text
// مثال: "2023 - Present" | "2022 - 2023"
interface DateBadgeProps {
  startDate: string
  endDate?: string // undefined = "Present"
}
```

#### Task 1.5 — Storybook or Visual Test Page

إنشاء `/design-system` page (development only) تعرض كل الـ tokens والـ components.

### ✅ Acceptance Criteria

```
□ Tailwind v4 tokens شغالة — `bg-bg-primary` يطبق #0A0A0A
□ Syne font تظهر في display elements
□ Space Grotesk في body text
□ cn() utility شغالة
□ SectionLabel يظهر ✦ بالـ yellow color الصح
□ YellowButton تشبه الديزاين بالضبط (pill shape, black text, icon)
□ DateBadge تشبه الديزاين (dark pill, yellow text)
□ لا hardcoded colors في أي component
```

### 🧪 Test

```
- افتح /design-system في browser
- قارن كل component بالديزاين المرجعي
- تأكد من الـ colors في DevTools
- اختبر dark/light switching لو موجود
```

---

## 📡 PHASE 2 — Sanity CMS Setup

### 🎯 Goal

إعداد Sanity CMS بالكامل — schemas، client، queries، وseed data — حتى كل section تجيب بياناتها الحقيقية.

### 📋 Tasks

#### Task 2.1 — Sanity Project Init

```bash
npm create sanity@latest -- --project YOUR_PROJECT_ID --dataset production
```

#### Task 2.2 — Sanity Config

```typescript
// sanity/sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
```

#### Task 2.3 — Schemas (7 content types)

**siteConfig** — Global settings

```typescript
// name, tagline, bio, resumeUrl, email, phone, website,
// address, avatar, socials (facebook, instagram, linkedin, twitter)
```

**experience**

```typescript
// role (string), company (string), startDate (date),
// endDate (date | null = "Present"), description (text), order (number)
```

**education**

```typescript
// degree, institution, startYear, endYear, order
```

**project**

```typescript
// title, slug, category (string), date, image (image + hotspot),
// description (text), url (url), featured (boolean), order
```

**service**

```typescript
// title, subtitle, description (text), skills (array of strings),
// image (optional), order, featured (boolean)
```

**testimonial**

```typescript
// quote (text), author, role, company, avatar (image), rating (1-5)
```

**faq**

```typescript
// question, answer (text), order
```

#### Task 2.4 — Sanity Client

```typescript
// sanity/lib/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

// With revalidation support
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { tags, revalidate: 3600 },
  })
}
```

#### Task 2.5 — GROQ Queries (Centralized)

```typescript
// sanity/lib/queries.ts
import { groq } from 'next-sanity'

export const SITE_CONFIG_QUERY = groq`*[_type == "siteConfig"][0]{...}`

export const EXPERIENCES_QUERY = groq`
  *[_type == "experience"] | order(order asc) {
    _id, role, company, startDate, endDate, description
  }
`

export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(order asc) {
    _id, title, slug, category, date,
    "imageUrl": image.asset->url,
    description, url, featured
  }
`

export const FEATURED_PROJECT_QUERY = groq`
  *[_type == "project" && featured == true][0] {
    _id, title, category, date,
    "imageUrl": image.asset->url,
    url
  }
`

// ... باقي الـ queries
```

#### Task 2.6 — Image URL Helper

```typescript
// sanity/lib/image.ts
import imageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: Image) {
  return builder.image(source)
}
```

#### Task 2.7 — TypeScript Types from Sanity

```typescript
// types/sanity.ts
export interface SiteConfig {
  name: string
  tagline: string
  bio: string
  resumeUrl: string
  email: string
  phone: string
  address: string
  socials: { platform: string; url: string }[]
}

export interface Experience {
  _id: string
  role: string
  company: string
  startDate: string
  endDate: string | null
  description: string
}

// ... باقي الـ types
```

#### Task 2.8 — Seed Data

إدخال dummy data في Sanity Studio يعكس الديزاين بالضبط:

- 3 experiences (UI/UX Designer, Product Designer, Senior UX Designer)
- 4 education entries
- 4 featured work items
- 5 services
- 3 testimonials
- 5 FAQs
- Site config كاملة

#### Task 2.9 — Webhook Revalidation

```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }
  const body = await req.json()
  revalidateTag(body._type)
  return NextResponse.json({ revalidated: true })
}
```

#### Task 2.10 — Studio Route

```typescript
// app/studio/[[...tool]]/page.tsx
"use client";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";

export default function Studio() {
  return <NextStudio config={config} />;
}
```

### ✅ Acceptance Criteria

```
□ Sanity Studio يفتح على /studio بدون errors
□ كل الـ 7 schemas ظاهرة في Studio sidebar
□ Seed data مدخل وظاهر في Studio
□ `client.fetch()` يرجع data صح من queries
□ urlFor() يولد صح image URLs
□ Webhook revalidation يشتغل (test بـ curl)
□ TypeScript types دقيقة ومطابقة للـ schemas
```

---

## 🏠 PHASE 3 — Layout Shell (Navbar + Footer)

### 🎯 Goal

بناء الـ shell اللي هيحيط بكل الصفحات — navbar وfooter مكتملين ومطابقين للديزاين.

### 📋 Tasks

#### Task 3.1 — Root Layout

```typescript
// app/layout.tsx
// - Font variables injection
// - Metadata (title template, description, OG)
// - Body: bg-bg-primary, font-body, antialiased
// - AnimationProvider wrapper
```

#### Task 3.2 — Navbar Component

**المطلوب من الديزاين:**

- Logo: صورة صغيرة دائرية + "PortFoliyo" بـ Syne
- Links: Home | About | Services | Projects | Contact
- Active link: yellow color (#F5C400)
- Sticky + backdrop-blur-md على scroll
- Transition: transparent → dark + blur بعد 50px scroll
- Mobile: hamburger icon + slide-in drawer مع AnimatePresence

```typescript
// components/layout/Navbar.tsx
'use client'
// - useScrollTrigger hook للـ sticky behavior
// - usePathname لـ active state
// - Framer Motion للـ mobile drawer
```

#### Task 3.3 — Footer Component

**المطلوب من الديزاين:**

- Row 1: Logo + Nav links + Social icons (Facebook, LinkedIn, X)
- Row 2: Copyright | Live time (real-time clock) | Location + weather
- Dark separator أعلاه
- useLiveTime hook يحدث الـ clock كل ثانية

```typescript
// hooks/useLiveTime.ts
export function useLiveTime(): string {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString(...));
    const interval = setInterval(update, 1000);
    update();
    return () => clearInterval(interval);
  }, []);
  return time;
}
```

#### Task 3.4 — AnimationProvider

```typescript
// components/providers/AnimationProvider.tsx
'use client'
// - GSAP plugins registration (ScrollTrigger, SplitText)
// - Smooth scroll setup (ScrollSmoother if using)
// - Framer Motion LazyMotion setup
```

### ✅ Acceptance Criteria

```
□ Navbar يطابق الديزاين pixel-perfect
□ Blur effect يظهر بعد scroll
□ Active link يكون yellow
□ Mobile drawer يفتح/يقفل بـ smooth animation
□ Footer live clock يتحدث كل ثانية
□ Footer social links تشتغل
□ لا layout shift عند scroll
```

---

## 🦸 PHASE 4 — Hero Section + Testimonials Bar

### 🎯 Goal

أهم section في الموقع — يجب أن تكون مذهلة ومطابقة للديزاين بالضبط.

### 📋 Tasks

#### Task 4.1 — Hero Section

**المطلوب من الديزاين:**

```
Layout: Full viewport height, 2-column flex (content left | photo right)

المحتوى:
- Navbar (sticky — من Phase 3)
- "Ahmed Badry" — Syne, clamp(80px,12vw,160px), weight:900
- Hashtags row: #BRANDING  #UI/UX DESIGN  #DEVELOPMENT  #WEB DESIGN
  → Space Grotesk, text-secondary, spaced
- Bio paragraph — 16px, text-secondary, max-w-lg
- CTA: "Start a Project Now ↗" — YellowButton component

الصورة:
- Positioned أسفل يسار المحتوى
- خلفية: dot-matrix pattern (CSS radial-gradient) أو subtle grid
- لا frame، لا border

الخلفية:
- Radial gradient: yellow glow فاتح جداً أعلى يمين
- #0A0A0A base
```

**GSAP Animation (على load):**

```
1. "Ahmed" و"Badry" — fade in من أسفل، stagger 0.1s
2. Hashtags — fade in stagger 0.05s
3. Bio text — fade in
4. CTA button — fade in مع subtle scale
5. الصورة — fade in من يمين
```

#### Task 4.2 — Testimonials Bar (Ticker)

**المطلوب من الديزاين:**

```
Background: #0D0D0D أغمق قليلاً من الـ background
Content: ⭐⭐⭐⭐⭐ + نص قصير من testimonial، repeated
Animation: CSS marquee (infinite left scroll)
Pause on hover
Separator بين كل item: • أو | بـ text-muted
```

```css
/* CSS-only infinite marquee — no JS needed */
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
.marquee-track {
  animation: marquee 30s linear infinite;
}
.marquee-track:hover {
  animation-play-state: paused;
}
```

### ✅ Acceptance Criteria

```
□ Hero يطابق الديزاين: typography، spacing، layout
□ "Ahmed Badry" يكون الخط الصح والـ weight الصح
□ Hashtags على نفس السطر مع spacing مناسب
□ Yellow CTA button بالشكل الصح
□ صورة في المكان الصح
□ GSAP animations تشتغل على page load
□ Ticker يتحرك بشكل smooth ومستمر
□ Ticker يوقف على hover
□ Responsive: mobile يحول لـ single column
```

---

## 👤 PHASE 5 — About + Experience + Education

### 🎯 Goal

بناء صفحة About كاملة مع Experience وEducation sections — بيانات من Sanity.

### 📋 Tasks

#### Task 5.1 — About Section

**المطلوب من الديزاين:**

```
Layout: 2 columns
Left col:
  - ✦ About Me (SectionLabel)
  - Heading: "Passionate & Lead Product Designer" (Syne, 40px+)
  - Bio paragraph
  - YellowButton "Download Resume ↓" → href من Sanity siteConfig.resumeUrl

  - ✦ Experience (SectionLabel)
  - ExperienceCards (stacked list — من Sanity)

Right col:
  - Profile card: صورة + name + title
  - Social icons: Facebook, Instagram, LinkedIn, X
  - ✦ Contact section:
    - Phone | Email | Website | Address
    - Grid layout: label (text-muted) | value (text-primary bold)
```

#### Task 5.2 — ExperienceCard Component

```typescript
interface ExperienceCardProps {
  role: string
  company: string
  startDate: string
  endDate: string | null
  description: string
}
// - DateBadge على اليمين
// - Role بـ Syne font
// - Company بـ text-secondary
// - Description بـ text-muted، 14px
// - Border-bottom لـ separation (مش border-box)
// - GSAP: fade-up on scroll
```

#### Task 5.3 — Education Section

```
نفس pattern الـ ExperienceCard بالضبط لكن بدون description
Data من Sanity education schema
GSAP: stagger animation على scroll
```

#### Task 5.4 — Brands Ticker

```
نفس الـ TestimonialsBar technique لكن للوجوز:
- Spotify, Gumroad, Asana, Framer, Medium, Linear, وغيرها
- Grayscale logos (filter: grayscale(1))
- Hover: grayscale(0) مع transition
- Data من Sanity siteConfig.brands[]
```

### ✅ Acceptance Criteria

```
□ About section يطابق الديزاين: two-column layout
□ Profile card بالشكل الصح (صورة + name + social)
□ Contact info formatted صح
□ Experience cards تجي من Sanity
□ Date badges صح (Present لو endDate null)
□ Education section مماثل للـ experience
□ Brands ticker يشتغل smooth
□ Download Resume button يفتح PDF في tab جديد
□ All data from Sanity (no hardcoded content)
```

---

## 🛠️ PHASE 6 — Services + Featured Work

### 🎯 Goal

Services accordion مع Featured Work grid — من أهم الـ sections للـ conversion.

### 📋 Tasks

#### Task 6.1 — Services Section

**المطلوب من الديزاين:**

```
Header:
  - ✦ My Services + YellowButton "Start a Project Now ↗" (left col)
  - Heading: "Experience the Impact of User-Centered Design" (right col)

Services List (accordion):
  - كل service = card قابل للـ expand
  - Collapsed state: subtitle (small, text-muted) + title (Syne, large) + → icon
  - Expanded state: subtitle + title + description + skills[] + صورة + ↗ icon
  - Active card: bg-bg-elevated, border highlighted
  - Framer Motion: AnimatePresence للـ expand/collapse
  - فقط service واحدة expanded في وقت واحد (accordion behavior)
```

#### Task 6.2 — Featured Work Section

**المطلوب من الديزاين:**

```
Header:
  - ✦ Featured Work (left) + YellowButton "Explore all Projects ↗" (left)
  - Heading: "Showcasing My Work for Your Inspiration" (right)

Grid: 2x2
  - كل project: صورة grayscale + hover: overlay مع "View Project ↗" button
  - Title تحت الصورة (Syne)
  - Description (text-secondary, small)
  - Active/hovered project: title باللون الـ yellow
  - Images: next/image مع object-cover
  - Data من Sanity (featured projects فقط)

GSAP ScrollTrigger:
  - Cards تظهر بـ stagger من أسفل عند scroll
```

### ✅ Acceptance Criteria

```
□ Services accordion يفتح/يقفل بـ smooth animation
□ فقط service واحدة open في وقت واحد
□ Active service card تظهر الصورة والـ skills
□ Featured Work: 2x2 grid responsive
□ Hover overlay يظهر "View Project ↗"
□ Images محسّنة بـ next/image
□ Grayscale images بـ CSS filter
□ All data from Sanity
□ Scroll animations تشتغل
```

---

## 💬 PHASE 7 — Testimonials + FAQ + CTA

### 🎯 Goal

إكمال باقي الـ sections حتى الـ footer.

### 📋 Tasks

#### Task 7.1 — Testimonials Section

**المطلوب من الديزاين:**

```
Background text: "TESTIMONIALS" ضخم جداً، opacity-4، centered behind cards
Trust bar: 3 overlapping avatars + "Trusted 18,000+ Satisfied Clients"
Cards: 2 testimonials جنب بعض
  - Quote بـ italic
  - Description paragraph
  - Avatar + Name + Role/Company
  - 99 icon (quote mark) أسفل يمين

GSAP: cards يجوا من الجانبين (left/right) on scroll
```

#### Task 7.2 — FAQ Section

**المطلوب من الديزاين:**

```
✦ Support + heading
Questions: accordion (single open)
  - Question text + + / - icon
  - Answer يظهر بـ Framer AnimatePresence height animation
  - Border-bottom separator
  - Data من Sanity
```

#### Task 7.3 — CTA Section

**المطلوب من الديزاين:**

```
Background: Dark مع subtle yellow glow (radial gradient)
✦ Got a project?
Big heading: "Surround yourself with an expert"
CTA button: "Start a Project Now ↗"
Heading: Syne, clamp(48px, 7vw, 96px)

GSAP: heading letters animate on scroll
```

### ✅ Acceptance Criteria

```
□ Testimonials background text ظاهر بشكل صح
□ Testimonial cards مطابقة للديزاين
□ FAQ accordion يشتغل مع smooth height animation
□ CTA section يطابق الديزاين
□ Big heading responsive
□ كل البيانات من Sanity
```

---

## 📂 PHASE 8 — Projects Page

### 🎯 Goal

صفحة `/projects` تعرض كل المشاريع مع filtering.

### 📋 Tasks

#### Task 8.1 — Projects Grid

```
- Heading "All Projects"
- Filter tabs: All | UI/UX | Branding | Web Dev | Mobile
- Grid: 2-3 columns (responsive)
- كل card: صورة + title + category badge + date
- Hover: overlay مع "View Project ↗"
- Data: كل الـ projects من Sanity
```

#### Task 8.2 — Client-side Filtering

```typescript
// filter by category — client component
// URL params للـ deep linking: /projects?category=branding
```

### ✅ Acceptance Criteria

```
□ كل المشاريع ظاهرة من Sanity
□ Filter يشتغل بدون page reload
□ URL params يتحدثوا عند filtering
□ Responsive grid
□ Loading state موجود
```

---

## 🎬 PHASE 9 — Advanced Animations

### 🎯 Goal

إضافة الـ GSAP scroll animations الكاملة وتحسين كل الـ micro-interactions.

### 📋 Tasks

#### Task 9.1 — Hero Text Animation (SplitText)

```javascript
// GSAP SplitText لتحريك كل حرف في "Ahmed Badry"
gsap.from(chars, {
  y: 100,
  opacity: 0,
  stagger: 0.03,
  duration: 0.8,
  ease: 'power4.out',
})
```

#### Task 9.2 — Section Reveal Animations

```javascript
// كل section تنزل من أسفل عند دخولها الـ viewport
// ScrollTrigger على كل section
// stagger للـ cards والـ list items
```

#### Task 9.3 — Page Transitions (Framer)

```typescript
// layout.tsx: AnimatePresence wrapping children
// page.tsx: motion.div مع variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}
```

#### Task 9.4 — Hover Micro-interactions

```
- YellowButton: scale(1.02) + glow effect on hover
- Service cards: subtle border glow
- Project cards: image scale(1.05) inside overflow:hidden
- Nav links: underline slide-in animation
- Social icons: bounce on hover
```

#### Task 9.5 — Parallax Effects

```javascript
// Hero section: صورة تتحرك بـ parallax عند scroll
// CTA section: background gradient يتحرك
```

### ✅ Acceptance Criteria

```
□ Hero text animation تشتغل بدون layout shift
□ كل section لها scroll-triggered reveal
□ Page transitions smooth (لا flash)
□ Hover states responsive وsatisfying
□ Performance: لا frame drops (60fps في DevTools)
□ Animations يوقفوا لو prefers-reduced-motion
```

---

## ⚡ PHASE 10 — Performance + SEO

### 🎯 Goal

Lighthouse > 95 على كل المحاور.

### 📋 Tasks

#### Task 10.1 — Metadata Setup

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: '%s | Ahmed Badry',
    default: 'Ahmed Badry — UI/UX Designer',
  },
  description: '...',
  openGraph: { images: [{ url: '/og-image.png' }] },
  twitter: { card: 'summary_large_image' },
}
```

#### Task 10.2 — Structured Data (JSON-LD)

```typescript
// Person schema للـ SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ahmed Badry',
  jobTitle: 'UI/UX Designer',
  // ...
}
```

#### Task 10.3 — Image Optimization

```
- كل الصور: next/image مع width/height
- Priority: true لصور الـ hero (LCP optimization)
- Sanity images: مع width query params
- format: WebP/AVIF عبر Sanity CDN
```

#### Task 10.4 — Bundle Optimization

```typescript
// next.config.ts
const config = {
  images: { domains: ['cdn.sanity.io'] },
  experimental: { optimizeCss: true },
}
```

#### Task 10.5 — sitemap.xml + robots.txt

```typescript
// app/sitemap.ts — dynamic sitemap including project pages
// app/robots.ts — allow all, disallow /studio
```

### ✅ Acceptance Criteria

```
□ Lighthouse Performance > 95
□ Lighthouse Accessibility > 95
□ Lighthouse SEO > 95
□ LCP < 1.5s
□ CLS < 0.05
□ OG image تظهر عند share
□ Sitemap صح على /sitemap.xml
□ No broken links
```

---

## 🧪 PHASE 11 — QA + Launch

### 🎯 Goal

اختبار شامل على كل الأجهزة والـ browsers قبل الـ launch.

### 📋 Tasks

#### Task 11.1 — Cross-browser Testing

```
□ Chrome (latest)
□ Firefox (latest)
□ Safari (latest)
□ Edge (latest)
□ Mobile Chrome (Android)
□ Mobile Safari (iOS)
```

#### Task 11.2 — Responsive Testing

```
□ iPhone SE (375px)
□ iPhone 14 (390px)
□ iPad (768px)
□ iPad Pro (1024px)
□ Desktop (1280px)
□ Wide (1440px+)
```

#### Task 11.3 — Functionality Checklist

```
□ All Sanity data displays correctly
□ Resume download works
□ All external links open in new tab
□ Contact info is clickable (tel:, mailto:)
□ Studio accessible at /studio
□ Webhook revalidation works
□ All animations play correctly
□ No console errors in production
```

#### Task 11.4 — Vercel Deployment

```bash
# Environment variables في Vercel dashboard
# Domain configuration
# Analytics setup (optional)
vercel deploy --prod
```

#### Task 11.5 — Sanity Webhook

```
URL: https://yoursite.com/api/revalidate?secret=YOUR_SECRET
Trigger: on document publish
```

### ✅ Final Acceptance Criteria

```
□ Lighthouse > 95 على production URL
□ لا visual regressions
□ لا console errors
□ Studio يشتغل على /studio
□ Webhook يعمل (test بتغيير content في Studio)
□ Responsive على كل الأجهزة
□ Animations سلسة على mobile
```

---

## 📊 Summary Timeline

```
Day 1:   Phase 0 + Phase 1 (Setup + Design System)
Day 2-3: Phase 2 (Sanity CMS)
Day 3:   Phase 3 (Layout Shell)
Day 4:   Phase 4 (Hero + Ticker)
Day 5:   Phase 5 (About + Experience + Education)
Day 6:   Phase 6 (Services + Featured Work)
Day 7:   Phase 7 (Testimonials + FAQ + CTA)
Day 8:   Phase 8 (Projects Page)
Day 9-10: Phase 9 (Animations)
Day 11:  Phase 10 (Performance + SEO)
Day 12:  Phase 11 (QA + Launch)
```

---

## ⚠️ Next.js 16 Migration Notes (للـ Phase 0)

### Installation Command الصح

```bash
npx create-next-app@latest portfolio \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --import-alias="@/*"

# بعد الإنشاء
cd portfolio
npm install next@latest  # يجب أن يكون 16.x
```

### next.config.ts لـ Next.js 16

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // React Compiler — auto memoization
  reactCompiler: true,

  // Images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },

  // Turbopack هو الـ default — مش محتاج تضيف حاجة
  // لو محتاج SVG support:
  experimental: {
    turbopack: {
      rules: {
        '*.svg': { loaders: ['@svgr/webpack'], as: '*.js' },
      },
    },
  },
}

export default nextConfig
```

### إنشاء proxy.ts (بدل middleware.ts)

```typescript
// proxy.ts (في root — مش في app/)
import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  // حماية /studio route — اختياري
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

### package.json scripts

```json
{
  "scripts": {
    "dev": "next dev", // Turbopack تلقائياً
    "build": "next build", // Turbopack تلقائياً
    "start": "next start",
    "lint": "next lint",
    "upgrade": "npx @next/codemod@canary upgrade latest"
  }
}
```
