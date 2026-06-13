const stats = [
  { value: '10+', label: 'Brands Built' },
  { value: '5', label: 'Industries' },
  { value: '1 Yr', label: 'Of Execution' },
  { value: '360°', label: 'Brand Services' },
]

export default function StatsBar() {
  return (
    <section className="bg-primary font-sans">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center ${index < stats.length - 1 ? 'sm:border-r sm:border-white/10' : ''}`}
            >
              <p className="text-3xl font-bold text-secondary sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
