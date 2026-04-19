'use client'

import { motion } from 'framer-motion'

const socials = [
  { label: 'Cide Studio On Facebook', icon: 'f', href: '#' },
  { label: 'Cide Studio On Twitter', icon: '𝕏', href: '#' },
  { label: 'Cide Studio On Instagram', icon: '◎', href: '#' },
]

export default function SocialFollow() {
  return (
    <section id="social" style={{
      position: 'relative',
      padding: 'clamp(3rem, 8vw, 5rem) clamp(1.25rem, 5vw, 3rem)',
      overflow: 'hidden',
      background: 'var(--navy-dark)',
    }}>
      {/* Background photo-like overlay using a gradient pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(107,47,219,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)',
        zIndex: 0,
      }} />
      {/* Semi-transparent dark overlay to simulate the photo-bg from reference */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(10,10,30,0.7)',
        backdropFilter: 'blur(2px)',
        zIndex: 0,
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'Montserrat',
            fontWeight: 900,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: 'white',
            marginBottom: '2.5rem',
          }}
        >
          FOLLOW{' '}
          <span style={{ color: 'var(--purple-light)' }}>OUR STUDIO</span>
        </motion.h2>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {socials.map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ background: 'rgba(255,255,255,0.15)', y: -4 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1.5px solid rgba(255,255,255,0.25)',
                borderRadius: '100px',
                padding: '1.25rem 2.5rem',
                textDecoration: 'none',
                minWidth: 180,
                transition: 'all 0.25s',
              }}
            >
              <span style={{ fontSize: '1.3rem', color: 'white' }}>{s.icon}</span>
              <span style={{
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.8)',
                fontFamily: 'Satoshi',
                fontWeight: 500,
              }}>
                {s.label}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
