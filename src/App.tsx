import { ThemeProvider }  from '@/context/ThemeContext'
import { SidebarProvider } from '@/context/SidebarContext'
import { Layout }          from '@/components/layout/Layout'
import Dashboard           from '@/pages/Dashboard'

/**
 * Root application component.
 * Wraps the app in theme + sidebar context providers.
 */
function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Layout>
          <Dashboard />
        </Layout>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
