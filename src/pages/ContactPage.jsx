import { useEffect } from 'react'
import Contact from '../components/sections/Contact'

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-bg min-h-screen pt-20">
      <Contact />
    </div>
  )
}
