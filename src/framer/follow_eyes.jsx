// Vite port of Framer Follow Eyes
// https://framer.com/m/Eye-Follow-Button-yMBK.js@UiZdcXLPs68fBczUfQ27

import { Fragment, startTransition, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function Eye({
  eyeSize,
  eyeColor,
  pupilSize,
  pupilColor,
  pupilPos,
  isBlinking,
  trackingSpeed,
}) {
  return (
    <div style={{ width: eyeSize, height: eyeSize, borderRadius: '50%', overflow: 'hidden' }}>
      <motion.div
        style={{
          width: eyeSize,
          height: eyeSize,
          borderRadius: '50%',
          backgroundColor: eyeColor,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformOrigin: 'center',
        }}
        animate={{ scaleY: isBlinking ? 0.3 : 1 }}
        transition={{ duration: 0.1, ease: 'easeInOut' }}
      >
        <motion.div
          style={{
            width: pupilSize,
            height: pupilSize,
            borderRadius: '50%',
            backgroundColor: pupilColor,
            opacity: isBlinking ? 0 : 1,
          }}
          animate={{ x: pupilPos.x, y: pupilPos.y }}
          transition={{ type: 'spring', stiffness: trackingSpeed, damping: 20 }}
        />
      </motion.div>
    </div>
  )
}

export default function FollowEyes({
  eyeColor = '#ffffff',
  pupilColor = '#000000',
  eyeSize = 40,
  pupilSize: rawPupilSize = 12,
  eyeSpacing = 4,
  trackingSpeed = 100,
  trackingRange = 90,
  eyeCount = 'two',
  enableBlinking = false,
  blinkInterval = 2000,
  style,
  className = '',
}) {
  const pupilSize = useMemo(() => Math.min(rawPupilSize, eyeSize * 0.8), [rawPupilSize, eyeSize])
  const containerRef = useRef(null)
  const [leftPupilPos, setLeftPupilPos] = useState({ x: 0, y: 0 })
  const [rightPupilPos, setRightPupilPos] = useState({ x: 0, y: 0 })
  const [centerPupilPos, setCenterPupilPos] = useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = useState(false)

  const maxDistance = useMemo(
    () => ((eyeSize - pupilSize) / 2) * (trackingRange / 100),
    [eyeSize, pupilSize, trackingRange],
  )

  useEffect(() => {
    if (!enableBlinking) return

    const blinkDuration = 200
    const interval = setInterval(() => {
      startTransition(() => setIsBlinking(true))
      setTimeout(() => startTransition(() => setIsBlinking(false)), blinkDuration)
    }, blinkInterval)

    return () => clearInterval(interval)
  }, [enableBlinking, blinkInterval])

  useEffect(() => {
    const updateFromPoint = (clientX, clientY) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = clientX - centerX
      const mouseY = clientY - centerY

      if (eyeCount === 'one') {
        const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY)
        if (distance === 0) {
          startTransition(() => setCenterPupilPos({ x: 0, y: 0 }))
          return
        }
        const clampedDistance = Math.min(distance, maxDistance)
        const angle = Math.atan2(mouseY, mouseX)
        startTransition(() => {
          setCenterPupilPos({
            x: Math.cos(angle) * clampedDistance,
            y: Math.sin(angle) * clampedDistance,
          })
        })
        return
      }

      const leftEyeOffsetX = -eyeSpacing / 2
      const rightEyeOffsetX = eyeSpacing / 2

      const calculatePupilPosition = (eyeOffsetX) => {
        const relativeX = mouseX - eyeOffsetX
        const relativeY = mouseY
        const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY)
        if (distance === 0) return { x: 0, y: 0 }
        const clampedDistance = Math.min(distance, maxDistance)
        const angle = Math.atan2(relativeY, relativeX)
        return {
          x: Math.cos(angle) * clampedDistance,
          y: Math.sin(angle) * clampedDistance,
        }
      }

      const leftPos = calculatePupilPosition(leftEyeOffsetX)
      const rightPos = calculatePupilPosition(rightEyeOffsetX)
      startTransition(() => {
        setLeftPupilPos(leftPos)
        setRightPupilPos(rightPos)
      })
    }

    const handleMouseMove = (e) => updateFromPoint(e.clientX, e.clientY)
    const handleTouchMove = (e) => {
      const touch = e.touches[0]
      if (touch) updateFromPoint(touch.clientX, touch.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [eyeSpacing, maxDistance, eyeCount])

  const containerWidth = useMemo(
    () => (eyeCount === 'one' ? eyeSize : eyeSize * 2 + eyeSpacing),
    [eyeCount, eyeSize, eyeSpacing],
  )

  const sharedEyeProps = {
    eyeSize,
    eyeColor,
    pupilSize,
    pupilColor,
    isBlinking,
    trackingSpeed,
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: eyeCount === 'two' ? eyeSpacing : 0,
        overflow: 'visible',
        position: 'relative',
        width: containerWidth,
        height: eyeSize,
        flexShrink: 0,
      }}
    >
      {eyeCount === 'one' ? (
        <Eye {...sharedEyeProps} pupilPos={centerPupilPos} />
      ) : (
        <Fragment>
          <Eye {...sharedEyeProps} pupilPos={leftPupilPos} />
          <Eye {...sharedEyeProps} pupilPos={rightPupilPos} />
        </Fragment>
      )}
    </div>
  )
}
