import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { generateSlots } from '@/lib/availability'
import { SERVICES } from '@/lib/services-data'
import { isValid, parseISO, getDay, isBefore, startOfDay } from 'date-fns'

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const TIME_RE = /^\d{2}:\d{2}$/

export async function POST(request) {
  try {
    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const { service_name, client_name, client_phone, booking_date, booking_time, notes, juice_reference } = body

    // ── Presence ────────────────────────────────────────────────────────────────
    if (!service_name || !client_name || !client_phone || !booking_date || !booking_time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // ── Length limits ────────────────────────────────────────────────────────────
    if (typeof client_name !== 'string' || client_name.trim().length < 2 || client_name.length > 120)
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
    if (typeof client_phone !== 'string' || client_phone.trim().length < 7 || client_phone.length > 20)
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
    if (notes && (typeof notes !== 'string' || notes.length > 1000))
      return NextResponse.json({ error: 'Notes too long (max 1000 characters)' }, { status: 400 })
    if (juice_reference && (typeof juice_reference !== 'string' || juice_reference.length > 100))
      return NextResponse.json({ error: 'Reference too long' }, { status: 400 })

    // ── Service validation — use canonical duration & category ───────────────────
    const knownService = SERVICES.find(
      (s) => s.name.toLowerCase() === String(service_name).toLowerCase()
    )
    if (!knownService) {
      return NextResponse.json({ error: 'Unknown service' }, { status: 400 })
    }
    const duration_minutes = knownService.duration   // never trust client-sent duration
    const service_category = knownService.category

    // ── Date validation ──────────────────────────────────────────────────────────
    if (!DATE_RE.test(booking_date))
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 })
    const parsedDate = parseISO(booking_date)
    if (!isValid(parsedDate))
      return NextResponse.json({ error: 'Invalid date' }, { status: 400 })
    if (isBefore(parsedDate, startOfDay(new Date())))
      return NextResponse.json({ error: 'Cannot book a past date' }, { status: 400 })
    if (getDay(parsedDate) === 0)
      return NextResponse.json({ error: 'We are closed on Sundays' }, { status: 400 })

    // ── Time validation ──────────────────────────────────────────────────────────
    if (!TIME_RE.test(booking_time))
      return NextResponse.json({ error: 'Invalid time format' }, { status: 400 })
    const [hour, minute] = booking_time.split(':').map(Number)
    if (hour < 9 || hour >= 18 || (minute !== 0 && minute !== 30))
      return NextResponse.json({ error: 'Time outside business hours or not on slot grid' }, { status: 400 })

    const supabase = createServerClient()

    // ── Race-condition guard — re-verify slot is still available ─────────────────
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

    // ── Insert ───────────────────────────────────────────────────────────────────
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        service_name:     knownService.name,  // canonical casing from our catalogue
        service_category,
        client_name:      client_name.trim(),
        client_phone:     client_phone.trim(),
        booking_date,
        booking_time,
        duration_minutes,
        notes:            notes?.trim() || null,
        juice_reference:  juice_reference?.trim() || null,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      // Unique constraint on (booking_date, booking_time) — concurrent request won the race
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This slot was just taken. Please choose another time.' },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error('booking create error', err)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
