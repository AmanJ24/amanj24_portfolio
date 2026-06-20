import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const labelRef = useRef(null)
  const [label, setLabel] = useState('')
  const [isHovering, setIsHovering] = useState(false)
  const [snappedTarget, setSnappedTarget] = useState(null)
  const [isTouch, setIsTouch] = useState(false)
  const snappedTargetRef = useRef(null)

  useEffect(() => {
    // Detect touch devices
    const mq = window.matchMedia('(pointer: coarse)')
    if (mq.matches) {
      setIsTouch(true)
      return
    }

    const cursor = cursorRef.current
    if (!cursor) return

    // QuickTo handlers for smooth organic spring lag (reduced duration to 0.15 for snappiness)
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3.out' })

    let snappedRect = null

    const updateSnappedRect = () => {
      const activeTarget = snappedTargetRef.current
      if (activeTarget) {
        snappedRect = activeTarget.getBoundingClientRect()
      } else {
        snappedRect = null
      }
    }

    const handleMouseMove = (e) => {
      const activeTarget = snappedTargetRef.current
      if (activeTarget) {
        if (!snappedRect) {
          snappedRect = activeTarget.getBoundingClientRect()
        }
        const targetX = snappedRect.left + snappedRect.width / 2
        const targetY = snappedRect.top + snappedRect.height / 2
        
        // Dynamic drag/offset factor (pull cursor 12% towards mouse pointer for organic elasticity)
        const dx = e.clientX - targetX
        const dy = e.clientY - targetY
        
        xTo(targetX + dx * 0.12)
        yTo(targetY + dy * 0.12)
      } else {
        xTo(e.clientX)
        yTo(e.clientY)
      }
    }

    const handleMouseEnter = (e) => {
      const target = e.target.closest('a, button, [data-cursor], .magnetic-btn, .nav-link')
      if (target) {
        setIsHovering(true)
        const cursorLabel = target.dataset.cursor || ''
        setLabel(cursorLabel)

        // Snappable classes or components
        if (
          target.classList.contains('magnetic-btn') || 
          target.tagName === 'BUTTON' || 
          target.closest('#nav-main')
        ) {
          setSnappedTarget(target)
          snappedTargetRef.current = target
          updateSnappedRect()
        }
      }
    }

    const handleMouseLeave = (e) => {
      const target = e.target.closest('a, button, [data-cursor], .magnetic-btn, .nav-link')
      if (target) {
        setIsHovering(false)
        setLabel('')
        setSnappedTarget(null)
        snappedTargetRef.current = null
        snappedRect = null
      }
    }

    const handleScrollOrResize = () => {
      updateSnappedRect()
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)
    window.addEventListener('scroll', handleScrollOrResize, { passive: true })
    window.addEventListener('resize', handleScrollOrResize, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
      window.removeEventListener('scroll', handleScrollOrResize)
      window.removeEventListener('resize', handleScrollOrResize)
    }
  }, [])

  // Dynamic morph shape parameters on target focus
  useEffect(() => {
    if (isTouch || !cursorRef.current) return

    if (snappedTarget) {
      const rect = snappedTarget.getBoundingClientRect()
      gsap.to(cursorRef.current, {
        width: rect.width + 16,
        height: rect.height + 10,
        borderRadius: '6px',
        backgroundColor: 'transparent',
        border: '1.2px dashed #BFA98A', // HUD dashes
        duration: 0.25,
        ease: 'power2.out',
      })
    } else if (isHovering) {
      gsap.to(cursorRef.current, {
        width: 38,
        height: 38,
        borderRadius: '50%',
        backgroundColor: 'transparent',
        border: '1.2px solid #BFA98A',
        duration: 0.25,
        ease: 'power2.out',
      })
    } else {
      gsap.to(cursorRef.current, {
        width: 14,
        height: 14,
        borderRadius: '50%',
        backgroundColor: '#BFA98A',
        border: 'none',
        duration: 0.25,
        ease: 'power2.out',
      })
    }
  }, [snappedTarget, isHovering, isTouch])

  if (isTouch) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        width: 14,
        height: 14,
        borderRadius: '50%',
        backgroundColor: '#BFA98A',
        transform: 'translate(-50%, -50%)',
        willChange: 'transform',
        mixBlendMode: 'difference',
      }}
    >
      {isHovering && label && !snappedTarget && (
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
