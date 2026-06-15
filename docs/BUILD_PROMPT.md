# PORTFOLIO BUILD PROMPT
> Paste this entire prompt into Cursor / Antigravity at the start of a new session.
> Do not summarize it. Read every referenced file fully before writing a single line of code.

---

## STEP 0 — READ THESE FILES FIRST. ALL OF THEM. IN THIS ORDER.

Before generating any code, scaffolding, or file structure, read and internalize:

1. `memory.md` — all personal content, copy, section structure, and content rules
2. `Design.md` — the full design system extracted from the reference site
3. `.agents/skills/frontend-design/SKILL.md` — the design principles skill

Cross-reference them. If Design.md specifies a layout pattern and memory.md specifies the content for it, combine them. If there is any conflict between files, `memory.md` wins on content and `Design.md` wins on visual/layout decisions.

Do not proceed to Step 1 until all three files are fully read.

---

## STEP 1 — PROJECT SCAFFOLD

Initialize a new React + Vite project in the current directory.

```bash
npm create vite@latest . -- --template react
npm install
```

Then install all dependencies:

```bash
# Core animation and scroll
npm install gsap @gsap/react lenis

# Framer Motion
npm install framer-motion

# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Fonts (via fontsource)
npm install @fontsource/playfair-display @fontsource/dm-sans @fontsource/jetbrains-mono

# Utility
npm install clsx
```

---

## STEP 2 — TAILWIND CONFIG

Replace `tailwind.config.js` entirely with this:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:        '#09080A',
        surface:   '#1C1A17',
        surface2:  '#2A2820',
        text:      '#E6DDD0',
        muted:     '#8C8378',
        accent:    '#BFA98A',
        sage:      '#3D5C3A',
        border:    '#2E2B26',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'hero':    ['clamp(2.5rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display': ['clamp(2rem, 5vw, 4.5rem)',  { lineHeight: '1.1',  letterSpacing: '-0.015em' }],
        'xl2':     ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.4' }],
      },
    },
  },
  plugins: [],
}
```

---

## STEP 3 — GLOBAL CSS

In `src/index.css`, set up the base styles:

```css
@import '@fontsource/playfair-display/300.css';
@import '@fontsource/playfair-display/400.css';
@import '@fontsource/dm-sans/400.css';
@import '@fontsource/dm-sans/500.css';
@import '@fontsource/jetbrains-mono/400.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html {
    background-color: #09080A;
    color: #E6DDD0;
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* Hide default cursor — custom cursor handles it */
  * { cursor: none; }

  /* Respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

---

## STEP 4 — FILE STRUCTURE

Create this exact structure inside `src/`:

```
src/
├── components/
│   ├── cursor/
│   │   └── CustomCursor.jsx
│   ├── nav/
│   │   └── Nav.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── Statement.jsx
│   │   ├── Projects.jsx
│   │   ├── Numbers.jsx
│   │   ├── About.jsx
│   │   ├── Approach.jsx
│   │   ├── Credentials.jsx
│   │   ├── Now.jsx
│   │   └── Contact.jsx
│   └── footer/
│       └── Footer.jsx
├── hooks/
│   ├── useLenis.js
│   └── useAssets.js
├── data/
│   └── content.js
├── App.jsx
└── main.jsx
```

Also create this in the project root:

```
public/
└── assets/
    ├── .gitkeep
    └── README.md     ← explain what files go here
```

Content of `public/assets/README.md`:
```
# Assets

Drop files here with these exact names:

hero.mp4      → hero section background video
resume.pdf    → resume (enables resume link in nav + contact)
og.png        → Open Graph image (1200×630)
favicon.png   → Site favicon (512×512)

No code changes needed. Files are picked up automatically.
```

---

## STEP 5 — CONTENT FILE

Create `src/data/content.js` — populate it using ONLY the content from `memory.md`.
Do not invent any names, descriptions, numbers, or copy. Extract exactly what is written.

```js
export const person = {
  name: 'Aman Jangir',
  github: 'https://github.com/AmanJ24',
  linkedin: 'https://linkedin.com/in/aman-jangir', 
  email: 'work.amanjangir@gmail.com',
}

export const statement = `I build things. I also spend a lot of time figuring out where they go wrong.`

export const marqueeDevSkills = ['React', 'TypeScript', 'Python', 'Rust', 'Node.js', 'Next.js', 'Tailwind', 'Vite', 'Supabase', 'PostgreSQL']

export const marqueeSecSkills = ['Burp Suite', 'nmap', 'ffuf', 'Metasploit', 'Wireshark', 'Gobuster', 'IDOR', 'JWT attacks', 'OSINT', 'Tor']

export const projects = [
  {
    id: '01',
    name: 'Entrustory',
    oneliner: 'Cryptographically signed document certificates anyone can verify.',
    description: 'Issues tamper-proof certificates using Ed25519 signatures and lets anyone verify authenticity through a public link. Exports signed PDFs with no third-party dependency required.',
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind', 'Supabase', 'Web Crypto API', 'jsPDF'],
    github: 'https://github.com/AmanJ24/entrustory', // add repo
  },
  {
    id: '02',
    name: 'BlackSignal',
    oneliner: 'Threat intelligence pipeline that routes through Tor and maps to MITRE ATT&CK.',
    description: 'Async DAG that pulls IOCs from raw text, isolates traffic through Tor circuits, enriches findings with VirusTotal and AbuseIPDB, and tags each IOC to ATT&CK techniques using NER. 29 tests passing.',
    stack: ['Python', 'asyncio', 'Tor', 'spaCy', 'VirusTotal API', 'AbuseIPDB', 'MITRE ATT&CK'],
    github: 'https://github.com/AmanJ24/blacksignal', // add repo
  },
  {
    id: '03',
    name: 'AURA',
    oneliner: 'A local AI layer that runs on your machine, not someone else\'s server.',
    description: 'Event-driven system built on Tauri and Ollama — local LLM routing, on-demand vision model, vector search via sqlite-vec, and Unix socket auth. Fully offline.',
    stack: ['Rust', 'Tauri', 'Python', 'Ollama', 'sqlite-vec', 'Moondream2'],
    github: 'https://github.com/AmanJ24/aura', // add repo
  },
  {
    id: '04',
    name: 'PhishGuard',
    oneliner: 'Phishing simulation platform with multi-tenant campaign management.',
    description: 'GoPhish-backed dashboard with a Next.js frontend — supports multiple tenants, role-based access control, and campaign analytics out of the box.',
    stack: ['Next.js 14', 'GoPhish', 'MongoDB', 'Prisma', 'TypeScript'],
    github: 'https://github.com/AmanJ24/phishguard', // add repo
  },
]

export const numbers = [
  { value: '9.6',     label: 'CGPA' },
  { value: 'Top 1%',  label: 'TryHackMe · Global' },
  { value: '4',       label: 'Projects Built' },
  { value: '29',      label: 'Tests Passing · BlackSignal' },
]

export const about = {
  p1: `I build software and I study how it breaks. Not as two separate things — as the same thing looked at from both sides. That's what keeps the work interesting.`,
  p2: `My focus right now is full-stack development and application security. The projects I build tend to sit at that intersection — something useful, built with some thought about what an attacker would do with it.`,
  meta: [
    { label: 'Open to', value: 'Full-time · Internship · Remote' },
    { label: 'GitHub',  value: 'AmanJ24' },
  ],
}

export const approach = [
  { num: '001', text: 'I read the docs before I start guessing.' },
  { num: '002', text: 'I ship something that works, then make it better.' },
  { num: '003', text: 'I build with the question of how I\'d break it already in mind.' },
  { num: '004', text: 'I don\'t list a skill I can\'t back up in a conversation.' },
  { num: '005', text: 'The best code I\'ve written is the code I later deleted.' },
]

export const skills = {
  dev: [
    { category: 'Languages',  items: ['JavaScript', 'TypeScript', 'Python', 'Rust'] },
    { category: 'Frontend',   items: ['React', 'Next.js', 'Tailwind CSS', 'Vite', 'Framer Motion'] },
    { category: 'Backend',    items: ['Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'Supabase', 'MongoDB'] },
    { category: 'Tooling',    items: ['Git', 'Docker', 'Linux', 'Vercel', 'Prisma'] },
  ],
  security: [
    { category: 'Offensive',    items: ['Burp Suite', 'nmap', 'ffuf', 'Metasploit', 'Gobuster', 'Wireshark'] },
    { category: 'Knowledge',    items: ['IDOR/BOLA', 'SSRF', 'JWT attacks', 'Mass Assignment', 'AD basics', 'OSINT'] },
    { category: 'Environment',  items: ['Kali Linux', 'EndeavourOS', 'Warp Terminal', 'CTF platforms'] },
  ],
}

export const credentials = [
  { earned: true,  name: 'ISC2 Certified in Cybersecurity (CC)' },
  { earned: true,  name: 'TryHackMe — Jr. Pentester' },
  { earned: true,  name: 'TryHackMe - COMPTIA+ PENTEST' },

]

export const ctfs = [
  { event: 'TryHackMe - Industrial Intrusion CTF' },
  { event: 'HackTheBox - Apocalypse 2025' },
  { event: 'TryHackMe - HoneyNet Collapse' },
]

export const now = {
  items: [
    { label: 'Building',  value: 'AURA · PhishGuard' },
    { label: 'Studying',  value: 'Application security · eJPT prep' },
  ],
  lastUpdated: 'June 2026',
}
```

---

## STEP 6 — ASSET HOOK

Create `src/hooks/useAssets.js`:

```js
// Checks which optional assets are present at build/runtime
// Uses import.meta.glob to detect files in /public/assets/

export function useAssets() {
  // Vite static asset detection
  const hasHeroVideo = import.meta.env.VITE_HAS_HERO === 'true'
    || checkAsset('/assets/hero.mp4')
  const hasResume    = checkAsset('/assets/resume.pdf')

  return { hasHeroVideo, hasResume }
}

function checkAsset(path) {
  // In production, attempt a HEAD request or use a build-time env var.
  // For development, set VITE_HAS_HERO=true in .env.local when hero.mp4 is present.
  try {
    const allAssets = import.meta.glob('/public/assets/*', { eager: true })
    return Object.keys(allAssets).some(k => k.includes(path.replace('/assets/', '')))
  } catch {
    return false
  }
}
```

Also create `.env.local` with:
```
VITE_HAS_HERO=false
VITE_HAS_RESUME=false
```

Instructions: Set these to `true` when you add the corresponding files to `/public/assets/`.

---

## STEP 7 — BUILD EACH SECTION

Build sections in this order. Complete each fully before starting the next.
Follow Design.md for layout patterns. Use content.js for all text — never hardcode copy.

### Order:
1. `CustomCursor.jsx` — build this first, it affects the whole site feel
2. `Nav.jsx` — transparent on hero, solid after scroll, resume link conditional on `hasResume`
3. `Hero.jsx` — video background (conditional on `hasHeroVideo`), dark gradient fallback, name overlay
4. `Statement.jsx` — large centered text + dual marquee strips
5. `Projects.jsx` — GSAP pinned horizontal scroll, 4 panels
6. `Numbers.jsx` — 4 animated counters, GSAP count-up on scroll enter
7. `About.jsx` — split layout, large decorative "About" text left, content right
8. `Approach.jsx` — numbered list, large type, sand gold on numbers
9. `Credentials.jsx` — two skills columns + earned credentials column + CTF list
10. `Now.jsx` — live dot, three current activity lines, last-updated stamp
11. `Contact.jsx` — full bleed, email in huge type, two icon links
12. `Footer.jsx` — single line, minimal

### For EVERY section:
- Import content from `src/data/content.js` — never write copy inline
- Add `data-section` attribute for GSAP targeting
- Wrap scroll animations in `useEffect` with `ScrollTrigger` cleanup on unmount
- Test that `prefers-reduced-motion` disables all animations

---

## STEP 8 — CUSTOM CURSOR SPEC

`CustomCursor.jsx` requirements:
- Default: 18px filled circle, `#BFA98A` color
- Moves with 0.1s lag behind actual mouse (GSAP `quickTo` or lerp)
- On `<a>` and `<button>` hover: expands to 36px, becomes outline only (no fill), shows label "open" in 9px mono inside
- On hero video hover: shows label "watch" instead of "open"
- Hidden on touch devices (`pointer: coarse`)
- The real cursor (`cursor: none`) must be hidden globally via CSS (already done in index.css)

---

## STEP 9 — LENIS SETUP

In `src/hooks/useLenis.js`:

```js
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])
}
```

Call `useLenis()` once inside `App.jsx`.

---

## STEP 10 — HERO VIDEO LOGIC

Inside `Hero.jsx`:

```jsx
// If hero.mp4 is present → render video
// If not → render dark gradient fallback

{hasHeroVideo ? (
  <video
    src="/assets/hero.mp4"
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  />
) : (
  <div className="absolute inset-0 bg-gradient-to-b from-surface to-bg" />
)}

{/* Vignette overlay — always present */}
<div
  className="absolute inset-0"
  style={{ background: 'rgba(9,8,10,0.45)' }}
/>
```

---

## STEP 11 — HORIZONTAL SCROLL (Projects)

Use GSAP ScrollTrigger's horizontal pinning pattern:

```js
useEffect(() => {
  const panels = gsap.utils.toArray('.project-panel')
  const totalWidth = panels.length * window.innerWidth

  gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.projects-container',
      pin: true,
      scrub: 1,
      snap: 1 / (panels.length - 1),
      end: () => `+=${totalWidth}`,
    },
  })

  return () => ScrollTrigger.getAll().forEach(t => t.kill())
}, [])
```

Each panel: `min-width: 100vw; height: 100vh; flex-shrink: 0`

---

## STEP 12 — QUALITY CHECKS (run before calling done)

- [ ] All copy matches `memory.md` exactly — no invented text
- [ ] No college name, location, or future plans appear anywhere
- [ ] No "planned" credentials shown anywhere on site
- [ ] Resume link only visible when `hasResume` is true
- [ ] Hero video only plays when `hasHeroVideo` is true; fallback renders otherwise
- [ ] All GSAP ScrollTriggers are cleaned up on component unmount
- [ ] `prefers-reduced-motion` disables animations — test this
- [ ] Custom cursor hidden on mobile/touch
- [ ] Site is fully responsive — test at 375px, 768px, 1280px, 1920px
- [ ] No `cursor: auto` or `cursor: pointer` anywhere — custom cursor handles all states
- [ ] `console.log` and debug artifacts removed
- [ ] Runs without errors: `npm run build`

---

## CONSTRAINTS FOR THE AI IDE

```
✓  Read memory.md, Design.md, and SKILL.md before writing any code
✓  All copy comes from content.js which comes from memory.md
✓  Follow Design.md layout patterns section by section
✓  Follow SKILL.md design principles for visual decisions
✓  Use the exact color tokens specified in Step 2
✓  Assets are conditional — never assume hero.mp4 or resume.pdf exists
✗  Do not install unnecessary packages
✗  Do not use CSS frameworks other than Tailwind
✗  Do not hardcode any personal copy inside JSX — always import from content.js
✗  Do not use placeholder copy, lorem ipsum, or invented text
✗  Do not add sections not specified in memory.md
✗  Do not add visual decoration that isn't in the design reference
```

---

*End of build prompt.*
