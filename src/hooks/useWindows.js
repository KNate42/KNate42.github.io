import { useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react'
import { WINDOW_IDS, createState, frontId, reduce } from '../lib/windows.js'
import { CASCADE_SLOTS, WINDOW_WIDTHS, placeWindow } from '../lib/placement.js'
import { animateToDock } from '../lib/genie.js'

const PHONE = '(max-width: 700px)'
const WIDE = '(min-width: 1200px)'

export function useWindows(deskRef) {
  const [state, dispatch] = useReducer(reduce, undefined, createState)
  const [phone, setPhone] = useState(false)
  const [booted, setBooted] = useState(false)
  const [pos, setPos] = useState({})
  const stateRef = useRef(state)
  const posRef = useRef({})
  const phoneRef = useRef(false)
  const slot = useRef(0)
  const userOpened = useRef(new Set())
  const syncHash = useRef(false)
  stateRef.current = state

  const place = useCallback(
    (id) => {
      const desk = deskRef.current
      if (phoneRef.current || posRef.current[id] || !desk) return
      posRef.current = {
        ...posRef.current,
        [id]: placeWindow({ deskWidth: desk.clientWidth, deskHeight: desk.clientHeight, width: WINDOW_WIDTHS[id], slot: slot.current }),
      }
      slot.current = (slot.current + 1) % CASCADE_SLOTS
      setPos(posRef.current)
    },
    [deskRef],
  )

  const act = useCallback((action) => {
    syncHash.current = true
    dispatch({ ...action, single: phoneRef.current })
  }, [])

  const open = useCallback(
    (id) => {
      place(id)
      userOpened.current.add(id)
      act({ type: 'open', id })
    },
    [act, place],
  )

  const close = useCallback((id) => act({ type: 'close', id }), [act])
  const toggleMax = useCallback((id) => act({ type: 'toggleMax', id }), [act])
  const focus = useCallback((id) => dispatch({ type: 'focus', id }), [])

  const minimize = useCallback(
    (id) => {
      const finish = () => act({ type: 'minimize', id })
      if (phoneRef.current) return finish()
      animateToDock(document.querySelector(`.win[data-win="${id}"]`), document.querySelector(`.dock [data-dock="${id}"]`), finish)
    },
    [act],
  )

  const dock = useCallback(
    (id) => {
      const s = stateRef.current
      if (s.wins[id].status === 'open' && frontId(s) === id) return minimize(id)
      place(id)
      userOpened.current.add(id)
      act({ type: 'dock', id })
    },
    [act, minimize, place],
  )

  const consumeUserOpen = useCallback((id) => userOpened.current.delete(id), [])

  useLayoutEffect(() => {
    const mq = matchMedia(PHONE)
    const apply = (matches) => {
      phoneRef.current = matches
      setPhone(matches)
    }
    apply(mq.matches)
    const onChange = (e) => apply(e.matches)
    mq.addEventListener('change', onChange)
    const hash = location.hash.slice(1)
    const first = WINDOW_IDS.includes(hash) ? hash : matchMedia(WIDE).matches ? 'about' : null
    if (first) {
      place(first)
      dispatch({ type: 'open', id: first, single: mq.matches })
    }
    setBooted(true)
    return () => mq.removeEventListener('change', onChange)
  }, [place])

  useLayoutEffect(() => {
    if (booted) document.documentElement.classList.add('hydrated')
  }, [booted])

  useEffect(() => {
    if (phone) return
    for (const id of WINDOW_IDS) if (stateRef.current.wins[id].status !== 'closed') place(id)
  }, [phone, place])

  const front = frontId(state)

  useEffect(() => {
    if (!syncHash.current) return
    history.replaceState(null, '', location.pathname + location.search + (front ? `#${front}` : ''))
  }, [front])

  useEffect(() => {
    const onHash = () => {
      const id = location.hash.slice(1)
      if (WINDOW_IDS.includes(id)) open(id)
    }
    addEventListener('hashchange', onHash)
    return () => removeEventListener('hashchange', onHash)
  }, [open])

  const z = (id) => {
    const i = state.order.indexOf(id)
    return i < 0 ? undefined : 10 + i
  }

  return { state, front, phone, booted, pos, z, open, close, minimize, toggleMax, focus, dock, consumeUserOpen }
}
