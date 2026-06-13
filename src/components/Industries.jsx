import ChevronIcon from './ChevronIcon'
import { industriesIntro, industriesTeaser } from '../data/industries'

const INDUSTRIES_BG =
  'https://res.cloudinary.com/dvruqkpqk/image/upload/v1781269613/ChatGPT_Image_Jun_12_2026_06_36_39_PM_tcfzvz.png'

export default function Industries() {
  return (
    <section id="industries" className="bg-white font-sans">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-3xl border border-primary/10 lg:grid lg:grid-cols-[2fr_2fr]">
          {/* Left panel — wider, with background image */}
          <div className="relative min-h-[320px] px-8 py-10 sm:px-10 sm:py-12 lg:min-h-[480px] lg:py-14">
            <img
              src={INDUSTRIES_BG}
              alt=""
              className="absolute inset-0 h-full w-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-white/10" />
            <div className="relative z-10 flex h-full flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                {industriesIntro.label}
              </p>
              <h2 className="mt-5 max-w-md text-2xl font-bold leading-tight text-primary sm:text-3xl lg:text-4xl">
                {industriesIntro.headline}
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary/70 sm:text-base">
                Sector-specific branding and marketing — built around how your audience actually buys.
              </p>
              <a
                href="#industries"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-secondary py-2.5 pl-5 pr-2 text-sm font-semibold text-primary transition hover:brightness-110"
              >
                View All Industries
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary">
                  <ChevronIcon className="h-3.5 w-3.5" />
                </span>
              </a>
            </div>
          </div>

          {/* Right list — narrower */}
          <div className="divide-y divide-primary/10 bg-white">
            {industriesTeaser.map((industry, index) => (
              <div
                key={industry.id}
                className="group flex items-center gap-3 px-4 py-3.5 transition hover:bg-secondary/[0.04] sm:gap-4 sm:px-5 sm:py-4"
              >
                <span className="w-6 shrink-0 text-xs font-bold text-secondary sm:text-sm">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-primary sm:text-base">{industry.name}</p>
                  <p className="mt-0.5 truncate text-xs text-primary/50 sm:text-sm">{industry.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
