import { useEffect, useRef } from 'react'
import { useSoundSynth } from '../../hooks/useSoundSynth'

export default function WaveformVisualizer() {
  const canvasRef = useRef(null)
  const { muted } = useSoundSynth()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationId
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    let phase = 0

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Grid Background
      ctx.strokeStyle = 'rgba(191, 169, 138, 0.05)'
      ctx.lineWidth = 0.5
      // Vertical grid lines
      for (let x = 0; x < width; x += 25) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      // Horizontal grid lines
      for (let y = 0; y < height; y += 15) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Center baseline
      ctx.strokeStyle = 'rgba(191, 169, 138, 0.12)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, height / 2)
      ctx.lineTo(width, height / 2)
      ctx.stroke()

      // 2. Oscilloscope frequency lines
      ctx.strokeStyle = '#BFA98A' // Gold
      ctx.lineWidth = 1.2
      ctx.beginPath()

      const amplitude = muted ? 1.5 : 16
      const frequency = muted ? 0.005 : 0.022

      for (let x = 0; x < width; x++) {
        // Multi-frequency additive wave matching synth drone
        const y =
          height / 2 +
          Math.sin(x * frequency + phase) * amplitude +
          Math.sin(x * (frequency * 2.3) - phase * 1.8) * (amplitude * 0.3)

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      // Sub frequency secondary line in green/sage color
      ctx.strokeStyle = 'rgba(111, 143, 114, 0.45)' // Sage
      ctx.beginPath()
      for (let x = 0; x < width; x++) {
        const y =
          height / 2 +
          Math.cos(x * (frequency * 0.7) - phase * 0.5) * (amplitude * 0.6) +
          Math.sin(x * (frequency * 1.5) + phase) * (amplitude * 0.15)

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      phase += muted ? 0.015 : 0.08
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
  }, [muted])

  return (
    <div className="relative w-full h-16 border border-border/30 bg-[#09080A]/60 rounded overflow-hidden select-none mb-5 crt-terminal">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <span className="absolute top-1.5 left-2.5 font-mono text-[8px] text-muted/50 uppercase tracking-widest pointer-events-none">
        OSCILLOSCOPE FEED // {muted ? 'MUTED' : 'DRONE ACTIVE'}
      </span>
    </div>
  )
}
