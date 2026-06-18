import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { tryhackmeStats, professionalExperience } from '../../data/content'
import { useSoundSynth } from '../../hooks/useSoundSynth'
import GlitchText from '../effects/GlitchText'
import Tilt from '../effects/Tilt'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const { playTick, playClick } = useSoundSynth()
  const [activeTab, setActiveTab] = useState('metrics') // 'metrics' or 'badges'

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Background parallax effect on large title
      gsap.fromTo(
        '.exp-bg-letter',
        { y: 50, opacity: 0.04 },
        {
          y: -50,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        }
      )

      // Accent divider line expansion
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
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
      data-section="experience"
      className="relative py-32 md:py-48 overflow-hidden min-h-screen"
      id="experience-section"
    >
      {/* Parallax background heading */}
      <h2
        className="absolute -left-4 md:-left-8 top-16 font-display text-[clamp(6rem,20vw,16rem)] font-normal text-text pointer-events-none select-none leading-none flex gap-1 md:gap-3"
        style={{ opacity: 0.12 }}
        aria-hidden="true"
      >
        {['E', 'X', 'P'].map((l, i) => (
          <span key={i} className="exp-bg-letter inline-block">
            {l}
          </span>
        ))}
      </h2>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 select-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="font-mono text-xs text-muted uppercase tracking-[0.2em] block mb-3">
              // TELEMETRY & RECORDS
            </span>
            <h2 className="font-display text-display font-normal text-text">
              <GlitchText text="Lab Experience" />
            </h2>
          </motion.div>

          <motion.div
            className="flex gap-4 mt-6 md:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => {
                playClick()
                setActiveTab('metrics')
              }}
              onMouseEnter={playTick}
              className={`font-mono text-xs px-5 py-2 rounded-full border transition-all duration-300 cursor-none ${
                activeTab === 'metrics'
                  ? 'border-accent text-accent bg-accent/5 shadow-[0_0_15px_rgba(191,169,138,0.1)]'
                  : 'border-border/60 text-muted hover:text-text hover:border-accent/40'
              }`}
            >
              System Metrics
            </button>
            <button
              onClick={() => {
                playClick()
                setActiveTab('badges')
              }}
              onMouseEnter={playTick}
              className={`font-mono text-xs px-5 py-2 rounded-full border transition-all duration-300 cursor-none ${
                activeTab === 'badges'
                  ? 'border-accent text-accent bg-accent/5 shadow-[0_0_15px_rgba(191,169,138,0.1)]'
                  : 'border-border/60 text-muted hover:text-text hover:border-accent/40'
              }`}
            >
              Security Badges ({tryhackmeStats.badgesCount})
            </button>
          </motion.div>
        </div>

        {/* Separator line */}
        <div
          ref={lineRef}
          className="h-px w-full bg-gradient-to-r from-accent/40 via-accent/10 to-transparent mb-16 origin-left"
          style={{ transform: 'scaleX(0)' }}
        />

        {/* Main Grid: Telemetry/Badges + Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: TryHackMe Metrics Dashboard */}
          <div className="lg:col-span-7">
            {activeTab === 'metrics' ? (
              <motion.div
                key="metrics-tab"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Cybersecurity CRT Terminal Panel */}
                <div className="bg-surface/20 border border-border/50 rounded-md p-6 md:p-8 relative font-mono shadow-xl crt-terminal hover:border-accent/35 transition-colors duration-500">
                  <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-6 select-none text-muted/50 text-[10px]">
                    <span>SECURE METRICS DOCKER // TRYHACKME API</span>
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage/60 animate-pulse" />
                      <span>LIVE</span>
                    </div>
                  </div>

                  {/* Terminal Stats Grid */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="p-4 border border-border/20 rounded bg-bg/40 hover:bg-bg/65 transition-colors duration-300">
                      <span className="text-[10px] text-muted uppercase tracking-wider block mb-1">GLOBAL RANK</span>
                      <span className="text-xl md:text-2xl text-accent font-bold">{tryhackmeStats.rank}</span>
                    </div>
                    <div className="p-4 border border-border/20 rounded bg-bg/40 hover:bg-bg/65 transition-colors duration-300">
                      <span className="text-[10px] text-muted uppercase tracking-wider block mb-1">PERCENTILE</span>
                      <span className="text-xl md:text-2xl text-sage font-bold flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-sage animate-glow-sage inline-block" />
                        {tryhackmeStats.percentile}
                      </span>
                    </div>
                    <div className="p-4 border border-border/20 rounded bg-bg/40 hover:bg-bg/65 transition-colors duration-300">
                      <span className="text-[10px] text-muted uppercase tracking-wider block mb-1">ROOMS COMPLETED</span>
                      <span className="text-xl md:text-2xl text-text font-bold">{tryhackmeStats.completedRooms}</span>
                    </div>
                    <div className="p-4 border border-border/20 rounded bg-bg/40 hover:bg-bg/65 transition-colors duration-300">
                      <span className="text-[10px] text-muted uppercase tracking-wider block mb-1">BADGES COLLECTED</span>
                      <span className="text-xl md:text-2xl text-text font-bold">{tryhackmeStats.badgesCount}</span>
                    </div>
                  </div>

                  {/* Activity Log */}
                  <div className="space-y-2 border-t border-border/25 pt-6 text-[11px] text-muted/80">
                    <p className="text-sage/80 font-mono">&gt; fetch tryhackme --user {tryhackmeStats.username}</p>
                    <p className="font-mono">[✓] Connection established. Telemetry synchronized.</p>
                    <p className="font-mono">[+] 2025 Activity Density: {tryhackmeStats.yearlyActivity['2025']}</p>
                    <p className="font-mono">[+] 2026 Activity Density: {tryhackmeStats.yearlyActivity['2026']}</p>
                  </div>
                </div>

                {/* Training Highlights */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs text-muted uppercase tracking-widest select-none">
                    // CORE SPECIALIZATIONS
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {tryhackmeStats.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 border border-border/30 rounded bg-surface/10 hover:border-accent/30 transition-all duration-300 hover:bg-surface/15"
                        onMouseEnter={playTick}
                      >
                        <h4 className="font-body text-sm text-text font-bold mb-2 group-hover:text-accent">
                          {item.title}
                        </h4>
                        <p className="font-body text-xs text-muted leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="badges-tab"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Badges Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tryhackmeStats.topBadges.map((badge, idx) => (
                    <Tilt key={idx} maxRotation={6} scale={1.02}>
                      <div
                        className="p-5 border border-border/30 rounded bg-surface/10 flex flex-col justify-between h-[150px] relative overflow-hidden group hover:border-accent/40 hover:bg-surface2/10 transition-colors duration-500 cursor-none"
                        onMouseEnter={playTick}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-mono text-[8px] uppercase tracking-wider text-accent/60">⚑ BADGE</span>
                            <span className={`font-mono text-[8px] px-2 py-0.5 rounded-full ${
                              badge.rarity.includes('Epic') 
                                ? 'bg-accent/15 text-accent border border-accent/20' 
                                : 'bg-sage/10 text-sage border border-sage/20'
                            }`}>
                              {badge.rarity.split(' ')[0]}
                            </span>
                          </div>
                          <h4 className="font-body text-sm font-semibold text-text group-hover:text-accent transition-colors duration-300">
                            {badge.name}
                          </h4>
                        </div>
                        <p className="font-body text-[10px] text-muted leading-relaxed">
                          {badge.desc}
                        </p>
                      </div>
                    </Tilt>
                  ))}
                </div>
                <div className="font-mono text-[10px] text-muted/40 uppercase tracking-[0.15em] text-center pt-2 select-none">
                  And 31 additional defensive & offensive badges earned.
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Experience Timeline */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <h3 className="font-mono text-xs text-muted uppercase tracking-widest mb-8 select-none">
              // TIMELINE OF AUDITING & PENTESTING
            </h3>

            <div className="relative border-l border-border/40 pl-6 md:pl-8 ml-3 space-y-12">
              {professionalExperience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                >
                  {/* Timeline point indicator */}
                  <span className="absolute -left-[31px] md:-left-[39px] top-1.5 flex h-4 w-4 items-center justify-center bg-bg">
                    <span className="h-2 w-2 rounded-full bg-accent animate-glow-sage" />
                  </span>

                  {/* Header info */}
                  <div className="mb-4">
                    <span className="font-mono text-xs text-accent/80 uppercase tracking-widest">
                      {exp.period}
                    </span>
                    <h4 className="font-display text-xl font-light text-text mt-1">
                      {exp.role}
                    </h4>
                    <p className="font-mono text-xs text-muted uppercase tracking-wider mt-0.5">
                      {exp.company}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="font-body text-sm text-text/80 leading-relaxed mb-6">
                    {exp.desc}
                  </p>

                  {/* Key Achievements Bullet list */}
                  <ul className="space-y-3 font-body text-xs text-muted">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-accent mt-0.5 select-none">✦</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
