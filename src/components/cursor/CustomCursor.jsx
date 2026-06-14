import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const labelRef = useRef(null)
  const [label, setLabel] = useState('')
  const [isHovering, setIsHovering] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Detect touch devices
    const mq = window.matchMedia('(pointer: coarse)')
    if (mq.matches) {
      setIsTouch(true)
      return
    }

    const cursor = cursorRef.current
    if (!cursor) return

    // GSAP quickTo for smooth lag with organic spring glide duration
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.32, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.32, ease: 'power3.out' })

    const handleMouseMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const handleMouseEnter = (e) => {
      const target = e.target.closest('a, button, [data-cursor]')
      if (target) {
        setIsHovering(true)
        const cursorLabel = target.dataset.cursor || 'open'
        setLabel(cursorLabel)
      }
    }

    const handleMouseLeave = (e) => {
      const target = e.target.closest('a, button, [data-cursor]')
      if (target) {
        setIsHovering(false)
        setLabel('')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [])

  // Animate cursor size on hover state change
  useEffect(() => {
    if (isTouch || !cursorRef.current) return

    if (isHovering) {
      gsap.to(cursorRef.current, {
        width: 36,
        height: 36,
        backgroundColor: 'transparent',
        border: '1.5px solid #BFA98A',
        duration: 0.25,
        ease: 'power2.out',
      })
    } else {
      gsap.to(cursorRef.current, {
        width: 18,
        height: 18,
        backgroundColor: '#BFA98A',
        border: 'none',
        duration: 0.25,
        ease: 'power2.out',
      })
    }
  }, [isHovering, isTouch])

  if (isTouch) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        width: 18,
        height: 18,
        borderRadius: '50%',
        backgroundColor: '#BFA98A',
        transform: 'translate(-50%, -50%)',
        willChange: 'transform',
        mixBlendMode: 'difference',
      }}
    >
      {isHovering && label && (
        <span
          ref={labelRef}
          className="font-mono text-accent"
          style={{ fontSize: '9px', lineHeight: 1 }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
