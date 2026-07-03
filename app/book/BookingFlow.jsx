'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, Check, Clock, Calendar,
  User, Phone, FileText, MessageCircle, Smartphone,
} from 'lucide-react'
import {
  format, addMonths, subMonths, startOfMonth, endOfMonth,
  eachDayOfInterval, isSameMonth, isSameDay, isToday, getDay,
  startOfDay, isBefore,
} from 'date-fns'
import { SERVICES, CATEGORIES } from '@/lib/services-data'

const STEPS = ['Service', 'Date & Time', 'Your Details', 'Pay & Confirm']

// ─── Calendar helper ──────────────────────────────────────────────────────────
function CalendarGrid({ currentMonth, selected, onSelect }) {
  const start   = startOfMonth(currentMonth)
  const end     = endOfMonth(currentMonth)
  const days    = eachDayOfInterval({ start, end })
  const today   = startOfDay(new Date())

  // Pad front so Mon = col 1 (0=Sun in getDay, treat Sun as 7)
  const firstDow = (getDay(start) + 6) % 7
  const blanks   = Array.from({ length: firstDow })

  return (
    <div>
      <div className="grid grid-cols-7 mb-2">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
          <div key={d} className="text-center font-dmsans text-xs text-ink/40 py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {blanks.map((_, i) => <div key={`b${i}`} />)}
        {days.map((day) => {
          const past      = isBefore(startOfDay(day), today)
          const isSunday  = getDay(day) === 0
          const disabled  = past || isSunday
          const isSelected = selected && isSameDay(day, selected)
          const isNow     = isToday(day)

          return (
            <button
              key={day.toISOString()}
              disabled={disabled}
              onClick={() => onSelect(day)}
              className={`
                h-9 w-full rounded-lg text-sm font-dmsans transition-all
                ${disabled ? 'text-ink/20 cursor-not-allowed' : 'hover:bg-rose/10 cursor-pointer'}
                ${isSelected ? 'bg-rose text-white hover:bg-rose font-semibold' : ''}
                ${isNow && !isSelected ? 'ring-1 ring-rose text-rose font-semibold' : ''}
                ${!disabled && !isSelected && !isNow ? 'text-ink' : ''}
              `}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepBar({ step }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {STEPS.map((label, i) => {
        const num   = i + 1
        const done  = step > num
        const active = step === num
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-dmsans font-semibold transition-all ${
                done   ? 'bg-rose text-white' :
                active ? 'bg-rose text-white ring-4 ring-rose/20' :
                         'bg-ink/10 text-ink/40'
              }`}>
                {done ? <Check size={14} /> : num}
              </div>
              <span className={`hidden sm:block text-[10px] font-dmsans mt-1 ${active ? 'text-rose' : 'text-ink/40'}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px w-8 sm:w-14 mb-4 transition-colors ${step > num ? 'bg-rose' : 'bg-ink/15'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function BookingFlow({ initialService }) {
  const [step,            setStep]            = useState(1)
  const [activeCategory,  setActiveCategory]  = useState(CATEGORIES[0])
  const [service,         setService]         = useState(null)
  const [currentMonth,    setCurrentMonth]    = useState(new Date())
  const [selectedDate,    setSelectedDate]    = useState(null)
  const [selectedTime,    setSelectedTime]    = useState(null)
  const [slots,           setSlots]           = useState([])
  const [loadingSlots,    setLoadingSlots]    = useState(false)
  const [name,            setName]            = useState('')
  const [phone,           setPhone]           = useState('')
  const [notes,           setNotes]           = useState('')
  const [juiceRef,        setJuiceRef]        = useState('')
  const [submitting,      setSubmitting]      = useState(false)
  const [slotError,       setSlotError]       = useState('')
  const [booking,         setBooking]         = useState(null)

  // Pre-select from URL param
  useEffect(() => {
    if (!initialService) return
    const found = SERVICES.find(
      (s) => s.name.toLowerCase() === decodeURIComponent(initialService).toLowerCase()
    )
    if (found) {
      setService(found)
      setActiveCategory(found.category)
      setStep(2)
    }
  }, [initialService])

  // Fetch slots when date or service changes
  useEffect(() => {
    if (!selectedDate || !service) return
    const fetch_ = async () => {
      setLoadingSlots(true)
      setSelectedTime(null)
      setSlotError('')
      try {
        const res  = await fetch(`/api/availability?date=${format(selectedDate, 'yyyy-MM-dd')}&duration=${service.duration}`)
        const data = await res.json()
        setSlots(data.slots || [])
      } catch {
        setSlots([])
      } finally {
        setLoadingSlots(false)
      }
    }
    fetch_()
  }, [selectedDate, service])

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/bookings', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_name:     service.name,
          service_category: service.category,
          client_name:      name.trim(),
          client_phone:     phone.trim(),
          booking_date:     format(selectedDate, 'yyyy-MM-dd'),
          booking_time:     selectedTime,
          duration_minutes: service.duration,
          notes:            notes.trim() || null,
          juice_reference:  juiceRef.trim() || null,
        }),
      })
      const data = await res.json()
      if (res.status === 409) {
        setSlotError(data.error)
        setStep(2)
        setSelectedTime(null)
        return
      }
      if (!res.ok) throw new Error(data.error)
      setBooking(data)
      setStep(5)
    } catch (err) {
      alert(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const canStep2 = !!service
  const canStep3 = selectedDate && selectedTime
  const canStep4 = name.trim().length > 1 && phone.trim().length > 5

  // ── Step 5: Confirmation ───────────────────────────────────────────────────
  if (step === 5 && booking) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-rose/10"
        >
          <div className="w-16 h-16 bg-rose/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-rose" />
          </div>
          <h1 className="font-cormorant text-4xl font-semibold text-charcoal mb-2">Booking Received!</h1>
          <p className="font-dmsans text-ink/60 text-sm mb-8">
            We'll confirm your appointment shortly. You'll hear from us via WhatsApp or call.
          </p>

          <div className="bg-ivory rounded-2xl p-6 text-left space-y-3 mb-8">
            <Row label="Service"  value={service.name} />
            <Row label="Date"     value={format(selectedDate, 'EEEE, d MMMM yyyy')} />
            <Row label="Time"     value={selectedTime} />
            <Row label="Duration" value={`${service.duration} min`} />
            <Row label="Name"     value={name} />
            <Row label="Phone"    value={phone} />
          </div>

          <a
            href={`https://wa.me/23054785001?text=${encodeURIComponent(
              `Hi! I just booked a ${service.name} on ${format(selectedDate, 'd MMM yyyy')} at ${selectedTime}. My name is ${name}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-rose text-white font-dmsans text-sm font-medium px-8 py-3.5 rounded-full hover:bg-rose/85 transition-colors mb-4 w-full justify-center"
          >
            <MessageCircle size={16} />
            Message Us on WhatsApp
          </a>
          <Link href="/" className="block font-dmsans text-sm text-ink/50 hover:text-rose transition-colors">
            ← Back to home
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Top bar */}
      <div className="bg-white border-b border-rose/10 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-cormorant text-xl font-semibold text-charcoal flex items-center gap-2 hover:text-rose transition-colors">
          <ChevronLeft size={18} />
          Bloom Avenue Le Spa
        </Link>
        <span className="font-dmsans text-xs text-ink/40 hidden sm:block">Online Booking</span>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <StepBar step={step} />

        <AnimatePresence mode="wait">
          {/* ── STEP 1: Choose service ──────────────────────────────────────── */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
              <h2 className="font-cormorant text-4xl font-light text-charcoal mb-2">Choose Your Treatment</h2>
              <p className="font-dmsans text-sm text-ink/55 mb-8">Select the service you'd like to book.</p>

              {/* Category tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`font-dmsans text-xs px-4 py-2 rounded-full border transition-all ${
                      activeCategory === cat
                        ? 'bg-rose text-white border-rose'
                        : 'border-ink/15 text-ink/60 hover:border-rose/50 hover:text-rose'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Service cards */}
              <div className="grid sm:grid-cols-2 gap-3 mb-10">
                {SERVICES.filter((s) => s.category === activeCategory).map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setService(s)}
                    className={`text-left p-5 rounded-2xl border transition-all ${
                      service?.name === s.name
                        ? 'bg-rose/8 border-rose ring-1 ring-rose'
                        : 'bg-white border-rose/10 hover:border-rose/30 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-cormorant text-lg font-semibold text-charcoal leading-tight">{s.name}</p>
                      {service?.name === s.name && <Check size={16} className="text-rose flex-shrink-0 mt-0.5" />}
                    </div>
                    <p className="font-dmsans text-xs text-ink/55 mt-1 mb-3 leading-relaxed">{s.description}</p>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 font-dmsans text-xs text-ink/50">
                        <Clock size={11} />{s.duration} min
                      </span>
                      <span className="font-dmsans text-xs text-rose font-medium">{s.price}</span>
                    </div>
                  </button>
                ))}
              </div>

              <button
                disabled={!canStep2}
                onClick={() => setStep(2)}
                className="w-full bg-rose text-white font-dmsans font-medium py-4 rounded-full disabled:opacity-40 hover:bg-rose/85 transition-colors"
              >
                Continue — Select Date &amp; Time
              </button>
            </motion.div>
          )}

          {/* ── STEP 2: Date & Time ─────────────────────────────────────────── */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
              <button onClick={() => setStep(1)} className="flex items-center gap-1 font-dmsans text-sm text-ink/50 hover:text-rose mb-6 transition-colors">
                <ChevronLeft size={15} /> Back
              </button>
              <h2 className="font-cormorant text-4xl font-light text-charcoal mb-2">Pick a Date &amp; Time</h2>
              <p className="font-dmsans text-sm text-ink/55 mb-8">
                Booking <span className="text-rose font-medium">{service?.name}</span> · {service?.duration} min
              </p>

              {slotError && (
                <div className="bg-red-50 border border-red-200 text-red-700 font-dmsans text-sm rounded-xl px-4 py-3 mb-6">
                  {slotError} — please choose a different time.
                </div>
              )}

              {/* Calendar */}
              <div className="bg-white rounded-2xl border border-rose/10 p-6 mb-6">
                <div className="flex items-center justify-between mb-5">
                  <button onClick={() => setCurrentMonth((m) => subMonths(m, 1))} className="p-2 rounded-full hover:bg-rose/8 transition-colors">
                    <ChevronLeft size={18} className="text-ink/60" />
                  </button>
                  <span className="font-cormorant text-xl font-semibold text-charcoal">
                    {format(currentMonth, 'MMMM yyyy')}
                  </span>
                  <button onClick={() => setCurrentMonth((m) => addMonths(m, 1))} className="p-2 rounded-full hover:bg-rose/8 transition-colors">
                    <ChevronRight size={18} className="text-ink/60" />
                  </button>
                </div>
                <CalendarGrid
                  currentMonth={currentMonth}
                  selected={selectedDate}
                  onSelect={(d) => setSelectedDate(d)}
                />
              </div>

              {/* Time slots */}
              {selectedDate && (
                <div className="bg-white rounded-2xl border border-rose/10 p-6 mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={15} className="text-rose" />
                    <span className="font-dmsans text-sm font-medium text-charcoal">
                      {format(selectedDate, 'EEEE, d MMMM')}
                    </span>
                  </div>

                  {loadingSlots ? (
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-10 bg-ink/5 rounded-lg animate-pulse" />
                      ))}
                    </div>
                  ) : slots.length === 0 ? (
                    <p className="font-dmsans text-sm text-ink/50 text-center py-4">
                      No available slots for this date. Please try another day.
                    </p>
                  ) : (
                    <div className="grid grid-cols-4 gap-2">
                      {slots.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`py-2.5 text-xs font-dmsans font-medium rounded-lg border transition-all ${
                            selectedTime === t
                              ? 'bg-rose text-white border-rose'
                              : 'border-rose/20 text-ink hover:border-rose hover:text-rose'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <button
                disabled={!canStep3}
                onClick={() => setStep(3)}
                className="w-full bg-rose text-white font-dmsans font-medium py-4 rounded-full disabled:opacity-40 hover:bg-rose/85 transition-colors"
              >
                Continue — Enter Your Details
              </button>
            </motion.div>
          )}

          {/* ── STEP 3: Client details ──────────────────────────────────────── */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
              <button onClick={() => setStep(2)} className="flex items-center gap-1 font-dmsans text-sm text-ink/50 hover:text-rose mb-6 transition-colors">
                <ChevronLeft size={15} /> Back
              </button>
              <h2 className="font-cormorant text-4xl font-light text-charcoal mb-2">Your Details</h2>
              <p className="font-dmsans text-sm text-ink/55 mb-8">Almost there — just a few details so we can confirm your booking.</p>

              <div className="bg-white rounded-2xl border border-rose/10 p-6 space-y-5 mb-8">
                <Field label="Full Name" icon={<User size={15} />}>
                  <input
                    type="text"
                    placeholder="e.g. Priya Moonsamy"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full font-dmsans text-sm text-ink outline-none placeholder:text-ink/30"
                  />
                </Field>
                <Field label="Phone / WhatsApp" icon={<Phone size={15} />}>
                  <div className="flex items-center gap-2">
                    <span className="font-dmsans text-sm text-ink/50">+230</span>
                    <input
                      type="tel"
                      placeholder="5XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 font-dmsans text-sm text-ink outline-none placeholder:text-ink/30"
                    />
                  </div>
                </Field>
                <Field label="Notes (optional)" icon={<FileText size={15} />}>
                  <textarea
                    placeholder="Any allergies, preferences, or special requests…"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    className="w-full font-dmsans text-sm text-ink outline-none placeholder:text-ink/30 resize-none"
                  />
                </Field>
              </div>

              {/* Mini booking summary */}
              <div className="bg-rose/8 rounded-2xl p-5 mb-8 border border-rose/15">
                <p className="font-cormorant text-lg font-semibold text-charcoal mb-3">Booking Summary</p>
                <div className="space-y-1.5">
                  <Row label="Service"  value={service?.name} />
                  <Row label="Date"     value={selectedDate ? format(selectedDate, 'EEEE, d MMM yyyy') : ''} />
                  <Row label="Time"     value={selectedTime} />
                  <Row label="Duration" value={`${service?.duration} min`} />
                </div>
              </div>

              <button
                disabled={!canStep4}
                onClick={() => setStep(4)}
                className="w-full bg-rose text-white font-dmsans font-medium py-4 rounded-full disabled:opacity-40 hover:bg-rose/85 transition-colors"
              >
                Continue — Payment
              </button>
            </motion.div>
          )}

          {/* ── STEP 4: MCB Juice payment ───────────────────────────────────── */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
              <button onClick={() => setStep(3)} className="flex items-center gap-1 font-dmsans text-sm text-ink/50 hover:text-rose mb-6 transition-colors">
                <ChevronLeft size={15} /> Back
              </button>
              <h2 className="font-cormorant text-4xl font-light text-charcoal mb-2">Confirm &amp; Pay</h2>
              <p className="font-dmsans text-sm text-ink/55 mb-8">
                Pay your deposit via MCB Juice to confirm your slot.
              </p>

              {/* Booking summary */}
              <div className="bg-white rounded-2xl border border-rose/10 p-6 mb-6">
                <p className="font-cormorant text-lg font-semibold text-charcoal mb-3">Your Booking</p>
                <div className="space-y-1.5">
                  <Row label="Service"  value={service?.name} />
                  <Row label="Date"     value={selectedDate ? format(selectedDate, 'EEEE, d MMM yyyy') : ''} />
                  <Row label="Time"     value={selectedTime} />
                  <Row label="Name"     value={name} />
                  <Row label="Phone"    value={`+230 ${phone}`} />
                </div>
              </div>

              {/* MCB Juice payment card */}
              <div className="bg-charcoal rounded-2xl p-6 mb-6 text-white">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Smartphone size={20} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-dmsans font-semibold text-sm">Pay via MCB Juice</p>
                    <p className="font-dmsans text-xs text-white/50">Secure mobile payment</p>
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  <p className="font-dmsans text-xs text-white/50 uppercase tracking-widest">Send payment to</p>
                  <p className="font-cormorant text-2xl font-semibold text-gold">+230 5478 5001</p>
                  <p className="font-dmsans text-sm text-white/70">Bloom Avenue Le Spa</p>
                </div>

                <div className="bg-white/8 rounded-xl p-4 text-sm font-dmsans text-white/80 leading-relaxed">
                  <p className="font-semibold text-white mb-1">How to pay:</p>
                  <ol className="list-decimal list-inside space-y-1 text-white/70">
                    <li>Open MCB Juice on your phone</li>
                    <li>Tap <strong className="text-white">Send Money → Mobile Number</strong></li>
                    <li>Enter <strong className="text-white">5478 5001</strong> and the amount</li>
                    <li>Use reference: <strong className="text-white">{service?.name.split(' ')[0]} – {name}</strong></li>
                    <li>Copy the transaction reference below</li>
                  </ol>
                </div>
              </div>

              {/* Juice reference input */}
              <div className="bg-white rounded-2xl border border-rose/10 p-6 mb-8">
                <label className="font-dmsans text-sm font-medium text-charcoal block mb-3">
                  MCB Juice Transaction Reference <span className="text-ink/40 font-normal">(optional but recommended)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. TXN123456789"
                  value={juiceRef}
                  onChange={(e) => setJuiceRef(e.target.value)}
                  className="w-full font-dmsans text-sm text-ink border border-ink/15 rounded-xl px-4 py-3 outline-none focus:border-rose transition-colors"
                />
                <p className="font-dmsans text-xs text-ink/40 mt-2">
                  Adding your reference helps us confirm your payment faster.
                </p>
              </div>

              <button
                disabled={submitting}
                onClick={handleSubmit}
                className="w-full bg-rose text-white font-dmsans font-medium py-4 rounded-full disabled:opacity-60 hover:bg-rose/85 transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? 'Confirming…' : 'Confirm My Booking'}
              </button>
              <p className="font-dmsans text-xs text-ink/40 text-center mt-3">
                Your booking status will be <strong>Pending</strong> until we verify your Juice payment.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Small helpers ────────────────────────────────────────────────────────────
function Row({ label, value }) {
  return (
    <div className="flex justify-between font-dmsans text-sm">
      <span className="text-ink/50">{label}</span>
      <span className="text-charcoal font-medium">{value}</span>
    </div>
  )
}

function Field({ label, icon, children }) {
  return (
    <div className="border-b border-rose/10 pb-4 last:border-0 last:pb-0">
      <label className="flex items-center gap-1.5 font-dmsans text-xs text-ink/50 mb-2">
        {icon} {label}
      </label>
      {children}
    </div>
  )
}
