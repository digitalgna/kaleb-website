'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote } from 'lucide-react'
import { api } from '@/lib/api'
import { useCMS } from '@/contexts/CMSContext'

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { content } = useCMS()

  const testimonialsTitle = (content && content['testimonials_title']) || 'What Our Guests Say'
  const testimonialsSubtitle = (content && content['testimonials_subtitle']) || 'Don\'t just take our word for it—hear from travelers who\'ve experienced the magic'

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await api.getTestimonials()
        setTestimonials(data.slice(0, 6)) // Show first 6
      } catch (error) {
        console.error('Failed to fetch testimonials:', error)
        // Fallback data
        setTestimonials([
          {
            id: 1,
            name: 'Sarah Johnson',
            rating: 5,
            comment: 'Absolutely incredible experience! Kaleb was an amazing guide who made our tour unforgettable.',
            location: 'Toronto, Canada',
          },
          {
            id: 2,
            name: 'Michael Chen',
            rating: 5,
            comment: 'The private premium tour was worth every penny. Complete flexibility and luxury vehicle.',
            location: 'New York, USA',
          },
          {
            id: 3,
            name: 'Emma Williams',
            rating: 5,
            comment: 'Perfect day tour! Small group was great for meeting people, and the guide was knowledgeable.',
            location: 'London, UK',
          },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  return (
    <section ref={ref} className="section-padding bg-gradient-to-b from-white via-purple-50 to-ocean-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-gray-900 dark:text-white">
            {testimonialsTitle.split(' ').map((word, i) => 
              word.toLowerCase().includes('guests') || word.toLowerCase().includes('say') ? (
                <span key={i} className="gradient-text">{word} </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {testimonialsSubtitle}
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-white to-primary-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-primary-100 dark:border-primary-800 relative overflow-hidden"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className={`w-16 h-16 ${
                    index % 3 === 0 ? 'text-primary-600' :
                    index % 3 === 1 ? 'text-purple-600' :
                    'text-ocean-600'
                  }`} />
                </div>

                {/* Stars */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                    >
                      <Star className="w-5 h-5 fill-gold-400 text-gold-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-700 dark:text-gray-300 mb-4 relative z-10 italic">
                  "{testimonial.comment}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    {testimonial.location && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.location}
                      </p>
                    )}
                  </div>
                </div>
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
          <a
            href="/testimonials"
            className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
          >
            Read More Reviews →
          </a>
        </motion.div>
      </div>
    </section>
  )
}

