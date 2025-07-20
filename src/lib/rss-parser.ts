import Parser from 'rss-parser'

export interface YahooNewsItem {
  title: string
  description: string
  link: string
  pubDate: string
  category: string
  image: string
}

export class YahooRSSParser {
  private parser: Parser
  
  constructor() {
    this.parser = new Parser({
      customFields: {
        item: ['media:content', 'media:thumbnail', 'media:group']
      }
    })
  }

  async fetchFinanceNews(): Promise<YahooNewsItem[]> {
    const feeds = [
      { 
        url: 'https://feeds.finance.yahoo.com/rss/2.0/headline', 
        category: 'MARKET',
        name: '시장'
      },
      { 
        url: 'https://feeds.finance.yahoo.com/rss/2.0/headline?s=^GSPC,^DJI,^IXIC', 
        category: 'STOCKS',
        name: '주식'
      },
      { 
        url: 'https://finance.yahoo.com/news/rss', 
        category: 'ECONOMY',
        name: '경제'
      }
    ]

    const allNews: YahooNewsItem[] = []
    
    for (const feed of feeds) {
      try {
        console.log(`${feed.name} 뉴스 가져오는 중... ${feed.url}`)
        
        const parsed = await this.parser.parseURL(feed.url)
        console.log(`${feed.name}: ${parsed.items.length}개 아이템 발견`)
        
        const items = parsed.items.slice(0, 5).map((item, index) => ({
          title: item.title || `${feed.name} 뉴스 ${index + 1}`,
          description: this.cleanDescription(item.contentSnippet || item.content || item.title || ''),
          link: item.link || '',
          pubDate: item.pubDate || new Date().toISOString(),
          category: feed.category,
          image: this.extractImage(item) || this.getDefaultImage(feed.category)
        }))
        
        allNews.push(...items)
      } catch (error) {
        console.error(`${feed.name} 피드 에러:`, error)
        // 에러 발생 시에도 가짜 데이터로 대체
        allNews.push(...this.createFallbackNews(feed.category, feed.name))
      }
    }
    
    console.log(`총 ${allNews.length}개의 뉴스 수집 완료`)
    return allNews
  }

  private cleanDescription(description: string): string {
    if (!description) return ''
    
    return description
      .replace(/<[^>]*>/g, '') // HTML 태그 제거
      .replace(/&[^;]+;/g, ' ') // HTML 엔티티 제거
      .replace(/\s+/g, ' ') // 연속된 공백 정리
      .substring(0, 150) // 길이 제한
      .trim()
  }

  private extractImage(item: any): string | null {
    try {
      // Yahoo RSS의 다양한 이미지 소스 확인
      if (item['media:content'] && item['media:content'].$ && item['media:content'].$.url) {
        return item['media:content'].$.url
      }
      
      if (item['media:thumbnail'] && item['media:thumbnail'].$ && item['media:thumbnail'].$.url) {
        return item['media:thumbnail'].$.url
      }
      
      if (item['media:group'] && item['media:group']['media:content']) {
        const content = item['media:group']['media:content']
        if (Array.isArray(content) && content[0] && content[0].$ && content[0].$.url) {
          return content[0].$.url
        }
      }
      
      // 설명에서 이미지 URL 추출 시도
      if (item.content) {
        const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/i)
        if (imgMatch) {
          return imgMatch[1]
        }
      }
      
      return null
    } catch (error) {
      console.warn('이미지 추출 실패:', error)
      return null
    }
  }

  private getDefaultImage(category: string): string {
    const defaultImages = {
      'MARKET': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop',
      'ECONOMY': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=300&fit=crop',
      'STOCKS': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=300&fit=crop',
      'CRYPTO': 'https://images.unsplash.com/photo-1518544866310-aa69c8c15d8a?w=600&h=300&fit=crop',
      'REALESTATE': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=300&fit=crop'
    }
    
    return defaultImages[category as keyof typeof defaultImages] || 
           'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=300&fit=crop'
  }

  private createFallbackNews(category: string, categoryName: string): YahooNewsItem[] {
    // 네트워크 에러 시 대체용 뉴스
    return [{
      title: `${categoryName} 뉴스를 불러오는 중 문제가 발생했습니다`,
      description: `${categoryName} 관련 최신 뉴스를 가져오지 못했습니다. 잠시 후 다시 시도해주세요.`,
      link: '#',
      pubDate: new Date().toISOString(),
      category: category,
      image: this.getDefaultImage(category)
    }]
  }
} 