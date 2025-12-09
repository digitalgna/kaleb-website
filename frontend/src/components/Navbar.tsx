'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, Lock } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if user is already logged in as admin
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

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tours', label: 'Tours' },
    { href: '/about', label: 'About' },
    { href: '/testimonials', label: 'Reviews' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-white/95 via-primary-50/95 to-ocean-50/95 dark:from-slate-900/95 dark:via-slate-800/95 dark:to-slate-900/95 backdrop-blur-md shadow-xl border-b border-primary-200/50 dark:border-primary-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold font-display bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 bg-clip-text text-transparent hover:from-primary-700 hover:via-purple-700 hover:to-accent-700 transition-all duration-300"
            >
              YEHA Tours
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => {
              const colors = [
                'from-primary-500 to-ocean-500',
                'from-purple-500 to-pink-500',
                'from-ocean-500 to-emerald-500',
                'from-accent-500 to-orange-500',
                'from-emerald-500 to-primary-500',
              ]
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 group hover:text-transparent bg-clip-text bg-gradient-to-r hover:from-primary-600 hover:to-ocean-600"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r ${colors[index % colors.length]} group-hover:w-full transition-all duration-300`}></span>
                </Link>
              )
            })}
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gradient-to-br from-primary-100 to-ocean-100 dark:from-slate-800 dark:to-slate-700 hover:from-primary-200 hover:to-ocean-200 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </motion.button>
            )}
            <Link href={isAdmin ? "/admin/dashboard" : "/admin/login"}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-700 transition-all duration-300 shadow-sm hover:shadow-md"
                title={isAdmin ? "Admin Dashboard" : "Staff Portal"}
              >
                <Lock className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </motion.button>
            </Link>
            <Link href="/book">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 hover:from-primary-700 hover:via-purple-700 hover:to-accent-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Book Now</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {mounted && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-slate-800 dark:to-slate-700 hover:from-purple-200 hover:to-pink-200 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </motion.button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-gradient-to-br from-accent-100 to-orange-100 dark:from-slate-800 dark:to-slate-700 hover:from-accent-200 hover:to-orange-200 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gradient-to-b from-white via-primary-50/50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-t-2 border-primary-300/50 dark:border-primary-700/50 shadow-xl"
          >
            <div className="container-custom py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r hover:from-primary-600 hover:to-ocean-600 font-medium py-2 transition-all duration-300 hover:translate-x-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link href={isAdmin ? "/admin/dashboard" : "/admin/login"} onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-700 text-slate-700 dark:text-slate-300 font-medium py-2 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 mb-4 border border-slate-300 dark:border-slate-600">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm">{isAdmin ? 'Dashboard' : 'Staff Portal'}</span>
                </button>
              </Link>
              <Link href="/book" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 hover:from-primary-700 hover:via-purple-700 hover:to-accent-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl">
                  Book Now
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

