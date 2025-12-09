'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { Save, Loader2, CheckCircle2, AlertCircle, Palette } from 'lucide-react'

export default function CMSColorsPage() {
  const [colors, setColors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    loadColors()
  }, [])

  const loadColors = async () => {
    try {
      setLoading(true)
      const data = await api.getCMSColors()
      // API returns array, convert to object
      const colorsObj: Record<string, string> = {}
      if (Array.isArray(data)) {
        data.forEach((item: any) => {
          colorsObj[item.color_name] = item.color_value
        })
      } else if (data && typeof data === 'object') {
        // If already an object, use it directly
        Object.assign(colorsObj, data)
      }
      setColors(colorsObj)
    } catch (error: any) {
      console.error('Failed to load colors:', error)
      setMessage({ type: 'error', text: error.message || 'Failed to load colors' })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setMessage(null)
      await api.updateCMSColors(colors)
      setMessage({ type: 'success', text: 'Colors saved successfully!' })
      setTimeout(() => setMessage(null), 3000)
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setSaving(false)
    }
  }

  const colorCategories = [
    {
      title: 'Primary Colors',
      keys: ['primary', 'primary-dark'],
    },
    {
      title: 'Accent Colors',
      keys: ['accent', 'accent-dark', 'gold'],
    },
    {
      title: 'Secondary Colors',
      keys: ['purple', 'purple-dark', 'ocean', 'ocean-dark', 'emerald'],
    },
    {
      title: 'Background Colors',
      keys: ['background-light', 'background-dark'],
    },
    {
      title: 'Text Colors',
      keys: ['text-light', 'text-dark'],
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 bg-clip-text text-transparent flex items-center space-x-2">
            <Palette className="w-8 h-8" />
            <span>Theme Colors</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Customize your website's color scheme</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 via-purple-500 to-accent-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Save Colors</span>
            </>
          )}
        </motion.button>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg flex items-center space-x-2 ${
            message.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{message.text}</span>
        </motion.div>
      )}

      <div className="grid gap-6">
        {colorCategories.map((category) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700"
          >
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              {category.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.keys.map((key) => (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {key.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={colors[key] || '#000000'}
                      onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                      className="w-16 h-12 rounded-lg border-2 border-gray-300 dark:border-slate-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={colors[key] || ''}
                      onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 font-mono text-sm"
                      placeholder="#000000"
                    />
                  </div>
                  <div
                    className="w-full h-8 rounded-lg border border-gray-200 dark:border-slate-600"
                    style={{ backgroundColor: colors[key] || '#000000' }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

