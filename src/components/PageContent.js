'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import MarqueeTicker from '@/components/MarqueeTicker'
import Services from '@/components/Services'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Testimonials from '@/components/Testimonials'
import SocialFollow from '@/components/SocialFollow'
import CTABanner from '@/components/CTABanner'
import Footer from '@/components/Footer'

const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false })

export default function PageContent() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <SmoothScrollProvider>
        <Navbar />
        <main style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease 0.1s' }}>
          {/* Every section needs an id for IntersectionObserver + nav scroll */}
          <div id="hero"><Hero /></div>
          <MarqueeTicker />
          <div id="services"><Services /></div>
          <div id="about"><About /></div>
          <div id="projects"><Projects /></div>
          <div id="testimonials"><Testimonials /></div>
          <div id="social"><SocialFollow /></div>
          <div id="contact"><CTABanner /></div>
        </main>
        <div id="footer"><Footer /></div>
      </SmoothScrollProvider>
    </>
  )
}
