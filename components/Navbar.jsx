'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Find Us', href: '#find-us' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ivory/96 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none">
          <span
            className={`font-cormorant text-2xl font-semibold tracking-wide transition-colors ${
              scrolled ? 'text-charcoal' : 'text-white'
            }`}
          >
            Bloom Avenue
          </span>
          <span className="font-cormorant text-xs font-light text-rose tracking-[0.3em] uppercase mt-0.5">
            Le Spa
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`font-dmsans text-sm tracking-wide transition-colors hover:text-rose ${
                  scrolled ? 'text-ink' : 'text-white/90'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="https://wa.me/23054785001"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-rose text-white text-sm font-dmsans font-medium px-6 py-2.5 rounded-full hover:bg-rose/85 transition-colors shadow-sm"
        >
          Book Now
        </a>

        {/* Mobile toggle */}
        <button
          className={`md:hidden transition-colors ${scrolled ? 'text-charcoal' : 'text-white'}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-ivory border-t border-rose/10 px-6 py-8">
          <ul className="flex flex-col gap-5 mb-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-dmsans text-ink text-base hover:text-rose transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://wa.me/23054785001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-rose text-white text-sm font-dmsans font-medium px-6 py-3 rounded-full"
          >
            Book via WhatsApp
          </a>
        </div>
      )}
    </nav>
  )
}
