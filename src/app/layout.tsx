import Navigation from '@/components/Navigation'
import './globals.css'
import { Inter } from 'next/font/google'
import { AiOutlineBook, AiOutlineSearch, AiOutlineInfoCircle } from "react-icons/ai"

const inter = Inter({ subsets: ['latin'] })

const navLinks = [
  { href: "/", icon: <AiOutlineBook/>},
  { href: "/manga", icon: <AiOutlineSearch/>},
  { href: "/info", icon: <AiOutlineInfoCircle/>},
]

export const metadata = {
  title: 'Manga',
  description: 'Created with love',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        {children}
        <Navigation navLinks={navLinks}/>
      </body>
    </html>
  )
}
