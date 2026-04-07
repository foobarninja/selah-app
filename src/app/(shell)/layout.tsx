import { AppShell } from '@/components/shell'
import { getAIConfig } from '@/lib/settings/queries'

export default async function ShellLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const aiConfig = await getAIConfig()

  return (
    <AppShell
      user={{ name: 'Study User' }}
      isAIConfigured={aiConfig.isConfigured}
    >
      {children}
    </AppShell>
  )
}
