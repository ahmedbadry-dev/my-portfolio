# 🤖 CODEX AGENT INSTRUCTIONS — Portfolio Project

## Who You Are

أنت Senior Fullstack Developer متخصص في Next.js، TypeScript، Tailwind CSS v4، GSAP، وSanity CMS.
مهمتك بناء بورتفوليو شخصي احترافي بناءً على التصميم المرفق والخطة الموضحة.

---

## ⚡ How You Work

### Core Principles

1. **اقرأ الخطة أولاً** — قبل ما تكتب أي سطر كود، اقرأ `PLAN.md` وافهم الـ Phase الحالية
2. **Token-first** — استخدم CSS variables وTailwind tokens دايماً، مش hardcoded values
3. **Component-first** — كل UI element = component منفصل قابل للـ reuse
4. **Type everything** — مفيش `any` في TypeScript، كل حاجة ليها type صريح
5. **Data from Sanity** — مفيش hardcoded content، كل حاجة من CMS
6. **Test visually** — بعد كل component، تأكد إنه بيشبه الديزاين بدقة

### Before Writing Any Code

```
□ قرأت الـ Phase الحالية في PLAN.md
□ فاهم الـ acceptance criteria للـ phase دي
□ عارف الـ component اللي هعمله وليه
□ شايف الـ design reference المقابل
□ عارف الـ Sanity schema المرتبط (لو موجود)
```

### Code Quality Checklist (قبل ما تخلص أي task)

```
□ TypeScript strict — مفيش any أو ts-ignore
□ Tailwind v4 CSS variables — مش hardcoded colors/spacing
□ Component صغير ومركّز (Single Responsibility)
□ Loading states معمولة
□ Error boundaries موجودة
□ Responsive على mobile/tablet/desktop
□ Accessibility: aria-labels، keyboard nav، semantic HTML
□ Animation performance: will-change، GPU-accelerated properties فقط
□ No console.log في production code
□ Imports مرتبة: external → internal → types → styles
```

---

## 🏗️ Project Architecture

```
portfolio/
├── app/                          # Next.js App Router
│   ├── (site)/                   # Public pages group
│   │   ├── page.tsx              # Home (all sections)
│   │   ├── projects/
│   │   │   └── page.tsx          # All projects
│   │   └── layout.tsx            # Site layout (navbar + footer)
│   ├── studio/                   # Sanity Studio embedded
│   │   └── [[...tool]]/
│   │       └── page.tsx
│   ├── api/
│   │   └── revalidate/
│   │       └── route.ts          # Sanity webhook revalidation
│   ├── globals.css               # Tailwind v4 + CSS variables
│   ├── layout.tsx                # Root layout (fonts, providers)
│   └── not-found.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/                 # Page sections (one per design section)
│   │   ├── HeroSection.tsx
│   │   ├── TestimonialsBar.tsx
│   │   ├── RecentProjectsSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── BrandsTickerSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── FeaturedWorkSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── FaqSection.tsx
│   │   └── CtaSection.tsx
│   ├── ui/                       # Reusable UI primitives
│   │   ├── SectionLabel.tsx      # ✦ label component
│   │   ├── YellowButton.tsx      # CTA button
│   │   ├── DateBadge.tsx         # Dark pill with year range
│   │   ├── ProjectCard.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   ├── ExperienceCard.tsx
│   │   ├── FaqItem.tsx
│   │   └── InfiniteScroll.tsx    # Ticker/marquee component
│   └── providers/
│       └── AnimationProvider.tsx  # GSAP context + ScrollSmoother
│
├── sanity/
│   ├── lib/
│   │   ├── client.ts             # Sanity client config
│   │   ├── queries.ts            # All GROQ queries
│   │   └── image.ts              # urlFor helper
│   ├── schemas/
│   │   ├── index.ts              # Schema registry
│   │   ├── project.ts
│   │   ├── service.ts
│   │   ├── testimonial.ts
│   │   ├── experience.ts
│   │   ├── education.ts
│   │   ├── faq.ts
│   │   └── siteConfig.ts
│   └── sanity.config.ts
│
├── hooks/
│   ├── useGSAP.ts                # GSAP + ScrollTrigger hook
│   ├── useLiveTime.ts            # Footer live clock
│   └── useScrollProgress.ts
│
├── types/
│   ├── sanity.ts                 # Generated/manual Sanity types
│   └── index.ts
│
├── lib/
│   ├── constants.ts              # Site config constants
│   └── utils.ts                  # cn(), formatDate(), etc.
│
├── public/
│   └── fonts/                    # Local fonts if needed
│
├── next.config.ts
├── tailwind.config.ts            # (minimal in v4)
├── tsconfig.json
├── sanity.cli.ts
└── package.json
```

---

## 🎨 Design Tokens (MUST USE — Never Deviate)

### globals.css Setup (Tailwind v4 CSS-first)

```css
@import 'tailwindcss';

@theme {
  /* Colors */
  --color-bg-primary: #0a0a0a;
  --color-bg-secondary: #111111;
  --color-bg-card: #141414;
  --color-bg-elevated: #1a1a1a;
  --color-bg-ticker: #0d0d0d;

  --color-accent: #f5c400;
  --color-accent-hover: #e0b300;
  --color-accent-glow: rgba(245, 196, 0, 0.15);

  --color-text-primary: #ffffff;
  --color-text-secondary: #9a9a9a;
  --color-text-muted: #555555;
  --color-text-on-accent: #000000;

  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-hover: rgba(255, 255, 255, 0.15);

  /* Typography */
  --font-display: 'Syne', sans-serif;
  --font-body: 'Space Grotesk', sans-serif;

  /* Spacing (8px grid) */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
  --spacing-4xl: 96px;
  --spacing-5xl: 128px;

  /* Border Radius */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 600ms ease;
  --transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 🎬 Animation Guidelines

### GSAP Usage Pattern

```typescript
// ✅ CORRECT — always use useGSAP hook, not useEffect
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function MySection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".fade-up", {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: containerRef });

  return <section ref={containerRef}>...</section>;
}
```

### Framer Motion Usage Pattern

```typescript
// ✅ للـ page transitions والـ micro-interactions
import { motion, AnimatePresence } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
```

### Animation Hierarchy

1. **GSAP ScrollTrigger** → section reveals, parallax, timeline animations
2. **Framer Motion** → page transitions, hover states, accordion/FAQ open/close
3. **CSS Transitions** → simple hover colors, opacity changes
4. **CSS @keyframes** → infinite loops (ticker, pulsing)

### Performance Rules

```
✅ Animate: transform, opacity, filter (GPU)
❌ Never animate: width, height, top, left, margin, padding (layout thrashing)
✅ Use will-change: transform on animated elements (sparingly)
✅ Use requestAnimationFrame via GSAP — never setTimeout for animations
✅ Kill ScrollTrigger instances on component unmount
```

---

## 📡 Sanity Data Fetching Pattern

```typescript
// ✅ Server Component — fetch at build time / ISR
import { sanityFetch } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";

export default async function FeaturedWork() {
  const projects = await sanityFetch<Project[]>({ query: PROJECTS_QUERY });
  return <FeaturedWorkClient projects={projects} />;
}
```

```typescript
// queries.ts — all queries centralized
export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(date desc) {
    _id, title, slug, category, date,
    "image": image.asset->url,
    description, url, featured
  }
`
```

---

## 🎯 Section-by-Section Implementation Notes

### Hero Section

- اسم "Ahmed Badry" بخط ضخم جداً — clamp(80px, 12vw, 160px)
- Hashtag skills أسفل الاسم — space-grotesk، text-secondary
- صورة على اليسار مع dot-matrix background effect
- CTA button — yellow pill مع ↗ icon
- GSAP: stagger reveal للحروف (SplitText) أو كلمة كلمة

### Navbar

- Sticky مع backdrop-blur
- Logo: avatar صغير + "PortFoliyo" بخط display
- Active link: yellow color
- Mobile: hamburger menu مع slide-in drawer

### Testimonials Bar (Ticker)

- ⭐⭐⭐⭐⭐ + نص قصير
- CSS marquee infinite scroll — لا JavaScript
- Pause on hover

### Services Section

- Cards قابلة للـ expand (accordion)
- الـ active card بتظهر فيها التفاصيل + صورة (زي الـ Branding card في الديزاين)
- Arrow icon يتحول لـ ↗ عند الـ expand

### Footer

- Live clock يتحدث كل ثانية (useLiveTime hook)
- Live weather/location text من Sanity config

---

## 🚨 Common Mistakes to Avoid

```
❌ استخدام useEffect لـ GSAP — استخدم useGSAP دايماً
❌ Hardcoded colors — استخدم CSS variables دايماً
❌ any في TypeScript — عرّف كل type
❌ محتوى hardcoded — كل حاجة من Sanity
❌ تحريك width/height — استخدم transform scale
❌ نسيان cleanup لـ ScrollTrigger
❌ Missing loading states للـ Sanity data
❌ Non-semantic HTML (div soup)
❌ Missing alt text للصور
❌ console.log في production
```

---

## 📝 Git Commit Convention

```
feat: add hero section with GSAP text animation
fix: resolve navbar scroll behavior on mobile
style: update accent color token to match design
refactor: extract DateBadge into reusable component
perf: optimize project images with next/image priority
chore: add Sanity webhook revalidation endpoint
```

---

## ⚡ Next.js 16 Specific Rules

### proxy.ts (بدل middleware.ts)

```typescript
// ✅ proxy.ts — اسم الملف والـ function اتغيروا
import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  // Node.js runtime فقط — مش Edge
  const { pathname } = request.nextUrl

  // مثال: redirect /studio لو مش logged in
  if (pathname.startsWith('/studio')) {
    // auth check هنا
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/studio/:path*'],
}
```

### React Compiler — لا تكتب useMemo/useCallback

```typescript
// ✅ مع React Compiler enabled — اكتب كود عادي
function ExpensiveComponent({ projects, filter }: Props) {
  // الـ Compiler يعمل memoization تلقائياً
  const filtered = projects.filter(p => p.category === filter);
  const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date));

  return <ul>{sorted.map(p => <ProjectCard key={p._id} {...p} />)}</ul>;
}

// ❌ مش محتاج دلوقتي (الـ Compiler بيعملها)
const filtered = useMemo(
  () => projects.filter(p => p.category === filter),
  [projects, filter]
);
```

### Turbopack Config (بدل Webpack)

```typescript
// next.config.ts — Turbopack native config (لو محتاج custom)
const config: NextConfig = {
  reactCompiler: true,

  // لو محتاج custom turbopack rules (بديل webpack.config)
  experimental: {
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
}
```

### Async Params — إجباري في كل page

```typescript
// ✅ كل page component لازم تكون async وتعمل await params
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await sanityFetch({ query: PROJECT_QUERY, params: { slug } });
  return <ProjectClient project={project} />;
}
```

### "use cache" Directive

```typescript
// ✅ للـ components اللي بتجيب data ثابتة من Sanity
"use cache";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

export async function FeaturedWork() {
  cacheLife("hours"); // cache لـ hours
  const projects = await sanityFetch({ query: FEATURED_PROJECTS_QUERY });
  return <FeaturedWorkGrid projects={projects} />;
}
```
