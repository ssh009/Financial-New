# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 로그인
2. "New Project" 클릭
3. 프로젝트 이름과 비밀번호 설정
4. 프로젝트가 생성될 때까지 대기

## 2. 환경 변수 설정

`.env.local` 파일에서 다음 값들을 업데이트하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 값 찾는 방법:
1. Supabase 대시보드 → Settings → API
2. `Project URL`을 `NEXT_PUBLIC_SUPABASE_URL`에 복사
3. `anon public` 키를 `NEXT_PUBLIC_SUPABASE_ANON_KEY`에 복사

## 3. 데이터베이스 테이블 생성

1. Supabase 대시보드 → SQL Editor
2. `database-schema.sql` 파일의 내용을 복사하여 실행
3. 또는 다음 명령으로 테이블을 생성:

```sql
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
```

## 4. RLS (Row Level Security) 설정

```sql
-- RLS 활성화
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- 읽기 권한 정책
CREATE POLICY "Anyone can view news" ON news FOR SELECT USING (true);
```

## 5. 데이터 입력

Table Editor에서 직접 데이터를 입력하거나 SQL로 삽입:

```sql
INSERT INTO news (title, description, image_url, category, category_color, author, is_featured) VALUES
('샘플 뉴스 제목', '뉴스 설명...', 'https://example.com/image.jpg', 'MARKET', '#e67e22', '기자명', true);
```

## 6. 필수 필드

- `title`: 뉴스 제목
- `description`: 뉴스 요약
- `image_url`: 이미지 URL
- `category`: 카테고리 (예: MARKET, ECONOMY, STOCKS)
- `category_color`: 카테고리 색상 (hex 코드)
- `author`: 작성자
- `is_featured`: 추천 여부 (true/false)

## 7. 개발 서버 실행

```bash
npm run dev
```

이제 http://localhost:3001에서 Supabase 데이터가 렌더링된 웹사이트를 확인할 수 있습니다! 

## 📋 카테고리 필터링 구현 단계

### **1단계: 네비게이션 카테고리 변경**

현재 `navigationItems`가 `['Nature', 'Photography', 'Relaxation', 'Vacation', 'Travel', 'Adventure']`로 되어 있는데, 이를 금융 뉴스에 맞는 카테고리로 변경해야 합니다.

**변경할 내용:**
```typescript
const navigationCategories = [
  { name: '전체', value: 'ALL' },
  { name: '시장', value: 'MARKET' },
  { name: '경제', value: 'ECONOMY' },
  { name: '주식', value: 'STOCKS' },
  { name: '암호화폐', value: 'CRYPTO' },
  { name: '부동산', value: 'REALESTATE' }
]
```

### **2단계: 상태 관리 추가**

현재 컴포넌트에 카테고리 선택 상태를 관리할 state를 추가해야 합니다.

**추가할 상태:**
```typescript
const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
const [filteredPosts, setFilteredPosts] = useState<NewsPost[]>([])
```

### **3단계: 카테고리별 데이터 fetching 로직 수정**

현재 `useEffect`에서 featured와 recent posts만 가져오고 있는데, 카테고리 선택에 따라 다른 데이터를 가져오도록 수정해야 합니다.

**수정할 부분:**
- `useEffect` 의존성 배열에 `selectedCategory` 추가
- 카테고리가 'ALL'이면 모든 뉴스, 특정 카테고리면 해당 카테고리 뉴스만 가져오기
- `newsService.ts`의 `getPostsByCategory` 함수 활용

### **4단계: 네비게이션 UI 업데이트**

현재 `NavItem`은 단순한 텍스트만 표시하는데, 클릭 이벤트와 활성 상태 스타일을 추가해야 합니다.

**추가할 스타일:**
```typescript
const NavItem = styled.li<{ $isActive?: boolean }>`
  color: ${props => props.$isActive ? '#2c3e50' : '#7f8c8d'};
  font-weight: ${props => props.$isActive ? '600' : '500'};
  border-bottom: ${props => props.$isActive ? '2px solid #e67e22' : 'none'};
  // ... 기존 스타일
`
```

### **5단계: 클릭 이벤트 핸들러 추가**

카테고리 클릭 시 실행될 함수를 생성해야 합니다.

**추가할 함수:**
```typescript
const handleCategoryClick = (category: string) => {
  setSelectedCategory(category)
  // 로딩 상태 관리
  // 새로운 데이터 fetch
}
```

### **6단계: 네비게이션 렌더링 로직 수정**

현재 `navigationItems.map`으로 단순하게 렌더링하는 부분을 수정해야 합니다.

**수정할 부분:**
```jsx
// 기존
{navigationItems.map((item, index) => (
  <NavItem key={index}>{item}</NavItem>
))}

// 변경 후  
{navigationCategories.map((category) => (
  <NavItem 
    key={category.value}
    $isActive={selectedCategory === category.value}
    onClick={() => handleCategoryClick(category.value)}
  >
    {category.name}
  </NavItem>
))}
```

### **7단계: 메인 컨텐츠 렌더링 로직 수정**

현재 Featured Posts와 Recent Posts로 나뉘어 있는데, 카테고리 필터링 시에는 하나의 그리드로 통합하는 것이 좋습니다.

**수정할 구조:**
- 선택된 카테고리가 'ALL'이면 → Featured + Recent 표시
- 특정 카테고리 선택 시 → 해당 카테고리의 모든 뉴스 표시

### **8단계: newsService.ts 함수 추가 (필요시)**

현재 `getPostsByCategory` 함수가 있지만, "전체" 카테고리를 위한 `getAllPosts` 함수도 활용해야 합니다.

**확인할 부분:**
- `getAllPosts()` 함수가 제대로 작동하는지
- `getPostsByCategory(category)` 함수가 올바른 데이터를 반환하는지

### **9단계: 로딩 및 에러 처리 개선**

카테고리 변경 시에도 적절한 로딩 상태와 에러 처리가 필요합니다.

**추가할 상태:**
```typescript
const [categoryLoading, setCategoryLoading] = useState(false)
```

### **10단계: 성능 최적화 (선택사항)**

**고려할 사항:**
- 이미 가져온 카테고리 데이터는 캐싱
- 디바운싱으로 연속 클릭 방지
- 무한 스크롤 준비를 위한 페이지네이션 정보 추가

## 🎯 구현 우선순위

1. **1-3단계**: 기본 상태 관리와 데이터 구조 변경 (핵심)
2. **4-6단계**: UI 인터랙션과 이벤트 처리 (핵심)  
3. **7단계**: 렌더링 로직 수정 (핵심)
4. **8-9단계**: 안정성 향상 (중요)
5. **10단계**: 성능 최적화 (나중에)

## 💡 예상되는 도전 과제

1. **카테고리명 매핑**: DB의 카테고리 값과 UI 표시명 연결
2. **상태 동기화**: 카테고리 변경 시 기존 데이터 처리
3. **로딩 UX**: 카테고리 전환 시 매끄러운 사용자 경험
4. **반응형 디자인**: 모바일에서 네비게이션 처리

어떤 단계부터 시작해보고 싶으신가요? 전체적으로 진행하시겠습니까, 아니면 특정 단계부터 자세히 알아보시겠습니까? 