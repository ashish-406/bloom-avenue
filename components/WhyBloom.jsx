'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, Leaf, Heart } from 'lucide-react'

const tiles = [
  {
    Icon: Sparkles,
    title: 'Expert Therapists',
    description:
      'Our skilled team brings years of expertise and genuine passion to every treatment — results you can see, and feel.',
  },
  {
    Icon: Leaf,
    title: 'Premium Products',
    description:
      'We use only the finest skincare and beauty products, chosen for their quality, efficacy, and gentle care.',
  },
  {
    Icon: Heart,
    title: 'Total Relaxation',
    description:
      'Every detail of our spa is designed to melt away stress — so you leave lighter, brighter, and beautifully you.',
  },
]

export default function WhyBloom() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 bg-charcoal" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-italiana text-gold tracking-[0.28em] uppercase text-sm mb-4">Pourquoi Nous</p>
          <h2 className="font-cormorant font-light text-white text-5xl mb-4">Why Bloom Avenue</h2>
          <p className="font-dmsans text-white/50 max-w-md mx-auto text-[15px]">
            Votre moment de détente — crafted with care, delivered with love.
          </p>
        </motion.div>

        {/* Tiles */}
        <div className="grid md:grid-cols-3 gap-6">
          {tiles.map(({ Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="text-center p-10 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/10 transition-colors group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/15 text-gold mb-7 group-hover:bg-gold/25 transition-colors">
                <Icon size={26} />
              </div>
              <h3 className="font-cormorant text-2xl font-semibold text-white mb-3">{title}</h3>
              <p className="font-dmsans text-white/55 leading-relaxed text-sm">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
