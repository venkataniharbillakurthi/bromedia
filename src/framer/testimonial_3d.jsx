// Vite port of Framer Testimonial3D (Circular Testimonials)
// https://framer.com/m/Testimonial3D-MbxhNK.js@T24AcuNihwFWwTT3DdKo

import { useCallback, useEffect, useMemo, useRef, useState, startTransition } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

function calculateGap(width) {
  const minWidth = 1024
  const maxWidth = 1456
  const minGap = 60
  const maxGap = 86

  if (width <= minWidth) return minGap
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth))
  return minGap + ((maxGap - minGap) * (width - minWidth)) / (maxWidth - minWidth)
}

const PLACEHOLDER_IMAGE = `data:image/svg+xml;base64,${btoa(
  '<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="400" fill="#e5e7eb"/><text x="50%" y="50%" font-family="sans-serif" font-size="24" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">No Image</text></svg>',
)}`

export default function Testimonial3D({
  testimonials = [],
  autoplay = true,
  autoplayInterval = 5000,
  nameColor = '#000000',
  designationColor = '#6b7280',
  quoteColor = '#4b5563',
  arrowBackground = '#141414',
  arrowForeground = '#f1f1f7',
  arrowHoverBackground = '#1e45ff',
  nameFont = { fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '1.2em' },
  designationFont = { fontSize: '18px', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: '1.3em' },
  quoteFont = { fontSize: '18px', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: '1.75em' },
  maxQuoteLength = 0,
  backgroundColor = 'transparent',
  style,
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverPrev, setHoverPrev] = useState(false)
  const [hoverNext, setHoverNext] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [containerWidth, setContainerWidth] = useState(1200)
  const rootRef = useRef(null)
  const imageContainerRef = useRef(null)
  const autoplayIntervalRef = useRef(null)
  const resumeTimeoutRef = useRef(null)
  const isInView = useInView(rootRef, { amount: 0.3, once: false })

  const testimonialsLength = testimonials.length

  const activeTestimonial = useMemo(() => {
    if (testimonialsLength === 0) return null

    const testimonial = testimonials[activeIndex]
    let quote = testimonial.quote

    if (maxQuoteLength > 0 && quote.length > maxQuoteLength) {
      quote = `${quote.substring(0, maxQuoteLength).trim()}...`
    }

    return {
      ...testimonial,
      quote,
      image: testimonial.image || { src: PLACEHOLDER_IMAGE, alt: 'Testimonial image' },
    }
  }, [activeIndex, testimonials, maxQuoteLength, testimonialsLength])

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        startTransition(() => setContainerWidth(imageContainerRef.current.offsetWidth))
      }
    }

    handleResize()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const stopAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current)
      autoplayIntervalRef.current = null
    }
  }, [])

  const startAutoplay = useCallback(() => {
    stopAutoplay()

    if (!autoplay || testimonialsLength <= 1 || !isInView || isPaused) return

    autoplayIntervalRef.current = window.setInterval(() => {
      startTransition(() => setActiveIndex((prev) => (prev + 1) % testimonialsLength))
    }, autoplayInterval)
  }, [autoplay, autoplayInterval, isInView, isPaused, stopAutoplay, testimonialsLength])

  const scheduleAutoplayResume = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)

    resumeTimeoutRef.current = window.setTimeout(() => {
      startAutoplay()
    }, autoplayInterval)
  }, [autoplayInterval, startAutoplay])

  useEffect(() => {
    startAutoplay()

    return () => {
      stopAutoplay()
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [startAutoplay, stopAutoplay])

  const handleNext = useCallback(() => {
    startTransition(() => setActiveIndex((prev) => (prev + 1) % testimonialsLength))
    stopAutoplay()
    scheduleAutoplayResume()
  }, [scheduleAutoplayResume, stopAutoplay, testimonialsLength])

  const handlePrev = useCallback(() => {
    startTransition(() => setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength))
    stopAutoplay()
    scheduleAutoplayResume()
  }, [scheduleAutoplayResume, stopAutoplay, testimonialsLength])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      }
    },
    [handleNext, handlePrev],
  )

  function getImageStyle(index) {
    const gap = calculateGap(containerWidth)
    const maxStickUp = gap * 0.8
    const isActive = index === activeIndex
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index
    const isRight = (activeIndex + 1) % testimonialsLength === index

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: 'auto',
        transform: 'translateX(0px) translateY(0px) scale(1) rotateY(0deg)',
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      }
    }

    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      }
    }

    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      }
    }

    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: 'none',
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    }
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  if (testimonialsLength === 0) {
    return (
      <div
        style={{
          ...style,
          width: '100%',
          padding: '2rem',
          position: 'relative',
          backgroundColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
        }}
      >
        <p style={{ color: designationColor, ...designationFont }}>No testimonials available.</p>
      </div>
    )
  }

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => {
        setIsPaused(true)
        stopAutoplay()
      }}
      onMouseLeave={() => {
        setIsPaused(false)
        startAutoplay()
      }}
      onFocus={() => {
        setIsPaused(true)
        stopAutoplay()
      }}
      onBlur={() => {
        setIsPaused(false)
        startAutoplay()
      }}
      style={{
        ...style,
        width: '100%',
        maxWidth: '56rem',
        margin: '0 auto',
        padding: '1rem',
        position: 'relative',
        backgroundColor,
        outline: 'none',
      }}
      aria-label="Client testimonials carousel"
    >
      <div
        className="testimonial-3d-grid"
        style={{ display: 'grid', gap: '3rem', gridTemplateColumns: '1fr' }}
      >
        <div
          ref={imageContainerRef}
          style={{ position: 'relative', width: '100%', height: '20rem', perspective: '1000px' }}
        >
          {testimonials.map((testimonial, index) => {
            const image = testimonial.image || {
              src: PLACEHOLDER_IMAGE,
              alt: 'Testimonial image',
            }

            return (
              <img
                key={`${image.src}-${index}`}
                src={image.src}
                alt={image.alt}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '1.5rem',
                  boxShadow: '0 10px 30px rgba(30, 69, 255, 0.15)',
                  ...getImageStyle(index),
                }}
                loading="lazy"
              />
            )
          })}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            minHeight: '320px',
          }}
        >
          {activeTestimonial && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={quoteVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <h3 style={{ color: nameColor, marginBottom: '0.25rem', ...nameFont }}>
                  {activeTestimonial.name}
                </h3>
                <p style={{ color: designationColor, marginBottom: '1.5rem', ...designationFont }}>
                  {activeTestimonial.designation}
                </p>
                <motion.p style={{ color: quoteColor, lineHeight: '1.75', ...quoteFont }}>
                  {activeTestimonial.quote.split(' ').map((word, i) => (
                    <motion.span
                      key={`${activeIndex}-${word}-${i}`}
                      initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                      animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut', delay: 0.025 * i }}
                      style={{ display: 'inline-block' }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              type="button"
              onClick={handlePrev}
              onMouseEnter={() => startTransition(() => setHoverPrev(true))}
              onMouseLeave={() => startTransition(() => setHoverPrev(false))}
              aria-label="Previous testimonial"
              style={{
                width: '2.7rem',
                height: '2.7rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                border: 'none',
                backgroundColor: hoverPrev ? arrowHoverBackground : arrowBackground,
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke={arrowForeground}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              onMouseEnter={() => startTransition(() => setHoverNext(true))}
              onMouseLeave={() => startTransition(() => setHoverNext(false))}
              aria-label="Next testimonial"
              style={{
                width: '2.7rem',
                height: '2.7rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                border: 'none',
                backgroundColor: hoverNext ? arrowHoverBackground : arrowBackground,
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke={arrowForeground}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .testimonial-3d-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 4rem !important;
          }
        }
      `}</style>
    </div>
  )
}
