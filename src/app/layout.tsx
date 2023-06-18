import Navigation from '@/components/Navigation'
import './globals.css'
import { Inter } from 'next/font/google'
import { AiOutlineBook, AiOutlineSearch, AiOutlineInfoCircle } from "react-icons/ai"
import { Metadata } from 'next'
import Provider from '@/components/Provider'

const inter = Inter({ subsets: ['latin'] })

const navLinks = [
  { href: "/", icon: <AiOutlineBook/>},
  { href: "/manga", icon: <AiOutlineSearch/>},
  { href: "/info", icon: <AiOutlineInfoCircle/>},
]

export const metadata: Metadata = {
  title: 'Manga',
  description: 'View and read your favourite manga easily.',
  applicationName: 'Manga',
  appleWebApp: {
    title: 'Manga',
    capable: true,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/icon-192x192.png',
    shortcut: '/icon-512x512.png',
  },
  themeColor: 'dark',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider>
          {children}
          <Navigation navLinks={navLinks}/>
        </Provider>
      </body>
    </html>
  )
}
