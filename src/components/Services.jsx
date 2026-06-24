import ImageScroller from '../framer/image_scroller.jsx'
import { services } from '../data/services'

export default function Services() {
  const items = services.map((service) => ({
    image: { src: service.image, alt: service.name },
    text: service.name,
  }))

  return (
    <section id="services" className="m-0 bg-black p-0 font-sans">
      <ImageScroller
        items={items}
        backgroundColor="#000000"
        textColor="#ffffff"
        dockPosition="right"
        dockInset={20}
        thumbColor="rgba(255,255,255,0.12)"
        thumbBlur={10}
        thumbSize={52}
        dimInactive
        inactiveOpacity={0.4}
      />
    </section>
  )
}
