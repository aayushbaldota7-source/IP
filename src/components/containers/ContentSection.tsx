import React from 'react'
import { motion } from 'framer-motion'
import { RiCheckboxCircleLine, RiLightbulbLine, RiRocketLine, RiShieldCheckLine } from 'react-icons/ri'
import { useInView } from '@/hooks/useAnimations'

const FEATURES = [
  { icon: <RiLightbulbLine />, title: 'Insight-Driven',   desc: 'AI-powered recommendations that surface the right data at the right time.',      color: '#F59E0B' },
  { icon: <RiRocketLine />,    title: 'Ship Faster',       desc: 'Pre-built components and patterns cut your dev cycle by 60%.',                    color: '#6C63FF' },
  { icon: <RiShieldCheckLine />, title: 'Enterprise Ready', desc: 'SOC 2 Type II, GDPR compliant with role-based access control.',                  color: '#10B981' },
  { icon: <RiCheckboxCircleLine />, title: 'Zero Config',  desc: 'Sensible defaults get you to production without wrestling with config.',           color: '#8B5CF6' },
]

/**
 * Container 4 — Content Section
 * Two-column layout: decorative visual + feature list with animated reveal.
 */
export const ContentSection: React.FC = () => {
  const { ref, inView } = useInView(0.15)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center"
      aria-labelledby="content-heading"
    >
      {/* ── Left: Visual Card ── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="relative rounded-3xl overflow-hidden bg-noir-700 dark:bg-noir-800 p-8 md:p-10 min-h-[340px] flex flex-col justify-between">
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'radial-gradient(circle, #FAF8F3 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            aria-hidden="true"
          />
          {/* Glow orbs */}
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary-500 opacity-15 blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-secondary-500 opacity-10 blur-2xl" aria-hidden="true" />

          {/* Top: Brand pill */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-cream-100/20 bg-cream-100/10">
              <div className="w-5 h-5 rounded-md bg-cream-100 flex items-center justify-center">
                <span className="font-display font-black text-noir-700 text-[10px]">N</span>
              </div>
              <span className="text-xs font-semibold text-cream-300">Noir Platform</span>
            </div>
          </div>

          {/* Animated bars + mini stats */}
          <div className="relative z-10 my-6 space-y-2">
            {[80, 55, 92, 68, 45].map((w, i) => (
              <motion.div
                key={i}
                initial={{ width: 0 }}
                animate={inView ? { width: `${w}%` } : {}}
                transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                className="h-2 rounded-full"
                style={{ background: ['#6C63FF','#8B5CF6','#10B981','#F59E0B','#06B6D4'][i] }}
                aria-hidden="true"
              />
            ))}

            <div className="flex gap-3 mt-4">
              {[
                { label: 'Uptime', val: '99.9%', color: '#10B981' },
                { label: 'P95',    val: '48ms',  color: '#6C63FF' },
                { label: 'Req/s',  val: '12.4k', color: '#F59E0B' },
              ].map(s => (
                <div key={s.label} className="flex-1 bg-white/10 rounded-xl p-3 text-center">
                  <p className="font-display font-black text-base" style={{ color: s.color }}>{s.val}</p>
                  <p className="text-[10px] text-cream-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom tagline */}
          <div className="relative z-10">
            <p className="font-display text-xl font-bold text-cream-100">
              Built for scale.<br />Designed for humans.
            </p>
          </div>
        </div>

        {/* Floating chips */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute -bottom-4 -right-4 bg-white dark:bg-noir-500 rounded-2xl p-3
                     border border-cream-200 dark:border-noir-400 flex items-center gap-3"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.10)' }}
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 text-base">
            <RiRocketLine />
          </div>
          <div>
            <p className="text-xs font-bold text-noir-600 dark:text-cream-100">Deployed!</p>
            <p className="text-[10px] text-cream-600 dark:text-cream-500">2 min ago</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="absolute -top-4 -left-4 bg-white dark:bg-noir-500 rounded-2xl p-3
                     border border-cream-200 dark:border-noir-400 flex items-center gap-3"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.10)' }}
        >
          <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-primary-500 text-base">
            <RiShieldCheckLine />
          </div>
          <div>
            <p className="text-xs font-bold text-noir-600 dark:text-cream-100">SOC 2 Compliant</p>
            <p className="text-[10px] text-cream-600 dark:text-cream-500">Certified</p>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Right: Feature List ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-0.5 rounded-full bg-primary-500" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary-500">Why Noir</span>
          </div>
          <h2
            id="content-heading"
            className="font-display text-2xl md:text-3xl lg:text-4xl font-black
                       text-noir-600 dark:text-cream-100 leading-tight tracking-tight mb-4"
          >
            Everything you need,<br />
            <span className="text-gradient">nothing you don't.</span>
          </h2>
          <p className="text-cream-700 dark:text-cream-500 text-sm md:text-base leading-relaxed">
            Noir strips away the noise so your team can focus on what matters — shipping great products and delighting your users.
          </p>
        </div>

        <ul className="space-y-4" role="list">
          {FEATURES.map((f, i) => (
            <motion.li
              key={f.title}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="flex items-start gap-4 group"
              role="listitem"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0
                           transition-transform duration-200 group-hover:scale-110"
                style={{ background: f.color + '18', color: f.color }}
              >
                {f.icon}
              </div>
              <div>
                <h3 className="font-semibold text-sm text-noir-600 dark:text-cream-100 mb-0.5">{f.title}</h3>
                <p className="text-xs text-cream-700 dark:text-cream-500 leading-relaxed">{f.desc}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}

export default ContentSection
