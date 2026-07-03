'use server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { createServerClient } from '@/lib/supabase-server'

async function verifyAdmin() {
  const token = cookies().get('admin-token')?.value
  if (!token) throw new Error('Unauthorized')
  await jwtVerify(token, new TextEncoder().encode(process.env.ADMIN_SECRET))
}

export async function updateStatus(id, status) {
  await verifyAdmin()
  const supabase = createServerClient()
  await supabase.from('bookings').update({ status }).eq('id', id)
  revalidatePath('/admin/bookings')
}
