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

export default function App() {
  useLenis()

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
