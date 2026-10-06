import { uiScale } from './scale.js'

// Shrinks a window into its dock icon, then hides it before React catches up.
export function animateToDock(el, target, done) {
  if (!el || !target || matchMedia('(prefers-reduced-motion: reduce)').matches) return done()
  const d = target.getBoundingClientRect()
  const r = el.getBoundingClientRect()
  const k = uiScale(el)
  el.style.transition = 'transform .3s cubic-bezier(.4,0,.2,1), opacity .3s'
  el.style.transform = `translate(${(d.left + d.width / 2 - (r.left + r.width / 2)) / k}px, ${(d.top + d.height / 2 - (r.top + r.height / 2)) / k}px) scale(.08)`
  el.style.opacity = '0'
  setTimeout(() => {
    el.hidden = true
    el.style.transition = ''
    el.style.transform = ''
    el.style.opacity = ''
    done()
  }, 310)
}
