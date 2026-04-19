'use client'

// Lenis was locking overflow:hidden on html/body, making the page
// appear zero-scrollable in certain viewports. We now rely on native
// CSS scroll-behavior:smooth (set in globals.css) which works on all
// devices without any JS interference.
export default function SmoothScrollProvider({ children }) {
  return <>{children}</>
}
