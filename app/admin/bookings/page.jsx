import { requireAdmin } from '@/lib/auth'
import { createServerClient } from '@/lib/supabase-server'
import BookingsClient from './BookingsClient'

export const dynamic = 'force-dynamic'

export default async function AdminBookingsPage({ searchParams }) {
  // Defense-in-depth: verify session in the component, not only in middleware
  await requireAdmin()

  const supabase = createServerClient()
  const filter   = searchParams?.filter || 'all'
  const page     = Math.max(1, parseInt(searchParams?.page || '1', 10))
  const pageSize = 50
  const today    = new Date().toISOString().split('T')[0]

  // ── Main query ───────────────────────────────────────────────────────────────
  let query = supabase
    .from('bookings')
    .select('*')
    .order('booking_date', { ascending: true })
    .order('booking_time', { ascending: true })
    .range((page - 1) * pageSize, page * pageSize - 1)

  if (filter === 'today')    query = query.eq('booking_date', today)
  if (filter === 'upcoming') query = query.gte('booking_date', today).neq('status', 'cancelled')
  if (filter === 'pending')  query = query.eq('status', 'pending')

  // ── Stats (parallel) ────────────────────────────────────────────────────────
  const [{ data: bookings }, [{ count: todayCount }, { count: pendingCount }, { count: confirmedCount }, { count: totalCount }]] =
    await Promise.all([
      query,
      Promise.all([
        supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('booking_date', today).neq('status', 'cancelled'),
        supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'confirmed'),
        supabase.from('bookings').select('*', { count: 'exact', head: true }),
      ]),
    ])

  return (
    <BookingsClient
      bookings={bookings || []}
      stats={{
        today:     todayCount     ?? 0,
        pending:   pendingCount   ?? 0,
        confirmed: confirmedCount ?? 0,
        total:     totalCount     ?? 0,
      }}
      currentFilter={filter}
      currentPage={page}
      pageSize={pageSize}
    />
  )
}
