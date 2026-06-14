import { useState, useEffect } from 'react'

let audioCtx = null
let droneOsc = null
let droneGain = null
let droneFilter = null

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
let globalMuted = true // Default muted

export function setGlobalMuted(muted) {
  globalMuted = muted
  listeners.forEach(l => l(muted))
  
  // Directly control the active ambient drone gain
  if (droneGain && audioCtx) {
    const targetVal = muted ? 0.0001 : 0.035
    droneGain.gain.linearRampToValueAtTime(targetVal, audioCtx.currentTime + 0.15)
  }
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

  const playTick = () => playTone(1400, 'sine', 0.03, 0.015)
  const playClick = () => playTone(750, 'sine', 0.07, 0.03)

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

  // 1. Initializing the ambient drone hum oscillator
  const startDrone = () => {
    try {
      const ctx = getAudioContext()
      if (droneOsc) return // Already running

      droneOsc = ctx.createOscillator()
      droneGain = ctx.createGain()
      droneFilter = ctx.createBiquadFilterNode ? ctx.createBiquadFilterNode() : ctx.createBiquadFilter()

      droneOsc.type = 'triangle'
      droneOsc.frequency.setValueAtTime(55, ctx.currentTime) // Base note A1 (55Hz)

      droneFilter.type = 'lowpass'
      droneFilter.frequency.setValueAtTime(110, ctx.currentTime) // Narrow lowpass to isolate sub bass

      // Slowly fade in
      const baseGain = muted ? 0.0001 : 0.035
      droneGain.gain.setValueAtTime(0.0001, ctx.currentTime)
      droneGain.gain.linearRampToValueAtTime(baseGain, ctx.currentTime + 1.8)

      droneOsc.connect(droneFilter)
      droneFilter.connect(droneGain)
      droneGain.connect(ctx.destination)

      droneOsc.start()
    } catch (e) {
      console.warn('Drone start failed:', e)
    }
  }

  // 2. Adjusting frequency and filter settings based on scroll position progress
  const updateDrone = (progress) => {
    if (!droneOsc || !droneFilter || !audioCtx) return
    try {
      // Map scroll progress (0.0 to 1.0):
      // Sub oscillator frequency ramps from 55Hz (A1) to 82.4Hz (E2)
      const targetFreq = 55 + progress * 27.4
      // Filter frequency sweeps from 100Hz up to 250Hz, opening up high frequencies
      const targetFilter = 100 + progress * 150

      droneOsc.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 0.1)
      droneFilter.frequency.setTargetAtTime(targetFilter, audioCtx.currentTime, 0.1)
    } catch {}
  }

  const stopDrone = () => {
    try {
      if (droneOsc) {
        droneOsc.stop()
        droneOsc.disconnect()
        droneOsc = null
      }
      if (droneGain) {
        droneGain.disconnect()
        droneGain = null
      }
      if (droneFilter) {
        droneFilter.disconnect()
        droneFilter = null
      }
    } catch {}
  }

  return { muted, toggleMute, playTick, playClick, playSwipe, startDrone, updateDrone, stopDrone }
}
