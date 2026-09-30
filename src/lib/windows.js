// Window manager state, free of React and the DOM. `order` lists every window
// that is open or minimised, bottom to top; the last open one is in front.
export const WINDOW_IDS = ['about', 'projects', 'skills', 'contact']

export function createState() {
  const wins = {}
  for (const id of WINDOW_IDS) wins[id] = { status: 'closed', max: false }
  return { order: [], wins }
}

export function frontId(state) {
  for (let i = state.order.length - 1; i >= 0; i--) {
    const id = state.order[i]
    if (state.wins[id].status === 'open') return id
  }
  return null
}

function patch(state, id, change) {
  return { ...state, wins: { ...state.wins, [id]: { ...state.wins[id], ...change } } }
}

function raise(order, id) {
  return [...order.filter((x) => x !== id), id]
}

export function reduce(state, action) {
  const { id } = action
  if (!Object.hasOwn(state.wins, id)) return state
  const win = state.wins[id]
  switch (action.type) {
    case 'open': {
      let next = state
      if (action.single) {
        for (const other of WINDOW_IDS) {
          if (other !== id && next.wins[other].status === 'open') next = patch(next, other, { status: 'closed', max: false })
        }
        next = { ...next, order: next.order.filter((x) => x === id || next.wins[x].status !== 'closed') }
      }
      next = patch(next, id, { status: 'open' })
      return { ...next, order: raise(next.order, id) }
    }
    case 'close': {
      if (win.status === 'closed') return state
      const next = patch(state, id, { status: 'closed', max: false })
      return { ...next, order: next.order.filter((x) => x !== id) }
    }
    case 'minimize':
      return win.status === 'open' ? patch(state, id, { status: 'min' }) : state
    case 'toggleMax':
      if (win.status !== 'open') return state
      return { ...patch(state, id, { max: !win.max }), order: raise(state.order, id) }
    case 'focus':
      if (win.status !== 'open' || frontId(state) === id) return state
      return { ...state, order: raise(state.order, id) }
    case 'dock':
      if (win.status !== 'open') return reduce(state, { type: 'open', id, single: action.single })
      if (frontId(state) !== id) return reduce(state, { type: 'focus', id })
      return reduce(state, { type: 'minimize', id })
    default:
      return state
  }
}
