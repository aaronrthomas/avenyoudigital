'use client'

const items = [
  'UI/UX Designing', 'Branding', 'Marketing', 'Social Marketing',
  'Video Editing', 'Content Writing', 'Web Development', 'creative studio',
]

export default function MarqueeTicker() {
  return (
    <div style={{
      padding: '1rem 0',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'var(--white)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{
        display: 'flex',
        width: 'max-content',
        animation: 'marquee-scroll 18s linear infinite',
      }}>
        {[...items, ...items].map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '1.25rem',
            padding: '0 2rem',
            whiteSpace: 'nowrap',
          }}>
            <span style={{
              fontFamily: 'Montserrat',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.12em',
              color: 'var(--navy)',
              textTransform: 'uppercase',
            }}>
              {item}
            </span>
            {/* Sparkle separator */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" fill="var(--navy)" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}
