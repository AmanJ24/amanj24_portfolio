import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TerminalSimulator from '../showcase/TerminalSimulator'

// Tor Circuit Route visualizer
function TorCircuitTracer() {
  const [activeHop, setActiveHop] = useState(0)
  const [circuitEstablished, setCircuitEstablished] = useState(false)

  const hops = [
    { name: 'CLIENT (ANALYST)', desc: 'Initiates request, wraps target URL in 3 layers of SOCKS5 onion encryption.', ip: '72.191.x.x (Real IP)' },
    { name: 'GUARD RELAY', desc: 'Peels layer 1. Knows client IP, but not exit endpoint or payloads.', ip: '185.220.101.5 (Germany)' },
    { name: 'MIDDLE RELAY', desc: 'Peels layer 2. Knows Guard and Exit relay IPs, isolates payload routing completely.', ip: '109.201.154.22 (Netherlands)' },
    { name: 'EXIT RELAY', desc: 'Peels layer 3. Intercepts plain request and fetches reputation API results.', ip: '185.220.101.47 (Exit)' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHop((prev) => {
        if (prev === 3) {
          setCircuitEstablished(true)
          return 3
        }
        return prev + 1
      })
    }, 1200)

    return () => clearInterval(interval)
  }, [])

  const handleReset = () => {
    setActiveHop(0)
    setCircuitEstablished(false)
  }

  return (
    <div className="bg-surface/30 border border-border p-6 rounded-md select-none text-left space-y-6">
      <div className="flex justify-between items-center border-b border-border/20 pb-3">
        <span className="font-mono text-xs text-accent uppercase font-bold">// TOR CIRCUIT ROUTING SIMULATOR</span>
        <button
          onClick={handleReset}
          className="font-mono text-[9px] text-muted hover:text-accent border border-border/40 hover:border-accent px-2 py-0.5 rounded cursor-none transition-colors"
        >
          RESET TRACE
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        {/* Hops */}
        {hops.map((hop, idx) => {
          const isActive = idx <= activeHop
          const isCurrent = idx === activeHop
          return (
            <div key={idx} className="space-y-3 relative z-10">
              <div className="flex items-center gap-3">
                <div 
                  className={`w-7 h-7 rounded-full border flex items-center justify-center font-mono text-[10px] transition-all duration-500 ${
                    isCurrent 
                      ? 'border-accent bg-accent/10 shadow-[0_0_12px_rgba(191,169,138,0.4)] text-accent font-bold' 
                      : (isActive ? 'border-sage/60 bg-sage/5 text-sage' : 'border-border text-muted/30')
                  }`}
                >
                  {idx + 1}
                </div>
                <h6 className={`font-mono text-[10px] font-bold ${isActive ? 'text-text' : 'text-muted/30'}`}>{hop.name}</h6>
              </div>
              <p className={`font-body text-[11px] leading-relaxed transition-all duration-300 ${isActive ? 'text-muted' : 'text-muted/20'}`}>
                {hop.desc}
              </p>
              <div className={`font-mono text-[9px] ${isActive ? 'text-accent/60' : 'text-muted/15'}`}>
                IP: {hop.ip}
              </div>
            </div>
          )
        })}

        {/* Dynamic trace line */}
        <div className="absolute top-3.5 left-4 right-4 h-0.5 border-t border-dashed border-border/20 -z-0 hidden md:block" />
        <motion.div 
          className="absolute top-3.5 left-4 h-0.5 bg-accent/40 -z-0 hidden md:block"
          initial={{ width: '0%' }}
          animate={{ width: `${(activeHop / 3) * 90}%` }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </div>

      <AnimatePresence>
        {circuitEstablished && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-border/20 pt-4 flex items-center justify-between text-[10px] font-mono text-sage"
          >
            <span>[+] CIRCUIT FULLY ESTABLISHED: ROUTING ENRICHMENT ENDPOINTS SECURELY</span>
            <span className="animate-pulse">● ROUTING ACTIVE</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// MITRE ATT&CK Mapping Hub
function MitreMappingHub() {
  const [selectedTech, setSelectedTech] = useState('t1566')

  const techniques = {
    t1566: {
      id: 'T1566',
      name: 'Spearphishing Link',
      category: 'Initial Access',
      desc: 'Adversaries send emails containing malicious link attachments targeted at compromising accounts.',
      detection: 'VirusTotal enriches domains found in the threat text stream, scanning reputation databases for dynamic URL flags.',
      remediation: 'DNS sinkholing, email authentication checking (SPF, DKIM, DMARC), and user awareness programs.'
    },
    t1071: {
      id: 'T1071.001',
      name: 'Web Protocols Command & Control',
      category: 'Command & Control',
      desc: 'Adversaries communicate with server endpoints using web protocols (HTTP/HTTPS) to bypass firewalls.',
      detection: 'BlackSignal maps egress domains to Att&ck technique structures, detecting persistent beacon frequencies.',
      remediation: 'Implement egress proxies, block unauthorized SOCKS5 usage, and mandate deep packet parsing configurations.'
    },
    t1059: {
      id: 'T1059',
      name: 'Command and Scripting Interpreter',
      category: 'Execution',
      desc: 'Abusing local interpreter platforms (PowerShell, bash, cmd) to bypass signature-based detections.',
      detection: 'Classifies process executions extracted from log directories using Custom spaCy NLP entities.',
      remediation: 'Disable scripting consoles on developer nodes, audit command histories, and use app constraints.'
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-6 select-none text-left">
      {/* Left lists */}
      <div className="lg:col-span-5 space-y-3.5">
        <span className="font-mono text-[9px] text-muted uppercase tracking-widest block mb-4">// ATT&CK Mapping Targets</span>
        {Object.keys(techniques).map((key) => {
          const tech = techniques[key]
          const isSelected = selectedTech === key
          return (
            <button
              key={key}
              onClick={() => setSelectedTech(key)}
              className={`w-full text-left font-mono border rounded p-4 flex justify-between items-center cursor-none transition-all duration-300 outline-none ${
                isSelected 
                  ? 'border-accent bg-accent/5 text-accent shadow-[0_0_15px_rgba(191,169,138,0.02)]' 
                  : 'border-border/60 hover:border-accent/30 text-muted'
              }`}
            >
              <div>
                <span className="text-[9px] opacity-65 block">{tech.category.toUpperCase()}</span>
                <span className="text-xs font-bold block mt-1">{tech.name}</span>
              </div>
              <span className="text-xs font-bold">{tech.id}</span>
            </button>
          )
        })}
      </div>

      {/* Right details */}
      <div className="lg:col-span-7 bg-surface/30 border border-border p-6 rounded flex flex-col justify-between h-[270px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTech}
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 font-mono text-[11px]"
          >
            <div className="border-b border-border/20 pb-3 flex justify-between items-baseline">
              <h5 className="font-bold text-accent text-xs uppercase">{techniques[selectedTech].name}</h5>
              <span className="text-muted">{techniques[selectedTech].id}</span>
            </div>
            <div className="space-y-3 leading-relaxed text-muted">
              <p>
                <span className="text-text font-bold block uppercase mb-1">// TECHNIQUE DESCRIPTION:</span>
                {techniques[selectedTech].desc}
              </p>
              <p>
                <span className="text-text font-bold block uppercase mb-1">// DETECTION ROUTINE:</span>
                {techniques[selectedTech].detection}
              </p>
              <p>
                <span className="text-text font-bold block uppercase mb-1">// MITIGATION PARADIGM:</span>
                {techniques[selectedTech].remediation}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function BlackSignalCaseStudy() {
  const snippet = {
    lang: 'Python',
    code: `# Establish isolated SOCKS5 socks proxy routing for VT enricher
import aiohttp
import socks

async def fetch_enriched_indicator(indicator, api_key):
    # Configure Tor socks5 proxy connection channel
    connector = aiohttp_socks.ProxyConnector.from_url(
        'socks5://127.0.0.1:9050'
    )
    url = f'https://www.virustotal.com/api/v3/ip_addresses/{indicator}'
    headers = {"x-apikey": api_key}
    
    async with aiohttp.ClientSession(connector=connector) as session:
        async with session.get(url, headers=headers) as resp:
            return await resp.json()`
  }

  // Dynamic syntax highlighter for the console window
  function highlightCode(code, lang) {
    let html = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Highlight single-line comments in sage green
    html = html.replace(/(\/\/.*|#.*)/g, '<span class="text-sage font-bold italic opacity-85">$1</span>');
    
    // Highlight JS/TS/Rust keywords in accent sand gold
    const keywords = /\b(const|let|var|function|async|await|return|import|from|fn|pub|struct|impl|def|as|class|interface|new|this|try|catch|if|else)\b/g;
    html = html.replace(keywords, '<span class="text-accent font-semibold">$1</span>');

    // Highlight strings in light cream text-text/85
    html = html.replace(/(['"`](?:\\.|[^'"`])*['"`])/g, '<span class="text-text/85 font-medium">$1</span>');
    
    // Highlight numbers in light gold / amber
    html = html.replace(/\b(\d+)\b/g, '<span class="text-accent/80">$1</span>');

    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return (
    <div className="text-left">
      {/* 01. Project Hero */}
      <section className="min-h-screen py-40 flex flex-col justify-center border-b border-border/20 relative" id="project-hero">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Detail */}
          <div className="lg:col-span-7 text-left space-y-6">
            <span className="font-mono text-xs text-accent tracking-widest block uppercase">// Selected case study</span>
            <h1 className="font-display text-[clamp(3rem,10vw,6rem)] font-light text-text leading-none tracking-tight">
              BlackSignal
            </h1>
            <p className="font-body text-base md:text-lg text-text/90 leading-relaxed max-w-xl">
              Async DAG threat intelligence pipeline that parses unstructured threat records, isolates network querying through Tor, and tags findings to MITRE ATT&CK techniques.
            </p>
            <div className="flex flex-wrap gap-2 py-2">
              {['Python', 'asyncio', 'Tor', 'spaCy', 'VirusTotal API', 'AbuseIPDB', 'MITRE ATT&CK'].map((t) => (
                <span key={t} className="font-mono text-[9px] text-muted bg-surface/40 border border-border/30 px-3 py-1 rounded-full uppercase tracking-wider">
                  {t}
                </span>
              ))}
            </div>
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="https://github.com/AmanJ24/blacksignal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 font-mono text-xs text-accent hover:text-text border border-accent/40 bg-accent/5 hover:border-accent hover:bg-accent/10 px-5 py-3 rounded transition-all duration-300 cursor-none"
              >
                View Repository Source ↗
              </a>
            </div>
          </div>

          {/* Right Live Graphical Showcase Component */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <TerminalSimulator />
          </div>
        </div>
      </section>

      {/* 02. Overview Section */}
      <section id="project-overview" className="py-16 md:py-24 max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-border/10">
        <div className="lg:col-span-4">
          <span className="font-mono text-xs text-muted tracking-widest uppercase block mb-4">// System Overview</span>
          <h3 className="font-display text-2xl font-light text-text leading-snug">Automated Pipeline Routing for Safe Threat Scans.</h3>
        </div>
        <div className="lg:col-span-8 text-muted/90 space-y-6 font-body text-base leading-relaxed">
          <p>
            Manual threat analysis is slow and compromises investigator anonymity. Fetching reputation data directly from command lines exposes threat analysts' IP addresses to threat actors' control logs, warning adversaries of surveillance.
          </p>
          <p>
            <strong>BlackSignal</strong> solves this via an asynchronous pipeline. It parses Indicators of Compromise (IOCs) from raw logs using spaCy NLP. Then, it schedules enrichment requests concurrently across isolated Tor SOCKS5 proxy circuits, preventing egress tracking. Lastly, it resolves target IOCs against STIX databases to output ATT&CK taxonomy tags.
          </p>
        </div>
      </section>

      {/* 03. Tor Circuit Route visualizer */}
      <section id="project-pipeline" className="py-16 md:py-24 border-b border-border/10 bg-surface/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-12">
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">// Proxy Circuit Topology</span>
            <h3 className="font-display text-2xl font-light text-text">Tor Circuit Route Visualizer</h3>
          </div>
          <TorCircuitTracer />
        </div>
      </section>

      {/* MITRE ATT&CK Matrix Mapping Hub */}
      <section className="py-16 md:py-24 border-b border-border/10 bg-bg">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-12">
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">// Attack Taxonomy Mapping</span>
            <h3 className="font-display text-2xl font-light text-text">MITRE ATT&CK Integration Matrix</h3>
          </div>
          <MitreMappingHub />
        </div>
      </section>

      {/* 04. Technical Details & Code block */}
      <section id="project-tech" className="py-16 md:py-24 border-b border-border/10 max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-6">
          <span className="font-mono text-xs text-muted tracking-widest uppercase block mb-2">// Technical Details</span>
          <h3 className="font-display text-2xl font-light text-text">Asynchronous SOCKS5 proxying.</h3>
          <div className="space-y-4 font-body text-xs text-muted leading-relaxed">
            <p>
              By leveraging Python's `asyncio` and `aiohttp_socks` connectors, each API request dynamically triggers SOCKS5 channel bindings.
            </p>
            <p>
              Unit testing mocks API endpoints to run cleanly offline, verifying Tor circuit generation state changes across 29 test paths.
            </p>
          </div>
        </div>
        <div className="lg:col-span-8 w-full flex justify-center">
          <div className="w-full max-w-2xl mx-auto border border-border/80 bg-surface rounded shadow-md overflow-hidden text-left font-mono shadow-[0_0_35px_rgba(61,92,58,0.06)]">
            <div className="bg-[#1C1A17] border-b border-border/40 px-4 py-2 flex justify-between items-center select-none text-[10px]">
              <span className="text-accent uppercase font-bold tracking-wider">// CORE FUNCTION : {snippet.lang.toUpperCase()}</span>
              <span className="text-muted/60 lowercase">AmanJ24/src/main</span>
            </div>
            <div className="p-5 overflow-x-auto text-[11px] leading-relaxed text-muted/90 whitespace-pre">
              <code>{highlightCode(snippet.code, snippet.lang)}</code>
            </div>
          </div>
        </div>
      </section>

      {/* 05. Showcase What I Learned */}
      <section id="project-retrospective" className="py-16 md:py-24 text-left">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">// Retrospective</span>
            <h3 className="font-display text-2xl font-light text-text">What I learned.</h3>
          </div>
          <div className="lg:col-span-8 font-body text-base text-muted/90 leading-relaxed italic">
            "Developing BlackSignal taught me how proxies operate at the socket layer. Managing circuit rotation and keeping rates restricted without dropping connections required structured queue logic, sharpening my Python network programming skills."
          </div>
        </div>
      </section>
    </div>
  )
}
