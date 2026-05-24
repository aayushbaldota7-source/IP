import React from 'react'

// ─── Generic Skeleton ─────────────────────────────────────
interface SkeletonProps {
  className?: string
  width?:     string
  height?:    string
  rounded?:   'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

const roundedMap = {
  sm:   'rounded',
  md:   'rounded-md',
  lg:   'rounded-lg',
  xl:   'rounded-xl',
  '2xl':'rounded-2xl',
  full: 'rounded-full',
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width,
  height,
  rounded = 'lg',
}) => (
  <div
    className={`shimmer ${roundedMap[rounded]} ${className}`}
    style={{ width, height }}
    aria-hidden="true"
  />
)

// ─── Card Skeleton ────────────────────────────────────────
export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`bg-white dark:bg-noir-500 rounded-2xl p-6 border border-cream-200 dark:border-noir-400 shadow-card ${className}`}
    aria-hidden="true"
  >
    <div className="flex items-start justify-between mb-4">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="w-9 h-9" rounded="xl" />
    </div>
    <Skeleton className="h-8 w-28 mb-2" />
    <Skeleton className="h-3 w-16 mb-4" />
    <Skeleton className="h-1 w-full" rounded="full" />
  </div>
)

// ─── Hero Skeleton ────────────────────────────────────────
export const HeroSkeleton: React.FC = () => (
  <div
    className="w-full h-[420px] md:h-[480px] rounded-3xl overflow-hidden bg-cream-300 dark:bg-noir-600 relative"
    aria-hidden="true"
  >
    <div className="absolute inset-0 shimmer" />
    <div className="absolute bottom-10 left-10 space-y-3">
      <Skeleton className="h-5 w-20" rounded="full" />
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-4 w-80" />
      <Skeleton className="h-10 w-32" rounded="xl" />
    </div>
  </div>
)

// ─── Slider Skeleton ──────────────────────────────────────
export const SliderSkeleton: React.FC = () => (
  <div className="flex gap-4 overflow-hidden" aria-hidden="true">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="flex-shrink-0 w-64 bg-white dark:bg-noir-500 rounded-2xl overflow-hidden border border-cream-200 dark:border-noir-400">
        <Skeleton className="h-40 w-full" rounded="sm" />
        <div className="p-4 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
)

// ─── Text Skeleton ────────────────────────────────────────
export const TextSkeleton: React.FC<{ lines?: number }> = ({ lines = 3 }) => (
  <div className="space-y-2" aria-hidden="true">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className="h-4"
        style={{ width: i === lines - 1 ? '60%' : '100%' }}
      />
    ))}
  </div>
)

export default Skeleton
