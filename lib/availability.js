import { addMinutes, format, parseISO, isBefore, isAfter, setHours, setMinutes, setSeconds } from 'date-fns'

const OPEN_HOUR  = 9   // 9:00 AM
const CLOSE_HOUR = 18  // 6:00 PM
const INTERVAL   = 30  // slot grid in minutes

function dayStart(dateStr) {
  const d = parseISO(dateStr)
  return setSeconds(setMinutes(setHours(d, OPEN_HOUR), 0), 0)
}

function dayEnd(dateStr) {
  const d = parseISO(dateStr)
  return setSeconds(setMinutes(setHours(d, CLOSE_HOUR), 0), 0)
}

export function generateSlots(dateStr, durationMinutes, existingBookings) {
  const slots = []
  const now   = new Date()
  let cursor  = dayStart(dateStr)
  const end   = dayEnd(dateStr)

  while (isBefore(cursor, end)) {
    const slotEnd = addMinutes(cursor, durationMinutes)

    // Service must finish by closing time
    if (isAfter(slotEnd, end)) break

    // Skip past slots (with 15-min buffer so current-hour slots stay visible briefly)
    if (isBefore(addMinutes(cursor, -15), now)) {
      cursor = addMinutes(cursor, INTERVAL)
      continue
    }

    // Check conflicts with active bookings on the same day
    const hasConflict = existingBookings.some((b) => {
      const bStart = parseISO(`${b.booking_date}T${b.booking_time}`)
      const bEnd   = addMinutes(bStart, b.duration_minutes)
      return isBefore(cursor, bEnd) && isAfter(slotEnd, bStart)
    })

    if (!hasConflict) {
      slots.push(format(cursor, 'HH:mm'))
    }

    cursor = addMinutes(cursor, INTERVAL)
  }

  return slots
}
