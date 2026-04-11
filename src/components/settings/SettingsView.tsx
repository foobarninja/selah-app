'use client'

import { useEffect, useState } from 'react'
import { Eye, EyeOff, Check, X, Download, Upload, Minus, Plus, Sun, Moon, Monitor } from 'lucide-react'
import type { SettingsProps, AIProvider, ThemeMode, AudienceLevel, RetentionDays } from './types'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'

const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
  mono: "var(--selah-font-mono, 'JetBrains Mono', monospace)",
}

function SettingsSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 style={{ fontFamily: font.display, fontSize: '24px', fontWeight: 400, color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '4px' }}>{title}</h2>
      <p style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-3, #6E695F)', marginBottom: '20px' }}>{description}</p>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-1, #E8E2D9)' }}>{label}</span>
      <button onClick={() => onChange(!checked)} className="relative rounded-full transition-colors duration-200" style={{ width: '40px', height: '22px', backgroundColor: checked ? 'var(--selah-gold-500, #C6A23C)' : 'var(--selah-border-color, #3D3835)', border: 'none', cursor: 'pointer' }}>
        <span className="absolute top-1 rounded-full transition-all duration-200" style={{ width: '14px', height: '14px', backgroundColor: '#fff', left: checked ? '22px' : '4px' }} />
      </button>
    </div>
  )
}

function LabelRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 py-1 md:flex-row md:items-center md:justify-between">
      <span style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-1, #E8E2D9)' }}>{label}</span>
      <div className="w-full md:w-auto">{children}</div>
    </div>
  )
}

export function SettingsView({ translations, aiConfig, aiProviders, studyPreferences, backupInfo, onChangePrimary, onToggleParallel, onToggleDisplay, onSelectProvider, onSaveAIConfig, onTestConnection, onChangeCommentary, onToggleSourceTier, onChangeDailyBreadAudience, onChangeFontSize, onChangeTheme, onDownloadBackup, onToggleAutoBackup, onChangeRetention, onRestoreBackup, onExportJournal, onExportCollections, onExportConversations }: SettingsProps) {
  const [showApiKey, setShowApiKey] = useState(false)
  const [restoreFile, setRestoreFile] = useState<File | null>(null)
  const [apiKey, setApiKey] = useState('')
  const [ollamaUrl, setOllamaUrl] = useState(aiConfig.ollamaUrl || 'http://localhost:11434')
  const [selectedProvider, setSelectedProvider] = useState<AIProvider | null>(aiConfig.provider)
  const [showAIConfig, setShowAIConfig] = useState(!aiConfig.isConfigured)
  const [selectedModel, setSelectedModel] = useState(aiConfig.model || '')
  const [ollamaModels, setOllamaModels] = useState<Array<{ name: string }>>([])
  const [ollamaLoading, setOllamaLoading] = useState(false)
  const [ollamaError, setOllamaError] = useState<string | null>(null)
  // Initialize model parameters from saved config so the UI reflects what's actually in the DB.
  const [ollamaDisableThinking, setOllamaDisableThinking] = useState(aiConfig.ollamaParams.disableThinking)
  const [ollamaTemperature, setOllamaTemperature] = useState(aiConfig.ollamaParams.temperature)
  const [ollamaTopP, setOllamaTopP] = useState(aiConfig.ollamaParams.topP)
  const [ollamaMaxTokens, setOllamaMaxTokens] = useState(aiConfig.ollamaParams.maxTokens)
  const [ollamaFreqPenalty, setOllamaFreqPenalty] = useState(aiConfig.ollamaParams.freqPenalty)
  const [ollamaPresencePenalty, setOllamaPresencePenalty] = useState(aiConfig.ollamaParams.presPenalty)
  const [customApiUrl, setCustomApiUrl] = useState(aiConfig.customApiUrl || '')
  const [openrouterModels, setOpenrouterModels] = useState<Array<{ id: string; name: string; contextLength: number; promptCost: string; completionCost: string }>>([])
  const [openrouterLoading, setOpenrouterLoading] = useState(false)
  const [openrouterError, setOpenrouterError] = useState<string | null>(null)
  const [orTemperature, setOrTemperature] = useState(aiConfig.openrouterParams.temperature)
  const [orTopP, setOrTopP] = useState(aiConfig.openrouterParams.topP)
  const [orMaxTokens, setOrMaxTokens] = useState(aiConfig.openrouterParams.maxTokens)
  const [orFreqPenalty, setOrFreqPenalty] = useState(aiConfig.openrouterParams.freqPenalty)
  const [orPresencePenalty, setOrPresencePenalty] = useState(aiConfig.openrouterParams.presPenalty)
  const [orDisableThinking, setOrDisableThinking] = useState(aiConfig.openrouterParams.disableThinking)

  const isOllama = selectedProvider === 'ollama'
  const isOpenRouter = selectedProvider === 'openrouter'

  /** True if a key is already saved on the server for the currently-selected provider. */
  const hasSavedKey = !!(selectedProvider && aiConfig.savedProviders?.includes(selectedProvider))

  /** Clear typed-but-unsaved key/model when the user switches providers, so state doesn't bleed across tabs. */
  const handleProviderClick = (id: AIProvider) => {
    if (id === selectedProvider) return
    setSelectedProvider(id)
    setApiKey('')
    setSelectedModel('')
    setOpenrouterModels([])
    setOpenrouterError(null)
    onSelectProvider?.(id)
  }

  // When OpenRouter has a saved key, auto-fetch the models list on mount so the
  // user sees their saved model rather than an empty dropdown.
  useEffect(() => {
    if (
      selectedProvider === 'openrouter' &&
      aiConfig.savedProviders?.includes('openrouter') &&
      openrouterModels.length === 0 &&
      !openrouterLoading
    ) {
      fetchOpenRouterModels()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvider, aiConfig.savedProviders])

  const fetchOllamaModels = async () => {
    setOllamaLoading(true)
    setOllamaError(null)
    try {
      const res = await fetch(`/api/ai/ollama/models?url=${encodeURIComponent(ollamaUrl)}`)
      const data = await res.json()
      if (data.error) {
        setOllamaError(data.error)
        setOllamaModels([])
      } else {
        setOllamaModels(data.models || [])
      }
    } catch {
      setOllamaError('Failed to connect to Ollama')
      setOllamaModels([])
    } finally {
      setOllamaLoading(false)
    }
  }

  const fetchOpenRouterModels = async () => {
    // Allow fetching with no typed key — server will fall back to the stored key.
    if (!apiKey && !hasSavedKey) {
      setOpenrouterError('Enter your API key first')
      return
    }
    setOpenrouterLoading(true)
    setOpenrouterError(null)
    try {
      const url = apiKey
        ? `/api/ai/openrouter/models?key=${encodeURIComponent(apiKey)}`
        : '/api/ai/openrouter/models'
      const res = await fetch(url)
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Failed: ${res.status}`)
      }
      const models = await res.json()
      setOpenrouterModels(models)
      if (models.length === 0) setOpenrouterError('No models found')
    } catch (e: unknown) {
      setOpenrouterError(e instanceof Error ? e.message : 'Failed to fetch models')
    } finally {
      setOpenrouterLoading(false)
    }
  }

  const selectedOrModel = openrouterModels.find((m) => m.id === selectedModel)
  const orCostEstimate = selectedOrModel
    ? (parseFloat(selectedOrModel.promptCost) * 4000 + parseFloat(selectedOrModel.completionCost) * orMaxTokens)
    : null

  return (
    <div className="h-full overflow-y-auto" style={{ padding: '40px 32px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: font.display, fontWeight: 300, fontSize: '36px', letterSpacing: '0.5px', color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '36px' }}>Settings</h1>

        {/* 1. TRANSLATIONS */}
        <SettingsSection title="Translations" description="Choose your reading translations and display preferences.">
          <LabelRow label="Primary translation">
            <select value={translations.primaryId} onChange={(e) => onChangePrimary?.(e.target.value)} className="rounded-lg outline-none" style={{ fontFamily: font.body, fontSize: '13px', padding: '6px 12px', backgroundColor: 'var(--selah-bg-surface, #1C1917)', color: 'var(--selah-text-1, #E8E2D9)', border: '1px solid var(--selah-border-color, #3D3835)' }}>
              {translations.available.map((t) => (<option key={t.id} value={t.id}>{t.abbreviation} &mdash; {t.name}</option>))}
            </select>
          </LabelRow>
          <div>
            <p style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '8px' }}>Parallel translations <span style={{ color: 'var(--selah-text-3)', fontSize: '12px' }}>(up to 3)</span></p>
            <div className="flex flex-wrap gap-2">
              {translations.available.filter((t) => t.id !== translations.primaryId).map((t) => {
                const isActive = translations.parallelIds.includes(t.id)
                const atMax = translations.parallelIds.length >= 3 && !isActive
                return (<button key={t.id} onClick={() => !atMax && onToggleParallel?.(t.id)} className="transition-all duration-150" style={{ padding: '4px 12px', borderRadius: '8px', fontFamily: font.body, fontSize: '12px', fontWeight: 500, cursor: atMax ? 'default' : 'pointer', opacity: atMax ? 0.4 : 1, backgroundColor: isActive ? 'var(--selah-gold-900, #4A3711)' : 'transparent', color: isActive ? 'var(--selah-gold-300, #E8C767)' : 'var(--selah-text-2, #A39E93)', border: isActive ? '1px solid var(--selah-gold-500)' : '1px solid var(--selah-border-color, #3D3835)' }}>{t.abbreviation}</button>)
              })}
            </div>
          </div>
          <Toggle label="Show Strong's numbers" checked={translations.showStrongs} onChange={(v) => onToggleDisplay?.('showStrongs', v)} />
          <Toggle label="Show cross-references" checked={translations.showCrossReferences} onChange={(v) => onToggleDisplay?.('showCrossReferences', v)} />
          <Toggle label="Show footnotes" checked={translations.showFootnotes} onChange={(v) => onToggleDisplay?.('showFootnotes', v)} />
        </SettingsSection>

        {/* 2. AI ASSISTANT */}
        <SettingsSection title="AI assistant" description="Optional — connect an AI provider for freeform theological exploration. Selah works fully without this.">
          {aiConfig.isConfigured && !showAIConfig ? (
            <div className="flex items-center justify-between rounded-lg" style={{ padding: '14px 18px', backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)' }}>
              <div>
                <p style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)' }}>{aiProviders.find((p) => p.id === aiConfig.provider)?.name || aiConfig.provider}</p>
                <p style={{ fontFamily: font.mono, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)' }}>{aiConfig.model}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1" style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-teal-400, #4A9E88)' }}><Check size={12} strokeWidth={2} /> Connected</span>
                <button onClick={() => setShowAIConfig(true)} style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 500, color: 'var(--selah-gold-500, #C6A23C)', background: 'none', border: 'none', cursor: 'pointer' }}>Configure</button>
              </div>
            </div>
          ) : (
            <>
              <p style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-2, #A39E93)', marginBottom: '8px' }}>Provider</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
                {aiProviders.map((p) => {
                  const providerHasKey = aiConfig.savedProviders?.includes(p.id)
                  return (
                    <button key={p.id} onClick={() => handleProviderClick(p.id)} className="text-left rounded-lg transition-all duration-150 relative" style={{ padding: '12px 14px', backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: selectedProvider === p.id ? '2px solid var(--selah-gold-500, #C6A23C)' : '1px solid var(--selah-border-color, #3D3835)', cursor: 'pointer' }}>
                      {providerHasKey && (
                        <span title="API key saved" style={{ position: 'absolute', top: '8px', right: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: 'var(--selah-teal-400, #4A9E88)' }}>
                          <Check size={9} strokeWidth={3} color="#fff" />
                        </span>
                      )}
                      <p style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 600, color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '2px' }}>{p.name}</p>
                      <p style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)', lineHeight: 1.4 }}>{p.note}</p>
                    </button>
                  )
                })}
              </div>
              {selectedProvider && (
                <>
                  {isOllama ? (
                    <>
                      <p style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-2)', marginBottom: '6px' }}>Server URL</p>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex-1 flex items-center rounded-lg" style={{ backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)', padding: '8px 12px' }}>
                          <input type="text" value={ollamaUrl} onChange={(e) => setOllamaUrl(e.target.value)} placeholder="http://localhost:11434" className="flex-1 outline-none" style={{ fontFamily: font.mono, fontSize: '13px', color: 'var(--selah-text-1)', backgroundColor: 'transparent', border: 'none' }} />
                        </div>
                        <button onClick={fetchOllamaModels} className="transition-colors duration-150" style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 500, padding: '8px 16px', borderRadius: '8px', backgroundColor: 'var(--selah-bg-surface, #1C1917)', color: 'var(--selah-text-1)', border: '1px solid var(--selah-border-color, #3D3835)', cursor: 'pointer', whiteSpace: 'nowrap' }}>{ollamaLoading ? 'Checking...' : 'Detect models'}</button>
                      </div>
                      {ollamaError && (
                        <p style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-terra-400, #D4836B)', marginBottom: '8px' }}>{ollamaError}</p>
                      )}
                      <p style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-2)', marginBottom: '6px' }}>Model</p>
                      <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} className="w-full rounded-lg outline-none mb-4" style={{ fontFamily: font.body, fontSize: '13px', padding: '8px 12px', backgroundColor: 'var(--selah-bg-surface, #1C1917)', color: 'var(--selah-text-1)', border: '1px solid var(--selah-border-color, #3D3835)' }}>
                        <option value="">{ollamaModels.length === 0 ? 'Click "Detect models" first...' : 'Select a model...'}</option>
                        {ollamaModels.map((m) => (<option key={m.name} value={m.name}>{m.name}</option>))}
                      </select>
                      <Toggle label="Disable thinking (for models like Qwen 3)" checked={ollamaDisableThinking} onChange={(v) => setOllamaDisableThinking(v)} />
                      <div style={{ marginTop: '16px', marginBottom: '8px' }}>
                        <p style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--selah-text-3)', marginBottom: '12px' }}>Model Parameters</p>
                        {([
                          { label: 'Temperature', value: ollamaTemperature, set: setOllamaTemperature, min: 0, max: 1, step: 0.05 },
                          { label: 'Top P', value: ollamaTopP, set: setOllamaTopP, min: 0, max: 1, step: 0.05 },
                          { label: 'Max tokens', value: ollamaMaxTokens, set: setOllamaMaxTokens, min: 256, max: 8192, step: 256 },
                          { label: 'Freq. penalty', value: ollamaFreqPenalty, set: setOllamaFreqPenalty, min: 0, max: 2, step: 0.1 },
                          { label: 'Pres. penalty', value: ollamaPresencePenalty, set: setOllamaPresencePenalty, min: 0, max: 2, step: 0.1 },
                        ] as const).map(({ label, value, set, min, max, step }) => (
                          <div key={label} className="flex items-center gap-3 mb-2">
                            <span style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-2, #A39E93)', width: '110px', flexShrink: 0 }}>{label}</span>
                            <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(parseFloat(e.target.value))} className="flex-1" style={{ accentColor: 'var(--selah-gold-500, #C6A23C)' }} />
                            <span style={{ fontFamily: font.mono, fontSize: '13px', color: 'var(--selah-text-1, #E8E2D9)', width: '50px', textAlign: 'right', flexShrink: 0 }}>{value}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : isOpenRouter ? (
                    <>
                      <p style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-2)', marginBottom: '6px' }}>
                        API key
                        {hasSavedKey && (
                          <span style={{ marginLeft: '8px', fontSize: '11px', color: 'var(--selah-teal-400, #4A9E88)' }}>
                            ✓ saved — leave blank to keep
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex-1 flex items-center rounded-lg" style={{ backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)', padding: '8px 12px' }}>
                          <input type={showApiKey ? 'text' : 'password'} value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder={hasSavedKey ? '•••••••• (saved)' : 'sk-or-...'} className="flex-1 outline-none" style={{ fontFamily: font.mono, fontSize: '13px', color: 'var(--selah-text-1)', backgroundColor: 'transparent', border: 'none' }} />
                          <button onClick={() => setShowApiKey(!showApiKey)} style={{ color: 'var(--selah-text-3)', background: 'none', border: 'none', cursor: 'pointer' }}>{showApiKey ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}</button>
                        </div>
                      </div>
                      <div className="mb-4">
                        <button onClick={fetchOpenRouterModels} className="transition-colors duration-150" style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 500, padding: '8px 16px', borderRadius: '8px', backgroundColor: 'var(--selah-bg-surface, #1C1917)', color: 'var(--selah-text-1)', border: '1px solid var(--selah-border-color, #3D3835)', cursor: 'pointer', whiteSpace: 'nowrap' }}>{openrouterLoading ? 'Fetching...' : 'Fetch models'}</button>
                      </div>
                      {openrouterError && (
                        <p style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-terra-400, #D4836B)', marginBottom: '8px' }}>{openrouterError}</p>
                      )}
                      <p style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-2)', marginBottom: '6px' }}>Model</p>
                      <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} className="w-full rounded-lg outline-none mb-4" style={{ fontFamily: font.body, fontSize: '13px', padding: '8px 12px', backgroundColor: 'var(--selah-bg-surface, #1C1917)', color: 'var(--selah-text-1)', border: '1px solid var(--selah-border-color, #3D3835)' }}>
                        <option value="">{openrouterModels.length === 0 ? 'Click "Fetch models" first...' : 'Select a model...'}</option>
                        {openrouterModels.map((m) => (<option key={m.id} value={m.id}>{m.name}</option>))}
                      </select>
                      {selectedOrModel && (
                        <div style={{ marginBottom: '16px' }}>
                          <p style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-2, #A39E93)' }}>
                            Input: ${(parseFloat(selectedOrModel.promptCost) * 1_000_000).toFixed(2)}/M tokens &middot; Output: ${(parseFloat(selectedOrModel.completionCost) * 1_000_000).toFixed(2)}/M tokens
                          </p>
                          {orCostEstimate !== null && (
                            <p style={{ fontFamily: font.mono, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)', marginTop: '2px' }}>
                              ~${orCostEstimate.toFixed(4)} estimated per interaction
                            </p>
                          )}
                        </div>
                      )}
                      <p style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--selah-text-3)', marginBottom: '12px' }}>Model Parameters</p>
                      {([
                        { label: 'Temperature', value: orTemperature, set: setOrTemperature, min: 0, max: 1, step: 0.05 },
                        { label: 'Top P', value: orTopP, set: setOrTopP, min: 0, max: 1, step: 0.05 },
                        { label: 'Max tokens', value: orMaxTokens, set: setOrMaxTokens, min: 100, max: 4000, step: 100 },
                        { label: 'Freq. penalty', value: orFreqPenalty, set: setOrFreqPenalty, min: 0, max: 2, step: 0.1 },
                        { label: 'Pres. penalty', value: orPresencePenalty, set: setOrPresencePenalty, min: 0, max: 2, step: 0.1 },
                      ] as const).map(({ label, value, set, min, max, step }) => (
                        <div key={label} className="flex items-center gap-3 mb-2">
                          <span style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-2, #A39E93)', width: '110px', flexShrink: 0 }}>{label}</span>
                          <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(parseFloat(e.target.value))} className="flex-1" style={{ accentColor: 'var(--selah-gold-500, #C6A23C)' }} />
                          <span style={{ fontFamily: font.mono, fontSize: '13px', color: 'var(--selah-text-1, #E8E2D9)', width: '50px', textAlign: 'right', flexShrink: 0 }}>{value}</span>
                        </div>
                      ))}
                      <div style={{ marginTop: '12px' }}>
                        <Toggle label="Disable thinking (for reasoning models like DeepSeek R1, Qwen3, Claude, GPT-5)" checked={orDisableThinking} onChange={(v) => setOrDisableThinking(v)} />
                      </div>
                      <div style={{ marginBottom: '8px' }} />
                    </>
                  ) : (
                    <>
                      <p style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-2)', marginBottom: '6px' }}>
                        API key
                        {hasSavedKey && (
                          <span style={{ marginLeft: '8px', fontSize: '11px', color: 'var(--selah-teal-400, #4A9E88)' }}>
                            ✓ saved — leave blank to keep
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex-1 flex items-center rounded-lg" style={{ backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)', padding: '8px 12px' }}>
                          <input type={showApiKey ? 'text' : 'password'} value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder={hasSavedKey ? '•••••••• (saved)' : 'sk-...'} className="flex-1 outline-none" style={{ fontFamily: font.mono, fontSize: '13px', color: 'var(--selah-text-1)', backgroundColor: 'transparent', border: 'none' }} />
                          <button onClick={() => setShowApiKey(!showApiKey)} style={{ color: 'var(--selah-text-3)', background: 'none', border: 'none', cursor: 'pointer' }}>{showApiKey ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}</button>
                        </div>
                      </div>
                      <p style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-2)', marginBottom: '6px' }}>Server URL <span style={{ color: 'var(--selah-text-3)', fontSize: '11px' }}>(optional — for local servers like llama-server, vLLM)</span></p>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex-1 flex items-center rounded-lg" style={{ backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)', padding: '8px 12px' }}>
                          <input type="text" value={customApiUrl} onChange={(e) => setCustomApiUrl(e.target.value)} placeholder="Leave empty for OpenAI, or http://192.168.1.100:8082/v1" className="flex-1 outline-none" style={{ fontFamily: font.mono, fontSize: '13px', color: 'var(--selah-text-1)', backgroundColor: 'transparent', border: 'none' }} />
                        </div>
                      </div>
                      <p style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-2)', marginBottom: '6px' }}>Model</p>
                      <input type="text" value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} placeholder="e.g., gpt-4o or local model name" className="w-full rounded-lg outline-none mb-4" style={{ fontFamily: font.mono, fontSize: '13px', padding: '8px 12px', backgroundColor: 'var(--selah-bg-surface, #1C1917)', color: 'var(--selah-text-1)', border: '1px solid var(--selah-border-color, #3D3835)' }} />
                    </>
                  )}
                  <div className="flex items-center gap-3">
                    <button onClick={onTestConnection} className="transition-colors duration-150" style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 500, padding: '8px 16px', borderRadius: '8px', backgroundColor: 'var(--selah-bg-surface, #1C1917)', color: 'var(--selah-text-1)', border: '1px solid var(--selah-border-color, #3D3835)', cursor: 'pointer' }}>{aiConfig.connectionStatus === 'testing' ? 'Testing...' : 'Test connection'}</button>
                    {aiConfig.connectionStatus === 'connected' && (<span className="flex items-center gap-1" style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-teal-400, #4A9E88)' }}><Check size={12} strokeWidth={2} /> Connected</span>)}
                    {aiConfig.connectionStatus === 'failed' && (<span className="flex items-center gap-1" style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-terra-400, #D4836B)' }}><X size={12} strokeWidth={2} /> Failed</span>)}
                    <button onClick={() => {
                      if (!selectedProvider) return
                      onSaveAIConfig?.(selectedProvider, isOllama ? ollamaUrl : apiKey, selectedModel)
                      const extraSettings: Record<string, string> = {}
                      if (isOllama) {
                        extraSettings.ollama_disable_thinking = String(ollamaDisableThinking)
                        extraSettings.ollama_temperature = String(ollamaTemperature)
                        extraSettings.ollama_top_p = String(ollamaTopP)
                        extraSettings.ollama_max_tokens = String(ollamaMaxTokens)
                        extraSettings.ollama_freq_penalty = String(ollamaFreqPenalty)
                        extraSettings.ollama_pres_penalty = String(ollamaPresencePenalty)
                      }
                      if (!isOllama && !isOpenRouter && customApiUrl) { extraSettings.custom_api_url = customApiUrl }
                      if (isOpenRouter) {
                        extraSettings.openrouter_temperature = String(orTemperature)
                        extraSettings.openrouter_top_p = String(orTopP)
                        extraSettings.openrouter_max_tokens = String(orMaxTokens)
                        extraSettings.openrouter_freq_penalty = String(orFreqPenalty)
                        extraSettings.openrouter_pres_penalty = String(orPresencePenalty)
                        extraSettings.openrouter_disable_thinking = String(orDisableThinking)
                        const model = openrouterModels.find((m) => m.id === selectedModel)
                        if (model) {
                          extraSettings.openrouter_prompt_cost = model.promptCost
                          extraSettings.openrouter_completion_cost = model.completionCost
                        }
                      }
                      if (Object.keys(extraSettings).length > 0) {
                        fetch('/api/settings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(extraSettings) })
                      }
                    }} className="transition-colors duration-150" style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 600, padding: '8px 16px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-500, #C6A23C)', color: '#fff', border: 'none', cursor: 'pointer' }}>Save</button>
                    {aiConfig.isConfigured && (<button onClick={() => setShowAIConfig(false)} style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-3)', background: 'none', border: 'none', cursor: 'pointer' }}>Cancel</button>)}
                  </div>
                </>
              )}
            </>
          )}
        </SettingsSection>

        {/* 3. STUDY PREFERENCES */}
        <SettingsSection title="Study preferences" description="Customize your reading and study experience.">
          <LabelRow label="Commentary display">
            <div className="flex gap-1 rounded-lg" style={{ padding: '2px', backgroundColor: 'var(--selah-bg-surface, #1C1917)' }}>
              {(['curated', 'curated-extended'] as const).map((mode) => (<button key={mode} onClick={() => onChangeCommentary?.(mode)} className="transition-all duration-150" style={{ padding: '4px 12px', borderRadius: '6px', fontFamily: font.body, fontSize: '12px', fontWeight: 500, border: 'none', cursor: 'pointer', backgroundColor: studyPreferences.commentaryDisplay === mode ? 'var(--selah-bg-elevated, #292524)' : 'transparent', color: studyPreferences.commentaryDisplay === mode ? 'var(--selah-text-1)' : 'var(--selah-text-3)' }}>{mode === 'curated' ? 'Curated' : 'All'}</button>))}
            </div>
          </LabelRow>
          <div>
            <p style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-1)', marginBottom: '8px' }}>Source tier visibility</p>
            {Object.entries(studyPreferences.sourceTierVisibility).map(([tier, visible]) => {
              const labels: Record<string, string> = { canon: 'Canon', scholarship: 'Scholarship', historical: 'Historical', aiAssisted: 'AI-assisted', conjecture: 'Conjecture' }
              return (<label key={tier} className="flex items-center gap-3 py-1 cursor-pointer"><input type="checkbox" checked={visible} onChange={() => onToggleSourceTier?.(tier, !visible)} className="rounded" style={{ accentColor: 'var(--selah-gold-500, #C6A23C)' }} /><span style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-1)' }}>{labels[tier] || tier}</span></label>)
            })}
          </div>
          <LabelRow label="Daily Bread audience">
            <select value={studyPreferences.dailyBreadAudience} onChange={(e) => onChangeDailyBreadAudience?.(e.target.value as AudienceLevel)} className="rounded-lg outline-none" style={{ fontFamily: font.body, fontSize: '13px', padding: '6px 12px', backgroundColor: 'var(--selah-bg-surface)', color: 'var(--selah-text-1)', border: '1px solid var(--selah-border-color)' }}>
              <option value="young-children">Young children</option><option value="family">Family</option><option value="teens">Teens</option><option value="adults">Adults</option>
            </select>
          </LabelRow>
          <LabelRow label="Reading font size">
            <div className="flex items-center gap-3">
              <button onClick={() => onChangeFontSize?.(Math.max(12, studyPreferences.readingFontSize - 1))} className="rounded-md transition-colors duration-150" style={{ padding: '4px 8px', backgroundColor: 'var(--selah-bg-surface)', color: 'var(--selah-text-2)', border: '1px solid var(--selah-border-color)', cursor: 'pointer' }}><Minus size={14} strokeWidth={1.5} /></button>
              <span style={{ fontFamily: font.mono, fontSize: '13px', color: 'var(--selah-text-1)', width: '32px', textAlign: 'center' }}>{studyPreferences.readingFontSize}</span>
              <button onClick={() => onChangeFontSize?.(Math.min(24, studyPreferences.readingFontSize + 1))} className="rounded-md transition-colors duration-150" style={{ padding: '4px 8px', backgroundColor: 'var(--selah-bg-surface)', color: 'var(--selah-text-2)', border: '1px solid var(--selah-border-color)', cursor: 'pointer' }}><Plus size={14} strokeWidth={1.5} /></button>
            </div>
          </LabelRow>
          <LabelRow label="Theme">
            <div className="flex gap-1 rounded-lg" style={{ padding: '2px', backgroundColor: 'var(--selah-bg-surface)' }}>
              {([{ mode: 'light' as ThemeMode, icon: Sun }, { mode: 'dark' as ThemeMode, icon: Moon }, { mode: 'system' as ThemeMode, icon: Monitor }]).map(({ mode, icon: Icon }) => (
                <button key={mode} onClick={() => onChangeTheme?.(mode)} className="flex items-center gap-1.5 transition-all duration-150" style={{ padding: '4px 12px', borderRadius: '6px', fontFamily: font.body, fontSize: '12px', fontWeight: 500, border: 'none', cursor: 'pointer', backgroundColor: studyPreferences.theme === mode ? 'var(--selah-bg-elevated)' : 'transparent', color: studyPreferences.theme === mode ? 'var(--selah-text-1)' : 'var(--selah-text-3)' }}><Icon size={13} strokeWidth={1.5} />{mode.charAt(0).toUpperCase() + mode.slice(1)}</button>
              ))}
            </div>
          </LabelRow>
        </SettingsSection>

        {/* 4. BACKUP & DATA */}
        <SettingsSection title="Backup & data" description="Your notes, bookmarks, collections, reading history, and preferences.">
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-1)' }}>Manual backup</p>
              <p style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3)' }}>Last backup: {backupInfo.lastBackupAgo} &middot; {backupInfo.estimatedSize}</p>
            </div>
            <button onClick={onDownloadBackup} className="flex items-center gap-2 transition-colors duration-150" style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 500, padding: '8px 16px', borderRadius: '8px', backgroundColor: 'var(--selah-bg-surface)', color: 'var(--selah-text-1)', border: '1px solid var(--selah-border-color)', cursor: 'pointer' }}><Download size={14} strokeWidth={1.5} />Download</button>
          </div>
          <Toggle label="Auto-backup" checked={backupInfo.autoBackupEnabled} onChange={(v) => onToggleAutoBackup?.(v)} />
          {backupInfo.autoBackupEnabled && (
            <LabelRow label="Keep backups for">
              <div className="flex gap-1 rounded-lg" style={{ padding: '2px', backgroundColor: 'var(--selah-bg-surface)' }}>
                {([7, 14, 30] as RetentionDays[]).map((days) => (<button key={days} onClick={() => onChangeRetention?.(days)} className="transition-all duration-150" style={{ padding: '4px 12px', borderRadius: '6px', fontFamily: font.body, fontSize: '12px', fontWeight: 500, border: 'none', cursor: 'pointer', backgroundColor: backupInfo.autoBackupRetentionDays === days ? 'var(--selah-bg-elevated)' : 'transparent', color: backupInfo.autoBackupRetentionDays === days ? 'var(--selah-text-1)' : 'var(--selah-text-3)' }}>{days} days</button>))}
              </div>
            </LabelRow>
          )}
          <div className="flex items-center justify-between">
            <p style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-1)' }}>Restore from backup</p>
            <label className="flex items-center gap-2 transition-colors duration-150 cursor-pointer" style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 500, padding: '8px 16px', borderRadius: '8px', backgroundColor: 'var(--selah-bg-surface)', color: 'var(--selah-text-1)', border: '1px solid var(--selah-border-color)' }}>
              <Upload size={14} strokeWidth={1.5} />Choose file
              <input type="file" accept=".db,.sqlite,.sqlite3" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setRestoreFile(f) }} />
            </label>
          </div>
          <div style={{ borderTop: '1px solid var(--selah-border-color, #3D3835)', paddingTop: '16px', marginTop: '8px' }}>
            <p style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--selah-text-3)', marginBottom: '10px' }}>Export</p>
            <div className="space-y-2">
              {[{ label: 'Journal entries', action: onExportJournal }, { label: 'Collections', action: onExportCollections }, { label: 'AI conversations', action: onExportConversations }].map(({ label, action }) => (
                <button key={label} onClick={action} className="block transition-colors duration-150" style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 500, color: 'var(--selah-gold-500, #C6A23C)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: '2px' }}>{label}</button>
              ))}
            </div>
          </div>
        </SettingsSection>
      </div>
    </div>

    <ConfirmDialog
      open={!!restoreFile}
      title="Restore from backup?"
      message={`This will replace all your current data with the backup "${restoreFile?.name}". Your existing notes, journals, and settings will be overwritten.`}
      confirmLabel="Restore"
      cancelLabel="Cancel"
      onConfirm={() => { if (restoreFile) onRestoreBackup?.(restoreFile); setRestoreFile(null) }}
      onCancel={() => setRestoreFile(null)}
    />
  )
}
