import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { logoutAction } from './login/actions'

export const metadata = { title: 'Admin — Bloom Avenue Le Spa' }

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F8F5F0] flex flex-col">
      {/* Sidebar / top bar */}
      <header className="bg-charcoal text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div>
          <p className="font-cormorant text-xl font-semibold tracking-wide">Bloom Avenue</p>
          <p className="font-dmsans text-xs text-white/40 tracking-widest uppercase">Admin Dashboard</p>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/admin/bookings" className="font-dmsans text-sm text-white/70 hover:text-white transition-colors">
            Bookings
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="flex items-center gap-1.5 font-dmsans text-sm text-white/50 hover:text-rose transition-colors">
              <LogOut size={14} /> Logout
            </button>
          </form>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">{children}</main>
    </div>
  )
}
