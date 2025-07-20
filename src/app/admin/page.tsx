'use client'
import { useState } from 'react'
import styled from 'styled-components'

// Styled Components
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 10px;
`

const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 1.1rem;
`

const Section = styled.section`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-bottom: 30px;
`

const SectionTitle = styled.h2`
  color: #34495e;
  margin-bottom: 20px;
  font-size: 1.5rem;
`

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  background: ${props => props.$variant === 'secondary' ? '#95a5a6' : '#3498db'};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  margin-right: 10px;
  
  &:hover {
    background: ${props => {
      if (props.disabled) return props.$variant === 'secondary' ? '#95a5a6' : '#3498db'
      return props.$variant === 'secondary' ? '#7f8c8d' : '#2980b9'
    }};
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
  }
  
  &:disabled {
    opacity: 0.6;
  }
`

const ResultContainer = styled.div<{ success?: boolean }>`
  background: ${props => props.success ? '#d4edda' : '#f8d7da'};
  border: 1px solid ${props => props.success ? '#c3e6cb' : '#f5c6cb'};
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`

const ResultTitle = styled.h3<{ success?: boolean }>`
  color: ${props => props.success ? '#155724' : '#721c24'};
  margin-bottom: 15px;
`

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 15px;
  border-radius: 6px;
  text-align: center;
`

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
`

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-top: 5px;
`

const DetailsList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  padding: 15px;
`

const DetailItem = styled.div<{ type: 'success' | 'skip' | 'error' }>`
  padding: 8px 12px;
  margin-bottom: 5px;
  border-radius: 4px;
  font-size: 0.9rem;
  background: ${props => {
    switch (props.type) {
      case 'success': return '#d1ecf1'
      case 'skip': return '#ffeaa7'
      case 'error': return '#f8d7da'
      default: return '#f8f9fa'
    }
  }};
  border-left: 4px solid ${props => {
    switch (props.type) {
      case 'success': return '#17a2b8'
      case 'skip': return '#ffc107'
      case 'error': return '#dc3545'
      default: return '#6c757d'
    }
  }};
`

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 10px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

interface FetchResult {
  success: boolean
  message?: string
  error?: string
  statistics?: {
    total: number
    saved: number
    skipped: number
    errors: number
    duration: string
  }
  details?: string[]
  timestamp?: string
}

export default function AdminPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<FetchResult | null>(null)

  const fetchNews = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      const response = await fetch('/api/fetch-news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: '네트워크 오류가 발생했습니다.',
        details: [error instanceof Error ? error.message : String(error)]
      })
    } finally {
      setLoading(false)
    }
  }

  const testApi = async () => {
    try {
      const response = await fetch('/api/fetch-news', {
        method: 'GET'
      })
      const data = await response.json()
      setResult({
        success: true,
        message: 'API 연결 테스트 성공',
        details: [`API 상태: ${data.status}`, `기능: ${data.features?.join(', ')}`]
      })
    } catch (error) {
      setResult({
        success: false,
        error: 'API 연결 테스트 실패',
        details: [error instanceof Error ? error.message : String(error)]
      })
    }
  }

  const getDetailType = (detail: string): 'success' | 'skip' | 'error' => {
    if (detail.includes('저장 성공')) return 'success'
    if (detail.includes('중복 스킵')) return 'skip'
    return 'error'
  }

  return (
    <Container>
      <Header>
        <Title>🗞️ 뉴스 관리자</Title>
        <Subtitle>Yahoo Finance RSS 뉴스 수집 및 관리</Subtitle>
      </Header>

      <Section>
        <SectionTitle>뉴스 수집</SectionTitle>
        <p>Yahoo Finance RSS에서 최신 금융 뉴스를 가져와 Supabase에 저장합니다.</p>
        
        <div style={{ marginTop: '20px' }}>
          <Button onClick={fetchNews} disabled={loading}>
            {loading && <LoadingSpinner />}
            {loading ? '뉴스 수집 중...' : 'Yahoo 뉴스 가져오기'}
          </Button>
          
          <Button $variant="secondary" onClick={testApi} disabled={loading}>
            API 연결 테스트
          </Button>
        </div>
      </Section>

      {result && (
        <Section>
          <ResultContainer success={result.success}>
            <ResultTitle success={result.success}>
              {result.success ? '✅ 성공' : '❌ 실패'}
            </ResultTitle>
            
            <p>{result.message || result.error}</p>
            
            {result.statistics && (
              <StatGrid>
                <StatCard>
                  <StatValue>{result.statistics.total}</StatValue>
                  <StatLabel>총 처리</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{result.statistics.saved}</StatValue>
                  <StatLabel>저장 성공</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{result.statistics.skipped}</StatValue>
                  <StatLabel>중복 스킵</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{result.statistics.errors}</StatValue>
                  <StatLabel>에러</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{result.statistics.duration}</StatValue>
                  <StatLabel>소요 시간</StatLabel>
                </StatCard>
              </StatGrid>
            )}
            
            {result.details && result.details.length > 0 && (
              <div>
                <h4>상세 내역:</h4>
                <DetailsList>
                  {result.details.map((detail, index) => (
                    <DetailItem key={index} type={getDetailType(detail)}>
                      {detail}
                    </DetailItem>
                  ))}
                </DetailsList>
              </div>
            )}
            
            {result.timestamp && (
              <div style={{ marginTop: '15px', fontSize: '0.9rem', color: '#6c757d' }}>
                실행 시간: {new Date(result.timestamp).toLocaleString()}
              </div>
            )}
          </ResultContainer>
        </Section>
      )}
    </Container>
  )
} 