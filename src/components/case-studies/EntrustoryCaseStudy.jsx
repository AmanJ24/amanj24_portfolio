import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedCertificate from '../showcase/AnimatedCertificate'
import Tilt from '../effects/Tilt'

// Animated verification funnel infographic
function VerificationFunnel() {
  const steps = [
    { title: '1. Document Hashing', desc: 'Raw document bytes run through SHA-256 in browser, producing a 64-character hash digest.', icon: '⚡' },
    { title: '2. Private Key Signature', desc: 'Asymmetric private key signs the hash digest using Ed25519, producing the signature.', icon: '🔑' },
    { title: '3. Seal & Export PDF', desc: 'Certificate parameters and signature are embedded into a metadata-stamped PDF via jsPDF.', icon: '📜' },
    { title: '4. Public Ledger Sync', desc: 'Public key and signature are synced to Supabase for independent verification streams.', icon: '🌐' }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6 text-left select-none">
      {steps.map((step, idx) => (
        <motion.div
          key={idx}
          className="bg-surface/30 border border-border p-5 rounded relative overflow-hidden group hover:border-accent/40 transition-colors duration-500 h-full flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
        >
          <div className="text-xl mb-4 text-accent/80 group-hover:text-accent transition-colors duration-300">
            {step.icon}
          </div>
          <div>
            <h5 className="font-mono text-xs font-bold text-text uppercase tracking-wider mb-2">{step.title}</h5>
            <p className="font-body text-[11px] text-muted leading-relaxed group-hover:text-text/80 transition-colors duration-300">
              {step.desc}
            </p>
          </div>
          <div className="absolute top-2 right-3 font-mono text-[16px] font-bold text-muted/10 group-hover:text-accent/10 transition-colors duration-500">
            0{idx + 1}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Live cryptographic signer playground
function CryptSignerPlayground() {
  const [inputText, setInputText] = useState('Verify this message authenticity.')
  const [signatureText, setSignatureText] = useState('')
  const [isSigned, setIsSigned] = useState(false)
  const [verificationResult, setVerificationResult] = useState(null) // null, 'success', 'fail'
  const [scrambler, setScrambler] = useState('')

  const handleSign = () => {
    if (!inputText) return
    setIsSigned(false)
    setVerificationResult(null)
    setSignatureText('')
    
    // Simulate scramble
    let count = 0
    const chars = '0123456789ABCDEF'
    const interval = setInterval(() => {
      let scramble = ''
      for (let i = 0; i < 40; i++) {
        scramble += chars[Math.floor(Math.random() * 16)]
      }
      setScrambler(scramble)
      count++
      if (count > 8) {
        clearInterval(interval)
        // Set mock Ed25519 signature
        setSignatureText('8b4c09d2aef7710bc457d8e62bc10398f6d76a218f238bc3d67ec74e1d670f20')
        setIsSigned(true)
      }
    }, 60)
  }

  const handleVerify = () => {
    if (!isSigned) return
    if (inputText === 'Verify this message authenticity.') {
      setVerificationResult('success')
    } else {
      setVerificationResult('fail')
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto border border-border/80 bg-surface rounded shadow-md overflow-hidden text-left font-mono relative crt-terminal">
      <div className="bg-[#1C1A17] border-b border-border/40 px-4 py-2 flex justify-between items-center select-none text-[10px]">
        <span className="text-accent uppercase font-bold tracking-wider">// INTERACTIVE ENCRYPTOR LAB</span>
        <span className="text-muted/60 lowercase">session://crypt_audit</span>
      </div>
      
      <div className="p-6 space-y-6 text-xs text-muted">
        {/* Input box */}
        <div className="space-y-2">
          <label className="text-accent uppercase text-[9px] font-bold block">// Message Payload</label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-bg border border-border/60 hover:border-border rounded px-3.5 py-2 font-mono text-text text-xs focus:border-accent outline-none cursor-none transition-colors"
          />
        </div>

        {/* Action Controls */}
        <div className="flex gap-4">
          <button
            onClick={handleSign}
            className="px-4 py-2 bg-accent/5 hover:bg-accent/15 border border-accent/40 hover:border-accent text-accent font-bold rounded cursor-none transition-all duration-300 text-[10px] uppercase"
          >
            Sign Message
          </button>
          
          <button
            onClick={handleVerify}
            disabled={!isSigned}
            className={`px-4 py-2 border rounded text-[10px] font-bold uppercase transition-all duration-300 cursor-none ${
              isSigned 
                ? 'bg-sage/10 hover:bg-sage/20 border-sage/40 hover:border-sage text-text' 
                : 'border-border/30 text-muted/30 pointer-events-none'
            }`}
          >
            Verify Signature
          </button>
        </div>

        {/* Live console logging */}
        <div className="bg-bg/85 border border-border/40 p-4 rounded min-h-[90px] font-mono leading-relaxed space-y-2">
          {!isSigned && !scrambler && (
            <span className="text-muted/40 block">// Enter text payload and hit "Sign Message" to generate keypairs.</span>
          )}
          
          {scrambler && !isSigned && (
            <div className="text-accent/70 select-none animate-pulse">
              <span>[*] CALCULATING ED25519 PRIVATE SIGNATURE...</span>
              <span className="block mt-1 font-bold tracking-wider">{scrambler}</span>
            </div>
          )}

          {isSigned && (
            <div className="space-y-1">
              <span className="text-sage block">[+] PRIVATE SIGNATURE GENERATED:</span>
              <span className="text-text font-bold block select-all break-all">{signatureText}</span>
              <span className="text-muted/50 block text-[10px] mt-1">*Notice: Changing the payload text above will break signature matching.</span>
            </div>
          )}

          <AnimatePresence>
            {verificationResult && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 border-t border-border/20 pt-2 font-bold uppercase"
              >
                {verificationResult === 'success' ? (
                  <span className="text-sage block animate-pulse">
                    ✓ STATUS: VERIFICATION SUCCESSFUL. SIGNATURE MATCHES PAYLOAD.
                  </span>
                ) : (
                  <span className="text-accent block">
                    ✖ STATUS: VERIFICATION FAILED. TAMPER DETECTED. PAYLOAD ALTERED.
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default function EntrustoryCaseStudy() {
  const snippet = {
    lang: 'JavaScript',
    code: `// Signing document hash securely via browser native Web Crypto API
async function signDocument(privateKey, dataBuffer) {
  const signature = await window.crypto.subtle.sign(
    {
      name: "Ed25519"
    },
    privateKey,
    dataBuffer
  );
  
  // Output raw signature bytes encoded in hex
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}`
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
              Entrustory
            </h1>
            <p className="font-body text-base md:text-lg text-text/90 leading-relaxed max-w-xl">
              Issues tamper-proof certificates using Ed25519 signatures and lets anyone verify authenticity through a public link. Exports signed PDFs with no third-party dependency required.
            </p>
            <div className="flex flex-wrap gap-2 py-2">
              {['React 19', 'TypeScript', 'Vite', 'Tailwind', 'Supabase', 'Web Crypto API', 'jsPDF'].map((t) => (
                <span key={t} className="font-mono text-[9px] text-muted bg-surface/40 border border-border/30 px-3 py-1 rounded-full uppercase tracking-wider">
                  {t}
                </span>
              ))}
            </div>
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="https://github.com/AmanJ24/entrustory"
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
            <AnimatedCertificate />
          </div>
        </div>
      </section>

      {/* 02. Overview Section */}
      <section id="project-overview" className="py-16 md:py-24 max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-border/10">
        <div className="lg:col-span-4">
          <span className="font-mono text-xs text-muted tracking-widest uppercase block mb-4">// System Overview</span>
          <h3 className="font-display text-2xl font-light text-text leading-snug">Tamper-Proof Verification without Third Parties.</h3>
        </div>
        <div className="lg:col-span-8 text-muted/90 space-y-6 font-body text-base leading-relaxed">
          <p>
            Most document signing workflows require a third-party service — DocuSign, Adobe Sign, or a complex blockchain. They all involve trusting someone else's server configuration and paying transaction costs.
          </p>
          <p>
            <strong>Entrustory</strong> solves this by implementing pure clientside cryptography. It generates asymmetric Ed25519 signature keys in-browser using the native Web Crypto API. Keypairs never leave the browser session. Anyone with a verification URL can query the public key and check integrity in a single click.
          </p>
        </div>
      </section>

      {/* 03. How It Works Pipeline */}
      <section id="project-pipeline" className="py-16 md:py-24 border-b border-border/10 bg-surface/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-12">
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">// Pipeline Architecture</span>
            <h3 className="font-display text-2xl font-light text-text">The Cryptographic Lifecycle.</h3>
          </div>
          <VerificationFunnel />
        </div>
      </section>

      {/* Interactive Crypt Signer Sandbox */}
      <section className="py-16 md:py-24 border-b border-border/10 bg-bg">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 text-center space-y-8">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="font-mono text-xs text-accent tracking-widest uppercase block">// Practical Testing</span>
            <h3 className="font-display text-2xl font-light text-text">Live Signer Playground</h3>
            <p className="font-body text-xs text-muted leading-relaxed">
              Verify signature matching in real-time. Hit sign to generate a mock Ed25519 signature, then edit the payload string to test verification integrity!
            </p>
          </div>
          <CryptSignerPlayground />
        </div>
      </section>

      {/* 04. Technical Details & Code block */}
      <section id="project-tech" className="py-16 md:py-24 border-b border-border/10 max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-6">
          <span className="font-mono text-xs text-muted tracking-widest uppercase block mb-2">// Technical Details</span>
          <h3 className="font-display text-2xl font-light text-text">Native Web APIs.</h3>
          <div className="space-y-4 font-body text-xs text-muted leading-relaxed">
            <p>
              By leveraging the browser's native **Web Crypto API** instead of loading heavy node crypto polyfills, we eliminate supply chain injection vulnerabilities. Cryptographic calculations operate directly in sandboxed threads.
            </p>
            <p>
              Row-level security policies in Supabase ensure that key configurations are completely read-only, preventing unauthorized modifications from compromised accounts.
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
            "Developing Entrustory taught me how asymmetric cryptography works at the browser API layer. Handling browser key generation forced me to design secure session boundaries and consider user-agent limitations, reinforcing my interest in secure-by-default clientside development."
          </div>
        </div>
      </section>
    </div>
  )
}
