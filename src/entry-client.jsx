import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/base.css'
import './styles/desktop.css'
import './styles/menubar.css'
import './styles/window.css'
import './styles/dock.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// dist/index.html arrives prerendered; `npm run dev` serves an empty root
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
