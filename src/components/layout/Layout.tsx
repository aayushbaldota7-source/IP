import React from 'react'
import { motion } from 'framer-motion'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { useSidebar } from '@/context/SidebarContext'
import { useIsDesktop } from '@/hooks/useMediaQuery'

interface LayoutProps {
  children: React.ReactNode
}

/**
 * Root layout that wires together Header + Sidebar + main content area.
 * Handles the responsive content shift when sidebar is expanded/collapsed.
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isCollapsed } = useSidebar()
  const isDesktop = useIsDesktop()

  // On desktop, shift content to the right of the sidebar
  const sidebarOffset = isDesktop
    ? isCollapsed ? 72 : 260
    : 0

  return (
    <div className="min-h-screen bg-cream-100 dark:bg-noir-700">
      {/* Fixed Header */}
      <Header />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <motion.main
        id="main-content"
        animate={{ marginLeft: sidebarOffset }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen pt-[68px]"
        role="main"
        tabIndex={-1}
      >
        {/* Skip to content link (accessibility) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4
                     focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500
                     focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>

        {/* Page content */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto"
        >
          {children}
        </motion.div>
      </motion.main>
    </div>
  )
}

export default Layout
