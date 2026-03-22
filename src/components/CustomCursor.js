'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const blobRef = useRef(null)
  const dotRef = useRef(null)
  const mousePos = useRef({ x: -200, y: -200 })
  const blobPos = useRef({ x: -200, y: -200 })
  const rafId = useRef(null)

  const lerp = (a, b, n) => a + (b - a) * n

  useEffect(() => {
    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const onMouseDown = () => {
      if (blobRef.current) {
        blobRef.current.style.width = '56px'
        blobRef.current.style.height = '56px'
        blobRef.current.style.background = 'rgba(107,47,219,0.3)'
      }
    }
    const onMouseUp = () => {
      if (blobRef.current) {
        blobRef.current.style.width = '40px'
        blobRef.current.style.height = '40px'
        blobRef.current.style.background = 'rgba(107,47,219,0.18)'
      }
    }

    // Grow blob over links + buttons
    const onLinkEnter = () => {
      if (blobRef.current) {
        blobRef.current.style.width = '64px'
        blobRef.current.style.height = '64px'
        blobRef.current.style.background = 'rgba(107,47,219,0.22)'
        blobRef.current.style.mixBlendMode = 'multiply'
      }
    }
    const onLinkLeave = () => {
      if (blobRef.current) {
        blobRef.current.style.width = '40px'
        blobRef.current.style.height = '40px'
        blobRef.current.style.background = 'rgba(107,47,219,0.18)'
        blobRef.current.style.mixBlendMode = 'normal'
      }
    }

    const attachLinkListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', onLinkEnter)
        el.addEventListener('mouseleave', onLinkLeave)
      })
    }

    // Re-attach on DOM changes (Next.js navigations)
    const observer = new MutationObserver(attachLinkListeners)
    observer.observe(document.body, { childList: true, subtree: true })
    attachLinkListeners()

    // rAF loop — blob lags behind cursor
    const animate = () => {
      blobPos.current.x = lerp(blobPos.current.x, mousePos.current.x, 0.1)
      blobPos.current.y = lerp(blobPos.current.y, mousePos.current.y, 0.1)
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${blobPos.current.x - 20}px, ${blobPos.current.y - 20}px)`
      }
      rafId.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      observer.disconnect()
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      {/* Lagging orb */}
      <div
        ref={blobRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'rgba(107,47,219,0.18)',
          border: '1.5px solid rgba(107,47,219,0.45)',
          backdropFilter: 'blur(2px)',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'width 0.2s, height 0.2s, background 0.2s, mix-blend-mode 0.2s',
        }}
      />
      {/* Sharp dot — snaps to cursor */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--purple, #6B2FDB)',
          pointerEvents: 'none',
          zIndex: 100000,
          willChange: 'transform',
        }}
      />
      <style>{`
        * { cursor: none !important; }
        @media (hover: none) {
          * { cursor: auto !important; }
        }
      `}</style>
    </>
  )
}
