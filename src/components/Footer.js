'use client'

import { motion } from 'framer-motion'

const footerLinks = ['About', 'Services', 'Pricing', 'Blog', 'Contact']

export default function Footer() {
  return (
    <footer style={{ background: '#000000', padding: '3.5rem 3rem 1.5rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '2rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/White Logo.png" alt="Avenyou Digital Studios" width={340} height={106} style={{ display: 'block' }} />
          </div>
        </motion.div>

        {/* Nav links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {footerLinks.map((link, i) => (
            <motion.a
              key={link}
              href="#"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ color: 'var(--purple-light)' }}
              style={{
                color: 'rgba(255,255,255,0.65)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontFamily: 'Satoshi',
                transition: 'color 0.2s',
              }}
            >
              {link}
            </motion.a>
          ))}
        </div>

        {/* Social icons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {['𝕏', '◎', 'f', '▷'].map((icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ color: 'white', scale: 1.2 }}
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: i === 0 ? '0.95rem' : '1rem',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              {icon}
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: '1.5rem' }} />

        {/* Copyright */}
        <p style={{
          color: 'rgba(255,255,255,0.35)',
          fontSize: '0.78rem',
          fontFamily: 'Satoshi',
        }}>
          © 2025 All rights reserved. This is Your Company
        </p>
      </div>
    </footer>
  )
}
