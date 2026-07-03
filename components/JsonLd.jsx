export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: 'Bloom Avenue Le Spa',
    image: '/og-image.jpg',
    url: 'https://bloomavenuelespa.vercel.app',
    telephone: '+23054785001',
    email: 'bloomavenuelespa@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Route Royale, Vis-à-vis Market',
      addressLocality: 'Saint Pierre',
      addressCountry: 'MU',
    },
    sameAs: [
      'https://www.facebook.com/people/Bloom-Avenue-Le-Spa/100078854890417/',
      'https://www.instagram.com/bloom_avenue_spa/',
      'https://www.tiktok.com/@bloom_avenue_le_spa',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
