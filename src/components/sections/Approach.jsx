import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import GlitchText from '../effects/GlitchText'

gsap.registerPlugin(ScrollTrigger)

// Custom visual widgets per protocol card
function CryptoWidget({ isHovered }) {
  const [hex, setHex] = useState('0x00000000')
  
  useEffect(() => {
    if (!isHovered) {
      setHex('0x5ECA3F7B')
      return
    }

    const interval = setInterval(() => {
      const chars = '0123456789ABCDEF'
      let result = '0x'
      for (let i = 0; i < 8; i++) {
        result += chars[Math.floor(Math.random() * 16)]
      }
      setHex(result)
    }, 80)

    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <div className="font-mono text-[10px] p-4 bg-bg/60 border border-border/40 rounded flex flex-col justify-between h-28 select-none">
      <div className="flex justify-between items-center text-[8px] text-muted border-b border-border/20 pb-1.5">
        <span>// CRYPTO_DECRYPTOR</span>
        <span className={isHovered ? "text-accent animate-pulse" : "text-muted"}>● ACTIVE</span>
      </div>
      <div className="text-center py-2">
        <span className={`text-sm font-bold ${isHovered ? 'text-accent tracking-widest' : 'text-text/70'} transition-all duration-300`}>
          {hex}
        </span>
      </div>
      <div className="text-[8px] text-muted/60 flex justify-between">
        <span>ALGO: ED25519</span>
        <span className={isHovered ? "text-sage" : "text-muted/40"}>{isHovered ? "HASH_RESOLVED" : "STANDBY"}</span>
      </div>
    </div>
  )
}

function SandboxWidget({ isHovered }) {
  return (
    <div className="p-4 bg-bg/60 border border-border/40 rounded h-28 flex flex-col justify-between select-none relative overflow-hidden">
      <div className="flex justify-between items-center text-[8px] text-muted border-b border-border/20 pb-1.5 relative z-10 font-mono">
        <span>// NETWORK_MAP</span>
        <span>PORT: 9050</span>
      </div>
      
      {/* SVG node connection map */}
      <div className="flex justify-around items-center py-2 relative z-10">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div 
              className={`w-3.5 h-3.5 rounded-full border border-border flex items-center justify-center transition-all duration-500 ${
                isHovered 
                  ? 'border-accent bg-accent/10 shadow-[0_0_10px_rgba(191,169,138,0.4)]' 
                  : 'bg-surface'
              }`}
            >
              <div className={`w-1 h-1 rounded-full ${isHovered ? 'bg-accent animate-ping' : 'bg-muted/40'}`} />
            </div>
            {i < 2 && (
              <svg width="24" height="2" viewBox="0 0 24 2" className="text-border">
                <line 
                  x1="0" 
                  y1="1" 
                  x2="24" 
                  y2="1" 
                  stroke="currentColor" 
                  strokeWidth="1.2" 
                  strokeDasharray={isHovered ? "3 1" : "none"}
                />
              </svg>
            )}
          </div>
        ))}
      </div>
      
      <div className="text-[8px] text-muted/60 flex justify-between relative z-10 font-mono">
        <span>CIRCUIT: ISOLATED</span>
        <span className={isHovered ? "text-sage font-bold" : "text-muted/40"}>{isHovered ? "SECURE_ROUTE" : "WAITING"}</span>
      </div>
    </div>
  )
}

function MemoryWidget({ isHovered }) {
  const [offsets, setOffsets] = useState(['0x7FFF', '0x1C2B', '0x00FF'])

  useEffect(() => {
    if (!isHovered) return

    const interval = setInterval(() => {
      const genOffset = () => '0x' + Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0')
      setOffsets([genOffset(), genOffset(), genOffset()])
    }, 120)

    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <div className="font-mono text-[8px] p-3 bg-bg/60 border border-border/40 rounded h-28 flex flex-col justify-between select-none">
      <div className="flex justify-between items-center text-muted border-b border-border/20 pb-1 mb-1">
        <span>// STACK_AUDITOR</span>
        <span className={isHovered ? "text-sage font-bold" : "text-muted"}>SHIELD: ACTIVE</span>
      </div>
      <div className="space-y-0.5 text-muted/50 leading-tight">
        {offsets.map((off, idx) => (
          <div key={idx} className="flex justify-between">
            <span>REG_EBP_{idx}</span>
            <span className={isHovered ? "text-accent" : "text-muted/60"}>{off}</span>
            <span className="text-sage">[OK]</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function LabCard({ item, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  const renderWidget = (num) => {
    switch (num) {
      case '001':
        return <CryptoWidget isHovered={isHovered} />
      case '002':
        return <SandboxWidget isHovered={isHovered} />
      case '003':
        return <MemoryWidget isHovered={isHovered} />
      default:
        return null
    }
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="approach-card group relative bg-surface/10 border border-border/30 hover:border-accent/40 rounded-md p-6 md:p-8 flex flex-col justify-between select-none cursor-none shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:shadow-[0_0_30px_rgba(191,169,138,0.03)] h-[380px] overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      style={{
        backgroundColor: 'rgba(28, 26, 23, 0.1)'
      }}
    >
      {/* Dynamic Gold LightSweep Overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'radial-gradient(280px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(191, 169, 138, 0.075), transparent 80%)'
        }}
      />

      <div className="relative z-10 flex justify-between items-baseline mb-4">
        <span className="font-mono text-2xl text-accent/40 group-hover:text-accent transition-colors duration-500 tabular-nums font-light">
          {item.num}
        </span>
        <span className="font-mono text-[8px] text-muted/40 uppercase tracking-widest">// SEC_LAB_PROTO</span>
      </div>

      <div className="relative z-10 space-y-4">
        <h4 className="font-display text-xl font-light text-text group-hover:text-accent transition-colors duration-300">
          {item.title}
        </h4>
        <p className="font-body text-xs leading-relaxed text-muted group-hover:text-text/80 transition-colors duration-500 h-14 overflow-hidden">
          {item.text}
        </p>
      </div>

      <div className="relative z-10 mt-6 border-t border-border/20 pt-5">
        {renderWidget(item.num)}
      </div>
    </motion.div>
  )
}

export default function Approach() {
  const sectionRef = useRef(null)

  const protocols = [
    { num: '001', title: 'Cryptographic Auditing', text: 'Enforcing asymmetric signature integrity in browser environments via isolated clientside keys.' },
    { num: '002', title: 'Circuit Proxy Sandbox', text: 'Routing sensitive threat analysis requests through isolated Tor circuit routing streams.' },
    { num: '003', title: 'Vulnerability Detection', text: 'Executing real-time memory stack boundary audits and secure Unix domain authentication.' },
  ]

  return (
    <section
      ref={sectionRef}
      data-section="approach"
      className="py-40 md:py-56 relative overflow-hidden"
      id="approach-section"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        {/* Section counter */}
        <span className="font-mono text-xs text-muted tracking-widest block mb-6">06 / 09</span>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mb-20 md:mb-28"
        >
          <span className="font-mono text-sm text-muted uppercase tracking-[0.2em] block mb-4">
            <GlitchText text="Security Labs" />
          </span>
          <div className="h-px w-16 bg-accent/30" />
        </motion.div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {protocols.map((item, i) => (
            <LabCard key={item.num} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
