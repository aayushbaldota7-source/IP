import React from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y, FreeMode } from 'swiper/modules'
import { RiArrowLeftLine, RiArrowRightLine, RiExternalLinkLine } from 'react-icons/ri'
import 'swiper/css'
import 'swiper/css/navigation'
import { SLIDER_ITEMS } from '@/utils/constants'
import { useInView } from '@/hooks/useAnimations'

type SliderItem = typeof SLIDER_ITEMS[number]

// ─── Single slider card ────────────────────────────────────
const SliderCard: React.FC<{ item: SliderItem }> = ({ item }) => (
  <motion.article
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    className="group h-full bg-white dark:bg-noir-500 rounded-2xl overflow-hidden
               border border-cream-200 dark:border-noir-400 cursor-pointer select-none"
    style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
    aria-label={`Project: ${item.title}`}
  >
    {/* Thumbnail */}
    <div
      className="relative h-44 flex items-center justify-center overflow-hidden"
      style={{ background: item.bg + '18' }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, ${item.bg} 1.5px, transparent 1.5px)`,
          backgroundSize: '18px 18px',
        }}
        aria-hidden="true"
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at 50% 50%, ${item.bg}40, transparent 70%)` }}
        aria-hidden="true"
      />

      {/* Emoji */}
      <motion.span
        className="text-5xl relative z-10"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        {item.emoji}
      </motion.span>

      {/* External link on hover */}
      <div
        className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/80 dark:bg-noir-700/80
                   flex items-center justify-center text-noir-600 dark:text-cream-200
                   opacity-0 group-hover:opacity-100 transition-all duration-200"
        aria-hidden="true"
      >
        <RiExternalLinkLine className="text-sm" />
      </div>

      {/* Tag pill */}
      <div
        className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px]
                   font-bold uppercase tracking-wider text-white"
        style={{ background: item.bg }}
      >
        {item.tag}
      </div>
    </div>

    {/* Body */}
    <div className="p-4">
      <h3 className="font-display font-bold text-base text-noir-600 dark:text-cream-100 mb-1">
        {item.title}
      </h3>
      <p className="text-xs text-cream-700 dark:text-cream-500 leading-relaxed line-clamp-2">
        {item.desc}
      </p>

      {/* Bottom row */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex -space-x-2" aria-label="Team members">
          {[['A','#6C63FF'], ['B','#F59E0B'], ['C','#10B981']].map(([letter, color]) => (
            <div
              key={letter}
              className="w-6 h-6 rounded-full border-2 border-white dark:border-noir-500
                         text-[9px] font-bold flex items-center justify-center text-white"
              style={{ background: color }}
              aria-hidden="true"
            >
              {letter}
            </div>
          ))}
        </div>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: item.bg + '20', color: item.bg }}
        >
          Active
        </span>
      </div>
    </div>
  </motion.article>
)

/**
 * Container 3 — Image Slider
 * Swiper with custom nav arrows, free-mode drag, hover effects.
 */
export const ImageSlider: React.FC = () => {
  const { ref, inView } = useInView(0.1)
  const prevRef = React.useRef<HTMLButtonElement>(null)
  const nextRef = React.useRef<HTMLButtonElement>(null)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="space-y-6"
      aria-labelledby="slider-heading"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-0.5 rounded-full bg-secondary-500" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary-500">
              Projects
            </span>
          </div>
          <h2
            id="slider-heading"
            className="font-display text-2xl md:text-3xl font-black text-noir-600 dark:text-cream-100"
          >
            Active Workstreams
          </h2>
        </div>

        {/* Custom Nav Buttons */}
        <div className="flex gap-2" role="group" aria-label="Slider navigation">
          <motion.button
            ref={prevRef}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Previous slide"
            className="w-10 h-10 rounded-xl bg-cream-200 dark:bg-noir-500 flex items-center
                       justify-center text-noir-600 dark:text-cream-200
                       hover:bg-noir-700 hover:text-cream-100
                       transition-all duration-200 border border-cream-300 dark:border-noir-400
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <RiArrowLeftLine className="text-lg" />
          </motion.button>
          <motion.button
            ref={nextRef}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Next slide"
            className="w-10 h-10 rounded-xl bg-noir-700 dark:bg-cream-200 flex items-center
                       justify-center text-cream-100 dark:text-noir-700
                       hover:bg-noir-500 dark:hover:bg-cream-300
                       transition-all duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <RiArrowRightLine className="text-lg" />
          </motion.button>
        </div>
      </motion.div>

      {/* Swiper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="overflow-visible"
        style={{ paddingBottom: 12 }}
      >
        <Swiper
          modules={[Navigation, A11y, FreeMode]}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={swiper => {
            const nav = swiper.params.navigation
            if (nav && typeof nav !== 'boolean') {
              nav.prevEl = prevRef.current
              nav.nextEl = nextRef.current
            }
          }}
          freeMode={{ enabled: true, momentum: true }}
          slidesPerView={1.2}
          spaceBetween={16}
          breakpoints={{
            480:  { slidesPerView: 1.6, spaceBetween: 16 },
            640:  { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3.2, spaceBetween: 20 },
            1280: { slidesPerView: 4,   spaceBetween: 24 },
          }}
          a11y={{ prevSlideMessage: 'Previous project', nextSlideMessage: 'Next project' }}
        >
          {SLIDER_ITEMS.map(item => (
            <SwiperSlide key={item.id} style={{ height: 'auto' }}>
              <SliderCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  )
}

export default ImageSlider
