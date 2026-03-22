import './globals.css'
import CustomCursor from '@/components/CustomCursor'

export const metadata = {
  icon: '/apple-touch-icon.png',
  title: 'Avenyou — Creative Developer Studio',
  description: 'We build beautiful, functional digital experiences. Web development, mobile apps, and more.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
