import { NewsPost } from '../types/news'

// 가짜 뉴스 데이터 - 실제 서비스에서는 API나 크롤링으로 대체
export const mockNewsData: Record<string, NewsPost[]> = {
  MARKET: [
    {
      id: 101,
      title: "코스피 2,600선 돌파...외국인 순매수 지속",
      description: "코스피가 2,600선을 돌파하며 강세를 이어가고 있습니다. 외국인 투자자들의 순매수세가 지속되고 있어 상승세가 계속될 것으로 전망됩니다.",
      image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop",
      category: "MARKET",
      category_color: "#e67e22",
      author: "김시장",
      created_at: new Date('2024-01-15').toISOString(),
      is_featured: true
    },
    {
      id: 102,
      title: "나스닥 사상 최고치 경신...테크주 강세 지속",
      description: "나스닥이 사상 최고치를 경신했습니다. 인공지능 관련주를 중심으로 한 테크주 강세가 지속되고 있습니다.",
      image_url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=300&fit=crop",
      category: "MARKET",
      category_color: "#e67e22",
      author: "이주식",
      created_at: new Date('2024-01-14').toISOString(),
      is_featured: false
    },
    {
      id: 103,
      title: "원달러 환율 1,300원대 하락...수출기업 수익성 우려",
      description: "원달러 환율이 1,300원대로 하락하면서 수출기업들의 수익성에 대한 우려가 커지고 있습니다.",
      image_url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=300&fit=crop",
      category: "MARKET",
      category_color: "#e67e22",
      author: "박환율",
      created_at: new Date('2024-01-13').toISOString(),
      is_featured: false
    }
  ],
  
  ECONOMY: [
    {
      id: 201,
      title: "한국은행 기준금리 동결...인플레이션 압력 지속",
      description: "한국은행이 기준금리를 3.50%로 동결했습니다. 여전한 인플레이션 압력과 경기둔화 우려 사이에서 신중한 접근을 택했습니다.",
      image_url: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=300&fit=crop",
      category: "ECONOMY",
      category_color: "#3498db",
      author: "최경제",
      created_at: new Date('2024-01-15').toISOString(),
      is_featured: true
    },
    {
      id: 202,
      title: "12월 소비자물가 상승률 3.2%...안정세 진입",
      description: "12월 소비자물가 상승률이 3.2%를 기록하며 안정세에 진입했습니다. 전월 대비 0.1%p 하락한 수치입니다.",
      image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=300&fit=crop",
      category: "ECONOMY",
      category_color: "#3498db",
      author: "정물가",
      created_at: new Date('2024-01-14').toISOString(),
      is_featured: false
    },
    {
      id: 203,
      title: "2024년 경제성장률 전망 2.1%...내수 회복 기대",
      description: "2024년 경제성장률이 2.1%로 전망됩니다. 내수 회복과 수출 증가가 성장을 견인할 것으로 예상됩니다.",
      image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop",
      category: "ECONOMY",
      category_color: "#3498db",
      author: "김성장",
      created_at: new Date('2024-01-13').toISOString(),
      is_featured: false
    }
  ],
  
  STOCKS: [
    {
      id: 301,
      title: "삼성전자 목표주가 상향...반도체 슈퍼사이클 기대",
      description: "증권가에서 삼성전자 목표주가를 잇달아 상향 조정했습니다. AI 반도체 수요 증가로 슈퍼사이클이 예상됩니다.",
      image_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=300&fit=crop",
      category: "STOCKS",
      category_color: "#9b59b6",
      author: "이반도체",
      created_at: new Date('2024-01-15').toISOString(),
      is_featured: true
    },
    {
      id: 302,
      title: "테슬라 Q4 실적 서프라이즈...전기차 판매 급증",
      description: "테슬라가 4분기 실적에서 서프라이즈를 기록했습니다. 전기차 판매량이 전년 동기 대비 35% 증가했습니다.",
      image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop",
      category: "STOCKS",
      category_color: "#9b59b6",
      author: "박전기차",
      created_at: new Date('2024-01-14').toISOString(),
      is_featured: false
    },
    {
      id: 303,
      title: "카카오페이 IPO 재추진...핀테크 밸류 재평가",
      description: "카카오페이가 IPO를 재추진합니다. 핀테크 기업들의 밸류에이션이 재평가되고 있습니다.",
      image_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=300&fit=crop",
      category: "STOCKS",
      category_color: "#9b59b6",
      author: "최핀테크",
      created_at: new Date('2024-01-13').toISOString(),
      is_featured: false
    }
  ],
  
  CRYPTO: [
    {
      id: 401,
      title: "비트코인 45,000달러 돌파...ETF 승인 기대감",
      description: "비트코인이 45,000달러를 돌파했습니다. 비트코인 ETF 승인에 대한 기대감이 가격 상승을 견인하고 있습니다.",
      image_url: "https://images.unsplash.com/photo-1518544866310-aa69c8c15d8a?w=600&h=300&fit=crop",
      category: "CRYPTO",
      category_color: "#f39c12",
      author: "김비트코인",
      created_at: new Date('2024-01-15').toISOString(),
      is_featured: true
    },
    {
      id: 402,
      title: "이더리움 2.0 업그레이드 완료...네트워크 효율성 개선",
      description: "이더리움 2.0 업그레이드가 완료되어 네트워크 효율성이 크게 개선되었습니다. 거래 수수료도 대폭 절감되었습니다.",
      image_url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=300&fit=crop",
      category: "CRYPTO",
      category_color: "#f39c12",
      author: "이이더리움",
      created_at: new Date('2024-01-14').toISOString(),
      is_featured: false
    },
    {
      id: 403,
      title: "알트코인 시장 활성화...디파이 토큰 급등",
      description: "알트코인 시장이 활성화되면서 디파이 관련 토큰들이 급등하고 있습니다. 새로운 프로토콜 출시가 이어지고 있습니다.",
      image_url: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&h=300&fit=crop",
      category: "CRYPTO",
      category_color: "#f39c12",
      author: "최디파이",
      created_at: new Date('2024-01-13').toISOString(),
      is_featured: false
    }
  ],
  
  REALESTATE: [
    {
      id: 501,
      title: "서울 아파트 가격 상승세 둔화...정부 정책 효과",
      description: "서울 아파트 가격 상승세가 둔화되고 있습니다. 정부의 부동산 정책이 효과를 보이고 있는 것으로 분석됩니다.",
      image_url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=300&fit=crop",
      category: "REALESTATE",
      category_color: "#1abc9c",
      author: "박부동산",
      created_at: new Date('2024-01-15').toISOString(),
      is_featured: true
    },
    {
      id: 502,
      title: "전세 시장 안정화...월세 전환 증가",
      description: "전세 시장이 안정화되면서 월세로 전환하는 사례가 증가하고 있습니다. 전세보증금 반환 리스크가 감소하고 있습니다.",
      image_url: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=300&fit=crop",
      category: "REALESTATE",
      category_color: "#1abc9c",
      author: "이전세",
      created_at: new Date('2024-01-14').toISOString(),
      is_featured: false
    },
    {
      id: 503,
      title: "리츠 시장 성장세...부동산 간접투자 확대",
      description: "리츠 시장이 성장세를 보이며 부동산 간접투자가 확대되고 있습니다. 개인 투자자들의 관심이 높아지고 있습니다.",
      image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=300&fit=crop",
      category: "REALESTATE",
      category_color: "#1abc9c",
      author: "정리츠",
      created_at: new Date('2024-01-13').toISOString(),
      is_featured: false
    }
  ]
}

// 전체 뉴스 데이터 (모든 카테고리 합침)
export const getAllMockNews = (): NewsPost[] => {
  return Object.values(mockNewsData).flat()
}

// 카테고리별 뉴스 데이터
export const getMockNewsByCategory = (category: string): NewsPost[] => {
  if (category === 'ALL') {
    return getAllMockNews()
  }
  return mockNewsData[category] || []
}

// 추천 뉴스 (is_featured: true)
export const getFeaturedMockNews = (): NewsPost[] => {
  return getAllMockNews().filter(news => news.is_featured)
}

// 최신 뉴스 (created_at 기준)
export const getRecentMockNews = (limit: number = 5): NewsPost[] => {
  return getAllMockNews()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit)
} 