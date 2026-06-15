import { useState, useEffect, useRef } from 'react'

export default function TerminalSimulator() {
  const terminalLines = [
    { text: '$ python main.py --input sample.txt --tor', type: 'cmd' },
    { text: '', type: 'empty' },
    { text: '[*] Extracting IOCs from input sample...', type: 'info' },
    { text: '[+] Found indicators: 3 IPs, 2 domains, 1 file hash', type: 'success' },
    { text: '', type: 'empty' },
    { text: '[*] Initializing Tor SOCKS5 proxy routing daemon...', type: 'info' },
    { text: '[+] SOCKS5 Tor circuit verified: exit node isolated', type: 'success' },
    { text: '', type: 'empty' },
    { text: '[*] Querying VirusTotal reputation endpoint (T1071)...', type: 'info' },
    { text: '[+] IOC 185.220.101.47 flagged: 12/94 security engines', type: 'success' },
    { text: '[→] MITRE ATT&CK: T1071.001 - Command and Control', type: 'accent' },
    { text: '', type: 'empty' },
    { text: '[*] Querying AbuseIPDB threat vector API (T1566)...', type: 'info' },
    { text: '[+] IOC evil-domain.ru flagged: abuse confidence 97%', type: 'success' },
    { text: '[→] MITRE ATT&CK: T1566.002 - Spearphishing Link', type: 'accent' },
    { text: '', type: 'empty' },
    { text: '[✓] Pipeline complete: database report written to output/log.json', type: 'success' },
    { text: '[✓] 29/29 DAG threat enrichment integration tests passing', type: 'success' }
  ]

  const [visibleLines, setVisibleLines] = useState([])
  const [lineIdx, setLineIdx] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const terminalEndRef = useRef(null)

  useEffect(() => {
    if (lineIdx < terminalLines.length) {
      const delay = terminalLines[lineIdx].type === 'cmd' ? 800 : 400
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => [...prev, terminalLines[lineIdx]])
        setLineIdx((prev) => prev + 1)
      }, delay)
      return () => clearTimeout(timeout)
    } else {
      setIsTyping(false)
    }
  }, [lineIdx])

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [visibleLines])

  const handleReplay = () => {
    setVisibleLines([])
    setLineIdx(0)
    setIsTyping(true)
  }

  return (
    <div className="w-full p-4 font-mono">
      <div className="w-full max-w-xl mx-auto bg-bg border border-border rounded-md shadow-2xl overflow-hidden crt-terminal flex flex-col h-[380px] justify-between">
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-surface/80 border-b border-border/40 px-4 py-2.5 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/60" />
            <span className="text-[10px] text-muted ml-2">aman@blacksignal:~ --telemetry-daemon</span>
          </div>
          <span className="text-[9px] text-muted/40 uppercase tracking-widest">Tor SOCKS5 Proxy</span>
        </div>

        {/* Console Log Area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-2 scrollbar-none text-left">
          {visibleLines.map((line, idx) => (
            <p
              key={idx}
              className={`text-[11px] leading-relaxed font-mono select-text ${
                line.type === 'cmd'
                  ? 'text-text'
                  : line.type === 'success'
                  ? 'text-sage'
                  : line.type === 'accent'
                  ? 'text-accent'
                  : line.type === 'info'
                  ? 'text-muted'
                  : 'text-muted/80'
              }`}
            >
              {line.text}
            </p>
          ))}
          
          {/* Active flashing cursor */}
          {isTyping && (
            <span className="inline-block w-1.5 h-3.5 bg-accent ml-0.5 animate-pulse" />
          )}

          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Footer Panel */}
        <div className="bg-surface/40 border-t border-border/20 px-5 py-3 flex items-center justify-between select-none">
          <span className="text-[9px] text-muted/40">
            {isTyping ? 'STATUS: PIPELINE EXECUTING...' : 'STATUS: SESSION INACTIVE [OK]'}
          </span>
          {!isTyping && (
            <button
              onClick={handleReplay}
              className="text-[9px] font-mono text-accent hover:text-text hover:underline transition-colors duration-300 cursor-none"
            >
              Run again →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
