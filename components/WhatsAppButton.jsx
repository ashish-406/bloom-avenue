'use client'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/23054785001?text=Hi!+I'd+like+to+book+an+appointment+at+Bloom+Avenue+Le+Spa."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 1.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 bg-rose text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl hover:bg-rose/90 transition-colors"
    >
      <MessageCircle size={26} />
    </motion.a>
  )
}
