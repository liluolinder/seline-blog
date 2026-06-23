import fs from 'fs'
import path from 'path'
import type { Friend } from '@/types'

const dataFile = path.join(process.cwd(), 'content', 'friends', 'friends.json')

export function getAllFriends(): Friend[] {
  if (!fs.existsSync(dataFile)) return []

  const raw = fs.readFileSync(dataFile, 'utf-8')
  return JSON.parse(raw) as Friend[]
}

export function saveFriends(friends: Friend[]): void {
  const dir = path.dirname(dataFile)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(dataFile, JSON.stringify(friends, null, 2), 'utf-8')
}
