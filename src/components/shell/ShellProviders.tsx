'use client'

import { ToastProvider } from '@/components/ui/ToastProvider'

export function ShellProviders({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>
}
