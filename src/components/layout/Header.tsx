import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiMenuLine,
  RiSearchLine,
  RiBellLine,
  RiCloseLine,
  RiArrowDownSLine,
  RiSettingsLine,
  RiLogoutBoxLine,
  RiUserLine,
} from 'react-icons/ri'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { IconButton } from '@/components/ui/Button'
import { useSidebar } from '@/context/SidebarContext'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { APP_CONFIG } from '@/utils/constants'

interface HeaderProps {
  className?: string
}

const NOTIFICATIONS = [
  { id: 1, title: 'New user signed up',     time: '2m ago',  read: false, color: '#6C63FF' },
  { id: 2, title: 'Revenue milestone hit',  time: '1h ago',  read: false, color: '#10B981' },
  { id: 3, title: 'Server load spike',      time: '3h ago',  read: true,  color: '#F59E0B' },
  { id: 4, title: 'Weekly report ready',    time: '1d ago',  read: true,  color: '#06B6D4' },
]

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const { toggleSidebar }           = useSidebar()
  const { isScrolled }              = useScrollPosition()
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifOpen, setNotifOpen]   = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [searchVal, setSearchVal]   = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const notifRef  = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length

  // Auto-focus search on open
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current   && !notifRef.current.contains(e.target as Node))   setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <motion.header
      initial={{ y: -68 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={[
        'fixed top-0 left-0 right-0 z-50 h-[68px]',
        'flex items-center px-4 md:px-6 gap-3',
        'transition-all duration-300',
        isScrolled
          ? 'glass-cream shadow-card'
          : 'bg-cream-100 dark:bg-noir-700 border-b border-cream-200 dark:border-noir-600',
        className,
      ].join(' ')}
      role="banner"
    >
      {/* ── Left: Logo + Hamburger ── */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Mobile hamburger */}
        <IconButton
          label="Toggle navigation menu"
          onClick={toggleSidebar}
          className="lg:hidden"
          aria-expanded={false}
          aria-controls="sidebar"
        >
          <RiMenuLine className="text-xl" />
        </IconButton>

        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
          whileHover={{ scale: 1.02 }}
          aria-label={`${APP_CONFIG.name} – ${APP_CONFIG.tagline}`}
        >
          {/* Logo mark */}
          <div className="w-8 h-8 rounded-xl bg-noir-700 dark:bg-cream-100 flex items-center justify-center shadow-md flex-shrink-0">
            <span className="font-display font-black text-cream-100 dark:text-noir-700 text-sm leading-none">
              N
            </span>
          </div>
          <span className="font-display font-bold text-lg text-noir-700 dark:text-cream-100 hidden sm:block">
            {APP_CONFIG.name}
          </span>
        </motion.a>
      </div>

      {/* ── Centre: Search ── */}
      <div className="flex-1 max-w-lg mx-auto hidden md:flex">
        <div className="relative w-full">
          <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream-600 dark:text-noir-200 text-base" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search anything…"
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            className="input-base pl-10 pr-4 h-10"
            aria-label="Search dashboard"
          />
        </div>
      </div>

      {/* ── Right: Actions ── */}
      <div className="flex items-center gap-1 md:gap-2 ml-auto">
        {/* Mobile search toggle */}
        <IconButton label="Open search" className="md:hidden" onClick={() => setSearchOpen(p => !p)}>
          {searchOpen ? <RiCloseLine className="text-xl" /> : <RiSearchLine className="text-xl" />}
        </IconButton>

        {/* Theme Toggle */}
        <ThemeToggle className="hidden sm:flex" />

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <IconButton
            label={`${unreadCount} unread notifications`}
            onClick={() => setNotifOpen(p => !p)}
            aria-haspopup="true"
            aria-expanded={notifOpen}
          >
            <RiBellLine className="text-xl" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none"
                aria-hidden="true"
              >
                {unreadCount}
              </motion.span>
            )}
          </IconButton>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 w-80 bg-white dark:bg-noir-500 rounded-2xl shadow-card-lg border border-cream-200 dark:border-noir-400 overflow-hidden z-50"
                role="dialog"
                aria-label="Notifications"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-cream-200 dark:border-noir-400">
                  <h2 className="font-semibold text-sm text-noir-700 dark:text-cream-100">Notifications</h2>
                  <button className="text-xs text-primary-500 hover:text-primary-600 font-medium">Mark all read</button>
                </div>
                <ul>
                  {NOTIFICATIONS.map(n => (
                    <li key={n.id}>
                      <motion.button
                        whileHover={{ backgroundColor: 'rgba(108,99,255,0.04)' }}
                        className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors ${!n.read ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''}`}
                      >
                        <span
                          className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: n.read ? '#CEC6B5' : n.color }}
                        />
                        <span className="flex-1 min-w-0">
                          <span className={`block text-sm ${!n.read ? 'font-semibold text-noir-600 dark:text-cream-100' : 'text-noir-400 dark:text-cream-500'}`}>
                            {n.title}
                          </span>
                          <span className="text-xs text-cream-600 dark:text-noir-200">{n.time}</span>
                        </span>
                      </motion.button>
                    </li>
                  ))}
                </ul>
                <div className="px-4 py-2.5 border-t border-cream-200 dark:border-noir-400 text-center">
                  <button className="text-xs text-primary-500 font-medium hover:underline">View all notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <motion.button
            onClick={() => setProfileOpen(p => !p)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-cream-200 dark:hover:bg-noir-500 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="User menu"
            aria-haspopup="true"
            aria-expanded={profileOpen}
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-sm font-bold shadow-glow-sm flex-shrink-0">
              A
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-noir-600 dark:text-cream-100 leading-tight">Aayush</p>
              <p className="text-[10px] text-cream-600 dark:text-noir-200 leading-tight">Admin</p>
            </div>
            <RiArrowDownSLine
              className={`hidden md:block text-cream-600 dark:text-noir-200 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
            />
          </motion.button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 w-52 bg-white dark:bg-noir-500 rounded-2xl shadow-card-lg border border-cream-200 dark:border-noir-400 overflow-hidden z-50"
                role="menu"
              >
                <div className="px-4 py-3 border-b border-cream-200 dark:border-noir-400">
                  <p className="font-semibold text-sm text-noir-700 dark:text-cream-100">Aayush</p>
                  <p className="text-xs text-cream-600 dark:text-noir-200">aayush@noir.app</p>
                </div>
                {[
                  { icon: <RiUserLine />,       label: 'My Profile'    },
                  { icon: <RiSettingsLine />,    label: 'Settings'      },
                  { icon: <RiLogoutBoxLine />,   label: 'Sign Out', danger: true },
                ].map(item => (
                  <motion.button
                    key={item.label}
                    whileHover={{ backgroundColor: 'rgba(108,99,255,0.06)' }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                      item.danger
                        ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10'
                        : 'text-noir-500 dark:text-cream-200'
                    }`}
                    role="menuitem"
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile Search Bar ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 px-4 py-3 glass-cream border-b border-cream-200 dark:border-noir-600 md:hidden"
          >
            <div className="relative">
              <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream-600 dark:text-noir-200 text-base" />
              <input
                ref={searchRef}
                type="search"
                placeholder="Search anything…"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                className="input-base pl-10 h-10 w-full"
                aria-label="Mobile search"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
