import { useRef } from 'react'
import { motion, animate } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

function TiltCard({ children, className, style }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    animate(ref.current, {
      rotateX: -y * 5,
      rotateY: x * 5,
      scale: 1.015,
    }, { type: 'spring', stiffness: 300, damping: 25, mass: 0.5 })
  }

  const handleMouseLeave = () => {
    animate(ref.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    }, { type: 'spring', stiffness: 300, damping: 25, mass: 0.5 })
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ transformStyle: 'preserve-3d', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

export default function Projects({ t }) {
  const { work } = t

  return (
    <section id="work" className="py-28 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          className="mb-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="relative">
            <span
              className="absolute -top-6 -left-2 font-display font-extrabold select-none pointer-events-none"
              style={{
                fontSize: 'clamp(5rem, 12vw, 9rem)',
                color: 'var(--accent)',
                opacity: 0.06,
                letterSpacing: '-0.05em',
                lineHeight: 1,
              }}
            >
              {work.label}
            </span>
            <h2
              className="font-display font-extrabold relative"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--text)' }}
            >
              {work.title}
            </h2>
          </div>
          <p
            className="text-sm italic max-w-xs text-right"
            style={{ color: 'var(--text-muted)' }}
          >
            {work.quote}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-3 bottom-0 w-px hidden md:block"
            style={{ background: `linear-gradient(to bottom, var(--accent), transparent)` }}
          />

          <div className="flex flex-col gap-16">
            {work.items.map((item, i) => (
              <motion.div
                key={i}
                className="md:pl-12 relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease, delay: i * 0.1 }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-2 w-2.5 h-2.5 rounded-full -translate-x-1 hidden md:block"
                  style={{
                    background: 'var(--accent)',
                    boxShadow: '0 0 0 3px var(--bg), 0 0 0 5px var(--accent)',
                    opacity: 0.8,
                  }}
                />

                {/* Meta */}
                <div className="md:col-span-3">
                  <p
                    className="font-mono text-xs tracking-widest uppercase mb-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {item.date}
                  </p>
                  <p
                    className="text-sm font-bold"
                    style={{ color: 'var(--accent)', fontFamily: 'Manrope, sans-serif' }}
                  >
                    {item.role}
                  </p>
                </div>

                {/* Card */}
                <div className="md:col-span-9">
                  <TiltCard
                    className="p-7 rounded-xl"
                    style={{
                      background: 'var(--bg-hi)',
                      border: '1px solid var(--border)',
                      borderLeft: `3px solid var(--accent)`,
                    }}
                  >
                    <h3
                      className="font-display font-bold text-xl mb-3"
                      style={{ color: 'var(--text)' }}
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-line"
                        >
                          {item.title}
                        </a>
                      ) : item.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed mb-5"
                      style={{ color: 'var(--text-muted)', lineHeight: 1.75 }}
                    >
                      {item.body}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs font-semibold px-3 py-1 rounded-full"
                          style={{
                            background: 'var(--bg-lo)',
                            color: 'var(--text-muted)',
                            fontFamily: 'Manrope, sans-serif',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
