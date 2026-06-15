import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLenis } from './hooks/useLenis'
import CustomCursor from './components/cursor/CustomCursor'
import Nav from './components/nav/Nav'
import Footer from './components/footer/Footer'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetail from './pages/ProjectDetail'
import CredentialsPage from './pages/CredentialsPage'
import ContactPage from './pages/ContactPage'
import { useSoundSynth } from './hooks/useSoundSynth'
import Preloader from './components/effects/Preloader'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  useLenis()
  const { startDrone, updateDrone, stopDrone } = useSoundSynth()

  // Bind scroll percentage progress to audio synth drone modulation & scroll glitch
  useEffect(() => {
    // Start ambient synthesizer drone
    startDrone()

    let lastScrollY = window.scrollY
    let scrollTimeout
    let ticking = false

    const handleScrollEffects = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
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

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScrollEffects, { passive: true })
    
    // Initial update trigger
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? window.scrollY / docHeight : 0
    updateDrone(progress)

    return () => {
      window.removeEventListener('scroll', handleScrollEffects)
      clearTimeout(scrollTimeout)
      document.documentElement.classList.remove('chromatic-aberration')
      stopDrone()
    }
  }, [])

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <CustomCursor />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/credentials" element={<CredentialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
