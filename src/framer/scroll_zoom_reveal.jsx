import { motion, useMotionTemplate, useMotionValue, useTransform, useScroll } from 'framer-motion'
import { useEffect, useRef } from 'react'
import LiquidEther from './liquid_ether.jsx'

const MOBILE_BREAKPOINT = 640
const SCROLL_STOPS = [0, 0.4, 0.7, 1]

function getValueAtProgress(progress, stops, values) {
  const p = Math.min(1, Math.max(0, progress))

  for (let i = 0; i < stops.length - 1; i += 1) {
    if (p >= stops[i] && p <= stops[i + 1]) {
      const t = (p - stops[i]) / (stops[i + 1] - stops[i])
      return values[i] + (values[i + 1] - values[i]) * t
    }
  }

  return values[values.length - 1]
}

export default function ScrollZoomReveal({
  image,
  leftText = '©2026 ',
  rightText = 'Brosmedia',
  textColor = '#000',
  sideGap = 18,
  sideGapMobile = 10,
  showLiquidEther = true,
  children,
}) {
  const ref = useRef(null)
  const gapPx = useMotionValue(sideGap)
  const layoutMode = useMotionValue(0)

  useEffect(() => {
    const updateLayout = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT
      layoutMode.set(mobile ? 1 : 0)
      gapPx.set(mobile ? sideGapMobile : sideGap)
    }

    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [gapPx, layoutMode, sideGap, sideGapMobile])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const width = useTransform([scrollYProgress, layoutMode], ([progress, mobile]) => {
    const value = getValueAtProgress(
      progress,
      SCROLL_STOPS,
      mobile ? [12, 20, 50, 100] : [8, 20, 50, 100],
    )
    return `${value}vw`
  })

  const height = useTransform([scrollYProgress, layoutMode], ([progress, mobile]) => {
    const value = getValueAtProgress(
      progress,
      SCROLL_STOPS,
      mobile ? [12, 15, 45, 100] : [10, 15, 45, 100],
    )
    return `${value}vh`
  })

  const borderRadius = useTransform(scrollYProgress, SCROLL_STOPS, [40, 40, 40, 0])

  const imageHalfWidthVw = useTransform([scrollYProgress, layoutMode], ([progress, mobile]) =>
    getValueAtProgress(progress, SCROLL_STOPS, mobile ? [6, 10, 25, 50] : [0.5, 10, 25, 50]),
  )
  const textEdge = useMotionTemplate`calc(50% + ${imageHalfWidthVw}vw + ${gapPx}px)`

  const sideTextOpacity = useTransform(scrollYProgress, [0, 0.7, 0.75], [1, 1, 0])
  const sideTextScale = useTransform(scrollYProgress, [0, 0.75, 0.8], [1, 1, 0])

  const labelClass =
    'pointer-events-none absolute top-1/2 text-[18px] font-semibold leading-none whitespace-nowrap sm:text-[66px] sm:leading-normal'

  return (
    <section
      ref={ref}
      style={{
        height: '200vh',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {showLiquidEther && (
          <LiquidEther
            className="absolute inset-0 z-0 h-full w-full"
            style={{ width: '100%', height: '100%' }}
            colors={['#1e45ff', '#dfff00', '#000000']}
            mouseForce={20}
            cursorSize={100}
            isViscous
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        )}

        <motion.div
          className={`${labelClass} text-right`}
          style={{
            color: textColor,
            opacity: sideTextOpacity,
            scaleX: sideTextScale,
            y: '-50%',
            right: textEdge,
            transformOrigin: 'right center',
            zIndex: 2,
          }}
        >
          {leftText}
        </motion.div>

        <motion.div
          className={`${labelClass} text-left`}
          style={{
            color: textColor,
            opacity: sideTextOpacity,
            scaleX: sideTextScale,
            y: '-50%',
            left: textEdge,
            transformOrigin: 'left center',
            zIndex: 2,
          }}
        >
          {rightText}
        </motion.div>

        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            x: '-50%',
            y: '-50%',
            width,
            height,
            borderRadius,
            overflow: 'hidden',
            zIndex: 2,
          }}
        >
          <img
            src={image?.src}
            alt={image?.alt || ''}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </motion.div>

        {children && (
          <motion.div
            className="absolute inset-0 z-[0] pointer-events-none"
            style={{ opacity: sideTextOpacity }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
