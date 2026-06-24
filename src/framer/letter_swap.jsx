// Vite port inspired by Framer Marketplace Letter Swap (FramerHub.io)
// https://www.framer.com/marketplace/components/letter-swap/

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function getStaggerOrder(length, staggerFrom) {
  const order = Array.from({ length }, (_, index) => index)

  if (staggerFrom === 'last') return order.reverse()
  if (staggerFrom === 'center') {
    const centered = []
    const middle = Math.floor((length - 1) / 2)
    centered.push(middle)

    for (let offset = 1; centered.length < length; offset += 1) {
      const right = middle + offset
      const left = middle - offset
      if (right < length) centered.push(right)
      if (left >= 0) centered.push(left)
    }

    return centered
  }

  return order
}

function SwapLetter({
  char,
  isActive,
  delay,
  direction,
  color,
  hoverColor,
  springDuration,
}) {
  const displayChar = char === ' ' ? '\u00A0' : char
  const offset = direction === 'down' ? '50%' : '-50%'

  return (
    <span
      className="inline-block overflow-hidden align-top"
      style={{ height: '1em', lineHeight: '1em' }}
      aria-hidden={char === ' '}
    >
      <motion.span
        className="inline-flex flex-col"
        initial={false}
        animate={{ y: isActive ? offset : '0%' }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 22,
          mass: 0.55,
          duration: springDuration,
          delay: delay / 1000,
        }}
      >
        <span className="block h-[1em]" style={{ color }}>
          {displayChar}
        </span>
        <span className="block h-[1em]" style={{ color: hoverColor }}>
          {displayChar}
        </span>
      </motion.span>
    </span>
  )
}

export default function LetterSwap({
  text = '',
  as: Tag = 'span',
  variant = 'forward',
  direction = 'up',
  staggerFrom = 'first',
  staggerDuration = 28,
  springDuration = 0.45,
  color = 'currentColor',
  hoverColor,
  className = '',
  style,
  onClick,
}) {
  const [isHovered, setIsHovered] = useState(false)
  const letters = useMemo(() => text.split(''), [text])
  const staggerOrder = useMemo(
    () => getStaggerOrder(letters.length, staggerFrom),
    [letters.length, staggerFrom],
  )
  const resolvedHoverColor = hoverColor ?? color
  const isActive = isHovered

  const activate = () => setIsHovered(true)
  const deactivate = () => setIsHovered(false)

  return (
    <Tag
      className={`relative inline-block ${className}`}
      style={style}
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onFocus={activate}
      onBlur={deactivate}
      onTouchStart={activate}
      onTouchEnd={variant === 'pingPong' ? deactivate : undefined}
      onTouchCancel={variant === 'pingPong' ? deactivate : undefined}
      onClick={onClick}
    >
      <span className="sr-only">{text}</span>
      <span className="inline-flex" aria-hidden="true">
        {letters.map((char, index) => (
          <SwapLetter
            key={`${char}-${index}`}
            char={char}
            isActive={isActive}
            delay={staggerOrder.indexOf(index) * staggerDuration}
            direction={direction}
            color={color}
            hoverColor={resolvedHoverColor}
            springDuration={springDuration}
          />
        ))}
      </span>
    </Tag>
  )
}

export function LetterSwapLink({
  to,
  href,
  text,
  className = '',
  active = false,
  color,
  hoverColor,
  onClick,
  target,
  rel,
  ...swapProps
}) {
  const resolvedColor = color ?? (active ? '#1e45ff' : 'currentColor')
  const resolvedHoverColor = hoverColor ?? '#1e45ff'

  const swap = (
    <LetterSwap
      text={text}
      as="span"
      color={resolvedColor}
      hoverColor={resolvedHoverColor}
      variant="forward"
      direction="up"
      staggerFrom="first"
      {...swapProps}
    />
  )

  if (to) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {swap}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        target={target}
        rel={rel}
      >
        {swap}
      </a>
    )
  }

  return <span className={className}>{swap}</span>
}
