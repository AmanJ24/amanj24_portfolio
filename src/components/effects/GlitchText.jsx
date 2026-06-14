import { useState, useEffect } from 'react'

export default function GlitchText({ text, speed = 25, delay = 0 }) {
  const [displayText, setDisplayText] = useState(text)
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    let interval
    let isCancelled = false

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    const scramble = () => {
      const textArray = text.split('')
      let iterations = 0

      clearInterval(interval)
      interval = setInterval(() => {
        if (isCancelled) return

        const scrambled = textArray
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iterations) return text[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')

        setDisplayText(scrambled)

        if (iterations >= text.length) {
          clearInterval(interval)
          setDisplayText(text) // Lock exact original characters at end
        }

        iterations += 1 / 3
      }, speed)
    }

    if (delay > 0) {
      const timeout = setTimeout(() => {
        if (!isCancelled) scramble()
      }, delay)
      return () => {
        isCancelled = true
        clearTimeout(timeout)
        clearInterval(interval)
      }
    } else {
      scramble()
    }

    return () => {
      isCancelled = true
      clearInterval(interval)
    }
  }, [text, trigger, speed, delay])

  return (
    <span
      onMouseEnter={() => setTrigger((prev) => prev + 1)}
      className="font-inherit select-none cursor-none"
    >
      {displayText}
    </span>
  )
}
