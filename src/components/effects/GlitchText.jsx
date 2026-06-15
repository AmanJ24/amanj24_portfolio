import { useState, useEffect, useRef } from 'react'

export default function GlitchText({ text, speed = 25, delay = 0 }) {
  const [displayText, setDisplayText] = useState(text)
  const containerRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [hoverTrigger, setHoverTrigger] = useState(0)

  // 1. Observe when element enters viewport
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.unobserve(el) // Only animate once on scroll-enter
      }
    }, { threshold: 0.15 })

    observer.observe(el)
    return () => {
      if (el) observer.unobserve(el)
    }
  }, [])

  // 2. Perform scramble logic
  useEffect(() => {
    if (!inView) return // Prevents offscreen shufflings on mount

    let interval
    let isCancelled = false

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    const scramble = () => {
      const textArray = text.split('')
      let iterations = 0

      clearInterval(interval)
      interval = setInterval(() => {
        if (isCancelled) return

        const scrambled = textArray
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iterations) return text[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')

        setDisplayText(scrambled)

        if (iterations >= text.length) {
          clearInterval(interval)
          setDisplayText(text) // Lock exact original characters at end
        }

        iterations += 1 / 3
      }, speed)
    }

    if (delay > 0) {
      const timeout = setTimeout(() => {
        if (!isCancelled) scramble()
      }, delay)
      return () => {
        isCancelled = true
        clearTimeout(timeout)
        clearInterval(interval)
      }
    } else {
      scramble()
    }

    return () => {
      isCancelled = true
      clearInterval(interval)
    }
  }, [text, inView, hoverTrigger, speed, delay])

  return (
    <span
      ref={containerRef}
      onMouseEnter={() => setHoverTrigger((prev) => prev + 1)}
      className="font-inherit select-none cursor-none"
    >
      {displayText}
    </span>
  )
}
