import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import TiltCard from '../framer/tilt_card.jsx'
import { clientsTeaser, clientsTeaserIntro } from '../data/clientsTeaser'
import { routes } from '../data/navigation'

const spring = { type: 'spring', stiffness: 80, damping: 22, mass: 0.8 }
const titleSpring = { type: 'spring', stiffness: 140, damping: 20, mass: 0.7 }
const viewport = { once: true, margin: '-80px' }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring,
  },
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

function ClientLogoCard({ name, url, logo, index }) {
  const [hasError, setHasError] = useState(false)
  const hasLogo = Boolean(logo) && !hasError

  const card = (
    <div className="flex flex-col gap-2">
      <div className="h-28 sm:h-32">
        <TiltCard
          image={hasLogo ? { src: logo, alt: name } : undefined}
          objectFit="contain"
          contentPadding={6}
          borderRadius={16}
          backgroundColor="#FFFFFF"
          tiltFactor={10}
          hoverScale={1.03}
          shadowIntensity={0.22}
          onImageError={() => setHasError(true)}
        >
          {!hasLogo && (
            <span className="px-2 text-center text-xs font-semibold leading-snug text-primary/70 sm:text-sm">
              {name}
            </span>
          )}
        </TiltCard>
      </div>

      {hasLogo && (
        <motion.p
          className="truncate px-0.5 text-center text-[0.68rem] font-semibold text-primary/55 sm:text-[0.72rem]"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ ...titleSpring, delay: index * 0.04 }}
        >
          {name}
        </motion.p>
      )}
    </div>
  )

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label={`Visit ${name}`}
      >
        {card}
      </a>
    )
  }

  return card
}

function ArrowRight({ className = '' }) {
  return (
    <svg
      className={`h-4 w-4 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0-4 4m4-4H3" />
    </svg>
  )
}

export default function ClientsTeaser() {
  return (
    <section id="clients" className="border-t border-accent/10 bg-accent/[0.03] font-sans">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/70"
          >
            {clientsTeaserIntro.label}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            {clientsTeaserIntro.headline}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base leading-relaxed text-primary/70 sm:text-lg"
          >
            {clientsTeaserIntro.description}
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-16 lg:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          {clientsTeaser.map((client, index) => (
            <motion.div key={client.name} variants={fadeUp}>
              <ClientLogoCard
                name={client.name}
                url={client.url}
                logo={client.logo}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 lg:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
        >
          <Link
            to={routes.ourWork}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-accent sm:text-base"
          >
            See All Our Work
            <ArrowRight className="transition group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
