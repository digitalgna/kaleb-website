'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Trash2, Check, X } from 'lucide-react'
import { api } from '@/lib/api'

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const data = await api.adminRequest('/testimonials?approved=')
      setTestimonials(data)
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: number) => {
    try {
      await api.adminRequest(`/testimonials/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ approved: true }),
      })
      fetchTestimonials()
    } catch (error) {
      console.error('Failed to approve testimonial:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      await api.adminRequest(`/testimonials/${id}`, { method: 'DELETE' })
      fetchTestimonials()
    } catch (error) {
      console.error('Failed to delete testimonial:', error)
    }
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold font-display bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 bg-clip-text text-transparent mb-2">
          Testimonials Management
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Manage guest reviews and testimonials</p>
      </motion.div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-2xl p-6 shadow-xl border ${
                !testimonial.approved ? 'border-2 border-yellow-400 shadow-yellow-200/50' : 'border-primary-200/50 dark:border-primary-800/50'
              } hover:shadow-2xl transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                {!testimonial.approved && (
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-semibold rounded-full shadow-md">
                    Pending
                  </span>
                )}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                "{testimonial.comment}"
              </p>

              <div className="mb-4">
                <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                {testimonial.location && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                )}
              </div>

              <div className="flex items-center space-x-2 pt-4 border-t border-gray-200 dark:border-slate-700">
                {!testimonial.approved && (
                  <button
                    onClick={() => handleApprove(testimonial.id)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                )}
                <button
                  onClick={() => handleDelete(testimonial.id)}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

