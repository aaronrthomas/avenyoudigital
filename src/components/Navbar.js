'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '#hero', section: 'hero' },
  { label: 'About Us', href: '#about', section: 'about' },
  { label: 'Services', href: '#services', section: 'services' },
  { label: 'Contact Us', href: '#contact', section: 'contact' },
]

// Which sections have a DARK background (nav turns light/white-on-dark)
const darkSections = new Set(['about', 'social', 'contact'])

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  // ── Track scroll depth for backdrop ──
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // ── IntersectionObserver: detect which section is in view ──
  useEffect(() => {
    const sectionIds = ['hero', 'services', 'about', 'projects', 'testimonials', 'social', 'contact', 'footer']
    const observers = []
    const visibility = {}

    const pickMostVisible = () => {
      let best = 'hero', bestRatio = -1
      for (const [id, ratio] of Object.entries(visibility)) {
        if (ratio > bestRatio) { bestRatio = ratio; best = id }
      }
      setActiveSection(best)
    }

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      visibility[id] = 0
      const obs = new IntersectionObserver(
        ([entry]) => {
          visibility[id] = entry.intersectionRatio
          pickMostVisible()
        },
        { threshold: Array.from({ length: 21 }, (_, i) => i * 0.05) }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const onDark = darkSections.has(activeSection)

  // Navbar colors depending on section background
  const navBg = onDark
    ? (scrolled ? 'rgba(10,10,20,0.95)' : 'rgba(10,10,20,0.85)')
    : (scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.97)')

  const navBorder = onDark ? 'rgba(255,255,255,0.08)' : 'var(--border)'
  const logoTextColor = onDark ? 'white' : 'var(--navy)'
  const linkDefaultColor = onDark ? 'rgba(255,255,255,0.7)' : 'var(--text-dark)'
  const linkHoverColor = onDark ? 'white' : 'var(--navy)'

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: navBg,
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${navBorder}`,
        padding: '1rem 3rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Logo */}
      <motion.a
        href="#hero"
        onClick={(e) => handleNavClick(e, '#hero')}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
        whileHover={{ scale: 1.02 }}
      >
        {/* <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
          <rect x="4" y="4" width="14" height="14" rx="2" fill={onDark ? '#6B2FDB' : 'var(--navy)'} />
          <rect x="22" y="4" width="14" height="14" rx="2" fill={onDark ? '#C8E44A' : 'var(--purple)'} />
          <rect x="4" y="22" width="14" height="14" rx="2" fill={onDark ? '#C8E44A' : 'var(--purple)'} />
          <rect x="22" y="22" width="14" height="14" rx="2" fill={onDark ? '#6B2FDB' : 'var(--navy)'} />
          <rect x="13" y="13" width="14" height="14" rx="2" fill={onDark ? '#0a0a14' : 'white'} />
          <rect x="16" y="16" width="8" height="8" rx="1" fill={onDark ? '#6B2FDB' : 'var(--navy)'} />
        </svg> */}
        <div>
          <img
            src="/logo.png"
            alt="Avenyou Digital Studios"
            style={{
              height: '50px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              filter: onDark ? 'brightness(0) invert(1)' : 'none',
              transition: 'filter 0.4s ease',
            }}
          />
        </div>
      </motion.a>

      {/* Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        {navLinks.map((link) => {
          const isActive = activeSection === link.section ||
            (link.section === 'hero' && activeSection === 'hero') ||
            (link.section === 'contact' && (activeSection === 'contact' || activeSection === 'social'))

          return (
            <div key={link.label} style={{ position: 'relative' }}>
              <motion.a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  textDecoration: 'none',
                  color: isActive ? 'var(--purple)' : linkDefaultColor,
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 700 : 500,
                  fontFamily: 'Satoshi',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                }}
                whileHover={{ color: isActive ? 'var(--purple)' : linkHoverColor }}
              >
                {link.label}
              </motion.a>
              {/* Active underline indicator */}
              {isActive && (
                <motion.div
                  layoutId="nav-underline"
                  style={{
                    position: 'absolute',
                    bottom: -4, left: 0, right: 0,
                    height: 2,
                    background: 'var(--purple)',
                    borderRadius: 1,
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.05, background: '#5B20CB' }}
        whileTap={{ scale: 0.97 }}
        style={{
          background: 'var(--purple)',
          color: 'white',
          border: 'none',
          borderRadius: '100px',
          padding: '0.7rem 1.75rem',
          fontSize: '0.9rem',
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'Montserrat',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          transition: 'background 0.2s',
        }}
      >
        Sign Up ↗
      </motion.button>
    </motion.nav>
  )
}
