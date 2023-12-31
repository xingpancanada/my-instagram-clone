import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextAuthProvider from './Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Instagram Clone',
  description: 'My Instagram Website. Generated by NextJS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
