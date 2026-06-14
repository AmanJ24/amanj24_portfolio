import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { statement, marqueeDevSkills, marqueeSecSkills } from '../../data/content'
import NetworkMesh from '../canvas/NetworkMesh'

gsap.registerPlugin(ScrollTrigger)

function MarqueeStrip({ items, reverse = false, className = '' }) {
  const content = [...items, ...items, ...items, ...items].join('  ·  ') + '  ·  '

  return (
    <div className={`overflow-hidden whitespace-nowrap py-4 ${className}`}>
      {/* Track container to capture skewX transformations */}
      <div className={`marquee-track inline-flex ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        <span className="font-mono text-sm md:text-base text-muted/50 inline-block pr-6 tracking-wider">
          {content}
        </span>
        <span className="font-mono text-sm md:text-base text-muted/50 inline-block pr-6 tracking-wider">
          {content}
        </span>
      </div>
    </div>
  )
}

export default function Statement() {
  const sectionRef = useRef(null)
  const paragraphRef = useRef(null)
  const wordsRef = useRef([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Show immediately without motion
      wordsRef.current.forEach(el => {
        if (el) el.style.opacity = '1'
      })
      return
    }

    const ctx = gsap.context(() => {
      // 1. Scroll-Scrub Typography Reveal: Words light up as they enter view
      gsap.fromTo(
        wordsRef.current.filter(Boolean),
        { opacity: 0.18, y: 5 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: 'top 80%',
            end: 'bottom 55%',
            scrub: 0.5,
          },
        }
      )

      // 2. Velocity-Based Marquee Skewing
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          // Calculate skew based on scroll velocity (capped at 10/-10 deg)
          const velocity = self.getVelocity()
          const skew = gsap.utils.clamp(-10, 10, velocity / 250)
          
          // Apply dynamic skew deformation
          gsap.to('.marquee-track', {
            skewX: skew,
            duration: 0.18,
            ease: 'power2.out',
            overwrite: 'auto'
          })

          // Elastic recovery snap back to 0
          gsap.to('.marquee-track', {
            skewX: 0,
            duration: 0.65,
            ease: 'power3.out',
            delay: 0.04,
            overwrite: 'auto'
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const words = statement.split(' ')

  return (
    <section
      ref={sectionRef}
      data-section="statement"
      className="relative py-40 md:py-56 overflow-hidden"
      id="statement-section"
    >
      {/* Scoped background particle mesh */}
      <NetworkMesh />

      {/* Section counter */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-20 relative z-10">
        <span className="font-mono text-xs text-muted tracking-widest">02 / 09</span>
      </div>

      {/* Statement text */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-28 md:mb-40 relative z-10">
        <p
          ref={paragraphRef}
          className="font-display text-display font-normal text-text text-center max-w-5xl mx-auto leading-[1.15]"
        >
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => (wordsRef.current[i] = el)}
              className="inline-block mr-[0.28em] transition-opacity duration-300 select-none"
              style={{ opacity: 0.18 }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* Marquee strips */}
      <div className="border-y border-border/40 select-none relative z-10">
        <MarqueeStrip items={marqueeDevSkills} />
        <div className="h-px bg-border/20" />
        <MarqueeStrip items={marqueeSecSkills} reverse />
      </div>
    </section>
  )
}
