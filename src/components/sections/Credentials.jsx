import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { skills, credentials, ctfs } from '../../data/content'
import Tilt from '../effects/Tilt'
import { useSoundSynth } from '../../hooks/useSoundSynth'
import GlitchText from '../effects/GlitchText'

gsap.registerPlugin(ScrollTrigger)

/* ─── Lightbox for certificate images ─── */
function Lightbox({ image, title, onClose }) {
  const { playClick } = useSoundSynth()
  
  return (
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => {
        playClick()
        onClose()
      }}
    >
      <motion.div
        className="relative max-w-4xl max-h-[85vh] mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain rounded-md"
        />
        <p className="font-mono text-xs text-muted text-center mt-4">{title}</p>
        <button
          onClick={() => {
            playClick()
            onClose()
          }}
          className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-surface2 flex items-center justify-center text-muted hover:text-text transition-colors duration-300"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  )
}

/* ─── Cipher Card Decryption Scrambler ─── */
function DecryptHoverText({ text }) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const { playTick } = useSoundSynth()

  useEffect(() => {
    if (!isHovering) {
      setDisplayText(text)
      return
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const textArray = text.split('')
    let iterations = 0
    
    const interval = setInterval(() => {
      const scrambled = textArray.map((char, index) => {
        if (char === ' ') return ' '
        if (index < iterations) return text[index]
        return chars[Math.floor(Math.random() * chars.length)]
      }).join('')

      setDisplayText(scrambled)
      
      if (iterations >= text.length) {
        clearInterval(interval)
      }
      
      iterations += 1/2
      
      if (Math.random() > 0.4) {
        playTick()
      }
    }, 25)

    return () => clearInterval(interval)
  }, [isHovering, text])

  return (
    <span
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="select-none"
    >
      {displayText}
    </span>
  )
}

/* ─── Certificate / CTF card with image & Tilt ─── */
function CertCard({ item, type, onImageClick }) {
  const name = type === 'credential' ? item.name : item.event
  const [imageExists, setImageExists] = useState(true)
  const { playTick, playClick } = useSoundSynth()

  const handleImageError = () => {
    setImageExists(false)
  }

  return (
    <Tilt maxRotation={8} scale={1.02}>
      <motion.div
        className="cert-card h-full group relative bg-surface rounded-md overflow-hidden border border-border/30 hover:border-accent/30 transition-colors duration-500 flex flex-col justify-between"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        onMouseEnter={playTick}
      >
        {/* Image area */}
        {item.image ? (
          <div
            className="relative aspect-[16/10] bg-surface2/35 overflow-hidden cursor-none flex items-center justify-center border-b border-border/20"
            onClick={() => {
              if (imageExists) {
                playClick()
                onImageClick(item.image, name)
              }
            }}
            role="button"
            tabIndex={0}
            data-cursor={imageExists ? "view" : "default"}
          >
            {imageExists ? (
              <img
                src={item.image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                onError={handleImageError}
              />
            ) : (
              <div className="font-mono text-[10px] text-muted/30 uppercase tracking-widest text-center px-4 select-none">
                [ CERTIFICATE PREVIEW // OFFLINE ]
              </div>
            )}
            
            {imageExists && (
              /* Hover overlay */
              <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/35 transition-colors duration-500 flex items-center justify-center">
                <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full border border-accent/40 flex items-center justify-center backdrop-blur-sm bg-bg/25">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BFA98A" strokeWidth="1.5">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        ) : null}

        {/* Text area */}
        <div className="p-6 flex-1 flex flex-col justify-center">
          <div className="flex items-start gap-3">
            {type === 'credential' && (
              <span className="text-sage text-sm mt-0.5 flex-shrink-0 select-none">✓</span>
            )}
            {type === 'ctf' && (
              <span className="text-accent/60 text-sm mt-0.5 flex-shrink-0 font-mono select-none">⚑</span>
            )}
            <div>
              <h4 className="font-body text-sm md:text-base text-text group-hover:text-accent transition-colors duration-500 leading-snug">
                <DecryptHoverText text={name} />
              </h4>
              {type === 'credential' && (
                <span className="font-mono text-[9px] text-sage/80 uppercase tracking-widest mt-2.5 inline-block select-none">
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Tilt>
  )
}

/* ─── Skill category block ─── */
function SkillBlock({ category, items, index }) {
  const { playTick } = useSoundSynth()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
    >
      <span className="font-mono text-xs text-accent/70 block mb-3.5 tracking-wider select-none">
        {category}
      </span>
      <div className="flex flex-wrap gap-2 select-none">
        {items.map((skill) => (
          <motion.span
            key={skill}
            onMouseEnter={playTick}
            className="font-mono text-xs text-muted/90 bg-surface2/65 border border-border/40 px-3.5 py-1.5 rounded-full hover:border-accent/40 hover:text-text transition-all duration-400 cursor-none"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Terminal Panel component ─── */
function TerminalPanel({ title, children }) {
  return (
    <div className="bg-bg/40 border border-border/50 rounded-md p-6 md:p-8 relative font-mono shadow-lg hover:border-border transition-colors duration-500 crt-terminal">
      {/* Terminal window buttons mock */}
      <div className="flex items-center gap-2 mb-8 border-b border-border/30 pb-4 select-none">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/60" />
        <span className="text-[10px] text-muted/50 ml-4 lowercase">
          aman@jangir:~/{title}
        </span>
      </div>
      
      {/* Content wrapper */}
      <div className="space-y-9 relative z-10">
        {children}
      </div>

      {/* Terminal background pulse cursor */}
      <div className="absolute bottom-4 right-4 text-[10px] text-muted/30 animate-pulse select-none">
        █
      </div>
    </div>
  )
}

export default function Credentials() {
  const sectionRef = useRef(null)
  const [lightboxImage, setLightboxImage] = useState(null)
  const [lightboxTitle, setLightboxTitle] = useState('')

  const openLightbox = (image, title) => {
    setLightboxImage(image)
    setLightboxTitle(title)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
    setLightboxTitle('')
  }

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        data-section="credentials"
        className="py-40 md:py-56 relative overflow-hidden"
        id="credentials-section"
      >
        {/* Background Graphic Asset */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none select-none mix-blend-lighten"
          style={{
            backgroundImage: 'url("/assets/credentials-bg.png")',
            opacity: 0.15
          }}
        />

        <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">


          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="mb-24 md:mb-32"
          >
            <h2 className="font-display text-display font-normal text-text mb-4">
              <GlitchText text="Skills & Credentials" />
            </h2>
            <div className="h-px w-24 bg-accent/30" />
          </motion.div>

          {/* Skills Terminals Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 mb-32 md:mb-40">
            {/* Dev Skills Terminal */}
            <TerminalPanel title="development">
              <div className="space-y-8">
                {skills.dev.map((cat, i) => (
                  <SkillBlock key={cat.category} category={cat.category} items={cat.items} index={i} />
                ))}
              </div>
            </TerminalPanel>

            {/* Security Skills Terminal */}
            <TerminalPanel title="security">
              <div className="space-y-8">
                {skills.security.map((cat, i) => (
                  <SkillBlock key={cat.category} category={cat.category} items={cat.items} index={i} />
                ))}
              </div>
            </TerminalPanel>
          </div>

          {/* Credentials cards */}
          <div className="mb-28 md:mb-36">
            <motion.h3
              className="font-mono text-sm text-muted uppercase tracking-[0.15em] mb-12 flex items-center gap-3 select-none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="w-2 h-2 rounded-full bg-sage animate-glow-sage" />
              <GlitchText text="Earned Credentials" />
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {credentials.filter(c => c.earned).map((cred) => (
                <CertCard
                  key={cred.name}
                  item={cred}
                  type="credential"
                  onImageClick={openLightbox}
                />
              ))}
            </div>
          </div>

          {/* CTF cards */}
          <div>
            <motion.h3
              className="font-mono text-sm text-muted uppercase tracking-[0.15em] mb-12 flex items-center gap-3 select-none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-accent/60 font-mono">⚑</span>
              <GlitchText text="CTF Participation" />
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ctfs.map((ctf) => (
                <CertCard
                  key={ctf.event}
                  item={ctf}
                  type="ctf"
                  onImageClick={openLightbox}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <Lightbox
            image={lightboxImage}
            title={lightboxTitle}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </>
  )
}
