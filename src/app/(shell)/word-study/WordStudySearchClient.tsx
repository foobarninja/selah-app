'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function WordStudySearchClient() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Array<{
    number: string; language: string; word: string;
    transliteration: string | null; shortDefinition: string | null
  }>>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return
    // Direct Strong's number lookup
    if (/^[HG]\d+$/i.test(query.trim())) {
      router.push(`/word-study/${query.trim().toUpperCase()}`)
      return
    }
    setLoading(true)
    try {
      const resp = await fetch(`/api/strongs/search?q=${encodeURIComponent(query)}`)
      const data = await resp.json()
      setResults(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full overflow-auto" style={{ padding: '32px 24px' }}>
      <h1
        style={{
          fontFamily: "var(--selah-font-display, 'Cormorant Garamond', serif)",
          fontSize: '28px',
          fontWeight: 400,
          color: 'var(--selah-text-1)',
          marginBottom: '24px',
        }}
      >
        Word Study
      </h1>

      <div className="flex gap-2" style={{ maxWidth: '480px', marginBottom: '32px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search by Strong's number (H1234, G5678) or English word..."
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid var(--selah-border-color)',
            backgroundColor: 'var(--selah-bg-surface)',
            color: 'var(--selah-text-1)',
            fontFamily: 'var(--selah-font-body)',
            fontSize: '14px',
          }}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          style={{
            padding: '10px 18px',
            borderRadius: '8px',
            backgroundColor: 'var(--selah-gold-500, #C6A23C)',
            color: '#fff',
            fontFamily: 'var(--selah-font-body)',
            fontSize: '14px',
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {loading ? '...' : 'Search'}
        </button>
      </div>

      {results.length > 0 && (
        <div className="flex flex-col gap-2" style={{ maxWidth: '600px' }}>
          {results.map((r) => (
            <button
              key={r.number}
              onClick={() => router.push(`/word-study/${r.number}`)}
              className="text-left"
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: 'var(--selah-bg-surface)',
                border: '1px solid var(--selah-border-color)',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--selah-font-mono)',
                  fontSize: '12px',
                  color: 'var(--selah-gold-500)',
                  marginRight: '8px',
                }}
              >
                {r.number}
              </span>
              <span style={{ color: 'var(--selah-text-1)', fontSize: '15px' }}>
                {r.word}
              </span>
              {r.transliteration && (
                <span style={{ color: 'var(--selah-text-3)', fontSize: '13px', marginLeft: '8px' }}>
                  ({r.transliteration})
                </span>
              )}
              <span style={{ color: 'var(--selah-text-2)', fontSize: '13px', marginLeft: '8px' }}>
                — {r.shortDefinition}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
