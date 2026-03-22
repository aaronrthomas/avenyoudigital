'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'Robin Hudey',
    role: 'Client Development',
    text: '"Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica"',
    emoji: '👨🏽‍💼',
  },
  {
    name: 'Jessicca Milanja',
    role: 'Client Development',
    text: '"Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica"',
    emoji: '👩🏽‍💼',
  },
  {
    name: 'David Chen',
    role: 'Product Manager',
    text: '"Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica"',
    emoji: '👨🏻‍💼',
  },
]

export default function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0)
  const perPage = 2
  const pages = Math.ceil(testimonials.length / perPage)
  const visible = testimonials.slice(currentPage * perPage, currentPage * perPage + perPage)

  return (
    <section style={{ background: 'var(--white)', padding: '5rem 3rem' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'Montserrat',
            fontWeight: 900,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: 'var(--navy)',
            marginBottom: '0.75rem',
          }}
        >
          TESTIMONIALS
        </motion.h2>
        <div style={{ height: '1px', background: 'var(--border)', marginBottom: '3rem' }} />

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(visible.length, 2)}, 1fr)`,
              gap: '3rem',
              marginBottom: '3rem',
            }}
          >
            {visible.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: '1.75rem', alignItems: 'flex-start' }}>
                {/* Circle photo with quote badge */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: 110, height: 110, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #e8e8e8, #d4d4d4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '3.5rem', overflow: 'hidden',
                    border: '3px solid var(--white)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}>
                    {t.emoji}
                  </div>
                  {/* Quote badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: 4, right: -6,
                    width: 34, height: 34, borderRadius: '50%',
                    background: 'var(--purple)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: '1rem', fontFamily: 'Georgia',
                    lineHeight: 1,
                  }}>
                    "
                  </div>
                </div>

                {/* Text */}
                <div>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem',
                    lineHeight: 1.75,
                    fontFamily: 'Satoshi',
                    marginBottom: '1rem',
                    fontStyle: 'italic',
                  }}>
                    {t.text}
                  </p>
                  <div style={{ fontFamily: 'Montserrat', fontWeight: 700, color: 'var(--navy)', fontSize: '0.95rem' }}>
                    {t.name}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'Satoshi' }}>
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <motion.button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={currentPage === 0}
            style={{
              width: 42, height: 42, borderRadius: '50%',
              border: '1.5px solid var(--purple)',
              background: 'white',
              color: 'var(--purple)',
              fontSize: '1rem', cursor: currentPage === 0 ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: currentPage === 0 ? 0.4 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            ←
          </motion.button>
          <motion.button
            onClick={() => setCurrentPage(p => Math.min(pages - 1, p + 1))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={currentPage >= pages - 1}
            style={{
              width: 42, height: 42, borderRadius: '50%',
              border: '1.5px solid var(--purple)',
              background: 'var(--purple)',
              color: 'white',
              fontSize: '1rem', cursor: currentPage >= pages - 1 ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: currentPage >= pages - 1 ? 0.4 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            →
          </motion.button>
        </div>
      </div>
    </section>
  )
}
