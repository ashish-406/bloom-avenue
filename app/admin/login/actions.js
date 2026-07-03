'use server'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(formData) {
  const password = formData.get('password')

  if (typeof password !== 'string' || password.length > 200) {
    redirect('/admin/login?error=1')
  }

  const isValid = password === process.env.ADMIN_PASSWORD

  if (!isValid) {
    // Constant-time delay — slows brute force without revealing timing info
    await new Promise((r) => setTimeout(r, 1000))
    redirect('/admin/login?error=1')
  }

  const secret = new TextEncoder().encode(process.env.ADMIN_SECRET)
  const token  = await new SignJWT({ admin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h') // shorter session — 8 hours is plenty for a work day
    .sign(secret)

  cookies().set('admin-token', token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    maxAge:   60 * 60 * 8,
    path:     '/',
    sameSite: 'lax',
  })

  redirect('/admin/bookings')
}

export async function logoutAction() {
  cookies().delete('admin-token')
  redirect('/admin/login')
}
