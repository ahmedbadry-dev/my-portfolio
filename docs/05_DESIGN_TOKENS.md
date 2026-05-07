# 🎨 DESIGN TOKENS & VISUAL REFERENCE

## Extracted from Figma Designs — Source of Truth

> هذا الملف هو المرجع الوحيد للـ design decisions.
> أي قيمة مش موجودة هنا → راجع الديزاين المرجعي.

---

## 🎨 Color Palette

### Backgrounds

```
bg-primary:    #0A0A0A  → الخلفية الرئيسية (body, most sections)
bg-secondary:  #111111  → sections بديلة (subtle difference)
bg-card:       #141414  → experience cards, education cards
bg-elevated:   #1A1A1A  → hover states, active service card
bg-ticker:     #0D0D0D  → testimonials bar, brands ticker
bg-overlay:    rgba(0,0,0,0.75) → image overlays on hover
```

### Accent (Yellow)

```
accent:        #F5C400  → CTA buttons, active states, date badges text, active nav
accent-hover:  #E0B300  → button hover state
accent-glow:   rgba(245,196,0,0.15)  → glow effect behind CTAs
accent-text:   #000000  → text ON yellow buttons/badges
```

### Text

```
text-primary:   #FFFFFF  → headings, main content
text-secondary: #9A9A9A  → subtitles, captions, job descriptions
text-muted:     #555555  → labels (Phone/Email/etc), dividers
text-on-accent: #000000  → text inside yellow CTA buttons
```

### Borders

```
border-default: rgba(255,255,255,0.08)  → card borders, dividers
border-hover:   rgba(255,255,255,0.15)  → on hover
border-strong:  rgba(255,255,255,0.20)  → active/focused elements
```

### Gradients

```
hero-glow:     radial-gradient(ellipse at 75% 20%, rgba(245,196,0,0.12) 0%, transparent 60%)
section-glow:  radial-gradient(ellipse at 50% 0%, rgba(245,196,0,0.08) 0%, transparent 50%)
image-overlay: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)
card-gradient: linear-gradient(135deg, #141414 0%, #111111 100%)
```

---

## 🔤 Typography

### Font Families

```
Display / Headings: "Syne" (Google Fonts)
  Weights: 400, 500, 600, 700, 800
  Used for: Hero name, section headings, card titles, logo

Body / UI:          "Space Grotesk" (Google Fonts)
  Weights: 300, 400, 500, 600, 700
  Used for: Paragraphs, labels, buttons, navigation, badges
```

### Type Scale (Desktop)

```
Hero Name:         font-size: clamp(80px, 12vw, 160px)
                   font-weight: 900 (Syne ExtraBold)
                   letter-spacing: -0.02em
                   line-height: 0.95

Section Heading:   font-size: clamp(36px, 5vw, 64px)
                   font-weight: 700 (Syne Bold)
                   letter-spacing: -0.01em
                   line-height: 1.1

Card Title:        font-size: clamp(20px, 2.5vw, 28px)
                   font-weight: 600 (Syne SemiBold)
                   letter-spacing: -0.005em

Sub-Label:         font-size: 13px
                   font-weight: 400 (Space Grotesk)
                   letter-spacing: 0.05em
                   text-transform: none
                   color: text-secondary

Nav Links:         font-size: 14px
                   font-weight: 500 (Space Grotesk)
                   letter-spacing: 0.01em

Body Text:         font-size: 16px
                   font-weight: 400 (Space Grotesk)
                   line-height: 1.75
                   color: text-secondary

Small Text:        font-size: 14px
                   font-weight: 400 (Space Grotesk)
                   line-height: 1.6
                   color: text-muted

Badge / Tag:       font-size: 12px
                   font-weight: 500 (Space Grotesk)
                   letter-spacing: 0.02em

Button Text:       font-size: 15px
                   font-weight: 600 (Space Grotesk)

CTA Big Text:      font-size: clamp(48px, 7vw, 96px)
                   font-weight: 700 (Syne)
                   letter-spacing: -0.02em
```

---

## 📐 Spacing System

Base unit: 8px

```
4px   → xs   (tight gaps, icon padding)
8px   → sm   (small padding, compact elements)
16px  → md   (base padding, inline gaps)
24px  → lg   (card padding, element gaps)
32px  → xl   (larger gaps between elements)
48px  → 2xl  (section internal spacing)
64px  → 3xl  (between major blocks)
96px  → 4xl  (section vertical padding desktop)
128px → 5xl  (large sections)
160px → 6xl  (hero sections)

Container:
  max-width: 1200px
  padding-x: clamp(24px, 5vw, 80px)

Section Padding:
  padding-y desktop: 96px → 128px
  padding-y tablet:  64px → 96px
  padding-y mobile:  48px → 64px
```

---

## 🔘 Border Radius

```
4px   → xs   (tags, small badges, inner elements)
8px   → sm   (small buttons, tight cards)
12px  → md   (card inner elements, inputs)
16px  → lg   (main cards, panels)
24px  → xl   (profile card, large containers)
9999px → full (pill buttons, avatar circles, round icons)
```

---

## 📦 Component Specifications

### ✦ SectionLabel

```
Layout:     flex items-center gap-2
Icon:       ✦ (U+2736 six-pointed star) or ❖ — color: accent (#F5C400)
Icon size:  14px
Text:       14px, Space Grotesk, font-weight: 400, color: text-primary
Gap:        8px between icon and text
Margin-bottom: 16px (before heading)
```

### 🟡 YellowButton (CTA)

```
Background:     #F5C400
Text color:     #000000
Font:           Space Grotesk, 15px, weight: 600
Padding:        14px 28px (standard) | 12px 24px (small)
Border-radius:  9999px (full pill)
Icon:           ↗ for external | ↓ for download | → for internal
Icon position:  after text, 8px gap
Hover:          background: #E0B300, transform: translateY(-1px)
Transition:     all 200ms ease
Shadow hover:   0 8px 24px rgba(245,196,0,0.3)
Active:         transform: translateY(0)
```

### 🏷️ DateBadge

```
Background:     #1A1A1A
Border:         1px solid rgba(255,255,255,0.10)
Text color:     #F5C400 (accent)
Font:           Space Grotesk, 12px, weight: 500
Padding:        6px 14px
Border-radius:  9999px (pill)
Display:        inline-flex
Format:         "2023 - Present" or "2022 - 2023"
```

### 🃏 ExperienceCard / EducationCard

```
Background:     transparent (border-bottom separator only)
Border-bottom:  1px solid rgba(255,255,255,0.06)
Padding:        24px 0
Layout:         header row (title + date badge) + company + description

Title:          Syne, 22-28px, weight: 600, color: text-primary
Company:        Space Grotesk, 14px, color: text-secondary, margin-top: 4px
Description:    Space Grotesk, 14px, color: text-muted, margin-top: 12px, line-height: 1.6
DateBadge:      positioned at flex end of header row
Hover:          subtle background rgba(255,255,255,0.02)
Animation:      GSAP fade-up + stagger on scroll
```

### 🔲 ServiceCard (Accordion)

```
Background collapsed:  rgba(20,20,20,0.8) = bg-card
Background active:     #1A1A1A = bg-elevated
Border:                1px solid border-default
Border active:         1px solid border-hover
Border-radius:         16px
Padding:               28px 32px
Margin-bottom:         2px (tight stacking)

Header:
  Sub-label: Space Grotesk, 13px, text-secondary
  Title: Syne, 28-36px, weight: 600, text-primary
  Arrow: → (collapsed) | ↗ (expanded) — dark circle background, 40px

Content (expanded):
  Description: 15px, text-secondary, line-height: 1.7
  Skills grid: 2 cols, dot • prefix, 13px text-muted
  Image: right side, 200px height, rounded-lg, object-cover

Animation: Framer Motion AnimatePresence height + opacity
```

### 🖼️ ProjectCard (Featured Work Grid)

```
Container:     overflow-hidden, rounded-lg
Image:         grayscale(1) → grayscale(0) on hover, transition 300ms
               Scale(1) → scale(1.05) on hover inside overflow hidden
Overlay:       opacity 0 → 1 on hover
               Background: rgba(0,0,0,0.6)
               Content: "View Project ↗" — yellow button centered

Title below:   Syne, 22px, weight: 600
               hover: color → accent yellow
Description:   14px, text-secondary
Category:      not shown below — embedded in image/overlay
```

### 💬 TestimonialCard

```
Background:     rgba(20,20,20,0.9)
Border:         1px solid border-default
Border-radius:  16px
Padding:        32px

Quote:          Space Grotesk, 16px, italic, text-primary, line-height: 1.7
                Wrapped in " " curly quotes — color: accent
Description:    14px, text-secondary, margin-top: 12px

Footer:
  Avatar:       40px circle, object-cover
  Name:         15px, weight: 600, Space Grotesk
  Role:         13px, text-muted
  Quote icon:   " large, accent color, positioned bottom-right, opacity 0.5

Background text: "TESTIMONIALS" — positioned absolute, Syne, ~180px
                 opacity: 0.04, letter-spacing: 0.1em, centered
```

### ❓ FAQItem

```
Border-bottom:  1px solid border-default
Padding:        20px 0

Question:       Space Grotesk, 16px, weight: 500, text-primary
Icon:           + (collapsed) | − (expanded) — text-accent, 20px, flex end
Answer:         14px, text-secondary, line-height: 1.7
                AnimatePresence height animation
Hover:          question text → text-primary (brightens slightly)
```

---

## 🎬 Animation Reference

### Page Load Sequence (Hero)

```
0ms:    Navbar fades in (opacity 0→1, 400ms)
200ms:  "Ahmed" slides up (y: 80→0, opacity 0→1, 700ms, power4.out)
350ms:  "Badry" slides up (same timing)
500ms:  Hashtags row fades in (stagger 0.05s each)
600ms:  Bio paragraph fades in
700ms:  CTA button scales in (scale 0.95→1, opacity 0→1)
800ms:  Profile image slides in from right
```

### Scroll-Triggered Animations (Per Section)

```
Trigger:   top 80% of viewport
Pattern:   y: 40→0, opacity: 0→1, duration: 0.7s, ease: power3.out
Stagger:   0.1s between sibling elements (cards, items)

SectionLabel:  first to appear
Heading:       0.1s delay after label
Body text:     0.15s delay after heading
Cards/Items:   stagger from first
CTA buttons:   last in sequence
```

### Specific Animations

```
Ticker/Marquee:     CSS @keyframes, duration: 30s, linear, infinite
                    Pause on hover (animation-play-state: paused)

Service Accordion:  Framer AnimatePresence, height: 0→auto, 300ms easeInOut
                    Arrow rotates: 0→45deg on open

FAQ Accordion:      Same as service, 250ms
                    + icon: rotate 0→45deg

Testimonial cards:  GSAP from sides: left card x:-60, right card x:60
                    ScrollTrigger, start: "top 75%"

Project hover:      CSS transitions: filter 300ms, transform 300ms
                    Overlay: opacity 300ms

Nav active change:  CSS: color transition 200ms
                    Underline: scaleX 0→1, 200ms, transformOrigin: left
```

---

## 📱 Responsive Behavior

### Navbar

```
Desktop (>1024px): horizontal links visible
Tablet (<1024px):  links collapse to hamburger
Mobile (<768px):   hamburger, full-screen or slide overlay menu
```

### Hero Section

```
Desktop: 2-column (text left, image right)
Tablet:  2-column (smaller gaps)
Mobile:  1-column (image above or below, centered)
         Name: clamp(48px, 15vw, 80px)
```

### About Section

```
Desktop: 2-column (bio+experience left, profile+contact right)
Tablet:  2-column (stacked more tightly)
Mobile:  1-column (profile card first, then bio)
```

### Featured Work Grid

```
Desktop: 2 columns
Tablet:  2 columns (smaller)
Mobile:  1 column
```

### Services

```
Desktop: Two-section layout (header + accordion full width)
Mobile:  Stacked, accordion takes full width
```

---

## 🖼️ Icon Reference

### Signature Icon (Section Labels)

```
Character: ✦ (U+2736) — Six Pointed Black Star
Fallback:  ❖ (U+2756)
Color:     #F5C400 (accent)
Size:      14px
```

### Button Icons

```
External link: ↗ (U+2197) or Lucide's ArrowUpRight
Download:      ↓ (U+2193) or Lucide's Download
Arrow right:   → (U+2192) or Lucide's ArrowRight
Close:         × or Lucide's X
Menu:          Lucide's Menu (hamburger)
Plus/Minus:    + / − for FAQ (not Lucide, use text characters)
```

### Social Icons

```
Use: Lucide React icons OR SVG brand icons
Facebook:   Facebook icon
Instagram:  Instagram icon
LinkedIn:   Linkedin icon
X/Twitter:  Twitter icon (or custom X)

Style:      circular dark button (32-40px), border border-default
Hover:      border-hover, subtle background lighten
```

---

## 🏷️ Navbar Logo

```
Avatar:     32px circle, profile photo
Brand name: "PortFoliyo" — Syne font, 18px, weight: 700
Color:      text-primary
Gap:        10px between avatar and text
```

---

## 📏 Profile Card (About Section)

```
Width:      ~280px
Background: bg-card (#141414)
Border:     1px solid border-default
Border-radius: 24px (xl)

Image:      fill top portion (~240px height), object-cover, object-top
            No border-radius on image itself (card clips it)

Name:       Syne, 20px, weight: 700, text-center
Title:      Space Grotesk, 14px, text-secondary, text-center, margin-top: 4px

Divider:    1px border-default, margin: 16px 0

Socials:    flex row, centered, gap: 12px
            Each: 36px circle, bg-bg-elevated, border border-default
            Icons: 16px, text-secondary → text-primary on hover
```

---

## 🌐 Footer Specification

```
Background: #0A0A0A (same as body)
Border-top: 1px solid border-default
Padding:    32px container-x

Row 1:
  Left:   Logo (avatar + PortFoliyo)
  Center: Nav links (same as navbar, horizontal)
  Right:  Social icons (3 icons)

Row 2 (bottom bar, border-top: 1px solid border-default, padding-top: 16px):
  Left:   "©2025 YourName All rights reserved."
  Center: Live time (HH:MM:SS AM/PM)
  Right:  "CityName: WeatherCondition, XX°C"

All text: 13px, Space Grotesk, text-muted
Links:    text-muted → text-secondary on hover, transition: 200ms
```

---

## ✅ Design Fidelity Checklist

قبل ما تعتبر أي section خلصت، قارنها بالليستة دي:

```
□ Background color صح
□ Typography (font family + weight + size) صح
□ Spacing (padding/margin/gap) مطابق
□ Color tokens من CSS variables مش hardcoded
□ Border radius صح
□ Hover states موجودة ومطابقة
□ SectionLabel (✦ icon) موجود وصح
□ DateBadge style صح (pill, yellow text)
□ YellowButton style صح (pill, black text, icon)
□ Responsive behavior صح
□ Animations تشتغل (GSAP/Framer)
□ Data من Sanity مش hardcoded
□ Images optimized بـ next/image
```
