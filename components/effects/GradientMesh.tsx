'use client'

import { useEffect, useRef } from 'react'

export function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let time = 0
    const animate = () => {
      time += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(time) * 100,
        canvas.height * 0.3 + Math.cos(time) * 100,
        0,
        canvas.width * 0.3,
        canvas.height * 0.3,
        canvas.width * 0.5
      )
      gradient1.addColorStop(0, 'rgba(255, 107, 53, 0.3)')
      gradient1.addColorStop(1, 'rgba(255, 107, 53, 0)')

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.cos(time * 0.8) * 100,
        canvas.height * 0.7 + Math.sin(time * 0.8) * 100,
        0,
        canvas.width * 0.7,
        canvas.height * 0.7,
        canvas.width * 0.5
      )
      gradient2.addColorStop(0, 'rgba(255, 135, 71, 0.2)')
      gradient2.addColorStop(1, 'rgba(255, 135, 71, 0)')

      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-50"
      style={{ willChange: 'transform' }}
    />
  )
}

