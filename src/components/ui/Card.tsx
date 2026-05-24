import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children:    React.ReactNode
  className?:  string
  hover?:      boolean
  glass?:      boolean
  padding?:    'none' | 'sm' | 'md' | 'lg' | 'xl'
  onClick?:    () => void
  role?:       string
  tabIndex?:   number
  'aria-label'?: string
}

const paddingMap = {
  none: '',
  sm:   'p-3',
  md:   'p-5',
  lg:   'p-6',
  xl:   'p-8',
}

/**
 * Reusable Card component with optional hover animation, glass effect,
 * and configurable padding. Uses cream/noir design tokens.
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  glass = false,
  padding = 'lg',
  onClick,
  role,
  tabIndex,
  'aria-label': ariaLabel,
}) => {
  const base = [
    'rounded-2xl border',
    'transition-all duration-300',
    glass
      ? 'glass-cream dark:glass bg-white/70 dark:bg-noir-500/70 border-cream-300/50 dark:border-noir-400/50 backdrop-blur-sm'
      : 'bg-white dark:bg-noir-500 border-cream-200 dark:border-noir-400',
    paddingMap[padding],
    hover ? 'card-glow-hover cursor-pointer' : 'shadow-card',
    className,
  ].join(' ')

  if (hover || onClick) {
    return (
      <motion.div
        className={base}
        onClick={onClick}
        whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        role={role}
        tabIndex={tabIndex}
        aria-label={ariaLabel}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div
      className={base}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────
interface StatCardProps {
  label:    string
  value:    string | number
  change?:  string
  trend?:   'up' | 'down' | 'neutral'
  color?:   string
  icon?:    React.ReactNode
  loading?: boolean
}

export const StatCard: React.FC<StatCardProps> = ({
  label, value, change, trend = 'up', color = '#6C63FF', icon, loading,
}) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-noir-500 rounded-2xl p-6 border border-cream-200 dark:border-noir-400 shadow-card">
        <div className="shimmer h-4 w-24 rounded mb-4" />
        <div className="shimmer h-8 w-32 rounded mb-3" />
        <div className="shimmer h-3 w-16 rounded" />
      </div>
    )
  }

  const trendColor = trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-red-500' : 'text-cream-600'

  return (
    <motion.div
      className="bg-white dark:bg-noir-500 rounded-2xl p-6 border border-cream-200 dark:border-noir-400 shadow-card cursor-default"
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-cream-700 dark:text-cream-500">
          {label}
        </span>
        {icon && (
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-base shrink-0"
            style={{ background: color + '20', color }}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="font-display text-3xl font-bold text-noir-500 dark:text-cream-100 mb-2 tabular-nums">
        {value}
      </div>

      {change && (
        <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
          <span>{trend === 'up' ? '↑' : '↓'}</span>
          <span>{change} this month</span>
        </div>
      )}

      {/* Accent bar */}
      <div className="mt-4 h-1 rounded-full bg-cream-200 dark:bg-noir-400 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: '68%' }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

export default Card
