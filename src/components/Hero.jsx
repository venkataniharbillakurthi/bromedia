import ChevronIcon from './ChevronIcon'

const HERO_BG = '/images/hero-bg.png'

const barHeights = [28, 42, 36, 52, 44, 38, 48, 34, 40, 30, 46, 32]

const socialLinks = [
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: '#',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden font-sans">
      <img
        src={HERO_BG}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/50 to-primary/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-primary/10" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 pt-32 pb-12 lg:px-8 lg:pt-56">
        <div className="flex flex-1 flex-col justify-between gap-12 lg:flex-row lg:items-end">
          <div className="max-w-xl lg:max-w-2xl">
            <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
              We build brands.
              <br />
              We drive growth.
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              Brosmedia is a branding and marketing agency based in Hyderabad. We help
              businesses across India build a strong identity, show up consistently
              online, and turn attention into results — through sharp design, smart
              strategy, and focused execution.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-secondary py-2 pl-5 pr-2 text-sm font-semibold text-primary transition hover:brightness-110 sm:py-2.5 sm:pl-6"
              >
                Start a Project
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-primary">
                  <ChevronIcon className="h-4 w-4" />
                </span>
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 sm:py-3"
              >
                See Our Work
              </a>
            </div>

            <div className="mt-14 hidden sm:block">
              <p className="text-sm font-medium text-white">Follow Us</p>
              <div className="mt-4 flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:h-14 sm:w-14"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full max-w-sm self-end lg:max-w-md lg:-translate-x-14 lg:translate-y-10">
            <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl shadow-black/20 backdrop-blur-2xl">
              <div className="bg-primary/80 px-5 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-xs">
                  Monitor, Analyze and Optimize Campaign
                </p>
              </div>

              <div className="space-y-5 bg-white/30 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-white">Leads Generated</p>
                  <div className="flex -space-x-2">
                    {[
                      'https://i.pravatar.cc/80?img=12',
                      'https://i.pravatar.cc/80?img=32',
                      'https://i.pravatar.cc/80?img=45',
                    ].map((src) => (
                      <img
                        key={src}
                        src={src}
                        alt=""
                        className="h-8 w-8 rounded-full border-2 border-white object-cover sm:h-9 sm:w-9"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-secondary sm:text-5xl">48%</span>
                  <span className="text-sm text-white/90">(Growth)</span>
                </div>

                <div className="flex items-end justify-between gap-1.5 pt-2">
                  {barHeights.map((height, index) => (
                    <div
                      key={index}
                      className={`w-full max-w-[18px] rounded-sm ${
                        index < 6 ? 'bg-secondary' : 'bg-primary/40'
                      }`}
                      style={{ height: `${height}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:hidden">
          <p className="text-sm font-medium text-white/70">Follow Us</p>
          <div className="mt-3 flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
