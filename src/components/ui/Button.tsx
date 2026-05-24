import React from 'react'
import { motion } from 'framer-motion'
import { RiLoader4Line } from 'react-icons/ri'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'gradient'
type Size    = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:    Variant
  size?:       Size
  loading?:    boolean
  icon?:       React.ReactNode
  iconRight?:  React.ReactNode
  fullWidth?:  boolean
  children:    React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:   'bg-noir-500 dark:bg-cream-200 text-cream-100 dark:text-noir-700 hover:bg-noir-400 dark:hover:bg-cream-300',
  secondary: 'bg-transparent text-noir-500 dark:text-cream-200 border-2 border-noir-400 dark:border-cream-400 hover:bg-noir-500 dark:hover:bg-cream-200 hover:text-cream-100 dark:hover:text-noir-700',
  ghost:     'bg-transparent text-noir-400 dark:text-cream-400 hover:bg-cream-200 dark:hover:bg-noir-500 hover:text-noir-700 dark:hover:text-cream-100',
  danger:    'bg-red-500 text-white hover:bg-red-600',
  gradient:  'text-white',
}

const sizeClasses: Record<Size, string> = {
  xs: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  sm: 'px-4 py-2   text-sm rounded-xl gap-2',
  md: 'px-6 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-7 py-3   text-base rounded-xl gap-2.5',
  xl: 'px-9 py-4   text-lg rounded-2xl gap-3',
}

/**
 * Reusable Button component — supports multiple variants, sizes, loading state, icons.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant   = 'primary',
  size      = 'md',
  loading   = false,
  icon,
  iconRight,
  fullWidth = false,
  children,
  disabled,
  className = '',
  style,
  ...props
}, ref) => {
  const isDisabled = disabled || loading
  const isGradient = variant === 'gradient'

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      whileTap={{ scale: isDisabled ? 1 : 0.96 }}
      whileHover={{ scale: isDisabled ? 1 : 1.02 }}
      transition={{ duration: 0.15 }}
      style={isGradient
        ? { background: 'linear-gradient(135deg,#6C63FF,#8B5CF6)', ...style }
        : style
      }
      className={[
        'inline-flex items-center justify-center font-semibold',
        'transition-all duration-250 select-none',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <RiLoader4Line className="animate-spin shrink-0" aria-hidden="true" />
      ) : icon ? (
        <span className="shrink-0" aria-hidden="true">{icon}</span>
      ) : null}
      <span>{children}</span>
      {!loading && iconRight && (
        <span className="shrink-0" aria-hidden="true">{iconRight}</span>
      )}
    </motion.button>
  )
})

Button.displayName = 'Button'

// ─── Icon Button ──────────────────────────────────────────
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label:    string
  children: React.ReactNode
  variant?: 'default' | 'ghost'
  size?:    'sm' | 'md' | 'lg'
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({
  label,
  children,
  variant = 'ghost',
  size    = 'md',
  className = '',
  ...props
}, ref) => {
  const sizes = {
    sm: 'w-8 h-8 text-base',
    md: 'w-10 h-10 text-lg',
    lg: 'w-12 h-12 text-xl',
  }
  const variants = {
    default: 'bg-cream-200 dark:bg-noir-500 text-noir-500 dark:text-cream-200 hover:bg-cream-300 dark:hover:bg-noir-400',
    ghost:   'text-noir-300 dark:text-cream-500 hover:bg-cream-200 dark:hover:bg-noir-500 hover:text-noir-500 dark:hover:text-cream-200',
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      aria-label={label}
      className={[
        'relative flex items-center justify-center rounded-xl',
        'transition-all duration-200 focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-primary-500',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </motion.button>
  )
})

IconButton.displayName = 'IconButton'
