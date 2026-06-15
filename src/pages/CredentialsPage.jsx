import { useEffect } from 'react'
import Credentials from '../components/sections/Credentials'

export default function CredentialsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-bg min-h-screen pt-20">
      <Credentials />
    </div>
  )
}
