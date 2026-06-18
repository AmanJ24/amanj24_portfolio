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

export const marqueeDevLogos = [
  { name: 'React', slug: 'react' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Python', slug: 'python' },
  { name: 'Rust', slug: 'rust' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'Tailwind CSS', slug: 'tailwindcss' },
  { name: 'Vite', slug: 'vite' },
  { name: 'Supabase', slug: 'supabase' },
  { name: 'PostgreSQL', slug: 'postgresql' }
]

export const marqueeSecLogos = [
  { name: 'Kali Linux', slug: 'kalilinux' },
  { name: 'Tor Project', slug: 'torproject' },
  { name: 'Wireshark', slug: 'wireshark' },
  { name: 'Burp Suite', slug: 'burpsuite' },
  { name: 'Metasploit', slug: 'metasploit' },
  { name: 'Linux', slug: 'linux' },
  { name: 'Docker', slug: 'docker' },
  { name: 'Git', slug: 'git' },
  { name: 'TryHackMe', slug: 'tryhackme' },
  { name: 'OWASP', slug: 'owasp' }
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

export const tryhackmeStats = {
  username: 'AmanJ24',
  rank: '#7,188',
  percentile: 'Top 1%',
  completedRooms: 305,
  badgesCount: 37,
  yearlyActivity: {
    '2025': '3,723 events',
    '2026': '27 events'
  },
  highlights: [
    { title: 'Diamond League Member', desc: 'Reached the peak elite competitive bracket (Epic rarity).' },
    { title: 'Path Completions', desc: 'Junior Pentester, CompTIA PenTest+ training.' },
    { title: 'Hands-on Labs', desc: 'Exploited Active Directory, Buffer Overflows, Web Vulnerabilities, and Network Sockets.' }
  ],
  topBadges: [
    { name: 'Advent of Cyber 2025', rarity: 'Rare (4.1%)', desc: 'Completed security tasks covering defense, forensics, and reverse engineering.' },
    { name: 'Diamond League', rarity: 'Epic (0.4%)', desc: 'Maintained continuous leaderboard ranking in the peak competitive tier.' },
    { name: 'Filesystem Sleuth', rarity: 'Epic (0.3%)', desc: 'Demonstrated proficiency in deep Linux/Windows forensics.' },
    { name: 'HTTP Smuggler', rarity: 'Epic (0.6%)', desc: 'Successfully executed HTTP request smuggling attacks on server boundaries.' },
    { name: 'ADversary', rarity: 'Rare (1.0%)', desc: 'Conquered Active Directory exploitation and domain escalation labs.' },
    { name: 'Tor Circuit Isolation', rarity: 'Epic (0.6%)', desc: 'Completed Advanced Onion Network Routing labs.' }
  ]
}

export const professionalExperience = [
  {
    role: 'Cybersecurity Analyst & Pentester',
    company: 'TryHackMe (Offensive/Defensive Labs)',
    period: '2025 - Present',
    desc: 'Investigated network infrastructures and audited web applications. Built automated logging pipelines and mapped vulnerabilities using MITRE ATT&CK techniques in real-world simulation labs.',
    achievements: [
      'Ranked in the top 1% globally among millions of security practitioners.',
      'Completed Jr. Pentester and CompTIA PenTest+ training paths.',
      'Solved 305 capture-the-flag (CTF) and training rooms focusing on secure protocols and exploit research.'
    ]
  }
]
