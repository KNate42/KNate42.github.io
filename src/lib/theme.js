// index.html reads the same key and colours before the first paint.
export const THEME_KEY = 'na-theme'
const THEME_COLOR = { dark: '#0b0b0e', light: '#e7e7ec' }

export function toggleTheme() {
  const root = document.documentElement
  const next = root.classList.contains('light') ? 'dark' : 'light'
  root.classList.toggle('light', next === 'light')
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[next])
  try {
    localStorage.setItem(THEME_KEY, next)
  } catch {
    // storage blocked: the theme just is not remembered
  }
  return next
}
