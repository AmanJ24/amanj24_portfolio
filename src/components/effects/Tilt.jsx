import { useRef, useState, useEffect } from 'react'

export default function Tilt({ children, maxRotation = 10, scale = 1.02, disabled = false }) {
  const containerRef = useRef(null)
  const [style, setStyle] = useState({})
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 })
  const [isReduced, setIsReduced] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsReduced(true)
    }
  }, [])

  const handleMouseMove = (e) => {
    if (disabled || isReduced) return
    const el = containerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Normalize coordinate mapping: ranges between -0.5 and 0.5
    const relativeX = (mouseX / width) - 0.5
    const relativeY = (mouseY / height) - 0.5

    // Angle of rotation calculations
    const rotateY = relativeX * maxRotation
    const rotateX = -relativeY * maxRotation

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      transition: 'transform 0.1s ease-out',
    })
    
    // Position of the radial specular shine flare
    setGlareStyle({
      left: `${mouseX}px`,
      top: `${mouseY}px`,
      opacity: 0.12,
      transform: 'translate(-50%, -50%)',
      transition: 'opacity 0.15s ease-out',
    })
  }

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
    })
    setGlareStyle({
      opacity: 0,
      transform: 'translate(-50%, -50%)',
      transition: 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
    })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden group select-none"
      style={style}
    >
      {children}
      
      {/*Specular glow shine overlay*/}
      {!disabled && !isReduced && (
        <div
          className="absolute pointer-events-none rounded-full blur-[80px] w-64 h-64 bg-accent/30"
          style={{
            ...glareStyle,
            mixBlendMode: 'screen',
          }}
        />
      )}
    </div>
  )
}
