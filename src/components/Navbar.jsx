import { useState } from 'react'
import ChevronIcon from './ChevronIcon'

const LOGO_URL =
  'https://res.cloudinary.com/dvruqkpqk/image/upload/v1781159779/Group_1321314887_gbgiup.png'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#work' },
  { label: 'Industries', href: '#industries' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5 sm:px-6 lg:px-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-white/20 bg-white/50 px-4 py-2.5 font-sans shadow-lg shadow-black/10 backdrop-blur-xl sm:px-10">
        <a href="#" className="flex shrink-0 flex-col items-center text-center">
          <img src={LOGO_URL} alt="Brosmedia" className="h-8 w-auto object-contain sm:h-10" />
          
        </a>

        <ul className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[18px] font-medium text-primary/80 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full bg-primary py-1.5 pl-4 pr-1.5 text-sm font-medium text-white transition hover:brightness-125 lg:flex"
        >
          Get in Touch
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-primary">
            <ChevronIcon />
          </span>
        </a>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 text-primary hover:bg-black/5 lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div className="mx-auto mt-3 max-w-6xl rounded-3xl border border-white/20 bg-primary/95 p-4 backdrop-blur-xl lg:hidden">
          <div className="mb-4 flex flex-col items-center border-b border-white/10 pb-4 text-center">
            <img src={LOGO_URL} alt="Brosmedia" className="h-8 w-auto object-contain" />
            <span className="mt-0.5 text-[10px] font-medium leading-tight text-white/60">
              Branding & Marketing Agency
            </span>
          </div>
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="mt-3 flex items-center justify-between rounded-full bg-secondary px-4 py-3 text-sm font-semibold text-primary"
            onClick={() => setMenuOpen(false)}
          >
            Get in Touch
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-primary">
              <ChevronIcon />
            </span>
          </a>
        </div>
      )}
    </header>
  )
}
