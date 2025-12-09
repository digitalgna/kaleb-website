'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, DollarSign, MessageSquare } from 'lucide-react'
import { api } from '@/lib/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    bookings: 0,
    tours: 0,
    revenue: 0,
    messages: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all data to calculate stats
        const [bookings, tours, contacts] = await Promise.all([
          api.adminRequest('/bookings').catch(() => []),
          api.adminRequest('/tours').catch(() => []),
          api.adminRequest('/contact').catch(() => []),
        ])

        const totalRevenue = bookings.reduce((sum: number, b: any) => {
          return sum + (parseFloat(b.total_price) || 0)
        }, 0)

        setStats({
          bookings: bookings.length,
          tours: tours.length,
          revenue: totalRevenue,
          messages: contacts.length,
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Total Bookings',
      value: stats.bookings,
      icon: Calendar,
      gradient: 'from-primary-500 to-ocean-500',
      bgGradient: 'from-primary-50 to-ocean-50',
      darkBg: 'dark:from-primary-900/20 dark:to-ocean-900/20',
    },
    {
      title: 'Active Tours',
      value: stats.tours,
      icon: Users,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      darkBg: 'dark:from-emerald-900/20 dark:to-teal-900/20',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.revenue.toFixed(2)}`,
      icon: DollarSign,
      gradient: 'from-gold-500 to-accent-500',
      bgGradient: 'from-gold-50 to-accent-50',
      darkBg: 'dark:from-gold-900/20 dark:to-accent-900/20',
    },
    {
      title: 'Messages',
      value: stats.messages,
      icon: MessageSquare,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      darkBg: 'dark:from-purple-900/20 dark:to-pink-900/20',
    },
  ]

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="mb-2">
          <h1 className="text-4xl font-bold font-display bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Welcome back! Here's your overview</p>
        </div>
      </motion.div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${stat.bgGradient} ${stat.darkBg} dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-white/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`bg-gradient-to-br ${stat.gradient} p-4 rounded-xl shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

