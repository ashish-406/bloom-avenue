'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react'

export default function FindUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="find-us" className="py-28 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-italiana text-rose tracking-[0.28em] uppercase text-sm mb-4">Nous Trouver</p>
          <h2 className="font-cormorant font-light text-charcoal text-5xl mb-4">Find Us</h2>
          <p className="font-dmsans text-ink/65 max-w-md mx-auto text-[15px]">
            Come visit us — we can't wait to welcome you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Map placeholder — replace iframe src once confirmed */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85 }}
            className="rounded-3xl overflow-hidden h-[420px] bg-rose/8 border border-rose/15 flex items-center justify-center"
          >
            {/*
              TO-DO: Replace this div with the Google Maps iframe once the embed src is confirmed:
              <iframe
                src="GOOGLE_MAPS_EMBED_SRC"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bloom Avenue Le Spa location"
              />
            */}
            <div className="text-center p-10">
              <MapPin size={52} className="text-rose mx-auto mb-5" strokeWidth={1.5} />
              <p className="font-cormorant text-2xl font-semibold text-charcoal mb-2">Bloom Avenue Le Spa</p>
              <p className="font-dmsans text-sm text-ink/65 mb-1">Route Royale, Vis-à-vis Market</p>
              <p className="font-dmsans text-sm text-ink/65 mb-6">Saint Pierre, Mauritius</p>
              <a
                href="https://maps.google.com/?q=Bloom+Avenue+Le+Spa+Saint+Pierre+Mauritius"
                target="_blank"
                rel="noopener noreferrer"
                className="font-dmsans text-sm font-medium text-rose border border-rose rounded-full px-6 py-2.5 hover:bg-rose hover:text-white transition-colors"
              >
                Open in Google Maps
              </a>
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15 }}
            className="space-y-9"
          >

            {/* Main location */}
            <div>
              <h3 className="font-cormorant text-2xl font-semibold text-charcoal mb-5">
                Saint Pierre{' '}
                <span className="font-cormorant text-rose font-light text-base italic">— Main Location</span>
              </h3>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3.5">
                  <MapPin size={17} className="text-rose mt-0.5 flex-shrink-0" />
                  <span className="font-dmsans text-sm text-ink/75">
                    Vis-à-vis Market, Route Royale, Saint Pierre, Mauritius
                  </span>
                </li>
                <li className="flex items-center gap-3.5">
                  <Clock size={17} className="text-rose flex-shrink-0" />
                  <span className="font-dmsans text-sm text-ink/75">Opening hours — to be confirmed</span>
                </li>
                <li className="flex items-center gap-3.5">
                  <Phone size={17} className="text-rose flex-shrink-0" />
                  <a href="tel:+23054785001" className="font-dmsans text-sm text-ink/75 hover:text-rose transition-colors">
                    +230 5478 5001
                  </a>
                </li>
                <li className="flex items-center gap-3.5">
                  <Phone size={17} className="text-rose flex-shrink-0" />
                  <a href="tel:+23058927354" className="font-dmsans text-sm text-ink/75 hover:text-rose transition-colors">
                    +230 5892 7354
                  </a>
                </li>
                <li className="flex items-center gap-3.5">
                  <Mail size={17} className="text-rose flex-shrink-0" />
                  <a
                    href="mailto:bloomavenuelespa@gmail.com"
                    className="font-dmsans text-sm text-ink/75 hover:text-rose transition-colors"
                  >
                    bloomavenuelespa@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Second location */}
            <div className="border-t border-rose/10 pt-7">
              <h3 className="font-cormorant text-2xl font-semibold text-charcoal mb-3">
                Quartier Militaire{' '}
                <span className="font-cormorant text-rose font-light text-base italic">— Second Location</span>
              </h3>
              <p className="font-dmsans text-sm text-ink/60 leading-relaxed">
                Details coming soon. Contact us on WhatsApp or by phone for directions and availability.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href="https://wa.me/23054785001"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-rose text-white font-dmsans text-sm font-medium px-7 py-3.5 rounded-full hover:bg-rose/85 transition-colors shadow-sm"
              >
                <MessageCircle size={16} />
                Book via WhatsApp
              </a>
              <a
                href="tel:+23054785001"
                className="inline-flex items-center justify-center gap-2 border border-charcoal/20 text-charcoal font-dmsans text-sm font-medium px-7 py-3.5 rounded-full hover:border-rose hover:text-rose transition-colors"
              >
                <Phone size={16} />
                Call Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
