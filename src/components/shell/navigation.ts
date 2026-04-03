import {
  Home,
  BookOpen,
  Users,
  Sparkles,
  Languages,
  Presentation,
  PenLine,
  Wheat,
  Settings,
} from 'lucide-react'
import type { NavigationItem } from './MainNav'

export const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', icon: Home, href: '/' },
  { id: 'reader', label: 'Reader', icon: BookOpen, href: '/reader' },
  { id: 'characters', label: 'Characters', icon: Users, href: '/characters' },
  { id: 'themes', label: 'Themes', icon: Sparkles, href: '/themes' },
  { id: 'word-study', label: 'Word study', icon: Languages, href: '/word-study' },
  { id: 'study-builder', label: 'Study builder', icon: Presentation, href: '/study-builder' },
  { id: 'journal', label: 'Journal', icon: PenLine, href: '/journal' },
  { id: 'daily-bread', label: 'Daily Bread', icon: Wheat, href: '/daily-bread' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
]
