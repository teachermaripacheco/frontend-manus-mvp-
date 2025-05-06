import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { UserProvider } from "@/contexts/user-context"
import { UserDataProvider } from "@/contexts/user-data-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SURI AI - Emotionally Intelligent Language Learning",
  description: "Learn languages with an AI that understands your emotions and adapts to your learning style",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <UserProvider>
            <UserDataProvider>{children}</UserDataProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

