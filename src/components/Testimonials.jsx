import { motion } from 'framer-motion'
import { TestimonialReelFromData } from '../framer/testimonial_reel.jsx'
import { testimonials, testimonialsIntro } from '../data/testimonials'

const viewport = { once: true, margin: '-80px' }

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-black font-sans">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-4 sm:px-6 sm:pb-14 sm:pt-6 lg:px-8 lg:pb-16 lg:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
          className="mx-auto max-w-5xl px-1 sm:px-2"
        >
          <TestimonialReelFromData
            items={testimonials}
            sectionLabel={testimonialsIntro.label.toUpperCase()}
            sectionIntroText={testimonialsIntro.description}
            compact
            cardBackground="#141414"
            labelColor="rgba(223, 255, 0, 0.85)"
            introColor="rgba(255, 255, 255, 0.65)"
            headlineColor="#ffffff"
            statementColor="rgba(255, 255, 255, 0.55)"
            titleColor="rgba(255, 255, 255, 0.45)"
            quoteIconColor="rgba(255, 255, 255, 0.35)"
            arrowButtonColor="rgba(255, 255, 255, 0.1)"
            arrowIconColor="rgba(255, 255, 255, 0.55)"
            hoverArrowButtonColor="#dfff00"
            hoverArrowIconColor="#ffffff"
          />
        </motion.div>
      </div>
    </section>
  )
}
