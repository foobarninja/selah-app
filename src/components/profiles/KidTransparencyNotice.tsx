'use client'

const font = { body: "var(--selah-font-body, 'Source Sans 3', sans-serif)" }

interface Props {
  auditPolicy: 'flagged-only' | 'full'
}

export function KidTransparencyNotice({ auditPolicy }: Props) {
  const detail = auditPolicy === 'full'
    ? 'Your grown-up can see the conversations you have with the study companion.'
    : 'Your grown-up can see messages in the study companion that mention big feelings like feeling really sad, lonely, or wanting to hurt yourself.'

  return (
    <div
      style={{
        backgroundColor: 'var(--selah-bg-elevated, #292524)',
        border: '1px solid var(--selah-gold-500, #C6A23C)',
        borderRadius: '10px',
        padding: '14px 16px',
        fontFamily: font.body,
        color: 'var(--selah-text-1, #E8E2D9)',
        lineHeight: 1.5,
        marginBottom: '16px',
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: '6px' }}>A heads-up about this chat</div>
      <p style={{ margin: 0, fontSize: '14px' }}>
        {detail} You&apos;re not in trouble for sharing those things — it just helps your grown-up know how to help you. If something is really hard, you can always talk to them straight.
      </p>
    </div>
  )
}
