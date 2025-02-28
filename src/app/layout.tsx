import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Матч-трекер",
  description: "Приложение для отслеживания матчей",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}