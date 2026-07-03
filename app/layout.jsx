import { Cormorant_Garamond, DM_Sans, Italiana } from 'next/font/google'
import '../styles/globals.css'
import JsonLd from '@/components/JsonLd'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const italiana = Italiana({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-italiana',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://bloomavenuelespa.vercel.app'),
  title: 'Bloom Avenue Le Spa — Beauty Salon & Spa | Saint Pierre, Mauritius',
  description:
    'Bloom Avenue Le Spa offers luxurious spa and beauty treatments in Saint Pierre, Mauritius — facials, massages, nails, hair services, waxing, and couple packages. Book via WhatsApp: +230 5478 5001',
  keywords: [
    'Bloom Avenue Le Spa',
    'spa Mauritius',
    'beauty salon Saint Pierre',
    'salon Mauritius',
    'facial Mauritius',
    'massage Mauritius',
    'manicure pedicure Mauritius',
    'couple package spa Mauritius',
    'keratin treatment Mauritius',
    'bridal package Mauritius',
  ],
  openGraph: {
    title: 'Bloom Avenue Le Spa — Saint Pierre, Mauritius',
    description:
      'Luxurious spa and beauty salon in Saint Pierre, Mauritius. Facials, massages, nails, hair & more. Book via WhatsApp.',
    url: 'https://bloomavenuelespa.vercel.app',
    siteName: 'Bloom Avenue Le Spa',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_MU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bloom Avenue Le Spa — Beauty Salon & Spa | Mauritius',
    description: 'Luxurious spa treatments in Saint Pierre, Mauritius.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${italiana.variable}`}>
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  )
}
