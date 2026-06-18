import { useEffect } from 'react'
import Experience from '../components/sections/Experience'

export default function ExperiencePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-bg min-h-screen pt-20">
      <Experience />
    </div>
  )
}
