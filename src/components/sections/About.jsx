import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { about } from '../../data/content'
import InteractiveGrid from '../canvas/InteractiveGrid'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const p1Ref = useRef(null)
  const p2Ref = useRef(null)
  const metaRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Decorative "ABOUT" letters separate speed vertical parallax with high contrast opacity
      gsap.utils.toArray('.about-bg-letter').forEach((letter, index) => {
        const speed = 0.4 + index * 0.18
        gsap.fromTo(
          letter,
          { y: 70 * speed, opacity: 0.15 },
          {
            y: -70 * speed,
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

      // Paragraph 1 — words slide up
      gsap.fromTo(
        p1Ref.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: p1Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Paragraph 2 — staggered
      gsap.fromTo(
        p2Ref.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: p2Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Accent line grows
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Meta info slides up
      gsap.fromTo(
        metaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: metaRef.current,
            start: 'top 85%',
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
      data-section="about"
      className="relative py-40 md:py-56 overflow-hidden"
      id="about-section"
    >
      {/* Interactive hex-grid nodes */}
      <InteractiveGrid />

      {/* Background Graphic Asset */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none select-none mix-blend-lighten"
        style={{
          backgroundImage: 'url("/assets/about-bg.png")',
          opacity: 0.08
        }}
      />



      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative">
        {/* Giant decorative "ABOUT" — split letters with dynamic speed parallax */}
        <h2
          ref={headingRef}
          className="absolute -left-4 md:-left-8 top-0 font-display text-[clamp(7rem,22vw,18rem)] font-normal text-text pointer-events-none select-none leading-none flex gap-1 md:gap-3"
          style={{ opacity: 0.35 }}
          aria-hidden="true"
        >
          {['A', 'B', 'O', 'U', 'T'].map((l, i) => (
            <span key={i} className="about-bg-letter inline-block">
              {l}
            </span>
          ))}
        </h2>

        {/* Content area — offset right for asymmetry */}
        <div className="relative z-10 ml-auto max-w-2xl">
          {/* Paragraph 1 */}
          <p
            ref={p1Ref}
            className="font-body text-body-lg text-text leading-[1.8] mb-8"
            style={{ opacity: 0 }}
          >
            {about.p1}
          </p>

          {/* Paragraph 2 */}
          <p
            ref={p2Ref}
            className="font-body text-body-lg text-muted leading-[1.8] mb-14"
            style={{ opacity: 0 }}
          >
            {about.p2}
          </p>

          {/* Accent line */}
          <div
            ref={lineRef}
            className="h-px w-full bg-gradient-to-r from-accent/60 via-accent/20 to-transparent mb-10 origin-left"
            style={{ transform: 'scaleX(0)' }}
          />

          {/* Meta info with hover effects */}
          <div ref={metaRef} className="space-y-5" style={{ opacity: 0 }}>
            {about.meta.map((item) => (
              <motion.div
                key={item.label}
                className="group flex items-baseline gap-8"
                whileHover={{ x: 6 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <span className="font-mono text-xs text-muted w-20 flex-shrink-0 uppercase tracking-[0.15em] group-hover:text-accent transition-colors duration-500">
                  {item.label}
                </span>
                <span className="font-body text-base text-text group-hover:text-accent transition-colors duration-500">
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
