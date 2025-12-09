'use client'

import { useEffect } from 'react'
import { useCMS } from '@/contexts/CMSContext'

export default function CMSColorVariables() {
  const { colors } = useCMS()

  useEffect(() => {
    if (typeof document !== 'undefined' && colors) {
      const root = document.documentElement
      
      // Apply CMS colors as CSS variables
      Object.entries(colors).forEach(([name, value]) => {
        const cssVarName = `--color-${name.replace(/-/g, '-')}`
        root.style.setProperty(cssVarName, value as string)
      })
    }
  }, [colors])

  return null
}

