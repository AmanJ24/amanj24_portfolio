import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AuraArchDiagram from '../showcase/AuraArchDiagram'

// Local AI Event Loop Visualizer
function EventLoopVisualizer() {
  const [activeStep, setActiveStep] = useState(0)

  const states = [
    { title: '1. UI Dispatch', desc: 'User enters text or vision query. Tauri event bus captures IPC payload.', color: '#BFA98A' },
    { title: '2. Socket Auth check', desc: 'IPC passes payload through local Unix socket channel using customized credentials auth check.', color: '#BFA98A' },
    { title: '3. Router Match', desc: 'Direct router matches task type. Text is routed to Ollama LLM, vector queries to sqlite-vec.', color: '#3D5C3A' },
    { title: '4. Dynamic Vision Load', desc: 'Moondream2 vision model is loaded to VRAM on demand, then immediately freed.', color: '#3D5C3A' }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % states.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [states.length])

  return (
    <div className="bg-surface/30 border border-border p-6 rounded-md select-none text-left space-y-6">
      <div className="flex justify-between items-center border-b border-border/20 pb-3">
        <span className="font-mono text-xs text-accent uppercase font-bold">// LOCAL EVENT LOOP PIPELINE</span>
        <span className="font-mono text-[9px] text-sage animate-pulse">● EVENT MONITOR ACTIVE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {states.map((st, idx) => {
          const isActive = idx === activeStep
          return (
            <div 
              key={idx}
              className={`p-4 rounded border transition-all duration-500 flex flex-col justify-between h-36 ${
                isActive 
                  ? 'border-accent bg-accent/5 shadow-[0_0_15px_rgba(191,169,138,0.04)] translate-y-[-2px]' 
                  : 'border-border/50 bg-bg/20 opacity-50'
              }`}
            >
              <span className="font-mono text-[9px] text-muted block">// PROTO_STEP_0{idx + 1}</span>
              <div>
                <h5 className="font-mono text-[10px] font-bold text-text mb-1.5 uppercase">{st.title}</h5>
                <p className="font-body text-[10px] text-muted leading-relaxed">{st.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Phase timeline roadmap
function PhaseTimeline() {
  const [activePhase, setActivePhase] = useState(7)

  const phases = [
    { num: '01', title: 'Tauri Core Bindings', desc: 'Wired primary Rust-Tauri event loops, mapping basic IPC parameters.', status: 'shipped' },
    { num: '02', title: 'Ollama Integration', desc: 'Linked Ollama APIs, supporting offline text queries.', status: 'shipped' },
    { num: '03', title: 'Socket Auth', desc: 'Built Unix socket credentials checks to protect local channels.', status: 'shipped' },
    { num: '04', title: 'ChromaDB Setup', desc: 'Configured local ChromaDB instances for document embeddings.', status: 'shipped' },
    { num: '05', title: 'Vision Support', desc: 'Wired Moondream2 model integrations for vision parsing.', status: 'shipped' },
    { num: '06', title: 'Unix socket hardening', desc: 'Wired credentials check permissions for Tauri socket layers.', status: 'shipped' },
    { num: '07', title: 'sqlite-vec Switch', desc: 'Replaced ChromaDB daemon with sqlite-vec to save 1GB RAM.', status: 'shipped' },
    { num: '07.5', title: 'Vision Overhaul', desc: 'Wired vision model to load on-demand and unload after idle.', status: 'active' },
    { num: '08', title: 'Local Agent Mesh', desc: 'Planned peer-to-peer secure local agent routing.', status: 'planned' },
    { num: '09', title: 'Offline NER', desc: 'Planned local entity extraction models.', status: 'planned' }
  ]

  return (
    <div className="space-y-6 text-left select-none">
      <div className="flex justify-between items-center border-b border-border/20 pb-3 font-mono text-xs">
        <span className="text-accent uppercase font-bold">// ARCHITECTURAL BUILD ROADMAP</span>
        <span className="text-muted/60">PHASES 01 - 09</span>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {phases.map((ph, idx) => {
          const isSelected = activePhase === idx
          return (
            <button
              key={ph.num}
              onClick={() => setActivePhase(idx)}
              className={`text-left border rounded p-4 flex flex-col justify-between h-32 cursor-none transition-all duration-300 outline-none ${
                isSelected 
                  ? 'border-accent bg-accent/5 text-accent shadow-[0_0_15px_rgba(191,169,138,0.02)]' 
                  : 'border-border/60 hover:border-accent/30 text-muted'
              }`}
            >
              <div className="flex justify-between items-center w-full font-mono text-[9px]">
                <span>PHASE {ph.num}</span>
                <span className={`uppercase font-bold ${ph.status === 'active' ? 'text-accent animate-pulse' : (ph.status === 'shipped' ? 'text-sage' : 'text-muted/40')}`}>
                  {ph.status}
                </span>
              </div>
              <div>
                <h6 className="font-mono text-[10px] font-bold text-text uppercase tracking-wider line-clamp-2">{ph.title}</h6>
              </div>
            </button>
          )
        })}
      </div>

      {/* Phase Details Card */}
      <div className="bg-surface/30 border border-border p-5 rounded font-mono text-[11px] h-32 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            <div className="flex justify-between border-b border-border/20 pb-2 mb-2 uppercase">
              <span className="text-accent font-bold">Phase {phases[activePhase].num}: {phases[activePhase].title}</span>
              <span className="text-muted">Status: {phases[activePhase].status}</span>
            </div>
            <p className="text-muted/80 leading-relaxed">{phases[activePhase].desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function AuraCaseStudy() {
  const snippet = {
    lang: 'Rust',
    code: `// Executing in-process vector cosine similarity inside sqlite-vec
fn search_embeddings(db: &Connection, query: &[f32], limit: usize) -> Result<Vec<Match>> {
    let mut stmt = db.prepare(
        "SELECT id, distance, metadata FROM embeddings 
         WHERE vec_search(vector, ?1, 'cosine') 
         ORDER BY distance LIMIT ?2"
    )?;
    
    let query_blob = vec_to_blob(query);
    let rows = stmt.query_map([query_blob, limit.to_string()], |row| {
        Ok(Match {
            id: row.get(0)?,
            distance: row.get(1)?,
            metadata: row.get(2)?
        })
    })?;
    
    Ok(rows.filter_map(|r| r.ok()).collect())
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
              AURA
            </h1>
            <p className="font-body text-base md:text-lg text-text/90 leading-relaxed max-w-xl">
              An event-driven AI operating layer built on Tauri (Rust) and Ollama that executes text operations, vector similarity searches, and on-demand vision queries fully offline.
            </p>
            <div className="flex flex-wrap gap-2 py-2">
              {['Rust', 'Tauri', 'Python', 'Ollama', 'sqlite-vec', 'Moondream2'].map((t) => (
                <span key={t} className="font-mono text-[9px] text-muted bg-surface/40 border border-border/30 px-3 py-1 rounded-full uppercase tracking-wider">
                  {t}
                </span>
              ))}
            </div>
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="https://github.com/AmanJ24/aura"
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
            <AuraArchDiagram />
          </div>
        </div>
      </section>

      {/* 02. Overview Section */}
      <section id="project-overview" className="py-16 md:py-24 max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-border/10">
        <div className="lg:col-span-4">
          <span className="font-mono text-xs text-muted tracking-widest uppercase block mb-4">// System Overview</span>
          <h3 className="font-display text-2xl font-light text-text leading-snug">Private local AI Layer for secure offline processing.</h3>
        </div>
        <div className="lg:col-span-8 text-muted/90 space-y-6 font-body text-base leading-relaxed">
          <p>
            Traditional AI assistants stream telemetry and search prompts directly to external servers. For corporate code auditing and security analysis, this leaks sensitive intellectual property to foreign cloud systems.
          </p>
          <p>
            <strong>AURA</strong> provides a zero-leak local operating shell. Written in Rust on Tauri, it routes inputs programmatic event hooks down a Unix socket with credential auth checks. Text parsing routes to local Ollama LLMs, search queries leverage sqlite-vec embeddings, and vision processing triggers lightweight Moondream2 setups only on request, keeping idle RAM overhead minimal.
          </p>
        </div>
      </section>

      {/* 03. local event loop */}
      <section id="project-pipeline" className="py-16 md:py-24 border-b border-border/10 bg-surface/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-12">
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">// Programmatic Architecture</span>
            <h3 className="font-display text-2xl font-light text-text">Local Event Loop Pipeline</h3>
          </div>
          <EventLoopVisualizer />
        </div>
      </section>

      {/* Phase Roadmap Timeline */}
      <section className="py-16 md:py-24 border-b border-border/10 bg-bg">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-12">
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">// Architectural Iterations</span>
            <h3 className="font-display text-2xl font-light text-text">Tauri Build Phases</h3>
          </div>
          <PhaseTimeline />
        </div>
      </section>

      {/* 04. Technical Details & Code block */}
      <section id="project-tech" className="py-16 md:py-24 border-b border-border/10 max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-6">
          <span className="font-mono text-xs text-muted tracking-widest uppercase block mb-2">// Technical Details</span>
          <h3 className="font-display text-2xl font-light text-text">In-Process Vector Store.</h3>
          <div className="space-y-4 font-body text-xs text-muted leading-relaxed">
            <p>
              Swapping out standard vector database servers for sqlite-vec inside Rust processes reduced overhead from 1.2GB down to 10MB of RAM.
            </p>
            <p>
              Tauri commands run as sandboxed system calls. Authentication checking on local IPC sockets validates permissions before returning output payloads.
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
            "Refactoring AURA from traditional ChromaDB to sqlite-vec taught me that lightweight, in-process tools outperform daemon-driven architectures on consumer laptops. Maintaining local Unix socket checks sharpened my understanding of system boundaries."
          </div>
        </div>
      </section>
    </div>
  )
}
