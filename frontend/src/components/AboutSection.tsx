'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users, Star, MapPin, Clock } from 'lucide-react'
import { useCMS } from '@/contexts/CMSContext'

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { content } = useCMS()

  const aboutTitle = (content && content['about_title']) || 'About YEHA Tours'
  const aboutSubtitle = (content && content['about_subtitle']) || 'We specialize in creating unforgettable experiences at Niagara Falls through small group and private tours designed for those who seek more than just a visit.'
  const aboutStory = (content && content['about_story']) || 'At YEHA Niagara Falls Tours, we believe that every visit to this natural wonder should be extraordinary. Our expert guide Kaleb brings years of experience and passion to every tour, ensuring you don\'t just see the falls—you experience them.'

  const features = [
    {
      icon: Users,
      title: 'Small Groups',
      description: 'Intimate experiences with 2-8 guests for personalized attention',
    },
    {
      icon: Star,
      title: 'Expert Guide',
      description: 'Led by Kaleb, our knowledgeable and passionate tour guide',
    },
    {
      icon: MapPin,
      title: 'Customizable',
      description: 'Tailor your experience to match your interests and schedule',
    },
    {
      icon: Clock,
      title: 'Flexible Duration',
      description: 'Tours ranging from 4-8 hours to fit your timeline',
    },
  ]

  return (
    <section ref={ref} className="section-padding bg-white dark:bg-slate-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-gray-900 dark:text-white">
            {aboutTitle.split(' ').map((word, i) => 
              word.toLowerCase().includes('yeha') || word.toLowerCase().includes('tours') ? (
                <span key={i} className="gradient-text">{word} </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {aboutSubtitle}
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Your Journey, Your Story
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {aboutStory}
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              At YEHA Niagara Falls Tours, we believe that every visit to this natural wonder should be extraordinary. Our expert guide Kaleb brings years of experience and passion to every tour, ensuring you don't just see the falls—you experience them.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              Whether you choose our ultra-small group tours for an intimate experience or our private premium tours for complete flexibility, we're committed to making your visit memorable. From personalized commentary to luxury comfort vehicles, every detail is crafted with your satisfaction in mind.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Join us and discover why travelers from around the world choose YEHA Tours for their Niagara Falls adventure.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary-500 via-ocean-500 to-emerald-500 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">Guide Kaleb</span>
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-500 to-accent-500 rounded-full opacity-30 blur-xl"
            />
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-white to-primary-50 dark:from-slate-800 dark:to-slate-700 hover:shadow-2xl transition-all border border-primary-100 dark:border-primary-800"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    index === 0 ? 'bg-gradient-to-br from-primary-400 to-primary-600' :
                    index === 1 ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                    index === 2 ? 'bg-gradient-to-br from-ocean-400 to-ocean-600' :
                    'bg-gradient-to-br from-emerald-400 to-emerald-600'
                  }`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

