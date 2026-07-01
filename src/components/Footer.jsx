import { Link } from 'react-router-dom'
import { LetterSwapLink } from '../framer/letter_swap.jsx'
import { footerIntro, footerLinks } from '../data/footer'
import { routes } from '../data/navigation'

function LinkDivider() {
  return (
    <span className="mx-3 text-black/20 sm:mx-4" aria-hidden="true">
      ·
    </span>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-accent/[0.04] to-white font-sans">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
        <div className="flex flex-col items-center text-center">
          <Link to={routes.home} className="shrink-0" aria-label="Brosmedia home">
            <img
              src={footerIntro.logoSrc}
              alt={footerIntro.logoAlt}
              className="h-auto w-[min(80vw,14rem)] object-contain sm:w-56 lg:w-64"
            />
          </Link>

          <p className="mt-4 text-sm text-black/50 sm:text-base">{footerIntro.address}</p>

          <nav className="mt-5" aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center">
              {footerLinks.map((link, index) => (
                <li key={link.label} className="flex items-center">
                  {index > 0 && <LinkDivider />}
                  <LetterSwapLink
                    to={link.to}
                    text={link.label}
                    className="text-sm font-medium sm:text-base"
                    color="rgba(0,0,0,0.8)"
                    hoverColor="#1e45ff"
                  />
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-6 text-xs text-black/40 sm:text-sm">
            © {year} {footerIntro.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
