import React, { createContext, useContext, useState, useCallback } from 'react'

interface SidebarContextType {
  isOpen: boolean
  isCollapsed: boolean
  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void
  toggleCollapse: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const openSidebar    = useCallback(() => setIsOpen(true), [])
  const closeSidebar   = useCallback(() => setIsOpen(false), [])
  const toggleSidebar  = useCallback(() => setIsOpen(prev => !prev), [])
  const toggleCollapse = useCallback(() => setIsCollapsed(prev => !prev), [])

  return (
    <SidebarContext.Provider value={{
      isOpen, isCollapsed,
      openSidebar, closeSidebar, toggleSidebar, toggleCollapse,
    }}>
      {children}
    </SidebarContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider')
  return ctx
}
