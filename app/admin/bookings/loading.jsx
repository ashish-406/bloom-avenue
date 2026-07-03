export default function BookingsLoading() {
  return (
    <div>
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="h-9 w-36 bg-ink/8 rounded-lg animate-pulse mb-2" />
          <div className="h-4 w-48 bg-ink/5 rounded animate-pulse" />
        </div>
        <div className="h-10 w-40 bg-ink/8 rounded-full animate-pulse" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-rose/10 p-5">
            <div className="h-3 w-24 bg-ink/8 rounded animate-pulse mb-3" />
            <div className="h-8 w-12 bg-ink/8 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-2 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 w-20 bg-ink/8 rounded-full animate-pulse" />
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-white rounded-2xl border border-rose/10 overflow-hidden">
        <div className="hidden md:block">
          <div className="border-b border-rose/10 px-6 py-4 flex gap-8">
            {['Client', 'Service', 'Date', 'Time', 'Status', 'Actions'].map((h) => (
              <div key={h} className="h-3 w-16 bg-ink/8 rounded animate-pulse" />
            ))}
          </div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-b border-rose/5 px-6 py-5 flex gap-8 items-center">
              <div className="flex-1 space-y-1.5">
                <div className="h-4 w-32 bg-ink/8 rounded animate-pulse" />
                <div className="h-3 w-24 bg-ink/5 rounded animate-pulse" />
              </div>
              <div className="h-4 w-40 bg-ink/8 rounded animate-pulse flex-1" />
              <div className="h-4 w-20 bg-ink/8 rounded animate-pulse" />
              <div className="h-4 w-12 bg-ink/8 rounded animate-pulse" />
              <div className="h-6 w-20 bg-ink/8 rounded-full animate-pulse" />
              <div className="h-7 w-16 bg-ink/8 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
