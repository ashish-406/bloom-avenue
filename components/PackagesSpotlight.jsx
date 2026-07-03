'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import Image from 'next/image'

const featured = [
  {
    name: 'Couple Package',
    tagline: 'Votre moment ensemble',
    description:
      'A romantic spa experience crafted for two — the perfect anniversary gift, birthday surprise, or simply because you both deserve it. Includes couples massage, facial, and more.',
    price: 'Price TBC',
    badge: 'Perfect for Gifting',
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    alt: 'Couple spa package at Bloom Avenue Le Spa',
  },
  {
    name: 'Bridal Package',
    tagline: 'Your most beautiful day',
    description:
      'Head-to-toe beauty preparation for brides-to-be. Indulge in our signature treatments to ensure you look absolutely radiant and feel utterly serene on your wedding day.',
    price: 'Price TBC',
    badge: 'For Brides-to-Be',
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    alt: 'Bridal beauty package at Bloom Avenue Le Spa',
  },
]

const secondary = [
  { name: 'Birthday Pamper Package', description: 'The ultimate celebration treat', price: 'Price TBC' },
  { name: 'Full Day Retreat', description: 'An entire day of pure bliss', price: 'Price TBC' },
]

export default function PackagesSpotlight() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="packages" className="py-28 bg-ivory" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-italiana text-rose tracking-[0.28em] uppercase text-sm mb-4">Forfaits Spéciaux</p>
          <h2 className="font-cormorant font-light text-charcoal text-5xl mb-4">Signature Packages</h2>
          <p className="font-dmsans text-ink/65 max-w-lg mx-auto text-[15px]">
            Because some moments deserve something truly extraordinary.
          </p>
        </motion.div>

        {/* Featured cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {featured.map(({ name, tagline, description, price, badge, src, alt }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: i * 0.2 }}
              className="group rounded-3xl overflow-hidden bg-white shadow-xl border border-gold/15 hover:shadow-2xl transition-shadow duration-500"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 font-dmsans text-xs font-semibold bg-gold text-white rounded-full px-3 py-1 shadow-sm">
                  {badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="font-italiana text-rose text-sm tracking-widest mb-1">{tagline}</p>
                <h3 className="font-cormorant text-3xl font-semibold text-charcoal mb-4">{name}</h3>
                <p className="font-dmsans text-ink/65 text-sm leading-relaxed mb-7">{description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-cormorant text-2xl font-semibold text-rose">{price}</span>
                  <a
                    href="https://wa.me/23054785001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-rose text-white font-dmsans text-sm font-medium px-6 py-3 rounded-full hover:bg-rose/85 transition-colors shadow-sm"
                  >
                    <MessageCircle size={15} />
                    Book Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary packages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          {secondary.map(({ name, description, price }) => (
            <div
              key={name}
              className="flex items-center justify-between p-6 rounded-2xl bg-white border border-gold/20 hover:border-gold/40 transition-colors"
            >
              <div>
                <h4 className="font-cormorant text-xl font-semibold text-charcoal">{name}</h4>
                <p className="font-dmsans text-sm text-ink/55 mt-0.5">{description}</p>
              </div>
              <div className="text-right ml-6 flex-shrink-0">
                <p className="font-dmsans text-sm text-rose font-medium mb-2">{price}</p>
                <a
                  href="https://wa.me/23054785001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-dmsans text-xs font-medium text-charcoal border border-charcoal/20 rounded-full px-4 py-1.5 hover:bg-rose hover:text-white hover:border-rose transition-all"
                >
                  Book
                </a>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
