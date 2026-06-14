import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Magnetic({ children, range = 50, strength = 0.3 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const container = containerRef.current
    if (!container) return

    const xTo = gsap.quickTo(container, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.3)' })
    const yTo = gsap.quickTo(container, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.3)' })

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.hypot(distanceX, distanceY)

      if (distance < range) {
        // Pull towards mouse coordinates with proportional strength
        xTo(distanceX * strength)
        yTo(distanceY * strength)
      } else {
        // Return back to center position
        xTo(0)
        yTo(0)
      }
    }

    const handleMouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    window.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [range, strength])

  return (
    <div ref={containerRef} className="inline-block select-none">
      {children}
    </div>
  )
}
