'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Clock, Users, MapPin, Check, Calendar } from 'lucide-react'
import { api } from '@/lib/api'
import BookingForm from '@/components/BookingForm'

export default function TourDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [tour, setTour] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const data = await api.getTourBySlug(slug)
        setTour(data)
      } catch (error) {
        console.error('Failed to fetch tour:', error)
      } finally {
        setLoading(false)
      }
    }
    if (slug) {
      fetchTour()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tour not found</h1>
          <a href="/tours" className="text-primary-600 hover:underline">
            View all tours
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-cyan-600">
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 container-custom text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold font-display mb-4"
          >
            {tour.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            {tour.short_description || tour.description}
          </motion.p>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Overview</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {tour.description}
              </p>
            </motion.section>

            {/* Highlights */}
            {tour.highlights && Array.isArray(tour.highlights) && tour.highlights.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Highlights</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {tour.highlights.map((highlight: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Itinerary */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Itinerary</h2>
                <div className="space-y-6">
                  {tour.itinerary.map((item: any, index: number) => (
                    <div key={item.id} className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center font-bold text-primary-600 dark:text-primary-400">
                          {item.step_number}
                        </div>
                      </div>
                      <div className="flex-1 pb-6 border-b border-gray-200 dark:border-slate-700 last:border-0 last:pb-0">
                        {item.step_title && (
                          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                            {item.step_title}
                          </h3>
                        )}
                        <p className="text-gray-600 dark:text-gray-300">{item.step_text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Add-ons */}
            {tour.addons && tour.addons.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Add-ons</h2>
                <div className="space-y-4">
                  {tour.addons.map((addon: any) => (
                    <div
                      key={addon.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{addon.name}</h4>
                        {addon.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-300">{addon.description}</p>
                        )}
                      </div>
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        ${addon.price}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl"
            >
              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  ${tour.price}
                  <span className="text-lg text-gray-500 dark:text-gray-400">/person</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{tour.group_size}</span>
                  </div>
                </div>
              </div>

              <BookingForm tourId={tour.id} tourPrice={tour.price} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

