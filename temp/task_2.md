## 6. CREDENTIALS page (`/credentials`) — skills panel reorder and refinement

Two terminal-style blocks currently exist: `aman@jangir:~/development` and `aman@jangir:~/security`. This section covers swapping their position and rewriting the security-side categories. The development-side categories (Languages, Frontend, Backend) stay completely untouched except for one addition noted in 6.6.

---

### 6.1 Swap block order: security left, development right

**Find (current order, security block second):**
```
aman@jangir:~/development
[Languages / Frontend / Backend / Systems block]

aman@jangir:~/security
[Defensive / Offensive / Environment block]
```

**Replace with (security block first):**
```
aman@jangir:~/security
[Offensive / Defensive / Environment block — see 6.2 for sub-order]

aman@jangir:~/development
[Languages / Frontend / Backend / Systems block]
```

**Why:** The site now leads with security everywhere else (Home tagline already changed to "Security · Developer"). The skills page should follow the same priority.

**Implementation note:** If the two-column layout is built with CSS grid/flex `order` properties rather than literal DOM order, swap the `order` values instead of moving the JSX blocks. Whichever matches how the component is actually structured.

---

### 6.2 Reorder sub-categories inside the security block: Offensive before Defensive

**Find (current sub-order):**
```
Defensive
[items]
Offensive
[items]
Environment
[items]
```

**Replace with:**
```
Offensive
[items, see 6.3]
Defensive
[items, see 6.4]
Environment
[items, see 6.5]
```

**Why:** The stated career direction is offensive security, pentest, red team first. Leading with Offensive matches that, same logic as 6.1.

---

### 6.3 Offensive — refine and extend

**Find:**
```
Offensive
Phishing Simulation
Auth & RBAC Auditing
API Security Testing
Burp Suite
Nmap
Ffuf
```

**Replace with:**
```
Offensive
Web App Pentesting (OWASP Top 10)
API Security Testing
Active Directory Attacks
Buffer Overflow Exploitation
Auth & RBAC Auditing
Phishing Simulation
Burp Suite
Nmap
Ffuf
Gobuster
```

**Why:** Added Web App Pentesting and OWASP Top 10 since those are the actual umbrella skills the rest of the list sits under, and they're already on the resume so the site should match. Added Active Directory Attacks and Buffer Overflow Exploitation, both real hands-on lab work from the TryHackMe track on the Experience page, currently not reflected anywhere on the Skills page. Added Gobuster alongside Ffuf since both are on the resume's tool list already, keeping the site consistent with it.

---

### 6.4 Defensive — refine, remove duplicates

**Find:**
```
Defensive
Threat Intel Pipelines
MITRE ATT&CK Mapping
Asymmetric Cryptography
Tor Routing Isolation
Secure IPC Sockets
SOCKS5 Proxying
```

**Replace with:**
```
Defensive
Threat Intel Pipelines
MITRE ATT&CK Mapping
IOC Extraction (spaCy NER)
Tor Routing Isolation
Network Traffic Analysis (Wireshark)
Vulnerability Assessment
Asymmetric Cryptography
```

**Why:** "Secure IPC Sockets" and "SOCKS5 Proxying" are dropped because they just restate "Unix Sockets" and "SOCKS5 Proxies," which are already listed under Systems on the development side. Same two concepts were appearing twice across the page. Added IOC Extraction (the spaCy NER work currently buried under Environment, moved here since it's a defensive/threat-intel skill, not an environment setting), Network Traffic Analysis since Wireshark shows up in hands-on lab work but wasn't listed anywhere, and Vulnerability Assessment since it's the umbrella skill the rest of this category sits under.

---

### 6.5 Environment — trim to what's actually security-specific

**Find:**
```
Environment
Kali Linux
EndeavourOS
Warp Terminal
CTF Platforms
spaCy NLP
```

**Replace with:**
```
Environment
Kali Linux
CTF Platforms
SecLists
```

**Why:** EndeavourOS and Warp Terminal are the general development environment, not security tooling. They're moved to Systems on the development side instead, see 6.6. spaCy moved into Defensive as IOC Extraction (6.4), since it's a skill, not an environment. Added SecLists since it's a real part of the recon workflow and was missing. This category is now short and purely security-relevant instead of being a catch-all.

---

### 6.6 Systems (development side) — receives the two moved items

**Find:**
```
Systems
Tauri
Unix Sockets
SOCKS5 Proxies
Git
Docker
Linux
```

**Replace with:**
```
Systems
Tauri
Unix Sockets
SOCKS5 Proxies
Git
Docker
Linux
EndeavourOS
Warp Terminal
```

**Why:** These are your actual daily-driver environment, general development setup, not security tools. They belong with Git/Docker/Linux, not mixed into the security block.

---

### Summary table (append to existing table)

| Page | Section | Change type |
|---|---|---|
| Credentials | Block order | Security block moves left, development block moves right |
| Credentials | Security sub-order | Offensive moves above Defensive |
| Credentials | Offensive list | Refined and extended (10 items) |
| Credentials | Defensive list | Refined, duplicates with Systems removed (7 items) |
| Credentials | Environment list | Trimmed to security-only items (3 items) |
| Credentials | Systems list (dev side) | Gains EndeavourOS and Warp Terminal |

Languages, Frontend, and Backend categories on the development side are untouched.
