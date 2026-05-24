import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import { HeroCarousel }    from '@/components/containers/HeroCarousel'
import { StatsSection }    from '@/components/containers/StatsSection'
import { ImageSlider }     from '@/components/containers/ImageSlider'
import { ContentSection }  from '@/components/containers/ContentSection'
import { CTASection }      from '@/components/containers/CTASection'
import { AnimatedCards }   from '@/components/containers/AnimatedCards'
import {
  HeroSkeleton,
  CardSkeleton,
  SliderSkeleton,
} from '@/components/ui/SkeletonLoader'

// ─── Section wrapper ───────────────────────────────────────
interface SectionProps {
  children:   React.ReactNode
  id:         string           // MUST match SECTION_MAP in Sidebar.tsx
  className?: string
}

const Section: React.FC<SectionProps> = ({ children, id, className = '' }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={`scroll-mt-24 ${className}`}   // scroll-mt accounts for fixed header
  >
    {children}
  </motion.div>
)

// ─── Breadcrumb ────────────────────────────────────────────
const Breadcrumb: React.FC = () => (
  <nav aria-label="Breadcrumb" className="mb-2">
    <ol className="flex items-center gap-2 text-xs text-cream-600 dark:text-cream-500" role="list">
      <li>
        <a href="#" className="hover:text-primary-500 transition-colors font-medium">
          Home
        </a>
      </li>
      <li aria-hidden="true"><span className="opacity-40">/</span></li>
      <li className="font-semibold text-noir-600 dark:text-cream-200" aria-current="page">
        Dashboard
      </li>
    </ol>
  </nav>
)

// ─── Page heading ──────────────────────────────────────────
const PageHeading: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: -12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8"
  >
    <div>
      <h1 className="font-display text-xl md:text-2xl font-black text-noir-700 dark:text-cream-100">
        Good morning, Aayush 👋
      </h1>
      <p className="text-sm text-cream-700 dark:text-cream-500 mt-0.5">
        Here's what's happening across your workspace today.
      </p>
    </div>

    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cream-200 dark:bg-noir-500
                    border border-cream-300 dark:border-noir-400 self-start sm:self-auto">
      <span className="text-xs text-cream-600 dark:text-cream-400 font-medium">
        {new Date().toLocaleDateString('en-US', {
          weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
        })}
      </span>
    </div>
  </motion.div>
)

/**
 * Dashboard page — assembles all 6 containers.
 *
 * Section IDs MUST stay in sync with SECTION_MAP in Sidebar.tsx:
 *   dashboard   → dashboard-content
 *   analytics   → stats-section
 *   projects    → cards-section
 *   products    → slider-section
 *   calendar    → content-section
 *   messages    → cta-section
 *   favourites  → hero-section
 */
const Dashboard: React.FC = () => {
  return (
    <div
      id="dashboard-content"
      className="space-y-12 md:space-y-16 scroll-mt-24"
    >
      <Breadcrumb />
      <PageHeading />

      {/* ── Container 1: Hero Carousel ── id: hero-section */}
      <Section id="hero-section">
        <Suspense fallback={<HeroSkeleton />}>
          <HeroCarousel />
        </Suspense>
      </Section>

      {/* ── Container 2: Stats ── id: stats-section (analytics + reviews) */}
      <Section id="stats-section">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => <CardSkeleton key={i} />)}
            </div>
          }
        >
          <StatsSection />
        </Suspense>
      </Section>

      {/* ── Container 3: Image Slider ── id: slider-section (products) */}
      <Section id="slider-section">
        <Suspense fallback={<SliderSkeleton />}>
          <ImageSlider />
        </Suspense>
      </Section>

      {/* ── Container 4: Content Section ── id: content-section (calendar) */}
      <Section id="content-section">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          }
        >
          <ContentSection />
        </Suspense>
      </Section>

      {/* ── Container 5: CTA ── id: cta-section (messages) */}
      <Section id="cta-section">
        <CTASection />
      </Section>

      {/* ── Container 6: Animated Cards ── id: cards-section (projects) */}
      <Section id="cards-section">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
            </div>
          }
        >
          <AnimatedCards />
        </Suspense>
      </Section>

      {/* ── Footer ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="pb-8 pt-6 border-t border-cream-200 dark:border-noir-600"
        role="contentinfo"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3
                        text-xs text-cream-600 dark:text-cream-500">
          <p>© 2025 Noir. Crafted with ♥ for senior engineers.</p>
          <div className="flex items-center gap-4">
            {['Privacy', 'Terms', 'Support', 'GitHub'].map(link => (
              <a
                key={link}
                href="#dashboard-content"
                className="hover:text-primary-500 transition-colors focus-visible:outline-none
                           focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                onClick={e => {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default Dashboard
