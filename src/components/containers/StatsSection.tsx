import React from 'react'
import { motion } from 'framer-motion'
import {
  RiUserLine,
  RiMoneyDollarCircleLine,
  RiProjectorLine,
  RiEmotionHappyLine,
  RiArrowUpLine,
} from 'react-icons/ri'
import { STATS_DATA } from '@/utils/constants'
import { useInView, useCountUp } from '@/hooks/useAnimations'

const ICONS: Record<number, React.ReactNode> = {
  1: <RiUserLine />,
  2: <RiMoneyDollarCircleLine />,
  3: <RiProjectorLine />,
  4: <RiEmotionHappyLine />,
}

// ─── Individual animated stat card ────────────────────────
interface AnimatedStatProps {
  value:   number
  prefix?: string
  suffix?: string
  label:   string
  change:  string
  color:   string
  icon:    React.ReactNode
  index:   number
  inView:  boolean
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({
  value, prefix = '', suffix = '', label, change, color, icon, index, inView,
}) => {
  const count = useCountUp(inView ? value : 0, 2200)

  const formatted = prefix === '$'
    ? prefix + (count >= 1000 ? (count / 1000).toFixed(0) + 'k' : count)
    : prefix + count.toLocaleString() + suffix

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(0,0,0,0.12)' }}
      className="bg-white dark:bg-noir-500 rounded-2xl p-6 border border-cream-200
                 dark:border-noir-400 cursor-default group relative overflow-hidden"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
    >
      {/* Background accent circle */}
      <div
        className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10
                   group-hover:opacity-20 transition-opacity duration-300"
        style={{ background: color }}
        aria-hidden="true"
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-5">
        <p className="text-xs font-bold uppercase tracking-widest text-cream-600 dark:text-cream-500">
          {label}
        </p>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: color + '1A', color }}
        >
          {icon}
        </div>
      </div>

      {/* Animated number */}
      <div className="font-display text-3xl xl:text-4xl font-black text-noir-600 dark:text-cream-100 tabular-nums mb-3">
        {formatted}
      </div>

      {/* Change badge */}
      <div className="flex items-center gap-1.5">
        <span
          className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold"
          style={{ background: '#10B98120', color: '#10B981' }}
        >
          <RiArrowUpLine className="text-xs" />
          {change}
        </span>
        <span className="text-xs text-cream-600 dark:text-cream-500">vs last month</span>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-1.5 rounded-full bg-cream-200 dark:bg-noir-400 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: '68%' } : {}}
          transition={{ duration: 1.4, delay: index * 0.12 + 0.4, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

/**
 * Container 2 — Stats Section
 * Animated count-up stat cards with progress bars and live indicator.
 */
export const StatsSection: React.FC = () => {
  const { ref, inView } = useInView(0.2)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="space-y-8"
      aria-labelledby="stats-heading"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 rounded-full bg-primary-500" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary-500">
              Live Metrics
            </span>
          </div>
          <h2
            id="stats-heading"
            className="font-display text-2xl md:text-3xl lg:text-4xl font-black
                       text-noir-600 dark:text-cream-100 tracking-tight"
          >
            Platform at a Glance
          </h2>
          <p className="mt-2 text-cream-700 dark:text-cream-500 text-sm md:text-base max-w-md">
            Real-time data from across your entire operation — updated every 30 seconds.
          </p>
        </div>

        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50
                     dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800
                     self-start md:self-auto"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Live</span>
        </motion.div>
      </motion.div>

      {/* Stat Cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5"
        role="list"
        aria-label="Key performance indicators"
      >
        {STATS_DATA.map((stat, i) => (
          <div key={stat.id} role="listitem">
            <AnimatedStat
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
              change={stat.change}
              color={stat.color}
              icon={ICONS[stat.id]}
              index={i}
              inView={inView}
            />
          </div>
        ))}
      </div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        className="h-px bg-gradient-to-r from-transparent via-cream-300 dark:via-noir-400 to-transparent origin-left"
        aria-hidden="true"
      />
    </section>
  )
}

export default StatsSection
