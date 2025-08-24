import { supabase } from './supabase'
import { YahooNewsItem } from './rss-parser'

export class NewsProcessor {
  async saveToSupabase(newsItems: YahooNewsItem[]): Promise<{
    total: number
    saved: number
    skipped: number
    errors: number
    details: string[]
  }> {
    let savedCount = 0
    let skippedCount = 0
    let errorCount = 0
    const details: string[] = []
    
    console.log(`처리할 뉴스 개수: ${newsItems.length}`)
    
    for (const item of newsItems) {
      try {
        // 중복 체크 (제목 기준 - 더 정확한 중복 검사)
        const { data: existing, error: checkError } = await supabase
          .from('news')
          .select('id, title')
          .eq('title', item.title)
          .maybeSingle()

        if (checkError && checkError.code !== 'PGRST116') {
          console.error('중복 체크 에러:', checkError)
          errorCount++
          details.push(`중복 체크 실패: ${item.title}`)
          continue
        }

        if (existing) {
          console.log(`중복 뉴스 스킵: ${item.title.substring(0, 50)}...`)
          skippedCount++
          details.push(`중복 스킵: ${item.title.substring(0, 50)}...`)
          continue
        }

        // 새 뉴스 저장
        const newsData = {
          title: item.title,
          description: this.cleanDescription(item.description),
          content: item.description, // 전체 내용도 저장
          image_url: item.image,
          category: item.category,
          category_color: this.getCategoryColor(item.category),
          author: 'Yahoo Finance',
          source_url: item.link, // ✅ 다시 활성화!
          published_date: new Date(item.pubDate).toISOString(),
          is_featured: this.shouldBeFeatured(item, savedCount) // 첫 번째 뉴스들을 featured로 설정
        }

        const { error: insertError } = await supabase
          .from('news')
          .insert(newsData)

        if (insertError) {
          console.error('저장 실패:', insertError.message)
          errorCount++
          details.push(`저장 실패: ${item.title.substring(0, 50)}... - ${insertError.message}`)
        } else {
          savedCount++
          console.log(`저장 성공: ${item.title.substring(0, 50)}...`)
          details.push(`저장 성공: ${item.title.substring(0, 50)}...`)
        }
      } catch (error) {
        console.error('처리 실패:', item.title, error)
        errorCount++
        details.push(`처리 실패: ${item.title.substring(0, 50)}... - ${error}`)
      }
    }
    
    const result = {
      total: newsItems.length,
      saved: savedCount,
      skipped: skippedCount,
      errors: errorCount,
      details
    }
    
    console.log('처리 완료:', result)
    return result
  }

  private cleanDescription(description: string): string {
    if (!description) return ''
    
    return description
      .replace(/<[^>]*>/g, '') // HTML 태그 제거
      .replace(/&nbsp;/g, ' ') // 공백 엔티티 제거
      .replace(/&amp;/g, '&') // & 엔티티 복원
      .replace(/&lt;/g, '<') // < 엔티티 복원
      .replace(/&gt;/g, '>') // > 엔티티 복원
      .replace(/&quot;/g, '"') // 따옴표 엔티티 복원
      .replace(/&#x27;/g, "'") // 작은따옴표 엔티티 복원
      .replace(/\s+/g, ' ') // 연속된 공백 정리
      .substring(0, 300) // 길이 제한 (description 필드용)
      .trim()
  }

  private getCategoryColor(category: string): string {
    const colors = {
      'MARKET': '#e67e22',    // 주황색 - 시장
      'ECONOMY': '#3498db',   // 파란색 - 경제
      'STOCKS': '#9b59b6',    // 보라색 - 주식
      'CRYPTO': '#f39c12',    // 노란색 - 암호화폐
      'REALESTATE': '#1abc9c' // 청록색 - 부동산
    }
    return colors[category as keyof typeof colors] || '#7f8c8d'
  }

  private shouldBeFeatured(item: YahooNewsItem, currentSavedCount: number): boolean {
    // 처음 저장되는 2개의 뉴스를 featured로 설정
    // 또는 제목에 특정 키워드가 있는 경우
    const featuredKeywords = ['주요', '긴급', '속보', '중요', '급등', '급락', '발표']
    const hasKeyword = featuredKeywords.some(keyword => 
      item.title.includes(keyword) || item.description.includes(keyword)
    )
    
    return currentSavedCount < 2 || hasKeyword
  }

  // 테스트용 메서드 - Supabase 연결 확인
  async testConnection(): Promise<boolean> {
    try {
      // 단순히 테이블에서 1개 레코드만 가져와서 연결 테스트
      const { data, error } = await supabase
        .from('news')
        .select('id')
        .limit(1)

      if (error) {
        console.error('Supabase 연결 테스트 실패:', error)
        return false
      }

      console.log('Supabase 연결 성공 - 테이블 접근 가능')
      return true
    } catch (error) {
      console.error('Supabase 연결 에러:', error)
      return false
    }
  }

  // 오래된 뉴스 정리 (선택사항)
  async cleanupOldNews(daysToKeep: number = 30): Promise<number> {
    try {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)

      const { data, error } = await supabase
        .from('news')
        .delete()
        .lt('created_at', cutoffDate.toISOString())
        .select('id')

      if (error) {
        console.error('오래된 뉴스 정리 실패:', error)
        return 0
      }

      const deletedCount = data?.length || 0
      console.log(`${deletedCount}개의 오래된 뉴스를 정리했습니다.`)
      return deletedCount
    } catch (error) {
      console.error('뉴스 정리 에러:', error)
      return 0
    }
  }
} 