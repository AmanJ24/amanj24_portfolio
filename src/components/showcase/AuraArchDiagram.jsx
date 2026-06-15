import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AuraArchDiagram() {
  const [activeNode, setActiveNode] = useState('tauri')

  const nodes = {
    tauri: {
      title: 'Tauri Runtime (Rust)',
      subtitle: 'Core Orchestrator & Event Bus',
      desc: 'Intercepts frontend commands via IPC. Manages background processes, handles Unix socket bindings with authentication, and routes tasks to corresponding LLM or database engines.',
    },
    ollama: {
      title: 'Ollama Service',
      subtitle: 'Local Large Language Model',
      desc: 'Runs open weights models (e.g. Qwen / Llama) fully offline. Serves text completions, summarization, and query routing directly without intermediate model layers.',
    },
    sqlite: {
      title: 'sqlite-vec Engine',
      subtitle: 'In-Process Vector similarity',
      desc: 'Stores document embeddings and executes cosine similarity searches natively inside a lightweight SQLite file. Replaced ChromaDB in Phase 7.5 to save ~1GB RAM.',
    },
    moondream: {
      title: 'Moondream2 (On-Demand)',
      subtitle: 'Lightweight Local Vision model',
      desc: 'Triggered only during vision queries. Loaded dynamically into memory and completely unloaded immediately after processing to prevent GPU/RAM memory leaks.',
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.15 } },
  }

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 0.6, transition: { duration: 1.2, ease: 'easeInOut' } },
  }

  return (
    <div className="w-full max-w-xl mx-auto p-4 flex flex-col gap-6">
      {/* SVG Diagram Canvas */}
      <motion.div
        className="w-full bg-surface border border-border/40 rounded-md p-6 relative select-none"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <svg viewBox="0 0 400 240" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Animated Connecting Lines */}
          {/* Tauri to Ollama (Left) */}
          <motion.path
            d="M200 70 L200 110 L80 110 L80 150"
            stroke="#BFA98A"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            variants={pathVariants}
          />
          {/* Tauri to sqlite-vec (Center) */}
          <motion.path
            d="M200 70 L200 150"
            stroke="#BFA98A"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            variants={pathVariants}
          />
          {/* Tauri to Moondream2 (Right) */}
          <motion.path
            d="M200 70 L200 110 L320 110 L320 150"
            stroke="#BFA98A"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            variants={pathVariants}
          />

          {/* Nodes Group */}
          {/* 1. TAURI APP (Rust Orchestrator) */}
          <g className="cursor-none" onClick={() => setActiveNode('tauri')}>
            <rect
              x="130"
              y="20"
              width="140"
              height="50"
              rx="4"
              fill={activeNode === 'tauri' ? 'rgba(191, 169, 138, 0.15)' : '#1C1A17'}
              stroke={activeNode === 'tauri' ? '#BFA98A' : '#2E2B26'}
              strokeWidth={activeNode === 'tauri' ? '1.5' : '1'}
              className="transition-all duration-300"
            />
            <text x="200" y="44" fill="#E6DDD0" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">TAURI RUNTIME</text>
            <text x="200" y="56" fill="#8C8378" fontSize="7" fontFamily="monospace" textAnchor="middle">Rust Event Bus</text>
          </g>

          {/* 2. OLLAMA LLM (Left bottom) */}
          <g className="cursor-none" onClick={() => setActiveNode('ollama')}>
            <rect
              x="20"
              y="150"
              width="110"
              height="50"
              rx="4"
              fill={activeNode === 'ollama' ? 'rgba(191, 169, 138, 0.15)' : '#1C1A17'}
              stroke={activeNode === 'ollama' ? '#BFA98A' : '#2E2B26'}
              strokeWidth={activeNode === 'ollama' ? '1.5' : '1'}
              className="transition-all duration-300"
            />
            <text x="75" y="174" fill="#E6DDD0" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">OLLAMA</text>
            <text x="75" y="186" fill="#8C8378" fontSize="7" fontFamily="monospace" textAnchor="middle">Local Text LLM</text>
          </g>

          {/* 3. SQLITE-VEC (Center bottom) */}
          <g className="cursor-none" onClick={() => setActiveNode('sqlite')}>
            <rect
              x="145"
              y="150"
              width="110"
              height="50"
              rx="4"
              fill={activeNode === 'sqlite' ? 'rgba(191, 169, 138, 0.15)' : '#1C1A17'}
              stroke={activeNode === 'sqlite' ? '#BFA98A' : '#2E2B26'}
              strokeWidth={activeNode === 'sqlite' ? '1.5' : '1'}
              className="transition-all duration-300"
            />
            <text x="200" y="174" fill="#E6DDD0" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SQLITE-VEC</text>
            <text x="200" y="186" fill="#8C8378" fontSize="7" fontFamily="monospace" textAnchor="middle">Local Vector DB</text>
          </g>

          {/* 4. MOONDREAM2 (Right bottom) */}
          <g className="cursor-none" onClick={() => setActiveNode('moondream')}>
            <rect
              x="270"
              y="150"
              width="110"
              height="50"
              rx="4"
              fill={activeNode === 'moondream' ? 'rgba(191, 169, 138, 0.15)' : '#1C1A17'}
              stroke={activeNode === 'moondream' ? '#BFA98A' : '#2E2B26'}
              strokeWidth={activeNode === 'moondream' ? '1.5' : '1'}
              className="transition-all duration-300"
            />
            <text x="325" y="174" fill="#E6DDD0" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">MOONDREAM2</text>
            <text x="325" y="186" fill="#8C8378" fontSize="7" fontFamily="monospace" textAnchor="middle">On-Demand Vision</text>
          </g>
        </svg>

        <span className="absolute bottom-2 left-3 font-mono text-[7px] text-muted/30">
          *CLICK ANY NODE TO INSPECT FLOW DIAGRAM
        </span>
      </motion.div>

      {/* Tooltip detail window */}
      <div className="min-h-[120px] bg-surface/50 border border-border/40 p-5 rounded-md text-left flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            className="space-y-2"
          >
            <div className="flex items-baseline justify-between border-b border-border/20 pb-1.5 mb-1.5">
              <h5 className="font-mono text-xs font-bold text-accent uppercase">{nodes[activeNode].title}</h5>
              <span className="font-mono text-[9px] text-muted">{nodes[activeNode].subtitle}</span>
            </div>
            <p className="font-body text-xs text-text/80 leading-relaxed">
              {nodes[activeNode].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
