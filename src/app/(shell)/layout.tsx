import { AppShell } from '@/components/shell'
import { ShellProviders } from '@/components/shell/ShellProviders'
import { getAIConfig } from '@/lib/settings/queries'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'
import { listProfiles } from '@/lib/profiles/queries'

export default async function ShellLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userId = await requireActiveProfileId()
  const profiles = await listProfiles()
  const current = profiles.find((p) => p.id === userId)!
  const others = profiles.filter((p) => p.id !== userId)
  const aiConfig = await getAIConfig()

  return (
    <ShellProviders>
      <AppShell
        user={{ name: 'Study User' }}
        isAIConfigured={aiConfig.isConfigured}
        activeProfile={{
          id: current.id,
          name: current.name,
          avatarColor: current.avatarColor,
          hasPin: current.pinHash !== null,
          isDefault: current.isDefault,
        }}
        otherProfiles={others.map((p) => ({
          id: p.id,
          name: p.name,
          avatarColor: p.avatarColor,
          hasPin: p.pinHash !== null,
          isDefault: p.isDefault,
        }))}
      >
        {children}
      </AppShell>
    </ShellProviders>
  )
}
