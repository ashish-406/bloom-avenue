'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const images = [
  {
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    alt: 'Advanced facial treatment at Bloom Avenue Le Spa',
  },
  {
    src: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80',
    alt: 'Relaxing massage treatment',
  },
  {
    src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80',
    alt: 'Beautiful nail art and manicure',
  },
  {
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    alt: 'Bloom Avenue Le Spa serene interior',
  },
  {
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    alt: 'Professional hair styling and treatment',
  },
  {
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
    alt: 'Luxurious body treatment',
  },
  {
    src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80',
    alt: 'Relaxing spa atmosphere',
  },
]

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="gallery" className="py-28 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="font-italiana text-rose tracking-[0.28em] uppercase text-sm mb-4">Galerie</p>
          <h2 className="font-cormorant font-light text-charcoal text-5xl mb-4">Our World</h2>
          <p className="font-dmsans text-ink/65 max-w-lg mx-auto text-[15px]">
            A glimpse into the beauty and serenity that awaits you at Bloom Avenue.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="flex gap-4 overflow-x-auto pb-6 px-6 snap-x snap-mandatory scrollbar-hide"
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
            className="flex-none w-64 md:w-72 h-88 rounded-2xl overflow-hidden relative snap-start"
            style={{ height: '22rem' }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="288px"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center font-dmsans text-xs text-ink/40 mt-4 tracking-widest uppercase"
      >
        Swipe to explore
      </motion.p>
    </section>
  )
}
