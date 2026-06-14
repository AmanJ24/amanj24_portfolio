# memory.md — Aman Jangir Portfolio
> Single source of truth for all content, design direction, and personal context.
> Feed this file to your AI IDE at the start of every session.
> Do not invent content not explicitly written here.

---

## 1. PERSON

```
Full name   : Aman Jangir
GitHub      : AmanJ24
Open to     : Full-time · Internship · Remote
```

---

## 2. DESIGN REFERENCE

### Inspiration
- **Primary reference**: https://www.withhoney.com
- Copy the layout system, section rhythm, editorial typography weight, video-first hero,
  numbered section labels, and horizontal scroll interactions — NOT the colors or content.

### Color Palette (strict — do not deviate)
```
--color-bg        : #09080A   /* near-black, warm tint — page background */
--color-surface   : #1C1A17   /* card and section surface */
--color-surface-2 : #2A2820   /* elevated card / hover state */
--color-text      : #E6DDD0   /* warm cream — primary text */
--color-muted     : #8C8378   /* secondary / caption text */
--color-accent    : #BFA98A   /* sand gold — accent, highlights, numbers */
--color-sage      : #3D5C3A   /* forest sage — earned/active states */
--color-border    : #2E2B26   /* subtle dividers */
```

### Typography
```
Display / Hero : "Playfair Display" or "DM Serif Display" — weight 300, large, generous tracking
Body           : "Inter" or "DM Sans" — weight 400/500, line-height 1.65
Mono / Labels  : "JetBrains Mono" or "IBM Plex Mono" — section counters, tags, captions
```

### Design Rules
- Background is always `--color-bg`. Never white. Never light.
- Section counters: `01 / 09` in mono, top-left of each section, small, muted.
- `--color-accent` used ONLY on: numbers, hover states, one key CTA. Not repeated everywhere.
- `--color-sage` used ONLY on: earned credentials and live/active indicators.
- No gradients except a subtle vignette over the hero video.
- No border-radius above 4px except pill tags (999px).
- Generous whitespace — minimum 120px top/bottom padding on desktop per section.
- Custom cursor: 18px circle, `--color-accent` fill, 0.1s lag behind mouse.
- On link hover: cursor expands to 36px, outline only, label "open" inside.

### Animations
- Smooth scroll : **Lenis**
- Scroll-based  : **GSAP + ScrollTrigger**
- Transitions   : **Framer Motion**
- Marquee       : CSS infinite scroll or GSAP ticker
- Page load     : hero text slides up, nav fades in after 1.8s
- Numbers       : count up from 0 on scroll enter
- Projects      : staggered card entrance on scroll
- Horizontal    : GSAP pinned scroll for Projects section
- Accessibility : respect `prefers-reduced-motion` — disable all animations

### Tech Stack (portfolio site)
```
Framework  : React + Vite
Styling    : Tailwind CSS (configured with the palette above)
Animation  : GSAP, Lenis, Framer Motion
Video      : HTML5 <video> — muted, autoplay, loop, playsInline
Deployment : Vercel
```

---

## 3. ASSET PIPELINE
> Place files in the `/public/assets/` directory using exact filenames below.
> The site reads from these paths directly — adding a file is enough to activate it.

```
/public/assets/hero.mp4         ← hero background video (loopable, no audio, <15s)
/public/assets/resume.pdf       ← resume — linked in nav and contact section
/public/assets/og.png           ← Open Graph image (1200×630)
/public/assets/favicon.png      ← monogram favicon (512×512, dark bg, sand gold)
```

**Conditional rendering rules:**
- If `hero.mp4` exists → render as full-screen video background in section 01.
- If `hero.mp4` is missing → render a static dark gradient fallback (#09080A → #1C1A17).
- If `resume.pdf` exists → show "Resume" link in nav and contact section.
- If `resume.pdf` is missing → hide the resume link entirely, no broken link.

---

## 4. SECTIONS (9 total)

---

### 01 / 09 — HERO

**Layout**: 100vh. Video fills entire background. Vignette overlay on top. Text bottom-left. Nav fades in after 1.8s.

**Overlay**: `background: rgba(9,8,10,0.45)` on top of video.

**Nav** (fades in at 1.8s):
```
Left  : "Aman Jangir" — links to top
Right : GitHub · LinkedIn · Resume (conditional) · Say Hello
```

**Hero text** (bottom-left, stacked):
```
Line 1 : "Aman Jangir"          — large display serif, weight 300
Line 2 : "Developer · Security" — small, mono, --color-muted
```

**Scroll cue**: Animated down-arrow, centered bottom, `--color-muted`, subtle bounce.

---

### 02 / 09 — STATEMENT

**Layout**: Full-width, centered. One large statement. Two marquee strips below.

**Statement** (~72px desktop, display serif, centered):
```
"I build things. I also spend a lot of time
figuring out where they go wrong."
```

**Marquee strip 1** (scrolls →, mono, muted):
```
React · TypeScript · Python · Rust · Node.js · Next.js · Tailwind · Vite · Supabase · PostgreSQL ·
```

**Marquee strip 2** (scrolls ←, mono, muted, slightly slower):
```
Burp Suite · nmap · ffuf · Metasploit · Wireshark · Gobuster · IDOR · JWT attacks · OSINT · Tor ·
```

---

### 03 / 09 — PROJECTS

**Layout**: GSAP-pinned horizontal scroll. 4 panels side by side, each full viewport width.
Scroll down → page slides right through all 4 panels.

**Panel anatomy**:
- Top-left corner: panel number in mono muted (`// 01`)
- Large project name in display serif
- One sentence — what it does, plainly
- Tech stack as small pill tags (`--color-surface-2` bg, `--color-muted` text)
- GitHub icon link, opens new tab
- Hover state: short description slides up from panel bottom (`--color-surface` bg)

---

**PANEL 01 — Entrustory**
```
Name        : Entrustory
One-liner   : Cryptographically signed document certificates anyone can verify.
Description : Issues tamper-proof certificates using Ed25519 signatures and lets anyone
              verify authenticity through a public link. Exports signed PDFs with
              no third-party dependency required.
Stack tags  : React 19 · TypeScript · Vite · Tailwind · Supabase · Web Crypto API · jsPDF
GitHub      : github.com/AmanJ24/[repo]   ← replace with real URL
License     : GNU AGPL v3
```

**PANEL 02 — BlackSignal**
```
Name        : BlackSignal
One-liner   : Threat intelligence pipeline that routes through Tor and maps to MITRE ATT&CK.
Description : Async DAG that pulls IOCs from raw text, isolates traffic through Tor circuits,
              enriches findings with VirusTotal and AbuseIPDB, and tags each IOC to ATT&CK
              techniques using NER. 29 tests passing.
Stack tags  : Python · asyncio · Tor · spaCy · VirusTotal API · AbuseIPDB · MITRE ATT&CK
GitHub      : github.com/AmanJ24/[repo]   ← replace with real URL
```

**PANEL 03 — AURA**
```
Name        : AURA
One-liner   : A local AI layer that runs on your machine, not someone else's server.
Description : Event-driven system built on Tauri and Ollama — local LLM routing, on-demand
              vision model, vector search via sqlite-vec, and Unix socket auth. Fully offline.
Stack tags  : Rust · Tauri · Python · Ollama · sqlite-vec · Moondream2
GitHub      : github.com/AmanJ24/[repo]   ← replace with real URL
```

**PANEL 04 — PhishGuard**
```
Name        : PhishGuard
One-liner   : Phishing simulation platform with multi-tenant campaign management.
Description : GoPhish-backed dashboard with a Next.js frontend — supports multiple tenants,
              role-based access control, and campaign analytics out of the box.
Stack tags  : Next.js 14 · GoPhish · MongoDB · Prisma · TypeScript
GitHub      : github.com/AmanJ24/[repo]   ← replace with real URL
```

---

### 04 / 09 — NUMBERS

**Layout**: Full-width section. 4 counters in a row, lots of dark space around them.
Each number animates from 0 on scroll enter (GSAP).

```
9.6      → label: "CGPA"
Top 1%   → label: "TryHackMe · Global"
4        → label: "Projects Built"
29       → label: "Tests Passing · BlackSignal"
```

`Top 1%` types in character by character instead of counting.

---

### 05 / 09 — ABOUT

**Layout**: Split. Left half: the word "About" in massive display type, partially cropped — structural decoration only. Right half: two short paragraphs, plain text.

**Right column**:
```
Paragraph 1:
I build software and I study how it breaks. Not as two separate things —
as the same thing looked at from both sides. That's what keeps the work
interesting.

Paragraph 2:
My focus right now is full-stack development and application security.
The projects I build tend to sit at that intersection — something useful,
built with some thought about what an attacker would do with it.
```

**Below paragraphs** (mono, small, muted):
```
Open to     : Full-time · Internship · Remote
GitHub      : AmanJ24
```

---

### 06 / 09 — APPROACH

**Layout**: Numbered list. Large type. Sand gold on numbers. Generous vertical spacing.

**Header** (mono, muted, small): `How I work`

**Items**:
```
001 — I read the docs before I start guessing.
002 — I ship something that works, then make it better.
003 — I build with the question of how I'd break it already in mind.
004 — I don't list a skill I can't back up in a conversation.
005 — The best code I've written is the code I later deleted.
```

---

### 07 / 09 — SKILLS & CREDENTIALS

**Layout**: Two columns left (Skills), one column right (Earned credentials).

**Left — Development Skills**:
```
Languages   : JavaScript · TypeScript · Python · Rust
Frontend    : React · Next.js · Tailwind CSS · Vite · Framer Motion
Backend     : Node.js · Express · FastAPI · PostgreSQL · Supabase · MongoDB
Tooling     : Git · Docker · Linux · Vercel · Prisma
```

**Center — Security Skills**:
```
Offensive   : Burp Suite · nmap · ffuf · Metasploit · Gobuster · Wireshark
Knowledge   : IDOR/BOLA · SSRF · JWT attacks · Mass Assignment · AD basics · OSINT
Environment : Kali Linux · EndeavourOS · Warp Terminal · CTF platforms
```

**Right — Earned Credentials** (only verified, no planned):
```
✓  ISC2 Certified in Cybersecurity (CC)
✓  TryHackMe — Top 1% Global
✓  TryHackMe — [add specific badge/cert names you've earned]
──
CTF
   MLECCHAX   Silver flag · IDOR/BOLA exploitation
   [add any other CTF events here]
```

*Only show earned things here. Nothing labeled "planned" on the public site.*

---

### 08 / 09 — NOW

**Layout**: Minimal. Full-width. Live green dot + "Currently" label top-left. Three lines below.

> **Update this section every 4–6 weeks. It's the most human part of the site.**

**Content**:
```
Building  : AURA — Phase 8 architecture overhaul
Studying  : Application security · eJPT prep
Reading   : [add what you're currently reading/studying]
```

**Footer of section** (mono, muted, tiny):
```
Last updated: [Month Year]
```

---

### 09 / 09 — CONTACT

**Layout**: Full-bleed dark section. Email in the largest type on the entire site
(~80–100px desktop), `--color-accent`, clickable mailto. Two icon links below. Nothing else.

```
[your email address]

GitHub     → github.com/AmanJ24
LinkedIn   → [your LinkedIn URL]
```

No form. No "let's chat." No filler. Just the email and two links.

---

## 5. GLOBAL COMPONENTS

### Navigation
```
Position    : Fixed top · transparent on hero · bg #09080A after scroll
Left        : "AJ" monogram → scrolls to top
Right       : GitHub · LinkedIn · Resume (only if /public/assets/resume.pdf exists) · Say Hello
Font        : mono for links, display for monogram
```

### Footer
```
Single line, bottom of page.
Left  : © 2025 Aman Jangir
Right : Built with React · Vite · Deployed on Vercel
Font  : mono, --color-muted
```

---

## 6. SEO & META

```html
<title>Aman Jangir — Developer & Security</title>
<meta name="description"
  content="Aman Jangir — full-stack developer with a focus on application security.
           Building software and understanding how it breaks.">
<meta property="og:title" content="Aman Jangir" />
<meta property="og:description" content="Developer. Security. Builder." />
<meta name="theme-color" content="#09080A" />
```

---

## 7. CONTENT RULES (for AI IDE — read before generating any copy)

```
✓  Use "Aman Jangir" — never "Aman Joshi"
✓  Projects are shown without status labels
✓  Credentials section shows ONLY earned things
✓  No mention of college name or location
✓  No future plans mentioned anywhere
✓  Resume link only renders if /public/assets/resume.pdf is present
✓  Hero video only renders if /public/assets/hero.mp4 is present
✗  Do not use "expert" anywhere
✗  Do not mention bug bounty findings — there are none
✗  Do not mention project completion percentages
✗  Do not mention Jaipur, Bangalore, or JNU anywhere on the site
✗  Do not invent credentials, numbers, or project features not listed here
```

---

*End of memory.md*
