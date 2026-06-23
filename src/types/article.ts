export interface Article {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  collection?: string
  sort?: number
  cover?: string
  published: boolean
  content: string
}

export interface ArticleMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  collection?: string
  sort?: number
  cover?: string
  published: boolean
}
