import { supabase } from './supabase'
import { NewsPost } from '../types/news'

// 모든 뉴스 게시물 가져오기
export async function getAllPosts(): Promise<NewsPost[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    throw error
  }

  return data || []
}

// 추천 게시물 가져오기
export async function getFeaturedPosts(): Promise<NewsPost[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(2)

  if (error) {
    console.error('Error fetching featured posts:', error)
    throw error
  }

  return data || []
}

// 최근 게시물 가져오기
export async function getRecentPosts(limit: number = 3): Promise<NewsPost[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent posts:', error)
    throw error
  }

  return data || []
}

// 카테고리별 게시물 가져오기
export async function getPostsByCategory(category: string): Promise<NewsPost[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts by category:', error)
    throw error
  }

  return data || []
} 