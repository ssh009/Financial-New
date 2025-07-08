-- 뉴스 테이블 생성
CREATE TABLE news (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  image_url VARCHAR(500) NOT NULL,
  category VARCHAR(50) NOT NULL,
  category_color VARCHAR(7) NOT NULL DEFAULT '#3498db',
  author VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_date TIMESTAMP WITH TIME ZONE,
  is_featured BOOLEAN DEFAULT FALSE
);

-- RLS (Row Level Security) 활성화
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 뉴스를 읽을 수 있도록 정책 설정
CREATE POLICY "Anyone can view news" ON news FOR SELECT USING (true);

-- 인덱스 생성 (성능 향상)
CREATE INDEX idx_news_created_at ON news(created_at DESC);
CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_news_is_featured ON news(is_featured);

-- 예시 데이터 삽입
INSERT INTO news (title, description, content, image_url, category, category_color, author, is_featured) VALUES
('한국 증시 급등세', '코스피가 3% 상승하며 강세를 보이고 있습니다.', '상세한 기사 내용...', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop', 'MARKET', '#e67e22', '김기자', true),
('미국 연준 금리 동결', '미연준이 기준금리를 동결했습니다.', '상세한 기사 내용...', 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=300&fit=crop', 'ECONOMY', '#3498db', '이기자', true),
('테슬라 주가 분석', '테슬라 주가가 최근 변동성을 보이고 있습니다.', '상세한 기사 내용...', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop', 'STOCKS', '#9b59b6', '박기자', false),
('비트코인 시장 동향', '암호화폐 시장이 회복세를 보이고 있습니다.', '상세한 기사 내용...', 'https://images.unsplash.com/photo-1518544866310-aa69c8c15d8a?w=400&h=200&fit=crop', 'CRYPTO', '#f39c12', '최기자', false),
('부동산 시장 전망', '2024년 부동산 시장 전망에 대해 알아봅니다.', '상세한 기사 내용...', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=200&fit=crop', 'REALESTATE', '#1abc9c', '정기자', false); 