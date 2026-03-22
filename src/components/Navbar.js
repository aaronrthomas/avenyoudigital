'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '#hero', section: 'hero' },
  { label: 'About Us', href: '#about', section: 'about' },
  { label: 'Services', href: '#services', section: 'services' },
  { label: 'Contact Us', href: '#contact', section: 'contact' },
]

const darkSections = new Set(['about', 'social', 'contact'])

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menu on scroll
  useEffect(() => {
    if (menuOpen) {
      const close = () => setMenuOpen(false)
      window.addEventListener('scroll', close, { once: true, passive: true })
      return () => window.removeEventListener('scroll', close)
    }
  }, [menuOpen])

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
        ([entry]) => { visibility[id] = entry.intersectionRatio; pickMostVisible() },
        { threshold: Array.from({ length: 21 }, (_, i) => i * 0.05) }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const onDark = darkSections.has(activeSection)

  const navBg = onDark
    ? 'rgba(10,10,20,0.95)'
    : 'rgba(255,255,255,0.97)'
  const navBorder = onDark ? 'rgba(255,255,255,0.08)' : 'var(--border)'
  const logoFilter = onDark ? 'brightness(0) invert(1)' : 'none'
  const linkDefaultColor = onDark ? 'rgba(255,255,255,0.7)' : 'var(--text-dark)'
  const linkHoverColor = onDark ? 'white' : 'var(--navy)'
  const burgerColor = onDark ? 'white' : 'var(--navy)'

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          background: navBg,
          backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${navBorder}`,
          padding: '0.9rem 2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          whileHover={{ scale: 1.02 }}
        >
          <img
            src="/logo.png"
            alt="Avenyou Digital Studios"
            style={{
              height: '42px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              filter: logoFilter,
              transition: 'filter 0.4s ease',
            }}
          />
        </motion.a>

        {/* Desktop Nav Links */}
        <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.section ||
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
                  }}
                  whileHover={{ color: isActive ? 'var(--purple)' : linkHoverColor }}
                >
                  {link.label}
                </motion.a>
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    style={{
                      position: 'absolute', bottom: -4, left: 0, right: 0,
                      height: 2, background: 'var(--purple)', borderRadius: 1,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Desktop CTA */}
        <motion.button
          className="nav-desktop-cta"
          whileHover={{ scale: 1.05, background: '#5B20CB' }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: 'var(--purple)', color: 'white', border: 'none',
            borderRadius: '100px', padding: '0.7rem 1.75rem',
            fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
            fontFamily: 'Montserrat', display: 'flex', alignItems: 'center', gap: '0.4rem',
            transition: 'background 0.2s',
          }}
        >
          Sign Up ↗
        </motion.button>

        {/* Hamburger (mobile only) */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '4px', gap: '5px', flexDirection: 'column', alignItems: 'center',
          }}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              animate={menuOpen
                ? i === 0 ? { rotate: 45, y: 7 }
                : i === 1 ? { opacity: 0 }
                : { rotate: -45, y: -7 }
                : { rotate: 0, y: 0, opacity: 1 }
              }
              style={{
                display: 'block', width: 24, height: 2,
                background: burgerColor,
                borderRadius: 2,
                transition: 'background 0.3s',
              }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 999,
              background: onDark ? 'rgba(10,10,20,0.98)' : 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: `1px solid ${navBorder}`,
              padding: '1.5rem 2rem 2rem',
              display: 'flex', flexDirection: 'column', gap: '1.25rem',
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.section
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    textDecoration: 'none',
                    color: isActive ? 'var(--purple)' : linkDefaultColor,
                    fontSize: '1.1rem',
                    fontWeight: isActive ? 700 : 500,
                    fontFamily: 'Satoshi',
                    borderBottom: `1px solid ${navBorder}`,
                    paddingBottom: '1rem',
                  }}
                >
                  {link.label}
                </motion.a>
              )
            })}
            <motion.button
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'var(--purple)', color: 'white', border: 'none',
                borderRadius: '100px', padding: '0.85rem 2rem',
                fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
                fontFamily: 'Montserrat', marginTop: '0.5rem',
              }}
            >
              Sign Up ↗
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-desktop-cta   { display: none !important; }
          .nav-hamburger     { display: flex !important; }
        }
      `}</style>
    </>
  )
}
