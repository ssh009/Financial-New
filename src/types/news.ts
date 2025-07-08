export interface NewsPost {
  id: number
  title: string
  description: string
  content?: string
  image_url: string
  category: string
  category_color: string
  author: string
  created_at: string
  published_date?: string
  is_featured?: boolean
}

export interface NewsCategory {
  id: number
  name: string
  color: string
} 