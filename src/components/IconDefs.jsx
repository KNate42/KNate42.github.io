// Gradients for the dock icons. Not display:none — gradients inside a hidden SVG stop rendering.
export default function IconDefs() {
  return (
    <svg className="icon-defs" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="g-folder-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4aa3f4" />
          <stop offset="1" stopColor="#1b6fd8" />
        </linearGradient>
        <linearGradient id="g-folder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7cc8ff" />
          <stop offset="1" stopColor="#3690f0" />
        </linearGradient>
        <linearGradient id="g-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#34343b" />
          <stop offset="1" stopColor="#121215" />
        </linearGradient>
        <linearGradient id="g-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5ecbff" />
          <stop offset="1" stopColor="#1673ea" />
        </linearGradient>
        <linearGradient id="g-bar1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb08f" />
          <stop offset="1" stopColor="#ff5a2c" />
        </linearGradient>
      </defs>
    </svg>
  )
}
