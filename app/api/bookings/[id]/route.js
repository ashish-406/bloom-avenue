import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

async function verifyAdmin() {
  const token = cookies().get('admin-token')?.value
  if (!token) throw new Error('Unauthorized')
  await jwtVerify(token, new TextEncoder().encode(process.env.ADMIN_SECRET))
}

export async function PATCH(request, { params }) {
  try {
    await verifyAdmin()

    const { status } = await request.json()
    const allowed = ['pending', 'confirmed', 'cancelled', 'completed']

    if (!allowed.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (err) {
    if (err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('booking update error', err)
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}
