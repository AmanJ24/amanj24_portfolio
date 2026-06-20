import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { person } from '../../data/content'
import { useAssets } from '../../hooks/useAssets'
import Magnetic from '../effects/Magnetic'
import { useSoundSynth } from '../../hooks/useSoundSynth'

export default function Hero() {
  const { hasHeroVideo } = useAssets()
  const heroRef = useRef(null)
  const subtitleRef = useRef(null)
  const { playTick, playClick } = useSoundSynth()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Bypassed state: instantly show subtitle and title characters
      gsap.set('.hero-char', { opacity: 1, y: 0 })
      gsap.set(subtitleRef.current, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      // Split character layout entrance
      gsap.fromTo(
        '.hero-char',
        { y: 120, opacity: 0, rotate: 4 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.4,
          stagger: 0.03,
          ease: 'power4.out',
          delay: 0.2
        }
      )

      // Subtitle animations
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 1.0 }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleScrollClick = () => {
    playClick()
    const target = document.getElementById('statement-section')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const nameChars = person.name.split('')

  return (
    <section
      ref={heroRef}
      data-section="hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      id="hero-section"
    >
      {/* Background: video, fallback transparent global background exposure */}
      {hasHeroVideo ? (
        <video
          src="/assets/videos/typing.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      ) : null}

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'rgba(9,8,10,0.65)' }}
      />

      {/* Hero text (centered vertically and horizontally) */}
      <div className="relative z-20 px-6 max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center">
        <h1
          className="font-display text-hero font-light text-text leading-none flex flex-wrap justify-center select-none"
          style={{ perspective: '800px' }}
        >
          {nameChars.map((char, index) => (
            <span
              key={index}
              className="hero-char inline-block origin-bottom-left"
              style={{
                opacity: 0,
                whiteSpace: char === ' ' ? 'pre' : 'normal',
                transformStyle: 'preserve-3d'
              }}
            >
              {char}
            </span>
          ))}
        </h1>
        <p
          ref={subtitleRef}
          className="font-mono text-sm md:text-base text-muted mt-6 tracking-widest uppercase"
          style={{ opacity: 0 }}
        >
          Security · Developer
        </p>
      </div>

      {/* Scroll cue wrapped in Magnetic component */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex justify-center items-center">
        <Magnetic range={45} strength={0.45}>
          <button
            onClick={handleScrollClick}
            onMouseEnter={playTick}
            className="w-12 h-12 rounded-full border border-border/60 hover:border-accent/60 flex items-center justify-center bg-bg/25 backdrop-blur-sm transition-colors duration-500 animate-bounce-subtle"
            aria-label="Scroll down"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#BFA98A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </button>
        </Magnetic>
      </div>
    </section>
  )
}
