import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 디버깅: 환경 변수 확인
console.log('Supabase 클라이언트 설정:')
console.log('URL 존재:', !!supabaseUrl, supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : 'undefined')
console.log('KEY 존재:', !!supabaseKey, supabaseKey ? '***' + supabaseKey.slice(-10) : 'undefined')

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase 환경 변수가 설정되지 않았습니다!')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl)
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? 'exists' : 'missing')
}

export const supabase = createClient(supabaseUrl, supabaseKey) 