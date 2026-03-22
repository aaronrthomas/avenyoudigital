'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function Sparkle({ size = 22, color = 'var(--navy)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path
        d="M12 2 L13.2 10.8 L22 12 L13.2 13.2 L12 22 L10.8 13.2 L2 12 L10.8 10.8 Z"
        fill={color}
      />
    </svg>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const [isMounted, setIsMounted] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  // ── SPOTLIGHT + 3D TILT STATE ──
  const spotlightRef = useRef(null)
  const contentRef = useRef(null)

  const lerp = (a, b, n) => a + (b - a) * n

  useEffect(() => {
    setIsMounted(true)

    const section = ref.current
    if (!section) return

    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX
      const y = e.clientY

      // Spotlight follows raw cursor position inside the section
      if (spotlightRef.current) {
        const sx = x - rect.left
        const sy = y - rect.top
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${sx}px ${sy}px, rgba(107,47,219,0.08) 0%, transparent 70%)`
      }

      // 3D tilt on content block
      if (contentRef.current) {
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (x - cx) / (rect.width / 2)
        const dy = (y - cy) / (rect.height / 2)
        contentRef.current.style.transform = `perspective(1200px) rotateX(${-dy * 2.5}deg) rotateY(${dx * 4}deg)`
      }
    }

    const onMouseLeave = () => {
      if (spotlightRef.current) spotlightRef.current.style.background = 'none'
      if (contentRef.current) contentRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)'
    }

    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)

    return () => {
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        background: 'var(--white)',
        minHeight: '100vh',
        paddingTop: '10.5rem',
        paddingBottom: '4rem',
        paddingLeft: '3rem',
        paddingRight: '3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── SPOTLIGHT ── */}
      <div
        ref={spotlightRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'background 0.05s',
        }}
      />
      <motion.div
        style={{ y, opacity, maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        {/* ── 3D TILT WRAPPER ── */}
        <div
          ref={contentRef}
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.12s ease-out',
            willChange: 'transform',
          }}
        >
        {/* ── TOP ROW: Badges + line ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.8rem' }}
        >
          {/* Badge 1 */}
          <div style={{
            border: '1.5px solid var(--navy)',
            borderRadius: '100px',
            padding: '0.42rem 1.1rem',
            fontSize: '0.72rem',
            fontWeight: 700,
            fontFamily: 'Montserrat',
            color: 'var(--navy)',
            letterSpacing: '0.04em',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            whiteSpace: 'nowrap',
          }}>
            <svg width="14" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="var(--navy)" strokeWidth="2" />
              <path d="M7 12l4 4 6-7" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            2023 BEST DEVELOPMENT
          </div>

          {/* Badge 2 */}
          <div style={{
            border: '1.5px solid var(--navy)',
            borderRadius: '100px',
            padding: '0.42rem 1.1rem',
            fontSize: '0.72rem',
            fontWeight: 700,
            fontFamily: 'Montserrat',
            color: 'var(--navy)',
            letterSpacing: '0.04em',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            whiteSpace: 'nowrap',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="14" rx="2" stroke="var(--navy)" strokeWidth="2" />
              <path d="M8 21h8M12 17v4" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            WORD CLASS DEVELOPMENT
          </div>

          {/* Horizontal rule */}
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />

          {/* Top-right sparkle */}
          <div style={{ animation: 'sparkle 3s ease-in-out infinite' }}>
            <Sparkle size={22} />
          </div>
        </motion.div>

        {/* ── HERO BODY: relative container ── */}
        <div style={{ position: 'relative' }}>

          {/* Top-right description text — absolutely positioned */}
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: 0,
              width: '320px',
              color: 'var(--text-muted)',
              fontSize: '0.875rem',
              lineHeight: 1.75,
              fontFamily: 'Satoshi',
            }}
          >
            Li Europan lingues es membres del sam familie. Lor
            separat existentie es un myth. Por scientie, musica,
            sport etc, litot Europa usa li sam vocabular.
          </motion.p>

          {/* ── HEADLINE BLOCK ── */}
          <div style={{ position: 'relative' }}>
            {/* 3D Spline overlay (contained, interactive) */}
            <div
              className="hero-spline-overlay"
              style={{
                position: 'absolute',
                top: '1.8rem',
                right: '2rem',
                width: '450px',
                height: '360px',
                zIndex: 1,
                pointerEvents: 'auto',
              }}
            >
            </div>

            {/* ROW 1: sparkle + photo + CREATIVE */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', lineHeight: 1, position: 'relative', zIndex: 2 }}>
              {/* Sparkle left */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                style={{ marginBottom: '-0.3rem', animation: 'sparkle 2.8s ease-in-out infinite 0.4s', flexShrink: 0 }}
              >
                <Sparkle size={32} />
              </motion.div>

              {/* Floating person photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.65, delay: 0.5 }}
                style={{
                  width: 110,
                  height: 78,
                  borderRadius: '100px',
                  background: 'linear-gradient(135deg, #1c1c2e 0%, #0d0d1e 100%)',
                  overflow: 'hidden',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {/* Simulate person silhouette */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="80" height="78" viewBox="0 0 80 78" fill="none">
                    {/* Dark background person silhouette */}
                    <ellipse cx="40" cy="28" rx="14" ry="14" fill="#3a3a5c" />
                    <path d="M10 78 Q10 50 40 50 Q70 50 70 78Z" fill="#3a3a5c" />
                    {/* Screen glow */}
                    <rect x="4" y="20" width="28" height="38" rx="3" fill="#1a3a6c" opacity="0.7" />
                    <rect x="6" y="22" width="24" height="6" rx="1" fill="#4a9eff" opacity="0.6" />
                    <rect x="6" y="30" width="20" height="2" rx="1" fill="#4a9eff" opacity="0.4" />
                    <rect x="6" y="34" width="16" height="2" rx="1" fill="#4a9eff" opacity="0.4" />
                  </svg>
                </div>
              </motion.div>

              {/* CREATIVE */}
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28 }}
                style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 900,
                  fontSize: 'clamp(4.5rem, 10vw, 9.5rem)',
                  color: 'var(--navy)',
                  letterSpacing: '-0.02em',
                  lineHeight: 0.95,
                  display: 'block',
                }}
              >
                CREATIVE
              </motion.span>
            </div>

            {/* ROW 2: DEVELOPER — full-width purple */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              style={{
                fontFamily: 'Montserrat',
                fontWeight: 900,
                fontSize: 'clamp(4.5rem, 10vw, 9.5rem)',
                color: 'var(--purple)',
                letterSpacing: '-0.02em',
                lineHeight: 0.95,
                display: 'block',
                marginTop: '0.15rem',
                position: 'relative',
                zIndex: 2,
              }}
            >
              DEVELOPER
            </motion.div>

            {/* ROW 3: STUDIO + video pill, right sparkle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.15rem', position: 'relative', zIndex: 2 }}>
              {/* STUDIO */}
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.48 }}
                style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 900,
                  fontSize: 'clamp(4.5rem, 10vw, 9.5rem)',
                  color: 'var(--navy)',
                  letterSpacing: '-0.02em',
                  lineHeight: 0.95,
                  flexShrink: 0,
                }}
              >
                STUDIO
              </motion.span>

              {/* Video pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
                whileHover={{ scale: 1.03 }}
                style={{
                  height: 88,
                  width: 280,
                  borderRadius: '100px',
                  background: 'linear-gradient(135deg, #0d0d20 0%, #1a0d30 40%, #0a1828 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: '0.6rem',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                {/* Woman dev silhouette / code glow overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '1.5rem',
                }}>
                  <svg width="180" height="88" viewBox="0 0 180 88" fill="none" opacity="0.5">
                    {/* Code lines */}
                    <rect x="10" y="15" width="60" height="3" rx="1.5" fill="#7c5cbf" />
                    <rect x="10" y="22" width="45" height="3" rx="1.5" fill="#4a9eff" />
                    <rect x="18" y="29" width="50" height="3" rx="1.5" fill="#9c6cbf" />
                    <rect x="10" y="36" width="38" height="3" rx="1.5" fill="#4a9eff" />
                    <rect x="18" y="43" width="55" height="3" rx="1.5" fill="#7c5cbf" />
                    <rect x="10" y="50" width="42" height="3" rx="1.5" fill="#4a9eff" />
                    <rect x="18" y="57" width="48" height="3" rx="1.5" fill="#9c6cbf" />
                    <rect x="10" y="64" width="36" height="3" rx="1.5" fill="#4a9eff" />
                    {/* Woman silhouette */}
                    <ellipse cx="145" cy="28" rx="16" ry="16" fill="#5a4a8c" />
                    <path d="M115 88 Q118 60 145 60 Q172 60 175 88Z" fill="#5a4a8c" />
                  </svg>
                </div>
                {/* Play button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: '50%',
                    background: 'var(--purple)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.3rem',
                    flexShrink: 0,
                    zIndex: 1,
                    position: 'relative',
                    animation: 'pulse-ring 2.5s ease-in-out infinite',
                    paddingLeft: '4px',
                  }}
                >
                  ▶
                </motion.div>
              </motion.div>

              {/* Small sparkle — right side of this row */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 }}
                style={{ animation: 'sparkle 2.5s ease-in-out infinite 1s', flexShrink: 0 }}
              >
                <Sparkle size={18} />
              </motion.div>
            </div>
          </div>

          {/* ── BOTTOM ROW: description + buttons | spinning badge ── */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginTop: '2.5rem',
          }}>
            {/* Left: description + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              style={{ maxWidth: '500px' }}
            >
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.875rem',
                lineHeight: 1.8,
                marginBottom: '1.75rem',
                fontFamily: 'Satoshi',
              }}>
                Li Europan lingues es membres del sam familie. Lor separat existentie es un myth.
                Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues
                differe solmen in li grammatica, li pronunciation e li plu commun vocabules.
                Omnicos directe al desirabilite de un nov lingua franca.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <motion.button
                  whileHover={{ scale: 1.05, background: '#5B20CB' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'var(--purple)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '100px',
                    padding: '0.95rem 2.4rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'Montserrat',
                    transition: 'background 0.2s',
                  }}
                >
                  Get Started
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, background: '#5B20CB' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'var(--purple)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: 52,
                    height: 52,
                    fontSize: '1.15rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'background 0.2s',
                  }}
                >
                  ↗
                </motion.button>
              </div>
            </motion.div>

            {/* Right: Spinning circular badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -60 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 1.05, type: 'spring', stiffness: 90 }}
              style={{ width: 150, height: 150, flexShrink: 0, position: 'relative' }}
            >
              {/* Rotating text ring */}
              <svg
                viewBox="0 0 150 150"
                style={{
                  width: '100%',
                  height: '100%',
                  animation: 'spin-slow 14s linear infinite',
                  position: 'absolute',
                  inset: 0,
                }}
              >
                <defs>
                  <path
                    id="badge-ring"
                    d="M 75 75 m -58 0 a 58 58 0 1 1 116 0 a 58 58 0 1 1 -116 0"
                  />
                </defs>
                <text
                  style={{
                    fontSize: 13.5,
                    fill: 'var(--navy)',
                    fontWeight: 700,
                    fontFamily: 'Montserrat',
                    letterSpacing: '0.1em',
                  }}
                >
                  <textPath href="#badge-ring">
                    CREATIVE • DEVELOPER • STUDIO •&nbsp;
                  </textPath>
                </text>
              </svg>
              {/* Center: 4-point star */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Sparkle size={52} color="var(--navy)" />
              </div>
            </motion.div>
          </div>
        </div>
        {/* Close 3D tilt wrapper */}
        </div>
      </motion.div>

      <style>{`
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.15) rotate(15deg); opacity: 0.75; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(107,47,219,0.35); }
          70% { box-shadow: 0 0 0 12px rgba(107,47,219,0); }
          100% { box-shadow: 0 0 0 0 rgba(107,47,219,0); }
        }
        @media (max-width: 900px) {
          section#hero { padding-left: 1.5rem; padding-right: 1.5rem; }
          .hero-spline-overlay { display: none !important; }
        }
      `}</style>
    </section>
  )
}
