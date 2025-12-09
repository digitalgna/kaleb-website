'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Check, Trash2 } from 'lucide-react'
import { api } from '@/lib/api'

export default function AdminContacts() {
  const [contacts, setContacts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const data = await api.adminRequest('/contact')
      setContacts(data)
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkReplied = async (id: number) => {
    try {
      await api.adminRequest(`/contact/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ replied: true }),
      })
      fetchContacts()
    } catch (error) {
      console.error('Failed to mark as replied:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this contact?')) return

    try {
      await api.adminRequest(`/contact/${id}`, { method: 'DELETE' })
      fetchContacts()
    } catch (error) {
      console.error('Failed to delete contact:', error)
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
          Contact Messages
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Manage customer inquiries and messages</p>
      </motion.div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gradient-to-br from-white via-ocean-50/30 to-primary-50/30 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-2xl p-6 shadow-xl border ${
                !contact.replied ? 'border-2 border-primary-400 shadow-primary-200/50' : 'border-primary-200/50 dark:border-primary-800/50'
              } hover:shadow-2xl transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {contact.name}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4 text-purple-500" />
                      <span className="text-gray-700 dark:text-gray-300">{contact.email}</span>
                    </div>
                    {contact.phone && (
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4 text-primary-500" />
                        <span className="text-gray-700 dark:text-gray-300">{contact.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(contact.created_at).toLocaleDateString()}
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">{contact.message}</p>

              <div className="flex items-center space-x-2 pt-4 border-t border-gray-200 dark:border-slate-700">
                {!contact.replied && (
                  <button
                    onClick={() => handleMarkReplied(contact.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-ocean-500 hover:from-primary-600 hover:to-ocean-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <Check className="w-4 h-4" />
                    <span>Mark as Replied</span>
                  </button>
                )}
                {contact.replied && (
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-teal-400 text-white text-sm font-semibold rounded-full shadow-md">
                    Replied
                  </span>
                )}
                <button
                  onClick={() => handleDelete(contact.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-105"
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

