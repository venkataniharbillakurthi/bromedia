import { motion } from 'framer-motion'
import FinalCta from '../components/FinalCta'
import { contactDetails, contactIntro } from '../data/contact'

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

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-accent/5 via-white to-white font-sans pt-[calc(var(--navbar-height)+2rem)]">
        <div className="mx-auto max-w-4xl px-6 py-12 text-center lg:px-8 lg:py-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/80"
            >
              {contactIntro.label}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl"
            >
              {contactIntro.headline}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-primary/70 sm:text-lg"
            >
              {contactIntro.description}
            </motion.p>
          </motion.div>

          <motion.ul
            className="mt-12 grid gap-4 sm:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {contactDetails.map((item) => (
              <motion.li
                key={item.label}
                variants={fadeUp}
                className="rounded-2xl border border-accent/10 bg-white px-5 py-6 shadow-[0_8px_30px_rgba(30,69,255,0.06)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent/70">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-2 block text-sm font-semibold text-primary transition hover:text-accent sm:text-base"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-2 text-sm font-semibold text-primary sm:text-base">{item.value}</p>
                )}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
