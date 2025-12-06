import { motion } from 'framer-motion'

export default function AnimatedSection({ children, direction = 'left', className = '' }) {
    const variants = {
        left: {
            initial: { x: -80, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            exit: { x: -80, opacity: 0 },
        },
        right: {
            initial: { x: 80, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            exit: { x: 80, opacity: 0 },
        },
    }

    const current = variants[direction] || variants.left

  return (
    <motion.div
      className={className}
      initial={current.initial}
      animate={current.animate}
      exit={current.exit}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
