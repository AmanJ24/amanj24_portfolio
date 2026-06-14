import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../../data/content'
import Tilt from '../effects/Tilt'
import Magnetic from '../effects/Magnetic'
import { useSoundSynth } from '../../hooks/useSoundSynth'

gsap.registerPlugin(ScrollTrigger)

function ProjectPanel({ project, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const { playTick, playClick } = useSoundSynth()

  return (
    <div
      className="project-panel min-w-[100vw] h-screen flex-shrink-0 relative flex items-center justify-center px-6 md:px-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Tilt maxRotation={6} scale={1.01}>
        <div className="max-w-3xl w-full bg-surface/5 border border-border/20 p-6 md:p-10 rounded-md backdrop-blur-sm relative z-10 transition-all duration-500 hover:bg-surface2/25 hover:border-accent/30 shadow-[0_0_40px_rgba(191,169,138,0.02)] hover:shadow-[0_0_80px_rgba(191,169,138,0.08)]">
          {/* Panel number */}
          <span className="font-mono text-sm text-muted/60 block mb-4">
            // {project.id}
          </span>

          {/* Project name */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-text mb-4 group-hover:text-accent transition-colors duration-500">
            {project.name}
          </h2>

          {/* One-liner */}
          <p className="font-body text-lg md:text-xl text-text/90 mb-5 max-w-xl">
            {project.oneliner}
          </p>

          {/* Stack tags */}
          <div className="flex flex-wrap gap-2 mb-6 select-none">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] text-muted/80 bg-surface2 px-2.5 py-1 rounded-full hover:text-text transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* GitHub link with Magnetic pulling */}
          <Magnetic range={35} strength={0.35}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playTick}
              onClick={playClick}
              className="inline-flex items-center gap-2.5 font-mono text-xs text-muted hover:text-accent transition-colors duration-300 px-3 py-2 -ml-3"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View Source
            </a>
          </Magnetic>
        </div>
      </Tilt>

      {/* Hover description overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-surface/95 border-t border-border/40 backdrop-blur-sm px-6 md:px-12 py-8 transition-transform duration-500 ease-out z-20 ${
          isHovered ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <p className="font-body text-sm md:text-base text-text max-w-xl leading-relaxed">
          {project.description}
        </p>
      </div>
    </div>
  )
}

export default function Projects() {
  const containerRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.project-panel')
      const totalWidth = panels.length * window.innerWidth

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: '.projects-container',
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => `+=${totalWidth}`,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      data-section="projects"
      id="projects-section"
      className="overflow-hidden"
    >
      {/* Section counter */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-8">
        <span className="font-mono text-xs text-muted">03 / 09</span>
      </div>

      {/* Horizontal scroll container */}
      <div className="projects-container overflow-hidden">
        <div className="flex">
          {projects.map((project, i) => (
            <ProjectPanel key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
