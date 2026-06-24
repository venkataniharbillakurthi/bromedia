// Vite-compatible port of Framer ImageScroller
// https://framer.com/m/ImageScroller-kjnj.js@aP86nmOJy6tPfN0rRzeL

import { useEffect, useMemo, useRef, useState, startTransition } from 'react'
import { motion, useScroll } from 'framer-motion'

function getImageSrc(image) {
  if (!image) return ''
  if (typeof image === 'string') return image
  if (typeof image === 'object' && typeof image.src === 'string') return image.src
  return ''
}

function getFadeVariants(index, activeIndex) {
  const isActive = activeIndex === index
  const isInitial = index === 0

  return {
    initial: { opacity: isInitial ? 1 : 0 },
    animate: { opacity: isActive ? 1 : 0 },
  }
}

export default function ImageScroller({
  items = [],
  imageAnimationDelay = 0,
  textAnimationDelay = 0.2,
  backgroundColor = '#000000',
  dockPosition = 'right',
  thumbColor = 'rgba(255,255,255,0.15)',
  dockInset = 24,
  dockPadding = 8,
  thumbBlur = 8,
  textColor = '#ffffff',
  thumbSize = 56,
  thumbnailRadius = 16,
  thumbImageRadius = 10,
  thumbPadding = 8,
  dimInactive = true,
  inactiveOpacity = 0.45,
  outlineSize = 68,
  outlineThickness = 2,
  outlineRadius = 14,
}) {
  const containerRef = useRef(null)
  const stickyRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const validItems = useMemo(
    () =>
      (Array.isArray(items) ? items : []).filter((item) => {
        const src = getImageSrc(item?.image)
        return typeof src === 'string' && src.length > 0
      }),
    [items],
  )

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const total = validItems.length
    if (total <= 0) {
      if (activeIndex !== 0) startTransition(() => setActiveIndex(0))
      return
    }
    const next = Math.max(0, Math.min(activeIndex, total - 1))
    if (next !== activeIndex) startTransition(() => setActiveIndex(next))
  }, [validItems.length, activeIndex])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const total = validItems.length
      if (total === 0) return
      const newIndex = Math.min(Math.floor(latest * total), total - 1)
      startTransition(() => setActiveIndex(newIndex))
    })
    return () => unsubscribe()
  }, [scrollYProgress, validItems.length])

  useEffect(() => {
    const prevHtml = document.documentElement.style.overscrollBehaviorY
    const prevBody = document.body.style.overscrollBehaviorY
    document.documentElement.style.overscrollBehaviorY = 'none'
    document.body.style.overscrollBehaviorY = 'none'
    return () => {
      document.documentElement.style.overscrollBehaviorY = prevHtml
      document.body.style.overscrollBehaviorY = prevBody
    }
  }, [])

  const scrollHeight = Math.max(validItems.length * 100, 100)
  const isHorizontal =
    dockPosition === 'top' || dockPosition === 'bottom' || dockPosition === 'center-horizontal'

  const getDockStyles = () => {
    const base = { position: 'absolute', zIndex: 10, pointerEvents: 'auto' }

    switch (dockPosition) {
      case 'left':
        return { ...base, top: '50%', left: dockInset, transform: 'translateY(-50%)' }
      case 'right':
        return { ...base, top: '50%', right: dockInset, transform: 'translateY(-50%)' }
      case 'top':
        return { ...base, top: dockInset, left: '50%', transform: 'translateX(-50%)' }
      case 'bottom':
        return { ...base, bottom: dockInset, left: '50%', transform: 'translateX(-50%)' }
      case 'center-horizontal':
        return { ...base, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
      default:
        return { ...base, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    }
  }

  const handleThumbnailClick = (index) => {
    if (!containerRef.current) return
    const containerTop = containerRef.current.offsetTop
    const sectionHeight = stickyRef.current?.offsetHeight ?? window.innerHeight
    window.scrollTo({ top: containerTop + index * sectionHeight, behavior: 'smooth' })
  }

  if (validItems.length === 0) {
    return (
      <div
        className="flex h-screen w-full items-center justify-center"
        style={{ color: textColor, backgroundColor }}
      >
        No items to display
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: `${scrollHeight}vh`,
        backgroundColor,
        overscrollBehaviorY: 'none',
        marginTop: 0,
      }}
    >
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {validItems.map((item, index) => {
          const variants = getFadeVariants(index, activeIndex)
          const src = getImageSrc(item.image)

          return (
            <motion.div
              key={`${src}-${index}`}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: activeIndex === index ? 1 : 0,
                pointerEvents: activeIndex === index ? undefined : 'none',
                overflow: 'hidden',
              }}
              initial={variants.initial}
              animate={variants.animate}
              transition={{ duration: 0.6, ease: 'easeInOut', delay: imageAnimationDelay }}
            >
              <img
                src={src}
                alt={item.image?.alt || item.text || ''}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/45" />
            </motion.div>
          )
        })}

        <div
          className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center px-6 text-center sm:px-12"
          style={{ color: textColor }}
        >
          {validItems.map((item, index) => {
            const textVariants = getFadeVariants(index, activeIndex)

            return (
              <motion.h3
                key={`text-${index}`}
                className="absolute max-w-4xl px-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
                initial={textVariants.initial}
                animate={textVariants.animate}
                transition={{ duration: 0.6, ease: 'easeInOut', delay: textAnimationDelay }}
              >
                {item.text}
              </motion.h3>
            )
          })}
        </div>

        <div style={getDockStyles()}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: thumbColor,
              borderRadius: thumbnailRadius,
              backdropFilter: thumbBlur ? `blur(${thumbBlur}px)` : undefined,
              WebkitBackdropFilter: thumbBlur ? `blur(${thumbBlur}px)` : undefined,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: isHorizontal ? 'row' : 'column',
              gap: thumbPadding,
              alignItems: 'center',
              justifyContent: 'center',
              padding: dockPadding,
            }}
          >
            {validItems.map((item, index) => {
              const src = getImageSrc(item.image)
              const isActive = activeIndex === index

              return (
                <button
                  key={`thumb-${index}`}
                  type="button"
                  aria-label={item.text}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => handleThumbnailClick(index)}
                  style={{
                    position: 'relative',
                    width: thumbSize,
                    height: thumbSize,
                    cursor: 'pointer',
                    border: 'none',
                    padding: 0,
                    background: 'transparent',
                    opacity: dimInactive && !isActive ? inactiveOpacity : 1,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="services-thumb-outline"
                      style={{
                        position: 'absolute',
                        top: `calc(50% - ${outlineSize / 2}px)`,
                        left: `calc(50% - ${outlineSize / 2}px)`,
                        width: outlineSize,
                        height: outlineSize,
                        border: `${outlineThickness}px solid white`,
                        borderRadius: outlineRadius,
                        pointerEvents: 'none',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: thumbImageRadius,
                      overflow: 'hidden',
                      backgroundImage: src ? `url(${src})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
