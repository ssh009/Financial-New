import { NextResponse } from 'next/server'
import { YahooRSSParser } from '../../../lib/rss-parser'
import { NewsProcessor } from '../../../lib/news-processor'

export async function POST() {
  const startTime = Date.now()
  
  try {
    console.log('=== Yahoo Finance 뉴스 수집 시작 ===')
    
    // 1. Supabase 연결 테스트
    const processor = new NewsProcessor()
    const connectionOk = await processor.testConnection()
    
    if (!connectionOk) {
      return NextResponse.json({
        success: false,
        error: 'Supabase 연결에 실패했습니다.',
        details: 'API 키와 URL을 확인해주세요.'
      }, { status: 500 })
    }

    // 2. RSS 파싱
    console.log('RSS 파싱 시작...')
    const parser = new YahooRSSParser()
    const newsItems = await parser.fetchFinanceNews()
    
    if (newsItems.length === 0) {
      return NextResponse.json({
        success: false,
        error: '수집된 뉴스가 없습니다.',
        details: 'RSS 피드에서 뉴스를 가져올 수 없습니다.'
      }, { status: 404 })
    }

    console.log(`${newsItems.length}개의 뉴스를 발견했습니다.`)
    
    // 3. Supabase에 저장
    console.log('Supabase에 저장 시작...')
    const result = await processor.saveToSupabase(newsItems)
    
    // 4. 결과 정리
    const endTime = Date.now()
    const duration = (endTime - startTime) / 1000
    
    const response = {
      success: true,
      message: `뉴스 수집이 완료되었습니다.`,
      statistics: {
        total: result.total,
        saved: result.saved,
        skipped: result.skipped,
        errors: result.errors,
        duration: `${duration}초`
      },
      details: result.details,
      timestamp: new Date().toISOString()
    }
    
    console.log('=== 뉴스 수집 완료 ===')
    console.log(`총 처리: ${result.total}, 저장: ${result.saved}, 건너뜀: ${result.skipped}, 에러: ${result.errors}`)
    console.log(`소요 시간: ${duration}초`)
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('뉴스 fetch 에러:', error)
    
    const endTime = Date.now()
    const duration = (endTime - startTime) / 1000
    
    return NextResponse.json({
      success: false,
      error: '뉴스를 가져오는데 실패했습니다.',
      details: error instanceof Error ? error.message : String(error),
      duration: `${duration}초`,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: '🗞️ Yahoo Finance 뉴스 수집 API',
    description: 'POST 요청으로 뉴스를 수집할 수 있습니다.',
    usage: {
      method: 'POST',
      endpoint: '/api/fetch-news',
      description: 'Yahoo Finance RSS에서 뉴스를 수집하여 Supabase에 저장합니다.'
    },
    features: [
      '✅ Yahoo Finance RSS 파싱',
      '✅ 중복 뉴스 자동 필터링',
      '✅ 카테고리별 자동 분류',
      '✅ 이미지 자동 추출',
      '✅ HTML 태그 정리',
      '✅ 에러 처리 및 로깅'
    ],
    status: 'ready',
    timestamp: new Date().toISOString()
  })
} 