'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MessageCircle, ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80"
          alt="Bloom Avenue Le Spa — luxury spa interior in Saint Pierre, Mauritius"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Layered overlay: dark at bottom, lighter at top for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="font-italiana text-gold uppercase text-sm mb-6"
          >
            Saint Pierre, Mauritius
          </motion.p>

          <h1 className="font-cormorant font-light text-white leading-none mb-4">
            <span className="block text-6xl md:text-7xl lg:text-8xl">Bloom Avenue</span>
            <span className="block text-5xl md:text-6xl lg:text-7xl italic text-rose/90 mt-2">Le Spa</span>
          </h1>

          <p className="font-cormorant text-xl md:text-2xl text-white/80 italic mt-6 mb-12 tracking-wide">
            A Luxurious &amp; Relaxing Retreat
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/23054785001"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-rose text-white font-dmsans font-medium text-sm px-8 py-4 rounded-full hover:bg-rose/85 transition-all shadow-xl hover:shadow-rose/30 hover:scale-105"
            >
              <MessageCircle size={18} />
              Book via WhatsApp
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/25 font-dmsans font-medium text-sm px-8 py-4 rounded-full hover:bg-white/20 transition-all"
            >
              Explore Services
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  )
}
