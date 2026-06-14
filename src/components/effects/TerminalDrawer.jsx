import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { person, about, skills, projects } from '../../data/content'
import { useSoundSynth } from '../../hooks/useSoundSynth'
import Magnetic from './Magnetic'
import WaveformVisualizer from '../canvas/WaveformVisualizer'

export default function TerminalDrawer() {
  const asciiBanner = [
    '============================================',
    '   ___  __  ___ ___  _  _    ___ _  _ ___ _   _ ',
    '  / _ \\|  \\/  |/ _ \\| \\| |  | __| \\| | __| | | |',
    ' / ___ \\ |\\/| | ___ \\ .  |  | _|| .  | _|| |_| |',
    '/_/   \\_\\_|  |_/_/   \\_\\_|_| |___|_|\\_|___|____/ ',
    '  SECURITY RESEARCHER & FULL-STACK DEVELOPER',
    '============================================',
    '[*] AMAN JANGIR SYSTEM TERMINAL SHELL v1.0.8',
    '[*] Type "help" or "?" to list active commands.',
    '',
  ]
  const [isOpen, setIsOpen] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState(asciiBanner)
  const { playTick, playClick } = useSoundSynth()
  const terminalEndRef = useRef(null)
  const inputRef = useRef(null)

  // Scroll terminal logs to bottom on update
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history])

  // Focus input when terminal drawer is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return
    playClick()

    const rawCommand = inputVal.trim()
    const command = rawCommand.toLowerCase()
    const newHistory = [...history, `aman@portfolio:~$ ${rawCommand}`]

    if (command === 'help' || command === '?') {
      newHistory.push(
        'Available commands:',
        '  about     - View profile biography',
        '  skills    - List core dev & security skills',
        '  projects  - Show active built systems',
        '  contact   - Output email & coordinates',
        '  clear     - Clean terminal history buffer',
        '  close     - Collapse terminal shell drawer'
      )
    } else if (command === 'about') {
      newHistory.push(about.p1, about.p2)
    } else if (command === 'skills') {
      newHistory.push(
        '--- Development Skills ---',
        ...skills.dev.map(cat => `  ${cat.category}: ${cat.items.join(', ')}`),
        '',
        '--- Security Skills ---',
        ...skills.security.map(cat => `  ${cat.category}: ${cat.items.join(', ')}`)
      )
    } else if (command === 'projects') {
      newHistory.push(
        'Built Systems:',
        ...projects.map(proj => `  [${proj.id}] ${proj.name} - ${proj.oneliner} (${proj.stack.join(', ')})`)
      )
    } else if (command === 'contact') {
      newHistory.push(
        `Email: ${person.email}`,
        `GitHub: ${person.github}`,
        `LinkedIn: ${person.linkedin}`
      )
    } else if (command === 'clear') {
      setHistory([])
      setInputVal('')
      return
    } else if (command === 'close' || command === 'exit') {
      setIsOpen(false)
      setInputVal('')
      return
    } else if (command === '') {
      // Empty enter key
    } else {
      newHistory.push(`shell: command not found: "${rawCommand}". Type "help" to see list.`)
    }

    newHistory.push('') // Add empty row spacing
    setHistory(newHistory)
    setInputVal('')
  }

  return (
    <>
      {/* Floating shell drawer trigger button */}
      <div className="fixed bottom-6 right-6 z-[9985] select-none">
        <Magnetic range={35} strength={0.35}>
          <button
            onClick={() => {
              playClick()
              setIsOpen(!isOpen)
            }}
            onMouseEnter={playTick}
            className="w-14 h-14 rounded-full border border-accent/40 bg-bg/90 backdrop-blur-sm flex items-center justify-center text-accent hover:border-accent hover:text-text hover:bg-accent/10 transition-all duration-500 shadow-lg cursor-none"
            aria-label="Toggle terminal command line drawer"
          >
            <span className="font-mono text-sm tracking-tight">&gt;_</span>
          </button>
        </Magnetic>
      </div>

      {/* Slide drawer overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop blur clickout */}
            <motion.div
              className="fixed inset-0 bg-bg/45 backdrop-blur-[2px] z-[9988]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                playClick()
                setIsOpen(false)
              }}
            />

            {/* Console Drawer */}
            <motion.div
              className="fixed top-0 right-0 w-full max-w-md md:max-w-lg h-screen bg-bg/96 border-l border-border/80 shadow-2xl p-6 font-mono z-[9990] flex flex-col justify-between crt-terminal"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 170 }}
            >
              {/* Terminal Header */}
              <div className="flex justify-between items-center border-b border-border/40 pb-4 mb-4 select-none">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/60" />
                  <span className="text-[10px] text-muted ml-2">aman@status:~ --command-shell</span>
                </div>
                <button
                  onClick={() => {
                    playClick()
                    setIsOpen(false)
                  }}
                  className="font-mono text-xs text-muted hover:text-accent transition-colors duration-300"
                >
                  ESC // CLOSE
                </button>
              </div>
              
              {/* Sound synth feed visualization monitor */}
              <WaveformVisualizer />

              {/* Console log display */}
              <div className="flex-1 overflow-y-auto space-y-2 mb-4 scrollbar-thin text-xs text-muted/90 leading-relaxed pr-2">
                {history.map((line, idx) => (
                  <p key={idx} className="font-mono whitespace-pre-wrap select-text">
                    {line.startsWith('aman@portfolio:~$') ? (
                      <span className="text-sage font-mono">{line}</span>
                    ) : line.startsWith('  ') ? (
                      <span className="text-accent/80 font-mono">{line}</span>
                    ) : line.startsWith('[*]') || line.startsWith('[+]') ? (
                      <span className="text-sage/70 font-mono">{line}</span>
                    ) : (
                      line
                    )}
                  </p>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Command line prompt input */}
              <div className="border-t border-border/40 pt-4 flex items-center gap-2 select-none">
                <span className="text-sage font-mono">aman@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleCommand}
                  className="flex-1 bg-transparent text-text font-mono border-none outline-none focus:ring-0 p-0 text-xs caret-accent"
                  placeholder='Type commands here e.g. "help"'
                  aria-label="Terminal command prompt"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
