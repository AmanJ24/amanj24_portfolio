import { useEffect, useRef } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export default function MatrixRain() {
  const canvasRef = useRef(null)
  const isIntersecting = useIntersectionObserver(canvasRef)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !isIntersecting) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationId
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    // Alphanumeric, binary and security code streams
    const charList = '0101010101010101ABCDEFUX%#$&?/\\<>*!+-='.split('')
    const fontSize = 12
    const columns = Math.floor(width / fontSize) + 1
    const drops = Array(columns).fill(1)

    const draw = () => {
      // Soft alpha black overlay to draw organic decay trails
      ctx.fillStyle = 'rgba(9, 8, 10, 0.09)'
      ctx.fillRect(0, 0, width, height)

      // Gold text with low alpha to look subtle and design-friendly
      ctx.fillStyle = 'rgba(191, 169, 138, 0.14)'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = charList[Math.floor(Math.random() * charList.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx.fillText(char, x, y)

        // Recycle drop back to top
        if (y > height && Math.random() > 0.98) {
          drops[i] = 0
        }
        drops[i]++
      }

      animationId = requestAnimationFrame(draw)
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }

    window.addEventListener('resize', handleResize)
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [isIntersecting])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
