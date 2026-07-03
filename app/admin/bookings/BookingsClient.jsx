'use client'
import { useState, useTransition } from 'react'
import { format, parseISO } from 'date-fns'
import { Check, X, CheckCheck, Clock, Phone, Calendar, Scissors } from 'lucide-react'
import { updateStatus } from './actions'

const STATUS_STYLES = {
  pending:   'bg-gold/15 text-yellow-700 border-gold/30',
  confirmed: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
  completed: 'bg-ink/8 text-ink/60 border-ink/15',
}

const STATUS_LABELS = {
  pending:   'Pending',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
  completed: 'Completed',
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center font-dmsans text-xs font-medium border rounded-full px-2.5 py-1 ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  )
}

function ActionButtons({ booking }) {
  const [, startTransition] = useTransition()

  const act = (status) => startTransition(() => updateStatus(booking.id, status))

  return (
    <div className="flex items-center gap-1.5">
      {booking.status === 'pending' && (
        <>
          <button onClick={() => act('confirmed')} title="Confirm"
            className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
            <Check size={14} />
          </button>
          <button onClick={() => act('cancelled')} title="Cancel"
            className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
            <X size={14} />
          </button>
        </>
      )}
      {booking.status === 'confirmed' && (
        <>
          <button onClick={() => act('completed')} title="Mark Complete"
            className="p-1.5 rounded-lg bg-ink/8 text-ink/60 hover:bg-ink/15 transition-colors">
            <CheckCheck size={14} />
          </button>
          <button onClick={() => act('cancelled')} title="Cancel"
            className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
            <X size={14} />
          </button>
        </>
      )}
      {(booking.status === 'cancelled' || booking.status === 'completed') && (
        <button onClick={() => act('pending')} title="Reopen"
          className="p-1.5 rounded-lg bg-rose/8 text-rose hover:bg-rose/15 transition-colors">
          <Clock size={14} />
        </button>
      )}
    </div>
  )
}

export default function BookingsClient({ bookings, stats, currentFilter }) {
  const [filter, setFilter] = useState(currentFilter || 'all')

  const filters = [
    { key: 'all',      label: 'All' },
    { key: 'today',    label: 'Today' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'pending',  label: 'Pending' },
  ]

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-cormorant text-4xl font-semibold text-charcoal">Bookings</h1>
          <p className="font-dmsans text-sm text-ink/50 mt-1">Manage all appointments</p>
        </div>
        <a
          href="/book"
          target="_blank"
          className="font-dmsans text-sm font-medium bg-rose text-white px-5 py-2.5 rounded-full hover:bg-rose/85 transition-colors"
        >
          View Booking Page ↗
        </a>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Today's Bookings", value: stats.today,     icon: Calendar },
          { label: 'Pending Review',   value: stats.pending,   icon: Clock },
          { label: 'Confirmed',        value: stats.confirmed, icon: Check },
          { label: 'Total',            value: stats.total,     icon: CheckCheck },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white rounded-2xl border border-rose/10 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Icon size={14} className="text-rose" />
              <p className="font-dmsans text-xs text-ink/50">{label}</p>
            </div>
            <p className="font-cormorant text-3xl font-semibold text-charcoal">{value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {filters.map(({ key, label }) => (
          <a
            key={key}
            href={`/admin/bookings?filter=${key}`}
            className={`font-dmsans text-sm px-4 py-2 rounded-full border transition-all ${
              currentFilter === key || (!currentFilter && key === 'all')
                ? 'bg-charcoal text-white border-charcoal'
                : 'border-ink/15 text-ink/60 hover:border-charcoal/40 hover:text-ink'
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Bookings table */}
      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-rose/10 p-16 text-center">
          <p className="font-cormorant text-2xl text-charcoal mb-2">No bookings found</p>
          <p className="font-dmsans text-sm text-ink/50">Bookings will appear here once clients start reserving.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-rose/10 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-rose/10">
                  {['Client', 'Service', 'Date', 'Time', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left font-dmsans text-xs text-ink/40 font-medium px-6 py-4 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-rose/5">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-rose/3 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-dmsans text-sm font-medium text-charcoal">{b.client_name}</p>
                      <a href={`tel:+230${b.client_phone}`} className="font-dmsans text-xs text-rose hover:underline">{b.client_phone}</a>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-dmsans text-sm text-ink">{b.service_name}</p>
                      <p className="font-dmsans text-xs text-ink/40">{b.duration_minutes} min</p>
                    </td>
                    <td className="px-6 py-4 font-dmsans text-sm text-ink">
                      {format(parseISO(b.booking_date), 'EEE d MMM')}
                    </td>
                    <td className="px-6 py-4 font-dmsans text-sm text-ink font-medium">
                      {b.booking_time.slice(0, 5)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={b.status} />
                      {b.juice_reference && (
                        <p className="font-dmsans text-xs text-ink/40 mt-1">Ref: {b.juice_reference}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <ActionButtons booking={b} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-rose/8">
            {bookings.map((b) => (
              <div key={b.id} className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-dmsans font-medium text-charcoal">{b.client_name}</p>
                    <a href={`tel:${b.client_phone}`} className="font-dmsans text-xs text-rose">{b.client_phone}</a>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
                <div className="space-y-1 mb-4">
                  <div className="flex items-center gap-2 font-dmsans text-sm text-ink/70">
                    <Scissors size={12} className="text-rose" />
                    {b.service_name} · {b.duration_minutes} min
                  </div>
                  <div className="flex items-center gap-2 font-dmsans text-sm text-ink/70">
                    <Calendar size={12} className="text-rose" />
                    {format(parseISO(b.booking_date), 'EEEE, d MMM yyyy')} at {b.booking_time.slice(0, 5)}
                  </div>
                  {b.juice_reference && (
                    <p className="font-dmsans text-xs text-ink/40">Juice ref: {b.juice_reference}</p>
                  )}
                </div>
                <ActionButtons booking={b} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
