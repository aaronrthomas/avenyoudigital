'use client'

import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Web Development',
    desc: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules.',
    side: 'right',
    emoji: '🖥️',
    bg: 'linear-gradient(135deg, #1a1a2e, #0d0d1e)',
  },
  {
    title: 'Mobile Apps Development',
    desc: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules.',
    side: 'left',
    emoji: '📱',
    bg: 'linear-gradient(135deg, #0d0d1e 0%, #1a0a2e 100%)',
  },
  {
    title: 'Game Development',
    desc: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules.',
    side: 'right',
    emoji: '🎮',
    bg: 'linear-gradient(135deg, #0a1228, #162040)',
  },
]

export default function Projects() {
  return (
    <section id="projects" style={{ background: 'var(--white)', padding: '5rem 3rem' }}>
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
            marginBottom: '0.75rem',
          }}
        >
          <span style={{ color: 'var(--navy)' }}>OUR </span>
          <span style={{ color: 'var(--purple)' }}>PAST PROJECTS</span>
        </motion.h2>
        <div style={{ height: '1px', background: 'var(--border)', marginBottom: '3rem' }} />

        {/* Project rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {projects.map((project, i) => (
            <div key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: project.side === 'right' ? '1.2fr 1fr' : '1fr 1.2fr',
                  gap: '3rem',
                  alignItems: 'center',
                  padding: '2.5rem 0',
                }}
                className="project-row"
              >
                {/* Image: pill-shaped */}
                <div style={{ order: project.side === 'left' ? 2 : 1, position: 'relative' }}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    style={{
                      borderRadius: '200px',
                      overflow: 'hidden',
                      height: 220,
                      background: project.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '5rem',
                      position: 'relative',
                    }}
                  >
                    {project.emoji}
                    {/* Purple arrow button */}
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      style={{
                        position: 'absolute',
                        bottom: '1.25rem',
                        right: project.side === 'right' ? '2rem' : undefined,
                        left: project.side === 'left' ? '2rem' : undefined,
                        width: 52, height: 52,
                        borderRadius: '50%',
                        background: 'var(--purple)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontSize: '1.1rem', cursor: 'pointer',
                      }}
                    >
                      ↗
                    </motion.div>
                  </motion.div>
                </div>

                {/* Text */}
                <div style={{ order: project.side === 'left' ? 1 : 2 }}>
                  <h3 style={{
                    fontFamily: 'Montserrat',
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    color: 'var(--navy)',
                    marginBottom: '0.75rem',
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem',
                    lineHeight: 1.75,
                    fontFamily: 'Satoshi',
                  }}>
                    {project.desc}
                  </p>
                </div>
              </motion.div>
              {/* Divider */}
              {i < projects.length - 1 && (
                <div style={{ height: '1px', background: 'var(--border)' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-row { grid-template-columns: 1fr !important; }
          .project-row > div { order: 0 !important; }
        }
      `}</style>
    </section>
  )
}
