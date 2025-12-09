'use client'

import { usePathname } from 'next/navigation'
import { ThemeProvider } from './ThemeProvider'
import { CMSProvider } from '@/contexts/CMSContext'
import Navbar from './Navbar'
import Footer from './Footer'
import StickyCTA from './StickyCTA'
import CMSColorVariables from './CMSColorVariables'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  return (
    <ThemeProvider>
      <CMSProvider>
        <CMSColorVariables />
        {!isAdminPage && <Navbar />}
        <main className="min-h-screen">
          {children}
        </main>
        {!isAdminPage && <StickyCTA />}
        {!isAdminPage && <Footer />}
      </CMSProvider>
    </ThemeProvider>
  )
}

