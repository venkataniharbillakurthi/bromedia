import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ClientsCarouselFromData } from '../framer/clients_carousel.jsx'
import { clientsTeaser, clientsTeaserIntro } from '../data/clientsTeaser'
import { routes } from '../data/navigation'

const spring = { type: 'spring', stiffness: 80, damping: 22, mass: 0.8 }
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
    <section id="clients" className="bg-black font-sans text-white">
      <div className="relative mx-auto max-w-7xl px-6 pt-16 lg:px-8 lg:pt-24">
      

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="relative z-10 max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/70"
          >
            {clientsTeaserIntro.label}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            {clientsTeaserIntro.headline}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg"
          >
            {clientsTeaserIntro.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 md:hidden">
            <Link
              to={routes.ourWork}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-accent"
            >
              See All Our Work
              <ArrowRight className="transition group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ ...spring, delay: 0.25 }}
          className="absolute right-6 top-1/2 z-[5] hidden -translate-y-1/2 md:block lg:right-8"
        >
          <Link
            to={routes.ourWork}
            className="group inline-flex items-center gap-3"
          >
            <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-white/40 transition group-hover:text-accent lg:text-base">
              See All Our Work
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/50 transition group-hover:border-accent/30 group-hover:bg-accent/10 group-hover:text-accent">
              <ArrowRight className="transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="mt-10 w-full pb-8 lg:mt-14 lg:pb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={spring}
      >
        <ClientsCarouselFromData
          items={clientsTeaser}
          shellBackground="#141414"
          shellBorderColor="rgba(255, 255, 255, 0.1)"
        />
      </motion.div>
    </section>
  )
}
