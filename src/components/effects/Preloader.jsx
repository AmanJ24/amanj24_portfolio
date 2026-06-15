import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Custom hook to handle decryption/scramble text animation
function useDecryptedText(targetText, speed = 35, delay = 0, startTrigger = true) {
  const [text, setText] = useState('')
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?[]/./\\'

  useEffect(() => {
    if (!startTrigger) return

    let isMounted = true
    let iteration = 0
    let interval = null

    const run = () => {
      interval = setInterval(() => {
        if (!isMounted) return

        const scrambled = targetText
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '/' || char === ':') return char
            if (index < iteration) {
              return targetText[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')

        setText(scrambled)

        if (iteration >= targetText.length) {
          clearInterval(interval)
        }

        iteration += 1 / 3 // slow down resolution for visual impact
      }, speed)
    }

    const timeout = setTimeout(run, delay)

    return () => {
      isMounted = false
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [targetText, speed, delay, startTrigger])

  return text
}

export default function Preloader({ onComplete }) {
  const [logs, setLogs] = useState([])
  const [stage, setStage] = useState(0) // Stages of security handshake
  const [assetsLoaded, setAssetsLoaded] = useState(false)
  const isLoadedRef = useRef(false)

  // Decrypted headers
  const systemStatusText = useDecryptedText('STATUS: SECURING CLIENT INTERFACE', 30, 100)
  const decryptTitle = useDecryptedText('DECRYPTING PROTOCOLS / AJ-SEC-GATEWAY', 25, 400)
  
  // Handshake log items
  const handshakeMessages = [
    { text: '[*] INITIALIZING SECURITY SHIELD ROUTINES...', delay: 200 },
    { text: '[+] VPN & EGRESS SOCKS5 TUNNEL ESTABLISHED', delay: 700 },
    { text: '[*] PRE-BUFFERING HERO VIDEO STREAM...', delay: 1200 },
    { text: '[+] SYSTEM IMAGES LOADED INTO BUFFER', delay: 1800 },
    { text: '[+] VIDEO HANDSHAKE COMPLETE: FIRST FRAME CACHED', delay: 2400 },
    { text: '[✓] DECRYPTION COMPLETED: ACCESS GRANTED', delay: 3000 }
  ]

  // Preload images and video
  useEffect(() => {
    let imagesDone = false
    let videoDone = false

    const checkComplete = () => {
      if (imagesDone && videoDone && !isLoadedRef.current) {
        setAssetsLoaded(true)
      }
    }

    // Preload images
    const imagesToPreload = ['/assets/about-bg.png', '/assets/credentials-bg.png']
    let loadedCount = 0
    
    if (imagesToPreload.length === 0) {
      imagesDone = true
    } else {
      imagesToPreload.forEach((src) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          loadedCount++
          if (loadedCount === imagesToPreload.length) {
            imagesDone = true
            checkComplete()
          }
        }
        img.onerror = () => {
          loadedCount++
          if (loadedCount === imagesToPreload.length) {
            imagesDone = true
            checkComplete()
          }
        }
      })
    }

    // Preload video
    const video = document.createElement('video')
    video.src = '/assets/videos/typing.mp4'
    video.preload = 'auto'
    
    // We only need the video to buffer the first frame so it can start playing instantly
    video.onloadeddata = () => {
      videoDone = true
      checkComplete()
    }
    
    video.onerror = () => {
      videoDone = true // resolve on error to prevent locking
      checkComplete()
    }

    // Fallback safety timeout (4.5s max load time before forcing site load)
    const safetyTimeout = setTimeout(() => {
      if (!isLoadedRef.current) {
        setAssetsLoaded(true)
      }
    }, 4500)

    // Disable scrolling during load
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      clearTimeout(safetyTimeout)
    }
  }, [])

  // Print handshake logs on delay
  useEffect(() => {
    handshakeMessages.forEach((msg, idx) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, msg.text])
        setStage(idx + 1)
      }, msg.delay)
    });
  }, [])

  // Check if everything is ready to finish
  useEffect(() => {
    // Finish only when assets are loaded AND the handshake messages have all printed (stage 6)
    if (assetsLoaded && stage >= 6) {
      isLoadedRef.current = true
      
      // Re-enable scrolling
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      
      // Delay slightly for the user to read the final "ACCESS GRANTED" status
      const exitTimeout = setTimeout(() => {
        onComplete()
      }, 600)

      return () => clearTimeout(exitTimeout)
    }
  }, [assetsLoaded, stage, onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -30,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 bg-bg z-[99999] flex flex-col items-center justify-center font-mono p-6 select-none"
    >
      {/* Background vignette & subtle CRT raster scan lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(9,8,10,0.4)_0%,#09080A_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-raster pointer-events-none opacity-[0.02]" />

      <div className="relative max-w-lg w-full flex flex-col items-center gap-10">
        
        {/* Bespoke Cryptographic Key Spinner Graphic */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Outer dashed spinning ring */}
          <svg className="absolute w-full h-full animate-spin-slow origin-center" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="44" 
              stroke="#BFA98A" 
              strokeWidth="1.25" 
              fill="none" 
              strokeDasharray="8 6"
              className="opacity-75"
            />
          </svg>

          {/* Inner solid segment spinning counter-clockwise */}
          <svg className="absolute w-28 h-28 animate-spin-reverse origin-center" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="34" 
              stroke="#3D5C3A" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="25 75"
              className="opacity-60"
            />
          </svg>

          {/* Core Lock Node */}
          <motion.div 
            animate={{ 
              scale: [0.95, 1.05, 0.95],
              boxShadow: [
                '0 0 10px rgba(191,169,138,0.2)', 
                '0 0 25px rgba(191,169,138,0.4)', 
                '0 0 10px rgba(191,169,138,0.2)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-14 h-14 rounded-full border border-accent/40 bg-surface/50 flex items-center justify-center z-10"
          >
            <span className="text-accent text-[11px] font-bold tracking-tighter">
              {Math.min(100, Math.round((stage / 6) * 100))}%
            </span>
          </motion.div>

          {/* Rotating radar line overlay */}
          <div className="absolute inset-2 border border-border/10 rounded-full animate-pulse" />
        </div>

        {/* Dynamic Decrypting Title */}
        <div className="text-center space-y-3">
          <p className="text-accent text-xs tracking-[0.2em] font-semibold h-4 uppercase">
            {systemStatusText}
          </p>
          <h2 className="text-[10px] text-muted tracking-wider h-4">
            {decryptTitle}
          </h2>
        </div>

        {/* Security Handshake Terminal Screen */}
        <div className="w-full bg-surface/30 border border-border/60 rounded p-5 text-left h-44 flex flex-col justify-between overflow-hidden shadow-2xl relative">
          {/* Header indicator */}
          <div className="flex items-center gap-1.5 border-b border-border/20 pb-2 mb-2 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]/60 animate-pulse" />
            <span className="text-[8px] text-muted/60 tracking-wider">SHELL: ENVELOPE HANDSHAKE LOGS</span>
          </div>

          {/* Log Stream */}
          <div className="flex-1 space-y-1.5 overflow-hidden text-[9px] leading-relaxed">
            {logs.map((log, index) => {
              const isSuccess = log.includes('[+]') || log.includes('[✓]')
              const isError = log.includes('[-]')
              return (
                <p 
                  key={index} 
                  className={`font-mono ${
                    isSuccess ? 'text-sage font-bold' : isError ? 'text-red-500' : 'text-muted/80'
                  }`}
                >
                  {log}
                </p>
              )
            })}
          </div>

          {/* Hex / Status telemetry footer */}
          <div className="flex justify-between items-center text-[8px] text-muted/30 pt-2 border-t border-border/10 mt-2 select-none">
            <span>KEY_STATE: {assetsLoaded ? 'VERIFIED' : 'PENDING'}</span>
            <span>CIPHER_0x{stage.toString(16).toUpperCase()}0F</span>
          </div>
        </div>

      </div>
    </motion.div>
  )
}
