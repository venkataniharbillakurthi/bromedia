// Vite port of Framer 3D Tilt Card
// https://framer.com/m/TiltCard-1-nBci.js@mSFBBLRp2Xy3wAzveJmu

import { useCallback, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function TiltCard({
  image,
  children,
  tiltFactor = 12,
  perspective = 1000,
  borderRadius = 16,
  backgroundColor = '#FFFFFF',
  shadowColor = 'rgba(223, 255, 0, 0.15)',
  shadowIntensity = 0.18,
  transitionDuration = 0.2,
  hoverScale = 1.04,
  glareEffect = true,
  glareIntensity = 0.35,
  glarePosition = 50,
  glareSize = 80,
  objectFit = 'cover',
  contentPadding = 0,
  className = '',
  onImageError,
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const imageSrc = image && typeof image === 'object' ? image.src : typeof image === 'string' ? image : ''
  const imageAlt = image && typeof image === 'object' ? image.alt : 'Card image'

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current || !isHovered) return

      const rect = cardRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100

      setMousePosition({ x, y })
      setTiltValues({
        x: -(y / 50) * tiltFactor,
        y: (x / 50) * tiltFactor,
      })
    },
    [isHovered, tiltFactor],
  )

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setTiltValues({ x: 0, y: 0 })
  }, [])

  const glareX = useMemo(
    () => (isHovered ? 50 + mousePosition.x / 2 : glarePosition),
    [isHovered, mousePosition.x, glarePosition],
  )

  const glareY = useMemo(
    () => (isHovered ? 50 + mousePosition.y / 2 : glarePosition),
    [isHovered, mousePosition.y, glarePosition],
  )

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
        borderRadius: `${borderRadius}px`,
      }}
      animate={{ scale: isHovered ? hoverScale : 1 }}
      transition={{ duration: transitionDuration, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: `${borderRadius}px`,
          overflow: 'hidden',
          backgroundColor,
          transformStyle: 'preserve-3d',
          boxShadow: `0 10px 30px -10px ${shadowColor}`,
        }}
        animate={{
          rotateX: tiltValues.x,
          rotateY: tiltValues.y,
          boxShadow: isHovered
            ? `0 22px 44px -14px rgba(223, 255, 0, ${shadowIntensity})`
            : `0 10px 30px -10px ${shadowColor}`,
        }}
        transition={{ duration: transitionDuration, ease: 'easeOut' }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            style={{
              width: '100%',
              height: '100%',
              objectFit,
              borderRadius: `${borderRadius}px`,
              position: 'relative',
              zIndex: 1,
              padding: contentPadding,
              boxSizing: 'border-box',
            }}
            loading="lazy"
            draggable={false}
            onError={onImageError}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: contentPadding || 12,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {children}
          </div>
        )}

        {glareEffect && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              borderRadius: `${borderRadius}px`,
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${isHovered ? glareIntensity : 0}) 0%, rgba(255, 255, 255, 0) ${glareSize}%)`,
              pointerEvents: 'none',
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: transitionDuration }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}
