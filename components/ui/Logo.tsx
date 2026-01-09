'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  showSlogan?: boolean
  className?: string
}

export function Logo({ 
  size = 'md', 
  showText = true, 
  showSlogan = false,
  className = '' 
}: LogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizes = {
    sm: { width: 60, height: 60, textSize: 'text-lg', sloganSize: 'text-xs' },
    md: { width: 80, height: 80, textSize: 'text-2xl', sloganSize: 'text-sm' },
    lg: { width: 100, height: 100, textSize: 'text-3xl', sloganSize: 'text-base' },
  }

  const { width, height, textSize, sloganSize } = sizes[size]

  return (
    <motion.div
      className={`flex items-center gap-3 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Logo */}
      <div className="relative flex-shrink-0" style={{ width, height }}>
        <Image
          src="/logo-fenix.png"
          alt="Instituto Fênix"
          fill
          className="object-contain"
          priority
          sizes={`${width}px`}
        />
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-primary-500/20 rounded-lg blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </div>

      {/* Texto ao lado da logo */}
      {showText && (
        <div className="flex flex-col">
          <motion.span 
            className={`${textSize} font-bold text-dark-600 leading-tight hidden sm:block`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            Instituto Fênix
          </motion.span>
          {showSlogan && (
            <motion.span 
              className={`${sloganSize} text-dark-300 font-normal mt-0.5 hidden sm:block leading-relaxed`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Recuperando vidas, restaurando famílias.
            </motion.span>
          )}
        </div>
      )}
    </motion.div>
  )
}

