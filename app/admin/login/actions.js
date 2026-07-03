'use server'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(formData) {
  const password = formData.get('password')

  if (password !== process.env.ADMIN_PASSWORD) {
    redirect('/admin/login?error=1')
  }

  const secret = new TextEncoder().encode(process.env.ADMIN_SECRET)
  const token  = await new SignJWT({ admin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret)

  cookies().set('admin-token', token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    maxAge:   60 * 60 * 24 * 7,
    path:     '/',
    sameSite: 'lax',
  })

  redirect('/admin/bookings')
}

export async function logoutAction() {
  cookies().delete('admin-token')
  redirect('/admin/login')
}
