// Silent Mock Sound Synthesizer Hook
// Disables all audio context creation and sound effects

export function useSoundSynth() {
  return {
    muted: true,
    toggleMute: () => {},
    playTick: () => {},
    playClick: () => {},
    playSwipe: () => {},
    startDrone: () => {},
    updateDrone: () => {},
    stopDrone: () => {}
  }
}

export function setGlobalMuted() {}
export function getGlobalMuted() {
  return true
}
