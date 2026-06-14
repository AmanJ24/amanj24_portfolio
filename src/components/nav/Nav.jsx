import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { person } from '../../data/content'
import { useAssets } from '../../hooks/useAssets'
import Magnetic from '../effects/Magnetic'
import { useSoundSynth } from '../../hooks/useSoundSynth'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { hasResume } = useAssets()
  const { muted, toggleMute, playTick, playClick } = useSoundSynth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    playClick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navLinks = [
    { label: 'GitHub', href: person.github, external: true },
    { label: 'LinkedIn', href: person.linkedin, external: true },
    ...(hasResume ? [{ label: 'Resume', href: '/assets/resume.pdf', external: true }] : []),
    { label: 'Say Hello', href: `mailto:${person.email}`, external: false },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-bg/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
      id="nav-main"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
        {/* Logo / Monogram */}
        <Magnetic range={30} strength={0.25}>
          <button
            onClick={scrollToTop}
            onMouseEnter={playTick}
            className="font-display text-xl text-text tracking-tight hover:text-accent transition-colors duration-300"
            id="nav-logo"
          >
            AJ
          </button>
        </Magnetic>

        {/* Desktop links + Sound Toggle */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Magnetic key={link.label} range={40} strength={0.3}>
              <a
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onMouseEnter={playTick}
                onClick={playClick}
                className="font-mono text-sm text-muted hover:text-text transition-colors duration-300 px-2 py-1"
                id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            </Magnetic>
          ))}

          {/* Sound Synthesizer Control Toggle */}
          <div className="h-4 w-px bg-border/60 mx-1" />
          
          <Magnetic range={30} strength={0.2}>
            <button
              onClick={() => {
                toggleMute()
                // Let the click trigger on the state after toggle
                setTimeout(() => {
                  if (muted) {
                    // We just unmuted
                    const oscCtx = new (window.AudioContext || window.webkitAudioContext)()
                    const osc = oscCtx.createOscillator()
                    const gain = oscCtx.createGain()
                    osc.connect(gain)
                    gain.connect(oscCtx.destination)
                    gain.gain.setValueAtTime(0.04, oscCtx.currentTime)
                    gain.gain.exponentialRampToValueAtTime(0.0001, oscCtx.currentTime + 0.08)
                    osc.frequency.setValueAtTime(900, oscCtx.currentTime)
                    osc.start()
                    osc.stop(oscCtx.currentTime + 0.08)
                  }
                }, 10)
              }}
              onMouseEnter={playTick}
              className="font-mono text-xs text-muted hover:text-accent transition-colors duration-300 flex items-center gap-2 px-2 py-1"
              id="nav-sound-toggle"
              aria-label="Toggle sound effects"
            >
              <span className="relative flex h-2 w-2">
                {!muted && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${muted ? 'bg-muted/40' : 'bg-accent'}`} />
              </span>
              {muted ? 'SOUND OFF' : 'SOUND ON'}
            </button>
          </Magnetic>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => {
            playClick()
            setMenuOpen(!menuOpen)
          }}
          id="nav-hamburger"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-px bg-text transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
          <span className={`w-6 h-px bg-text transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-px bg-text transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-bg/98 backdrop-blur-md border-t border-border px-6 py-8"
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => {
                  playClick()
                  setMenuOpen(false)
                }}
                className="font-mono text-sm text-muted hover:text-text transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile Sound Control Toggle */}
            <div className="h-px bg-border/40 my-2" />
            <button
              onClick={() => {
                toggleMute()
              }}
              className="font-mono text-sm text-muted hover:text-accent transition-colors duration-300 flex items-center gap-3 text-left"
            >
              <span className="relative flex h-2 w-2">
                {!muted && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${muted ? 'bg-muted/40' : 'bg-accent'}`} />
              </span>
              {muted ? 'SOUND OFF' : 'SOUND ON'}
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
