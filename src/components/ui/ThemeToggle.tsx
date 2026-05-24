import React from 'react'
import { motion } from 'framer-motion'
import { RiSunLine, RiMoonLine } from 'react-icons/ri'
import { useTheme } from '@/context/ThemeContext'

interface ThemeToggleProps {
  className?: string
}

/**
 * Animated dark/light mode toggle switch.
 * Uses the ThemeContext to read and update the current theme.
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-checked={isDark}
      role="switch"
      whileTap={{ scale: 0.92 }}
      className={[
        'relative flex items-center w-14 h-7 rounded-full p-0.5',
        'transition-colors duration-400 focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        isDark
          ? 'bg-noir-500 border border-noir-300'
          : 'bg-cream-300 border border-cream-400',
        className,
      ].join(' ')}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 text-yellow-500 text-xs">
        <RiSunLine />
      </span>
      <span className="absolute right-1.5 text-cream-300 text-xs">
        <RiMoonLine />
      </span>

      {/* Thumb */}
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className={[
          'relative z-10 w-6 h-6 rounded-full shadow-md flex items-center justify-center text-xs',
          isDark ? 'bg-noir-100 text-noir-700 ml-auto' : 'bg-white text-yellow-600',
        ].join(' ')}
      >
        {isDark ? <RiMoonLine /> : <RiSunLine />}
      </motion.span>
    </motion.button>
  )
}

export default ThemeToggle
