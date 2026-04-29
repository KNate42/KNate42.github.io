import { useEffect, useRef } from 'react'

// custom cursor.
// two pieces:
//   - dot:  pinned hard to the mouse, no easing — feels responsive
//   - ring: lerps toward the dot once per frame — feels physical
//
// kept the ring math in raf instead of framer-motion because we update
// 60+ times a second and don't need the spring machinery. styles are
// applied directly to .style.transform to bypass react reconciliation.
export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  // mouse target + lerped ring position live in refs so we don't
  // re-render the world every mouse move
  const target = useRef({ x: 0, y: 0 })
  const ring   = useRef({ x: 0, y: 0 })
  const raf    = useRef(0)

  useEffect(() => {
    // bail on touch / coarse pointers — no point pretending there's a cursor
    const isCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches
    if (isCoarse) return

    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY

      // dot is anchored hard, no smoothing
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
    }

    // simple lerp — 0.18 is a feel number, not derived from anything.
    // higher = snappier ring, lower = more drift. tweak to taste.
    const tick = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.18
      ring.current.y += (target.current.y - ring.current.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
      }
      raf.current = requestAnimationFrame(tick)
    }

    // hover state — closest() walks up so we catch text/svg children too.
    // the two classes are mutually exclusive in practice but I let CSS
    // sort that out instead of branching here.
    const onOver = (e) => {
      const t = e.target
      if (!ringRef.current) return
      const interactive = t.closest('a, button, [role="button"], [data-cursor="hover"]')
      const textInput   = t.closest('input, textarea, [data-cursor="text"]')
      ringRef.current.classList.toggle('is-hover', !!interactive)
      ringRef.current.classList.toggle('is-text',  !!textInput)
    }

    // hide cursor when the mouse leaves the document entirely
    // (otherwise a stale dot sits in the corner forever)
    const onLeave = () => {
      if (dotRef.current)  dotRef.current.style.opacity  = '0'
      if (ringRef.current) ringRef.current.style.opacity = '0'
    }
    const onEnter = () => {
      if (dotRef.current)  dotRef.current.style.opacity  = '1'
      if (ringRef.current) ringRef.current.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
