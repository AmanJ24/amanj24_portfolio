import { useEffect, useState } from 'react'

export function useIntersectionObserver(elementRef, options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, {
      rootMargin: '200px', // Start rendering slightly before entering viewport to prevent pop-in
      ...options
    })

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef, options.rootMargin, options.threshold, options.root])

  return isIntersecting
}
