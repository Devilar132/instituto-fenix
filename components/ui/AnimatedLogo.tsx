'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  className?: string
}

export function AnimatedLogo({ size = 'md', animated = true, className = '' }: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  const logoVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: [0, -5, 5, -5, 0],
      transition: { duration: 0.5 }
    },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div
      className={`${sizes[size]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={animated ? logoVariants : {}}
      animate={animated && !isHovered ? 'animate' : isHovered ? 'hover' : 'initial'}
      whileHover={animated ? 'hover' : {}}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Fênix - Corpo */}
        <motion.path
          d="M100 160 Q80 140 70 120 Q60 100 70 80 Q80 60 100 50 Q120 60 130 80 Q140 100 130 120 Q120 140 100 160 Z"
          fill="#FF6B35"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Asas - Esquerda */}
        <motion.path
          d="M70 120 Q50 100 40 80 Q30 60 40 40 Q50 20 70 30"
          fill="none"
          stroke="#FF6B35"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
        />
        
        {/* Asas - Direita */}
        <motion.path
          d="M130 120 Q150 100 160 80 Q170 60 160 40 Q150 20 130 30"
          fill="none"
          stroke="#FF6B35"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        />
        
        {/* Cabeça */}
        <motion.circle
          cx="100"
          cy="70"
          r="15"
          fill="#FF6B35"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7, type: "spring" }}
        />
        
        {/* Bico */}
        <motion.path
          d="M85 70 L75 65 L85 60 Z"
          fill="#E55A2B"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
        
        {/* Efeito de brilho (glow) */}
        {isHovered && (
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#FF6B35"
            strokeWidth="2"
            strokeOpacity="0.3"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: [0, 0.5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </svg>
    </motion.div>
  )
}

