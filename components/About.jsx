'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const badges = ['Woman-Owned Business', 'Two Locations in Mauritius', 'Book via WhatsApp in seconds']

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-28 bg-ivory" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative"
          >
            <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80"
                alt="Bloom Avenue Le Spa welcoming interior"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Gold accent border */}
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/20 rounded-3xl pointer-events-none" />
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -right-4 md:-right-8 bg-white rounded-2xl shadow-xl px-6 py-5 border border-rose/10"
            >
              <p className="font-cormorant text-rose font-semibold text-base">Two Locations</p>
              <p className="font-dmsans text-ink/60 text-xs mt-0.5">Saint Pierre &amp; Quartier Militaire</p>
            </motion.div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
          >
            <p className="font-italiana text-rose tracking-[0.28em] uppercase text-sm mb-5">Notre Histoire</p>

            <h2 className="font-cormorant font-light text-charcoal text-5xl md:text-[3.25rem] leading-tight mb-7">
              A Sanctuary<br />
              <em className="text-rose not-italic italic">Made for You</em>
            </h2>

            <p className="font-dmsans text-ink/75 leading-relaxed mb-5">
              Nestled vis-à-vis the local market on Route Royale in Saint Pierre, Bloom Avenue Le Spa is your ultimate escape from the everyday. We've created a space where luxury meets warmth — where every visit feels like a gift to yourself.
            </p>
            <p className="font-dmsans text-ink/75 leading-relaxed mb-8">
              From advanced skin care facials to soothing massages, indulgent nail treatments to expert hair services, our skilled team is here to make you feel beautiful, refreshed, and completely cared for. We also have a second location in Quartier Militaire — so relaxation is always close by.
            </p>

            <blockquote className="font-cormorant text-2xl italic text-rose border-l-2 border-rose/30 pl-5 mb-10 leading-snug">
              "Prenez soin de vous — because you're worth it."
            </blockquote>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2.5">
              {badges.map((b) => (
                <span
                  key={b}
                  className="font-dmsans text-xs font-medium bg-rose/8 text-rose border border-rose/20 rounded-full px-4 py-2"
                >
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
