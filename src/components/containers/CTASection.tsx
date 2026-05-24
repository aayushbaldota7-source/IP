import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  RiArrowRightLine,
  RiPlayLine,
  RiCheckLine,
  RiSparklingLine,
} from 'react-icons/ri'
import { Button } from '@/components/ui/Button'
import { useInView } from '@/hooks/useAnimations'

const PERKS = ['No credit card required', 'Free 14-day trial', 'Cancel anytime']

/**
 * Container 5 — CTA Section
 * Dark band with primary + secondary buttons, perks, social proof, avatar stack.
 */
export const CTASection: React.FC = () => {
  const { ref, inView } = useInView(0.2)
  const [primaryLoading,   setPrimaryLoading]   = useState(false)
  const [secondaryLoading, setSecondaryLoading] = useState(false)

  const handlePrimary = () => {
    setPrimaryLoading(true)
    setTimeout(() => setPrimaryLoading(false), 2200)
  }
  const handleSecondary = () => {
    setSecondaryLoading(true)
    setTimeout(() => setSecondaryLoading(false), 1800)
  }

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      aria-labelledby="cta-heading"
      className="relative rounded-3xl overflow-hidden"
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-noir-700 dark:bg-noir-800" aria-hidden="true" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(circle, #FAF8F3 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        aria-hidden="true"
      />

      {/* Glow orbs */}
      <motion.div
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-primary-500 blur-3xl"
        style={{ opacity: 0.2 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-secondary-500 blur-3xl"
        style={{ opacity: 0.15 }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 px-8 md:px-16 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/40
                       bg-primary-500/10 text-primary-300 text-xs font-bold uppercase tracking-wider mb-6"
          >
            <RiSparklingLine className="text-sm" aria-hidden="true" />
            Start Today
          </motion.div>

          {/* Heading */}
          <motion.h2
            id="cta-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-black
                       text-cream-100 leading-[1.1] tracking-tight mb-4"
          >
            Ready to ship faster?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-cream-400 text-base md:text-lg leading-relaxed mb-10"
          >
            Join 25,000+ teams who build with Noir. Set up in minutes, scale to millions.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
          >
            <Button
              size="lg"
              loading={primaryLoading}
              onClick={handlePrimary}
              iconRight={!primaryLoading ? <RiArrowRightLine /> : undefined}
              className="w-full sm:w-auto !bg-cream-100 !text-noir-700 hover:!bg-white !text-base !px-8 !py-3.5"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
              aria-label="Get started with Noir — free 14-day trial"
            >
              {primaryLoading ? 'Setting up…' : 'Get Started Free'}
            </Button>

            <Button
              variant="secondary"
              size="lg"
              loading={secondaryLoading}
              onClick={handleSecondary}
              icon={!secondaryLoading ? <RiPlayLine /> : undefined}
              className="w-full sm:w-auto !border-cream-100/30 !text-cream-200 hover:!bg-cream-100/10 !text-base !px-8 !py-3.5"
              aria-label="Watch Noir product demo video"
            >
              {secondaryLoading ? 'Loading…' : 'Watch Demo'}
            </Button>
          </motion.div>

          {/* Perks */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
            role="list"
            aria-label="Included benefits"
          >
            {PERKS.map(perk => (
              <li key={perk} className="flex items-center gap-1.5 text-xs text-cream-400 font-medium" role="listitem">
                <RiCheckLine className="text-emerald-400 flex-shrink-0" aria-hidden="true" />
                {perk}
              </li>
            ))}
          </motion.ul>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-10 pt-8 border-t border-cream-100/10
                       flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5" aria-hidden="true">
                {(['#6C63FF','#10B981','#F59E0B','#EF4444','#06B6D4'] as const).map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-noir-700
                               flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: c }}
                  >
                    {['J','S','M','R','K'][i]}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-0.5" aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xs" aria-hidden="true">★</span>
                  ))}
                </div>
                <p className="text-[11px] text-cream-400">
                  Loved by <strong className="text-cream-200">25,000+</strong> teams
                </p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-cream-100/10" aria-hidden="true" />

            <p className="text-xs text-cream-500 text-center sm:text-left max-w-xs italic">
              "Noir cut our dashboard dev time by 70%."
              <br />
              <strong className="text-cream-300 not-italic">— Sarah K., CTO at Acme Inc.</strong>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
