'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const services = [
  {
    id: '01',
    title: 'Web Development',
    desc: 'We craft pixel-perfect, high-performance websites that look stunning and convert visitors into customers.',
    bg: 'linear-gradient(135deg, #0d0d2b, #1a0a3a)',
    emoji: '💻',
    features: ['Next.js & React', 'SEO Optimised', 'Mobile-First', 'CMS Integration'],
    accent: '#7c5cbf',
  },
  {
    id: '02',
    title: 'Product Design',
    desc: 'From data pipelines to AI integrations — we build robust Python backends that scale effortlessly.',
    bg: 'linear-gradient(135deg, #1a0a3a, #2a0a4a)',
    emoji: '🐍',
    features: ['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping', 'UX Research'],
    accent: '#9c6cbf',
  },
  {
    id: '03',
    title: 'Video Editing',
    desc: 'Native and cross-platform Android apps engineered for speed, reliability, and delightful UX.',
    bg: 'linear-gradient(135deg, #0a1530, #1a2040)',
    emoji: '📱',
    features: ['Adobe Premiere Pro', 'Adobe After Effects', 'Color Grading', 'Motion Graphics'],
    accent: '#4a9eff',
  },
  {
    id: '04',
    title: 'Graphic Design',
    desc: 'Native and cross-platform Android apps engineered for speed, reliability, and delightful UX.',
    bg: 'linear-gradient(135deg, #0a1530, #1a2040)',
    emoji: '📱',
    features: ['Adobe Photoshop', 'Adobe Illustrator', 'Branding', 'Marketing Materials'],
    accent: '#4a9eff',
  },
]

export default function Services() {
  const [active, setActive] = useState(0)
  const [flipped, setFlipped] = useState({})
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const toggleFlip = (i) =>
    setFlipped((prev) => ({ ...prev, [i]: !prev[i] }))

  return (
    <section
      ref={ref}
      id="services"
      style={{
        background: 'var(--navy)',
        padding: 'clamp(3rem, 8vw, 5rem) clamp(1.25rem, 5vw, 3rem)',
        position: 'relative',
        // overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>


        {/* Cards */}
        <div style={{ position: 'relative' }}>
          <style>{`
        @media (max-width: 900px) {
          #services .cards-grid { grid-template-columns: 1fr !important; }
          #services .cards-grid > div { height: auto !important; min-height: 340px; }
        }
      `}</style>
          {/* Cards grid */}
          <div className="cards-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            position: 'relative',
            zIndex: 1,
          }}>
            {services.map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                style={{ perspective: '1000px', height: 360 }}
                onClick={() => { setActive(i); toggleFlip(i) }}
              >
                {/* Flip container */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    transform: flipped[i] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition: 'transform 0.65s cubic-bezier(0.4,0.2,0.2,1)',
                    borderRadius: '20px',
                  }}
                >
                  {/* ── FRONT FACE ── */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      background: 'var(--cream)',
                      borderRadius: '20px',
                      padding: '1.75rem',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Checkmark badge */}
                    <div style={{
                      width: 38, height: 38, borderRadius: '50%',
                      border: '1.5px solid var(--navy)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '1.25rem',
                      fontSize: '0.9rem', color: 'var(--navy)',
                      flexShrink: 0,
                    }}>
                      ✓
                    </div>
                    <h3 style={{
                      fontFamily: 'Montserrat',
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      color: 'var(--navy)',
                      marginBottom: '0.5rem',
                    }}>
                      {svc.title}
                    </h3>
                    <p style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.825rem',
                      lineHeight: 1.65,
                      marginBottom: '1.25rem',
                      fontFamily: 'Satoshi',
                      flex: 1,
                    }}>
                      {svc.desc}
                    </p>
                    {/* Emoji preview panel */}
                    <div style={{
                      height: 110, borderRadius: '12px',
                      background: svc.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '3rem',
                      flexShrink: 0,
                    }}>
                      {svc.emoji}
                    </div>
                    {/* Flip hint */}
                    <div style={{
                      position: 'absolute',
                      bottom: '0.85rem', right: '1rem',
                      fontSize: '0.6rem',
                      fontFamily: 'Montserrat',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      color: 'rgba(0,0,0,0.22)',
                      display: 'flex', alignItems: 'center', gap: '0.3rem',
                    }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      CLICK TO FLIP
                    </div>
                  </div>

                  {/* ── BACK FACE ── */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: svc.bg,
                      borderRadius: '20px',
                      padding: '1.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Glow blob */}
                    <div style={{
                      position: 'absolute',
                      top: '-40px', right: '-40px',
                      width: 180, height: 180,
                      borderRadius: '50%',
                      background: svc.accent,
                      opacity: 0.18,
                      filter: 'blur(40px)',
                      pointerEvents: 'none',
                    }} />

                    {/* Top: ghost number + emoji */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{
                        fontFamily: 'Montserrat',
                        fontWeight: 900,
                        fontSize: '3.5rem',
                        color: 'rgba(255,255,255,0.08)',
                        lineHeight: 1,
                      }}>{svc.id}</span>
                      <span style={{ fontSize: '2.6rem' }}>{svc.emoji}</span>
                    </div>

                    {/* Title + feature list */}
                    <div>
                      <h3 style={{
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fontSize: '1.2rem',
                        color: '#fff',
                        marginBottom: '1rem',
                      }}>
                        {svc.title}
                      </h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {svc.features.map((f, fi) => (
                          <li key={fi} style={{
                            display: 'flex', alignItems: 'center', gap: '0.6rem',
                            fontFamily: 'Satoshi',
                            fontSize: '0.85rem',
                            color: 'rgba(255,255,255,0.82)',
                          }}>
                            <span style={{
                              width: 18, height: 18, borderRadius: '50%',
                              background: svc.accent,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: '0.58rem', flexShrink: 0,
                            }}>✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom CTA row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{
                        fontFamily: 'Montserrat', fontWeight: 700,
                        fontSize: '0.65rem', letterSpacing: '0.08em',
                        color: 'rgba(255,255,255,0.35)',
                      }}>
                        CLICK TO FLIP BACK
                      </span>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: '1rem',
                      }}>
                        ↗
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


      </div>
    </section>
  )
}
