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
    github: 'https://github.com/AmanJ24/entrustory',
  },
  {
    id: '02',
    name: 'BlackSignal',
    oneliner: 'Threat intelligence pipeline that routes through Tor and maps to MITRE ATT&CK.',
    description: 'Async DAG that pulls IOCs from raw text, isolates traffic through Tor circuits, enriches findings with VirusTotal and AbuseIPDB, and tags each IOC to ATT&CK techniques using NER. 29 tests passing.',
    stack: ['Python', 'asyncio', 'Tor', 'spaCy', 'VirusTotal API', 'AbuseIPDB', 'MITRE ATT&CK'],
    github: 'https://github.com/AmanJ24/blacksignal',
  },
  {
    id: '03',
    name: 'AURA',
    oneliner: "A local AI layer that runs on your machine, not someone else's server.",
    description: 'Event-driven system built on Tauri and Ollama — local LLM routing, on-demand vision model, vector search via sqlite-vec, and Unix socket auth. Fully offline.',
    stack: ['Rust', 'Tauri', 'Python', 'Ollama', 'sqlite-vec', 'Moondream2'],
    github: 'https://github.com/AmanJ24/aura',
  },
  {
    id: '04',
    name: 'PhishGuard',
    oneliner: 'Phishing simulation platform with multi-tenant campaign management.',
    description: 'GoPhish-backed dashboard with a Next.js frontend — supports multiple tenants, role-based access control, and campaign analytics out of the box.',
    stack: ['Next.js 14', 'GoPhish', 'MongoDB', 'Prisma', 'TypeScript'],
    github: 'https://github.com/AmanJ24/phishguard',
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
  { earned: true, name: 'ISC2 Certified in Cybersecurity (CC)', image: '/assets/certs/isc2-cc.png' },
  { earned: true, name: 'TryHackMe — Jr. Pentester', image: '/assets/certs/thm-jr-pentester.png' },
  { earned: true, name: 'TryHackMe - COMPTIA+ PENTEST', image: '/assets/certs/thm-comptia-pentest.png' },
]

export const ctfs = [
  { event: 'TryHackMe - Industrial Intrusion CTF', image: '/assets/certs/ctf-industrial-intrusion.png' },
  { event: 'HackTheBox - Apocalypse 2025', image: '/assets/certs/ctf-htb-apocalypse.png' },
  { event: 'TryHackMe - HoneyNet Collapse', image: '/assets/certs/ctf-honeynet.png' },
]

export const now = {
  items: [
    { label: 'Building',  value: 'AURA · PhishGuard' },
    { label: 'Studying',  value: 'Application security · eJPT prep' },
  ],
  lastUpdated: 'June 2026',
}
