import { useRef } from 'react'
import { motion, animate } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

function MagneticLink({ href, children, target }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.22
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.22
    animate(ref.current, { x: dx, y: dy }, { type: 'spring', stiffness: 180, damping: 18, mass: 0.4 })
  }

  const onLeave = () => {
    animate(ref.current, { x: 0, y: 0 }, { type: 'spring', stiffness: 180, damping: 18 })
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block"
    >
      {children}
    </motion.a>
  )
}

function ContactLink({ link }) {
  const icons = {
    email:    <EmailIcon />,
    github:   <GithubIcon />,
    telegram: <TelegramIcon />,
    linkedin: <LinkedinIcon />,
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease }}
    >
      <a
        href={link.href}
        target={link.kind !== 'email' ? '_blank' : undefined}
        rel={link.kind !== 'email' ? 'noopener noreferrer' : undefined}
        className="flex items-center gap-4 group"
      >
        <span
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
          style={{
            background: 'rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          {icons[link.kind]}
        </span>
        <span
          className="link-line text-base font-medium"
          style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'Manrope, sans-serif' }}
        >
          {link.label}
        </span>
      </a>
    </motion.div>
  )
}

export default function Contact({ t }) {
  const { contact } = t

  return (
    <section
      id="contact"
      className="py-28 px-6 md:px-10 lg:px-16"
      style={{ background: '#0a0a0b', color: '#fafaf9' }}
    >
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: Heading + email CTA */}
          <div>
            <motion.span
              className="block text-xs font-mono tracking-widest uppercase mb-10"
              style={{ color: 'var(--accent)', letterSpacing: '0.18em' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              {contact.label}
            </motion.span>

            <motion.h2
              className="font-display font-extrabold mb-10 leading-tight"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                letterSpacing: '-0.04em',
                color: '#fafaf9',
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.05 }}
            >
              {contact.heading[0]}{' '}
              <span style={{ color: 'var(--accent)' }}>{contact.heading[1]}</span>
              {' '}{contact.heading[2]}
            </motion.h2>

            <motion.p
              className="text-lg leading-relaxed mb-12 max-w-md"
              style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: 0.12 }}
            >
              {contact.sub}
            </motion.p>

            {/* Big email magnetic link */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
            >
              <MagneticLink href="mailto:anfinogentov@arizona.edu">
                <span
                  className="font-display font-extrabold block leading-none"
                  style={{
                    fontSize: 'clamp(1rem, 2.4vw, 1.6rem)',
                    color: 'var(--accent)',
                    letterSpacing: '-0.03em',
                    textDecoration: 'underline',
                    textDecorationColor: 'rgba(249,115,22,0.3)',
                    textUnderlineOffset: '4px',
                  }}
                >
                  anfinogentov@arizona.edu
                </span>
              </MagneticLink>
            </motion.div>
          </div>

          {/* Right: All links */}
          <div className="flex flex-col gap-5 lg:pt-24">
            {contact.links.map(link => (
              <ContactLink key={link.href} link={link} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}
