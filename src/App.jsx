import { content } from './data/content.js'
import Desktop from './components/Desktop.jsx'

export default function App() {
  const lang = 'en'
  const t = content[lang]
  return (
    <div className="os">
      <main className="desk">
        <Desktop t={t} lang={lang} />
      </main>
    </div>
  )
}
