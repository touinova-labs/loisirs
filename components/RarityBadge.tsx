'use client'
import { motion } from 'framer-motion'
import { Gem } from 'lucide-react'

export function RarityBadge() {
  return (
    <motion.div
      initial={{ opacity: 0.5, scale: 0.95 }}
      animate={{ 
        opacity: [0.5, 1, 0.5], 
        scale: [0.95, 1, 0.95],
        boxShadow: [
          "0 0 0px rgba(var(--accent-gold), 0)", 
          "0 0 15px rgba(251, 191, 36, 0.4)", 
          "0 0 0px rgba(251, 191, 36, 0)"
        ] 
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="inline-flex items-center gap-1.5 border px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
      style={{
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        borderColor: 'rgba(251, 191, 36, 0.5)',
        color: 'var(--accent-gold)',
      }}
    >
      <Gem size={14} />
      Offre Limitée
    </motion.div>
  )
}