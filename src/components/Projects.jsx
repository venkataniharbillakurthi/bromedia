import ChevronIcon from './ChevronIcon'
import { projects } from '../data/projects'

function DeviceDesktop({ src, alt }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-primary shadow-2xl shadow-black/40">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
      </div>
      <img src={src} alt={alt} className="w-full object-cover object-top" loading="lazy" />
    </div>
  )
}

function DeviceMobile({ src, alt }) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border-4 border-white/15 bg-primary shadow-xl shadow-black/50">
      <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-white/20" />
      <img src={src} alt={alt} className="w-full object-cover object-top" loading="lazy" />
    </div>
  )
}

function ProjectCard({ project, reversed = false }) {
  return (
    <article
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${
        reversed ? 'lg:[&>*:first-child]:order-2' : ''
      }`}
    >
      <div className={reversed ? 'lg:pl-4' : 'lg:pr-4'}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          {project.category}
        </p>
        <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{project.name}</h3>
        <p className="mt-1 text-sm font-medium text-white/50">{project.tagline}</p>
        <p className="mt-5 text-base leading-relaxed text-white/70">{project.description}</p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-secondary"
        >
          Visit Website
          <ChevronIcon className="h-4 w-4" />
        </a>
      </div>

      <div className="relative">
        <DeviceDesktop src={project.desktop} alt={`${project.name} desktop view`} />
        <div className="absolute -bottom-6 -right-2 w-[34%] min-w-[110px] max-w-[160px] sm:-bottom-8 sm:right-4 sm:max-w-[180px] lg:-bottom-10 lg:right-6">
          <DeviceMobile src={project.mobile} alt={`${project.name} mobile view`} />
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="work" className="bg-primary font-sans">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Our Work
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Websites we&apos;ve built for brands that mean business.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            From real estate to food export — responsive, polished, and built to convert
            across desktop and mobile.
          </p>
        </div>

        <div className="mt-16 space-y-24 lg:mt-20 lg:space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} reversed={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
