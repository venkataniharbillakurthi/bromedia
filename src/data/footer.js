import { navLinks, routes } from './navigation'
import { clientsTeaser } from './clientsTeaser'

export const footerIntro = {
  companyName: 'Brosmedia',
  address: 'Hyderabad, Telangana, India',
}

export const footerRevealImages = clientsTeaser
  .filter((client) => client.logo)
  .map((client) => ({
    src: client.logo,
    alt: client.name,
  }))

export const footerLinks = navLinks

export { routes }
