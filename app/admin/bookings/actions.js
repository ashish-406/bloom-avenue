'use server'
import { revalidatePath } from 'next/cache'
import { verifyAdmin } from '@/lib/auth'
import { createServerClient } from '@/lib/supabase-server'

const ALLOWED_STATUSES = new Set(['pending', 'confirmed', 'cancelled', 'completed'])

export async function updateStatus(id, status) {
  await verifyAdmin()

  if (!ALLOWED_STATUSES.has(status)) {
    throw new Error('Invalid status')
  }
  if (typeof id !== 'string' || id.length > 40) {
    throw new Error('Invalid booking ID')
  }

  const supabase = createServerClient()
  const { error } = await supabase.from('bookings').update({ status }).eq('id', id)
  if (error) throw error

  revalidatePath('/admin/bookings')
}
