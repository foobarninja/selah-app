import { AuditDashboard } from '@/components/settings/AuditDashboard'

export default function AuditLandingPage() {
  return (
    <div style={{ maxWidth: '720px', padding: '0 16px' }}>
      <h1 style={{ fontFamily: 'var(--selah-font-display)', fontSize: '28px', color: 'var(--selah-text-1)', margin: '0 0 16px' }}>
        Parent audit
      </h1>
      <p style={{ fontFamily: "var(--selah-font-body)", color: 'var(--selah-text-3)', marginBottom: '24px', fontSize: '14px' }}>
        Review flagged messages from child-locked profiles. Critical flags are immediate-crisis signals; concerning flags are heavy-but-not-immediate distress; sensitive flags are strong emotions worth noting.
      </p>
      <AuditDashboard />
    </div>
  )
}
