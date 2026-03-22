'use client'

import { motion } from 'framer-motion'

export default function CTABanner() {
  return (
    <section
      id="contact"
      style={{
        background: 'var(--purple)',
        padding: '5rem 3rem',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'Montserrat',
            fontWeight: 900,
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            color: 'white',
            marginBottom: '1rem',
          }}
        >
          WHAT ARE YOU WAITING FOR?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '0.9rem',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
            fontFamily: 'Satoshi',
          }}
        >
          Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. 
          Por scientie, musica, sport etc.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}
        >
          <motion.button
            whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.95)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'white',
              color: 'var(--purple)',
              border: 'none',
              borderRadius: '100px',
              padding: '0.9rem 2.5rem',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'Montserrat',
              transition: 'all 0.2s',
            }}
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.15)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '1.5px solid rgba(255,255,255,0.4)',
              borderRadius: '50%',
              width: 50, height: 50,
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            ↗
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
