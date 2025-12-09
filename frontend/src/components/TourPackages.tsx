'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowRight, Users, Clock, Star } from 'lucide-react'
import { api } from '@/lib/api'
import { useCMS } from '@/contexts/CMSContext'
import TourCard from './TourCard'

export default function TourPackages() {
  const [tours, setTours] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { content } = useCMS()

  const toursTitle = (content && content['tours_title']) || 'Our Tour Packages'
  const toursSubtitle = (content && content['tours_subtitle']) || 'Choose the perfect tour experience for your Niagara Falls adventure'

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await api.getTours()
        setTours(data)
      } catch (error) {
        console.error('Failed to fetch tours:', error)
        // Fallback to default tours if API fails
        setTours([
          {
            id: 1,
            title: 'Ultra Small Niagara Tour',
            slug: 'ultra-small-niagara-tour',
            short_description: 'Intimate small group tour with expert guide Kaleb',
            price: 150,
            duration: '4-5 hours',
            group_size: '2-6 guests',
            images: ['/images/tours/ultra-small.jpg'],
            highlights: ['Expert guide Kaleb', 'Small group (2-6 guests)', 'Luxury comfort vehicle'],
          },
          {
            id: 2,
            title: 'Private Premium Tour',
            slug: 'private-premium-tour',
            short_description: 'Ultimate luxury private tour with complete flexibility',
            price: 750,
            duration: '6-8 hours',
            group_size: 'Private (1-8 guests)',
            images: ['/images/tours/private.jpg'],
            highlights: ['Fully private experience', 'Luxury vehicle', 'Customizable itinerary'],
          },
          {
            id: 3,
            title: 'Small Group Day Tour',
            slug: 'small-group-day-tour',
            short_description: 'Energetic small group day tour with multiple stops',
            price: 150,
            duration: '5-6 hours',
            group_size: '4-8 guests',
            images: ['/images/tours/group.jpg'],
            highlights: ['Small group (4-8 guests)', 'AC vehicle', 'Multiple stops'],
          },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchTours()
  }, [])

  return (
    <section ref={ref} className="section-padding bg-gradient-to-b from-primary-50 via-ocean-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-gray-900 dark:text-white">
            {toursTitle.split(' ').map((word, i) => 
              word.toLowerCase().includes('tour') || word.toLowerCase().includes('packages') ? (
                <span key={i} className="gradient-text">{word} </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {toursSubtitle}
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <TourCard tour={tour} index={index} />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-12"
        >
          <Link href="/tours">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-accent-500 hover:from-purple-600 hover:to-accent-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View All Tours
              <ArrowRight className="w-5 h-5 inline-block ml-2" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

