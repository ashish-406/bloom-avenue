import BookingFlow from './BookingFlow'

export const metadata = {
  title: 'Book a Treatment — Bloom Avenue Le Spa',
  description: 'Book your spa or beauty treatment online at Bloom Avenue Le Spa, Saint Pierre, Mauritius.',
}

export default function BookPage({ searchParams }) {
  return <BookingFlow initialService={searchParams?.service || null} />
}
