// app entry. nothing fancy here — keep this file boring.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode double-invokes effects in dev only; useful for catching
// stale closures in the cursor / theme hooks. doesn't run in prod.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
