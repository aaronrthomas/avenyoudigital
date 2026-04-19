'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const projects = [
  {
    title: 'Web Development',
    desc: 'We craft pixel-perfect, high-performance websites that look stunning and convert visitors into customers.',
    side: 'right',
    image: '/project-web-dev.png',
    link: 'https://bannned.vercel.app/pages/demon/index.html',
    bg: 'linear-gradient(135deg, #1a1a2e, #0d0d1e)',
  },
  {
    title: 'Graphic Design',
    desc: 'Bold visual identities, marketing materials, and brand systems that make a lasting impression.',
    side: 'left',
    emoji: '🎨',
    bg: 'linear-gradient(135deg, #0d0d1e 0%, #1a0a2e 100%)',
  },
  {
    title: 'Video Editing',
    desc: 'Cinematic edits, motion graphics, and colour-graded films that captivate your audience.',
    side: 'right',
    image: '/project-video-edit.png',
    link: 'https://www.instagram.com/reel/DWPRQTfkk6p/?igsh=MTRkcDBoMjdrOHVoYw==',
    bg: 'linear-gradient(135deg, #0a1228, #162040)',
  },
  {
    title: 'Product Design',
    desc: 'End-to-end UX/UI design — from wireframes to polished prototypes that users love.',
    side: 'left',
    emoji: '🖌️',
    bg: 'linear-gradient(135deg, #0a1228, #162040)',
  },
]

export default function Projects() {
  return (
    <section id="projects" style={{ background: 'var(--white)', padding: 'clamp(3rem, 8vw, 5rem) clamp(1.25rem, 5vw, 3rem)' }}>
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
                    className="project-pill-img"
                    whileHover={{ scale: 1.02 }}
                    style={{
                      borderRadius: '50px',
                      overflow: 'hidden',
                      height: 220,
                      background: project.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '5rem',
                      position: 'relative',
                    }}
                  >
                    {/* Real image cover if available */}
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'top center' }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <span style={{ position: 'relative', zIndex: 1 }}>{project.emoji}</span>
                    )}

                    {/* Clickable arrow button */}
                    {project.link ? (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
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
                          zIndex: 2,
                          textDecoration: 'none',
                        }}
                      >
                        ↗
                      </motion.a>
                    ) : (
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
                          zIndex: 2,
                        }}
                      >
                        ↗
                      </motion.div>
                    )}
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
                  {project.link && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        marginTop: '1rem',
                        color: 'var(--purple)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        fontFamily: 'Montserrat',
                        letterSpacing: '0.04em',
                        textDecoration: 'none',
                      }}
                    >
                      VIEW PROJECT ↗
                    </motion.a>
                  )}
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
          .project-row { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .project-row > div { order: 0 !important; }
          .project-pill-img { border-radius: 24px !important; height: 200px !important; }
        }
        @media (max-width: 480px) {
          .project-pill-img { height: 160px !important; font-size: 3.5rem !important; }
        }
      `}</style>
    </section>
  )
}
