# 🚀 دليل الاستخدام الكامل — Codex + Portfolio

---

## أولاً: فهم كيف يشتغل Codex

```
VSCode Terminal
     │
     ▼
  codex CLI
     │
     ├── يقرأ AGENTS.md تلقائياً (project context)
     ├── يقرأ الصور اللي بتبعتهالوا
     ├── يشوف الـ codebase كله
     └── يكتب/يعدل ملفات + يشغل commands
```

**المبدأ الأساسي:**

- `AGENTS.md` = الدستور اللي Codex بيقراه تلقائياً في بداية كل session
- الصور = بتبعتها في بداية البرومبت كـ attachment
- الملفات الـ 5 اللي عملناهم = Codex يقراهم من خلال `@filename`

---

## ثانياً: Setup خطوة بخطوة

### الخطوة 1 — تركيب Codex CLI

```bash
# في الـ terminal
npm install -g @openai/codex

# تسجيل دخول
codex login
# هيفتح browser → سجل بـ ChatGPT account
```

### الخطوة 2 — هيكل الفولدرز قبل البداية

```
portfolio/                          ← مجلد المشروع الرئيسي
├── AGENTS.md                       ← 🔑 Codex يقراه تلقائياً
├── docs/
│   ├── 01_PROJECT_OVERVIEW.md
│   ├── 02_CODEX_INSTRUCTIONS.md
│   ├── 03_PLAN.md
│   ├── 04_RULES_AND_SKILLS.md
│   └── 05_DESIGN_TOKENS.md
├── design-references/              ← 🖼️ الصور هنا
│   ├── 00_full-page.jpg
│   ├── 01_hero.jpg
│   ├── 02_about-experience.jpg
│   ├── 03_education.jpg
│   ├── 04_services.jpg
│   ├── 05_featured-work.jpg
│   ├── 06_recent-projects.jpg
│   ├── 07_testimonials.jpg
│   ├── 08_testimonials-bar.jpg
│   └── 09_footer-cta.jpg
└── (Next.js project files هتتنشأ هنا)
```

### الخطوة 3 — افتح VSCode في مجلد المشروع

```bash
mkdir portfolio
cd portfolio
code .  # فتح VSCode
```

### الخطوة 4 — شغّل Codex من terminal داخل VSCode

```bash
# من داخل VSCode terminal
codex
# أو مع model محدد
codex -m gpt-5.5
```

---

## ثالثاً: الصور — كيف تبعتها لـ Codex

### طريقة 1: في بداية البرومبت (الأفضل)

```bash
# من command line
codex --image design-references/01_hero.jpg,design-references/02_about.jpg "ابدأ Phase 0"

# أو داخل الـ TUI بعد ما تفتح codex:
# اكتب @ وبعدين اسم الصورة
@design-references/01_hero.jpg
```

### طريقة 2: داخل الـ TUI

```
# بعد ما تفتح codex وتكتب في الـ composer:
# اكتب @ → هيفتح file picker
@design-references/01_hero.jpg اعمل الـ hero section زي ما في الصورة
```

### طريقة 3: Paste مباشر

```
# في الـ TUI composer: Ctrl+V لو عندك صورة في clipboard
```

---

## رابعاً: AGENTS.md — الملف الأهم

<يتم إنشاؤه في مجلد المشروع — Codex يقراه تلقائياً في كل session>

محتواه موضّح في القسم التالي من هذا الملف.

---

## خامساً: البرومبت الأول (Phase 0)

### الخطوات بالترتيب:

**1. افتح terminal في VSCode**

```bash
cd portfolio
codex -m gpt-5.5
```

**2. أول رسالة في الـ TUI:**

```
اقرأ الملفات دي الأول قبل أي حاجة:
@docs/01_PROJECT_OVERVIEW.md
@docs/02_CODEX_INSTRUCTIONS.md
@docs/03_PLAN.md
@docs/04_RULES_AND_SKILLS.md
@docs/05_DESIGN_TOKENS.md

وشوف الصور دي للـ UI المطلوب:
@design-references/00_full-page.jpg
@design-references/01_hero.jpg

قرأت كل حاجة؟ قولي فهمت إيه من المشروع وإيه أول خطوة هتعملها.
```

**3. بعد ما يؤكد الفهم — ابعت:**

```
تمام. ابدأ Phase 0 من PLAN.md بالضبط.

المطلوب:
1. إنشاء مشروع Next.js 16 بالإعدادات الصح
2. تركيب كل الـ dependencies
3. إنشاء folder structure الكاملة
4. إعداد TypeScript strict config
5. إعداد ESLint + Prettier
6. إنشاء .env.local template

بعد كل خطوة أخبرني بالـ status ولا تنتقل للخطوة اللي بعدها غير بعد تأكيدي.
```

---

## سادساً: البرومبتات لكل Phase

### Phase 0 → Phase 1 (بعد تأكيد الـ setup)

```
Phase 0 خلص وشغال. ابدأ Phase 1 — Design System.

شوف الـ design tokens في:
@docs/05_DESIGN_TOKENS.md

المطلوب:
1. إعداد globals.css بالـ Tailwind v4 tokens
2. إعداد الـ fonts (Syne + Space Grotesk)
3. إنشاء SectionLabel component
4. إنشاء YellowButton component
5. إنشاء DateBadge component

الـ components لازم تطابق الـ design tokens بالضبط.
```

### Phase 1 → Phase 2 (Sanity)

```
Phase 1 خلص. ابدأ Phase 2 — Sanity CMS.

Project ID: [حط الـ project ID بتاعك]
Dataset: production

المطلوب:
1. Sanity config
2. الـ 7 schemas كاملة
3. Sanity client مع revalidation
4. GROQ queries مركزية
5. TypeScript types
6. Studio route على /studio
```

### Phase 3+4 (Layout + Hero) — ابعت الصور مع البرومبت

```
ابدأ Phase 3 و Phase 4.

مرجع الديزاين للـ Navbar:
@design-references/00_full-page.jpg

مرجع الديزاين للـ Hero:
@design-references/01_hero.jpg

مرجع الديزاين للـ Testimonials Bar:
@design-references/08_testimonials-bar.jpg

المطلوب:
1. Navbar — sticky, blur, active states, mobile hamburger
2. Footer — live clock, social links, nav
3. Hero section — بالضبط زي الصورة
4. Testimonials Bar — CSS marquee

الـ UI لازم يطابق الصور pixel-perfect.
```

---

## سابعاً: أوامر Codex المفيدة أثناء العمل

```bash
# أثناء الـ session في الـ TUI:
/review          # يعمل code review للكود الحالي
/clear           # يمسح الـ conversation (مش الكود)
/model gpt-5.5   # يغير الـ model
Ctrl+C           # يوقف task شغال
Tab              # يـ queue رسالة تانية وهو شغال

# أوامر مفيدة تقولهالوا:
"افتح npm run dev وأكد إن فيه errors ولا لأ"
"شغّل npm run build وصلح أي errors"
"شغّل npm run lint وصلح كل الـ warnings"
```

---

## ثامناً: نصايح مهمة

### ✅ افعل

- **بعت صورة واحدة مع كل section** — متبعتش كل الصور مرة واحدة
- **بعت برومبت واحد = task واحد** — مش 5 مهام في رسالة واحدة
- **استخدم `/review` بعد كل phase** قبل ما تنتقل للي بعدها
- **قول "تأكد إن مطابق للصورة"** دايماً مع الـ UI tasks
- **راجع الكود** قبل ما تضغط Approve

### ❌ متعملش

- متديهوش كل الملفات في رسالة واحدة
- متحاولش تشرحله الـ stack من الأول في كل رسالة — `AGENTS.md` بيعمل ده تلقائياً
- متوافقش على أي dependency جديدة من غير ما تعرفها
- متشغلش بـ `--yolo` flag (بيـ approve كل حاجة بدون مراجعة)

### 🎯 للحصول على أحسن نتيجة

```
"اعمل X زي الصورة بالضبط — مش تقريباً، بالضبط"
"بعد ما تخلص، قارن الكود بالـ design tokens في @docs/05_DESIGN_TOKENS.md"
"لا تنتقل للخطوة اللي بعدها غير بعد ما أقولك"
"شغّل npm run build وأكد إن فيه 0 errors"
```
