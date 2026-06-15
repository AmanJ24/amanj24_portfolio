import { useEffect } from 'react'
import Hero from '../components/sections/Hero'
import Statement from '../components/sections/Statement'
import About from '../components/sections/About'
import Approach from '../components/sections/Approach'
import Now from '../components/sections/Now'

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Hero />
      <hr className="border-t border-border/30 max-w-[1200px] mx-auto opacity-70" />
      <Statement />
      <hr className="border-t border-border/30 max-w-[1200px] mx-auto opacity-70" />
      <About />
      <hr className="border-t border-border/30 max-w-[1200px] mx-auto opacity-70" />
      <Approach />
      <hr className="border-t border-border/30 max-w-[1200px] mx-auto opacity-70" />
      <Now />
    </>
  )
}
