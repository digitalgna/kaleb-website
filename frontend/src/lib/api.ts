const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://yehaniagara.magersoftware.com/api'

// Type for admin request options that allows objects in body
type AdminRequestOptions = Omit<RequestInit, 'body'> & {
  body?: BodyInit | object | null
}

export const api = {
  // Tours
  getTours: async () => {
    const res = await fetch(`${API_URL}/tours`)
    if (!res.ok) throw new Error('Failed to fetch tours')
    return res.json()
  },

  getTourById: async (id: string) => {
    const res = await fetch(`${API_URL}/tours/${id}`)
    if (!res.ok) throw new Error('Failed to fetch tour')
    return res.json()
  },

  getTourBySlug: async (slug: string) => {
    const res = await fetch(`${API_URL}/tours/slug/${slug}`)
    if (!res.ok) throw new Error('Failed to fetch tour')
    return res.json()
  },

  // Bookings
  createBooking: async (data: any) => {
    const res = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Failed to create booking')
    }
    return res.json()
  },

  // Testimonials
  getTestimonials: async () => {
    const res = await fetch(`${API_URL}/testimonials`)
    if (!res.ok) throw new Error('Failed to fetch testimonials')
    return res.json()
  },

  createTestimonial: async (data: any) => {
    const res = await fetch(`${API_URL}/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Failed to submit testimonial')
    }
    return res.json()
  },

  // Contact
  createContact: async (data: any) => {
    const res = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Failed to send message')
    }
    return res.json()
  },

  // Admin
  adminLogin: async (username: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) {
        const error = await res.json().catch(() => ({ error: `HTTP ${res.status}: ${res.statusText}` }))
        throw new Error(error.error || 'Login failed')
      }
      return res.json()
    } catch (error: any) {
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        const isProduction = API_URL.includes('yehaniagara.magersoftware.com') || API_URL.includes('vercel.app')
        if (isProduction) {
          throw new Error(`Cannot connect to backend API at ${API_URL}. Please check your backend server is running and CORS is configured.`)
        } else {
          throw new Error(`Cannot connect to backend server. Make sure it's running on ${API_URL.replace('/api', '')}. Run: npm run server`)
        }
      }
      throw error
    }
  },

  // Admin authenticated requests
  adminRequest: async (endpoint: string, options: AdminRequestOptions = {}) => {
    const token = localStorage.getItem('admin_token')
    const { body, ...restOptions } = options
    
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        ...restOptions,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
        body: typeof body === 'string' ? body : body ? JSON.stringify(body) : undefined,
      })
      
      if (!res.ok) {
        const error = await res.json().catch(() => ({ error: `HTTP ${res.status}: ${res.statusText}` }))
        throw new Error(error.error || 'Request failed')
      }
      return res.json()
    } catch (error: any) {
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        const isProduction = API_URL.includes('yehaniagara.magersoftware.com') || API_URL.includes('vercel.app')
        if (isProduction) {
          throw new Error(`Cannot connect to backend API at ${API_URL}. Please check your backend server is running and CORS is configured.`)
        } else {
          throw new Error(`Cannot connect to backend server. Make sure it's running on ${API_URL.replace('/api', '')}`)
        }
      }
      throw error
    }
  },

  // CMS - Public (for frontend)
  getCMSSettings: async () => {
    const res = await fetch(`${API_URL}/cms/settings`)
    if (!res.ok) throw new Error('Failed to fetch CMS settings')
    return res.json()
  },

  getCMSContent: async (section?: string, page?: string) => {
    const params = new URLSearchParams()
    if (section) params.append('section', section)
    if (page) params.append('page', page)
    const res = await fetch(`${API_URL}/cms/content?${params}`)
    if (!res.ok) throw new Error('Failed to fetch CMS content')
    return res.json()
  },

  getCMSColors: async () => {
    const res = await fetch(`${API_URL}/cms/colors`)
    if (!res.ok) throw new Error('Failed to fetch CMS colors')
    return res.json()
  },

  getCMSFeatures: async () => {
    const res = await fetch(`${API_URL}/cms/features`)
    if (!res.ok) throw new Error('Failed to fetch CMS features')
    return res.json()
  },

  getCMSHero: async () => {
    const res = await fetch(`${API_URL}/cms/hero`)
    if (!res.ok) throw new Error('Failed to fetch hero settings')
    return res.json()
  },

  getAllCMSData: async () => {
    const res = await fetch(`${API_URL}/cms/all`)
    if (!res.ok) throw new Error('Failed to fetch CMS data')
    return res.json()
  },

  // CMS - Admin
  updateCMSSetting: async (key: string, value: any, type?: string, category?: string) => {
    return api.adminRequest(`/cms/settings/${key}`, {
      method: 'PUT',
      body: { value, type, category },
    })
  },

  updateCMSSettings: async (settings: Record<string, any>) => {
    return api.adminRequest('/cms/settings', {
      method: 'PUT',
      body: settings,
    })
  },

  updateCMSContent: async (key: string, value: string, type?: string, section?: string, page?: string) => {
    return api.adminRequest(`/cms/content/${key}`, {
      method: 'PUT',
      body: { value, type, section, page },
    })
  },

  updateCMSContentMultiple: async (content: Record<string, string>) => {
    return api.adminRequest('/cms/content', {
      method: 'PUT',
      body: content,
    })
  },

  updateCMSColor: async (name: string, value: string, category?: string) => {
    return api.adminRequest(`/cms/colors/${name}`, {
      method: 'PUT',
      body: { value, category },
    })
  },

  updateCMSColors: async (colors: Record<string, string>) => {
    return api.adminRequest('/cms/colors', {
      method: 'PUT',
      body: colors,
    })
  },

  updateCMSFeature: async (key: string, enabled: boolean, config?: any) => {
    return api.adminRequest(`/cms/features/${key}`, {
      method: 'PUT',
      body: { enabled, config },
    })
  },

  updateCMSHero: async (heroData: any) => {
    return api.adminRequest('/cms/hero', {
      method: 'PUT',
      body: heroData,
    })
  },

  getMedia: async (category?: string, type?: string) => {
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    if (type) params.append('type', type)
    return api.adminRequest(`/cms/media?${params}`)
  },

  uploadMedia: async (file: File, altText?: string, description?: string, category?: string) => {
    const formData = new FormData()
    formData.append('file', file)
    if (altText) formData.append('alt_text', altText)
    if (description) formData.append('description', description)
    if (category) formData.append('category', category)

    const token = localStorage.getItem('admin_token')
    const res = await fetch(`${API_URL}/cms/media/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: 'Upload failed' }))
      throw new Error(error.error || 'Upload failed')
    }
    return res.json()
  },

  deleteMedia: async (id: number) => {
    return api.adminRequest(`/cms/media/${id}`, {
      method: 'DELETE',
    })
  },
}

