import { motion } from 'framer-motion'
import { TestimonialReelFromData } from '../framer/testimonial_reel.jsx'
import { testimonials, testimonialsIntro } from '../data/testimonials'

const viewport = { once: true, margin: '-80px' }

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white font-sans">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
          className="px-1 sm:px-2 lg:px-4"
        >
          <TestimonialReelFromData
            items={testimonials}
            sectionLabel={testimonialsIntro.label.toUpperCase()}
            sectionIntroText={testimonialsIntro.description}
            cardBackground="#f4f4f5"
            labelColor="rgb(134, 134, 139)"
            introColor="rgb(81, 81, 84)"
            headlineColor="#000000"
            statementColor="#515154"
            titleColor="rgb(134, 134, 139)"
            quoteIconColor="#a1a1a6"
            arrowButtonColor="#ffffff"
            arrowIconColor="#6e6e73"
            hoverArrowButtonColor="#e8e8ed"
            hoverArrowIconColor="#000000"
          />
        </motion.div>
      </div>
    </section>
  )
}
