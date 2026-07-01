import LetterSwap from '../framer/letter_swap.jsx'
import { industriesStrip, industriesStripIntro } from '../data/industriesStrip'

function Divider() {
  return (
    <span className="mx-3 shrink-0 text-primary/20 sm:mx-4" aria-hidden="true">
      |
    </span>
  )
}

function IndustryItem({ industry, className = '' }) {
  return (
    <LetterSwap
      text={industry}
      className={`font-medium ${className}`}
      color="rgba(0,0,0,0.75)"
      hoverColor="#1e45ff"
      variant="pingPong"
      direction="up"
      staggerFrom="first"
      staggerDuration={22}
    />
  )
}

export default function IndustriesStrip() {
  return (
    <section
      id="industries-strip"
      className="bg-white font-sans"
      aria-label="Industries we serve"
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="flex justify-center px-2">
          <LetterSwap
            text={industriesStripIntro.label.toUpperCase()}
            className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] sm:text-xs sm:tracking-[0.2em]"
            color="rgba(30,69,255,0.75)"
            hoverColor="#1e45ff"
            variant="pingPong"
            direction="up"
            staggerFrom="center"
            staggerDuration={22}
          />
        </div>

        {/* Mobile: wrapped 2-column grid */}
        <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:hidden">
          {industriesStrip.map((industry) => (
            <li
              key={industry}
              className={`flex min-h-[2.75rem] items-center justify-center rounded-xl border border-primary/10 bg-primary/[0.03] px-2 py-2.5 text-center ${
                industry.length > 16 ? 'col-span-2' : ''
              }`}
            >
              <IndustryItem industry={industry} className="text-[0.68rem] leading-snug" />
            </li>
          ))}
        </ul>

        {/* Tablet / desktop: horizontal strip */}
        <div className="relative mt-5 hidden sm:block">
          <div className="overflow-x-auto [-ms-overflow-style:none] scrollbar-none lg:overflow-visible">
            <ul className="flex w-max min-w-full items-center justify-center px-2 lg:w-full lg:px-0">
              {industriesStrip.map((industry, index) => (
                <li key={industry} className="flex items-center">
                  {index > 0 && <Divider />}
                  <IndustryItem industry={industry} className="whitespace-nowrap text-sm lg:text-base" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
