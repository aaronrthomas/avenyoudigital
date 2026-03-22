'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section
      ref={ref}
      id="about"
      style={{
        background: 'var(--navy)',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 3rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Parallax bg text */}
      <motion.div
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          y: bgY,
          fontFamily: 'Montserrat',
          fontWeight: 900,
          fontSize: 'clamp(5rem, 15vw, 14rem)',
          color: 'rgba(255,255,255,0.03)',
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        DEVELOPER
      </motion.div>

      <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="about-grid">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 0, x: 0 }}
              viewport={{ once: true }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ color: 'var(--lime)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'Montserrat' }}
            >
              About Our Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                fontFamily: 'Montserrat', fontWeight: 900,
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                color: 'white', lineHeight: 1.1, marginBottom: '2rem',
              }}
            >
              <span style={{ color: 'var(--lime)' }}>SATISFACTORY</span><br />
              DEVELOPER WORK
            </motion.h2>

            {[
              { label: 'Web Development', pct: 95 },
              { label: 'Mobile Development', pct: 88 },
              { label: 'UI/UX Design', pct: 92 },
            ].map((bar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                style={{ marginBottom: '1.25rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'Satoshi' }}>{bar.label}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--lime)', fontWeight: 700, fontFamily: 'Montserrat' }}>{bar.pct}%</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.1 }}
                    style={{ height: '100%', background: 'var(--purple)', borderRadius: 2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '2rem', fontFamily: 'Satoshi' }}
            >
              <strong style={{ color: 'white', fontFamily: 'Montserrat' }}>Customer Success Is Our Goal.</strong>
              <br /><br />
              We believe great software goes beyond code. It is about understanding your business 
              needs, crafting intuitive experiences, and delivering solutions that create lasting 
              impact for your users and your bottom line.
            </motion.p>

            <div style={{ display: 'flex', gap: '2.5rem' }}>
              {[
                { num: '8+', label: 'Years Experience' },
                { num: '200+', label: 'Projects Done' },
                { num: '98%', label: 'Satisfaction' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '2rem', color: 'var(--lime)' }}>{stat.num}</div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', fontFamily: 'Satoshi' }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }
      `}</style>
    </section>
  )
}
