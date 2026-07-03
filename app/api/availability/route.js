import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { generateSlots } from '@/lib/availability'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const date     = searchParams.get('date')
  const duration = parseInt(searchParams.get('duration') || '60', 10)

  if (!date) {
    return NextResponse.json({ error: 'date required' }, { status: 400 })
  }

  try {
    const supabase = createServerClient()

    // Fetch active bookings for the requested date
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('booking_date, booking_time, duration_minutes')
      .eq('booking_date', date)
      .neq('status', 'cancelled')

    if (error) throw error

    const slots = generateSlots(date, duration, bookings || [])
    return NextResponse.json({ slots })
  } catch (err) {
    console.error('availability error', err)
    return NextResponse.json({ slots: [] }, { status: 500 })
  }
}
