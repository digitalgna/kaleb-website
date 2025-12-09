'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Plus, X } from 'lucide-react'
import { api } from '@/lib/api'
import Link from 'next/link'

export default function TourEditPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const isNew = id === 'new'

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    short_description: '',
    price: '',
    duration: '',
    group_size: '',
    images: [] as string[],
    highlights: [] as string[],
  })

  const [itinerary, setItinerary] = useState([
    { step_number: 1, step_title: '', step_text: '' },
  ])

  const [addons, setAddons] = useState([
    { name: '', description: '', price: '' },
  ])

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!isNew) {
      fetchTour()
    }
  }, [id])

  const fetchTour = async () => {
    try {
      setLoading(true)
      const tour = await api.adminRequest(`/tours/${id}`)
      setFormData({
        title: tour.title || '',
        slug: tour.slug || '',
        description: tour.description || '',
        short_description: tour.short_description || '',
        price: tour.price?.toString() || '',
        duration: tour.duration || '',
        group_size: tour.group_size || '',
        images: Array.isArray(tour.images) ? tour.images : [],
        highlights: Array.isArray(tour.highlights) ? tour.highlights : [],
      })
      if (tour.itinerary) setItinerary(tour.itinerary)
      if (tour.addons) setAddons(tour.addons)
    } catch (error) {
      console.error('Failed to fetch tour:', error)
      alert('Failed to load tour')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const tourData = {
        ...formData,
        price: parseFloat(formData.price),
        images: formData.images,
        highlights: formData.highlights,
        itinerary: itinerary
          .filter((item) => item.step_title || item.step_text)
          .map((item, index) => ({
            ...item,
            step_number: index + 1,
          })),
        addons: addons
          .filter((item) => item.name && item.price)
          .map((item) => ({
            ...item,
            price: parseFloat(item.price),
          })),
      }

      if (isNew) {
        await api.adminRequest('/tours', {
          method: 'POST',
          body: tourData,
        })
      } else {
        await api.adminRequest(`/tours/${id}`, {
          method: 'PUT',
          body: tourData,
        })
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/admin/tours')
      }, 1500)
    } catch (error: any) {
      console.error('Failed to save tour:', error)
      alert(error.message || 'Failed to save tour')
    } finally {
      setSaving(false)
    }
  }

  const addItineraryItem = () => {
    setItinerary([...itinerary, { step_number: itinerary.length + 1, step_title: '', step_text: '' }])
  }

  const removeItineraryItem = (index: number) => {
    setItinerary(itinerary.filter((_, i) => i !== index))
  }

  const addAddon = () => {
    setAddons([...addons, { name: '', description: '', price: '' }])
  }

  const removeAddon = (index: number) => {
    setAddons(addons.filter((_, i) => i !== index))
  }

  const addHighlight = () => {
    setFormData({ ...formData, highlights: [...formData.highlights, ''] })
  }

  const removeHighlight = (index: number) => {
    setFormData({ ...formData, highlights: formData.highlights.filter((_, i) => i !== index) })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/admin/tours">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-gradient-to-br from-primary-100 to-ocean-100 dark:from-slate-700 dark:to-slate-600 hover:from-primary-200 hover:to-ocean-200 transition-all shadow-md"
            >
              <ArrowLeft className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </motion.button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold font-display bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 bg-clip-text text-transparent">
              {isNew ? 'Create New Tour' : 'Edit Tour'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {isNew ? 'Add a new tour package' : 'Update tour details'}
            </p>
          </div>
        </div>
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg shadow-lg"
        >
          <p className="font-semibold">✓ Tour saved successfully! Redirecting...</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-gradient-to-br from-white via-primary-50/30 to-ocean-50/30 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-2xl shadow-xl p-8 border border-primary-200/50 dark:border-primary-800/50">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Basic Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tour Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => {
                  const title = e.target.value
                  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                  setFormData({ ...formData, title, slug })
                }}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 4-5 hours"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Group Size
              </label>
              <input
                type="text"
                value={formData.group_size}
                onChange={(e) => setFormData({ ...formData, group_size: e.target.value })}
                placeholder="e.g., 2-6 guests"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Short Description
            </label>
            <input
              type="text"
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Description
            </label>
            <textarea
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none"
            />
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-2xl shadow-xl p-8 border border-purple-200/50 dark:border-purple-800/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Highlights</h2>
            <button
              type="button"
              onClick={addHighlight}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Highlight</span>
            </button>
          </div>
          <div className="space-y-3">
            {formData.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => {
                    const newHighlights = [...formData.highlights]
                    newHighlights[index] = e.target.value
                    setFormData({ ...formData, highlights: newHighlights })
                  }}
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary */}
        <div className="bg-gradient-to-br from-white via-ocean-50/30 to-emerald-50/30 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-2xl shadow-xl p-8 border border-ocean-200/50 dark:border-ocean-800/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Itinerary</h2>
            <button
              type="button"
              onClick={addItineraryItem}
              className="px-4 py-2 bg-gradient-to-r from-ocean-500 to-emerald-500 hover:from-ocean-600 hover:to-emerald-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Step</span>
            </button>
          </div>
          <div className="space-y-4">
            {itinerary.map((item, index) => (
              <div key={index} className="p-4 bg-white dark:bg-slate-700 rounded-lg border border-ocean-200 dark:border-ocean-800">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-semibold text-ocean-600 dark:text-ocean-400">
                    Step {index + 1}
                  </span>
                  {itinerary.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItineraryItem(index)}
                      className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={item.step_title}
                  onChange={(e) => {
                    const newItinerary = [...itinerary]
                    newItinerary[index].step_title = e.target.value
                    setItinerary(newItinerary)
                  }}
                  placeholder="Step title"
                  className="w-full mb-2 px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500 transition-all"
                />
                <textarea
                  rows={2}
                  value={item.step_text}
                  onChange={(e) => {
                    const newItinerary = [...itinerary]
                    newItinerary[index].step_text = e.target.value
                    setItinerary(newItinerary)
                  }}
                  placeholder="Step description"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500 transition-all resize-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div className="bg-gradient-to-br from-white via-accent-50/30 to-orange-50/30 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-2xl shadow-xl p-8 border border-accent-200/50 dark:border-accent-800/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add-ons</h2>
            <button
              type="button"
              onClick={addAddon}
              className="px-4 py-2 bg-gradient-to-r from-accent-500 to-orange-500 hover:from-accent-600 hover:to-orange-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Add-on</span>
            </button>
          </div>
          <div className="space-y-4">
            {addons.map((addon, index) => (
              <div key={index} className="p-4 bg-white dark:bg-slate-700 rounded-lg border border-accent-200 dark:border-accent-800">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-semibold text-accent-600 dark:text-accent-400">
                    Add-on {index + 1}
                  </span>
                  {addons.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAddon(index)}
                      className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    value={addon.name}
                    onChange={(e) => {
                      const newAddons = [...addons]
                      newAddons[index].name = e.target.value
                      setAddons(newAddons)
                    }}
                    placeholder="Add-on name"
                    className="px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all"
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={addon.price}
                    onChange={(e) => {
                      const newAddons = [...addons]
                      newAddons[index].price = e.target.value
                      setAddons(newAddons)
                    }}
                    placeholder="Price ($)"
                    className="px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all"
                  />
                </div>
                <textarea
                  rows={2}
                  value={addon.description}
                  onChange={(e) => {
                    const newAddons = [...addons]
                    newAddons[index].description = e.target.value
                    setAddons(newAddons)
                  }}
                  placeholder="Add-on description"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all resize-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4">
          <Link href="/admin/tours">
            <button
              type="button"
              className="px-6 py-3 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 rounded-lg transition-all font-semibold"
            >
              Cancel
            </button>
          </Link>
          <motion.button
            type="submit"
            disabled={saving}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 hover:from-primary-700 hover:via-purple-700 hover:to-accent-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-2xl flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>{isNew ? 'Create Tour' : 'Save Changes'}</span>
              </>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  )
}

