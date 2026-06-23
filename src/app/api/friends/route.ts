import { NextRequest, NextResponse } from 'next/server'
import { getAllFriends, saveFriends } from '@/lib/friends'

export async function GET() {
  const friends = getAllFriends()
  return NextResponse.json(friends)
}

export async function POST(request: NextRequest) {
  try {
    const friends = await request.json()
    saveFriends(friends)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save friends' }, { status: 500 })
  }
}
