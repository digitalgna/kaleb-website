import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import ClientWrapper from '@/components/ClientWrapper'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins' 
})

export const metadata: Metadata = {
  title: 'YEHA Niagara Falls Tours - Premium Small Group Tours',
  description: 'Experience the majesty of Niagara Falls with expert guide Kaleb. Small group and private tours designed for unforgettable memories.',
  keywords: 'Niagara Falls, Tours, Travel, Canada, Small Group Tours, Private Tours',
  openGraph: {
    title: 'YEHA Niagara Falls Tours',
    description: 'Premium small group and private tours of Niagara Falls',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  )
}

