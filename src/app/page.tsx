'use client'

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { NewsPost } from '../types/news'
import { getFeaturedPosts, getRecentPosts } from '../lib/newsService'
import { getMockNewsByCategory, getFeaturedMockNews, getRecentMockNews } from '../data/mockNews'

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
`

const HeroSection = styled.section`
  height: 60vh;
  background-image: url('https://cdn.pixabay.com/photo/2021/10/10/03/21/stock-market-6695489_1280.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  max-width: 800px;
  padding: 0 20px;
`

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 300;
  margin-bottom: 20px;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const HeroButton = styled.button`
  background: #e67e22;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #d35400;
    transform: translateY(-2px);
  }
`

const Navigation = styled.nav`
  background: white;
  padding: 0;
  border-bottom: 1px solid #e1e5e8;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    overflow-x: auto;
    padding: 0 10px;
  }
`

const NavItem = styled.li<{ $isActive?: boolean }>`
  color: ${props => props.$isActive ? '#0066cc' : '#505050'};
  font-weight: ${props => props.$isActive ? '600' : '500'};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 16px 24px;
  border-bottom: 3px solid ${props => props.$isActive ? '#0066cc' : 'transparent'};
  white-space: nowrap;
  
  &:hover {
    color: #0066cc;
    background: #f7f9fa;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px 16px;
  }
`

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
`

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 50px;
  font-weight: 400;
`

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const RecentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`

const Card = styled.article`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`

const CardImage = styled.div<{ $bgImage: string; $height?: string }>`
  height: ${props => props.$height || '200px'};
  background-image: url(${props => props.$bgImage});
  background-size: cover;
  background-position: center;
  position: relative;
`

const CategoryTag = styled.span<{ $color: string }>`
  position: absolute;
  top: 20px;
  left: 20px;
  background: ${props => props.$color};
  color: white;
  padding: 5px 15px;
  border-radius: 3px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const CardContent = styled.div`
  padding: 25px;
`

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-weight: 400;
  line-height: 1.4;
`

const CardDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 20px;
`

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const AuthorAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #bdc3c7;
`

const AuthorName = styled.span`
  color: #2c3e50;
  font-weight: 500;
  font-size: 0.9rem;
`

const PostDate = styled.span`
  color: #95a5a6;
  font-size: 0.9rem;
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #7f8c8d;
  font-size: 1.1rem;
`

const ErrorContainer = styled.div`
  background: #e74c3c;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  text-align: center;
`

// 금융 뉴스 카테고리
const newsCategories = [
  { name: '전체', value: 'ALL' },
  { name: '시장', value: 'MARKET' },
  { name: '경제', value: 'ECONOMY' },
  { name: '주식', value: 'STOCKS' },
  { name: '암호화폐', value: 'CRYPTO' },
  { name: '부동산', value: 'REALESTATE' }
]

// 날짜 포맷팅 함수
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

export default function Home() {
  const [featuredPosts, setFeaturedPosts] = useState<NewsPost[]>([])
  const [recentPosts, setRecentPosts] = useState<NewsPost[]>([])
  const [categoryPosts, setCategoryPosts] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')

  // 카테고리 클릭 이벤트 핸들러
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    
    // 선택된 카테고리에 따라 뉴스 데이터 업데이트
    const filteredNews = getMockNewsByCategory(category)
    setCategoryPosts(filteredNews)
    
    console.log('선택된 카테고리:', category, '뉴스 개수:', filteredNews.length)
  }

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError(null)
        
        // 가짜 데이터 사용 (즉시 로딩)
        const featured = getFeaturedMockNews()
        const recent = getRecentMockNews(3)
        const initialCategory = getMockNewsByCategory('ALL')
        
        setFeaturedPosts(featured)
        setRecentPosts(recent)
        setCategoryPosts(initialCategory)
        
        console.log('초기 데이터 로딩 완료:', {
          featured: featured.length,
          recent: recent.length,
          total: initialCategory.length
        })
        
      } catch (err) {
        console.error('Error loading data:', err)
        setError('뉴스 데이터를 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <Container>
        <HeroSection>
          <HeroContent>
            <HeroTitle>HS&apos;s Financial News</HeroTitle>
            <HeroSubtitle>Let&apos;s analyze the US financial and stock market together.</HeroSubtitle>
            <HeroButton>View Latest Posts</HeroButton>
          </HeroContent>
        </HeroSection>
        <LoadingContainer>뉴스를 불러오는 중...</LoadingContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <HeroSection>
          <HeroContent>
            <HeroTitle>HS&apos;s Financial News</HeroTitle>
            <HeroSubtitle>Let&apos;s analyze the US financial and stock market together.</HeroSubtitle>
            <HeroButton>View Latest Posts</HeroButton>
          </HeroContent>
        </HeroSection>
        <MainContent>
          <ErrorContainer>{error}</ErrorContainer>
        </MainContent>
      </Container>
    )
  }

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <HeroTitle>HS&apos;s Financial News</HeroTitle>
          <HeroSubtitle>Let&apos;s analyze the US financial and stock market together.</HeroSubtitle>
          <HeroButton>View Latest Posts</HeroButton>
        </HeroContent>
      </HeroSection>
      
      <Navigation>
        <NavList>
          {newsCategories.map((category) => (
            <NavItem 
              key={category.value}
              $isActive={selectedCategory === category.value}
              onClick={() => handleCategoryClick(category.value)}
            >
              {category.name}
            </NavItem>
          ))}
        </NavList>
      </Navigation>
      
      <MainContent>
        {selectedCategory === 'ALL' ? (
          // 전체 카테고리 선택 시: Featured + Recent 표시
          <>
            <SectionTitle>Featured Posts</SectionTitle>
            {featuredPosts.length > 0 ? (
              <FeaturedGrid>
                {featuredPosts.map((post) => (
                  <Card key={post.id}>
                    <CardImage $bgImage={post.image_url} $height="300px">
                      <CategoryTag $color={post.category_color}>{post.category}</CategoryTag>
                    </CardImage>
                    <CardContent>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>{post.description}</CardDescription>
                      <CardMeta>
                        <Author>
                          <AuthorAvatar />
                          <AuthorName>{post.author}</AuthorName>
                        </Author>
                        <PostDate>{formatDate(post.created_at)}</PostDate>
                      </CardMeta>
                    </CardContent>
                  </Card>
                ))}
              </FeaturedGrid>
            ) : (
              <LoadingContainer>추천 뉴스가 없습니다.</LoadingContainer>
            )}
            
            <SectionTitle>Most Recent</SectionTitle>
            {recentPosts.length > 0 ? (
              <RecentGrid>
                {recentPosts.map((post) => (
                  <Card key={post.id}>
                    <CardImage $bgImage={post.image_url}>
                      <CategoryTag $color={post.category_color}>{post.category}</CategoryTag>
                    </CardImage>
                    <CardContent>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>{post.description}</CardDescription>
                      <CardMeta>
                        <Author>
                          <AuthorAvatar />
                          <AuthorName>{post.author}</AuthorName>
                        </Author>
                        <PostDate>{formatDate(post.created_at)}</PostDate>
                      </CardMeta>
                    </CardContent>
                  </Card>
                ))}
              </RecentGrid>
            ) : (
              <LoadingContainer>최신 뉴스가 없습니다.</LoadingContainer>
            )}
          </>
        ) : (
          // 특정 카테고리 선택 시: 해당 카테고리 뉴스만 표시
          <>
            <SectionTitle>
              {newsCategories.find(cat => cat.value === selectedCategory)?.name || '카테고리'} 뉴스
            </SectionTitle>
            {categoryPosts.length > 0 ? (
              <RecentGrid>
                {categoryPosts.map((post) => (
                  <Card key={post.id}>
                    <CardImage $bgImage={post.image_url}>
                      <CategoryTag $color={post.category_color}>{post.category}</CategoryTag>
                    </CardImage>
                    <CardContent>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>{post.description}</CardDescription>
                      <CardMeta>
                        <Author>
                          <AuthorAvatar />
                          <AuthorName>{post.author}</AuthorName>
                        </Author>
                        <PostDate>{formatDate(post.created_at)}</PostDate>
                      </CardMeta>
                    </CardContent>
                  </Card>
                ))}
              </RecentGrid>
            ) : (
              <LoadingContainer>
                {newsCategories.find(cat => cat.value === selectedCategory)?.name || '해당 카테고리'}의 뉴스가 없습니다.
              </LoadingContainer>
            )}
          </>
        )}
      </MainContent>
    </Container>
  )
}
