import { NextRequest, NextResponse } from 'next/server'
import { getAllProjects, saveProjects } from '@/lib/projects'

export async function GET() {
  const projects = getAllProjects()
  return NextResponse.json(projects)
}

export async function POST(request: NextRequest) {
  try {
    const projects = await request.json()
    saveProjects(projects)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save projects' }, { status: 500 })
  }
}
