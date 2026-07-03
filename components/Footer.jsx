import { Facebook, Instagram } from 'lucide-react'

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.52V6.75a4.85 4.85 0 01-1.02-.06z" />
    </svg>
  )
}

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Find Us', href: '#find-us' },
]

const social = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/people/Bloom-Avenue-Le-Spa/100078854890417/',
    Icon: Facebook,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/bloom_avenue_spa/',
    Icon: Instagram,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@bloom_avenue_le_spa',
    Icon: TikTokIcon,
  },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">

        {/* Main grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="mb-5">
              <p className="font-cormorant text-2xl font-semibold tracking-wide text-white">Bloom Avenue</p>
              <p className="font-cormorant text-xs font-light text-rose tracking-[0.3em] uppercase mt-0.5">Le Spa</p>
            </div>
            <p className="font-cormorant text-lg italic text-white/50 mb-7 leading-snug">
              A Luxurious &amp; Relaxing Retreat
            </p>
            <div className="flex gap-4">
              {social.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/50 hover:text-rose transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-cormorant text-lg font-semibold text-white mb-6">Navigate</h4>
            <ul className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="font-dmsans text-sm text-white/50 hover:text-rose transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-cormorant text-lg font-semibold text-white mb-6">Contact</h4>
            <div className="space-y-2.5">
              <p className="font-dmsans text-sm text-white/50 leading-relaxed">
                Route Royale, Vis-à-vis Market<br />
                Saint Pierre, Mauritius
              </p>
              <a href="tel:+23054785001" className="block font-dmsans text-sm text-white/50 hover:text-rose transition-colors">
                +230 5478 5001
              </a>
              <a href="tel:+23058927354" className="block font-dmsans text-sm text-white/50 hover:text-rose transition-colors">
                +230 5892 7354
              </a>
              <a
                href="mailto:bloomavenuelespa@gmail.com"
                className="block font-dmsans text-sm text-white/50 hover:text-rose transition-colors"
              >
                bloomavenuelespa@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-dmsans text-xs text-white/30">
            &copy; 2025 Bloom Avenue Le Spa. All rights reserved.
          </p>
          <p className="font-dmsans text-xs text-white/30">
            Saint Pierre &amp; Quartier Militaire, Mauritius
          </p>
        </div>
      </div>
    </footer>
  )
}
