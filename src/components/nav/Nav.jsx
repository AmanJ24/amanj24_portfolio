import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAssets } from '../../hooks/useAssets'
import Magnetic from '../effects/Magnetic'
import { useSoundSynth } from '../../hooks/useSoundSynth'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { hasResume } = useAssets()
  const { playTick, playClick } = useSoundSynth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    playClick()
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  const navLinks = [
    { label: 'Home', href: '/', external: false, internal: true },
    { label: 'Work', href: '/projects', external: false, internal: true },
    { label: 'Experience', href: '/experience', external: false, internal: true },
    { label: 'Credentials', href: '/credentials', external: false, internal: true },
    { label: 'Contact', href: '/contact', external: false, internal: true },
    ...(hasResume ? [{ label: 'Resume', href: '/assets/resume.pdf', external: true }] : []),
  ]

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${scrolled ? 'bg-bg/95 backdrop-blur-sm' : 'bg-transparent'
        }`}
      id="nav-main"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
        {/* Logo / Monogram */}
        <Magnetic range={30} strength={0.25}>
          <button
            onClick={scrollToTop}
            onMouseEnter={playTick}
            className="flex items-center justify-center cursor-none"
            id="nav-logo"
            aria-label="Home"
          >
            <img
              src="/assets/logo.png"
              alt="Aman Jangir Logo"
              className="h-12 w-auto hover:brightness-110 hover:scale-105 transition-all duration-300"
            />
          </button>
        </Magnetic>

        {/* Desktop links + Sound Toggle */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Magnetic key={link.label} range={40} strength={0.3}>
              {link.internal ? (
                <NavLink
                  to={link.href}
                  onMouseEnter={playTick}
                  onClick={playClick}
                  className={({ isActive }) =>
                    `font-mono text-sm transition-all duration-300 px-2 py-1 cursor-none ${isActive ? 'text-accent border-b border-accent/40' : 'text-muted hover:text-text'
                    }`
                  }
                  id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </NavLink>
              ) : (
                <a
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  onMouseEnter={playTick}
                  onClick={playClick}
                  className="font-mono text-sm text-muted hover:text-text transition-colors duration-300 px-2 py-1 cursor-none"
                  id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </a>
              )}
            </Magnetic>
          ))}


        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-none"
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
              link.internal ? (
                <NavLink
                  key={link.label}
                  to={link.href}
                  onClick={() => {
                    playClick()
                    setMenuOpen(false)
                  }}
                  className={({ isActive }) =>
                    `font-mono text-sm transition-colors duration-300 cursor-none ${isActive ? 'text-accent' : 'text-muted hover:text-text'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  onClick={() => {
                    playClick()
                    setMenuOpen(false)
                  }}
                  className="font-mono text-sm text-muted hover:text-text transition-colors duration-300 cursor-none"
                >
                  {link.label}
                </a>
              )
            ))}


          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
