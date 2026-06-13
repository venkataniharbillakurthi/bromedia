import { useState } from 'react'
import { clientLogos } from '../data/clientLogos'

function LogoCard({ name, src }) {
  const [hasError, setHasError] = useState(false)

  return (
    <div className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-primary/5 bg-primary/[0.03] px-6 sm:h-24 sm:w-52">
      {!hasError ? (
        <img
          src={src}
          alt={name}
          className="max-h-10 max-w-full object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0 sm:max-h-12"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="text-sm font-semibold text-primary/40">{name}</span>
      )}
    </div>
  )
}

export default function ClientMarquee() {
  const logos = [...clientLogos, ...clientLogos]

  return (
    <div className="overflow-hidden mt-4 pt-4 pb-6 lg:mt-12">
      <div className="animate-marquee flex w-max gap-5">
        {logos.map((client, index) => (
          <LogoCard key={`${client.name}-${index}`} name={client.name} src={client.src} />
        ))}
      </div>
    </div>
  )
}
