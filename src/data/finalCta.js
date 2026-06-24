export const finalCtaIntro = {
  label: 'Final CTA Section',
  headline: 'Ready to build your brand?',
  description:
    'Whether you are starting from scratch or looking to level up — we will put together the right plan for your business.',
}

export const finalCtaButtons = {
  discovery: {
    label: 'Book a Free Discovery Call',
    href: 'mailto:hello@brosmedia.com?subject=Book%20a%20Free%20Discovery%20Call',
  },
  whatsapp: {
    label: 'WhatsApp Us →',
    // Country code + number, no + (e.g. 919876543210)
    number: '',
    message: "Hi Brosmedia, I'd like to discuss a project.",
  },
}

export function getWhatsAppHref({ number, message }) {
  if (!number) return 'mailto:hello@brosmedia.com'

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
