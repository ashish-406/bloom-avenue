'use client'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const categories = [
  {
    id: 'skincare',
    label: 'Skin Care',
    services: [
      { name: 'Advanced Skin Care Facial', description: 'Deep cleansing and rejuvenating facial — our signature treatment.', price: 'Price TBC' },
      { name: 'Anti-Aging Facial', description: 'Reduce fine lines and restore youthful, plump radiance.', price: 'Price TBC' },
      { name: 'Brightening Facial', description: 'Even skin tone and reveal your natural, luminous glow.', price: 'Price TBC' },
      { name: 'Acne Treatment Facial', description: 'Targeted, calming treatment for clearer and healthier skin.', price: 'Price TBC' },
    ],
  },
  {
    id: 'massage',
    label: 'Massage',
    services: [
      { name: 'Relaxation Massage', description: 'Full-body tension melt for a state of total tranquility.', price: 'Price TBC' },
      { name: 'Deep Tissue Massage', description: 'Targeted relief for deep-seated muscle tension and knots.', price: 'Price TBC' },
      { name: 'Body Scrub & Wrap', description: 'Exfoliating and nourishing full body treatment for silky skin.', price: 'Price TBC' },
      { name: 'Aromatherapy Massage', description: 'Soothing massage with premium therapeutic essential oils.', price: 'Price TBC' },
    ],
  },
  {
    id: 'nails',
    label: 'Nails',
    services: [
      { name: 'Manicure', description: 'Classic nail care, shaping and polish for beautiful hands.', price: 'Price TBC' },
      { name: 'Pedicure', description: 'Relaxing foot treatment and polish for perfectly groomed feet.', price: 'Price TBC' },
      { name: 'Gel Nails', description: 'Long-lasting gel polish for a chip-free, flawless finish.', price: 'Price TBC' },
      { name: 'Nail Art', description: 'Creative custom designs to express your unique personality.', price: 'Price TBC' },
      { name: 'Mani-Pedi Combo', description: 'Our most-booked service — complete hands and feet treatment.', price: 'Price TBC' },
    ],
  },
  {
    id: 'hair',
    label: 'Hair',
    services: [
      { name: 'Haircut & Styling', description: 'Expert cut and style tailored to your look and lifestyle.', price: 'Price TBC' },
      { name: 'Keratin Treatment', description: 'Smooth, frizz-free, manageable hair that lasts for weeks.', price: 'Price TBC' },
      { name: 'Hair Colouring', description: 'Vibrant, professional colour with lasting, beautiful results.', price: 'Price TBC' },
      { name: 'Blowdry & Finish', description: 'Salon-perfect blowout styling for any occasion.', price: 'Price TBC' },
    ],
  },
  {
    id: 'waxing',
    label: 'Waxing',
    services: [
      { name: 'Full Body Wax', description: 'Complete, smooth skin waxing with gentle, effective technique.', price: 'Price TBC' },
      { name: 'Eyebrow Wax & Tint', description: 'Perfectly shaped, defined brows that frame your face.', price: 'Price TBC' },
      { name: 'Lip & Facial Wax', description: 'Precise hair removal for a clean, polished finish.', price: 'Price TBC' },
    ],
  },
  {
    id: 'packages',
    label: 'Packages',
    services: [
      { name: 'Couple Package', description: 'Romantic spa experience for two — the perfect gift.', price: 'Price TBC' },
      { name: 'Bridal Package', description: 'Head-to-toe beauty prep for your most special day.', price: 'Price TBC' },
      { name: 'Birthday Pamper Package', description: 'Celebrate yourself with the ultimate pampering treat.', price: 'Price TBC' },
      { name: 'Full Day Retreat', description: 'An entire day of blissful treatments and pure relaxation.', price: 'Price TBC' },
    ],
  },
]

export default function Services() {
  const [active, setActive] = useState('skincare')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const activeCategory = categories.find((c) => c.id === active)

  return (
    <section id="services" className="py-28 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-italiana text-rose tracking-[0.28em] uppercase text-sm mb-4">Nos Services</p>
          <h2 className="font-cormorant font-light text-charcoal text-5xl mb-4">Our Treatments</h2>
          <p className="font-dmsans text-ink/65 max-w-lg mx-auto text-[15px]">
            Every treatment is crafted to leave you feeling renewed, radiant, and completely yourself.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`font-dmsans text-sm px-6 py-2.5 rounded-full border transition-all duration-200 ${
                active === cat.id
                  ? 'bg-rose text-white border-rose shadow-sm'
                  : 'bg-transparent text-ink/70 border-ink/15 hover:border-rose/50 hover:text-rose'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {activeCategory.services.map((service) => (
              <div
                key={service.name}
                className="group bg-ivory rounded-2xl p-6 border border-rose/10 hover:shadow-lg hover:border-rose/25 transition-all duration-300"
              >
                <h3 className="font-cormorant text-xl font-semibold text-charcoal mb-2 group-hover:text-rose transition-colors">
                  {service.name}
                </h3>
                <p className="font-dmsans text-sm text-ink/65 leading-relaxed mb-5">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-dmsans text-sm font-medium text-rose/80">{service.price}</span>
                  <a
                    href={`/book?service=${encodeURIComponent(service.name)}`}
                    className="font-dmsans text-xs font-medium text-charcoal border border-charcoal/20 rounded-full px-4 py-1.5 hover:bg-rose hover:text-white hover:border-rose transition-all"
                  >
                    Book
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
