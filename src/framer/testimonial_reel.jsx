// Vite port of Framer Testimonial Reel
// https://framer.com/m/Testimonial-Reel-QFefCG.js@C7sE1WqTGafx2T156LbE

import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const spring = { type: 'spring', bounce: 0.2, duration: 0.4 }

function QuoteIcon({ color = 'rgb(161, 161, 166)' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10.125 13.5H3.75C3.336 13.5 3 13.164 3 12.75V6.75C3 6.336 3.336 6 3.75 6H9.375C9.789 6 10.125 6.336 10.125 6.75Z"
        fill={color}
        fillOpacity={0}
      />
      <path
        d="M20.125 13.5H13.75C13.336 13.5 13 13.164 13 12.75V6.75C13 6.336 13.336 6 13.75 6H19.375C19.789 6 20.125 6.336 20.125 6.75Z"
        fill={color}
        fillOpacity={0}
      />
      <path
        d="M10.125 13.5H3.75C3.336 13.5 3 13.164 3 12.75V6.75C3 6.336 3.336 6 3.75 6H9.375C9.789 6 10.125 6.336 10.125 6.75V15C10.125 17.071 8.446 18.75 6.375 18.75"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.125 13.5H13.75C13.336 13.5 13 13.164 13 12.75V6.75C13 6.336 13.336 6 13.75 6H19.375C19.789 6 20.125 6.336 20.125 6.75V15C20.125 17.071 18.446 18.75 16.375 18.75"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowIcon({ direction = 'right' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {direction === 'left' ? (
        <path
          d="M15 18L9 12L15 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M9 18L15 12L9 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

function TestimonialArrow({
  direction = 'right',
  onClick,
  arrowButtonColor = 'rgb(232, 232, 237)',
  arrowIconColor = 'rgb(110, 110, 115)',
  hoverArrowButtonColor = 'rgb(210, 210, 215)',
  hoverArrowIconColor = 'rgb(29, 29, 31)',
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={direction === 'left' ? 'Previous testimonial' : 'Next testimonial'}
      animate={{
        backgroundColor: hovered ? hoverArrowButtonColor : arrowButtonColor,
        color: hovered ? hoverArrowIconColor : arrowIconColor,
      }}
      transition={spring}
      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-[20px] border-0"
    >
      <ArrowIcon direction={direction} />
    </motion.button>
  )
}

function Navigation({
  onPrev,
  onNext,
  arrowButtonColor,
  arrowIconColor,
  hoverArrowButtonColor,
  hoverArrowIconColor,
  className = '',
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <TestimonialArrow
        direction="left"
        onClick={onPrev}
        arrowButtonColor={arrowButtonColor}
        arrowIconColor={arrowIconColor}
        hoverArrowButtonColor={hoverArrowButtonColor}
        hoverArrowIconColor={hoverArrowIconColor}
      />
      <TestimonialArrow
        direction="right"
        onClick={onNext}
        arrowButtonColor={arrowButtonColor}
        arrowIconColor={arrowIconColor}
        hoverArrowButtonColor={hoverArrowButtonColor}
        hoverArrowIconColor={hoverArrowIconColor}
      />
    </div>
  )
}

function TestimonialCard({
  headline,
  statement,
  customerTitle,
  customerImage,
  customerAlt = '',
  quoteIconColor = 'rgb(161, 161, 166)',
  headlineColor = 'rgb(29, 29, 31)',
  statementColor = 'rgb(81, 81, 84)',
  titleColor = 'rgb(134, 134, 139)',
  isPhone = false,
}) {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-6">
        <QuoteIcon color={quoteIconColor} />
        <p
          className="text-balance font-semibold tracking-[-0.03em]"
          style={{
            color: headlineColor,
            fontSize: isPhone ? '28px' : 'clamp(32px, 4vw, 48px)',
            lineHeight: 1.15,
          }}
        >
          {headline}
        </p>
        <p
          className="text-balance tracking-[-0.01em]"
          style={{
            color: statementColor,
            fontSize: isPhone ? '16px' : '18px',
            lineHeight: 1.6,
          }}
        >
          {statement}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        {customerImage ? (
          <img
            src={customerImage}
            alt={customerAlt}
            className="h-12 w-12 shrink-0 rounded-3xl object-cover"
            loading="lazy"
          />
        ) : null}
        <p className="leading-[1.5em]" style={{ color: titleColor, fontSize: isPhone ? '14px' : '16px' }}>
          {customerTitle}
        </p>
      </div>
    </div>
  )
}

export default function TestimonialReel({
  sectionLabel = 'STORIES',
  sectionIntroText = '',
  items = [],
  reelBGColor = 'transparent',
  cardBackground = '#f4f4f5',
  quoteIconColor = 'rgb(161, 161, 166)',
  headlineColor = '#000000',
  statementColor = 'rgb(81, 81, 84)',
  titleColor = 'rgb(134, 134, 139)',
  labelColor = 'rgb(134, 134, 139)',
  introColor = 'rgb(81, 81, 84)',
  arrowButtonColor = 'rgb(232, 232, 237)',
  arrowIconColor = 'rgb(110, 110, 115)',
  hoverArrowButtonColor = 'rgb(210, 210, 215)',
  hoverArrowIconColor = '#000000',
  className = '',
  style,
}) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const count = items.length

  const goTo = useCallback(
    (nextIndex, nextDirection) => {
      if (count === 0) return
      setDirection(nextDirection)
      setIndex(((nextIndex % count) + count) % count)
    },
    [count],
  )

  const goPrev = useCallback(() => goTo(index - 1, -1), [goTo, index])
  const goNext = useCallback(() => goTo(index + 1, 1), [goTo, index])

  const current = items[index]
  const navProps = {
    onPrev: goPrev,
    onNext: goNext,
    arrowButtonColor,
    arrowIconColor,
    hoverArrowButtonColor,
    hoverArrowIconColor,
  }

  if (!current) {
    return null
  }

  const cardShell = (children) => (
    <div
      className="overflow-hidden rounded-[28px] px-6 py-8 sm:px-8 sm:py-10 lg:rounded-[32px] lg:px-12 lg:py-14"
      style={{ backgroundColor: cardBackground }}
    >
      {children}
    </div>
  )

  return (
    <div
      className={`font-sans ${className}`}
      style={{ backgroundColor: reelBGColor, ...style }}
    >
      {cardShell(
        <>
      {/* Desktop: sidebar + card row */}
      <div className="hidden items-stretch gap-12 lg:flex">
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div className="flex flex-col gap-6">
            <p
              className="text-sm font-bold uppercase tracking-[0.06em]"
              style={{ color: labelColor }}
            >
              {sectionLabel}
            </p>
            <p
              className="max-w-md text-balance text-2xl tracking-[-0.025em]"
              style={{ color: introColor, lineHeight: 1.28 }}
            >
              {sectionIntroText}
            </p>
          </div>
          <Navigation {...navProps} className="mt-10" />
        </div>

        <div className="min-w-0 flex-1">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={spring}
            >
              <TestimonialCard
                {...current}
                quoteIconColor={quoteIconColor}
                headlineColor={headlineColor}
                statementColor={statementColor}
                titleColor={titleColor}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Tablet: intro row + full-width card */}
      <div className="hidden flex-col gap-10 md:flex lg:hidden">
        <div className="flex items-end justify-between gap-8">
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <p
              className="text-sm font-bold uppercase tracking-[0.06em]"
              style={{ color: labelColor }}
            >
              {sectionLabel}
            </p>
            <p
              className="text-balance text-xl tracking-[-0.02em]"
              style={{ color: introColor, lineHeight: 1.35 }}
            >
              {sectionIntroText}
            </p>
          </div>
          <Navigation {...navProps} className="shrink-0" />
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 32 : -32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -32 : 32 }}
            transition={spring}
          >
            <TestimonialCard
              {...current}
              quoteIconColor={quoteIconColor}
              headlineColor={headlineColor}
              statementColor={statementColor}
              titleColor={titleColor}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Phone: intro + card + nav below */}
      <div className="flex flex-col gap-8 md:hidden">
        <div className="flex flex-col gap-5">
          <p
            className="text-sm font-bold uppercase tracking-[0.06em]"
            style={{ color: labelColor }}
          >
            {sectionLabel}
          </p>
          <p
            className="text-balance text-lg tracking-[-0.02em]"
            style={{ color: introColor, lineHeight: 1.35 }}
          >
            {sectionIntroText}
          </p>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={spring}
          >
            <TestimonialCard
              {...current}
              quoteIconColor={quoteIconColor}
              headlineColor={headlineColor}
              statementColor={statementColor}
              titleColor={titleColor}
              isPhone
            />
          </motion.div>
        </AnimatePresence>

        <Navigation {...navProps} />
      </div>
        </>,
      )}
    </div>
  )
}

function headlineFromQuote(quote = '') {
  const match = quote.match(/^[^.!?]+[.!?]/)
  return match ? match[0].trim() : quote
}

export function TestimonialReelFromData({
  items = [],
  sectionLabel,
  sectionIntroText,
  ...props
}) {
  const reelItems = items.map((item) => ({
    headline: item.headline || headlineFromQuote(item.quote),
    statement: item.quote,
    customerTitle: item.designation ? `${item.name}, ${item.designation}` : item.name,
    customerImage: item.image?.src || '',
    customerAlt: item.image?.alt || item.name,
  }))

  return (
    <TestimonialReel
      items={reelItems}
      sectionLabel={sectionLabel}
      sectionIntroText={sectionIntroText}
      {...props}
    />
  )
}
