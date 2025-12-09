'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import TourPackages from '@/components/TourPackages'
import TestimonialsSection from '@/components/TestimonialsSection'
import GallerySection from '@/components/GallerySection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <AboutSection />
      <TourPackages />
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
    </div>
  )
}

