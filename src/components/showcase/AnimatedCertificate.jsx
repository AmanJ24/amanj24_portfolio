import { motion } from 'framer-motion'

export default function AnimatedCertificate() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  const borderVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1.5, ease: 'easeInOut' },
    },
  }

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: '80%',
      transition: { duration: 1.2, delay: 1.4, ease: 'easeInOut' },
    },
  }

  const pulseVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        delay: 1.2,
      },
    },
  }

  return (
    <div className="w-full flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md relative bg-surface border border-border/60 p-6 md:p-8 rounded shadow-lg overflow-hidden crt-terminal"
        style={{ perspective: '1000px' }}
        whileHover={{
          rotateY: 4,
          rotateX: -2,
          y: -6,
          boxShadow: '0 25px 50px -12px rgba(191, 169, 138, 0.15)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Animated SVG Border frame */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.rect
            x="2"
            y="2"
            width="96"
            height="96"
            fill="none"
            stroke="#BFA98A"
            strokeWidth="0.8"
            variants={borderVariants}
            initial="hidden"
            animate="visible"
          />
        </svg>

        {/* Certificate Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 select-none"
        >
          <motion.div variants={itemVariants} className="flex justify-between items-center border-b border-border/30 pb-3">
            <span className="font-mono text-[9px] tracking-widest text-accent uppercase">▣ ENTRUSTORY CERTIFICATE</span>
            <span className="font-mono text-[8px] text-muted">ID: #E-94A2B</span>
          </motion.div>

          <div className="space-y-2 py-4">
            <motion.h4 variants={itemVariants} className="font-display text-xl md:text-2xl text-text font-light tracking-tight">
              Certificate of Authenticity
            </motion.h4>
            <motion.p variants={itemVariants} className="font-body text-xs text-muted leading-relaxed">
              This document certifies that the attached record has been cryptographically signed and has not been altered since issuance.
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="space-y-2 border-t border-border/20 pt-4 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-muted">ISSUED:</span>
              <span className="text-text">JUNE 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">ALGORITHM:</span>
              <span className="text-text">Ed25519</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted">HASH SHA256:</span>
              <span className="text-accent">a3f9...c812</span>
            </div>
          </motion.div>

          {/* Verification Status */}
          <motion.div
            variants={pulseVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-2 border border-sage/30 bg-sage/5 rounded py-2 select-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sage" />
            </span>
            <span className="font-mono text-[10px] text-sage tracking-widest uppercase">VERIFIED STATUS // VALID ✓</span>
          </motion.div>

          {/* Signature Block */}
          <motion.div variants={itemVariants} className="pt-4 flex flex-col items-center justify-center border-t border-border/30">
            <div className="w-full flex justify-center h-8 relative">
              {/* Dynamic Signature Vector Path Drawing */}
              <motion.div
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="h-[1px] bg-accent/40 absolute bottom-0"
              />
              <svg className="w-3/4 h-full" viewBox="0 0 100 30" fill="none">
                <motion.path
                  d="M10 20 Q 25 5, 40 20 T 70 15 T 90 20"
                  stroke="#BFA98A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1.4, ease: 'easeOut' }}
                />
              </svg>
            </div>
            <span className="font-mono text-[8px] text-muted/60 mt-2">AUTHORITY SIGNATURE KEY</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
