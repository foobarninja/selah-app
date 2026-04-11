import { AppShell } from '@/components/shell'
import { ShellProviders } from '@/components/shell/ShellProviders'
import { getAIConfig } from '@/lib/settings/queries'

export default async function ShellLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const aiConfig = await getAIConfig()

  return (
    <ShellProviders>
      <AppShell
        user={{ name: 'Study User' }}
        isAIConfigured={aiConfig.isConfigured}
      >
        {children}
      </AppShell>
    </ShellProviders>
  )
}
