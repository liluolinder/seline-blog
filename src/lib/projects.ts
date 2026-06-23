import fs from 'fs'
import path from 'path'
import type { Project } from '@/types'

const dataFile = path.join(process.cwd(), 'content', 'projects', 'projects.json')

export function getAllProjects(): Project[] {
  if (!fs.existsSync(dataFile)) return []

  const raw = fs.readFileSync(dataFile, 'utf-8')
  return JSON.parse(raw) as Project[]
}

export function saveProjects(projects: Project[]): void {
  const dir = path.dirname(dataFile)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(dataFile, JSON.stringify(projects, null, 2), 'utf-8')
}
