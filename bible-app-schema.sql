-- ============================================================================
-- Bible Study Application - Unified SQLite Schema
-- ============================================================================
-- Architecture: Pre-baked contextual knowledge + optional AI assist
-- Source data: HelloAO Free Bible API, Strong's Concordance, 
--              Open Cross References, Tyndale Open Study Notes
-- Priority Stack: Canon → Scholarship → Non-biblical History → AI-Assisted → Conjecture (labeled)
-- ============================================================================

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- ============================================================================
-- LAYER 1: SOURCE DATA (populated from public domain / free-use sources)
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1A. TRANSLATIONS & SCRIPTURE TEXT
-- ---------------------------------------------------------------------------

-- Translation metadata (from HelloAO available_translations.json)
CREATE TABLE translations (
    id              TEXT PRIMARY KEY,           -- e.g. 'BSB', 'KJV', 'WEB', 'YLT'
    name            TEXT NOT NULL,              -- Full name in source language
    english_name    TEXT NOT NULL,              -- English name
    short_name      TEXT NOT NULL,              -- Abbreviation
    language        TEXT NOT NULL DEFAULT 'eng', -- ISO 639-3
    text_direction  TEXT NOT NULL DEFAULT 'ltr', -- 'ltr' or 'rtl'
    website         TEXT,
    license_url     TEXT,
    license_notes   TEXT,
    num_books       INTEGER,
    num_chapters    INTEGER,
    num_verses      INTEGER,
    has_strongs     BOOLEAN DEFAULT 0,          -- Does this translation include Strong's numbers?
    is_primary      BOOLEAN DEFAULT 0,          -- Flagged as a default/featured translation
    description     TEXT,                        -- User-facing description of translation philosophy
    sort_order      INTEGER DEFAULT 100          -- Display ordering
);

-- Books of the Bible (canonical ordering)
CREATE TABLE books (
    id              TEXT PRIMARY KEY,           -- USFM ID: 'GEN', 'EXO', ... 'REV'
    name            TEXT NOT NULL,              -- 'Genesis', 'Exodus', etc.
    testament       TEXT NOT NULL,              -- 'OT' or 'NT'
    book_order      INTEGER NOT NULL,           -- 1-66 canonical order
    num_chapters    INTEGER NOT NULL,
    category        TEXT                        -- 'law', 'history', 'poetry', 'major_prophet', 
                                                -- 'minor_prophet', 'gospel', 'acts', 'epistle', 'apocalyptic'
);

-- Verse text across all translations
-- This is the largest table - populated from HelloAO bible.eng.db
CREATE TABLE verses (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    translation_id  TEXT NOT NULL REFERENCES translations(id),
    book_id         TEXT NOT NULL REFERENCES books(id),
    chapter         INTEGER NOT NULL,
    verse           INTEGER NOT NULL,
    text            TEXT NOT NULL,              -- Plain text content
    text_formatted  TEXT,                       -- With formatting hints (poetry indent, etc.)
    words_of_jesus  BOOLEAN DEFAULT 0,          -- Red letter flag
    heading         TEXT,                       -- Section heading preceding this verse (if any)
    
    UNIQUE(translation_id, book_id, chapter, verse)
);

CREATE INDEX idx_verses_ref ON verses(book_id, chapter, verse);
CREATE INDEX idx_verses_translation ON verses(translation_id);
CREATE INDEX idx_verses_fts_ref ON verses(book_id, chapter, verse, translation_id);

-- Full-text search on verse content
CREATE VIRTUAL TABLE verses_fts USING fts5(
    text,
    content='verses',
    content_rowid='id',
    tokenize='porter unicode61'
);

-- Footnotes associated with verses
CREATE TABLE footnotes (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    translation_id  TEXT NOT NULL REFERENCES translations(id),
    book_id         TEXT NOT NULL REFERENCES books(id),
    chapter         INTEGER NOT NULL,
    verse           INTEGER NOT NULL,
    note_text       TEXT NOT NULL,
    caller          TEXT                        -- The footnote marker character
);

-- ---------------------------------------------------------------------------
-- 1B. STRONG'S CONCORDANCE (Hebrew & Greek)
-- ---------------------------------------------------------------------------

-- Strong's dictionary entries
CREATE TABLE strongs_entries (
    number          TEXT PRIMARY KEY,           -- 'H1', 'H2', ... 'G1', 'G2', ...
    language        TEXT NOT NULL,              -- 'hebrew' or 'greek'
    word            TEXT NOT NULL,              -- Original language word (UTF-8)
    transliteration TEXT,                       -- Romanized pronunciation guide
    pronunciation   TEXT,                       -- Phonetic pronunciation
    definition      TEXT NOT NULL,              -- Full definition text
    short_definition TEXT,                      -- Brief gloss
    kjv_usage       TEXT,                       -- How KJV translates this word
    derivation      TEXT,                       -- Etymology / root info
    related_numbers TEXT                        -- JSON array of related Strong's numbers
);

CREATE INDEX idx_strongs_lang ON strongs_entries(language);

-- Mapping: which Strong's number appears in which verse
-- (populated from BSB+Strong's or similar tagged translation)
CREATE TABLE strongs_verse_map (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    strongs_number  TEXT NOT NULL REFERENCES strongs_entries(number),
    book_id         TEXT NOT NULL REFERENCES books(id),
    chapter         INTEGER NOT NULL,
    verse           INTEGER NOT NULL,
    word_position   INTEGER,                   -- Position of word in verse
    translated_word TEXT                        -- The English word this maps to
);

CREATE INDEX idx_strongs_map_ref ON strongs_verse_map(book_id, chapter, verse);
CREATE INDEX idx_strongs_map_number ON strongs_verse_map(strongs_number);

-- ---------------------------------------------------------------------------
-- 1C. CROSS-REFERENCES (from open-cross-ref dataset)
-- ---------------------------------------------------------------------------

CREATE TABLE cross_references (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    source_book     TEXT NOT NULL REFERENCES books(id),
    source_chapter  INTEGER NOT NULL,
    source_verse    INTEGER NOT NULL,
    target_book     TEXT NOT NULL REFERENCES books(id),
    target_chapter  INTEGER NOT NULL,
    target_verse    INTEGER NOT NULL,
    target_end_verse INTEGER,                  -- If reference spans multiple verses
    score           INTEGER,                   -- Relevance score from dataset
    ref_type        TEXT DEFAULT 'cross'        -- 'cross', 'parallel', 'quotation', 'allusion'
);

CREATE INDEX idx_xref_source ON cross_references(source_book, source_chapter, source_verse);
CREATE INDEX idx_xref_target ON cross_references(target_book, target_chapter, target_verse);

-- ---------------------------------------------------------------------------
-- 1D. COMMENTARIES (from HelloAO commentary API)
-- ---------------------------------------------------------------------------

CREATE TABLE commentary_sources (
    id              TEXT PRIMARY KEY,           -- e.g. 'adam-clarke', 'matthew-henry', 'tyndale'
    name            TEXT NOT NULL,
    english_name    TEXT NOT NULL,
    website         TEXT,
    license_url     TEXT,
    license_notes   TEXT,
    num_books       INTEGER,
    num_verses      INTEGER,
    era             TEXT,                       -- Rough time period: 'reformation', '18th-century', 'modern'
    tradition       TEXT                        -- Theological tradition if relevant
);

CREATE TABLE commentary_entries (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    source_id       TEXT NOT NULL REFERENCES commentary_sources(id),
    book_id         TEXT NOT NULL REFERENCES books(id),
    chapter         INTEGER NOT NULL,
    verse           INTEGER,                   -- NULL for chapter-level introductions
    text            TEXT NOT NULL,
    is_introduction BOOLEAN DEFAULT 0           -- Chapter or book introduction
);

CREATE INDEX idx_commentary_ref ON commentary_entries(book_id, chapter, verse);
CREATE INDEX idx_commentary_source ON commentary_entries(source_id);

-- Full-text search on commentary content
CREATE VIRTUAL TABLE commentary_fts USING fts5(
    text,
    content='commentary_entries',
    content_rowid='id',
    tokenize='porter unicode61'
);


-- ============================================================================
-- LAYER 2: PRE-BAKED CONTEXTUAL KNOWLEDGE (built via Claude pipeline)
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 2A. RELATIONAL LENS - Characters & Relationships
-- ---------------------------------------------------------------------------

-- Every named (and significant unnamed) person in Scripture
CREATE TABLE characters (
    id              TEXT PRIMARY KEY,           -- Slug: 'david', 'woman-at-well', 'centurion-cross'
    name            TEXT NOT NULL,              -- Display name
    aliases         TEXT,                       -- JSON array of alternate names/spellings
    gender          TEXT,                       -- 'male', 'female', 'unknown'
    tribe_clan      TEXT,                       -- Tribal/clan affiliation if known
    occupation      TEXT,                       -- Primary occupation or role
    social_status   TEXT,                       -- 'royalty', 'priest', 'merchant', 'servant', 
                                                -- 'outcast', 'military', 'common', 'slave', etc.
    era             TEXT,                       -- 'patriarchal', 'exodus', 'judges', 'united-monarchy',
                                                -- 'divided-monarchy', 'exile', 'post-exile', 
                                                -- 'intertestamental', 'life-of-christ', 'early-church'
    approximate_dates TEXT,                     -- Rough dates if known (e.g. '~1000 BC')
    
    -- Summary bios at different depths
    bio_brief       TEXT,                       -- 1-2 sentences
    bio_full        TEXT,                       -- Full narrative bio
    
    -- Modern bridge framing
    modern_parallel TEXT,                       -- Modern relational framing of their experience
    
    -- Emotional & spiritual arc
    emotional_arc   TEXT,                       -- JSON: key moments with emotional state
    faith_journey   TEXT,                       -- Narrative of their relationship with God
    
    -- Source tracking
    source_tier     TEXT NOT NULL DEFAULT 'scholarship',  -- 'canon', 'scholarship', 'historical', 'ai_assisted', 'conjecture'
    source_notes    TEXT,                       -- Citation/attribution for this data
    
    -- Tyndale profile link (if exists)
    tyndale_profile_id TEXT,                   -- Links to original Tyndale profile if this was seeded from one
    
    is_named        BOOLEAN DEFAULT 1,          -- Named vs unnamed but significant (e.g. "the Samaritan woman")
    prominence      TEXT DEFAULT 'secondary'    -- 'primary', 'secondary', 'minor', 'unnamed-notable'
);

CREATE INDEX idx_characters_era ON characters(era);
CREATE INDEX idx_characters_prominence ON characters(prominence);

-- Full-text search on character profiles
CREATE VIRTUAL TABLE characters_fts USING fts5(
    name, aliases, bio_brief, bio_full, modern_parallel,
    content='characters',
    content_rowid='rowid',
    tokenize='porter unicode61'
);

-- Relationships between characters
CREATE TABLE character_relationships (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    character_a     TEXT NOT NULL REFERENCES characters(id),
    character_b     TEXT NOT NULL REFERENCES characters(id),
    relationship    TEXT NOT NULL,              -- 'parent', 'child', 'spouse', 'sibling', 
                                                -- 'teacher', 'disciple', 'adversary', 'servant',
                                                -- 'companion', 'ruler', 'subject', 'friend'
    description     TEXT,                       -- Brief note on the relationship
    source_tier     TEXT NOT NULL DEFAULT 'canon'
);

CREATE INDEX idx_char_rel_a ON character_relationships(character_a);
CREATE INDEX idx_char_rel_b ON character_relationships(character_b);

-- Characters appearing in specific passages (the "scene cast")
CREATE TABLE character_appearances (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    character_id    TEXT NOT NULL REFERENCES characters(id),
    book_id         TEXT NOT NULL REFERENCES books(id),
    chapter         INTEGER NOT NULL,
    verse_start     INTEGER NOT NULL,
    verse_end       INTEGER,
    
    role            TEXT NOT NULL,              -- 'protagonist', 'deuteragonist', 'witness', 
                                                -- 'antagonist', 'bystander', 'narrator', 'addressee',
                                                -- 'mentioned', 'implied'
    emotional_state TEXT,                       -- What they're feeling in this moment
    motivation      TEXT,                       -- What's driving them here
    stakes          TEXT,                       -- What they stand to gain or lose
    
    -- The "second lead" insight: what's interesting about THIS person in THIS scene
    narrative_note  TEXT,                       -- Why this character's perspective matters here
    modern_parallel TEXT,                       -- Modern bridge for their specific experience in this scene
    
    source_tier     TEXT NOT NULL DEFAULT 'scholarship'
);

CREATE INDEX idx_appearances_char ON character_appearances(character_id);
CREATE INDEX idx_appearances_ref ON character_appearances(book_id, chapter, verse_start);

-- ---------------------------------------------------------------------------
-- 2B. CONCEPTUAL LENS - Themes & Topics
-- ---------------------------------------------------------------------------

-- Master theme taxonomy
CREATE TABLE themes (
    id              TEXT PRIMARY KEY,           -- Slug: 'love', 'forgiveness', 'suffering', 'justice'
    name            TEXT NOT NULL,              -- Display name
    category        TEXT,                       -- 'virtue', 'emotion', 'doctrine', 'relationship',
                                                -- 'condition', 'action', 'attribute-of-god'
    parent_theme_id TEXT REFERENCES themes(id), -- For hierarchical themes (e.g. 'agape' under 'love')
    definition      TEXT,                       -- What this theme means in biblical context
    modern_framing  TEXT,                       -- How this theme manifests in modern life
    related_themes  TEXT,                       -- JSON array of related theme IDs
    source_tier     TEXT NOT NULL DEFAULT 'scholarship'
);

-- Passages tagged with themes
CREATE TABLE passage_themes (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    theme_id        TEXT NOT NULL REFERENCES themes(id),
    book_id         TEXT NOT NULL REFERENCES books(id),
    chapter         INTEGER NOT NULL,
    verse_start     INTEGER NOT NULL,
    verse_end       INTEGER,
    
    relevance       TEXT DEFAULT 'primary',     -- 'primary', 'secondary', 'illustrative'
    context_note    TEXT,                       -- How this theme manifests in this passage
    
    source_tier     TEXT NOT NULL DEFAULT 'scholarship'
);

CREATE INDEX idx_passage_themes_theme ON passage_themes(theme_id);
CREATE INDEX idx_passage_themes_ref ON passage_themes(book_id, chapter, verse_start);

-- ---------------------------------------------------------------------------
-- 2C. CLIMATE LENS - Historical/Political/Social/Geographic Environment
-- ---------------------------------------------------------------------------

-- Geographic locations
CREATE TABLE locations (
    id              TEXT PRIMARY KEY,           -- Slug: 'jerusalem', 'bethlehem', 'sea-of-galilee'
    name            TEXT NOT NULL,
    modern_name     TEXT,                       -- Modern equivalent if different
    region          TEXT,                       -- 'judea', 'galilee', 'samaria', 'egypt', 'babylon', etc.
    latitude        REAL,                       -- Approximate coordinates (for future map features)
    longitude       REAL,
    description     TEXT,                       -- What this place was like
    significance    TEXT,                       -- Why this location mattered
    source_tier     TEXT NOT NULL DEFAULT 'scholarship'
);

-- Historical periods / political contexts
CREATE TABLE climate_contexts (
    id              TEXT PRIMARY KEY,           -- Slug: 'babylonian-exile', 'roman-occupation-judea'
    name            TEXT NOT NULL,
    era             TEXT NOT NULL,              -- Same era values as characters table
    date_range      TEXT,                       -- Approximate: '586-538 BC'
    
    -- The environment portrait
    political       TEXT,                       -- Government structure, ruling powers, political tensions
    economic        TEXT,                       -- Wealth/poverty, trade, taxation, prosperity/famine
    social          TEXT,                       -- Class structure, cultural norms, social tensions
    religious       TEXT,                       -- Religious landscape, competing beliefs, temple status
    geographic      TEXT,                       -- Physical environment, climate, resources
    daily_life      TEXT,                       -- What ordinary life looked like
    
    -- Modern bridge
    modern_parallel TEXT,                       -- What modern situation this maps to
    
    source_tier     TEXT NOT NULL DEFAULT 'scholarship',
    source_notes    TEXT
);

-- Link climate contexts to passages
CREATE TABLE passage_climate (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    context_id      TEXT NOT NULL REFERENCES climate_contexts(id),
    book_id         TEXT NOT NULL REFERENCES books(id),
    chapter         INTEGER NOT NULL,
    verse_start     INTEGER NOT NULL,
    verse_end       INTEGER,
    location_id     TEXT REFERENCES locations(id),
    
    context_note    TEXT,                       -- How the climate specifically impacts this passage
    
    source_tier     TEXT NOT NULL DEFAULT 'scholarship'
);

CREATE INDEX idx_passage_climate_ctx ON passage_climate(context_id);
CREATE INDEX idx_passage_climate_ref ON passage_climate(book_id, chapter, verse_start);

-- ---------------------------------------------------------------------------
-- 2D. NARRATIVE UNITS - Passages as coherent story blocks
-- ---------------------------------------------------------------------------

-- Pericopes / narrative units (the atomic unit for the three lenses)
CREATE TABLE narrative_units (
    id              TEXT PRIMARY KEY,           -- Slug: 'woman-at-well', 'temple-cleansing', 'burning-bush'
    title           TEXT NOT NULL,              -- 'The Woman at the Well'
    book_id         TEXT NOT NULL REFERENCES books(id),
    chapter_start   INTEGER NOT NULL,
    verse_start     INTEGER NOT NULL,
    chapter_end     INTEGER,
    verse_end       INTEGER,
    
    -- Narrative metadata
    summary         TEXT,                       -- What happens in this passage
    significance    TEXT,                       -- Why this matters theologically
    
    -- The three lenses, pre-baked for this unit
    relational_note TEXT,                       -- Key relational dynamics at play
    conceptual_note TEXT,                       -- Primary themes this passage explores
    climate_note    TEXT,                       -- Environmental factors affecting the narrative
    
    -- Modern bridge
    modern_parallel TEXT,                       -- Full modern framing for this narrative
    
    -- Sermon prep helpers
    key_questions   TEXT,                       -- JSON array of discussion questions
    preaching_angles TEXT,                      -- JSON array of possible sermon approaches
    
    source_tier     TEXT NOT NULL DEFAULT 'scholarship',
    source_notes    TEXT
);

CREATE INDEX idx_narrative_ref ON narrative_units(book_id, chapter_start, verse_start);

-- Full-text search on narrative units
CREATE VIRTUAL TABLE narrative_fts USING fts5(
    title, summary, significance, modern_parallel,
    content='narrative_units',
    content_rowid='rowid',
    tokenize='porter unicode61'
);


-- ---------------------------------------------------------------------------
-- 2E. DAILY BREAD - Family Devotionals & Dinner Table Bible Study
-- ---------------------------------------------------------------------------

-- Life situation taxonomy (what's on your heart tonight?)
CREATE TABLE devotional_tags (
    id              TEXT PRIMARY KEY,           -- Slug: 'stress-at-work', 'conflict-with-friend'
    name            TEXT NOT NULL,              -- Display: 'Stress at work'
    category        TEXT NOT NULL,              -- 'emotion', 'situation', 'relationship', 'season', 
                                                -- 'milestone', 'struggle', 'celebration'
    icon            TEXT,                       -- Optional emoji or icon identifier for the picker UI
    parent_tag_id   TEXT REFERENCES devotional_tags(id), -- Hierarchical: 'fear' → 'fear-of-failure'
    description     TEXT,                       -- Brief description of this life situation
    sort_order      INTEGER DEFAULT 100
);

-- Pre-baked devotional entries (5-minute family moments)
CREATE TABLE devotionals (
    id              TEXT PRIMARY KEY,           -- Slug: 'josephs-brothers-jealousy'
    title           TEXT NOT NULL,              -- 'When someone else gets what you wanted'
    
    -- The passage (short: 3-5 verses max)
    book_id         TEXT NOT NULL REFERENCES books(id),
    chapter         INTEGER NOT NULL,
    verse_start     INTEGER NOT NULL,
    verse_end       INTEGER NOT NULL,
    
    -- The teaching (written for the dinner table, not the pulpit)
    context_brief   TEXT NOT NULL,              -- 1-2 paragraph setup: who, what, why it matters
                                                -- Written conversationally, not academically
    modern_moment   TEXT NOT NULL,              -- "You know that feeling when..." bridge to today
    
    -- Conversation starters (2-4 open-ended questions)
    -- Designed to spark discussion, not quiz knowledge
    conversation_starters TEXT NOT NULL,        -- JSON array of question strings
    
    -- Optional deeper thread for older kids / adults who want more
    going_deeper    TEXT,                       -- A brief pointer to the full narrative unit or 
                                                -- related passages for later personal study
    
    -- Age range guidance
    audience        TEXT DEFAULT 'family',      -- 'young-children', 'family', 'teens', 'adults'
    
    -- Timing
    estimated_minutes INTEGER DEFAULT 5,        -- Target: 5 min, but some may be 3 or 8
    
    -- Calendar / seasonal associations (optional)
    season          TEXT,                       -- 'advent', 'lent', 'easter', 'thanksgiving', 
                                                -- 'new-year', 'back-to-school', NULL for anytime
    day_of_year     INTEGER,                   -- 1-366 for calendar-based daily plans, NULL for unscheduled
    
    -- Links back to the deep study layer
    narrative_id    TEXT REFERENCES narrative_units(id),  -- Full narrative unit for deeper study
    
    -- Source tracking
    source_tier     TEXT NOT NULL DEFAULT 'ai_assisted',
    source_notes    TEXT,
    
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_devotionals_ref ON devotionals(book_id, chapter, verse_start);
CREATE INDEX idx_devotionals_season ON devotionals(season);
CREATE INDEX idx_devotionals_audience ON devotionals(audience);
CREATE INDEX idx_devotionals_day ON devotionals(day_of_year);

-- Junction: devotionals ↔ life situation tags (many-to-many)
CREATE TABLE devotional_tag_map (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    devotional_id   TEXT NOT NULL REFERENCES devotionals(id),
    tag_id          TEXT NOT NULL REFERENCES devotional_tags(id),
    relevance       TEXT DEFAULT 'primary',     -- 'primary' or 'secondary'
    
    UNIQUE(devotional_id, tag_id)
);

CREATE INDEX idx_devtag_devotional ON devotional_tag_map(devotional_id);
CREATE INDEX idx_devtag_tag ON devotional_tag_map(tag_id);

-- Full-text search on devotionals
CREATE VIRTUAL TABLE devotionals_fts USING fts5(
    title, context_brief, modern_moment,
    content='devotionals',
    content_rowid='rowid',
    tokenize='porter unicode61'
);

-- User's devotional history (track what's been used, avoid repeats)
CREATE TABLE devotional_history (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    devotional_id   TEXT NOT NULL REFERENCES devotionals(id),
    completed_at    TEXT NOT NULL DEFAULT (datetime('now')),
    family_notes    TEXT,                       -- Optional: what the family discussed, reactions
    rating          INTEGER                    -- 1-5: how well it landed (helps surface better ones)
);

CREATE INDEX idx_devhist_devotional ON devotional_history(devotional_id);
CREATE INDEX idx_devhist_date ON devotional_history(completed_at);


-- ============================================================================
-- LAYER 3: AI PROVIDER ABSTRACTION
-- ============================================================================

-- Supported AI providers and their configurations
CREATE TABLE ai_providers (
    id              TEXT PRIMARY KEY,           -- 'anthropic', 'google', 'openai', 'ollama', 'custom'
    name            TEXT NOT NULL,              -- Display name: 'Anthropic (Claude)', 'Google (Gemini)'
    api_base_url    TEXT NOT NULL,              -- Default endpoint URL
    api_key_header  TEXT NOT NULL DEFAULT 'Authorization',  -- Header name for auth
    api_key_prefix  TEXT DEFAULT 'Bearer ',     -- Prefix before key value (e.g. 'Bearer ')
    
    -- Request format template (JSON structure)
    -- Uses {{model}}, {{system_prompt}}, {{user_prompt}}, {{max_tokens}} placeholders
    request_template TEXT NOT NULL,
    
    -- Response parsing path (dot-notation to extract response text)
    response_text_path TEXT NOT NULL,           -- e.g. 'content.0.text' or 'candidates.0.content.parts.0.text'
    
    is_local        BOOLEAN DEFAULT 0,          -- Ollama, llama.cpp, etc. (no API key needed)
    notes           TEXT
);

-- Default provider configurations (pre-populated)
INSERT INTO ai_providers (id, name, api_base_url, api_key_header, api_key_prefix, request_template, response_text_path, is_local) VALUES
('anthropic', 'Anthropic (Claude)', 'https://api.anthropic.com/v1/messages', 'x-api-key', '', 
 '{"model":"{{model}}","max_tokens":{{max_tokens}},"system":"{{system_prompt}}","messages":[{"role":"user","content":"{{user_prompt}}"}]}',
 'content.0.text', 0),
 
('google', 'Google (Gemini)', 'https://generativelanguage.googleapis.com/v1beta/models/{{model}}:generateContent', 'x-goog-api-key', '',
 '{"system_instruction":{"parts":[{"text":"{{system_prompt}}"}]},"contents":[{"parts":[{"text":"{{user_prompt}}"}]}],"generationConfig":{"maxOutputTokens":{{max_tokens}}}}',
 'candidates.0.content.parts.0.text', 0),
 
('openai', 'OpenAI (GPT)', 'https://api.openai.com/v1/chat/completions', 'Authorization', 'Bearer ',
 '{"model":"{{model}}","max_tokens":{{max_tokens}},"messages":[{"role":"system","content":"{{system_prompt}}"},{"role":"user","content":"{{user_prompt}}"}]}',
 'choices.0.message.content', 0),
 
('ollama', 'Ollama (Local)', 'http://localhost:11434/api/chat', '', '',
 '{"model":"{{model}}","messages":[{"role":"system","content":"{{system_prompt}}"},{"role":"user","content":"{{user_prompt}}"}],"stream":false,"options":{"num_predict":{{max_tokens}}}}',
 'message.content', 1),

('custom', 'Custom / OpenAI-Compatible', 'http://localhost:8080/v1/chat/completions', 'Authorization', 'Bearer ',
 '{"model":"{{model}}","max_tokens":{{max_tokens}},"messages":[{"role":"system","content":"{{system_prompt}}"},{"role":"user","content":"{{user_prompt}}"}]}',
 'choices.0.message.content', 0);

-- Available models per provider (pre-populated with known good models)
CREATE TABLE ai_models (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    provider_id     TEXT NOT NULL REFERENCES ai_providers(id),
    model_id        TEXT NOT NULL,              -- API model string: 'claude-sonnet-4-20250514'
    name            TEXT NOT NULL,              -- Display name: 'Claude Sonnet 4'
    is_default      BOOLEAN DEFAULT 0,
    max_context     INTEGER,                    -- Context window size
    notes           TEXT
);


-- ============================================================================
-- LAYER 4: APPLICATION CONFIGURATION & USER STATE
-- ============================================================================

-- Application settings (key-value with types)
CREATE TABLE app_settings (
    key             TEXT PRIMARY KEY,
    value           TEXT NOT NULL,
    value_type      TEXT NOT NULL DEFAULT 'string',  -- 'string', 'integer', 'boolean', 'json'
    category        TEXT NOT NULL DEFAULT 'general',  -- 'general', 'ai', 'display', 'study'
    description     TEXT
);

-- Default settings
INSERT INTO app_settings (key, value, value_type, category, description) VALUES
('active_provider',       'none',           'string',  'ai',      'Currently selected AI provider ID'),
('active_model',          '',               'string',  'ai',      'Currently selected model ID'),
('api_key_encrypted',     '',               'string',  'ai',      'Encrypted API key for active provider'),
('ai_enabled',            'false',          'boolean', 'ai',      'Whether AI features are active'),
('ai_max_tokens',         '2048',           'integer', 'ai',      'Max tokens for AI responses'),
('primary_translation',   'BSB',            'string',  'study',   'Default translation for reading'),
('parallel_translations', '["KJV","WEB"]',  'json',    'study',   'Translations shown in parallel view'),
('font_size',             '16',             'integer', 'display', 'Base font size in pixels'),
('theme',                 'system',         'string',  'display', 'UI theme: system, light, dark'),
('show_strongs',          'true',           'boolean', 'study',   'Show Strong''s numbers inline'),
('show_cross_refs',       'true',           'boolean', 'study',   'Show cross-references'),
('show_commentary',       'true',           'boolean', 'study',   'Show commentary panel'),
('conjecture_visible',    'true',           'boolean', 'study',   'Show AI-assisted and conjecture content'),
('source_tier_filter',    '["canon","scholarship","historical","ai_assisted","conjecture"]', 
                                            'json',    'study',   'Which source tiers to display');

-- The canon-first system prompt (used by all providers)
-- Stored in DB so it can be refined without rebuilding the app
INSERT INTO app_settings (key, value, value_type, category, description) VALUES
('ai_system_prompt', 
'You are a biblical study assistant embedded in a personal Bible study application. You must follow these rules absolutely:

PRIORITY STACK (immutable):
1. CANON: Scripture is the primary authority. Never contradict, reinterpret, or diminish the biblical text.
2. SCHOLARSHIP: Use established biblical scholarship (commentaries, lexicons, historical-critical research) as your secondary source.
3. NON-BIBLICAL HISTORY: Secular historical records, archaeology, and geography that illuminate the biblical context.
4. AI-ASSISTED: Your own synthesis and analysis, grounded in the above sources. Always indicate when you are synthesizing rather than citing.
5. CONJECTURE: Hypotheses and interpretive possibilities. These MUST be explicitly labeled as conjecture and never presented as established fact.

APPROACH:
- When discussing any passage, consider ALL THREE LENSES: relational (who is involved, what are they feeling), conceptual (what themes are at play), and climate (what is the political, social, economic, geographic environment).
- Pay attention to secondary characters — the unnamed, the overlooked, the witnesses. Their perspective often reveals the most relatable human experience.
- Bridge ancient context to modern experience. The human condition is unchanged; technology and environment have changed. Help the user see themselves in the text.
- When exploring the original languages (Hebrew/Greek), reference Strong''s numbers and explain how different translations render the same word and why.
- For sermon preparation, offer multiple angles of approach and discussion questions that invite genuine engagement.

NEVER:
- Present non-canonical material as scriptural
- Speculate without labeling it as such
- Promote any specific denominational interpretation over others
- Dismiss or diminish difficult passages
- Add to or subtract from the biblical text',
'string', 'ai', 'System prompt sent to all AI providers for canon-first compliance');

-- ---------------------------------------------------------------------------
-- 4A. USER ANNOTATIONS & STUDY JOURNAL
-- ---------------------------------------------------------------------------
-- 
-- Design philosophy: Every note is a first-class object in a personal
-- theological journal. Notes can be anchored to anything in the system
-- (verses, characters, themes, narrative units, devotionals, etc.) and
-- are tagged with the same taxonomy the app uses — so when you're studying
-- a topic in the future, your own past thoughts surface automatically.
--
-- The "you've been here before" feature works through three channels:
--   1. Theme overlap: your note is tagged 'forgiveness' → surfaces when 
--      you're studying any passage tagged 'forgiveness'
--   2. Anchor overlap: your note is anchored to David → surfaces when 
--      you're viewing anything related to David
--   3. Full-text resonance: your note mentions 'exile' → FTS surfaces it 
--      when you're reading about the Babylonian exile
-- ---------------------------------------------------------------------------

-- The core note / annotation / journal entry
CREATE TABLE user_notes (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Content
    title           TEXT,                       -- Optional title (e.g. "Thoughts on Paul's thorn")
    content         TEXT NOT NULL,              -- The note body (markdown supported)
    
    -- Classification
    note_type       TEXT NOT NULL DEFAULT 'annotation',  
                                                -- 'annotation': margin note on a specific passage
                                                -- 'reflection': personal journal / devotional thought
                                                -- 'question': something to explore further
                                                -- 'sermon_idea': seed for a future sermon
                                                -- 'insight': an aha moment or connection discovered
                                                -- 'prayer': personal prayer prompted by study
    
    -- Highlight / visual marker (for inline annotations)
    highlight_color TEXT DEFAULT 'default',     -- 'default', 'yellow', 'blue', 'green', 'pink', 'orange'
    is_pinned       BOOLEAN DEFAULT 0,          -- Pinned notes surface first in relevant contexts
    
    -- Context: what were you doing when you wrote this?
    study_context   TEXT,                       -- 'reading', 'sermon_prep', 'devotional', 'word_study',
                                                -- 'ai_conversation', 'family_study'
    ai_conversation_id INTEGER REFERENCES ai_conversations(id),  -- Link to AI chat that prompted this
    
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Full-text search on user notes (powers the "you've been here before" feature)
CREATE VIRTUAL TABLE user_notes_fts USING fts5(
    title, content,
    content='user_notes',
    content_rowid='id',
    tokenize='porter unicode61'
);

-- ---------------------------------------------------------------------------
-- Anchors: link a note to anything in the system (polymorphic references)
-- A single note can be anchored to multiple things simultaneously.
-- e.g. a note about Peter's denial could be anchored to:
--   - The passage (Luke 22:54-62)
--   - The character (peter)
--   - The theme (failure, restoration)
--   - The narrative unit (peters-denial)
--   - A location (courtyard of the high priest)
-- ---------------------------------------------------------------------------

CREATE TABLE user_note_anchors (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    note_id         INTEGER NOT NULL REFERENCES user_notes(id) ON DELETE CASCADE,
    
    -- What type of thing is this anchored to?
    anchor_type     TEXT NOT NULL,              -- 'verse', 'verse_range', 'character', 'theme',
                                                -- 'narrative_unit', 'climate_context', 'location',
                                                -- 'devotional', 'strongs', 'commentary'
    
    -- Reference fields (used based on anchor_type)
    -- For 'verse': book_id + chapter + verse_start
    -- For 'verse_range': book_id + chapter + verse_start + verse_end
    -- For everything else: ref_id points to the entity's primary key
    book_id         TEXT REFERENCES books(id),
    chapter         INTEGER,
    verse_start     INTEGER,
    verse_end       INTEGER,
    ref_id          TEXT,                       -- character.id, theme.id, narrative_unit.id, etc.
    
    -- Is this the primary anchor? (the thing you were looking at when you wrote the note)
    is_primary      BOOLEAN DEFAULT 0,
    
    UNIQUE(note_id, anchor_type, book_id, chapter, verse_start, ref_id)
);

CREATE INDEX idx_note_anchors_note ON user_note_anchors(note_id);
CREATE INDEX idx_note_anchors_verse ON user_note_anchors(book_id, chapter, verse_start);
CREATE INDEX idx_note_anchors_ref ON user_note_anchors(anchor_type, ref_id);

-- ---------------------------------------------------------------------------
-- Theme tags on notes: connects user notes to the system theme taxonomy
-- This is the primary engine for the "you've been here before" surfacing.
-- When the user is studying a passage tagged with theme X, any note also
-- tagged with theme X surfaces in the margin.
-- ---------------------------------------------------------------------------

CREATE TABLE user_note_themes (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    note_id         INTEGER NOT NULL REFERENCES user_notes(id) ON DELETE CASCADE,
    theme_id        TEXT NOT NULL REFERENCES themes(id),
    
    UNIQUE(note_id, theme_id)
);

CREATE INDEX idx_note_themes_note ON user_note_themes(note_id);
CREATE INDEX idx_note_themes_theme ON user_note_themes(theme_id);

-- ---------------------------------------------------------------------------
-- User's own freeform tags (personal taxonomy, separate from system themes)
-- e.g. "revisit this", "share with small group", "ask pastor about"
-- ---------------------------------------------------------------------------

CREATE TABLE user_tags (
    id              TEXT PRIMARY KEY,           -- Slug: 'revisit', 'share-with-group'
    name            TEXT NOT NULL,              -- Display: 'Revisit this'
    color           TEXT DEFAULT 'default',
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE user_note_tags (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    note_id         INTEGER NOT NULL REFERENCES user_notes(id) ON DELETE CASCADE,
    tag_id          TEXT NOT NULL REFERENCES user_tags(id),
    
    UNIQUE(note_id, tag_id)
);

CREATE INDEX idx_note_tags_note ON user_note_tags(note_id);
CREATE INDEX idx_note_tags_tag ON user_note_tags(tag_id);

-- ---------------------------------------------------------------------------
-- User bookmarks (lightweight: just a marker on a verse, no content)
-- For quick "I want to come back to this" without writing a full note.
-- Bookmarks can optionally link to a note for deeper annotation.
-- ---------------------------------------------------------------------------

CREATE TABLE user_bookmarks (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id         TEXT NOT NULL REFERENCES books(id),
    chapter         INTEGER NOT NULL,
    verse           INTEGER,
    color           TEXT DEFAULT 'default',
    note_id         INTEGER REFERENCES user_notes(id),  -- Optional: linked annotation
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_bookmarks_ref ON user_bookmarks(book_id, chapter, verse);

-- User's sermon/study collections
CREATE TABLE user_collections (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    title           TEXT NOT NULL,
    description     TEXT,
    collection_type TEXT DEFAULT 'study',       -- 'study', 'sermon', 'devotional', 'custom'
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Items within a collection (passages, notes, characters, themes)
CREATE TABLE user_collection_items (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    collection_id   INTEGER NOT NULL REFERENCES user_collections(id) ON DELETE CASCADE,
    item_type       TEXT NOT NULL,              -- 'passage', 'note', 'character', 'theme', 'climate'
    item_ref        TEXT NOT NULL,              -- Reference key (verse ref, character id, theme id, etc.)
    note            TEXT,                       -- User's note on why this is included
    sort_order      INTEGER DEFAULT 0,
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_collection_items ON user_collection_items(collection_id, sort_order);

-- Reading history / recently viewed
CREATE TABLE reading_history (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id         TEXT NOT NULL REFERENCES books(id),
    chapter         INTEGER NOT NULL,
    verse           INTEGER,
    visited_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- AI conversation history (for the optional freeform feature)
CREATE TABLE ai_conversations (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    title           TEXT,
    context_ref     TEXT,                       -- What passage/topic initiated this conversation
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE ai_messages (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    conversation_id INTEGER NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
    role            TEXT NOT NULL,              -- 'user' or 'assistant'
    content         TEXT NOT NULL,
    provider_id     TEXT,                       -- Which provider generated this response
    model_id        TEXT,                       -- Which model was used
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_ai_messages_conv ON ai_messages(conversation_id, created_at);


-- ============================================================================
-- LAYER 5: CONVENIENCE VIEWS
-- ============================================================================

-- Scene cast: given a passage, who is there?
CREATE VIEW scene_cast AS
SELECT 
    ca.book_id,
    ca.chapter,
    ca.verse_start,
    ca.verse_end,
    c.id AS character_id,
    c.name AS character_name,
    c.prominence,
    ca.role,
    ca.emotional_state,
    ca.motivation,
    ca.stakes,
    ca.narrative_note,
    ca.modern_parallel AS scene_parallel,
    c.bio_brief,
    c.social_status,
    c.occupation
FROM character_appearances ca
JOIN characters c ON ca.character_id = c.id
ORDER BY 
    ca.book_id, ca.chapter, ca.verse_start,
    CASE ca.role 
        WHEN 'protagonist' THEN 1
        WHEN 'deuteragonist' THEN 2
        WHEN 'witness' THEN 3
        WHEN 'antagonist' THEN 4
        WHEN 'bystander' THEN 5
        WHEN 'addressee' THEN 6
        WHEN 'mentioned' THEN 7
        WHEN 'implied' THEN 8
        ELSE 9
    END;

-- Passage context: given a verse, get all three lenses
CREATE VIEW passage_context AS
SELECT 
    v.book_id,
    v.chapter,
    v.verse,
    v.text,
    v.translation_id,
    -- Narrative unit this verse belongs to
    nu.id AS narrative_id,
    nu.title AS narrative_title,
    nu.summary AS narrative_summary,
    nu.modern_parallel AS narrative_modern,
    nu.relational_note,
    nu.conceptual_note,
    nu.climate_note,
    nu.key_questions,
    nu.preaching_angles,
    -- Climate context
    cc.name AS climate_name,
    cc.political AS climate_political,
    cc.economic AS climate_economic,
    cc.social AS climate_social,
    cc.religious AS climate_religious,
    cc.daily_life AS climate_daily_life,
    cc.modern_parallel AS climate_modern,
    -- Location
    l.name AS location_name,
    l.modern_name AS location_modern,
    l.description AS location_description
FROM verses v
LEFT JOIN narrative_units nu ON v.book_id = nu.book_id 
    AND v.chapter >= nu.chapter_start 
    AND v.chapter <= COALESCE(nu.chapter_end, nu.chapter_start)
    AND v.verse >= nu.verse_start 
    AND v.verse <= COALESCE(nu.verse_end, 999)
LEFT JOIN passage_climate pc ON v.book_id = pc.book_id 
    AND v.chapter = pc.chapter 
    AND v.verse >= pc.verse_start 
    AND v.verse <= COALESCE(pc.verse_end, pc.verse_start)
LEFT JOIN climate_contexts cc ON pc.context_id = cc.id
LEFT JOIN locations l ON pc.location_id = l.id;

-- Character connections: given a character, who do they interact with?
CREATE VIEW character_connections AS
SELECT 
    cr.character_a,
    ca.name AS name_a,
    cr.character_b,
    cb.name AS name_b,
    cr.relationship,
    cr.description
FROM character_relationships cr
JOIN characters ca ON cr.character_a = ca.id
JOIN characters cb ON cr.character_b = cb.id;

-- Theme explorer: given a theme, what passages and characters embody it?
CREATE VIEW theme_explorer AS
SELECT 
    t.id AS theme_id,
    t.name AS theme_name,
    t.definition AS theme_definition,
    t.modern_framing AS theme_modern,
    pt.book_id,
    pt.chapter,
    pt.verse_start,
    pt.verse_end,
    pt.relevance,
    pt.context_note
FROM themes t
JOIN passage_themes pt ON t.id = pt.theme_id
ORDER BY t.name, pt.relevance, pt.book_id, pt.chapter;

-- Daily bread: tonight's devotional picker
-- Query by life situation, audience, or season — excludes recently used
CREATE VIEW daily_bread AS
SELECT 
    d.id AS devotional_id,
    d.title,
    d.audience,
    d.estimated_minutes,
    d.season,
    d.book_id,
    d.chapter,
    d.verse_start,
    d.verse_end,
    d.context_brief,
    d.modern_moment,
    d.conversation_starters,
    d.going_deeper,
    d.narrative_id,
    -- Aggregate life situation tags
    GROUP_CONCAT(dt.name, ', ') AS life_situations,
    -- When was this last used? (NULL if never)
    MAX(dh.completed_at) AS last_used,
    -- Average family rating
    AVG(dh.rating) AS avg_rating
FROM devotionals d
LEFT JOIN devotional_tag_map dtm ON d.id = dtm.devotional_id
LEFT JOIN devotional_tags dt ON dtm.tag_id = dt.id
LEFT JOIN devotional_history dh ON d.id = dh.devotional_id
GROUP BY d.id
ORDER BY last_used ASC NULLS FIRST, avg_rating DESC;

-- Devotional by mood: "what's on your mind tonight?" query helper
CREATE VIEW devotional_by_situation AS
SELECT 
    dt.id AS tag_id,
    dt.name AS situation,
    dt.category AS situation_category,
    dt.icon,
    d.id AS devotional_id,
    d.title,
    d.audience,
    d.estimated_minutes,
    d.context_brief,
    d.modern_moment,
    d.conversation_starters,
    dtm.relevance
FROM devotional_tags dt
JOIN devotional_tag_map dtm ON dt.id = dtm.tag_id
JOIN devotionals d ON dtm.devotional_id = d.id
ORDER BY dt.category, dt.sort_order, dtm.relevance;

-- ---------------------------------------------------------------------------
-- NOTE SURFACING VIEWS - "You've been here before"
-- ---------------------------------------------------------------------------

-- Unified journal: all notes with their anchors, themes, and tags in one place
-- This is the "open my journal" view — everything, chronologically
CREATE VIEW journal AS
SELECT 
    n.id AS note_id,
    n.title,
    n.content,
    n.note_type,
    n.highlight_color,
    n.is_pinned,
    n.study_context,
    n.created_at,
    n.updated_at,
    -- Primary anchor info (what were you looking at when you wrote this?)
    pa.anchor_type AS primary_anchor_type,
    pa.book_id AS primary_book,
    pa.chapter AS primary_chapter,
    pa.verse_start AS primary_verse_start,
    pa.verse_end AS primary_verse_end,
    pa.ref_id AS primary_ref_id,
    -- Aggregated theme names
    GROUP_CONCAT(DISTINCT t.name) AS theme_names,
    -- Aggregated user tags
    GROUP_CONCAT(DISTINCT ut.name) AS user_tags,
    -- How many anchors does this note have?
    (SELECT COUNT(*) FROM user_note_anchors WHERE note_id = n.id) AS anchor_count
FROM user_notes n
LEFT JOIN user_note_anchors pa ON n.id = pa.note_id AND pa.is_primary = 1
LEFT JOIN user_note_themes nt ON n.id = nt.note_id
LEFT JOIN themes t ON nt.theme_id = t.id
LEFT JOIN user_note_tags ntg ON n.id = ntg.note_id
LEFT JOIN user_tags ut ON ntg.tag_id = ut.id
GROUP BY n.id
ORDER BY n.is_pinned DESC, n.updated_at DESC;

-- Notes for a specific verse: surface when reading a passage
-- Usage: SELECT * FROM notes_at_verse WHERE book_id='JHN' AND chapter=4 AND verse BETWEEN verse_start AND verse_end
CREATE VIEW notes_at_verse AS
SELECT 
    n.id AS note_id,
    n.title,
    n.content,
    n.note_type,
    n.highlight_color,
    n.is_pinned,
    n.created_at,
    na.book_id,
    na.chapter,
    na.verse_start AS verse,
    na.verse_end
FROM user_notes n
JOIN user_note_anchors na ON n.id = na.note_id
WHERE na.anchor_type IN ('verse', 'verse_range')
ORDER BY na.book_id, na.chapter, na.verse_start, n.is_pinned DESC;

-- "You've been here before" — theme-based resurfacing
-- Given a theme_id, find all user notes tagged with that theme
-- Usage: query with a theme_id from the passage you're currently studying
-- The app looks up passage_themes for the current verse, gets the theme_ids,
-- then queries this view to find the user's own prior reflections
CREATE VIEW notes_by_theme AS
SELECT 
    nt.theme_id,
    t.name AS theme_name,
    n.id AS note_id,
    n.title AS note_title,
    n.content AS note_content,
    n.note_type,
    n.study_context,
    n.created_at,
    -- Where was this note anchored? (for context in the surfacing UI)
    pa.anchor_type AS original_context_type,
    pa.book_id AS original_book,
    pa.chapter AS original_chapter,
    pa.verse_start AS original_verse
FROM user_note_themes nt
JOIN themes t ON nt.theme_id = t.id
JOIN user_notes n ON nt.note_id = n.id
LEFT JOIN user_note_anchors pa ON n.id = pa.note_id AND pa.is_primary = 1
ORDER BY t.name, n.created_at DESC;

-- "You've been here before" — character-based resurfacing
-- When viewing a character profile, surface notes anchored to that character
CREATE VIEW notes_by_character AS
SELECT 
    na.ref_id AS character_id,
    c.name AS character_name,
    n.id AS note_id,
    n.title AS note_title,
    n.content AS note_content,
    n.note_type,
    n.created_at,
    pa.book_id AS original_book,
    pa.chapter AS original_chapter,
    pa.verse_start AS original_verse
FROM user_note_anchors na
JOIN user_notes n ON na.note_id = n.id
JOIN characters c ON na.ref_id = c.id
LEFT JOIN user_note_anchors pa ON n.id = pa.note_id AND pa.is_primary = 1 AND pa.id != na.id
WHERE na.anchor_type = 'character'
ORDER BY c.name, n.created_at DESC;

-- "You've been here before" — cross-reference chain resurfacing
-- When viewing verse A, and verse A cross-references verse B, and you 
-- annotated verse B six months ago — that note surfaces.
-- This is the deepest "you've been here before" channel.
CREATE VIEW notes_via_cross_reference AS
SELECT 
    cr.source_book,
    cr.source_chapter,
    cr.source_verse,
    cr.score AS xref_score,
    n.id AS note_id,
    n.title AS note_title,
    n.content AS note_content,
    n.note_type,
    n.created_at,
    na.book_id AS note_book,
    na.chapter AS note_chapter,
    na.verse_start AS note_verse
FROM cross_references cr
JOIN user_note_anchors na ON 
    na.book_id = cr.target_book 
    AND na.chapter = cr.target_chapter 
    AND na.verse_start = cr.target_verse
    AND na.anchor_type IN ('verse', 'verse_range')
JOIN user_notes n ON na.note_id = n.id
ORDER BY cr.source_book, cr.source_chapter, cr.source_verse, cr.score DESC;


-- ============================================================================
-- POPULATION NOTES
-- ============================================================================
-- 
-- PHASE 1 - Automated ingest (script-driven):
--   - Download bible.eng.db from HelloAO → ETL into verses, translations
--   - Download open-cross-ref dataset → ETL into cross_references
--   - Clone openscriptures/strongs → parse JSON into strongs_entries
--   - Fetch HelloAO commentary API → ETL into commentary_sources, commentary_entries
--   - Fetch Tyndale profiles → seed into characters (125 profiles)
--   - Populate books table with canonical ordering
--
-- PHASE 2 - Pre-bake pipeline (Claude-assisted):
--   - Generate character profiles beyond Tyndale's 125 (target: 500+)
--   - Build character_appearances for all narrative units
--   - Create theme taxonomy and tag passages
--   - Build climate_contexts for each biblical era
--   - Generate narrative_units with all three lenses + modern bridge
--   - Generate passage_climate linkages
--   - Tag source_tier on every generated record
--   - Generate devotional_tags taxonomy (~100-150 life situations)
--   - Generate devotionals library (target: 365+ for a full year of daily use)
--     - Cover all audience levels: young children, family, teens, adults
--     - Tag each with 1-3 life situations
--     - Write context_brief in dinner-table voice, not pulpit voice
--     - Write conversation_starters as genuine open questions, not quiz questions
--     - Link back to narrative_units for "going deeper" paths
--     - Create seasonal sets for Advent, Lent, Easter, etc.
--
-- PHASE 3 - Quality review:
--   - Canon compliance audit on all pre-baked content
--   - Spot-check modern parallels for accuracy and sensitivity
--   - Verify source_tier labels are honest
--   - Test sermon builder queries across diverse topics
--   - Read devotionals aloud at an actual table — if it sounds like a textbook, rewrite it
--   - Verify conversation starters work for kids (no jargon, no "right answer" questions)
-- ============================================================================
