'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya M.',
    review:
      "The best spa experience I've had in Mauritius. The facial left my skin absolutely glowing — I could not believe the results. I'll definitely be back!",
    service: 'Advanced Skin Care Facial',
    rating: 5,
  },
  {
    name: 'Nadia R.',
    review:
      "I booked the Couple Package for our anniversary and it was pure magic. The team made us feel so pampered and special. Highly, highly recommend!",
    service: 'Couple Package',
    rating: 5,
  },
  {
    name: 'Kavya S.',
    review:
      "My keratin treatment was done perfectly — the staff are so warm and professional. Bloom Avenue is my go-to salon in Saint Pierre without question.",
    service: 'Keratin Treatment',
    rating: 5,
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 bg-ivory" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-italiana text-rose tracking-[0.28em] uppercase text-sm mb-4">Témoignages</p>
          <h2 className="font-cormorant font-light text-charcoal text-5xl mb-4">What Our Clients Say</h2>
          <p className="font-dmsans text-ink/65 max-w-lg mx-auto text-[15px]">
            Real words from the women who trust us with their moments of self-care.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-7">
          {testimonials.map(({ name, review, service, rating }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-rose/10 hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: rating }).map((_, j) => (
                  <Star key={j} size={15} className="fill-gold text-gold" />
                ))}
              </div>

              <blockquote className="font-cormorant text-xl italic text-charcoal leading-relaxed mb-7">
                "{review}"
              </blockquote>

              <div className="border-t border-rose/10 pt-5">
                <p className="font-dmsans font-medium text-ink text-sm">{name}</p>
                <p className="font-dmsans text-xs text-rose mt-0.5">{service}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA nudge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-center mt-14"
        >
          <p className="font-cormorant text-2xl italic text-rose mb-6">
            "You deserve this."
          </p>
          <a
            href="/book"
            className="inline-flex items-center bg-rose text-white font-dmsans text-sm font-medium px-8 py-3.5 rounded-full hover:bg-rose/85 transition-colors shadow-sm"
          >
            Book Your Treatment
          </a>
        </motion.div>
      </div>
    </section>
  )
}
