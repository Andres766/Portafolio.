import { cookies } from 'next/headers'
import PortfolioClient from './components/PortfolioClient'

export default async function Page() {
  const cookieStore = await cookies()
  const themeCookie = cookieStore.get('theme')
  const langCookie = cookieStore.get('lang')
  
  const themeValue = themeCookie?.value || 'system'
  const initialTheme = themeValue === 'light' ? 'light' : themeValue === 'dark' ? 'dark' : 'system'
  const initialLang = (langCookie?.value === 'en') ? 'en' : 'es'

  return <PortfolioClient initialTheme={initialTheme} initialLang={initialLang} />
}