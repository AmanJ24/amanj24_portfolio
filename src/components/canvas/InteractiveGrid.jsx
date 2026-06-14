import { useEffect, useRef } from 'react'

export default function InteractiveGrid() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationFrameId
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    // Grid spacing setup for hexagonal coordinate offsets
    const spacingX = 55
    const spacingY = 46
    const cols = Math.floor(width / spacingX) + 2
    const rows = Math.floor(height / spacingY) + 2

    const cells = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * spacingX + (r % 2 === 0 ? spacingX / 2 : 0)
        const y = r * spacingY
        cells.push({ x, y, intensity: 0 })
      }
    }

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

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      cells.forEach((cell) => {
        if (mouseX !== null && mouseY !== null) {
          const dx = cell.x - mouseX
          const dy = cell.y - mouseY
          const dist = Math.hypot(dx, dy)

          if (dist < 150) {
            const targetIntensity = (150 - dist) / 150
            cell.intensity += (targetIntensity - cell.intensity) * 0.18
          } else {
            cell.intensity *= 0.93
          }
        } else {
          cell.intensity *= 0.9
        }

        // Draw node points with dynamic opacity
        const alpha = 0.045 + cell.intensity * 0.25
        ctx.fillStyle = `rgba(191, 169, 138, ${alpha})`
        ctx.beginPath()
        ctx.arc(cell.x, cell.y, 1.2 + cell.intensity * 0.8, 0, Math.PI * 2)
        ctx.fill()

        // Draw dynamic grid lines to close neighbor cells
        if (cell.intensity > 0.04) {
          ctx.strokeStyle = `rgba(191, 169, 138, ${cell.intensity * 0.08})`
          ctx.lineWidth = 0.65

          cells.forEach((neighbor) => {
            if (neighbor === cell) return
            const d = Math.hypot(cell.x - neighbor.x, cell.y - neighbor.y)
            // Hexagon neighbor spacing bounds check
            if (d > 0 && d < 72) {
              ctx.beginPath()
              ctx.moveTo(cell.x, cell.y)
              ctx.lineTo(neighbor.x, neighbor.y)
              ctx.stroke()
            }
          })
        }
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
