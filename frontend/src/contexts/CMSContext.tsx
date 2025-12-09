'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { api } from '@/lib/api'

interface CMSData {
  settings: Record<string, any>
  content: Record<string, string>
  colors: Record<string, string>
  features: any[]
  hero: any
  sections: any[]
  loading: boolean
  error: string | null
}

const CMSContext = createContext<CMSData>({
  settings: {},
  content: {},
  colors: {},
  features: [],
  hero: null,
  sections: [],
  loading: true,
  error: null,
})

export function CMSProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CMSData>({
    settings: {},
    content: {},
    colors: {},
    features: [],
    hero: null,
    sections: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    loadCMSData()
  }, [])

  const loadCMSData = async () => {
    try {
      const cmsData = await api.getAllCMSData()
      setData({
        settings: cmsData.settings || {},
        content: cmsData.content || {},
        colors: cmsData.colors || {},
        features: cmsData.features || [],
        hero: cmsData.hero || null,
        sections: cmsData.sections || [],
        loading: false,
        error: null,
      })
    } catch (error: any) {
      console.error('Failed to load CMS data:', error)
      // Don't set error state - just use empty defaults so site still works
      setData({
        settings: {},
        content: {},
        colors: {},
        features: [],
        hero: null,
        sections: [],
        loading: false,
        error: null, // Don't block site if CMS fails
      })
    }
  }

  return <CMSContext.Provider value={data}>{children}</CMSContext.Provider>
}

export function useCMS() {
  return useContext(CMSContext)
}

