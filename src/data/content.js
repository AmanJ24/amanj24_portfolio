export const person = {
  name: 'Aman Jangir',
  github: 'https://github.com/AmanJ24',
  linkedin: 'https://linkedin.com/in/aman-jangir',
  email: 'work.amanjangir@gmail.com',
}

export const statement = `The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards.`

export const marqueeDevSkills = ['React', 'TypeScript', 'Python', 'Rust', 'Node.js', 'Next.js', 'Tailwind', 'Vite', 'Supabase', 'PostgreSQL']

export const marqueeSecSkills = [
  'Threat Intelligence',
  'MITRE ATT&CK Mapping',
  'Asymmetric Cryptography',
  'Tor Circuit Isolation',
  'Phishing Simulation',
  'Application Security Auditing',
  'Secure IPC Sockets',
  'SOCKS5 Proxying',
  'Web Cryptography API',
  'Vulnerability Assessment'
]

export const projects = [
  {
    id: '01',
    slug: 'entrustory',
    name: 'Entrustory',
    oneliner: 'Cryptographically signed document certificates anyone can verify.',
    description: 'Issues tamper-proof certificates using Ed25519 signatures and lets anyone verify authenticity through a public link. Exports signed PDFs with no third-party dependency required.',
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind', 'Supabase', 'Web Crypto API', 'jsPDF'],
    github: 'https://github.com/AmanJ24/entrustory',
    tags: ['Security', 'Web', 'Dev Tools']
  },
  {
    id: '02',
    slug: 'blacksignal',
    name: 'BlackSignal',
    oneliner: 'Threat intelligence pipeline that routes through Tor and maps to MITRE ATT&CK.',
    description: 'Async DAG that pulls IOCs from raw text, isolates traffic through Tor circuits, enriches findings with VirusTotal and AbuseIPDB, and tags each IOC to ATT&CK techniques using NER. 29 tests passing.',
    stack: ['Python', 'asyncio', 'Tor', 'spaCy', 'VirusTotal API', 'AbuseIPDB', 'MITRE ATT&CK'],
    github: 'https://github.com/AmanJ24/blacksignal',
    tags: ['Security', 'Python', 'Intelligence']
  },
  {
    id: '03',
    slug: 'aura',
    name: 'AURA',
    oneliner: "A local AI layer that runs on your machine, not someone else's server.",
    description: 'Event-driven system built on Tauri and Ollama — local LLM routing, on-demand vision model, vector search via sqlite-vec, and Unix socket auth. Fully offline.',
    stack: ['Rust', 'Tauri', 'Python', 'Ollama', 'sqlite-vec', 'Moondream2'],
    github: 'https://github.com/AmanJ24/aura',
    tags: ['AI', 'Local', 'Systems', 'Rust']
  },
  {
    id: '04',
    slug: 'phishguard',
    name: 'PhishGuard',
    oneliner: 'Phishing simulation platform with multi-tenant campaign management.',
    description: 'GoPhish-backed dashboard with a Next.js frontend — supports multiple tenants, role-based access control, and campaign analytics out of the box.',
    stack: ['Next.js 14', 'GoPhish', 'MongoDB', 'Prisma', 'TypeScript'],
    github: 'https://github.com/AmanJ24/phishguard',
    tags: ['Security', 'Web', 'Platform']
  },
]

export const numbers = [
  { value: '9.6',     label: 'CGPA' },
  { value: 'Top 1%',  label: 'TryHackMe · Global' },
  { value: '4',       label: 'Projects Built' },
  { value: '29',      label: 'Tests Passing · BlackSignal' },
]

export const about = {
  p1: `I am a full-stack engineer and application security researcher. I approach software development and security auditing not as separate disciplines, but as two perspectives of the same system. Building a functional application is only half the work; the other half is understanding its failure modes and securing its boundaries.`,
  p2: `My technical focus lies in designing robust architectures with Rust, Go, and TypeScript, and auditing system boundaries for cryptographic, logical, and network flaws. I build tools that solve concrete problems while actively designing against potential threat vectors.`,
  meta: [
    { label: 'Open to', value: 'Full-time · Internship · Remote' },
    { label: 'GitHub',  value: 'AmanJ24' },
  ],
}

export const approach = [
  { num: '001', text: 'I start with the threat model, not just the features.' },
  { num: '002', text: 'I test trust boundaries locally before writing deployment code.' },
  { num: '003', text: 'I prioritize simple, audit-friendly structures over complex configurations.' },
  { num: '004', text: 'I use native browser APIs and minimal dependencies to limit supply chain risk.' },
  { num: '005', text: 'I build what works, verify its failure modes, and iterate.' },
]

export const skills = {
  dev: [
    { category: 'Languages',  items: ['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go', 'SQL'] },
    { category: 'Frontend',   items: ['React', 'Next.js', 'Tailwind CSS', 'Vite', 'Framer Motion', 'GSAP'] },
    { category: 'Backend',    items: ['Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'Supabase', 'MongoDB', 'Prisma'] },
    { category: 'Systems',    items: ['Tauri', 'Unix Sockets', 'SOCKS5 Proxies', 'Git', 'Docker', 'Linux'] },
  ],
  security: [
    { category: 'Defensive',    items: ['Threat Intel Pipelines', 'MITRE ATT&CK Mapping', 'Asymmetric Cryptography', 'Tor Routing Isolation', 'Secure IPC Sockets', 'SOCKS5 Proxying'] },
    { category: 'Offensive',    items: ['Phishing Simulation', 'Auth & RBAC Auditing', 'API Security Testing', 'Burp Suite', 'Nmap', 'Ffuf'] },
    { category: 'Environment',  items: ['Kali Linux', 'EndeavourOS', 'Warp Terminal', 'CTF Platforms', 'spaCy NLP'] },
  ],
}

export const credentials = [
  { earned: true, name: 'ISC2 Certified in Cybersecurity (CC)', image: '/assets/certs/isc2-cc.png' },
  { earned: true, name: 'TryHackMe — Jr. Pentester', image: '/assets/certs/thm-jr-pentester.jpg' },
  { earned: true, name: 'TryHackMe - COMPTIA+ PENTEST', image: '/assets/certs/thm-comptia-pentest.jpg' },
]

export const ctfs = [
  { event: 'TryHackMe - Industrial Intrusion CTF', image: '/assets/certs/thm-industrial-intrusion.jpg' },
  { event: 'HackTheBox - Apocalypse 2025', image: '/assets/certs/htb-apocalypse-2025.jpg' },
  { event: 'TryHackMe - HoneyNet Collapse', image: '/assets/certs/thm-honeynet.jpg' },
]

export const now = {
  items: [
    { label: 'Building',  value: 'AURA · PhishGuard' },
    { label: 'Studying',  value: 'Application security · eJPT prep' },
  ],
  lastUpdated: 'June 2026',
}
