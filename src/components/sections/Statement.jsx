import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { statement, marqueeDevLogos, marqueeSecLogos } from '../../data/content'
import NetworkMesh from '../canvas/NetworkMesh'

gsap.registerPlugin(ScrollTrigger)

function MarqueeStrip({ items, reverse = false, className = '' }) {
  // We duplicate items exactly twice to construct a clean repeating track for the marquee translateX(-50%)
  const repeatedItems = [...items, ...items]

  return (
    <div className={`overflow-hidden whitespace-nowrap py-6 ${className}`}>
      {/* Track container to capture skewX transformations */}
      <div className={`marquee-track inline-flex gap-20 items-center ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {repeatedItems.map((item, idx) => (
          <div
            key={`${item.slug}-${idx}`}
            className="inline-flex items-center justify-center group/logo relative px-4"
            title={item.name}
          >
            <img
              src={`https://cdn.simpleicons.org/${item.slug}/BFA98A`}
              alt={item.name}
              className="w-10 h-10 md:w-12 md:h-12 object-contain max-w-none transition-all duration-500 opacity-50 group-hover/logo:opacity-100 group-hover/logo:scale-110 group-hover/logo:brightness-125 filter group-hover/logo:drop-shadow-[0_0_12px_rgba(191,169,138,0.4)]"
            />
          </div>
        ))}
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
        <MarqueeStrip items={marqueeDevLogos} />
        <div className="h-px bg-border/20" />
        <MarqueeStrip items={marqueeSecLogos} reverse />
      </div>
    </section>
  )
}
