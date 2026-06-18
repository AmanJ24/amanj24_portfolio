import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/content'
import Tilt from '../components/effects/Tilt'

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState('All')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const tags = ['All', 'Security', 'Dev Tools', 'AI / Local', 'Web']

  const filteredProjects = selectedTag === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(selectedTag))

  return (
    <section className="py-40 md:py-56 bg-bg min-h-screen relative overflow-hidden select-none">
      {/* Background Graphic Asset */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none select-none mix-blend-lighten opacity-[0.12]"
        style={{
          backgroundImage: 'url("/assets/about-bg.png")',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10 text-left">
        {/* Section counter */}
        <span className="font-mono text-xs text-muted tracking-widest block mb-6">// WORK</span>

        {/* Hero title */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <h1 className="font-display text-[clamp(4rem,12vw,8rem)] font-light text-text leading-none tracking-tight mb-6 select-none">
            Work.
          </h1>
          <p className="font-mono text-sm md:text-base text-muted tracking-wider uppercase select-none">
            Four things I've built.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-16 select-none">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`font-mono text-xs px-5 py-2.5 rounded-full border transition-all duration-300 cursor-none ${
                selectedTag === tag
                  ? 'border-accent text-accent bg-accent/5'
                  : 'border-border/60 text-muted bg-surface/20 hover:text-text hover:border-accent/40'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full"
                >
                  <Link to={`/projects/${project.slug}`} className="block group cursor-none">
                    <Tilt maxRotation={5} scale={1.01}>
                      <div className="bg-surface/20 border border-border/50 rounded-md p-6 md:p-8 flex flex-col justify-between transition-all duration-500 group-hover:bg-surface2/15 group-hover:border-accent/30 shadow-[0_0_30px_rgba(0,0,0,0.15)] group-hover:shadow-[0_0_40px_rgba(191,169,138,0.04)] h-full min-h-[420px] relative overflow-hidden">
                        {/* Mock Showcase Area */}
                        <div className="w-full aspect-[16/10] bg-[#09080A]/40 rounded border border-border/20 flex items-center justify-center text-center select-none crt-terminal mb-6 relative group-hover:border-accent/20 transition-colors duration-500 overflow-hidden">
                          {project.slug === 'entrustory' ? (
                            <img
                              src="/assets/Entrustory.png"
                              alt="Entrustory Dashboard"
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                            />
                          ) : (
                            <span className="font-mono text-[9px] text-muted/30 uppercase tracking-widest leading-relaxed px-4">
                              [ {project.name.toUpperCase()} SYSTEM PREVIEW ]
                            </span>
                          )}
                          <span className="absolute top-2.5 right-3 font-mono text-[8px] text-muted/40 font-bold z-10">
                            // {project.id}
                          </span>
                        </div>

                        {/* Title & Link */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-baseline">
                            <h2 className="font-display text-2xl md:text-3xl font-light text-text group-hover:text-accent transition-colors duration-300">
                              {project.name}
                            </h2>
                            <span className="font-mono text-[10px] text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 flex items-center gap-1.5">
                              View <span className="text-xs">→</span>
                            </span>
                          </div>
                          <p className="font-body text-sm text-text/80 leading-relaxed max-w-xl">
                            {project.oneliner}
                          </p>
                        </div>

                        {/* Stack tags */}
                        <div className="flex flex-wrap gap-1.5 mt-6 border-t border-border/10 pt-4">
                          {project.stack.slice(0, 3).map((tech) => (
                            <span key={tech} className="font-mono text-[8px] tracking-wider text-muted bg-surface2/60 px-2 py-0.5 rounded-full uppercase border border-border/20">
                              {tech}
                            </span>
                          ))}
                          {project.stack.length > 3 && (
                            <span className="font-mono text-[8px] tracking-wider text-muted/55 px-2 py-0.5 rounded-full uppercase">
                              +{project.stack.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </Tilt>
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Footer info */}
        <div className="mt-28 text-center border-t border-border/20 pt-10">
          <span className="font-mono text-[10px] text-muted/40 uppercase tracking-[0.2em] block select-none">
            More research coming soon.
          </span>
        </div>
      </div>
    </section>
  )
}
