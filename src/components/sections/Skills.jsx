import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const levelColor = (level) => {
  const l = level.toLowerCase()
  if (l === 'intermediate' || l === 'средний') return 'var(--accent)'
  if (l === 'junior' || l === 'джуниор') return 'var(--text-muted)'
  if (l === 'learning' || l === 'изучаю') return 'var(--text-muted)'
  return 'var(--text-muted)'
}

function SkillRow({ name, level, delay }) {
  return (
    <motion.li
      className="flex items-end py-3"
      style={{ borderBottom: '1px solid var(--border)' }}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease, delay }}
    >
      <span
        className="text-sm font-semibold shrink-0"
        style={{ color: 'var(--text)', fontFamily: 'Manrope, sans-serif' }}
      >
        {name}
      </span>
      <span className="skill-dots" />
      <span
        className="font-mono text-xs tracking-wider shrink-0 uppercase"
        style={{ color: levelColor(level) }}
      >
        {level}
      </span>
    </motion.li>
  )
}

export default function Skills({ t }) {
  const { skills } = t

  return (
    <section
      id="skills"
      className="py-28 px-6 md:px-10 lg:px-16"
      style={{ background: 'var(--bg-lo)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          className="mb-20 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
        >
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
            {skills.label}
          </span>
          <h2
            className="font-display font-extrabold relative"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--text)' }}
          >
            {skills.title}
          </h2>
        </motion.div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {skills.categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease, delay: ci * 0.1 }}
            >
              <h3
                className="text-xs font-bold tracking-widest uppercase mb-6"
                style={{
                  color: 'var(--accent)',
                  fontFamily: 'Manrope, sans-serif',
                  letterSpacing: '0.15em',
                }}
              >
                {cat.name}
              </h3>
              <ul>
                {cat.items.map((item, ii) => (
                  <SkillRow
                    key={item.name}
                    name={item.name}
                    level={item.level}
                    delay={ci * 0.08 + ii * 0.06}
                  />
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
