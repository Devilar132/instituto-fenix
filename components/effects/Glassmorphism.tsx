'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassmorphismProps {
  children: ReactNode
  className?: string
  intensity?: 'light' | 'medium' | 'strong'
}

export function Glassmorphism({ 
  children, 
  className = '',
  intensity = 'medium' 
}: GlassmorphismProps) {
  const intensityClasses = {
    light: 'bg-white/10 backdrop-blur-sm',
    medium: 'bg-white/20 backdrop-blur-md',
    strong: 'bg-white/30 backdrop-blur-lg',
  }

  return (
    <div
      className={cn(
        'rounded-lg border border-white/20 shadow-xl',
        intensityClasses[intensity],
        className
      )}
      style={{
        willChange: 'transform',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {children}
    </div>
  )
}

