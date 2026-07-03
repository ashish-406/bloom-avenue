'use client'
import Link from 'next/link'

export default function BookingError({ error, reset }) {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-14 h-14 bg-rose/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-rose text-2xl">!</span>
        </div>
        <h1 className="font-cormorant text-3xl font-semibold text-charcoal mb-3">Something went wrong</h1>
        <p className="font-dmsans text-sm text-ink/60 mb-8">
          We had trouble loading the booking page. Please try again or contact us directly.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={reset}
            className="w-full bg-rose text-white font-dmsans text-sm font-medium py-3.5 rounded-full hover:bg-rose/85 transition-colors"
          >
            Try Again
          </button>
          <a
            href="https://wa.me/23054785001?text=Hi!+I'd+like+to+book+an+appointment."
            className="w-full border border-rose/30 text-rose font-dmsans text-sm font-medium py-3.5 rounded-full hover:bg-rose/5 transition-colors"
          >
            Book via WhatsApp
          </a>
          <Link href="/" className="font-dmsans text-sm text-ink/40 hover:text-rose transition-colors">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  )
}
