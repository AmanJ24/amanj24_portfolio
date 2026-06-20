import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { person } from '../../data/content'
import Magnetic from '../effects/Magnetic'
import { useSoundSynth } from '../../hooks/useSoundSynth'
import MatrixRain from '../canvas/MatrixRain'
import GlitchText from '../effects/GlitchText'

gsap.registerPlugin(ScrollTrigger)

/* ─── Elastic character wrapper for micro-interaction ─── */
function ElasticChar({ char }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const { playTick } = useSoundSynth()
  const rectRef = useRef(null)

  const handleMouseEnter = (e) => {
    rectRef.current = e.currentTarget.getBoundingClientRect()
    playTick()
  }

  const handleMouseMove = (e) => {
    let rect = rectRef.current
    if (!rect) {
      rect = e.currentTarget.getBoundingClientRect()
      rectRef.current = rect
    }
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    
    // Proportional offset pulling
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    
    setOffset({
      x: dx * 0.45,
      y: dy * 0.45
    })
  }

  const handleMouseLeave = () => {
    // Snap back
    setOffset({ x: 0, y: 0 })
    rectRef.current = null
  }

  return (
    <span
      className="email-char inline-block cursor-none select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        opacity: 1,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        // Elastic transition timing on snapback
        transition: offset.x === 0 && offset.y === 0 
          ? 'transform 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
          : 'transform 0.05s ease-out'
      }}
    >
      {char === '@' ? (
        <span className="text-accent">{char}</span>
      ) : char}
    </span>
  )
}

export default function Contact() {
  const sectionRef = useRef(null)
  const emailRef = useRef(null)
  const lineLeftRef = useRef(null)
  const lineRightRef = useRef(null)
  const { playTick, playClick } = useSoundSynth()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set('.email-char', { opacity: 1, y: 0 })
      gsap.set(lineLeftRef.current, { scaleX: 1 })
      gsap.set(lineRightRef.current, { scaleX: 1 })
      return
    }

    const ctx = gsap.context(() => {
      // Stagger resolve of email characters
      const emailChars = emailRef.current?.querySelectorAll('.email-char')
      if (emailChars?.length) {
        gsap.fromTo(
          emailChars,
          { y: 80, opacity: 0, rotateX: -40 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Expand dividers
      gsap.fromTo(
        lineLeftRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      )
      gsap.fromTo(
        lineRightRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const emailCharsArray = person.email.split('')

  return (
    <section
      ref={sectionRef}
      data-section="contact"
      className="relative py-40 md:py-56 overflow-hidden noise-overlay"
      id="contact-section"
    >
      {/* Falling matrix code rain background */}
      <MatrixRain />

      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-surface/40 to-bg pointer-events-none z-10" />

      <div className="relative z-20 max-w-[1280px] mx-auto px-6 md:px-12">


        {/* Label */}
        <motion.div
          className="text-center mb-16 select-none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-sm text-muted uppercase tracking-[0.3em]">
            <GlitchText text="Get in touch" />
          </span>
        </motion.div>

        {/* Divider lines */}
        <div className="flex items-center gap-6 mb-12 md:mb-16 select-none">
          <div
            ref={lineLeftRef}
            className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/30 to-accent/10 origin-right"
            style={{ transform: 'scaleX(0)' }}
          />
          <span className="font-mono text-xs text-accent/40">✦</span>
          <div
            ref={lineRightRef}
            className="flex-1 h-px bg-gradient-to-l from-transparent via-accent/30 to-accent/10 origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Interactive Email address */}
        <div className="text-center mb-12 md:mb-16">
          <a
            ref={emailRef}
            href={`mailto:${person.email}`}
            onClick={playClick}
            className="inline-block font-display text-[clamp(1.8rem,6vw,5.5rem)] font-normal leading-tight text-text hover:text-accent transition-colors duration-300"
            style={{ perspective: '600px' }}
          >
            {emailCharsArray.map((char, i) => (
              <ElasticChar key={i} char={char} />
            ))}
          </a>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-center font-body text-base text-muted mb-4 max-w-md mx-auto select-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Open to full-time, internships, and remote opportunities.
        </motion.p>

        {/* Human touch note */}
        <motion.p
          className="text-center font-body text-sm text-accent/80 mb-20 select-none italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          I read everything that lands here.
        </motion.p>

        {/* Magnetic Icon links */}
        <motion.div
          className="flex justify-center items-center gap-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* GitHub */}
          <Magnetic range={40} strength={0.4}>
            <a
              href={person.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playTick}
              onClick={playClick}
              className="group flex flex-col items-center gap-3 px-2 py-1 cursor-none"
            >
              <div className="w-14 h-14 rounded-full border border-border/50 flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-500">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-muted group-hover:text-text transition-colors duration-500">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <span className="font-mono text-xs text-muted group-hover:text-text transition-colors duration-500">
                GitHub
              </span>
            </a>
          </Magnetic>

          <span className="w-1 h-1 rounded-full bg-border select-none" />

          {/* LinkedIn */}
          <Magnetic range={40} strength={0.4}>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playTick}
              onClick={playClick}
              className="group flex flex-col items-center gap-3 px-2 py-1 cursor-none"
            >
              <div className="w-14 h-14 rounded-full border border-border/50 flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-500">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-muted group-hover:text-text transition-colors duration-500">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span className="font-mono text-xs text-muted group-hover:text-text transition-colors duration-500">
                LinkedIn
              </span>
            </a>
          </Magnetic>

          <span className="w-1 h-1 rounded-full bg-border select-none" />

          {/* Email */}
          <Magnetic range={40} strength={0.4}>
            <a
              href={`mailto:${person.email}`}
              onMouseEnter={playTick}
              onClick={playClick}
              className="group flex flex-col items-center gap-3 px-2 py-1 cursor-none"
            >
              <div className="w-14 h-14 rounded-full border border-border/50 flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-500">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted group-hover:text-text transition-colors duration-500">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="M22 6l-10 7L2 6" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-mono text-xs text-muted group-hover:text-text transition-colors duration-500">
                Email
              </span>
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
