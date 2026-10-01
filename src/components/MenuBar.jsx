export default function MenuBar({ t, lang, appTitle, clock, menuOpen, onToggleMenu, onToggleLang, onToggleTheme }) {
  return (
    <header className="menubar">
      <button
        className="mb-btn mb-logo"
        type="button"
        title={t.ui.menu}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-controls="na-menu"
        onClick={onToggleMenu}
        data-menu-button
      >
        NA
      </button>
      <span className="mb-app">{appTitle}</span>
      <div className="mb-right">
        <button className="mb-btn" type="button" title={t.ui.lang} aria-label={`${t.ui.lang}: ${lang.toUpperCase()}`} onClick={onToggleLang} data-lang-button>
          <span className="kbd" aria-hidden="true">
            {lang.toUpperCase()}
          </span>
        </button>
        <button className="mb-btn" type="button" title={t.ui.theme} aria-label={t.ui.theme} onClick={onToggleTheme} data-theme-button>
          <svg className="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
          </svg>
          <svg className="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </button>
        <span className="mb-clock" title={t.ui.clock}>
          <span className="clk-full">{clock.full}</span>
          <span className="clk-short">{clock.short}</span>
        </span>
      </div>
    </header>
  )
}
