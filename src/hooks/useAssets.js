// Checks which optional assets are present
// Uses environment variables set in .env.local

export function useAssets() {
  const hasHeroVideo = import.meta.env.VITE_HAS_HERO === 'true'
  const hasResume = import.meta.env.VITE_HAS_RESUME === 'true'

  return { hasHeroVideo, hasResume }
}
