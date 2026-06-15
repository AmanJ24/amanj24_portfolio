import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { projects } from '../data/content'

// Import bespoke case study components
import EntrustoryCaseStudy from '../components/case-studies/EntrustoryCaseStudy'
import BlackSignalCaseStudy from '../components/case-studies/BlackSignalCaseStudy'
import AuraCaseStudy from '../components/case-studies/AuraCaseStudy'
import PhishGuardCaseStudy from '../components/case-studies/PhishGuardCaseStudy'

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    window.scrollTo(0, 0)
    setActiveSection('overview')
  }, [slug])

  const projectIndex = projects.findIndex((p) => p.slug === slug)

  if (projectIndex === -1) {
    return (
      <div className="py-56 text-center select-none font-mono">
        <p className="text-muted text-sm uppercase mb-4">Case study not found</p>
        <Link to="/projects" className="text-xs text-accent hover:underline">Return to Work →</Link>
      </div>
    )
  }

  const project = projects[projectIndex]

  // Track scroll position to update HUD active state
  useEffect(() => {
    const sections = [
      { id: 'project-overview', name: 'overview' },
      { id: 'project-pipeline', name: 'pipeline' },
      { id: 'project-tech', name: 'technology' },
      { id: 'project-retrospective', name: 'retrospective' },
    ]

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35
      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.name)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [slug])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNext = () => {
    const nextIdx = (projectIndex + 1) % projects.length
    navigate(`/projects/${projects[nextIdx].slug}`)
  }

  const handlePrev = () => {
    const prevIdx = (projectIndex - 1 + projects.length) % projects.length
    navigate(`/projects/${projects[prevIdx].slug}`)
  }

  const hudSections = [
    { id: 'project-overview', label: 'OVERVIEW', key: 'overview' },
    { id: 'project-pipeline', label: 'PIPELINE', key: 'pipeline' },
    { id: 'project-tech', label: 'TECH DEPT', key: 'technology' },
    { id: 'project-retrospective', label: 'RETROSPECT', key: 'retrospective' }
  ]

  const renderCaseStudyContent = () => {
    switch (slug) {
      case 'entrustory':
        return <EntrustoryCaseStudy />
      case 'blacksignal':
        return <BlackSignalCaseStudy />
      case 'aura':
        return <AuraCaseStudy />
      case 'phishguard':
        return <PhishGuardCaseStudy />
      default:
        return null
    }
  }

  return (
    <div className="bg-bg min-h-screen relative overflow-hidden select-none">
      {/* Floating Scroll HUD */}
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6 font-mono text-[9px] tracking-widest text-muted select-none">
        {hudSections.map((sec) => (
          <button
            key={sec.key}
            onClick={() => scrollToSection(sec.id)}
            className="group flex items-center justify-end gap-3 text-right hover:text-accent transition-colors duration-300 outline-none cursor-none"
          >
            <span className={`opacity-0 group-hover:opacity-100 transition-all duration-300 ${activeSection === sec.key ? 'opacity-100 text-accent font-bold' : ''}`}>
              {sec.label}
            </span>
            <span className={`w-1.5 h-1.5 rounded-full border border-border/80 transition-all duration-500 ${
              activeSection === sec.key 
                ? 'bg-accent border-accent scale-125 shadow-[0_0_8px_rgba(191,169,138,0.6)]' 
                : 'group-hover:border-accent'
            }`} />
          </button>
        ))}
      </div>

      {/* Dynamic Case Study Component */}
      {renderCaseStudyContent()}

      {/* Page Navigator Footer */}
      <div className="border-t border-border/30 bg-[#09080A] py-12 select-none">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <button
            onClick={handlePrev}
            className="font-mono text-xs text-muted hover:text-accent flex items-center gap-2 cursor-none transition-colors duration-300"
          >
            ← Previous Project
          </button>
          
          <Link to="/projects" className="font-mono text-xs text-muted hover:text-accent cursor-none transition-colors duration-300">
            Work Catalog
          </Link>

          <button
            onClick={handleNext}
            className="font-mono text-xs text-muted hover:text-accent flex items-center gap-2 cursor-none transition-colors duration-300"
          >
            Next Project →
          </button>
        </div>
      </div>
    </div>
  )
}
