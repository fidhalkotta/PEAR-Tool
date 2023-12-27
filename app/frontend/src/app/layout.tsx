import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import NavigationBar from "@/components/NavigationBar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PEAR',
  description: 'Made with <3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
            <NavigationBar/>
        {children}
      </body>
    </html>
  )
}
