import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiMoreLine, RiTeamLine, RiCalendarLine, RiFireLine } from 'react-icons/ri'
import { ANIMATED_CARDS } from '@/utils/constants'
import { useInView } from '@/hooks/useAnimations'

type Filter = 'All' | 'Design' | 'Engineering' | 'Marketing' | 'Research'
const FILTERS: Filter[] = ['All', 'Design', 'Engineering', 'Marketing', 'Research']

const PRIORITY_COLORS: Record<string, string> = {
  Critical: '#EF4444',
  High:     '#F59E0B',
  Medium:   '#6C63FF',
  Low:      '#10B981',
}

// ─── Individual project card ───────────────────────────────
interface ProjectCardProps {
  card: typeof ANIMATED_CARDS[number]
  index: number
  inView: boolean
}

const ProjectCard: React.FC<ProjectCardProps> = ({ card, index, inView }) => {
  const [liked, setLiked] = useState(false)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.9, y: -16 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="bg-white dark:bg-noir-500 rounded-2xl p-5
                 border border-cream-200 dark:border-noir-400 shadow-card
                 flex flex-col gap-4 group cursor-default"
      aria-label={`Project: ${card.title}, ${card.priority} priority`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
            style={{ background: card.color + '18' }}
          >
            {card.emoji}
          </div>
          <div>
            <h3 className="font-semibold text-sm text-noir-600 dark:text-cream-100 leading-tight">
              {card.title}
            </h3>
            <span
              className="text-[10px] font-bold uppercase tracking-wider"
              style={{ color: card.color }}
            >
              {card.category}
            </span>
          </div>
        </div>

        {/* Menu + like */}
        <div className="flex items-center gap-1">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setLiked(p => !p)}
            aria-label={liked ? 'Unlike project' : 'Like project'}
            aria-pressed={liked}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-colors duration-150"
            style={liked ? { color: '#EF4444' } : {}}
          >
            {liked ? '❤️' : '🤍'}
          </motion.button>
          <button
            aria-label="More options"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-cream-500 hover:text-noir-600 dark:hover:text-cream-200 hover:bg-cream-100 dark:hover:bg-noir-400 transition-colors"
          >
            <RiMoreLine className="text-base" />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-cream-600 dark:text-cream-500 font-medium">Progress</span>
          <span
            className="text-xs font-bold tabular-nums"
            style={{ color: card.color }}
          >
            {card.progress}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-cream-200 dark:bg-noir-400 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${card.color}cc, ${card.color})` }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${card.progress}%` } : {}}
            transition={{ duration: 1.2, delay: index * 0.08 + 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between pt-1">
        {/* Team + due */}
        <div className="flex items-center gap-3 text-[11px] text-cream-600 dark:text-cream-500">
          <span className="flex items-center gap-1">
            <RiTeamLine className="text-xs" aria-hidden="true" />
            {card.team} members
          </span>
          <span className="flex items-center gap-1">
            <RiCalendarLine className="text-xs" aria-hidden="true" />
            {card.dueDate}
          </span>
        </div>

        {/* Priority badge */}
        <span
          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
          style={{
            background: PRIORITY_COLORS[card.priority] + '18',
            color: PRIORITY_COLORS[card.priority],
          }}
        >
          <RiFireLine className="text-xs" aria-hidden="true" />
          {card.priority}
        </span>
      </div>
    </motion.article>
  )
}

/**
 * Container 6 — Animated Cards
 * Filterable project cards grid with Framer Motion layout animations.
 */
export const AnimatedCards: React.FC = () => {
  const { ref, inView } = useInView(0.1)
  const [activeFilter, setActiveFilter] = useState<Filter>('All')

  const filtered = activeFilter === 'All'
    ? ANIMATED_CARDS
    : ANIMATED_CARDS.filter(c => c.category === activeFilter)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="space-y-6"
      aria-labelledby="projects-heading"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-0.5 rounded-full bg-primary-500" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary-500">Kanban</span>
          </div>
          <h2
            id="projects-heading"
            className="font-display text-2xl md:text-3xl font-black text-noir-600 dark:text-cream-100"
          >
            Active Projects
          </h2>
        </div>

        {/* Filter tabs */}
        <div
          className="flex items-center gap-1.5 p-1 rounded-xl bg-cream-200 dark:bg-noir-600 flex-wrap"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {FILTERS.map(f => (
            <motion.button
              key={f}
              onClick={() => setActiveFilter(f)}
              whileTap={{ scale: 0.95 }}
              role="tab"
              aria-selected={activeFilter === f}
              aria-controls="cards-grid"
              className={[
                'relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                activeFilter === f
                  ? 'text-cream-100 shadow-sm'
                  : 'text-cream-700 dark:text-cream-400 hover:text-noir-600 dark:hover:text-cream-200',
              ].join(' ')}
            >
              {activeFilter === f && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 bg-noir-700 dark:bg-cream-200 rounded-lg"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        id="cards-grid"
        layout
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5"
        role="list"
        aria-label={`Projects — ${activeFilter} filter, ${filtered.length} result${filtered.length !== 1 ? 's' : ''}`}
        aria-live="polite"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((card, i) => (
            <div key={card.id} role="listitem">
              <ProjectCard card={card} index={i} inView={inView} />
            </div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-16 text-cream-600 dark:text-cream-400"
          >
            <span className="text-4xl mb-3 block">🔍</span>
            <p className="text-sm font-medium">No projects match this filter.</p>
          </motion.div>
        )}
      </motion.div>

      {/* Footer stat */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex items-center justify-between pt-2 text-xs text-cream-600 dark:text-cream-500"
      >
        <span>Showing <strong className="text-noir-600 dark:text-cream-200">{filtered.length}</strong> projects</span>
        <button className="text-primary-500 font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded">
          View all →
        </button>
      </motion.div>
    </section>
  )
}

export default AnimatedCards
