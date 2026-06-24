import LetterSwap from '../framer/letter_swap.jsx'
import { industriesStrip, industriesStripIntro } from '../data/industriesStrip'

function Divider() {
  return (
    <span className="mx-3 shrink-0 text-accent/40 sm:mx-4" aria-hidden="true">
      |
    </span>
  )
}

export default function IndustriesStrip() {
  return (
    <section
      id="industries-strip"
      className="border-y border-accent/15 bg-gradient-to-r from-primary via-[#0a1638] to-primary font-sans"
      aria-label="Industries we serve"
    >
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
        <div className="flex justify-center">
          <LetterSwap
            text={industriesStripIntro.label.toUpperCase()}
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            color="rgba(223,255,0,0.8)"
            hoverColor="#dfff00"
            variant="pingPong"
            direction="up"
            staggerFrom="center"
          />
        </div>

        <div className="mt-5 overflow-x-auto [-ms-overflow-style:none] scrollbar-none">
          <ul className="flex w-max min-w-full items-center justify-center px-2 sm:px-0">
            {industriesStrip.map((industry, index) => (
              <li key={industry} className="flex items-center">
                {index > 0 && <Divider />}
                <LetterSwap
                  text={industry}
                  className="whitespace-nowrap text-sm font-medium sm:text-base"
                  color="rgba(255,255,255,0.85)"
                  hoverColor="#dfff00"
                  variant="pingPong"
                  direction="up"
                  staggerFrom="first"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
