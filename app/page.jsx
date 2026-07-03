import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import WhyBloom from '@/components/WhyBloom'
import PackagesSpotlight from '@/components/PackagesSpotlight'
import Gallery from '@/components/Gallery'
import Testimonials from '@/components/Testimonials'
import FindUs from '@/components/FindUs'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <WhyBloom />
      <PackagesSpotlight />
      <Gallery />
      <Testimonials />
      <FindUs />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
