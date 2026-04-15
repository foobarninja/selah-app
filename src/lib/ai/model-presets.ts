/**
 * Per-model parameter presets for AI providers.
 *
 * Some models have validated benchmark results that require parameters
 * outside Selah's API defaults. When the user picks one of these models in
 * Settings, we auto-apply the preset so they get the optimal experience
 * without having to know about the override manually.
 *
 * Currently only OpenRouter is wired up — Ollama presets are documented in
 * `docs/models_recommendations.md` and applied per-model by the user.
 *
 * To add a new preset: append an entry to OPENROUTER_PRESETS with a regex
 * that matches the OpenRouter model ID, the parameters, and a short reason
 * shown to the user when the preset is applied.
 */

export interface ModelParams {
  temperature: number
  topP: number
  maxTokens: number
  freqPenalty: number
  presPenalty: number
}

export interface ModelPreset {
  /** Regex tested against the OpenRouter model ID. First match wins. */
  match: RegExp
  /** Display label for the matched family (shown in the banner). */
  label: string
  /** Parameters to apply when the user selects a matching model. */
  params: ModelParams
  /** Short user-facing explanation of why these params are recommended. */
  reason: string
}

/**
 * Presets for OpenRouter-hosted models.
 *
 * Order matters: the first regex match wins. Keep more specific patterns
 * before more general ones.
 */
export const OPENROUTER_PRESETS: ModelPreset[] = [
  {
    // Matches qwen/qwen3.5-plus-*, qwen/qwen-plus-*, qwen/qwen3-plus-*, etc.
    // Specifically the Alibaba-hosted "Plus" flagship variants — NOT the
    // open-weight Qwen 9B/72B models which are dense at smaller sizes.
    match: /qwen.*plus/i,
    label: 'Qwen Plus (dense flagship)',
    params: {
      temperature: 0.02,
      topP: 0.85,
      maxTokens: 2400,
      freqPenalty: 0.3,
      presPenalty: 0.3,
    },
    reason:
      'Dense Qwen models require extremely low temperature for grounding work. Validated at 42/50 across Daniel 5, Exodus 4:24-26, and Judges 6 (mean 42.17, ±0.5 variance).',
  },
]

/**
 * Look up a preset for the given OpenRouter model ID. Returns undefined if
 * no preset matches.
 */
export function findOpenRouterPreset(modelId: string): ModelPreset | undefined {
  if (!modelId) return undefined
  return OPENROUTER_PRESETS.find((p) => p.match.test(modelId))
}
