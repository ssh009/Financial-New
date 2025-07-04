'use client'

import React from 'react'
import styled from 'styled-components'

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
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 100;
`

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 40px;
  
  @media (max-width: 768px) {
    gap: 20px;
    flex-wrap: wrap;
  }
`

const NavItem = styled.li`
  color: #7f8c8d;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #2c3e50;
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
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

// Sample data
const featuredPosts = [
  {
    id: 1,
    title: "The Road Ahead",
    description: "The road ahead might be paved - it might not be.",
    image: "https://images.unsplash.com/photo-1465447142348-e9952c393450?w=600&h=300&fit=crop",
    category: "PHOTOGRAPHY",
    categoryColor: "#9b59b6",
    author: "Mat Vogels",
    date: "September 25, 2015"
  },
  {
    id: 2,
    title: "From Top Down",
    description: "Once a year, go someplace you've never been before.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop",
    category: "ADVENTURE",
    categoryColor: "#e67e22",
    author: "William Wong",
    date: "September 25, 2015"
  }
]

const recentPosts = [
  {
    id: 3,
    title: "Still Standing Tall",
    description: "Life begins at the end of your comfort zone.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=200&fit=crop",
    category: "NATURE",
    categoryColor: "#f39c12",
    author: "William Wong",
    date: "September 25, 2015"
  },
  {
    id: 4,
    title: "Sunny Side Up",
    description: "No place is ever as bad as they tell you it's going to be.",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=200&fit=crop",
    category: "PHOTOGRAPHY",
    categoryColor: "#9b59b6",
    author: "Mat Vogels",
    date: "September 25, 2015"
  },
  {
    id: 5,
    title: "Water Falls",
    description: "We travel not to escape life, but for life not to escape us.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
    category: "RELAXATION",
    categoryColor: "#1abc9c",
    author: "Mat Vogels",
    date: "September 25, 2015"
  }
]

const navigationItems = ['Nature', 'Photography', 'Relaxation', 'Vacation', 'Travel', 'Adventure']

export default function Home() {
  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <HeroTitle>HS's Financial News</HeroTitle>
          <HeroSubtitle>Let's analyze the US financial and stock market together.</HeroSubtitle>
          <HeroButton>View Latest Posts</HeroButton>
        </HeroContent>
      </HeroSection>
      
      <Navigation>
        <NavList>
          {navigationItems.map((item, index) => (
            <NavItem key={index}>{item}</NavItem>
          ))}
        </NavList>
      </Navigation>
      
      <MainContent>
        <SectionTitle>Featured Posts</SectionTitle>
        <FeaturedGrid>
          {featuredPosts.map((post) => (
            <Card key={post.id}>
              <CardImage $bgImage={post.image} $height="300px">
                <CategoryTag $color={post.categoryColor}>{post.category}</CategoryTag>
              </CardImage>
              <CardContent>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
                <CardMeta>
                  <Author>
                    <AuthorAvatar />
                    <AuthorName>{post.author}</AuthorName>
                  </Author>
                  <PostDate>{post.date}</PostDate>
                </CardMeta>
              </CardContent>
            </Card>
          ))}
        </FeaturedGrid>
        
        <SectionTitle>Most Recent</SectionTitle>
        <RecentGrid>
          {recentPosts.map((post) => (
            <Card key={post.id}>
              <CardImage $bgImage={post.image}>
                <CategoryTag $color={post.categoryColor}>{post.category}</CategoryTag>
              </CardImage>
              <CardContent>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
                <CardMeta>
                  <Author>
                    <AuthorAvatar />
                    <AuthorName>{post.author}</AuthorName>
                  </Author>
                  <PostDate>{post.date}</PostDate>
                </CardMeta>
              </CardContent>
            </Card>
          ))}
        </RecentGrid>
      </MainContent>
    </Container>
  )
}
