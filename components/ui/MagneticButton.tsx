'use client'

import { useRef, useState, MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Button, ButtonProps } from './Button'

export interface MagneticButtonProps extends Omit<ButtonProps, 'ref'> {
  magnetic?: boolean
  strength?: number
}

export function MagneticButton({ 
  magnetic = true, 
  strength = 0.3,
  children,
  ...buttonProps 
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !magnetic) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = (e.clientX - centerX) * strength
    const distanceY = (e.clientY - centerY) * strength

    x.set(distanceX)
    y.set(distanceY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      style={{
        x: xSpring,
        y: ySpring,
        display: 'inline-block',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <Button {...buttonProps}>
        {children}
      </Button>
    </motion.div>
  )
}

