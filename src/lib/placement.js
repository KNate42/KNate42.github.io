// Where a window lands the first time it opens on a desktop layout.
// styles/window.css repeats slot 0 so the prerendered About window does not move.
export const WINDOW_WIDTHS = { about: 600, projects: 580, skills: 560, contact: 600 }
export const CASCADE_STEP = 26
export const CASCADE_SLOTS = 5
export const DOCK_SPACE = 126

export function placeWindow({ deskWidth, deskHeight, width, slot }) {
  const w = Math.min(width, deskWidth - 48)
  const base = Math.min(Math.max(Math.round(deskWidth * 0.5), deskWidth - w - 44), deskWidth - w - 24)
  const top = 22 + slot * CASCADE_STEP
  return {
    left: Math.max(24, base - slot * CASCADE_STEP),
    top,
    width: w,
    maxHeight: deskHeight - top - DOCK_SPACE,
  }
}
