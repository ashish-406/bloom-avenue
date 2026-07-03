'use client'
import { useState, useTransition, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { format, parseISO } from 'date-fns'
import { Check, X, CheckCheck, Clock, Phone, Calendar, Scissors, MessageCircle, RefreshCw } from 'lucide-react'
import { updateStatus } from './actions'

const STATUS_STYLES = {
  pending:   'bg-amber-50 text-amber-700 border-amber-200',
  confirmed: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
  completed: 'bg-ink/8 text-ink/55 border-ink/15',
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
          <button onClick={() => act('confirmed')} title="Confirm booking"
            className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
            <Check size={14} />
          </button>
          <button onClick={() => act('cancelled')} title="Cancel booking"
            className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
            <X size={14} />
          </button>
        </>
      )}
      {booking.status === 'confirmed' && (
        <>
          <button onClick={() => act('completed')} title="Mark as completed"
            className="p-1.5 rounded-lg bg-ink/8 text-ink/60 hover:bg-ink/15 transition-colors">
            <CheckCheck size={14} />
          </button>
          <button onClick={() => act('cancelled')} title="Cancel booking"
            className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
            <X size={14} />
          </button>
        </>
      )}
      {(booking.status === 'cancelled' || booking.status === 'completed') && (
        <button onClick={() => act('pending')} title="Reopen booking"
          className="p-1.5 rounded-lg bg-rose/8 text-rose hover:bg-rose/15 transition-colors">
          <Clock size={14} />
        </button>
      )}
      {/* Quick WhatsApp to client */}
      <a
        href={`https://wa.me/230${booking.client_phone.replace(/\D/g, '')}?text=${encodeURIComponent(
          `Hi ${booking.client_name}! This is Bloom Avenue Le Spa regarding your ${booking.service_name} appointment on ${format(parseISO(booking.booking_date), 'd MMM yyyy')} at ${booking.booking_time.slice(0, 5)}.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp client"
        className="p-1.5 rounded-lg bg-rose/8 text-rose hover:bg-rose/15 transition-colors"
      >
        <MessageCircle size={14} />
      </a>
    </div>
  )
}

export default function BookingsClient({ bookings, stats, currentFilter, currentPage, pageSize }) {
  const router  = useRouter()
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [refreshing, setRefreshing]   = useState(false)

  const refresh = useCallback(() => {
    setRefreshing(true)
    router.refresh()
    setLastRefresh(new Date())
    setTimeout(() => setRefreshing(false), 800)
  }, [router])

  // Auto-refresh every 30 seconds so new bookings appear without manual reload
  useEffect(() => {
    const id = setInterval(refresh, 30_000)
    return () => clearInterval(id)
  }, [refresh])

  const filters = [
    { key: 'all',      label: 'All' },
    { key: 'today',    label: 'Today' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'pending',  label: `Pending${stats.pending > 0 ? ` (${stats.pending})` : ''}` },
  ]

  return (
    <div>
      {/* Pending alert banner */}
      {stats.pending > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <p className="font-dmsans text-sm text-amber-800 font-medium">
              {stats.pending} booking{stats.pending > 1 ? 's' : ''} waiting for your confirmation
            </p>
          </div>
          <a
            href="/admin/bookings?filter=pending"
            className="font-dmsans text-xs font-semibold text-amber-700 hover:text-amber-900 transition-colors"
          >
            Review →
          </a>
        </div>
      )}

      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-cormorant text-4xl font-semibold text-charcoal">Bookings</h1>
          <p className="font-dmsans text-sm text-ink/50 mt-1">
            Auto-refreshes every 30 s · Last updated {format(lastRefresh, 'HH:mm:ss')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={refresh}
            title="Refresh now"
            className={`p-2.5 rounded-full border border-ink/15 text-ink/50 hover:text-rose hover:border-rose/30 transition-all ${refreshing ? 'animate-spin text-rose' : ''}`}
          >
            <RefreshCw size={16} />
          </button>
          <a
            href="/book"
            target="_blank"
            className="font-dmsans text-sm font-medium bg-rose text-white px-5 py-2.5 rounded-full hover:bg-rose/85 transition-colors"
          >
            View Booking Page ↗
          </a>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Today's Appointments", value: stats.today,     icon: Calendar, accent: false },
          { label: 'Awaiting Confirmation', value: stats.pending,   icon: Clock,    accent: stats.pending > 0 },
          { label: 'Confirmed',             value: stats.confirmed, icon: Check,    accent: false },
          { label: 'Total Bookings',        value: stats.total,     icon: CheckCheck, accent: false },
        ].map(({ label, value, icon: Icon, accent }) => (
          <div key={label} className={`rounded-2xl border p-5 ${accent ? 'bg-amber-50 border-amber-200' : 'bg-white border-rose/10'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Icon size={14} className={accent ? 'text-amber-600' : 'text-rose'} />
              <p className={`font-dmsans text-xs ${accent ? 'text-amber-700' : 'text-ink/50'}`}>{label}</p>
            </div>
            <p className={`font-cormorant text-3xl font-semibold ${accent ? 'text-amber-700' : 'text-charcoal'}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
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
                <tr className="border-b border-rose/10 bg-ivory/50">
                  {['Client', 'Service', 'Date & Time', 'Notes', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left font-dmsans text-xs text-ink/40 font-medium px-5 py-4 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-rose/5">
                {bookings.map((b) => (
                  <tr
                    key={b.id}
                    className={`hover:bg-rose/3 transition-colors ${b.status === 'pending' ? 'bg-amber-50/40' : ''}`}
                  >
                    <td className="px-5 py-4">
                      <p className="font-dmsans text-sm font-medium text-charcoal">{b.client_name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <a
                          href={`tel:+230${b.client_phone.replace(/\D/g, '')}`}
                          className="font-dmsans text-xs text-rose hover:underline flex items-center gap-1"
                        >
                          <Phone size={10} />+230 {b.client_phone}
                        </a>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-dmsans text-sm text-ink">{b.service_name}</p>
                      <p className="font-dmsans text-xs text-ink/40">{b.duration_minutes} min</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-dmsans text-sm text-ink font-medium">
                        {format(parseISO(b.booking_date), 'EEE d MMM')}
                      </p>
                      <p className="font-dmsans text-xs text-rose">{b.booking_time.slice(0, 5)}</p>
                    </td>
                    <td className="px-5 py-4 max-w-[180px]">
                      {b.notes && (
                        <p className="font-dmsans text-xs text-ink/60 truncate" title={b.notes}>{b.notes}</p>
                      )}
                      {b.juice_reference && (
                        <p className="font-dmsans text-xs text-ink/40 mt-0.5">Juice: {b.juice_reference}</p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="px-5 py-4">
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
              <div
                key={b.id}
                className={`p-5 ${b.status === 'pending' ? 'bg-amber-50/30' : ''}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-dmsans font-medium text-charcoal">{b.client_name}</p>
                    <a
                      href={`tel:+230${b.client_phone.replace(/\D/g, '')}`}
                      className="font-dmsans text-xs text-rose flex items-center gap-1 mt-0.5"
                    >
                      <Phone size={10} />+230 {b.client_phone}
                    </a>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 font-dmsans text-sm text-ink/70">
                    <Scissors size={12} className="text-rose flex-shrink-0" />
                    {b.service_name} · {b.duration_minutes} min
                  </div>
                  <div className="flex items-center gap-2 font-dmsans text-sm text-ink/70">
                    <Calendar size={12} className="text-rose flex-shrink-0" />
                    {format(parseISO(b.booking_date), 'EEEE, d MMM yyyy')} at {b.booking_time.slice(0, 5)}
                  </div>
                  {b.notes && (
                    <p className="font-dmsans text-xs text-ink/50 pl-5">{b.notes}</p>
                  )}
                  {b.juice_reference && (
                    <p className="font-dmsans text-xs text-ink/40 pl-5">Juice ref: {b.juice_reference}</p>
                  )}
                </div>
                <ActionButtons booking={b} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      {bookings.length === pageSize && (
        <div className="flex justify-center mt-6">
          <a
            href={`/admin/bookings?filter=${currentFilter}&page=${currentPage + 1}`}
            className="font-dmsans text-sm text-ink/60 border border-ink/15 rounded-full px-6 py-2.5 hover:border-rose/40 hover:text-rose transition-all"
          >
            Load more
          </a>
        </div>
      )}
    </div>
  )
}
