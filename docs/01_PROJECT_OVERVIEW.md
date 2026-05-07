# 📋 PROJECT OVERVIEW — Ahmed Badry Portfolio

## 🎯 Project Vision

بناء بورتفوليو شخصي احترافي لـ Ahmed Badry (UI/UX Designer & Web Developer) بتصميم
dark/editorial فاخر مع أنيميشن احترافي وأداء ممتاز. الهدف الرئيسي إن الموقع يعكس
مستوى المصمم نفسه — كل تفصيلة فيه تتكلم عن الجودة.

---

## 🏗️ Tech Stack (Final Decisions)

| Layer      | Technology              | Version           | Reason                                                           |
| ---------- | ----------------------- | ----------------- | ---------------------------------------------------------------- |
| Framework  | Next.js                 | 16.x (App Router) | Turbopack stable default, React 19.2 + Compiler stable, proxy.ts |
| Language   | TypeScript              | 5.x               | Type safety, clean code                                          |
| Styling    | Tailwind CSS            | v4                | CSS-first config, fastest build                                  |
| Animation  | GSAP + Framer Motion    | Latest            | GSAP للـ scroll-triggered، Framer للـ page transitions           |
| CMS        | Sanity                  | v3 (Embedded)     | Headless, real-time, yoursite.com/studio                         |
| Deployment | Vercel                  | —                 | Edge network, zero-config Next.js                                |
| Font       | Space Grotesk + Syne    | Google Fonts      | Display + Body pairing                                           |
| Icons      | Lucide React            | Latest            | Consistent, lightweight                                          |
| Image CDN  | Sanity CDN + next/image | —                 | Optimized delivery                                               |

---

## 🎨 Design System (Extracted from Figma Designs)

### Color Tokens

```
Background Primary:   #0A0A0A  (near black — not pure black)
Background Secondary: #111111  (cards, sections)
Background Card:      #141414  (experience/education cards)
Background Elevated:  #1A1A1A  (hover states, featured cards)

Accent Primary:       #F5C400  (yellow — CTA buttons, highlights, badges)
Accent Hover:         #E0B300  (yellow darker on hover)
Accent Glow:          rgba(245,196,0,0.15) (glow effects)

Text Primary:         #FFFFFF  (headings, main content)
Text Secondary:       #9A9A9A  (subtitles, captions)
Text Muted:           #555555  (dividers, placeholders)
Text On-Accent:       #000000  (text on yellow buttons)

Border Default:       rgba(255,255,255,0.08)
Border Hover:         rgba(255,255,255,0.15)
Border Card:          rgba(255,255,255,0.06)

Overlay Dark:         rgba(0,0,0,0.6)
```

### Typography Scale

```
Font Display (Headings): "Syne" — Bold, Extra Bold
Font Body (Text):        "Space Grotesk" — Regular, Medium

Hero Name:        clamp(80px, 12vw, 160px) / weight: 900 / tracking: -0.02em
Section Heading:  clamp(36px, 5vw, 64px) / weight: 700 / tracking: -0.01em
Card Title:       clamp(20px, 2.5vw, 28px) / weight: 600
Sub-label:        13px / weight: 400 / tracking: 0.05em / uppercase
Body Text:        16px / weight: 400 / line-height: 1.7
Small Text:       14px / weight: 400 / color: text-secondary
Badge Text:       12px / weight: 500 / tracking: 0.02em
```

### Spacing System (8px base grid)

```
xs:   4px
sm:   8px
md:   16px
lg:   24px
xl:   32px
2xl:  48px
3xl:  64px
4xl:  96px
5xl:  128px
6xl:  160px

Section Padding Y:     96px → 160px (desktop)
Section Padding X:     24px → 80px (responsive)
Container Max Width:   1200px
Card Padding:          24px → 32px
Card Gap:              2px (between stacked cards — hairline)
Nav Height:            72px
```

### Border Radius

```
xs:   4px  (badges, tags)
sm:   8px  (small buttons)
md:   12px (cards inner)
lg:   16px (main cards)
xl:   24px (profile card)
full: 9999px (pill buttons, avatars)
```

### Shadows & Effects

```
Card Shadow:     0 0 0 1px rgba(255,255,255,0.06)
Glow Yellow:     0 0 40px rgba(245,196,0,0.2), 0 0 80px rgba(245,196,0,0.08)
Glow Subtle:     0 8px 32px rgba(0,0,0,0.4)
Text Glow:       text-shadow: 0 0 60px rgba(245,196,0,0.3)
Image Overlay:   gradient from transparent to rgba(0,0,0,0.8) bottom
```

### Signature Elements

```
Section Label Icon:  ✦ (four-pointed star) — yellow, small, before section title
Button Style:        Yellow pill with black text + arrow icon (↗ for external, ↓ for download)
Date Badge:          Dark pill #1E1E1E / border rgba(255,255,255,0.1) / yellow text
Card Divider:        1px solid rgba(255,255,255,0.06) — between stacked items
Background Gradient: radial gradient yellow glow top-right on dark sections
Testimonials BG:     Large outlined text "TESTIMONIALS" behind cards — opacity 0.04
Ticker Bar:          Horizontal scrolling logos strip — dark bg #0D0D0D
```

---

## 📱 Responsive Breakpoints

```
Mobile:   < 768px
Tablet:   768px — 1024px
Desktop:  > 1024px
Wide:     > 1440px
```

---

## 📄 Pages & Sections

### Single Page (SPA-like scroll) — All sections on home

1. **Navbar** — sticky, blur backdrop, logo + nav links + active state
2. **Hero** — Full name huge typography, hashtag skills, intro text, CTA + photo
3. **Testimonials Bar** — horizontal star ratings ticker (auto-scroll)
4. **Recent Projects** — Full-width featured project card with image
5. **About Me** — Two-col: bio + download resume | profile card + social + contact
6. **Experience** — Stacked cards with date badges
7. **Education** — Same card pattern as experience
8. **Brand Logos** — Auto-scrolling ticker strip
9. **Services** — Accordion-style expandable cards
10. **Featured Work** — 2x2 grid with project images
11. **Testimonials** — Large BG text + two testimonial cards
12. **FAQ** — Expandable questions
13. **CTA Section** — "Got a project? Surround yourself with an expert"
14. **Footer** — Nav links, social, copyright, live time/location

### Separate Pages

- `/projects` — All projects grid
- `/studio` — Sanity CMS embedded

---

## 🔗 Sanity Content Types (Schemas)

```
- Project { title, slug, category, date, image, description, url, featured }
- Service { title, subtitle, description, skills[], order, featured }
- Testimonial { quote, author, role, company, avatar, rating }
- Education { degree, institution, startYear, endYear }
- Experience { role, company, startDate, endDate, description }
- FAQ { question, answer, order }
- SiteConfig { name, tagline, bio, resumeUrl, email, phone, address, socials[] }
```

---

## 🚀 Performance Targets

```
Lighthouse Performance:  > 95
LCP:                     < 1.5s
CLS:                     < 0.05
TTI:                     < 2s
Bundle Size (JS):        < 150kb gzipped
Image Format:            WebP/AVIF via Sanity CDN + next/image
Font Loading:            font-display: swap, preloaded
```

---

## 📦 Expected Deliverable

موقع بورتفوليو كامل:

- ✅ نفس الـ UI بالضبط من الديزاين المرفق
- ✅ كل المحتوى يجي من Sanity CMS
- ✅ أنيميشن احترافي GSAP scroll-triggered + Framer page transitions
- ✅ Responsive على كل الأجهزة
- ✅ Lighthouse > 95 على كل المحاور
- ✅ SEO optimized (metadata, OG tags, structured data)
- ✅ Clean, maintainable, typed codebase

---

## ⚠️ Next.js 16 Key Changes (مهم جداً للمشروع)

### 1. proxy.ts بدل middleware.ts

```typescript
// ❌ DEPRECATED في Next.js 16
// middleware.ts
export function middleware(request: NextRequest) { ... }

// ✅ الصح في Next.js 16
// proxy.ts  ← اسم الملف اتغير
export function proxy(request: NextRequest) { ... }
// Node.js runtime فقط — Edge runtime مش مدعوم هنا
```

### 2. Turbopack هو الـ Default

```bash
# Next.js 16 — Turbopack شغال تلقائياً
npm run dev   # Turbopack by default
npm run build # Turbopack by default

# لو عايز webpack
npm run dev -- --webpack
npm run build -- --webpack
```

### 3. React Compiler Stable (Auto-memoization)

```typescript
// next.config.ts — enable React Compiler
const config: NextConfig = {
  reactCompiler: true, // ← promoted from experimental to stable
}

// بعد التفعيل:
// ❌ مش محتاج تكتب دي
const value = useMemo(() => compute(a, b), [a, b])
const fn = useCallback(() => doSomething(x), [x])

// ✅ الـ Compiler بيعملها تلقائياً
const value = compute(a, b)
const fn = () => doSomething(x)
```

### 4. Async Params (Breaking Change)

```typescript
// ✅ Next.js 16 — params و searchParams بقوا async
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q: string }>;
}) {
  const { slug } = await params;       // ← await إجباري
  const { q } = await searchParams;   // ← await إجباري
  ...
}
```

### 5. Cache Components (بدل PPR)

```typescript
// "use cache" directive — بديل experimental.ppr
"use cache";
export default async function CachedComponent() {
  const data = await fetch("...");
  return <div>{data}</div>;
}
```

### 6. Migration Command

```bash
npx @next/codemod@canary upgrade latest
# يعمل auto-fix لـ:
# - middleware → proxy rename
# - async params
# - deprecated APIs
```
