// Vite port of Framer Smooth 3D Button
// https://framer.com/m/SmoothThreeDButton-p2au.js@PQTHcpKX5CjFjYYJzfUR

import { useState } from 'react'
import { Link } from 'react-router-dom'
import './smooth_three_d_button.css'

const VARIANTS = {
  primary: {
    colorWhite: '#ffffff',
    colorPurple100: '#d4d4d4',
    colorPurple200: '#a3a3a3',
    colorPurple300: '#262626',
    colorPurple400: '#000000',
    colorPurple500: '#000000',
  },
  secondary: {
    colorWhite: '#000000',
    colorPurple100: '#f5f5f5',
    colorPurple200: '#e5e5e5',
    colorPurple300: '#ffffff',
    colorPurple400: '#f0f0f0',
    colorPurple500: '#737373',
  },
}

function ButtonText({ text, isHovered, isActive, isFocused, colorWhite }) {
  return (
    <span
      style={{
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        opacity: 1,
      }}
    >
      {text.split('').map((char, index) => (
        <span
          key={`${char}-${index}`}
          style={{
            display: 'inline-block',
            position: 'relative',
            marginLeft: char === ' ' ? '5px' : '0',
          }}
        >
          <span
            style={{
              position: 'absolute',
              color: colorWhite,
              left: 0,
              top: 0,
              opacity: isHovered ? 1 : 0,
              animation:
                isHovered && !isActive ? `charAppear 0.7s ease ${index * 0.03}s` : 'none',
            }}
          >
            {char}
          </span>
          <span
            style={{
              color: colorWhite,
              opacity: isHovered ? 0 : 1,
              animation: !isFocused
                ? `charAppear 1.2s ease backwards ${index * 0.03}s`
                : isHovered && !isActive
                  ? `charDisappear 0.7s ease ${index * 0.03}s`
                  : 'none',
            }}
          >
            {char}
          </span>
        </span>
      ))}
    </span>
  )
}

function ButtonArrow({ isHovered, isActive, isFocused, colorWhite, colorPurple100, colorPurple400 }) {
  return (
    <div
      style={{
        animation: isFocused
          ? 'arrow 1s cubic-bezier(0.7, -0.5, 0.3, 1.5) forwards'
          : 'resetArrow 0.8s cubic-bezier(0.7, -0.5, 0.3, 1.2) forwards',
        zIndex: 10,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '24px',
          height: '3px',
          borderRadius: '1px',
          transform: 'scale(0.9)',
          background: `linear-gradient(to bottom, ${colorWhite}, ${colorPurple100})`,
          animation: isHovered && !isActive ? 'swingArrow 1s ease-in-out infinite' : 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: 0,
            transformOrigin: 'center right',
            width: '14px',
            height: '3px',
            borderRadius: '15px',
            top: '1px',
            transform: 'rotate(44deg)',
            background: `linear-gradient(to bottom, ${colorWhite}, ${colorPurple100})`,
            animation: isHovered && !isActive ? 'rotateArrowLine 1s linear infinite' : 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            transformOrigin: 'center right',
            width: '14px',
            height: '3px',
            borderRadius: '15px',
            bottom: '1px',
            transform: 'rotate(316deg)',
            background: `linear-gradient(200deg, ${colorWhite}, ${colorPurple100})`,
            animation: isHovered && !isActive ? 'rotateArrowLine2 1s linear infinite' : 'none',
          }}
        />
      </div>
    </div>
  )
}

export default function SmoothThreeDButton({
  text = 'Button',
  fontSize = 16,
  fontFamily = 'Montserrat, sans-serif',
  fontWeight = 600,
  letterSpacing = -0.5,
  borderRadius = 40,
  buttonWidth = 220,
  buttonHeight = 64,
  rotation = 0,
  skewX = 0,
  link = '',
  openInNewTab = false,
  showSplash = true,
  variant = 'primary',
  className = '',
}) {
  const variantColors = VARIANTS[variant] || VARIANTS.primary
    const {
      colorWhite,
      colorPurple100,
      colorPurple200,
      colorPurple300,
      colorPurple400,
      colorPurple500,
  } = variantColors

  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleClick = (event) => {
    setIsFocused(true)
    setTimeout(() => setIsFocused(false), 1600)

    if (!link) {
      event.preventDefault()
      return
    }

    if (openInNewTab) {
      event.preventDefault()
      window.open(link, '_blank')
    }
  }

  const isInternalLink = link && link.startsWith('/') && !link.startsWith('//')
  const Tag = link ? (isInternalLink ? Link : 'a') : 'button'
  const linkProps = isInternalLink ? { to: link } : { href: link || undefined }

  return (
    <div className={`smooth-three-d-button ${className}`.trim()} style={{ display: 'inline-block' }}>
      <Tag
        {...linkProps}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        style={{
          borderRadius: `${borderRadius}px`,
          outline: 'none',
          cursor: 'pointer',
          fontSize: `${fontSize}px`,
          fontFamily,
          fontWeight,
          fontStyle: 'normal',
          background: 'transparent',
          letterSpacing: `${letterSpacing}px`,
          border: 0,
          position: 'relative',
          width: `${buttonWidth}px`,
          height: `${buttonHeight}px`,
          transform: `rotate(${rotation}deg) skewX(${skewX}deg)`,
          textDecoration: 'none',
          display: 'inline-block',
        }}
      >
        <div
          style={{
            borderRadius: 'inherit',
            overflow: 'hidden',
            height: '100%',
            transform: isActive ? 'translateY(1px)' : isHovered ? 'translateY(-2px)' : 'translateY(0)',
            padding: '3px',
            background: `linear-gradient(to bottom, ${colorPurple100} 0%, ${colorPurple400} 100%)`,
            position: 'relative',
            transition: 'all 0.3s ease',
          }}
        >
          <div
            style={{
              position: 'absolute',
              overflow: 'hidden',
              inset: 0,
              opacity: isHovered && !isActive ? 1 : 0,
              borderRadius: 'inherit',
              transition: 'all 0.4s ease',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '2px',
                width: '120px',
                height: '300px',
                margin: 'auto',
                background: 'linear-gradient(to right, transparent 0%, white 50%, transparent 100%)',
                animation: isHovered && !isActive ? 'smooth3d-spin 3s linear infinite' : 'none',
              }}
            />
          </div>

          <div
            style={{
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              position: 'relative',
              height: '100%',
              gap: '16px',
              borderRadius: `calc(${borderRadius}px * 0.85)`,
              transition: 'all 0.3s ease',
              background: `linear-gradient(to bottom, ${colorPurple300} 0%, ${colorPurple400} 100%)`,
            }}
          >
            <div
              style={{
                inset: 0,
                position: 'absolute',
                zIndex: 10,
                width: '80%',
                top: '45%',
                bottom: '35%',
                opacity: 0.7,
                margin: 'auto',
                background: `linear-gradient(to bottom, transparent, ${colorPurple400})`,
                filter: 'brightness(1.3) blur(5px)',
              }}
            />
            <ButtonText
              text={text}
              isHovered={isHovered}
              isActive={isActive}
              isFocused={isFocused}
              colorWhite={colorWhite}
            />
            <ButtonArrow
              isHovered={isHovered}
              isActive={isActive}
              isFocused={isFocused}
              colorWhite={colorWhite}
              colorPurple100={colorPurple100}
              colorPurple400={colorPurple400}
            />
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 221 42"
          height="42"
          width="221"
          style={{
            position: 'absolute',
            zIndex: 12,
            bottom: 0,
            left: 0,
            right: 0,
            pointerEvents: 'none',
            stroke: colorWhite,
            strokeDasharray: '150 480',
            strokeDashoffset: 150,
            animation: isFocused ? 'smooth3d-path 1.6s ease forwards 0.2s' : 'none',
          }}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeWidth="3"
            d="M182.674 2H203C211.837 2 219 9.16344 219 18V24C219 32.8366 211.837 40 203 40H18C9.16345 40 2 32.8366 2 24V18C2 9.16344 9.16344 2 18 2H47.8855"
          />
        </svg>

        {showSplash && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 342 208"
            height="208"
            width="342"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              pointerEvents: 'none',
              strokeDasharray: '60 60',
              strokeDashoffset: 60,
              transform: 'translate(-17%, -31%)',
              stroke: colorPurple300,
              animation: isActive ? 'smooth3d-splash 0.8s cubic-bezier(0.3, 0, 0, 1) forwards 0.05s' : 'none',
            }}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeWidth="3" d="M54.1054 99.7837C54.1054 99.7837 40.0984 90.7874 26.6893 97.6362C13.2802 104.485 1.5 97.6362 1.5 97.6362" />
            <path strokeLinecap="round" strokeWidth="3" d="M285.273 99.7841C285.273 99.7841 299.28 90.7879 312.689 97.6367C326.098 104.486 340.105 95.4893 340.105 95.4893" />
          </svg>
        )}
      </Tag>
    </div>
  )
}
