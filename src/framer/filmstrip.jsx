// Vite port of Framer FilmStrip
// https://framer.com/m/FilmStrip-uZIFAd.js@9HBHUzDZOqsm93EbSt1r

import { useEffect, useRef, useState } from 'react'

const VINTAGE_FILTER = 'sepia(0.75) contrast(1.12) brightness(0.88) saturate(0.6)'
const VIGNETTE = 'radial-gradient(ellipse at center, transparent 50%, rgba(20,10,0,0.65) 100%)'
const MIN_FILL_PX = 4000

function buildTiledImages(images, frameSize, frameGap) {
  if (images.length === 0) return []
  const singleSetPx = images.length * frameSize + Math.max(0, images.length - 1) * frameGap
  const repeats = Math.ceil(MIN_FILL_PX / singleSetPx)
  const tiled = []
  for (let r = 0; r < repeats; r += 1) {
    for (const img of images) {
      tiled.push(img)
    }
  }
  return tiled
}

function PerfRow({
  isH,
  length,
  thickness,
  stripColor,
  holeW,
  holeH,
  holeR,
  gap,
  uid,
  patternOffset = 0,
}) {
  const svgW = isH ? length : thickness
  const svgH = isH ? thickness : length
  const tileLen = holeW + gap
  const patW = isH ? tileLen : thickness
  const patH = isH ? thickness : tileLen
  const holeX = isH ? gap / 2 : (thickness - holeW) / 2
  const holeY = isH ? (thickness - holeH) / 2 : gap / 2
  const patX = isH ? -patternOffset : 0
  const patY = isH ? 0 : -patternOffset
  const patId = `pp-${uid}`
  const maskId = `pm-${uid}`

  return (
    <svg
      width={svgW}
      height={svgH}
      style={{ display: 'block', flexShrink: 0 }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id={patId} x={patX} y={patY} width={patW} height={patH} patternUnits="userSpaceOnUse">
          <rect width={patW} height={patH} fill="white" />
          <rect x={holeX} y={holeY} width={holeW} height={holeH} rx={holeR} ry={holeR} fill="black" />
        </pattern>
        <mask id={maskId}>
          <rect width={svgW} height={svgH} fill={`url(#${patId})`} />
        </mask>
      </defs>
      <rect width={svgW} height={svgH} fill={stripColor} mask={`url(#${maskId})`} />
    </svg>
  )
}

function Frame({
  src,
  label,
  displayIndex,
  isH,
  isVin,
  frameWidth,
  frameHeight,
  frameRadius,
  brandLabel,
  frameBackground,
  objectFit,
  onClick,
}) {
  const hasImage = Boolean(src)

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick()
        }
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{
        position: 'relative',
        width: frameWidth,
        height: frameHeight,
        flexShrink: 0,
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        borderRadius: frameRadius,
        background: frameBackground,
      }}
    >
      {hasImage ? (
        <img
          src={src}
          alt={label || ''}
          style={{
            width: '100%',
            height: '100%',
            objectFit,
            display: 'block',
            transition: 'filter 0.6s',
            filter: isVin ? VINTAGE_FILTER : 'none',
            pointerEvents: 'none',
            padding: objectFit === 'contain' ? 12 : 0,
            boxSizing: 'border-box',
          }}
          loading="lazy"
          draggable={false}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 600,
            color: '#111',
            pointerEvents: 'none',
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: VIGNETTE,
          opacity: isVin ? 1 : 0,
          transition: 'opacity 0.6s',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 4,
          right: 5,
          fontFamily: "'Courier New', monospace",
          fontSize: 10,
          color: isVin ? 'rgba(200,160,70,0.75)' : 'rgba(255,255,255,0.35)',
          pointerEvents: 'none',
          letterSpacing: '0.1em',
          transition: 'color 0.4s',
        }}
      >
        {String(displayIndex + 1).padStart(2, '0')}A
      </div>
      {brandLabel ? (
        <div
          style={{
            position: 'absolute',
            bottom: 4,
            left: 5,
            fontFamily: "'Courier New', monospace",
            fontSize: 9,
            color: isVin ? 'rgba(180,140,60,0.55)' : 'rgba(255,255,255,0.2)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            transition: 'color 0.4s',
          }}
        >
          {brandLabel}
        </div>
      ) : null}
    </div>
  )
}

function StripHalf({
  tiledImages,
  labels,
  originalCount,
  isH,
  isVin,
  frameWidth,
  frameHeight,
  frameRadius,
  brandLabel,
  stripColor,
  perfThickness,
  holeW,
  holeH,
  holeR,
  holeGap,
  frameGap,
  perfOffset,
  halfId,
  interactive,
  frameBackground,
  objectFit,
  onFrameClick,
}) {
  const frameSize = isH ? frameWidth : frameHeight
  const framesLength = tiledImages.length * frameSize + tiledImages.length * frameGap
  const tileLen = holeW + holeGap
  const phaseOffset = perfOffset % tileLen

  return (
    <div style={{ display: 'flex', flexDirection: isH ? 'column' : 'row', flexShrink: 0 }}>
      <PerfRow
        isH={isH}
        length={framesLength}
        thickness={perfThickness}
        stripColor={stripColor}
        holeW={holeW}
        holeH={holeH}
        holeR={holeR}
        gap={holeGap}
        uid={`${halfId}-t`}
        patternOffset={phaseOffset}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: isH ? 'row' : 'column',
          flexShrink: 0,
          background: stripColor,
          gap: frameGap,
          ...(isH ? { paddingRight: frameGap } : { paddingBottom: frameGap }),
        }}
      >
        {tiledImages.map((src, i) => {
          const origIdx = i % originalCount
          return (
            <Frame
              key={`${halfId}-frame-${i}`}
              src={src}
              label={labels[origIdx]}
              displayIndex={origIdx}
              isH={isH}
              isVin={isVin}
              frameWidth={frameWidth}
              frameHeight={frameHeight}
              frameRadius={frameRadius}
              brandLabel={brandLabel}
              frameBackground={frameBackground}
              objectFit={objectFit}
              onClick={
                interactive && onFrameClick
                  ? () => onFrameClick(src, origIdx)
                  : undefined
              }
            />
          )
        })}
      </div>
      <PerfRow
        isH={isH}
        length={framesLength}
        thickness={perfThickness}
        stripColor={stripColor}
        holeW={holeW}
        holeH={holeH}
        holeR={holeR}
        gap={holeGap}
        uid={`${halfId}-b`}
        patternOffset={phaseOffset}
      />
    </div>
  )
}

function Lightbox({ src, label, url, isVin, onClose }) {
  return (
    <div
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.92)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <button
        type="button"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '1.2rem',
          right: '1.2rem',
          width: 30,
          height: 30,
          background: 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: '50%',
          color: 'white',
          fontSize: 16,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Close"
      >
        ✕
      </button>
      <img
        src={src}
        alt={label}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '88vw',
          maxHeight: '70vh',
          objectFit: 'contain',
          filter: isVin ? VINTAGE_FILTER : 'none',
          transition: 'filter 0.6s',
          borderRadius: 2,
          background: '#fff',
          padding: 16,
        }}
      />
      <div
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 11,
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 13,
            fontWeight: 600,
            color: '#dfff00',
            textDecoration: 'none',
          }}
        >
          Visit website →
        </a>
      ) : null}
    </div>
  )
}

export default function FilmStrip({
  images = [],
  labels = [],
  urls = [],
  orientation = 'horizontal',
  mode = 'clean',
  speed = 18,
  direction = 'forward',
  motionEnabled = true,
  frameWidth = 180,
  frameHeight = 120,
  stripColor = '#111111',
  perfThickness = 24,
  holeWidth = 16,
  holeHeight = 11,
  holeRadius = 2,
  holeGap = 10,
  frameGap = 0,
  frameRadius = 0,
  fadeWidth = 80,
  showShadow = true,
  brandLabel = 'BROSMEDIA',
  frameBackground = '#f5f5f5',
  objectFit = 'contain',
  className = '',
  style = {},
}) {
  const [lbSrc, setLbSrc] = useState(null)
  const [lbIdx, setLbIdx] = useState(0)

  const instanceId = useRef(`fs-${Math.random().toString(36).slice(2, 7)}`)
  const tickerRef = useRef(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)
  const speedRef = useRef(speed)
  const halfWRef = useRef(0)
  const isHRef = useRef(true)
  const directionRef = useRef(direction)
  const motionEnabledRef = useRef(motionEnabled)
  const rafRef = useRef(0)

  const isH = orientation === 'horizontal'
  const isVin = mode === 'vintage'
  const hasImages = images.length > 0
  const frameSize = isH ? frameWidth : frameHeight
  const tiledImages = buildTiledImages(images, frameSize, frameGap)
  const halfLength = tiledImages.length * frameSize + tiledImages.length * frameGap

  speedRef.current = speed
  isHRef.current = isH
  directionRef.current = direction
  motionEnabledRef.current = motionEnabled
  halfWRef.current = halfLength

  useEffect(() => {
    let lastTime = null

    function tick(now) {
      const hw = halfWRef.current
      const run = hw > 0 && !pausedRef.current && motionEnabledRef.current

      if (run) {
        if (lastTime !== null) {
          const delta = now - lastTime
          const pxPerMs = hw / (speedRef.current * 1000)
          const step = pxPerMs * delta
          if (directionRef.current === 'forward') {
            posRef.current += step
            if (posRef.current >= hw) posRef.current -= hw
          } else {
            posRef.current -= step
            if (posRef.current < 0) posRef.current += hw
          }
        }
        lastTime = now
      } else {
        lastTime = null
      }

      const el = tickerRef.current
      if (el) {
        el.style.transform = isHRef.current
          ? `translateX(-${posRef.current}px)`
          : `translateY(-${posRef.current}px)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const tickerStyle = {
    display: 'flex',
    flexDirection: isH ? 'row' : 'column',
    willChange: 'transform',
  }

  const halfProps = {
    tiledImages,
    labels,
    originalCount: images.length,
    isH,
    isVin,
    frameWidth,
    frameHeight,
    frameRadius,
    brandLabel,
    stripColor,
    perfThickness,
    holeW: holeWidth,
    holeH: holeHeight,
    holeR: holeRadius,
    holeGap,
    frameGap,
    frameBackground,
    objectFit,
  }

  const tileLen = holeWidth + holeGap
  const setBOffset = halfLength % tileLen

  const fadeMask =
    fadeWidth > 0 && hasImages
      ? isH
        ? `linear-gradient(to right, transparent 0px, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent 100%)`
        : `linear-gradient(to bottom, transparent 0px, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent 100%)`
      : undefined

  return (
    <div
      className={className}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: showShadow
          ? '0 14px 44px rgba(0,0,0,0.42), 0 4px 14px rgba(0,0,0,0.22)'
          : 'none',
        transition: 'box-shadow 0.4s',
        WebkitMaskImage: fadeMask,
        maskImage: fadeMask,
      }}
      onMouseEnter={() => {
        pausedRef.current = true
      }}
      onMouseLeave={() => {
        pausedRef.current = false
      }}
    >
      {hasImages ? (
        <div ref={tickerRef} style={tickerStyle}>
          <StripHalf
            {...halfProps}
            halfId={`${instanceId.current}-a`}
            perfOffset={0}
            interactive
            onFrameClick={(src, origIdx) => {
              setLbSrc(src)
              setLbIdx(origIdx)
            }}
          />
          <StripHalf
            {...halfProps}
            halfId={`${instanceId.current}-b`}
            perfOffset={setBOffset}
            interactive={false}
          />
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: stripColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.18)',
            fontSize: 12,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontFamily: "'Courier New', monospace",
          }}
        >
          Add images
        </div>
      )}

      {lbSrc && (
        <Lightbox
          src={lbSrc}
          label={labels[lbIdx] || `Frame ${String(lbIdx + 1).padStart(2, '0')}`}
          url={urls[lbIdx]}
          isVin={isVin}
          onClose={() => setLbSrc(null)}
        />
      )}
    </div>
  )
}

export function FilmstripFromClients({ items = [], className = '', style, ...props }) {
  const images = items.map((item) => item.logo || '')
  const labels = items.map((item) => item.name)
  const urls = items.map((item) => item.url || '')
  const stripHeight = 24 * 2 + 120

  return (
    <FilmStrip
      images={images}
      labels={labels}
      urls={urls}
      className={className}
      style={{ width: '100%', height: stripHeight, ...style }}
      brandLabel="BROSMEDIA"
      frameWidth={180}
      frameHeight={120}
      speed={36}
      fadeWidth={100}
      {...props}
    />
  )
}
