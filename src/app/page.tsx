import { cookies } from 'next/headers'
import PortfolioClient from './components/PortfolioClient'

export default async function Page() {
  const cookieStore = await cookies()
  const themeCookie = cookieStore.get('theme')
  const langCookie = cookieStore.get('lang')
  
  const initialTheme = (themeCookie?.value === 'light') ? 'light' : 'dark'
  const initialLang = (langCookie?.value === 'en') ? 'en' : 'es'

  return <PortfolioClient initialTheme={initialTheme} initialLang={initialLang} />
}