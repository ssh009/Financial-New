-- ⚠️  기존 테이블이 있다면 먼저 삭제
DROP TABLE IF EXISTS news;

-- 🏗️  완전한 news 테이블 생성 (source_url 포함)
CREATE TABLE news (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  image_url VARCHAR(500) NOT NULL,
  category VARCHAR(50) NOT NULL,
  category_color VARCHAR(7) NOT NULL DEFAULT '#3498db',
  author VARCHAR(100) NOT NULL,
  source_url VARCHAR(500), -- ✅ 추가된 컬럼!
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_date TIMESTAMP WITH TIME ZONE,
  is_featured BOOLEAN DEFAULT FALSE
);

-- 🔐 RLS (Row Level Security) 활성화
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- 👀 모든 사용자가 뉴스를 볼 수 있도록 정책 생성
CREATE POLICY "Anyone can view news" ON news FOR SELECT USING (true);

-- 🚀 성능 향상을 위한 인덱스 생성
CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_news_created_at ON news(created_at DESC);
CREATE INDEX idx_news_is_featured ON news(is_featured);
CREATE INDEX idx_news_published_date ON news(published_date DESC);

-- 📝 샘플 데이터 삽입 (테스트용)
INSERT INTO news (title, description, content, image_url, category, category_color, author, source_url, published_date, is_featured) VALUES
('테스트 뉴스 1', '이것은 테스트 뉴스입니다.', '테스트 뉴스의 전체 내용입니다.', 'https://via.placeholder.com/300x200', 'MARKET', '#e74c3c', 'Test Author', 'https://example.com/news1', NOW(), true),
('테스트 뉴스 2', '두 번째 테스트 뉴스입니다.', '두 번째 테스트 뉴스의 전체 내용입니다.', 'https://via.placeholder.com/300x200', 'ECONOMY', '#f39c12', 'Test Author', 'https://example.com/news2', NOW() - INTERVAL '1 hour', false),
('테스트 뉴스 3', '세 번째 테스트 뉴스입니다.', '세 번째 테스트 뉴스의 전체 내용입니다.', 'https://via.placeholder.com/300x200', 'STOCKS', '#27ae60', 'Test Author', 'https://example.com/news3', NOW() - INTERVAL '2 hours', false);

-- ✅ 테이블 생성 확인
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default 
FROM information_schema.columns 
WHERE table_name = 'news' 
ORDER BY ordinal_position; 