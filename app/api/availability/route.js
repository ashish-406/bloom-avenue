import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { generateSlots } from '@/lib/availability'
import { isValid, parseISO, getDay } from 'date-fns'

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const date     = searchParams.get('date')
  const duration = parseInt(searchParams.get('duration') || '60', 10)

  // ── Validate date ────────────────────────────────────────────────────────────
  if (!date || !DATE_RE.test(date)) {
    return NextResponse.json({ error: 'Invalid date format' }, { status: 400 })
  }
  const parsedDate = parseISO(date)
  if (!isValid(parsedDate)) {
    return NextResponse.json({ error: 'Invalid date' }, { status: 400 })
  }
  // Sundays — always closed
  if (getDay(parsedDate) === 0) {
    return NextResponse.json({ slots: [] })
  }

  // Clamp duration to a sane range regardless of what client sends
  const safeDuration = Math.max(30, Math.min(Number.isNaN(duration) ? 60 : duration, 480))

  try {
    const supabase = createServerClient()

    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('booking_date, booking_time, duration_minutes')
      .eq('booking_date', date)
      .neq('status', 'cancelled')

    if (error) throw error

    const slots = generateSlots(date, safeDuration, bookings || [])
    return NextResponse.json({ slots })
  } catch (err) {
    console.error('availability error', err)
    return NextResponse.json({ slots: [] }, { status: 500 })
  }
}
