import { useEffect } from 'react'
import { useLenis } from './hooks/useLenis'
import CustomCursor from './components/cursor/CustomCursor'
import Nav from './components/nav/Nav'
import Hero from './components/sections/Hero'
import Statement from './components/sections/Statement'
import Projects from './components/sections/Projects'
import Numbers from './components/sections/Numbers'
import About from './components/sections/About'
import Approach from './components/sections/Approach'
import Credentials from './components/sections/Credentials'
import Now from './components/sections/Now'
import Contact from './components/sections/Contact'
import Footer from './components/footer/Footer'
import { useSoundSynth } from './hooks/useSoundSynth'

export default function App() {
  useLenis()
  const { startDrone, updateDrone, stopDrone } = useSoundSynth()

  // Bind scroll percentage progress to audio synth drone modulation & scroll glitch
  useEffect(() => {
    // Start ambient synthesizer drone
    startDrone()

    let lastScrollY = window.scrollY
    let scrollTimeout

    const handleScrollEffects = () => {
      // 1. Synth drone modulation
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0
      updateDrone(progress)

      // 2. Chromatic aberration scroll-glitch on fast scroll
      const currentScrollY = window.scrollY
      const velocity = Math.abs(currentScrollY - lastScrollY)
      lastScrollY = currentScrollY

      if (velocity > 14) {
        document.documentElement.classList.add('chromatic-aberration')
      } else {
        document.documentElement.classList.remove('chromatic-aberration')
      }

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        document.documentElement.classList.remove('chromatic-aberration')
      }, 120)
    }

    window.addEventListener('scroll', handleScrollEffects, { passive: true })
    
    // Initial update trigger
    handleScrollEffects()

    return () => {
      window.removeEventListener('scroll', handleScrollEffects)
      clearTimeout(scrollTimeout)
      document.documentElement.classList.remove('chromatic-aberration')
      stopDrone()
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <hr className="border-t border-border/30 max-w-[1200px] mx-auto opacity-70" />
        <Statement />
        <hr className="border-t border-border/30 max-w-[1200px] mx-auto opacity-70" />
        <Projects />
        <hr className="border-t border-border/30 max-w-[1200px] mx-auto opacity-70" />
        <Numbers />
        <hr className="border-t border-border/30 max-w-[1200px] mx-auto opacity-70" />
        <About />
        <hr className="border-t border-border/30 max-w-[1200px] mx-auto opacity-70" />
        <Approach />
        <hr className="border-t border-border/30 max-w-[1200px] mx-auto opacity-70" />
        <Credentials />
        <hr className="border-t border-border/30 max-w-[1200px] mx-auto opacity-70" />
        <Now />
        <hr className="border-t border-border/30 max-w-[1200px] mx-auto opacity-70" />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
