import { format, parseISO } from 'date-fns'

// Sends a WhatsApp message to the owner via CallMeBot (free, no business account needed).
// Setup: see README or ask the assistant — one-time activation takes 30 seconds.
export async function notifyOwnerNewBooking(booking) {
  const apiKey = process.env.CALLMEBOT_API_KEY
  const phone  = process.env.OWNER_PHONE

  if (!apiKey || !phone) return // no-op if not configured — bookings still work fine

  const date = format(parseISO(booking.booking_date), 'EEEE, d MMM yyyy')
  const time = booking.booking_time.slice(0, 5)

  const lines = [
    '🌸 New Booking — Bloom Avenue',
    '',
    `👤 ${booking.client_name}`,
    `📞 +230 ${booking.client_phone}`,
    `💆 ${booking.service_name}`,
    `📅 ${date} at ${time} (${booking.duration_minutes} min)`,
    booking.notes ? `📝 ${booking.notes}` : null,
    booking.juice_reference
      ? `💳 Juice ref: ${booking.juice_reference}`
      : `⚠️  No Juice ref yet — verify payment`,
    '',
    '👉 bloom-avenue.vercel.app/admin/bookings',
  ].filter(Boolean).join('\n')

  const url =
    `https://api.callmebot.com/whatsapp.php` +
    `?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(lines)}` +
    `&apikey=${apiKey}`

  // Fire-and-forget — a notification failure must never break the booking
  try {
    await fetch(url)
  } catch {
    console.error('WhatsApp notification failed — booking was still saved')
  }
}
