'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Placeholder images - replace with actual tour images
  const images = [
    { id: 1, src: '/images/gallery/1.jpg', alt: 'Niagara Falls view' },
    { id: 2, src: '/images/gallery/2.jpg', alt: 'Tour group at falls' },
    { id: 3, src: '/images/gallery/3.jpg', alt: 'Maid of the Mist' },
    { id: 4, src: '/images/gallery/4.jpg', alt: 'Sunset at falls' },
    { id: 5, src: '/images/gallery/5.jpg', alt: 'Helicopter view' },
    { id: 6, src: '/images/gallery/6.jpg', alt: 'Tour vehicle' },
    { id: 7, src: '/images/gallery/7.jpg', alt: 'Group photo' },
    { id: 8, src: '/images/gallery/8.jpg', alt: 'Falls from above' },
    { id: 9, src: '/images/gallery/9.jpg', alt: 'Tour guide Kaleb' },
  ]

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length)
    }
  }

  return (
    <>
      <section ref={ref} className="section-padding bg-gradient-to-b from-emerald-50 via-primary-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-gray-900 dark:text-white">
              Our <span className="gradient-text">Gallery</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Capturing the beauty and excitement of every tour experience
            </p>
          </motion.div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  index % 4 === 0 ? 'bg-gradient-to-br from-primary-400 to-ocean-500' :
                  index % 4 === 1 ? 'bg-gradient-to-br from-purple-400 to-pink-500' :
                  index % 4 === 2 ? 'bg-gradient-to-br from-emerald-400 to-teal-500' :
                  'bg-gradient-to-br from-accent-400 to-orange-500'
                }`}>
                  <span className="text-white text-sm font-semibold">{image.alt}</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="text-white text-lg font-semibold"
                  >
                    View
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </motion.button>

            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-4 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft className="w-10 h-10" />
            </motion.button>

            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-4 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight className="w-10 h-10" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl max-h-[90vh] relative"
            >
              <div className="w-full h-full bg-gradient-to-br from-primary-400 to-cyan-500 aspect-video flex items-center justify-center rounded-lg">
                <span className="text-white text-xl font-semibold">
                  {images[selectedImage].alt}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

