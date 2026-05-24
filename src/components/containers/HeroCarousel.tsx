import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade, A11y } from 'swiper/modules'
import { RiArrowRightLine, RiSparklingLine } from 'react-icons/ri'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { Button } from '@/components/ui/Button'
import { HERO_SLIDES } from '@/utils/constants'

const PATTERNS = [
  `radial-gradient(circle at 70% 50%, rgba(108,99,255,0.25) 0%, transparent 60%),
   radial-gradient(circle at 20% 80%, rgba(139,92,246,0.15) 0%, transparent 50%),
   linear-gradient(135deg, #1A1A1A 0%, #0D0D0D 60%, #1a0d2e 100%)`,
  `radial-gradient(circle at 80% 30%, rgba(139,92,246,0.3) 0%, transparent 55%),
   radial-gradient(circle at 10% 90%, rgba(108,99,255,0.15) 0%, transparent 45%),
   linear-gradient(135deg, #0D0D0D 0%, #140d1f 60%, #0D0D0D 100%)`,
  `radial-gradient(circle at 50% 50%, rgba(167,139,250,0.2) 0%, transparent 65%),
   radial-gradient(circle at 90% 10%, rgba(108,99,255,0.2) 0%, transparent 40%),
   linear-gradient(160deg, #0D0D0D 0%, #0a0a1a 50%, #0D0D0D 100%)`,
  `radial-gradient(circle at 30% 60%, rgba(108,99,255,0.2) 0%, transparent 55%),
   radial-gradient(circle at 80% 20%, rgba(139,92,246,0.15) 0%, transparent 45%),
   linear-gradient(135deg, #141414 0%, #0D0D0D 100%)`,
]

/**
 * Container 1 — Hero Carousel
 * Full-width auto-sliding banner with Swiper fade transition,
 * animated text per slide, progress bar, floating shapes.
 */
export const HeroCarousel: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const progressRef = useRef<HTMLDivElement>(null)

  return (
    <section
      className="relative w-full rounded-3xl overflow-hidden"
      aria-label="Hero carousel"
      style={{ minHeight: 420 }}
    >
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, A11y]}
        effect="fade"
        autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true, el: '.hero-pagination' }}
        loop
        speed={900}
        a11y={{ prevSlideMessage: 'Previous slide', nextSlideMessage: 'Next slide' }}
        onSlideChange={swiper => setActiveIdx(swiper.realIndex)}
        className="w-full h-full"
        style={{ minHeight: 420 }}
      >
        {HERO_SLIDES.map((slide, i) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative flex items-center px-8 md:px-16 lg:px-20"
              style={{ minHeight: 420, background: PATTERNS[i] }}
            >
              {/* Dot grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: 'radial-gradient(circle, #FAF8F3 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
                aria-hidden="true"
              />

              {/* Animated glow orb */}
              <motion.div
                className="absolute right-10 md:right-24 top-1/2 -translate-y-1/2 w-56 h-56 md:w-80 md:h-80 rounded-full blur-3xl"
                style={{ background: slide.accent, opacity: 0.2 }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              />

              {/* Floating dots */}
              <motion.div
                className="absolute top-8 right-1/3 w-3 h-3 rounded-full"
                style={{ background: slide.accent }}
                animate={{ y: [-8, 8, -8], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              />
              <motion.div
                className="absolute bottom-12 right-1/4 w-5 h-5 rounded-lg border-2 opacity-30"
                style={{ borderColor: slide.accent }}
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
              />

              {/* Slide content */}
              <AnimatePresence mode="wait">
                {activeIdx === i && (
                  <motion.div
                    key={`slide-content-${slide.id}`}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 max-w-xl py-16"
                  >
                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5 border"
                      style={{
                        background: slide.accent + '22',
                        color: slide.accent,
                        borderColor: slide.accent + '44',
                      }}
                    >
                      <RiSparklingLine className="text-sm" aria-hidden="true" />
                      {slide.badge}
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-cream-100 leading-[1.1] mb-4 tracking-tight"
                    >
                      {slide.title}
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.55 }}
                      className="text-cream-400 text-base md:text-lg leading-relaxed mb-8 max-w-md"
                    >
                      {slide.subtitle}
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <Button
                        size="lg"
                        iconRight={<RiArrowRightLine />}
                        className="!bg-cream-100 !text-noir-700 hover:!bg-white shadow-xl"
                        aria-label={`${slide.cta} — ${slide.title}`}
                      >
                        {slide.cta}
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Slide counter */}
              <div
                className="absolute bottom-6 right-6 text-cream-400 text-xs font-mono font-bold opacity-60 select-none"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination dots */}
      <div
        className="hero-pagination absolute bottom-6 left-8 md:left-16 z-10 flex gap-2"
        role="tablist"
        aria-label="Slide navigation"
        ref={progressRef}
      />

      {/* Auto-progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-10" aria-hidden="true">
        <motion.div
          className="h-full bg-white/40"
          key={activeIdx}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 4.5, ease: 'linear' }}
        />
      </div>
    </section>
  )
}

export default HeroCarousel
