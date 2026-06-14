import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hero3DCanvas() {
  const containerRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const container = containerRef.current
    if (!container) return

    // 1. Setup Scene, Camera & Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.z = 24

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    // 2. Torus Knot Particle Geometry
    const particleCount = 2800
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    // Gold/Sage theme colors
    const colorAccent = new THREE.Color('#BFA98A') // Gold
    const colorSage = new THREE.Color('#6F8F72')   // Sage/Green

    for (let i = 0; i < particleCount; i++) {
      // Create a torus-knot pattern mathematically
      const t = (i / particleCount) * Math.PI * 2 * 10
      const p = 2 // knot parameter p
      const q = 3 // knot parameter q
      const r = 8 + 2 * Math.cos(q * t) // major radius

      const x = r * Math.cos(p * t)
      const y = r * Math.sin(p * t)
      const z = 2 * Math.sin(q * t)

      // Add slight randomness/volumetric spread
      positions[i * 3] = x + (Math.random() - 0.5) * 1.5
      positions[i * 3 + 1] = y + (Math.random() - 0.5) * 1.5
      positions[i * 3 + 2] = z + (Math.random() - 0.5) * 1.5

      // Interpolate colors between Gold and Sage
      const mixedColor = colorAccent.clone().lerp(colorSage, Math.random())
      colors[i * 3] = mixedColor.r
      colors[i * 3 + 1] = mixedColor.g
      colors[i * 3 + 2] = mixedColor.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Particle texture
    const material = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particleSystem = new THREE.Points(geometry, material)
    scene.add(particleSystem)

    // 3. Hover & Scroll Event listeners variables
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e) => {
      // Normalized mouse coordinates (-0.5 to 0.5)
      targetX = (e.clientX / window.innerWidth) - 0.5
      targetY = (e.clientY / window.innerHeight) - 0.5
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Scroll mapping values
    let scrollProgress = 0
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Resize handling
    const handleResize = () => {
      if (!container || !renderer) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // 4. Animation Frame loop
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse follow rotation
      mouseX += (targetX - mouseX) * 0.05
      mouseY += (targetY - mouseY) * 0.05

      // Continuous base rotation + mouse tilt
      particleSystem.rotation.y = elapsedTime * 0.08 + mouseX * 0.8
      particleSystem.rotation.x = elapsedTime * 0.05 + mouseY * 0.8

      // Scroll morphing: increase scale and rotation speed as user scrolls
      const targetScale = 1.0 + scrollProgress * 0.5
      particleSystem.scale.set(targetScale, targetScale, targetScale)
      particleSystem.rotation.z = scrollProgress * Math.PI

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // 5. Clean up on unmount
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen', opacity: 0.7 }}
    />
  )
}
