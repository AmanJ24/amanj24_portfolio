import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { now as nowData } from '../../data/content'
import { useSoundSynth } from '../../hooks/useSoundSynth'
import GlitchText from '../effects/GlitchText'

gsap.registerPlugin(ScrollTrigger)

export default function Now() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const lineRef = useRef(null)
  const { playTick } = useSoundSynth()
  const [currentTime, setCurrentTime] = useState('')
  const [logLines, setLogLines] = useState([
    '[*] Initializing secure local session...',
    '[+] spaCy NLP entity pipelines: ONLINE',
    '[+] Ollama Moondream2 routing: COMPATIBLE',
  ])

  // Real-time server telemetry simulation
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date()
      setCurrentTime(date.toLocaleTimeString('en-US', { hour12: false }))
    }, 1000)

    let logIndex = 0
    const logFeed = setInterval(() => {
      const logs = [
        '[OK] AURA event bus: listening',
        '[OK] sqlite-vec index sync: complete',
        '[OK] BlackSignal Tor circuit: isolated',
        '[OK] Ed25519 signing keys: valid',
      ]
      const nextLine = logs[logIndex]
      logIndex = (logIndex + 1) % logs.length
      setLogLines((prev) => [...prev.slice(-3), `${new Date().toLocaleTimeString('en-US', { hour12: false })} ${nextLine}`])
    }, 4000)

    return () => {
      clearInterval(timer)
      clearInterval(logFeed)
    }
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Dynamic vertical parallax on background letters
      gsap.utils.toArray('.now-bg-letter').forEach((letter, index) => {
        const speed = 0.5 + index * 0.22
        gsap.fromTo(
          letter,
          { y: 60 * speed, opacity: 0.15 },
          {
            y: -60 * speed,
            opacity: 0.45,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        )
      })

      // Horizontal expand line
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-section="now"
      className="relative py-40 md:py-56 overflow-hidden"
      id="now-section"
    >
      {/* Giant Parallax background header */}
      <h2
        ref={headingRef}
        className="absolute -left-4 md:-left-8 top-12 font-display text-[clamp(7rem,24vw,20rem)] font-normal text-text pointer-events-none select-none leading-none flex gap-1 md:gap-3"
        style={{ opacity: 0.35 }}
        aria-hidden="true"
      >
        {['N', 'O', 'W'].map((l, i) => (
          <span key={i} className="now-bg-letter inline-block">
            {l}
          </span>
        ))}
      </h2>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">


        {/* Live Sonar Header */}
        <div className="flex justify-between items-center mb-10 select-none">
          <motion.div
            className="flex items-center gap-5"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage/35" />
              <span className="animate-ping absolute inline-flex h-[170%] w-[170%] rounded-full bg-sage/15 [animation-delay:0.5s]" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sage animate-glow-sage" />
            </span>
            <span className="font-mono text-sm text-muted uppercase tracking-[0.2em]">
              <GlitchText text="Live status" />
            </span>
          </motion.div>

          <span className="font-mono text-xs text-muted/60">
            PING: 18ms · LOCAL TIME: {currentTime || '00:00:00'}
          </span>
        </div>

        {/* Separator line */}
        <div
          ref={lineRef}
          className="h-px w-full bg-gradient-to-r from-sage/40 via-sage/10 to-transparent mb-16 origin-left"
          style={{ transform: 'scaleX(0)' }}
        />

        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16">
          {/* Left Column: Activity List */}
          <div className="space-y-6">
            {nowData.items.map((item, i) => (
              <motion.div
                key={item.label}
                onMouseEnter={playTick}
                className="group flex items-baseline gap-6 p-4 border border-border/10 rounded-md hover:bg-gradient-to-r hover:from-sage/5 hover:to-transparent hover:border-sage/20 transition-all duration-500"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ x: 6 }}
              >
                <span className="font-mono text-sm text-muted w-24 flex-shrink-0 uppercase tracking-[0.15em] group-hover:text-sage transition-colors duration-500 select-none">
                  {item.label}
                </span>
                <span className="font-body text-xl md:text-2xl text-text group-hover:text-accent transition-colors duration-500">
                  {item.value}
                </span>
              </motion.div>
            ))}

            <motion.div
              className="font-mono text-[10px] text-muted/40 uppercase tracking-[0.15em] pt-4 block select-none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Uptime: verified active · Last synced: {nowData.lastUpdated}
            </motion.div>
          </div>

          {/* Right Column: Interactive Cyber Diagnostics terminal console */}
          <motion.div
            className="bg-surface/25 border border-border/50 rounded-md p-6 font-mono text-xs flex flex-col justify-between shadow-lg h-[260px] relative hover:border-sage/35 transition-colors duration-500 crt-terminal"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Terminal Top bar */}
            <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-4 select-none text-muted/50">
              <span className="text-[10px] tracking-wide uppercase">aman@status:~ --telemetry</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-border" />
                <span className="w-1.5 h-1.5 rounded-full bg-border" />
                <span className="w-1.5 h-1.5 rounded-full bg-border" />
              </div>
            </div>

            {/* Simulated Live telemetry console feed */}
            <div className="flex-1 space-y-3 font-mono text-muted overflow-hidden">
              <p className="text-sage/80 select-none">&gt; cat config/diagnostics.log</p>
              {logLines.map((line, idx) => (
                <motion.p
                  key={idx}
                  className={`${line.includes('[OK]') || line.includes('[+]') ? 'text-sage/90' : 'text-muted/80'} leading-relaxed font-mono`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Input prompt blink */}
            <div className="pt-3 border-t border-border/20 text-muted/30 select-none text-[10px] flex justify-between items-center">
              <span>Status: continuous logs parsing</span>
              <span className="animate-pulse">ONLINE █</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
