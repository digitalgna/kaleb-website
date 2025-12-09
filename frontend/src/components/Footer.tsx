'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdmin = () => {
      const token = localStorage.getItem('admin_token')
      setIsAdmin(!!token)
    }
    
    checkAdmin()
    
    // Listen for storage changes (when user logs in/out)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin_token') {
        checkAdmin()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // Also listen for custom event (for same-tab updates)
    const handleCustomStorage = () => checkAdmin()
    window.addEventListener('admin-login', handleCustomStorage)
    window.addEventListener('admin-logout', handleCustomStorage)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('admin-login', handleCustomStorage)
      window.removeEventListener('admin-logout', handleCustomStorage)
    }
  }, [])

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ]

  const footerLinks = {
    company: [
      { href: '/about', label: 'About Us' },
      { href: '/tours', label: 'Our Tours' },
      { href: '/testimonials', label: 'Reviews' },
      { href: '/contact', label: 'Contact' },
    ],
    support: [
      { href: '/faq', label: 'FAQ' },
      { href: '/terms', label: 'Terms & Conditions' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/cancellation', label: 'Cancellation Policy' },
    ],
  }

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300 section-padding border-t border-primary-500/20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold font-display gradient-text mb-4">
              YEHA Tours
            </h3>
            <p className="mb-4 text-gray-400">
              Premium small group and private tours of Niagara Falls. Experience the majesty with expert guide Kaleb.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center hover:from-primary-500 hover:to-ocean-500 transition-all duration-300 shadow-lg hover:shadow-primary-500/50"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-400 hover:translate-x-1 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-400 hover:translate-x-1 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 group">
                <Phone className="w-5 h-5 mt-1 text-primary-400 group-hover:text-primary-300 transition-colors" />
                <span className="group-hover:text-primary-300 transition-colors">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <Mail className="w-5 h-5 mt-1 text-purple-400 group-hover:text-purple-300 transition-colors" />
                <span className="group-hover:text-purple-300 transition-colors">info@yehatours.com</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 mt-1 text-ocean-400 group-hover:text-ocean-300 transition-colors" />
                <span className="group-hover:text-ocean-300 transition-colors">Niagara Falls, ON, Canada</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} YEHA Niagara Falls Tours. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

