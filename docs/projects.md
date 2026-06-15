# projects.md — Aman Jangir
> Detailed content and showcase specifications for the Projects page and individual project pages.
> Feed alongside memory.md and Design.md at the start of every build session.
> All content here is accurate. Do not invent features, metrics, or capabilities.

---

## PAGE ARCHITECTURE

Two-tier structure:

```
/projects              → listing page — all 4 projects
/projects/entrustory   → individual case study
/projects/blacksignal  → individual case study
/projects/aura         → individual case study
/projects/phishguard   → individual case study
```

Both tiers follow the same dark design system from memory.md.
Same color tokens, same typography, same cursor, same Lenis scroll.

---

## LISTING PAGE — /projects

### Layout

```
┌─────────────────────────────────────────────┐
│  PROJECTS PAGE HERO                         │
│  "Work" in huge display type                │
│  Subtitle: "Four things I've built."        │
│  Tag filter row below                       │
├─────────────────────────────────────────────┤
│  FEATURED ROW — full width                  │
│  Entrustory (left, large) + AURA (right)    │
├─────────────────────────────────────────────┤
│  SECONDARY ROW                              │
│  BlackSignal (left) + PhishGuard (right)    │
├─────────────────────────────────────────────┤
│  FOOTER STRIP                               │
│  "More coming." in muted mono               │
└─────────────────────────────────────────────┘
```

### Page Hero Component

```
Section header (mono, muted, small): "Selected work"
Title: "Work." — display serif, hero size, left-aligned
Subtitle (muted): "Four things I've built."

Tag filter (below title, horizontally scrollable):
  [ All ]  [ Security ]  [ Dev Tools ]  [ AI / Local ]  [ Web ]

Tags filter the project cards below — instant, no page reload.
Active tag: --color-accent color, --color-border border
Inactive tag: --color-surface-2 bg, --color-muted text
```

### Project Card — Large Variant (Entrustory, AURA)

```
Dimensions : half-width on desktop, full-width on mobile
Height     : 480px desktop

Structure:
┌──────────────────────────────────┐
│ [Visual Area — top 60%]          │
│  Project-specific illustration   │
│  or abstract visual (see below)  │
│                                  │
│                        // 01     │  ← mono, top-right
├──────────────────────────────────┤
│ Project Name          [↗ GitHub] │  ← display serif + icon
│ One-liner in muted text          │
│                                  │
│ [tag] [tag] [tag]    View →      │
└──────────────────────────────────┘

Hover behavior:
- Card lifts 6px (translateY)
- Visual area slightly scales up (scale 1.03)
- Bottom border animates to --color-accent
- "View →" text slides right 4px

On click: routes to /projects/[slug]
```

### Project Card — Small Variant (BlackSignal, PhishGuard)

```
Same structure, slightly smaller visual area (50% height).
Two cards sit side by side in a row.
```

### Visual Areas Per Card (see individual project sections for detail)

```
Entrustory  → Animated certificate document being stamped/signed
AURA        → Rotating system diagram with connected nodes
BlackSignal → Pulsing network graph with IOC nodes
PhishGuard  → Mini dashboard UI mockup
```

---

## INDIVIDUAL PROJECT PAGES

Each project page uses the same section structure. Content fills in per project.

### Standard Page Anatomy

```
01  PROJECT HERO        full viewport — name, tagline, key stats, links
02  OVERVIEW            what it is and why it exists
03  HOW IT WORKS        architecture or process explained visually
04  TECHNICAL DETAILS   stack breakdown, key decisions
05  SHOWCASE            the most interesting/visual component per project
06  WHAT I LEARNED      honest, specific — one short paragraph
07  LINKS               GitHub, live URL if applicable, related
```

---

## PROJECT 01 — ENTRUSTORY

```
Slug        : /projects/entrustory
Name        : Entrustory
Tags        : Security · Web · Dev Tools
One-liner   : Cryptographically signed document certificates anyone can verify.
GitHub      : github.com/AmanJ24/[repo]
Live        : [Vercel URL if public]
```

### Hero Section

```
Background      : Dark, --color-surface
Left column     : Project name "Entrustory" in display serif, hero size
                  Tag: "Document Security"
                  Tagline below: "Issue and verify tamper-proof certificates.
                                  No blockchain. No third party. Just math."
                  Two buttons: [GitHub ↗]  [Live Demo ↗]

Right column    : The CERTIFICATE MOCKUP component (see Showcase below)

Key stats strip (below hero, 3 numbers inline):
  Ed25519     → "Signature algorithm"
  1 click     → "Public verification"
  0           → "Third-party dependencies"
```

### Overview

```
The problem:
Most document signing workflows require a third-party service — DocuSign, Adobe Sign,
a blockchain. They all involve trusting someone else's infrastructure.

What Entrustory does:
Issues tamper-proof certificates using Ed25519 asymmetric cryptography via the Web
Crypto API — entirely in the browser, no server-side key handling. Anyone with the
certificate link can verify it independently through a public verification page.
Exports as a signed PDF.
```

### How It Works — Visual Component

**Component: Vertical pipeline with 4 steps, connected by animated dashed line**

```
Step 1: [UPLOAD]
  User uploads a document or enters certificate data
  Icon: document outline

Step 2: [SIGN]
  Ed25519 key pair generated in-browser via Web Crypto API
  Private key never leaves the browser session
  Icon: key

Step 3: [ISSUE]
  Certificate record stored in Supabase with public key + signature hash
  PDF generated with embedded signature via jsPDF
  Icon: certificate

Step 4: [VERIFY]
  Anyone visits the public /verify/[id] URL
  Signature checked against stored public key
  Tamper-evident: any change to the doc invalidates the cert
  Icon: checkmark

Animation: dashed line draws itself downward on scroll-enter (GSAP drawSVG)
Each step fades in sequentially as the line reaches it.
```

### Technical Details

```
Stack breakdown (grouped by concern):

FRONTEND
  React 19 · Vite 7 · TypeScript · Tailwind CSS

CRYPTOGRAPHY
  Web Crypto API (native browser — no crypto library)
  Ed25519 signature scheme
  SHA-256 document hashing before signing

STORAGE & BACKEND
  Supabase (Postgres) — certificate records, public keys
  Row-level security — issuers can only read their own certs

DOCUMENT GENERATION
  jsPDF — PDF export with embedded metadata
  Certificate template rendered as HTML → PDF

DEPLOYMENT
  Vercel — frontend
  Supabase — managed backend

KEY TECHNICAL DECISION:
"Using the Web Crypto API instead of a JS crypto library means the cryptographic
operations are handled by the browser's native implementation — faster, sandboxed,
and no supply-chain risk from an npm package."
```

### Showcase Component — Certificate Mockup

```
Component: AnimatedCertificate.jsx

A mock certificate card rendered in HTML/CSS:
┌─────────────────────────────────────────────┐
│  ▣  ENTRUSTORY                              │
│  ─────────────────────────────────────────  │
│                                             │
│  Certificate of Authenticity                │
│                                             │
│  This document certifies that the           │
│  attached record has been cryptographically │
│  signed and has not been altered.           │
│                                             │
│  Issued:     June 2025                      │
│  Algorithm:  Ed25519                        │
│  Hash:       a3f9...c812   [VERIFIED ✓]     │
│                                             │
│  ─────────────────────────────────────────  │
│  [Signature block — animated line drawing]  │
└─────────────────────────────────────────────┘

On load animation:
1. Border draws itself (SVG stroke animation, 1.2s)
2. Text fades in line by line (staggered, Framer Motion)
3. "VERIFIED ✓" pulses once in --color-sage
4. Signature line draws itself left to right

On hover: card subtly rotates 2deg and lifts (perspective transform)

Color: --color-surface bg, --color-accent borders, --color-text content
```

### What I Learned

```
"Building with the Web Crypto API taught me how asymmetric cryptography actually
works at the implementation level — not just the theory. The verification flow forced
me to think about what 'tamper-evident' really means in a web context, and the
tradeoffs of keeping keys in-browser versus server-managed."
```

---

## PROJECT 02 — BLACKSIGNAL

```
Slug        : /projects/blacksignal
Name        : BlackSignal
Tags        : Security · Python · Intelligence
One-liner   : Threat intelligence pipeline that routes through Tor and maps to MITRE ATT&CK.
GitHub      : github.com/AmanJ24/[repo]
```

### Hero Section

```
Background  : --color-bg, with a very subtle animated particle network in the background
              (SVG nodes connected by thin lines, slow drift — CSS animation only, no canvas)

Left column:
  Name: "BlackSignal" display serif
  Tag:  "Threat Intelligence"
  Tagline: "Raw threat data in. MITRE-mapped intelligence out.
             Routes through Tor. Talks to no one it shouldn't."
  Button: [GitHub ↗]

Right column: PIPELINE ANIMATION (see Showcase below)

Key stats strip:
  29          → "Tests passing"
  3           → "Enrichment sources"
  Tor         → "Traffic isolation"
```

### Overview

```
The problem:
Threat intelligence is usually a manual process — copy an IP, paste into VirusTotal,
cross-reference a list, repeat. There's no pipeline that does the full thing:
extract → isolate → enrich → classify.

What BlackSignal does:
An async Python DAG (directed acyclic graph) that takes raw text containing
threat indicators, extracts IOCs (IPs, domains, hashes, URLs) using spaCy NER,
routes all enrichment traffic through isolated Tor circuits to avoid fingerprinting,
enriches against VirusTotal and AbuseIPDB, then maps each finding to a MITRE
ATT&CK technique. Output is a structured report per indicator.
```

### How It Works — Visual Component

**Component: Horizontal DAG pipeline diagram**

```
[RAW INPUT]  →  [IOC EXTRACTOR]  →  [TOR ROUTER]  →  [ENRICHER]  →  [ATT&CK MAPPER]  →  [REPORT]

Each node is a rounded rectangle.
Connecting arrows animate left to right on scroll enter (GSAP).
Below each node: small label explaining what happens there.

RAW INPUT
  Plain text, paste or file
  "Any unstructured text"

IOC EXTRACTOR
  spaCy NER model
  "Finds IPs, domains, hashes, URLs"

TOR ROUTER
  Isolated Tor circuits per request
  "Each enrichment call gets its own circuit"

ENRICHER
  VirusTotal API
  AbuseIPDB API
  "Reputation, malware history, abuse reports"

ATT&CK MAPPER
  MITRE ATT&CK pattern matching
  "Tags each IOC to known techniques"

REPORT
  Structured JSON output
  "One record per IOC, fully enriched"

Node hover: expands slightly, shows a mini code snippet of that stage's core logic
```

### Technical Details

```
Stack breakdown:

CORE PIPELINE
  Python · asyncio — concurrent IOC processing, async enrichment calls
  DAG architecture — each stage is a node, dependencies resolved automatically

NER / EXTRACTION
  spaCy — custom entity recognition for cybersecurity IOC types
  Regex fallback for patterns spaCy misses

NETWORK ISOLATION
  Tor (via stem library) — new circuit per enrichment source
  SOCKS5 proxy routing for all outbound calls

ENRICHMENT
  VirusTotal API v3 — file hashes, URLs, IPs, domains
  AbuseIPDB API v2  — IP reputation and abuse confidence score

THREAT MAPPING
  MITRE ATT&CK STIX data — local copy, no runtime API dependency
  Pattern matching maps enrichment results to technique IDs

TESTING
  29 passing tests across all pipeline stages
  Mocked external API calls — tests run fully offline

KEY TECHNICAL DECISION:
"Using a DAG instead of a linear pipeline means each IOC can be enriched
concurrently through multiple sources without blocking. Adding a new enrichment
source is a new node — it doesn't touch existing stages."
```

### Showcase Component — Live Terminal Simulation

```
Component: TerminalSimulator.jsx

A fake terminal window that plays back a simulated BlackSignal run.
Styled as a dark terminal panel with a mock title bar.

┌─ blacksignal ─────────────────────────────────────────┐
│ $ python main.py --input sample.txt --tor              │
│                                                        │
│ [*] Extracting IOCs from input...                      │
│ [+] Found: 3 IPs, 2 domains, 1 hash                   │
│                                                        │
│ [*] Initializing Tor circuits...                       │
│ [+] Circuit established: 185.x.x.x → exit node        │
│                                                        │
│ [*] Enriching 185.220.101.47 via VirusTotal...         │
│ [+] Malicious: 12/94 engines                           │
│ [→] ATT&CK: T1071.001 — Application Layer Protocol    │
│                                                        │
│ [*] Enriching evil-domain.ru via AbuseIPDB...          │
│ [+] Abuse confidence: 97%                              │
│ [→] ATT&CK: T1566.002 — Spearphishing Link            │
│                                                        │
│ [✓] Report written to output/report_2025-06.json       │
│ [✓] 29/29 pipeline tests passing                       │
│ █                                                      │
└────────────────────────────────────────────────────────┘

Animation: Lines type in one by one with a realistic delay.
           Cursor block blinks at end.
           Replay button bottom-right: "Run again →"
Fonts: JetBrains Mono throughout
Colors: --color-bg bg, --color-sage for [+] and [✓], --color-accent for [→]
        --color-muted for [*]
```

### What I Learned

```
"Building the Tor isolation layer taught me how SOCKS proxies work at the
network level, and why circuit isolation matters when you don't want a threat
actor's server to fingerprint your analyst's IP. The async DAG design was the
harder problem — getting concurrent enrichment right without race conditions
required thinking carefully about where shared state could exist."
```

---

## PROJECT 03 — AURA

```
Slug        : /projects/aura
Name        : AURA
Tags        : AI · Local · Systems · Rust
One-liner   : A local AI layer that runs on your machine, not someone else's server.
GitHub      : github.com/AmanJ24/[repo]
```

### Hero Section

```
Background  : --color-bg with a very slow, subtle rotating geometric shape
              (SVG — a hexagonal node graph that slowly rotates, opacity 0.06)

Left column:
  Name: "AURA" display serif, spaced
  Tag:  "Local AI Infrastructure"
  Tagline: "Everything runs on your hardware.
             LLM routing, vision, vector search, auth.
             No API keys. No cloud. No data leaving."
  Button: [GitHub ↗]

Right column: ARCHITECTURE DIAGRAM (see Showcase)

Key stats strip:
  100%     → "Local — no external API"
  Rust     → "Core runtime"
  Phase 7.5 → "Current build"
```

### Overview

```
The problem:
Every AI assistant sends your data somewhere. Even "private" tools often
batch-process requests through external APIs. There's no mainstream option
that is fully local, modular, and actually usable on consumer hardware.

What AURA does:
An event-driven AI operating layer built on Tauri (Rust) and Ollama. A local
LLM handles text tasks through intelligent routing. Moondream2 handles vision
tasks but is loaded on-demand only (not resident in memory). sqlite-vec handles
vector search locally. A Unix socket with auth handles inter-process communication.
Phases 1–7 shipped. Currently in Phase 7.5 architectural overhaul.
```

### Architecture Overview (for the page copy)

```
WHAT CHANGED IN PHASE 7.5 (and why it matters):

Before: Polling-based architecture + Qwen2.5-3B router + ChromaDB + always-on Moondream2
After:  Event-driven architecture + direct routing + sqlite-vec + on-demand Moondream2

Why each change:
- Dropped polling → event-driven: polling burned CPU doing nothing between requests
- Dropped Qwen router → direct routing: a 3B model to route to another model was wasteful
- ChromaDB → sqlite-vec: one less process, same vector search, half the RAM
- Moondream2 on-demand: loaded when a vision task arrives, unloaded after — saves ~1.2GB RAM
```

### How It Works — Visual Component

**Component: Interactive Architecture Diagram**

```
Component: AuraArchDiagram.jsx

An SVG-based system diagram. Boxes connected by animated lines.
Clicking a box highlights it and shows a tooltip with detail.

                    ┌─────────────┐
                    │   Tauri App │  ← Rust core, event bus
                    │  (UI Shell) │
                    └──────┬──────┘
                           │ Unix socket (auth)
               ┌───────────┼───────────┐
               ▼           ▼           ▼
        ┌──────────┐  ┌─────────┐  ┌──────────────┐
        │  Ollama  │  │sqlite-  │  │  Moondream2  │
        │  (LLM)   │  │  vec    │  │  (on-demand) │
        └──────────┘  └─────────┘  └──────────────┘
         text tasks   vector store   vision tasks

Each box:
  - Default: --color-surface bg, --color-border border
  - Active/hover: --color-accent border, tooltip slides in from right

Tooltip content per node:
  Tauri App     → "Rust event bus. Routes incoming tasks to the right handler."
  Ollama        → "Local LLM (no API key). Handles text generation, summarization, Q&A."
  sqlite-vec    → "Vector similarity search. Stores embeddings locally. Replaced ChromaDB."
  Moondream2    → "Vision model. Loaded on task arrival, unloaded after. Saves ~1.2GB RAM idle."

Animate: lines draw in on scroll enter (GSAP drawSVG or stroke-dashoffset)
         boxes fade in staggered after lines
```

### Technical Details

```
Stack breakdown:

CORE RUNTIME
  Rust · Tauri — native app shell, event bus, IPC
  Unix socket + auth — secure inter-process communication

AI / LLM
  Ollama — local LLM serving (model-agnostic)
  Direct routing — no intermediate router model

VISION
  Moondream2 — lightweight vision model
  On-demand loading — only resident in memory when processing a vision task

VECTOR STORAGE
  sqlite-vec — SQLite extension for vector similarity search
  Replaced ChromaDB in Phase 7.5 (lighter, no separate process)

ARCHITECTURE PATTERN
  Event-driven — replaced polling in Phase 7.5
  Each incoming task emits an event, handlers subscribe and respond

PHASES SHIPPED
  Phase 1–7   : Core runtime, LLM integration, vector search, vision, auth
  Phase 7.5   : Architectural overhaul (in progress)
  Phase 8–12  : Planned

KEY TECHNICAL DECISION:
"Replacing ChromaDB with sqlite-vec was the highest-leverage change in Phase 7.5.
Same semantic search capability, one fewer background process, and the database is
just a file — no connection management, no service to restart."
```

### Showcase Component — Phase Timeline

```
Component: AuraPhaseTimeline.jsx

A horizontal scrolling timeline of AURA's build phases.
Each phase is a node on a track.

  1 ── 2 ── 3 ── 4 ── 5 ── 6 ── 7 ──[7.5]── 8 ── 9 ── 10 ── 11 ── 12
  ●    ●    ●    ●    ●    ●    ●    ◉         ○    ○     ○     ○     ○

● = shipped (--color-sage)
◉ = current / in progress (--color-accent, pulsing ring)
○ = planned (--color-muted)

Clicking any shipped phase node: expands a card below the timeline
with 2–3 sentences about what was built in that phase.

Current phase card (7.5) is pre-expanded on load.

Phase descriptions to fill in as phases complete.
Placeholder for phases 8–12: "Planned — details added on completion."
```

### What I Learned

```
"The Phase 7.5 overhaul taught me that architecture decisions compound.
The polling loop and always-on Moondream2 each seemed fine in isolation —
together they made the system feel heavy. Switching to event-driven forced me
to think about every operation as a response to a trigger, which also made
the codebase easier to reason about. Rust made the refactor painful to start
and reliable once done."
```

---

## PROJECT 04 — PHISHGUARD

```
Slug        : /projects/phishguard
Name        : PhishGuard
Tags        : Security · Web · Platform
One-liner   : Phishing simulation platform with multi-tenant campaign management.
GitHub      : github.com/AmanJ24/[repo]
```

### Hero Section

```
Background  : --color-bg with a very subtle grid pattern overlay
              (CSS background-image: repeating grid lines, opacity 0.04)

Left column:
  Name: "PhishGuard" display serif
  Tag:  "Security Awareness Platform"
  Tagline: "Run phishing simulations. Measure click rates.
             Train people before real attackers do."
  Button: [GitHub ↗]

Right column: DASHBOARD MOCKUP (see Showcase)

Key stats strip:
  Multi-tenant  → "Multiple orgs, isolated"
  RBAC          → "Role-based access"
  GoPhish       → "Backend engine"
```

### Overview

```
The problem:
GoPhish is a powerful phishing simulation engine but it has no multi-tenancy,
minimal UI, and no analytics layer. Running it for multiple clients means
running multiple instances with no shared management.

What PhishGuard does:
A Next.js dashboard that wraps GoPhish and adds what it's missing — multiple
organizations in one interface, role-based access so analysts can only see their
tenant's campaigns, and an analytics layer that tracks open rates, click rates,
and credential submission across campaigns. Prisma handles data modelling against
MongoDB. The backend approval is pending before it goes to production.
```

### How It Works

**Component: Three-column explanation layout**

```
Column 1: SIMULATE
  GoPhish backend runs the actual phishing campaigns
  — email sending, tracking pixels, credential capture pages
  PhishGuard configures and triggers GoPhish via its API

Column 2: MANAGE
  Next.js dashboard
  Multi-tenant: each org sees only their campaigns
  RBAC: Admin → Manager → Analyst permission tiers
  Campaign builder: target list upload, template selection, schedule

Column 3: MEASURE
  Analytics dashboard per campaign:
  — Emails sent / delivered
  — Open rate (pixel tracking)
  — Click rate (link tracking)
  — Credential submission rate
  All data isolated per tenant in MongoDB via Prisma
```

### Technical Details

```
Stack breakdown:

FRONTEND
  Next.js 14 (App Router) · TypeScript · Tailwind CSS

BACKEND / API
  Next.js API routes — REST endpoints for dashboard operations
  GoPhish API client — campaign creation, targeting, launch

DATABASE
  MongoDB — campaign data, tenant records, analytics events
  Prisma — ORM, schema management, type-safe queries

ARCHITECTURE
  Multi-tenant: tenant ID on every document, enforced at query layer
  RBAC: middleware-enforced role checks on every protected route
  GoPhish: runs as a separate service, PhishGuard talks to its REST API

KEY TECHNICAL DECISION:
"Keeping GoPhish as a separate service rather than embedding its logic into
the Next.js app meant we get all of GoPhish's battle-tested campaign delivery
for free. PhishGuard is purely the management and analytics layer on top."
```

### Showcase Component — Dashboard Mockup

```
Component: PhishGuardDashboard.jsx

A static but detailed UI mockup of the analytics dashboard.
Rendered as HTML/CSS — NOT a screenshot.

┌─ PhishGuard ─────────────────────────────────────────────┐
│  [Acme Corp ▾]   Campaigns   Users   Settings            │
├──────────────────────────────────────────────────────────┤
│  Q2 Phishing Assessment                    [Active ●]    │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │   247    │  │  61%     │  │  23%     │  │   8%    │ │
│  │  Sent    │  │  Opened  │  │  Clicked │  │ Creds   │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
│                                                          │
│  Click rate over time                                    │
│  ▁▂▃▅▆▇▇▅▄▃▂▁  (simple bar chart in CSS)               │
│                                                          │
│  Recent events                                           │
│  user@acme.com clicked link     2 min ago               │
│  user2@acme.com opened email    5 min ago               │
│  user3@acme.com submitted creds 8 min ago               │
└──────────────────────────────────────────────────────────┘

Styling: --color-surface bg, --color-border dividers
Stat boxes: small, clean, no gradients
Bar chart: CSS only, animated in on scroll (height grows from 0)
"Active ●" dot: --color-sage pulsing

This mockup is generated in JSX — it does not embed a screenshot.
All numbers in the mockup are illustrative, not real campaign data.
```

### What I Learned

```
"The multi-tenancy problem was more subtle than I expected. It's not just
filtering by org ID — it's making sure that filter is enforced at every layer:
the API route, the Prisma query, and the frontend routing. One missing check
and tenant A can see tenant B's data. Building RBAC on top of that added
another dimension: the same user can be an Admin in one tenant and an Analyst
in another. Prisma's type system caught most of the edge cases at compile time."
```

---

## CROSS-PROJECT COMPONENTS

These components appear across multiple project pages or on the listing page.

### TechStackGrid.jsx

```
A grouped display of technologies used in a project.
Groups: Frontend · Backend · Security · Tooling (only include relevant groups)

Each tech item:
  - Icon (simple SVG or text initial in a circle)
  - Tech name in mono
  - Optional: one-line role ("Async pipeline runtime")

Layout: horizontal scrolling row on mobile, 3-col grid on desktop
Hover: item lifts slightly, --color-accent border appears
```

### ProjectNav.jsx (on individual project pages)

```
Fixed bottom bar on individual project pages:
  ← Previous project    [● ● ● ●] dots    Next project →

Clicking dots: jumps to that project page
Clicking arrows: navigates to prev/next in order
Disappears on listing page.
```

### RelatedTag.jsx (filter tags)

```
Small pill tags used for filtering on listing page.
Used on each card to indicate category.

[ Security ]  [ AI / Local ]  [ Web ]  [ Python ]  [ Rust ]

Active state: --color-accent text, --color-border border, slight bg tint
```

### CodeWindow.jsx

```
A styled code snippet display — used in Technical Details sections.

┌─ [lang label] ──────────────────────────── [copy icon] ┐
│                                                         │
│  // code goes here                                      │
│                                                         │
└─────────────────────────────────────────────────────────┘

Syntax highlighting: Shiki or Prism (pick one, be consistent)
Copy button: copies to clipboard, label changes to "Copied ✓" for 2s
Font: JetBrains Mono
Background: --color-surface, --color-border outline
```

---

## PAGE TRANSITIONS

```
Route change (listing → project page):
  Outgoing page: fades out + slides up slightly (Framer Motion, 0.3s)
  Incoming page: fades in + slides up from below (0.3s, 0.1s delay)

No full-page flash. Background color (#09080A) is consistent
across all transitions so there's no white flash.

Implement with Framer Motion's AnimatePresence in App.jsx.
```

---

## ASSETS NEEDED PER PROJECT

```
/public/assets/projects/
├── entrustory/
│   └── og.png            ← 1200×630 OG image for /projects/entrustory
├── blacksignal/
│   └── og.png
├── aura/
│   └── og.png
└── phishguard/
    └── og.png

All visual showcase components (certificate, terminal, diagram, dashboard)
are built in JSX — they do not require image assets.
```

---

## SEO — INDIVIDUAL PROJECT PAGES

```
/projects/entrustory
  <title>Entrustory — Aman Jangir</title>
  <meta name="description" content="Cryptographically signed document certificates
  built with Ed25519 and the Web Crypto API.">

/projects/blacksignal
  <title>BlackSignal — Aman Jangir</title>
  <meta name="description" content="Threat intelligence pipeline with Tor isolation
  and MITRE ATT&CK mapping.">

/projects/aura
  <title>AURA — Aman Jangir</title>
  <meta name="description" content="A local AI operating layer built on Rust,
  Tauri, and Ollama. No cloud. No API keys.">

/projects/phishguard
  <title>PhishGuard — Aman Jangir</title>
  <meta name="description" content="Multi-tenant phishing simulation platform
  built on GoPhish with a Next.js dashboard.">
```

---

## CONTENT RULES (for AI IDE)

```
✓  All project names, descriptions, and stack details come from this file
✓  Numbers used: 29 (BlackSignal tests), Phase 7.5 (AURA current)
✓  All showcase components are built in JSX — no screenshots or placeholder images
✓  Dashboard mockup numbers are illustrative — add a small "(illustrative)" label
✓  CodeWindow snippets should be real representative code, not lorem code
✗  Do not add project statuses anywhere visible
✗  Do not invent metrics, features, or capabilities not listed here
✗  Do not use "production-ready," "enterprise," or similar inflated language
✗  Do not show planned AURA phases as completed
✗  Do not reference college, location, or personal background on project pages
```

---

*End of projects.md*
