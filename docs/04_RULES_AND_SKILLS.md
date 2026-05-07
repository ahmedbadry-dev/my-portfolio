# 📏 RULES & BEST PRACTICES

## The Non-Negotiable Rules

هذه القواعد لا يمكن تجاوزها تحت أي ظرف.

---

## 1. TypeScript Rules

### ❌ NEVER

```typescript
// أي من هذه = كود مرفوض
const data: any = fetchData()
// @ts-ignore
const x = y.z
// @ts-expect-error
const bad = something
function noReturn(x: any) {}
```

### ✅ ALWAYS

```typescript
// Types واضحة ومحددة
interface Project {
  _id: string;
  title: string;
  category: "ui-ux" | "branding" | "web" | "mobile";
  date: string;
  imageUrl: string;
  description: string;
  url: string;
  featured: boolean;
}

// Generic types مع constraints
async function sanityFetch<T extends Record<string, unknown>>(
  query: string
): Promise<T[]> { ... }

// Type guards
function isProject(data: unknown): data is Project {
  return typeof data === "object" && data !== null && "title" in data;
}

// Readonly للـ props اللي مش هتتغير
interface HeroProps {
  readonly name: string;
  readonly skills: readonly string[];
}
```

---

## 2. React / Next.js Rules

### Component Rules

```typescript
// ✅ Server Components افتراضياً — بس أضف "use client" لو محتاج
// Server component (no directive needed)
export default async function HeroSection() {
  const config = await sanityFetch<SiteConfig>({ query: SITE_CONFIG_QUERY });
  return <HeroClient config={config} />;
}

// Client component (interactivity / hooks / browser APIs)
"use client";
export function HeroClient({ config }: { config: SiteConfig }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => { ... }, { scope: ref });
  return <section ref={ref}>...</section>;
}
```

### Props Rules

```typescript
// ✅ Destructure في الـ signature
function ProjectCard({ title, category, imageUrl, description }: ProjectCardProps) { ... }

// ✅ Default props بـ destructuring
function Button({ variant = "primary", size = "md", children }: ButtonProps) { ... }

// ❌ NEVER props drilling أكثر من مستويين — استخدم context أو composition
```

### Hooks Rules

```typescript
// ✅ Custom hooks في /hooks folder مع use prefix
export function useLiveTime(): string { ... }
export function useScrollProgress(): number { ... }
export function useActiveSection(): string { ... }

// ✅ Cleanup دايماً في useEffect
useEffect(() => {
  const interval = setInterval(fn, 1000);
  return () => clearInterval(interval); // ← مهم جداً
}, []);

// ✅ Dependencies array صح دايماً
// ❌ NEVER empty deps مع استخدام variables
```

---

## 3. GSAP Rules

### Setup Pattern (Required)

```typescript
// ✅ ALWAYS use @gsap/react package — not raw useEffect
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText' // GSAP Club required

// Register once at app level (AnimationProvider)
gsap.registerPlugin(ScrollTrigger, SplitText)
```

### Animation Patterns

```typescript
// ✅ Correct — scoped to component ref
const containerRef = useRef<HTMLElement>(null);
useGSAP(() => {
  const ctx = gsap.context(() => {
    gsap.from(".fade-target", {
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
  }, containerRef);
  return () => ctx.revert(); // cleanup
}, { scope: containerRef });

// ❌ WRONG — مش scoped، ممكن يأثر على elements برة الـ component
useEffect(() => {
  gsap.from(".fade-target", { ... }); // خطأ!
}, []);
```

### Performance Rules

```typescript
// ✅ Animate GPU-friendly properties ONLY
gsap.to(el, { x: 100, y: 50, scale: 1.1, opacity: 0 }); // ✅
gsap.to(el, { width: "200px", marginTop: "20px" }); // ❌ layout thrashing

// ✅ will-change بحذر (فقط على animated elements)
// CSS: will-change: transform; — مش على كل حاجة

// ✅ Kill ScrollTriggers on unmount
return () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

// ✅ Respect prefers-reduced-motion
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced) {
  gsap.from(...);
}
```

### Timing Guidelines

```
Hero load animations:     duration: 0.8-1.0s, ease: "power4.out"
Section reveals:          duration: 0.6-0.8s, ease: "power3.out"
Stagger between items:    0.08-0.12s
Hover micro-interactions: duration: 0.2-0.3s, ease: "power2.out"
Page exit:                duration: 0.4s, ease: "power2.in"
```

---

## 4. Framer Motion Rules

### LazyMotion (Required for Performance)

```typescript
// app/layout.tsx — load only used features
import { LazyMotion, domAnimation } from "framer-motion";

export default function Layout({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

// ✅ Use m.div instead of motion.div with LazyMotion
import { m } from "framer-motion";
<m.div variants={fadeUp} initial="hidden" animate="visible" />
```

### Reusable Variants

```typescript
// lib/animations.ts — centralized variants
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}
```

### AnimatePresence Pattern (Accordion/Modal)

```typescript
<AnimatePresence>
  {isOpen && (
    <m.div
      key="content"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
    >
      {children}
    </m.div>
  )}
</AnimatePresence>
```

---

## 5. Tailwind CSS v4 Rules

### CSS-First Configuration

```css
/* ✅ CORRECT — Tailwind v4 uses @theme in CSS */
@import 'tailwindcss';

@theme {
  --color-accent: #f5c400;
  --font-display: 'Syne', sans-serif;
}

/* Usage in HTML */
/* class="bg-accent text-text-primary font-display" */

/* ❌ WRONG — v4 doesn't use tailwind.config.js for tokens */
/* Don't put design tokens in tailwind.config.ts */
```

### Class Organization (Prettier Plugin)

```typescript
// ✅ Order: layout → positioning → sizing → spacing → typography → colors → effects
<div className={cn(
  "flex items-center justify-between",     // layout
  "relative",                              // positioning
  "w-full max-w-container",               // sizing
  "px-lg py-md",                          // spacing
  "text-sm font-medium",                  // typography
  "text-text-primary bg-bg-card",         // colors
  "border border-border rounded-lg",      // borders
  "transition-colors duration-base",      // effects
  className,                              // external overrides
)}>
```

### cn() Usage

```typescript
// ✅ Always use cn() for dynamic classes
import { cn } from "@/lib/utils";

<button className={cn(
  "px-lg py-md rounded-full font-medium transition-all",
  variant === "primary" && "bg-accent text-text-on-accent hover:bg-accent-hover",
  variant === "ghost" && "border border-border hover:border-border-hover",
  disabled && "opacity-50 cursor-not-allowed",
)}>
```

---

## 6. Sanity / Data Fetching Rules

### Query Centralization

```typescript
// ✅ ALWAYS — جميع الـ GROQ queries في sanity/lib/queries.ts
// ❌ NEVER — inline queries في components

// ✅
import { PROJECTS_QUERY } from '@/sanity/lib/queries'
const projects = await sanityFetch<Project[]>({ query: PROJECTS_QUERY })

// ❌
const projects = await client.fetch(`*[_type == "project"]{...}`) // في component
```

### Image Handling

```typescript
// ✅ ALWAYS use next/image + Sanity CDN
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

<Image
  src={urlFor(project.image).width(800).height(600).url()}
  alt={project.title}
  width={800}
  height={600}
  className="object-cover"
  priority={isFeatured} // priority فقط للـ above-fold images
/>
```

### Error Handling

```typescript
// ✅ Always handle Sanity fetch errors gracefully
async function getProjects(): Promise<Project[]> {
  try {
    return await sanityFetch<Project[]>({ query: PROJECTS_QUERY })
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return [] // fallback
  }
}
```

---

## 7. File & Folder Rules

### Naming Conventions

```
Components:       PascalCase    → HeroSection.tsx
Hooks:            camelCase     → useLiveTime.ts
Utilities:        camelCase     → formatDate.ts
Types:            camelCase     → sanity.ts
Constants:        UPPER_SNAKE   → SITE_URL = "..."
CSS classes:      kebab-case    → .fade-target
Sanity schemas:   camelCase     → project.ts
```

### Import Order (ESLint Enforced)

```typescript
// 1. React
import { useState, useRef, useEffect } from 'react'

// 2. Next.js
import Image from 'next/image'
import Link from 'next/link'

// 3. External packages
import { motion } from 'framer-motion'
import gsap from 'gsap'

// 4. Internal - absolute imports
import { sanityFetch } from '@/sanity/lib/client'
import { PROJECTS_QUERY } from '@/sanity/lib/queries'

// 5. Internal - components
import { SectionLabel } from '@/components/ui/SectionLabel'
import { YellowButton } from '@/components/ui/YellowButton'

// 6. Types
import type { Project } from '@/types/sanity'

// 7. Styles (if CSS modules)
import styles from './Hero.module.css'
```

### File Size Limits

```
Component file:   < 200 lines → لو أكبر، قسّم لـ sub-components
Utility file:     < 100 lines
Query file:       مش محدود — queries فقط
Types file:       مش محدود — types فقط
```

---

## 8. Performance Rules

### Core Web Vitals Targets

```
LCP (Largest Contentful Paint):   < 1.5s
FID (First Input Delay):          < 100ms
CLS (Cumulative Layout Shift):    < 0.05
INP (Interaction to Next Paint):  < 200ms
```

### Image Rules

```typescript
// ✅ Priority للـ above-fold images (LCP optimization)
<Image src={heroImage} priority alt="..." /> // ← Hero image

// ✅ Lazy load للـ below-fold
<Image src={projectImage} loading="lazy" alt="..." /> // ← default

// ✅ Explicit dimensions دايماً (CLS prevention)
<Image src={img} width={800} height={600} alt="..." /> // ← no layout shift

// ✅ sizes attribute للـ responsive images
<Image
  src={img}
  alt="..."
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Font Performance

```typescript
// ✅ next/font - zero layout shift, preloaded automatically
import { Syne } from 'next/font/google'
const syne = Syne({ subsets: ['latin'], display: 'swap' })

// ❌ NEVER use @import in CSS for Google Fonts
// ❌ NEVER use <link> tags in HTML for fonts
```

### Bundle Size

```typescript
// ✅ Dynamic imports للـ heavy components
const HeavyAnimation = dynamic(() => import("./HeavyAnimation"), {
  ssr: false,
  loading: () => <div className="animate-pulse" />,
});

// ✅ GSAP tree-shaking
import { gsap } from "gsap"; // ✅
import gsap from "gsap"; // ✅ (same)
// فقط import الـ plugins اللي بتستخدمها
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
```

---

## 9. Accessibility Rules

### Semantic HTML

```typescript
// ✅ Semantic elements
<main>, <section>, <article>, <nav>, <header>, <footer>, <aside>

// ✅ Headings hierarchy
<h1> → اسم المصمم (one per page)
<h2> → section titles
<h3> → card titles
<h4> → sub-items

// ❌ NEVER
<div onClick={fn}>Click me</div>  // استخدم <button>
<span className="h1">Title</span>  // استخدم <h1>
```

### Interactive Elements

```typescript
// ✅ Buttons vs Links
<button onClick={handleOpen}>Open Modal</button> // action
<Link href="/projects">View Projects</Link>       // navigation

// ✅ ARIA labels للـ icon-only buttons
<button aria-label="Open navigation menu">
  <MenuIcon />
</button>

// ✅ Focus styles (لا تشيل outline)
// In CSS: focus-visible:ring-2 ring-accent ring-offset-2
```

### Reduced Motion

```typescript
// ✅ ALWAYS check prefers-reduced-motion
const prefersReduced = useMediaQuery("(prefers-reduced-motion: reduce)");

useGSAP(() => {
  if (prefersReduced) return; // Skip animations
  gsap.from(".item", { ... });
}, [prefersReduced]);

// في Tailwind
// motion-safe:animate-bounce (يشغل الـ animation فقط لو مش reduced motion)
```

---

## 10. Code Review Checklist

قبل ما تعتبر أي task خلصت، اتأكد من كل النقاط دي:

### Functionality

```
□ الـ feature بتشتغل صح في كل الحالات
□ Error states معمولة
□ Loading states معمولة
□ Empty states معمولة (لو data فارغة)
□ Edge cases متعملة
```

### Code Quality

```
□ مفيش any في TypeScript
□ مفيش console.log
□ مفيش hardcoded strings (text من Sanity، colors من tokens)
□ مفيش magic numbers (استخدم constants)
□ كل function عندها single responsibility
□ كل component صغير ومركّز
```

### Design Fidelity

```
□ المسافات صح (spacing tokens)
□ الألوان صح (CSS variables)
□ الخطوط صح (font-display / font-body)
□ Border radius صح
□ Shadows صح
□ Hover states موجودة
□ Focus states موجودة
□ مطابق للديزاين على desktop
□ مطابق للديزاين على mobile
```

### Performance

```
□ Images بـ next/image مع width/height
□ Priority على above-fold images
□ لا animation على width/height/margin
□ ScrollTrigger cleanup موجود
□ لا memory leaks في hooks
```

### Accessibility

```
□ Alt text على الصور
□ Aria-labels على icon buttons
□ Semantic HTML
□ Keyboard navigation يشتغل
□ Focus visible styles
□ Color contrast adequate
```

---

## 11. Next.js 16 Specific Rules

### Rule 1 — proxy.ts مش middleware.ts

```typescript
// ❌ Next.js 15 style — deprecated
// middleware.ts
export function middleware(request: NextRequest) { ... }

// ✅ Next.js 16 style
// proxy.ts
export function proxy(request: NextRequest) { ... }
```

### Rule 2 — React Compiler = لا useMemo/useCallback يدوي

```typescript
// ✅ اكتب كود عادي — الـ Compiler يعمل الـ optimization
function ServiceList({ services, activeId }: Props) {
  const visible = services.filter(s => s.featured);
  const handleClick = (id: string) => setActive(id);
  return <ul>...</ul>;
}

// ❌ مش محتاج (overhead بدون فايدة مع React Compiler)
const visible = useMemo(() => services.filter(s => s.featured), [services]);
const handleClick = useCallback((id: string) => setActive(id), []);
```

### Rule 3 — Async Params إجباري

```typescript
// ✅ كل page/layout تعمل await params
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category: string }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { category } = await searchParams;
  ...
}
```

### Rule 4 — "use cache" للـ Static Sanity Data

```typescript
// ✅ Components اللي بتجيب data من Sanity
"use cache";
export async function ExperienceSection() {
  const experiences = await sanityFetch({ query: EXPERIENCES_QUERY });
  return <ExperienceList items={experiences} />;
}

// استخدم cacheTag للـ Sanity webhook revalidation
import { cacheTag } from "next/cache";
"use cache";
export async function ProjectsSection() {
  cacheTag("project");  // يتبط بـ Sanity webhook
  const projects = await sanityFetch({ query: PROJECTS_QUERY });
  return <ProjectsGrid projects={projects} />;
}
```

### Rule 5 — Turbopack SVG Config

```typescript
// next.config.ts — لو بتستخدم SVGs كـ React components
experimental: {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
},
```
