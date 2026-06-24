import { motion } from 'framer-motion'
import SmoothThreeDButton from '../framer/smooth_three_d_button.jsx'
import { finalCtaButtons, finalCtaIntro, getWhatsAppHref } from '../data/finalCta'

const spring = { type: 'spring', stiffness: 80, damping: 22, mass: 0.8 }
const viewport = { once: true, margin: '-80px' }

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring,
  },
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
}

export default function FinalCta() {
  const whatsappHref = getWhatsAppHref(finalCtaButtons.whatsapp)

  return (
    <section className="bg-gradient-to-br from-secondary via-secondary to-accent/20 font-sans">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-8 lg:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            {finalCtaIntro.label}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl"
          >
            {finalCtaIntro.headline}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-primary/75 sm:text-lg"
          >
            {finalCtaIntro.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-5 sm:mt-12 sm:flex-row sm:gap-6"
          >
            <SmoothThreeDButton
              text={finalCtaButtons.discovery.label}
              link={finalCtaButtons.discovery.href}
              variant="primary"
              buttonWidth={300}
              buttonHeight={64}
            />
            <SmoothThreeDButton
              text={finalCtaButtons.whatsapp.label}
              link={whatsappHref}
              openInNewTab={Boolean(finalCtaButtons.whatsapp.number)}
              variant="secondary"
              buttonWidth={220}
              buttonHeight={64}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
