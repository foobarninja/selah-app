import type { Metadata } from 'next'
import { cormorant, sourceSans, jetbrainsMono } from './fonts'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Selah',
  description: 'A self-hosted Bible study application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${cormorant.variable} ${sourceSans.variable} ${jetbrainsMono.variable} h-full`}
    >
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --selah-font-display: var(--font-cormorant), Georgia, 'Times New Roman', serif;
                --selah-font-body: var(--font-source-sans), 'Segoe UI', -apple-system, sans-serif;
                --selah-font-mono: var(--font-jetbrains), 'Fira Code', Consolas, monospace;
              }
            `,
          }}
        />
      </head>
      <body className="h-full">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
