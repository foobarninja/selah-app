// 06-populate-books.ts — Populate the books table with 66 canonical books
import { db, heading, log } from './db'

const BOOKS: { id: string; name: string; testament: string; order: number; chapters: number; category: string }[] = [
  // Old Testament
  { id: 'GEN', name: 'Genesis', testament: 'OT', order: 1, chapters: 50, category: 'law' },
  { id: 'EXO', name: 'Exodus', testament: 'OT', order: 2, chapters: 40, category: 'law' },
  { id: 'LEV', name: 'Leviticus', testament: 'OT', order: 3, chapters: 27, category: 'law' },
  { id: 'NUM', name: 'Numbers', testament: 'OT', order: 4, chapters: 36, category: 'law' },
  { id: 'DEU', name: 'Deuteronomy', testament: 'OT', order: 5, chapters: 34, category: 'law' },
  { id: 'JOS', name: 'Joshua', testament: 'OT', order: 6, chapters: 24, category: 'history' },
  { id: 'JDG', name: 'Judges', testament: 'OT', order: 7, chapters: 21, category: 'history' },
  { id: 'RUT', name: 'Ruth', testament: 'OT', order: 8, chapters: 4, category: 'history' },
  { id: '1SA', name: '1 Samuel', testament: 'OT', order: 9, chapters: 31, category: 'history' },
  { id: '2SA', name: '2 Samuel', testament: 'OT', order: 10, chapters: 24, category: 'history' },
  { id: '1KI', name: '1 Kings', testament: 'OT', order: 11, chapters: 22, category: 'history' },
  { id: '2KI', name: '2 Kings', testament: 'OT', order: 12, chapters: 25, category: 'history' },
  { id: '1CH', name: '1 Chronicles', testament: 'OT', order: 13, chapters: 29, category: 'history' },
  { id: '2CH', name: '2 Chronicles', testament: 'OT', order: 14, chapters: 36, category: 'history' },
  { id: 'EZR', name: 'Ezra', testament: 'OT', order: 15, chapters: 10, category: 'history' },
  { id: 'NEH', name: 'Nehemiah', testament: 'OT', order: 16, chapters: 13, category: 'history' },
  { id: 'EST', name: 'Esther', testament: 'OT', order: 17, chapters: 10, category: 'history' },
  { id: 'JOB', name: 'Job', testament: 'OT', order: 18, chapters: 42, category: 'poetry' },
  { id: 'PSA', name: 'Psalms', testament: 'OT', order: 19, chapters: 150, category: 'poetry' },
  { id: 'PRO', name: 'Proverbs', testament: 'OT', order: 20, chapters: 31, category: 'poetry' },
  { id: 'ECC', name: 'Ecclesiastes', testament: 'OT', order: 21, chapters: 12, category: 'poetry' },
  { id: 'SNG', name: 'Song of Solomon', testament: 'OT', order: 22, chapters: 8, category: 'poetry' },
  { id: 'ISA', name: 'Isaiah', testament: 'OT', order: 23, chapters: 66, category: 'major_prophet' },
  { id: 'JER', name: 'Jeremiah', testament: 'OT', order: 24, chapters: 52, category: 'major_prophet' },
  { id: 'LAM', name: 'Lamentations', testament: 'OT', order: 25, chapters: 5, category: 'major_prophet' },
  { id: 'EZK', name: 'Ezekiel', testament: 'OT', order: 26, chapters: 48, category: 'major_prophet' },
  { id: 'DAN', name: 'Daniel', testament: 'OT', order: 27, chapters: 12, category: 'major_prophet' },
  { id: 'HOS', name: 'Hosea', testament: 'OT', order: 28, chapters: 14, category: 'minor_prophet' },
  { id: 'JOL', name: 'Joel', testament: 'OT', order: 29, chapters: 3, category: 'minor_prophet' },
  { id: 'AMO', name: 'Amos', testament: 'OT', order: 30, chapters: 9, category: 'minor_prophet' },
  { id: 'OBA', name: 'Obadiah', testament: 'OT', order: 31, chapters: 1, category: 'minor_prophet' },
  { id: 'JON', name: 'Jonah', testament: 'OT', order: 32, chapters: 4, category: 'minor_prophet' },
  { id: 'MIC', name: 'Micah', testament: 'OT', order: 33, chapters: 7, category: 'minor_prophet' },
  { id: 'NAM', name: 'Nahum', testament: 'OT', order: 34, chapters: 3, category: 'minor_prophet' },
  { id: 'HAB', name: 'Habakkuk', testament: 'OT', order: 35, chapters: 3, category: 'minor_prophet' },
  { id: 'ZEP', name: 'Zephaniah', testament: 'OT', order: 36, chapters: 3, category: 'minor_prophet' },
  { id: 'HAG', name: 'Haggai', testament: 'OT', order: 37, chapters: 2, category: 'minor_prophet' },
  { id: 'ZEC', name: 'Zechariah', testament: 'OT', order: 38, chapters: 14, category: 'minor_prophet' },
  { id: 'MAL', name: 'Malachi', testament: 'OT', order: 39, chapters: 4, category: 'minor_prophet' },
  // New Testament
  { id: 'MAT', name: 'Matthew', testament: 'NT', order: 40, chapters: 28, category: 'gospel' },
  { id: 'MRK', name: 'Mark', testament: 'NT', order: 41, chapters: 16, category: 'gospel' },
  { id: 'LUK', name: 'Luke', testament: 'NT', order: 42, chapters: 24, category: 'gospel' },
  { id: 'JHN', name: 'John', testament: 'NT', order: 43, chapters: 21, category: 'gospel' },
  { id: 'ACT', name: 'Acts', testament: 'NT', order: 44, chapters: 28, category: 'acts' },
  { id: 'ROM', name: 'Romans', testament: 'NT', order: 45, chapters: 16, category: 'epistle' },
  { id: '1CO', name: '1 Corinthians', testament: 'NT', order: 46, chapters: 16, category: 'epistle' },
  { id: '2CO', name: '2 Corinthians', testament: 'NT', order: 47, chapters: 13, category: 'epistle' },
  { id: 'GAL', name: 'Galatians', testament: 'NT', order: 48, chapters: 6, category: 'epistle' },
  { id: 'EPH', name: 'Ephesians', testament: 'NT', order: 49, chapters: 6, category: 'epistle' },
  { id: 'PHP', name: 'Philippians', testament: 'NT', order: 50, chapters: 4, category: 'epistle' },
  { id: 'COL', name: 'Colossians', testament: 'NT', order: 51, chapters: 4, category: 'epistle' },
  { id: '1TH', name: '1 Thessalonians', testament: 'NT', order: 52, chapters: 5, category: 'epistle' },
  { id: '2TH', name: '2 Thessalonians', testament: 'NT', order: 53, chapters: 3, category: 'epistle' },
  { id: '1TI', name: '1 Timothy', testament: 'NT', order: 54, chapters: 6, category: 'epistle' },
  { id: '2TI', name: '2 Timothy', testament: 'NT', order: 55, chapters: 4, category: 'epistle' },
  { id: 'TIT', name: 'Titus', testament: 'NT', order: 56, chapters: 3, category: 'epistle' },
  { id: 'PHM', name: 'Philemon', testament: 'NT', order: 57, chapters: 1, category: 'epistle' },
  { id: 'HEB', name: 'Hebrews', testament: 'NT', order: 58, chapters: 13, category: 'epistle' },
  { id: 'JAS', name: 'James', testament: 'NT', order: 59, chapters: 5, category: 'epistle' },
  { id: '1PE', name: '1 Peter', testament: 'NT', order: 60, chapters: 5, category: 'epistle' },
  { id: '2PE', name: '2 Peter', testament: 'NT', order: 61, chapters: 3, category: 'epistle' },
  { id: '1JN', name: '1 John', testament: 'NT', order: 62, chapters: 5, category: 'epistle' },
  { id: '2JN', name: '2 John', testament: 'NT', order: 63, chapters: 1, category: 'epistle' },
  { id: '3JN', name: '3 John', testament: 'NT', order: 64, chapters: 1, category: 'epistle' },
  { id: 'JUD', name: 'Jude', testament: 'NT', order: 65, chapters: 1, category: 'epistle' },
  { id: 'REV', name: 'Revelation', testament: 'NT', order: 66, chapters: 22, category: 'apocalyptic' },
]

function main(): void {
  heading('Populating books table')

  const insert = db.prepare(`
    INSERT OR IGNORE INTO books (id, name, testament, book_order, num_chapters, category)
    VALUES (@id, @name, @testament, @order, @chapters, @category)
  `)

  const insertMany = db.transaction((books: typeof BOOKS) => {
    for (const book of books) {
      insert.run(book)
    }
  })

  insertMany(BOOKS)
  log(`✓ ${BOOKS.length} books populated`)

  const count = db.prepare('SELECT COUNT(*) as c FROM books').get() as { c: number }
  log(`Total books in database: ${count.c}`)

  db.close()
}

main()
