'use server'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { redirect } from 'next/navigation'

function secret() {
  return new TextEncoder().encode(process.env.ADMIN_SECRET)
}

// Use in server components — redirects to login if not authenticated
export async function requireAdmin() {
  const token = cookies().get('admin-token')?.value
  if (!token) redirect('/admin/login')
  try {
    await jwtVerify(token, secret(), { algorithms: ['HS256'] })
  } catch {
    redirect('/admin/login')
  }
}

// Use in server actions — throws if not authenticated
export async function verifyAdmin() {
  const token = cookies().get('admin-token')?.value
  if (!token) throw new Error('Unauthorized')
  await jwtVerify(token, secret(), { algorithms: ['HS256'] })
}
