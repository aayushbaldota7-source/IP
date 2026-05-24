import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiCloseLine, RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { useSidebar } from '@/context/SidebarContext'
import { useIsDesktop } from '@/hooks/useMediaQuery'
import { NAV_ITEMS, APP_CONFIG } from '@/utils/constants'

// ─── Maps nav item id → section element id in Dashboard ───
const SECTION_MAP: Record<string, string> = {
  dashboard:   'dashboard-content',
  analytics:   'stats-section',
  projects:    'cards-section',
  products:    'slider-section',
  calendar:    'content-section',
  messages:    'cta-section',
  favourites:  'hero-section',
  reviews:     'stats-section',
  profile:     'dashboard-content',
  settings:    'dashboard-content',
}

interface SidebarProps {
  activeId?: string
  onNavClick?: (id: string) => void
}

/**
 * Responsive Sidebar:
 * - Desktop: fixed left panel with collapse toggle
 * - Mobile: slide-in drawer with overlay backdrop
 * Nav items scroll smoothly to their matching page section.
 */
export const Sidebar: React.FC<SidebarProps> = ({
  activeId = 'dashboard',
  onNavClick,
}) => {
  const { isOpen, isCollapsed, closeSidebar, toggleCollapse } = useSidebar()
  const isDesktop = useIsDesktop()
  const [active, setActive] = React.useState(activeId)

  const handleNav = (id: string) => {
    setActive(id)
    onNavClick?.(id)

    // Close mobile drawer
    if (!isDesktop) closeSidebar()

    // Smooth scroll to the matching section
    const sectionId = SECTION_MAP[id]
    if (sectionId) {
      // Small delay on mobile so drawer close animation doesn't fight scroll
      const delay = !isDesktop ? 350 : 0
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, delay)
    }
  }

  // ── Desktop Sidebar ──────────────────────────────────────
  const desktopSidebar = (
    <motion.aside
      id="sidebar"
      animate={{ width: isCollapsed ? 72 : 260 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="hidden lg:flex flex-col fixed left-0 top-[68px] bottom-0 z-40
                 bg-noir-700 dark:bg-noir-800 border-r border-noir-600 dark:border-noir-700
                 overflow-hidden"
      aria-label="Main navigation"
      role="navigation"
    >
      <SidebarContent
        active={active}
        onNav={handleNav}
        collapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
      />
    </motion.aside>
  )

  // ── Mobile Drawer ────────────────────────────────────────
  const mobileSidebar = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={closeSidebar}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.aside
            key="drawer"
            id="sidebar-mobile"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-[260px]
                       bg-noir-700 dark:bg-noir-800 border-r border-noir-600 dark:border-noir-700
                       flex flex-col overflow-hidden"
            aria-label="Mobile navigation"
            role="dialog"
            aria-modal="true"
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between px-4 h-[68px] border-b border-noir-600 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cream-100 flex items-center justify-center shadow-md">
                  <span className="font-display font-black text-noir-700 text-sm leading-none">N</span>
                </div>
                <span className="font-display font-bold text-lg text-cream-100">{APP_CONFIG.name}</span>
              </div>
              <button
                onClick={closeSidebar}
                aria-label="Close navigation menu"
                className="w-8 h-8 rounded-lg flex items-center justify-center
                           text-cream-400 hover:text-cream-100 hover:bg-noir-600
                           transition-colors focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-primary-400"
              >
                <RiCloseLine className="text-xl" />
              </button>
            </div>

            <SidebarContent
              active={active}
              onNav={handleNav}
              collapsed={false}
              onToggleCollapse={undefined}
            />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {desktopSidebar}
      {mobileSidebar}
    </>
  )
}

// ─────────────────────────────────────────────────────────
// Shared inner nav content
// ─────────────────────────────────────────────────────────
interface SidebarContentProps {
  active:            string
  onNav:             (id: string) => void
  collapsed:         boolean
  onToggleCollapse?: () => void
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  active, onNav, collapsed, onToggleCollapse,
}) => {
  const mainItems   = NAV_ITEMS.slice(0, 8)
  const bottomItems = NAV_ITEMS.slice(8)

  const NavButton = ({
    item,
    idx,
    extraDelay = 0,
  }: {
    item: typeof NAV_ITEMS[number]
    idx: number
    extraDelay?: number
  }) => {
    const Icon     = item.icon
    const isActive = active === item.id

    return (
      <motion.button
        key={item.id}
        onClick={() => onNav(item.id)}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: (idx + extraDelay) * 0.04, duration: 0.35 }}
        whileHover={{ x: collapsed ? 0 : 4 }}
        aria-label={item.label}
        aria-current={isActive ? 'page' : undefined}
        title={collapsed ? item.label : undefined}
        className={[
          'relative w-full flex items-center gap-3 rounded-xl',
          'transition-all duration-200 select-none cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
          collapsed ? 'justify-center px-2 py-3' : 'px-3 py-2.5',
          isActive
            ? 'bg-primary-500 text-white'
            : 'text-cream-400 hover:bg-noir-500 hover:text-cream-100',
        ].join(' ')}
        style={isActive ? { boxShadow: '0 0 15px rgba(108,99,255,0.3)' } : {}}
      >
        {/* Active left bar indicator */}
        {isActive && !collapsed && (
          <motion.span
            layoutId="activeBar"
            className="absolute left-0 w-1 h-7 bg-white/60 rounded-r-full"
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          />
        )}

        <Icon
          className={`flex-shrink-0 ${collapsed ? 'text-xl' : 'text-lg'}`}
          aria-hidden="true"
        />

        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-medium truncate text-left"
          >
            {item.label}
          </motion.span>
        )}

        {/* Collapsed active dot */}
        {collapsed && isActive && (
          <span className="absolute right-1 top-1 w-2 h-2 rounded-full bg-primary-300" />
        )}
      </motion.button>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <nav
        className="flex-1 overflow-y-auto no-scrollbar px-3 py-4 space-y-0.5"
        aria-label="Dashboard navigation"
      >
        {/* Main section label */}
        {!collapsed && (
          <p className="px-3 mb-2 mt-1 text-[10px] font-bold uppercase tracking-widest text-noir-300 select-none">
            Main Menu
          </p>
        )}

        {mainItems.map((item, idx) => (
          <NavButton key={item.id} item={item} idx={idx} />
        ))}

        {/* Account section label */}
        {!collapsed
          ? <p className="px-3 pt-5 pb-2 text-[10px] font-bold uppercase tracking-widest text-noir-300 select-none">Account</p>
          : <div className="h-5" />
        }

        {bottomItems.map((item, idx) => (
          <NavButton key={item.id} item={item} idx={idx} extraDelay={mainItems.length} />
        ))}
      </nav>

      {/* Collapse toggle — desktop only */}
      {onToggleCollapse && (
        <div className="border-t border-noir-600 dark:border-noir-700 px-3 py-3 flex-shrink-0">
          <motion.button
            onClick={onToggleCollapse}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={[
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl',
              'text-cream-400 hover:bg-noir-500 hover:text-cream-100',
              'transition-all duration-200 focus-visible:outline-none',
              'focus-visible:ring-2 focus-visible:ring-primary-400',
              collapsed ? 'justify-center' : '',
            ].join(' ')}
          >
            {collapsed
              ? <RiArrowRightSLine className="text-xl" />
              : <>
                  <RiArrowLeftSLine className="text-xl" />
                  <span className="text-sm font-medium">Collapse</span>
                </>
            }
          </motion.button>

          {!collapsed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 px-3 text-[10px] text-noir-300 text-center select-none"
            >
              © 2025 {APP_CONFIG.name} v{APP_CONFIG.version}
            </motion.p>
          )}
        </div>
      )}
    </div>
  )
}

export default Sidebar
