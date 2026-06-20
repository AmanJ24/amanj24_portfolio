# amanjangir.vercel.app — implementation spec

Everything below is final. Decisions have been made, not offered as options, so this can go straight to an IDE agent as a work order. Each item has the exact current text, the exact replacement, where it sits on the page, and why.

No em dashes used anywhere in the new copy, to match existing style.

---

## 0. Routing fix (do this first, it's not a copy change)

**Problem:** Direct navigation to `/projects`, `/experience`, `/credentials`, `/contact` returns a Vercel 404. The app is a client-side router with no server-side rewrite, so anything other than landing on `/` and clicking through breaks.

**Fix:** Create (or update) `vercel.json` at the project root:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

If a `vercel.json` already exists, add the `rewrites` key without removing whatever else is already in there. Redeploy after this change and re-test all four routes by pasting the URL directly into a fresh browser tab (not by clicking through the nav).

---

## 1. HOME page

### 1.1 Hero tagline — reorder
**Location:** Directly under the name "Aman Jangir," above the divider line.

**Find:**
```
Developer · Security
```

**Replace with:**
```
Security · Developer
```

**Why:** The job search this site supports is security-first (VAPT, pentest, red team). The first three words anyone reads should match the job being asked for.

---

### 1.2 Hero quote — replace entirely
**Location:** Below the tagline, above the tech stack icon row. Same position, same styling, just different text.

**Find:**
```
The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards.
```

**Replace with:**
```
I build things. Then I go looking for the part that fails.
```

**Why:** The old line is a well-known, widely recycled security-community quote (unattributed on the site). It's the first thing a visitor reads and it isn't yours. The new line is short, true, and does the same job the old one was trying to do, just honestly.

---

### 1.3 About section — both paragraphs, full replace
**Location:** "ABOUT" section heading stays as-is. Replace only the two paragraphs underneath it. Order stays the same (paragraph 1, then paragraph 2). The "Open to / Full-time · Internship · Remote" line and "GitHub / AmanJ24" line directly below stay exactly as they are, don't touch those.

**Find (paragraph 1):**
```
I am a full-stack engineer and application security researcher. I approach software development and security auditing not as separate disciplines, but as two perspectives of the same system. Building a functional application is only half the work; the other half is understanding its failure modes and securing its boundaries.
```

**Find (paragraph 2):**
```
My technical focus lies in designing robust architectures with Rust, Go, and TypeScript, and auditing system boundaries for cryptographic, logical, and network flaws. I build tools that solve concrete problems while actively designing against potential threat vectors.
```

**Replace both with (two paragraphs, in this order):**
```
I'm a full-stack developer who got pulled toward security the way most people in this field do: by wanting to know why things break, not just how to make them work.

I build real systems. A signing platform that proves a document hasn't been tampered with. A threat-intel pipeline that routes through Tor. A local AI assistant that never sends your data anywhere. Then I go looking for the same kind of flaws in other people's code. Broken auth. Leaky APIs. The small logic gaps nobody notices until someone goes looking.

Right now that mostly means hands-on labs, CTFs, and my own projects. I'm a fresher, and I'd rather say that plainly than dress it up. I've put in real hours though, and I'm looking for a team where I can put them to use.
```

**Why:** "Application security researcher" is a strong title with no published findings, bug bounty submissions, or write-ups to back it up yet. The second paragraph was generic security-LinkedIn phrasing that could describe almost anyone. The new version names actual shipped projects, states the fresher status directly instead of hoping nobody notices, and still closes on intent and ambition.

---

### 1.4 Security Labs — panel 3 only
**Location:** Third panel in the "Security Labs" grid, numbered `003`. Panels `001` (Cryptographic Auditing) and `002` (Circuit Proxy Sandbox) stay exactly as they are, do not touch them. Panel 3 keeps its position (third, same slot) but its content changes completely.

**Find (entire panel 3 block):**
```
003
// SEC_LAB_PROTO
Vulnerability Detection
Executing real-time memory stack boundary audits and secure Unix domain authentication.
// STACK_AUDITOR
SHIELD: ACTIVE
REG_EBP_0 0x7FFF [OK]
REG_EBP_1 0x1C2B [OK]
REG_EBP_2 0x00FF [OK]
```

**Replace with:**
```
003
// SEC_LAB_PROTO
Local Inference Engine
Routing voice, vision, and intent events through an on-device model pipeline. Nothing leaves the machine.
// AURA_ROUTER
STATE: LISTENING
MODEL: LOCAL_LLM [OK]
BUS: EVENT_DRIVEN [OK]
```

**Why:** The old panel 3 was invented technical detail (the hex register values are fabricated and don't map to any real project of yours). This one describes AURA, which is real and currently in active development, using the same visual format as the two panels you're keeping.

---

### 1.5 "NOW" section — live log lines
**Location:** Inside the terminal-style log block under "NOW," the four rotating `[OK]` lines. Keep the timestamp formatting and `[OK]` prefix exactly as the current implementation generates them, only change the message text. Keep them in this order.

**Find (the four log messages, may repeat or rotate in current build):**
```
MITRE ATT&CK database circuit mapping verified
MITRE ATT&CK database circuit mapping verified
MITRE ATT&CK database circuit mapping verified
Vector similarity store sqlite-vec: CONNECTED
```

**Replace with (four distinct lines, no repeats):**
```
AURA event bus: listening
sqlite-vec index sync: complete
BlackSignal Tor circuit: isolated
Ed25519 signing keys: valid
```

**Why:** "MITRE ATT&CK database circuit mapping" isn't a real operation, it's invented jargon. The replacement lines are all true, current, and tied to actual systems (AURA, BlackSignal, Entrustory).

**Leave unchanged:** the "BUILDING: AURA · PhishGuard" and "STUDYING: Application security · eJPT prep" lines just above the log block. Those are accurate as-is.

---

## 2. WORK / PROJECTS page (`/projects`)

**Leave unchanged:** all four project titles, one-liners, and tech tags (Entrustory, BlackSignal, AURA, PhishGuard). These are already strong, don't touch the wording.

### 2.1 Footer line
**Location:** Bottom of the page, below the four project cards.

**Find:**
```
MORE RESEARCH COMING SOON.
```

**Replace with:**
```
MORE ON THE WAY.
```

**Why:** "Research" implies a kind of formal output (write-ups, findings) that isn't published yet. "More on the way" says the same thing without the implied claim.

---

## 3. EXPERIENCE page (`/experience`)

**Leave unchanged:** the stats block (Global Rank #7,188 / Top 1% / 305 Rooms Completed / 37 Badges) and the "Core Specializations" block (Diamond League Member, Path Completions, Hands-on Labs). All factual, no changes needed.

### 3.1 Section heading
**Location:** Heading above the timeline entry.

**Find:**
```
TIMELINE OF AUDITING & PENTESTING
```

**Replace with:**
```
TRAINING LOG
```

### 3.2 Timeline entry — full replace
**Location:** Directly below the heading from 3.1. Same position, same single entry, same date range start.

**Find:**
```
2025 - PRESENT
Cybersecurity Analyst & Pentester
TRYHACKME (OFFENSIVE/DEFENSIVE LABS)

Investigated network infrastructures and audited web applications. Built automated logging pipelines and mapped vulnerabilities using MITRE ATT&CK techniques in real-world simulation labs.

✦ Ranked in the top 1% globally among millions of security practitioners.
✦ Completed Jr. Pentester and CompTIA PenTest+ training paths.
✦ Solved 305 capture-the-flag (CTF) and training rooms focusing on secure protocols and exploit research.
```

**Replace with:**
```
2025 - PRESENT
Offensive Security Practice, TryHackMe

305 rooms across network exploitation, web application vulnerabilities, Active Directory attacks, and buffer overflows, mapped against MITRE ATT&CK as I went.

✦ Top 1% globally, out of several million users.
✦ Completed the Jr. Pentester and CompTIA PenTest+ learning paths.
✦ This is practice, not employment. But it's a year of consistent reps in exactly the areas I want to work in.
```

**Why:** The old entry is formatted exactly like a job (title, company-style name, date range, achievement bullets) for what is actually self-directed training on a learning platform. Security hiring managers are specifically trained to catch this pattern, and the real numbers don't need the disguise. The new version states it plainly and turns "I don't have a job yet" into "I've already put in a year of consistent work," which is the stronger and truer position.

---

## 4. CREDENTIALS page (`/credentials`)

**Leave unchanged:** all skill category lists (Languages, Frontend, Backend, Systems, Defensive, Offensive, Environment) and the "CTF Participation" block. All accurate, no changes needed.

### 4.1 Split "Earned Credentials" into two groups
**Location:** Where the single "EARNED CREDENTIALS" block currently sits, directly above "CTF Participation." Replace that one block with two blocks, in this order: Certifications first, then Training Paths Completed. Keep "CTF Participation" below both, unchanged.

**Find:**
```
EARNED CREDENTIALS
✓ ISC2 Certified in Cybersecurity (CC) — VERIFIED
✓ TryHackMe — Jr. Pentester — VERIFIED
✓ TryHackMe - COMPTIA+ PENTEST — VERIFIED
```

**Replace with:**
```
CERTIFICATIONS
✓ ISC2 Certified in Cybersecurity (CC) — VERIFIED

TRAINING PATHS COMPLETED
✓ TryHackMe — Jr. Pentester
✓ TryHackMe — CompTIA PenTest+
```

**Why:** ISC2 CC is a real third-party certification. The two TryHackMe entries are learning-path completions on a training platform. Grouping them together under one "credentials" label blurs a real cert with a training badge, same underlying issue as the Experience page, smaller scale here.

---

## 5. CONTACT page (`/contact`)

**Location:** Directly below the email address, above the GitHub / LinkedIn / Email links.

**Find:** (nothing currently exists between the "Open to full-time, internships, and remote opportunities." line and the link row, this is a pure addition, not a replacement)

**Add this line in that gap:**
```
I read everything that lands here.
```

**Why:** Small, human, doesn't change anything else on an already-clean page.

---

## Summary table

| Page | Section | Change type |
|---|---|---|
| Home | Hero tagline | Reorder words |
| Home | Hero quote | Full replace |
| Home | About, paragraph 1 + 2 | Full replace |
| Home | Security Labs, panel 3 | Full replace |
| Home | NOW log lines | Full replace |
| Work | Footer line | Full replace |
| Experience | Section heading | Full replace |
| Experience | Timeline entry | Full replace |
| Credentials | Earned Credentials block | Split into two blocks |
| Contact | Below email line | Addition only |
| Site-wide | Routing | Add `vercel.json` rewrite |

Everything not listed above (project one-liners, stats blocks, skill lists, CTF participation list, "Building/Studying" lines) stays exactly as it is. Those were already in good shape.
