'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import Image from 'next/image'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0) // 0=loading, 1=complete, 2=exit
  const shimmerControls = useAnimation()

  // ── Progress counter ──────────────────────────────────────────────
  useEffect(() => {
    let start = null
    const duration = 2600
    const raf = (ts) => {
      if (!start) start = ts
      const pct = Math.min(100, Math.round(((ts - start) / duration) * 100))
      setProgress(pct)
      if (pct < 100) {
        requestAnimationFrame(raf)
      } else {
        setPhase(1)
        setTimeout(() => setPhase(2), 600)
        setTimeout(onComplete, 1300)
      }
    }
    requestAnimationFrame(raf)
  }, [onComplete])

  // ── Shimmer sweep: once on logo reveal, once when loading completes ─
  useEffect(() => {
    // On-mount shimmer (after logo slides in)
    const initialSweep = setTimeout(() => {
      shimmerControls.start({
        x: ['-110%', '110%'],
        transition: { duration: 0.9, ease: 'easeInOut' },
      })
    }, 1100)
    return () => clearTimeout(initialSweep)
  }, [shimmerControls])

  useEffect(() => {
    // Shimmer again when loading finishes
    if (phase === 1) {
      shimmerControls.start({
        x: ['-110%', '110%'],
        transition: { duration: 0.7, ease: 'easeInOut' },
      })
    }
  }, [phase, shimmerControls])

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#09090f',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* ── Subtle dot-grid ───────────────────────────────────── */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            pointerEvents: 'none',
          }} />

          {/* ── Ambient orange glow ───────────────────────────────── */}
          <motion.div
            animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '38%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 640, height: 340,
              background: 'radial-gradient(ellipse, rgba(232,147,32,0.14) 0%, transparent 68%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
          />

          {/* ══════════════════════════════════════════════════════════
              LOGO — clip-path CURTAIN REVEAL (wipes up from bottom)
          ══════════════════════════════════════════════════════════ */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 8 }}>
              {/* The actual logo */}
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src="/logo.png"
                  alt="Avenyou Digital Studios"
                  width={340}
                  height={106}
                  priority
                  style={{
                    filter: 'brightness(0) invert(1)',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </motion.div>

              {/* ── Shimmer glare that sweeps across the logo ───────── */}
              <motion.div
                animate={shimmerControls}
                initial={{ x: '-110%' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.28) 50%, transparent 70%)',
                  pointerEvents: 'none',
                  mixBlendMode: 'overlay',
                }}
              />
            </div>

            {/* Thin gold accent line under the logo */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: 1.5,
                width: 340,
                background: 'linear-gradient(to right, transparent, #E89320, transparent)',
                transformOrigin: 'center',
                marginTop: '1.1rem',
              }}
            />

            {/* ── Counter + progress bar ───────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: 340, marginTop: '2.2rem' }}
            >
              {/* Big counter */}
              <div style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 900,
                fontSize: '5rem',
                color: 'white',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}>
                {String(progress).padStart(2, '0')}
                <span style={{ fontSize: '2rem', color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>%</span>
              </div>

              {/* Progress track */}
              <div style={{
                width: '100%', height: 2,
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 2,
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  borderRadius: 2,
                  background: 'linear-gradient(to right, #c97a10, #E89320, #f5c060)',
                  width: `${progress}%`,
                  transition: 'width 0.05s linear',
                  boxShadow: '0 0 14px rgba(232,147,32,0.8)',
                }} />
              </div>

              {/* Status label */}
              <motion.p
                key={phase}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.3em',
                  color: 'rgba(255,255,255,0.28)',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                {phase === 1 ? 'Ready  ✦' : 'Loading Experience'}
              </motion.p>
            </motion.div>
          </div>

          {/* ── Four corner accent marks ──────────────────────────── */}
          {[
            { top: 28, left: 28, rotate: 0 },
            { top: 28, right: 28, rotate: 90 },
            { bottom: 28, right: 28, rotate: 180 },
            { bottom: 28, left: 28, rotate: 270 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
              style={{ position: 'absolute', ...pos, transform: `rotate(${pos.rotate}deg)` }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M0 18 L0 0 L18 0" stroke="rgba(232,147,32,0.4)" strokeWidth="1.5" fill="none" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
