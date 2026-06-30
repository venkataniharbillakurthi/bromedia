// Vite port of Framer Eye Follow Button
// https://framer.com/m/Eye-Follow-Button-yMBK.js@UiZdcXLPs68fBczUfQ27

import { Link } from 'react-router-dom'
import FollowEyes from './follow_eyes.jsx'

const buttonShadow =
  '0.4px 0.4px 0.56px -0.31px rgba(0,0,0,0.07), 1.2px 1.2px 1.7px -0.63px rgba(0,0,0,0.08), 3.2px 3.2px 4.5px -0.94px rgba(0,0,0,0.1), 10px 10px 14px -1.25px rgba(0,0,0,0.19)'

export default function EyeFollowButton({
  text = 'Get in touch',
  link = '',
  to = '',
  onClick,
  openInNewTab = false,
  buttonColor = '#000000',
  hoverColor = '#1e45ff',
  textColor = '#ffffff',
  pupilColor = '#000000',
  eyeColor = '#ffffff',
  eyeCount = 'two',
  eyeSizePx = 40,
  pupilSizePx = 12,
  eyeGapPx = 4,
  speed = 100,
  range = 90,
  blinking = false,
  blinkInterval = 2000,
  padding = '6px 6px 6px 20px',
  borderRadius = '30px',
  className = '',
}) {
  const sharedStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding,
    backgroundColor: buttonColor,
    borderRadius,
    boxShadow: buttonShadow,
    textDecoration: 'none',
    color: textColor,
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700,
    fontSize: 16,
    letterSpacing: '-0.02em',
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.25s ease',
  }

  const content = (
    <>
      <span>{text}</span>
      <FollowEyes
        eyeColor={eyeColor}
        pupilColor={pupilColor}
        eyeSize={eyeSizePx}
        pupilSize={pupilSizePx}
        eyeSpacing={eyeGapPx}
        trackingSpeed={speed}
        trackingRange={range}
        eyeCount={eyeCount}
        enableBlinking={blinking}
        blinkInterval={blinkInterval}
      />
    </>
  )

  const hoverHandlers = {
    onMouseEnter: (e) => {
      e.currentTarget.style.backgroundColor = hoverColor
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.backgroundColor = buttonColor
    },
  }

  if (to) {
    return (
      <Link to={to} className={className} style={sharedStyle} {...hoverHandlers}>
        {content}
      </Link>
    )
  }

  if (link) {
    return (
      <a
        href={link}
        className={className}
        style={sharedStyle}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        {...hoverHandlers}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={className}
      style={sharedStyle}
      onClick={onClick}
      {...hoverHandlers}
    >
      {content}
    </button>
  )
}
