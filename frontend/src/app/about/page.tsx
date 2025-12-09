'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Users, Heart, MapPin } from 'lucide-react'

export default function AboutPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We love what we do and it shows in every tour we conduct.',
    },
    {
      icon: Users,
      title: 'Personalization',
      description: 'Every tour is tailored to create the perfect experience for our guests.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service.',
    },
    {
      icon: MapPin,
      title: 'Expertise',
      description: 'Years of experience and deep knowledge of Niagara Falls.',
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-cyan-600">
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 container-custom text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold font-display mb-4"
          >
            About YEHA Tours
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Creating unforgettable experiences at Niagara Falls
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section ref={ref} className="section-padding bg-white dark:bg-slate-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                YEHA Niagara Falls Tours was born from a simple belief: that visiting Niagara Falls should be more than just seeing a natural wonder—it should be an experience that stays with you forever.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Founded by expert guide Kaleb, we recognized that travelers were seeking more intimate, personalized experiences away from the crowded large-group tours. We set out to create something different—tours that combine the knowledge of a local expert with the comfort and flexibility that discerning travelers deserve.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Today, YEHA Tours has become a trusted name for small group and private tours at Niagara Falls. Our commitment to excellence, personalized service, and creating meaningful connections with our guests sets us apart.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50 dark:bg-slate-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-display mb-4 text-gray-900 dark:text-white">
              Our <span className="gradient-text">Values</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-lg"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4"
                  >
                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-center"
            >
              <h2 className="text-4xl font-bold font-display mb-6 text-gray-900 dark:text-white">
                Meet Your Guide
              </h2>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary-400 to-cyan-500 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">Kaleb - Expert Guide</span>
                </div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Kaleb brings years of experience and an infectious passion for Niagara Falls to every tour. His deep knowledge of the area's history, geology, and local stories, combined with his commitment to creating personalized experiences, ensures that every guest leaves with unforgettable memories.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

