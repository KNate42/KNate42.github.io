// The whole desktop is drawn smaller via a CSS transform (see .os in base.css).
// Pointer coordinates are in real screen pixels, so convert them back to layout pixels.
export function uiScale(el) {
  const k = el.getBoundingClientRect().width / el.offsetWidth
  return k > 0 ? k : 1
}
