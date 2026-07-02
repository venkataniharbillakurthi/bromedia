// Vite port of Framer Clients Carousel (InfiniteScroll)
// https://framer.com/m/Clients-Carousel-1B8ini.js@pvy7n0Jc3JVtIaTUSIb8

import { useRef, useState, startTransition } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'

const SHELL_BG = '#f4f4f5'
const SHELL_BORDER = 'rgba(0, 0, 0, 0.1)'
const TILE_BG = '#ffffff'
const TILE_BORDER = 'rgba(0, 0, 0, 0.1)'

export default function ClientsCarousel({
  brands = [],
  speed = 1,
  hoverSpeed = 0.3,
  gap = 20,
  logoSize = 100,
  backgroundColor = '#FFFFFF',
  borderColor = 'rgba(0, 0, 0, 0.16)',
  borderRadius = 6,
  padding = 16,
  direction = 'left',
  verticalAlign = 'center',
  pauseOnClick = true,
  useGrayscale = true,
  sortAlphabetically = false,
  className = '',
  style,
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef(null)
  const x = useMotionValue(0)

  const currentSpeed = isPaused ? 0 : isHovered ? hoverSpeed : speed
  const directionMultiplier = direction === 'left' ? -1 : 1

  const sortedBrands = sortAlphabetically
    ? [...brands].sort((a, b) => a.name.localeCompare(b.name))
    : brands

  const itemWidth = logoSize + gap
  const totalWidth = Math.max(sortedBrands.length * itemWidth, 1)

  useAnimationFrame((_time, delta) => {
    if (sortedBrands.length === 0) return

    const movement = currentSpeed * directionMultiplier * (delta / 16)
    const currentX = x.get()
    let newX = currentX + movement

    if (direction === 'left' && newX <= -totalWidth) {
      newX += totalWidth
    } else if (direction === 'right' && newX >= 0) {
      newX -= totalWidth
    }

    x.set(newX)
  })

  const duplicatedBrands = [...sortedBrands, ...sortedBrands, ...sortedBrands]

  const handleClick = () => {
    if (pauseOnClick) {
      startTransition(() => setIsPaused((prev) => !prev))
    }
  }

  const getVerticalAlignment = () => {
    switch (verticalAlign) {
      case 'top':
        return 'flex-start'
      case 'bottom':
        return 'flex-end'
      default:
        return 'center'
    }
  }

  if (sortedBrands.length === 0) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: getVerticalAlignment(),
        ...style,
      }}
      onMouseEnter={() => startTransition(() => setIsHovered(true))}
      onMouseLeave={() => startTransition(() => setIsHovered(false))}
      onClick={handleClick}
      role="region"
      aria-label="Client logos carousel"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <motion.div
        style={{
          display: 'flex',
          gap: `${gap}px`,
          x,
          willChange: 'transform',
        }}
      >
        {duplicatedBrands.map((brand, index) => {
          const brandImage = brand.image || { src: '', alt: brand.name }

          return (
            <div
              key={`${brand.name}-${index}`}
              style={{
                width: `${logoSize}px`,
                height: `${logoSize}px`,
                backgroundColor,
                border: `1px solid ${borderColor}`,
                borderRadius: `${borderRadius}px`,
                padding: `${padding}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
              role="img"
              aria-label={brandImage.alt || brand.name}
            >
              {brandImage.src ? (
                <img
                  src={brandImage.src}
                  alt={brandImage.alt || brand.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    filter: useGrayscale ? 'grayscale(100%)' : 'none',
                    transition: 'filter 0.3s ease',
                  }}
                  loading="lazy"
                  draggable={false}
                />
              ) : (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textAlign: 'center',
                    color: 'rgba(0,0,0,0.55)',
                    lineHeight: 1.3,
                  }}
                >
                  {brand.name}
                </span>
              )}
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

export function ClientsCarouselFromData({
  items = [],
  className = '',
  style,
  ...props
}) {
  const brands = items.map((item) => ({
    name: item.name,
    image: {
      src: item.logo || '',
      alt: item.name,
    },
    url: item.url || '',
  }))

  return (
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
      <div
        className="overflow-hidden rounded-2xl border px-4 py-4 sm:px-5 sm:py-5"
        style={{
          backgroundColor: SHELL_BG,
          borderColor: SHELL_BORDER,
          boxShadow: 'none',
        }}
      >
        <ClientsCarousel
          brands={brands}
          className={className}
          style={{ height: 112, ...style }}
          logoSize={96}
          gap={16}
          speed={0.85}
          hoverSpeed={0.25}
          backgroundColor={TILE_BG}
          borderColor={TILE_BORDER}
          borderRadius={8}
          padding={12}
          direction="left"
          pauseOnClick
          useGrayscale={false}
          {...props}
        />
      </div>
    </div>
  )
}
