import { useEffect, useRef } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export default function NetworkMesh() {
  const canvasRef = useRef(null)
  const isIntersecting = useIntersectionObserver(canvasRef)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !isIntersecting) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationFrameId
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    // Dynamic Node class
    class Node {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.35
        this.vy = (Math.random() - 0.5) * 0.35
        this.radius = Math.random() * 1.5 + 1
      }

      update(mouseX, mouseY) {
        this.x += this.vx
        this.y += this.vy

        // Boundaries handling
        if (this.x < 0 || this.x > width) this.vx *= -1
        if (this.y < 0 || this.y > height) this.vy *= -1

        // Mouse repelling physics
        if (mouseX !== null && mouseY !== null) {
          const dx = this.x - mouseX
          const dy = this.y - mouseY
          const dist = Math.hypot(dx, dy)

          if (dist < 130) {
            const force = (130 - dist) / 130
            const angle = Math.atan2(dy, dx)
            
            // Soft repel push
            this.x += Math.cos(angle) * force * 1.8
            this.y += Math.sin(angle) * force * 1.8
          }
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(191, 169, 138, 0.22)' // --color-accent low alpha
        ctx.fill()
      }
    }

    // Adaptive particle density
    const particleCount = Math.min(Math.floor((width * height) / 16000), 65)
    const nodes = Array.from({ length: particleCount }, () => new Node())

    let mouseX = null
    let mouseY = null

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouseX = null
      mouseY = null
    }

    window.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', handleResize)

    // Render step
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw connection lines
      ctx.lineWidth = 0.55
      const limitSq = 115 * 115
      
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i]
        n1.update(mouseX, mouseY)
        n1.draw()

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j]
          const dx = n1.x - n2.x
          const dy = n1.y - n2.y
          const distSq = dx * dx + dy * dy

          if (distSq < limitSq) {
            // Transparency increases when distance increases (only calculate sqrt if within threshold)
            const dist = Math.sqrt(distSq)
            const alpha = (115 - dist) / 115 * 0.12
            ctx.strokeStyle = `rgba(191, 169, 138, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(n1.x, n1.y)
            ctx.lineTo(n2.x, n2.y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
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
