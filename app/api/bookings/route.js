import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { generateSlots } from '@/lib/availability'

export async function POST(request) {
  try {
    const body = await request.json()
    const { service_name, service_category, client_name, client_phone,
            booking_date, booking_time, duration_minutes, notes, juice_reference } = body

    if (!service_name || !client_name || !client_phone || !booking_date || !booking_time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServerClient()

    // Race-condition check: re-verify the slot is still available
    const { data: existing } = await supabase
      .from('bookings')
      .select('booking_date, booking_time, duration_minutes')
      .eq('booking_date', booking_date)
      .neq('status', 'cancelled')

    const availableSlots = generateSlots(booking_date, duration_minutes, existing || [])

    if (!availableSlots.includes(booking_time)) {
      return NextResponse.json(
        { error: 'This slot was just taken. Please choose another time.' },
        { status: 409 }
      )
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        service_name,
        service_category,
        client_name,
        client_phone,
        booking_date,
        booking_time,
        duration_minutes,
        notes: notes || null,
        juice_reference: juice_reference || null,
        status: 'pending',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error('booking create error', err)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
