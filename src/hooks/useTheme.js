import { useState, useEffect } from 'react'

// theme toggle hook.
// reads localStorage first, then falls back to the OS preference,
// and writes a `dark` class onto <html> so CSS custom properties
// can swap without re-rendering anything else.
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // SSR guard. we don't actually SSR, but the check is cheap and
    // makes vite's build not yell during pre-render of static html.
    if (typeof window === 'undefined') return 'light'

    const stored = localStorage.getItem('theme')
    if (stored) return stored

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  // sync class + storage whenever the value flips
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return {
    theme,
    toggle: () => setTheme(t => (t === 'dark' ? 'light' : 'dark')),
  }
}
