import { motion } from 'framer-motion'
import Testimonial3D from '../framer/testimonial_3d.jsx'
import { testimonials, testimonialsIntro } from '../data/testimonials'

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
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="border-t border-accent/10 bg-white font-sans">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/70"
          >
            {testimonialsIntro.label}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            {testimonialsIntro.headline}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base leading-relaxed text-primary/70 sm:text-lg"
          >
            {testimonialsIntro.description}
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 lg:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
        >
          <Testimonial3D
            testimonials={testimonials}
            autoplay
            autoplayInterval={5000}
            backgroundColor="transparent"
            nameColor="#000000"
            designationColor="#1e45ff"
            quoteColor="#374151"
            arrowBackground="#000000"
            arrowForeground="#ffffff"
            arrowHoverBackground="#1e45ff"
            nameFont={{
              fontSize: '24px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: '1.2em',
              fontFamily: 'Montserrat, sans-serif',
            }}
            designationFont={{
              fontSize: '16px',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              lineHeight: '1.3em',
              fontFamily: 'Montserrat, sans-serif',
            }}
            quoteFont={{
              fontSize: '17px',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              lineHeight: '1.75em',
              fontFamily: 'Montserrat, sans-serif',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
