'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import BookingForm from '@/components/BookingForm'

export default function BookPage() {
  const [tours, setTours] = useState<any[]>([])
  const [selectedTour, setSelectedTour] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await api.getTours()
        setTours(data)
        if (data.length > 0) {
          setSelectedTour(data[0])
        }
      } catch (error) {
        console.error('Failed to fetch tours:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTours()
  }, [])

  return (
    <div className="pt-20">
      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 text-gray-900 dark:text-white">
              Book Your <span className="gradient-text">Tour</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Reserve your spot for an unforgettable Niagara Falls experience
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : selectedTour ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Select Tour
                </h2>
                <div className="space-y-4 mb-8">
                  {tours.map((tour) => (
                    <button
                      key={tour.id}
                      onClick={() => setSelectedTour(tour)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedTour.id === tour.id
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-slate-700 hover:border-primary-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {tour.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        ${tour.price}/person • {tour.duration}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Booking Details
                </h2>
                <BookingForm tourId={selectedTour.id} tourPrice={selectedTour.price} />
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-300">No tours available</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

