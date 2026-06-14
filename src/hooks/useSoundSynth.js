import { useState, useEffect } from 'react'

let audioCtx = null

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

const listeners = new Set()
let globalMuted = true // Start muted to follow user experience best practices

export function setGlobalMuted(muted) {
  globalMuted = muted
  listeners.forEach(l => l(muted))
}

export function getGlobalMuted() {
  return globalMuted
}

export function useSoundSynth() {
  const [muted, setMuted] = useState(globalMuted)

  useEffect(() => {
    const handleMuteChange = (newMuted) => setMuted(newMuted)
    listeners.add(handleMuteChange)
    return () => {
      listeners.delete(handleMuteChange)
    }
  }, [])

  const toggleMute = () => {
    setGlobalMuted(!muted)
  }

  const playTone = (freq = 800, type = 'sine', duration = 0.05, volume = 0.05) => {
    if (muted) return
    try {
      const ctx = getAudioContext()
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()

      osc.type = type
      osc.frequency.setValueAtTime(freq, ctx.currentTime)

      gainNode.gain.setValueAtTime(volume, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

      osc.connect(gainNode)
      gainNode.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + duration)
    } catch (e) {
      console.warn('Web Audio synthesis failed:', e)
    }
  }

  // Hover indicator tone
  const playTick = () => playTone(1400, 'sine', 0.03, 0.02)
  
  // Direct interaction button tone
  const playClick = () => playTone(750, 'sine', 0.07, 0.04)

  // Scroll or slide transition tone
  const playSwipe = () => {
    if (muted) return
    try {
      const ctx = getAudioContext()
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()
      osc.frequency.setValueAtTime(250, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.18)
      gainNode.gain.setValueAtTime(0.03, ctx.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.18)
      osc.connect(gainNode)
      gainNode.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.18)
    } catch {}
  }

  return { muted, toggleMute, playTick, playClick, playSwipe }
}
