import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PhishGuardDashboard from '../showcase/PhishGuardDashboard'

// Campaign Funnel Infographic
function CampaignFunnel() {
  const [funnelData, setFunnelData] = useState({ sent: 500, opened: 0, clicked: 0, credentials: 0 })
  const [funnelTrigger, setFunnelTrigger] = useState(0)

  useEffect(() => {
    setFunnelData({ sent: 500, opened: 0, clicked: 0, credentials: 0 })
    
    const t1 = setTimeout(() => setFunnelData(prev => ({ ...prev, opened: 310 })), 800)
    const t2 = setTimeout(() => setFunnelData(prev => ({ ...prev, clicked: 115 })), 1600)
    const t3 = setTimeout(() => setFunnelData(prev => ({ ...prev, credentials: 40 })), 2400)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [funnelTrigger])

  const stages = [
    { label: 'Emails Sent', count: funnelData.sent, percentage: '100%', color: '#BFA98A' },
    { label: 'Opened (Pixel Traced)', count: funnelData.opened, percentage: funnelData.opened ? '62%' : '0%', color: '#BFA98A' },
    { label: 'Clicked Link', count: funnelData.clicked, percentage: funnelData.clicked ? '23%' : '0%', color: '#3D5C3A' },
    { label: 'Credentials Compromised', count: funnelData.credentials, percentage: funnelData.credentials ? '8%' : '0%', color: '#BFA98A' }
  ]

  return (
    <div className="bg-surface/30 border border-border p-6 rounded-md select-none text-left space-y-6">
      <div className="flex justify-between items-center border-b border-border/20 pb-3 font-mono text-xs">
        <span className="text-accent uppercase font-bold">// SIMULATED CAMPAIGN DELIVERY FUNNEL</span>
        <button
          onClick={() => setFunnelTrigger(p => p + 1)}
          className="text-muted hover:text-accent border border-border/40 hover:border-accent px-2 py-0.5 rounded cursor-none transition-colors"
        >
          REPLAY FLOW
        </button>
      </div>

      <div className="space-y-4">
        {stages.map((st, idx) => (
          <div key={idx} className="space-y-1.5 font-mono text-[10px]">
            <div className="flex justify-between text-muted">
              <span>{st.label.toUpperCase()}</span>
              <span>{st.count} / 500 ({st.percentage})</span>
            </div>
            
            {/* Bar */}
            <div className="h-5 w-full bg-bg/50 border border-border/20 rounded overflow-hidden relative">
              <motion.div
                className="h-full bg-accent/10 border-r border-accent/40"
                initial={{ width: '0%' }}
                animate={{ width: st.percentage }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  backgroundColor: idx === 3 && funnelData.credentials > 0 ? 'rgba(191, 169, 138, 0.15)' : 'rgba(191, 169, 138, 0.05)',
                  borderColor: idx === 3 && funnelData.credentials > 0 ? '#BFA98A' : 'rgba(191, 169, 138, 0.25)'
                }}
              />
              <span className="absolute inset-y-0 left-3 flex items-center text-[9px] text-text font-bold">
                {idx === 3 && funnelData.credentials > 0 ? '⚠ POTENTIAL THREAT VECTOR DETECTED' : ''}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Multi-tenant Isolation Grid
function TenantIsolationGrid() {
  const [hoveredTenant, setHoveredTenant] = useState(null)

  const tenants = [
    { id: 'acme', name: 'Acme Corporate Database', token: 'JWT_SECURE_TOKEN_A', count: '14 Campaigns' },
    { id: 'globex', name: 'Globex Corp Database', token: 'JWT_SECURE_TOKEN_B', count: '8 Campaigns' },
    { id: 'stark', name: 'Stark Industries Database', token: 'JWT_SECURE_TOKEN_C', count: '22 Campaigns' }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-6 select-none text-left">
      {/* Left cards */}
      <div className="lg:col-span-5 space-y-3.5">
        <span className="font-mono text-[9px] text-muted uppercase tracking-widest block mb-4">// active organization databases</span>
        {tenants.map((ten) => {
          const isSelected = hoveredTenant === ten.id
          return (
            <div
              key={ten.id}
              onMouseEnter={() => setHoveredTenant(ten.id)}
              onMouseLeave={() => setHoveredTenant(null)}
              className={`font-mono border rounded p-4 flex justify-between items-center transition-all duration-300 ${
                isSelected 
                  ? 'border-accent bg-accent/5 text-accent shadow-[0_0_15px_rgba(191,169,138,0.02)]' 
                  : 'border-border/60 text-muted'
              }`}
            >
              <div>
                <span className="text-[9px] opacity-65 block">// ID: {ten.id.toUpperCase()}</span>
                <span className="text-xs font-bold block mt-1">{ten.name}</span>
              </div>
              <span className="text-xs font-bold text-sage">{ten.count}</span>
            </div>
          )
        })}
      </div>

      {/* Right details */}
      <div className="lg:col-span-7 bg-surface/30 border border-border p-6 rounded flex flex-col justify-center h-[210px] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-r from-transparent via-accent/5 to-transparent" />
        <AnimatePresence mode="wait">
          {hoveredTenant ? (
            <motion.div
              key={hoveredTenant}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4 font-mono text-[11px]"
            >
              <div className="border-b border-border/20 pb-2 flex justify-between items-baseline">
                <span className="text-accent font-bold uppercase">PRISMA MIDDLEWARE FILTER CHECK</span>
                <span className="text-sage">[VERIFIED ✓]</span>
              </div>
              <div className="space-y-1.5 leading-relaxed text-muted">
                <p>
                  <span className="text-text font-bold block uppercase">// Active Session context:</span>
                  Tenant Session Bound to Token {tenants.find(t => t.id === hoveredTenant).token}
                </p>
                <p>
                  <span className="text-text font-bold block uppercase">// Isolation Enforcement:</span>
                  SQL filter injected automatically: <code className="text-accent">WHERE tenant_id = '{hoveredTenant}'</code>. Query boundaries securely isolated.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="font-mono text-[10px] text-muted/30 uppercase tracking-widest text-center px-4 select-none">
              *Hover over any corporate tenant database card to inspect its Prisma query isolation boundaries.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function PhishGuardCaseStudy() {
  const snippet = {
    lang: 'TypeScript',
    code: `// Enforcing database tenant boundary separation via Prisma Middleware
prisma.$use(async (params, next) => {
  // Catch operations that modify or read campaign tables
  if (params.model === 'Campaign') {
    const tenantId = getRequestContextTenantId();
    
    // Inject tenant ID filter constraint on query operations
    if (params.action === 'findMany' || params.action === 'findFirst') {
      params.args.where = {
        ...params.args.where,
        tenantId: tenantId
      };
    }
  }
  return next(params);
});`
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
              PhishGuard
            </h1>
            <p className="font-body text-base md:text-lg text-text/90 leading-relaxed max-w-xl">
              GoPhish-backed dashboard with a Next.js frontend, featuring multi-tenant database isolation and campaign open/click analytics tracking.
            </p>
            <div className="flex flex-wrap gap-2 py-2">
              {['Next.js 14', 'GoPhish', 'MongoDB', 'Prisma', 'TypeScript'].map((t) => (
                <span key={t} className="font-mono text-[9px] text-muted bg-surface/40 border border-border/30 px-3 py-1 rounded-full uppercase tracking-wider">
                  {t}
                </span>
              ))}
            </div>
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="https://github.com/AmanJ24/phishguard"
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
            <PhishGuardDashboard />
          </div>
        </div>
      </section>

      {/* 02. Overview Section */}
      <section id="project-overview" className="py-16 md:py-24 max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-border/10">
        <div className="lg:col-span-4">
          <span className="font-mono text-xs text-muted tracking-widest uppercase block mb-4">// System Overview</span>
          <h3 className="font-display text-2xl font-light text-text leading-snug">Securing Multi-Tenant Phishing Analytics.</h3>
        </div>
        <div className="lg:col-span-8 text-muted/90 space-y-6 font-body text-base leading-relaxed">
          <p>
            GoPhish is a robust delivery engine, but it lack native multi-tenant boundaries. Standard deployments allow server administrators to view all campaign logs across different organizational segments, compromising isolation policies.
          </p>
          <p>
            <strong>PhishGuard</strong> solves this by placing a Next.js management wrapper on top. Data modeling and database calls run through Prisma schemas mapped against MongoDB. By applying custom Prisma query middleware, all searches are restricted by tenant-tokens, ensuring that analysts can only view campaign logs matching their organizational credentials.
          </p>
        </div>
      </section>

      {/* 03. campaign funnel */}
      <section id="project-pipeline" className="py-16 md:py-24 border-b border-border/10 bg-surface/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-12">
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">// Campaign Funnel Metrics</span>
            <h3 className="font-display text-2xl font-light text-text">Campaign Delivery Pipeline</h3>
          </div>
          <CampaignFunnel />
        </div>
      </section>

      {/* Multi-Tenant Isolation Grid */}
      <section className="py-16 md:py-24 border-b border-border/10 bg-bg">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-12">
            <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-4">// Enforced Security Boundaries</span>
            <h3 className="font-display text-2xl font-light text-text">Database Isolation Grids</h3>
          </div>
          <TenantIsolationGrid />
        </div>
      </section>

      {/* 04. Technical Details & Code block */}
      <section id="project-tech" className="py-16 md:py-24 border-b border-border/10 max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-6">
          <span className="font-mono text-xs text-muted tracking-widest uppercase block mb-2">// Technical Details</span>
          <h3 className="font-display text-2xl font-light text-text">Prisma filter injection.</h3>
          <div className="space-y-4 font-body text-xs text-muted leading-relaxed">
            <p>
              Prisma middleware automatically intercepts read requests on database layers, mapping the security token constraints down to SQL filters.
            </p>
            <p>
              MongoDB handles campaign metrics dynamically. Multi-tenant checks prevent token spoofing, keeping data secure at query compilation.
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
            "Building PhishGuard taught me that database security is not a single check. It is an end-to-end requirement stretching from query layers to backend permissions. Typing dynamic middlewares for Prisma helped keep isolation parameters clean."
          </div>
        </div>
      </section>
    </div>
  )
}
