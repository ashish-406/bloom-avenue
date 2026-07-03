import { loginAction } from './actions'

export const metadata = { title: 'Admin Login — Bloom Avenue Le Spa' }

export default function LoginPage({ searchParams }) {
  const error = searchParams?.error

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-cormorant text-3xl font-semibold text-charcoal">Bloom Avenue</p>
          <p className="font-cormorant text-sm text-rose tracking-[0.25em] uppercase mt-0.5">Le Spa · Admin</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-rose/10 p-8">
          <h1 className="font-cormorant text-2xl font-semibold text-charcoal mb-6">Sign In</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 font-dmsans text-sm rounded-xl px-4 py-3 mb-5">
              Invalid password. Please try again.
            </div>
          )}

          <form action={loginAction} className="space-y-5">
            <div>
              <label className="font-dmsans text-xs text-ink/50 block mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                required
                autoFocus
                className="w-full font-dmsans text-sm border border-ink/15 rounded-xl px-4 py-3 outline-none focus:border-rose transition-colors"
                placeholder="Enter admin password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-rose text-white font-dmsans font-medium py-3.5 rounded-full hover:bg-rose/85 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center font-dmsans text-xs text-ink/30 mt-6">
          <a href="/" className="hover:text-rose transition-colors">← Back to website</a>
        </p>
      </div>
    </div>
  )
}
