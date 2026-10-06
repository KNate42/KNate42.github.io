import { useLayoutEffect, useRef } from 'react'
import { uiScale } from '../lib/scale.js'

export default function Window({ id, title, ui, win, z, front, pos, phone, wm, children }) {
  const ref = useRef(null)
  const opener = useRef(null)
  const wasOpen = useRef(false)
  const drag = useRef({ x: 0, y: 0, start: null })
  const open = win.status === 'open'

  useLayoutEffect(() => {
    const el = ref.current
    if (open && !wasOpen.current && wm.consumeUserOpen(id)) {
      const active = document.activeElement
      opener.current = active && active !== document.body ? active : null
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.classList.add('enter')
        void el.offsetWidth
        el.classList.remove('enter')
      }
      el.querySelector('.wtitle').focus({ preventScroll: true })
    }
    if (!open && wasOpen.current) {
      const active = document.activeElement
      if (opener.current?.isConnected && (!active || active === document.body || el.contains(active))) {
        opener.current.focus({ preventScroll: true })
      }
      opener.current = null
    }
    wasOpen.current = open
  }, [open])

  function startDrag(e) {
    if (phone || win.max || e.button !== 0 || e.target.closest('button')) return
    const k = uiScale(ref.current)
    drag.current.start = { x: e.clientX / k - drag.current.x, y: e.clientY / k - drag.current.y, k }
    e.currentTarget.setPointerCapture(e.pointerId)
    ref.current.classList.add('dragging')
  }

  function moveDrag(e) {
    const start = drag.current.start
    if (!start) return
    drag.current.x = e.clientX / start.k - start.x
    drag.current.y = e.clientY / start.k - start.y
    ref.current.style.translate = `${drag.current.x}px ${drag.current.y}px`
  }

  function endDrag() {
    drag.current.start = null
    ref.current?.classList.remove('dragging')
  }

  const style = pos ? { left: pos.left, top: pos.top, width: pos.width, maxHeight: pos.maxHeight, zIndex: z } : z ? { zIndex: z } : undefined

  return (
    <section
      ref={ref}
      id={id}
      data-win={id}
      className={'win' + (front ? ' front' : '') + (win.max ? ' max' : '')}
      role="dialog"
      aria-labelledby={`${id}-title`}
      aria-modal={phone ? 'true' : undefined}
      hidden={!open}
      style={style}
      onPointerDown={() => wm.focus(id)}
    >
      <header
        className="titlebar"
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={(e) => {
          if (!phone && !e.target.closest('button')) wm.toggleMax(id)
        }}
      >
        <div className="lights">
          <button className="lb l-close" type="button" aria-label={ui.close} onClick={() => wm.close(id)}>
            <svg viewBox="0 0 8 8" aria-hidden="true">
              <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
          <button className="lb l-min" type="button" aria-label={ui.minimize} onClick={() => wm.minimize(id)}>
            <svg viewBox="0 0 8 8" aria-hidden="true">
              <path d="M1.2 4h5.6" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
          <button className="lb l-max" type="button" aria-label={ui.zoom} onClick={() => wm.toggleMax(id)}>
            <svg viewBox="0 0 8 8" aria-hidden="true">
              <path d="M2 6V2.6L5.4 6zM6 2v3.4L2.6 2z" fill="currentColor" />
            </svg>
          </button>
        </div>
        <h2 className="wtitle" id={`${id}-title`} tabIndex={-1}>
          {title}
        </h2>
        <button className="done" type="button" onClick={() => wm.close(id)}>
          {ui.done}
        </button>
      </header>
      <div className="wbody">{children}</div>
    </section>
  )
}
