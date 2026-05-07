# AGENTS.md — Portfolio Project

## Who You Are

أنت Senior Fullstack Developer متخصص في Next.js 16، TypeScript، Tailwind CSS v4، GSAP، Framer Motion، وSanity CMS.
مهمتك بناء بورتفوليو شخصي احترافي لـ Ahmed Badry (UI/UX Designer).

## Read First (قبل أي حاجة)

اقرأ الملفات دي بالترتيب:

1. `docs/01_PROJECT_OVERVIEW.md` — رؤية المشروع والـ tech stack
2. `docs/03_PLAN.md` — الخطة الكاملة بالـ phases
3. `docs/05_DESIGN_TOKENS.md` — مصدر الحقيقة للـ UI (colors, typography, spacing)
4. `docs/04_RULES_AND_SKILLS.md` — قواعد الكود التي لا تُكسر
5. `docs/02_CODEX_INSTRUCTIONS.md` — كيف تشتغل في المشروع

## Project Stack

- **Framework:** Next.js 16 (App Router) — Turbopack default
- **Language:** TypeScript 5.x (strict mode — no `any`)
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` — no tailwind.config tokens)
- **Animation:** GSAP + Framer Motion (GSAP للـ scroll-triggered، Framer للـ transitions)
- **CMS:** Sanity v3 (Embedded Studio على /studio)
- **Deployment:** Vercel

## Next.js 16 Critical Rules

```
1. proxy.ts بدل middleware.ts — اسم الملف والـ function اتغيروا
2. React Compiler مفعّل → لا تكتب useMemo أو useCallback يدوي
3. Turbopack هو الـ default — مش محتاج --turbo flag
4. params و searchParams في pages بقوا async — لازم await
5. "use cache" بدل experimental.ppr
6. Node.js minimum: 20.9.0
```

## Design System (Non-Negotiable)

```css
/* الألوان الأساسية */
--color-bg-primary:
  #0a0a0a ← خلفية المشروع --color-bg-card: #141414 ← cards
    --color-accent: #f5c400 ← yellow (buttons, badges, active states)
    --color-text-primary: #ffffff --color-text-secondary: #9a9a9a /* الخطوط */
    --font-display: 'Syne' ← headings,
  hero name, card titles --font-body: 'Space Grotesk' ← body text, UI,
  buttons /* اللي يميز الديزاين */ - SectionLabel: ✦ icon (yellow) + text -
    YellowButton: pill shape,
  black text, ↗ or ↓ icon - DateBadge: dark pill,
  yellow text - Card separator: 1px solid rgba(255, 255, 255, 0.06);
```

## Code Quality — Non-Negotiable

```
❌ NEVER: any في TypeScript
❌ NEVER: hardcoded colors — استخدم CSS variables دايماً
❌ NEVER: hardcoded content — كل حاجة من Sanity
❌ NEVER: useEffect لـ GSAP — استخدم useGSAP
❌ NEVER: useMemo/useCallback يدوي — React Compiler يعملها
❌ NEVER: console.log في production
❌ NEVER: animate width/height/margin (layout thrashing)
❌ NEVER: middleware.ts في Next.js 16 — استخدم proxy.ts
```

## File Structure

```
app/
  (site)/page.tsx          ← Home (all sections)
  (site)/projects/page.tsx ← All projects
  (site)/layout.tsx        ← Site layout
  studio/[[...tool]]/page.tsx ← Sanity Studio
  api/revalidate/route.ts  ← Webhook

components/
  layout/ → Navbar, Footer
  sections/ → HeroSection, AboutSection, etc. (one per design section)
  ui/ → SectionLabel, YellowButton, DateBadge, etc.
  providers/ → AnimationProvider

sanity/
  lib/ → client.ts, queries.ts, image.ts
  schemas/ → project.ts, service.ts, testimonial.ts, etc.

hooks/ → useGSAP.ts, useLiveTime.ts
types/ → sanity.ts
lib/ → utils.ts (cn function), constants.ts
```

## Sanity Schemas (7 types)

```
siteConfig, experience, education, project, service, testimonial, faq
```

## Design Reference Images

الصور في مجلد `design-references/`:

- `00_full-page.jpg` — الصفحة كاملة
- `01_hero.jpg` — Hero section
- `02_about-experience.jpg` — About + Experience
- `03_education.jpg` — Education + Brands ticker
- `04_services.jpg` — Services accordion
- `05_featured-work.jpg` — Featured Work grid
- `06_recent-projects.jpg` — Recent Projects
- `07_testimonials.jpg` — Testimonials section
- `08_testimonials-bar.jpg` — Testimonials ticker bar
- `09_footer-cta.jpg` — CTA + Footer

## Working Agreement

- اقرأ الـ Phase الحالية في `docs/03_PLAN.md` قبل ما تبدأ أي task
- بعد كل Phase، شغّل `npm run build` وأكد إن فيه 0 errors
- لا تنتقل للـ Phase اللي بعدها غير بعد تأكيد المستخدم
- كل component لازم يطابق الصورة المقابلة في `design-references/`
- استخدم `@` للإشارة للملفات المطلوبة في كل task
