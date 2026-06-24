import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import About from '../components/About'
import Services from '../components/Services'
import ClientsTeaser from '../components/ClientsTeaser'
import Testimonials from '../components/Testimonials'
import IndustriesStrip from '../components/IndustriesStrip'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <About />
      <Services />
      <ClientsTeaser />
      <Testimonials />
      <IndustriesStrip />
    </>
  )
}
