import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { approach } from '../../data/content'
import { useSoundSynth } from '../../hooks/useSoundSynth'

gsap.registerPlugin(ScrollTrigger)

function ApproachItem({ item, index }) {
  const { playTick } = useSoundSynth()

  return (
    <motion.div
      className="approach-line group relative border-b border-border/40 py-10 md:py-14"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{ x: 12 }}
      onMouseEnter={playTick}
    >
      <div className="flex items-baseline gap-8 md:gap-14">
        {/* Number */}
        <motion.span
          className="font-mono text-2xl md:text-3xl text-accent/40 flex-shrink-0 tabular-nums group-hover:text-accent transition-colors duration-500"
        >
          {item.num}
        </motion.span>

        {/* Separator */}
        <span className="font-mono text-lg text-border group-hover:text-accent/40 transition-colors duration-500 flex-shrink-0">
          —
        </span>

        {/* Wave letter cascade animation with correct word wrapping */}
        <p className="font-body text-xl3 text-text/80 group-hover:text-text transition-colors duration-500 leading-snug select-none flex flex-wrap">
          {(() => {
            let charCounter = 0
            return item.text.split(' ').map((word, wi) => (
              <span key={wi} className="inline-block whitespace-nowrap mr-[0.28em]">
                {word.split('').map((char, ci) => {
                  const globalIdx = charCounter++
                  return (
                    <span
                      key={ci}
                      className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-1"
                      style={{
                        transitionDelay: `${globalIdx * 5}ms`
                      }}
                    >
                      {char}
                    </span>
                  )
                })}
              </span>
            ))
          })()}
        </p>
      </div>

      {/* Hover indicator arrow */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#BFA98A" strokeWidth="1.5">
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default function Approach() {
  const sectionRef = useRef(null)

  return (
    <section
      ref={sectionRef}
      data-section="approach"
      className="py-40 md:py-56"
      id="approach-section"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
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
            How I work
          </span>
          <div className="h-px w-16 bg-accent/30" />
        </motion.div>

        {/* Approach items */}
        <div>
          {approach.map((item, i) => (
            <ApproachItem key={item.num} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
