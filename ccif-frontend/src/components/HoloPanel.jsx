import { motion } from 'framer-motion'

export default function HoloPanel({ children, className = '', delay = 0, as = 'section' }) {
  const Component = motion[as] || motion.section
  return (
    <Component
      className={`glass-panel edge-glow rounded-[1.6rem] ${className}`}
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
    >
      {children}
    </Component>
  )
}
