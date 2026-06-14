import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { numbers } from '../../data/content'
import NetworkMesh from '../canvas/NetworkMesh'

gsap.registerPlugin(ScrollTrigger)

export default function Numbers() {
  const sectionRef = useRef(null)
  const counterRefs = useRef([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      counterRefs.current.forEach((el, i) => {
        if (!el) return
        const item = numbers[i]

        // Slide up entrance
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        )

        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          onEnter: () => {
            const targetVal = item.value
            const valueEl = el.querySelector('.counter-value')
            if (!valueEl) return

            const chars = '0123456789%X#@$&?/\\<>*!+-='
            const length = targetVal.length
            let frame = 0
            const totalFrames = 80 // duration around 1.3s at 60fps

            const decrypt = () => {
              frame++
              let result = ''
              const progress = frame / totalFrames

              for (let i = 0; i < length; i++) {
                if (targetVal[i] === ' ') {
                  result += ' '
                  continue
                }
                
                // Gradually resolve from left to right
                if (i / length < progress - 0.1) {
                  result += targetVal[i]
                } else {
                  result += chars[Math.floor(Math.random() * chars.length)]
                }
              }

              valueEl.textContent = result

              if (frame < totalFrames) {
                requestAnimationFrame(decrypt)
              } else {
                valueEl.textContent = targetVal
              }
            }

            requestAnimationFrame(decrypt)
          },
          once: true,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-section="numbers"
      className="relative py-40 md:py-56 overflow-hidden"
      id="numbers-section"
    >
      {/* Scoped background particle mesh */}
      <NetworkMesh />

      {/* Section counter */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-24 relative z-10">
        <span className="font-mono text-xs text-muted tracking-widest">04 / 09</span>
      </div>

      {/* Counters grid */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {numbers.map((item, i) => (
            <motion.div
              key={item.label}
              ref={(el) => (counterRefs.current[i] = el)}
              className="group text-center md:text-left"
              style={{ opacity: 0 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="counter-value font-display text-hero font-normal text-accent block mb-4">
                0
              </span>
              <span className="font-mono text-xs text-muted uppercase tracking-[0.15em] group-hover:text-text transition-colors duration-500">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
