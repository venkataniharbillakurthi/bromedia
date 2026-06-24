import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function GsapScrollRevealText({
  text,
  className = '',
  as: Tag = 'p',
  baseOpacity = 0.2,
  revealOpacity = 1,
  scrub = 1.2,
  start = 'top 88%',
  end = 'top 45%',
  stagger = 0.08,
}) {
  const containerRef = useRef(null)
  const words = text.trim().split(/\s+/)

  useGSAP(
    () => {
      const spans = containerRef.current?.querySelectorAll('[data-word]')
      if (!spans?.length) return

      gsap.fromTo(
        spans,
        { opacity: baseOpacity },
        {
          opacity: revealOpacity,
          ease: 'none',
          stagger,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end,
            scrub,
          },
        },
      )
    },
    { scope: containerRef, dependencies: [text] },
  )

  return (
    <Tag ref={containerRef} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} data-word className="inline-block">
          {word}
          {index < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}
