import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Shobit G - Professional Violinist',
  description: 'Book professional violin performances for your special events. Classical and contemporary music performed with passion and precision.',
  keywords: ['violinist', 'violin', 'music', 'classical music', 'events', 'weddings', 'concerts', 'Shobit G'],
  authors: [{ name: 'Shobit G' }],
  openGraph: {
    title: 'Shobit G - Professional Violinist',
    description: 'Book professional violin performances for your special events.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
