import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Seconds to delay the animation. */
  delay?: number
  /** Vertical travel distance in px. */
  y?: number
  className?: string
}

/**
 * Fades and lifts content into view on scroll.
 * Automatically becomes a no-op when the user prefers reduced motion.
 */
export function Reveal({ children, delay = 0, y = 22, className }: RevealProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
