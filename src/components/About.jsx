import ClientMarquee from './ClientMarquee'

const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80'

function AboutIcon() {
  return (
    <svg
      className="h-6 w-6 shrink-0 text-primary"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <g clipPath="url(#about-us-icon-clip)">
        <path
          d="M18.0001 7.16C17.9401 7.15 17.8701 7.15 17.8101 7.16C16.4301 7.11 15.3301 5.98 15.3301 4.58C15.3301 3.15 16.4801 2 17.9101 2C19.3401 2 20.4901 3.16 20.4901 4.58C20.4801 5.98 19.3801 7.11 18.0001 7.16Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.9699 14.4402C18.3399 14.6702 19.8499 14.4302 20.9099 13.7202C22.3199 12.7802 22.3199 11.2402 20.9099 10.3002C19.8399 9.59016 18.3099 9.35016 16.9399 9.59016"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.96998 7.16C6.02998 7.15 6.09998 7.15 6.15998 7.16C7.53998 7.11 8.63998 5.98 8.63998 4.58C8.63998 3.15 7.48998 2 6.05998 2C4.62998 2 3.47998 3.16 3.47998 4.58C3.48998 5.98 4.58998 7.11 5.96998 7.16Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.99994 14.4402C5.62994 14.6702 4.11994 14.4302 3.05994 13.7202C1.64994 12.7802 1.64994 11.2402 3.05994 10.3002C4.12994 9.59016 5.65994 9.35016 7.02994 9.59016"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.0001 14.6297C11.9401 14.6197 11.8701 14.6197 11.8101 14.6297C10.4301 14.5797 9.33008 13.4497 9.33008 12.0497C9.33008 10.6197 10.4801 9.46973 11.9101 9.46973C13.3401 9.46973 14.4901 10.6297 14.4901 12.0497C14.4801 13.4497 13.3801 14.5897 12.0001 14.6297Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.09021 17.7794C7.68021 18.7194 7.68021 20.2594 9.09021 21.1994C10.6902 22.2694 13.3102 22.2694 14.9102 21.1994C16.3202 20.2594 16.3202 18.7194 14.9102 17.7794C13.3202 16.7194 10.6902 16.7194 9.09021 17.7794Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="about-us-icon-clip">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

function ArrowUpRight() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M7 7h10v10" />
    </svg>
  )
}

export default function About() {
  return (
    <section id="about" className="bg-white font-sans">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-0 lg:px-8 lg:pt-24 lg:pb-0">
        {/* Top: 30% stat | 70% copy */}
        <div className="grid gap-10 border-b border-primary/10 pb-12 lg:grid-cols-[3fr_7fr] lg:gap-12 lg:items-start">
          <div className="pl-4 sm:pl-8 lg:pl-12 lg:border-r lg:border-primary/10 lg:pr-12">
            <div className="flex items-center gap-2.5">
              <AboutIcon />
              <span className="text-sm font-medium text-primary/70">About Us</span>
            </div>
            <p className="mt-8 text-7xl font-bold tracking-tight text-primary sm:text-8xl lg:text-9xl">
              10+
            </p>
            <p className="mt-2 text-lg font-semibold text-primary/60 sm:text-xl">Brands Built</p>
          </div>

          <div>
            <p className="text-base leading-relaxed text-primary/70 sm:text-lg lg:text-xl lg:leading-relaxed">
              Brosmedia is built for businesses that are serious about their brand — and
              serious about growth. We are a focused agency based in Hyderabad, working
              across branding, digital marketing, creative production, and paid media.
            </p>
            <p className="mt-5 text-base leading-relaxed text-primary/70 sm:text-lg lg:text-xl lg:leading-relaxed">
              We do not do generic. Every brand we work with gets a strategy built around
              their industry, their audience, and their goals — and a team that stays
              hands-on from start to finish.
            </p>
          </div>
        </div>

        {/* Middle: image + stat card */}
        <div className="grid gap-8 pt-12 pb-0 lg:grid-cols-2 lg:gap-10 lg:items-start">
          <div className="overflow-hidden rounded-3xl">
            <img
              src={ABOUT_IMAGE}
              alt="Brosmedia team collaborating"
              className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto lg:min-h-[420px]"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-primary/5 bg-white p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:p-10">
              <p className="text-5xl font-bold tracking-tight text-primary sm:text-6xl">98%</p>
              <p className="mt-4 text-sm leading-relaxed text-primary/60 sm:text-base">
                Client satisfaction rate built on trust, quality service, and proven results.
              </p>
              <p className="mt-6 text-base font-semibold leading-relaxed text-primary sm:text-lg">
                Elevate your brand with strategy, creativity, and measurable growth.
              </p>
            </div>

            <a
              href="#about"
              className="group flex items-center gap-5"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary transition group-hover:brightness-110">
                <ArrowUpRight />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-medium text-primary/60">Learn More</span>
                <span className="block text-base font-semibold text-primary">About Our Vision</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <ClientMarquee />
    </section>
  )
}
