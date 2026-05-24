// ─── Navigation Items ─────────────────────────────────────
import {
  RiDashboardLine,
  RiBarChartLine,
  RiSettings3Line,
  RiUserLine,
  RiFileTextLine,
  RiShoppingBagLine,
  RiCalendarLine,
  RiMessageLine,
  RiHeartLine,
  RiStarLine,
} from 'react-icons/ri'

export const NAV_ITEMS = [
  { id: 'dashboard',  label: 'Dashboard',  icon: RiDashboardLine,  href: '#dashboard'  },
  { id: 'analytics',  label: 'Analytics',  icon: RiBarChartLine,   href: '#analytics'  },
  { id: 'projects',   label: 'Projects',   icon: RiFileTextLine,   href: '#projects'   },
  { id: 'products',   label: 'Products',   icon: RiShoppingBagLine,href: '#products'   },
  { id: 'calendar',   label: 'Calendar',   icon: RiCalendarLine,   href: '#calendar'   },
  { id: 'messages',   label: 'Messages',   icon: RiMessageLine,    href: '#messages'   },
  { id: 'favourites', label: 'Favourites', icon: RiHeartLine,      href: '#favourites' },
  { id: 'reviews',    label: 'Reviews',    icon: RiStarLine,       href: '#reviews'    },
  { id: 'profile',    label: 'Profile',    icon: RiUserLine,       href: '#profile'    },
  { id: 'settings',   label: 'Settings',   icon: RiSettings3Line,  href: '#settings'   },
] as const

// ─── Stats Data ───────────────────────────────────────────
export const STATS_DATA = [
  { id: 1, label: 'Total Users',     value: 84200,   suffix: '+',  prefix: '',  color: '#6C63FF', change: '+12.5%', trend: 'up'   },
  { id: 2, label: 'Revenue',         value: 248000,  suffix: '',   prefix: '$', color: '#10B981', change: '+8.2%',  trend: 'up'   },
  { id: 3, label: 'Active Projects', value: 342,     suffix: '',   prefix: '',  color: '#F59E0B', change: '+3.7%',  trend: 'up'   },
  { id: 4, label: 'Satisfaction',    value: 98,      suffix: '%',  prefix: '',  color: '#EF4444', change: '+1.2%',  trend: 'up'   },
] as const

// ─── Hero Slides ──────────────────────────────────────────
export const HERO_SLIDES = [
  {
    id: 1,
    title: 'Design with Precision',
    subtitle: 'Build premium dashboards that scale beautifully across every device.',
    badge: 'New Release',
    cta: 'Get Started',
    bg: 'from-noir-700 via-noir-600 to-primary-600',
    accent: '#6C63FF',
  },
  {
    id: 2,
    title: 'Analyze with Clarity',
    subtitle: 'Real-time insights, beautiful charts, and actionable metrics at a glance.',
    badge: 'Analytics',
    cta: 'Explore Now',
    bg: 'from-noir-700 via-noir-500 to-secondary-600',
    accent: '#8B5CF6',
  },
  {
    id: 3,
    title: 'Move at Lightning Speed',
    subtitle: 'Optimized for performance — from zero to production in minutes.',
    badge: 'Performance',
    cta: 'Learn More',
    bg: 'from-noir-700 via-noir-600 to-primary-800',
    accent: '#A78BFA',
  },
  {
    id: 4,
    title: 'Collaborate Seamlessly',
    subtitle: 'Invite your team, assign roles, and ship together with zero friction.',
    badge: 'Team',
    cta: 'Start Free',
    bg: 'from-noir-700 via-noir-400 to-noir-500',
    accent: '#6C63FF',
  },
] as const

// ─── Feature Cards ────────────────────────────────────────
export const FEATURES = [
  {
    id: 1,
    title: 'Smart Analytics',
    description: 'Deep dive into your metrics with AI-powered insights and real-time dashboards.',
    icon: '📊',
    color: '#6C63FF',
  },
  {
    id: 2,
    title: 'Team Collaboration',
    description: 'Work together seamlessly with live cursors, comments, and shared workspaces.',
    icon: '👥',
    color: '#8B5CF6',
  },
  {
    id: 3,
    title: 'Automation Engine',
    description: 'Automate repetitive tasks and workflows with our no-code automation builder.',
    icon: '⚡',
    color: '#F59E0B',
  },
  {
    id: 4,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption, SSO, and granular permissions keep your data safe.',
    icon: '🔒',
    color: '#10B981',
  },
  {
    id: 5,
    title: 'Custom Integrations',
    description: 'Connect with 500+ apps via our marketplace or build your own with our API.',
    icon: '🔗',
    color: '#EF4444',
  },
  {
    id: 6,
    title: 'Global CDN',
    description: 'Lightning-fast delivery from 200+ edge nodes ensures sub-50ms response times.',
    icon: '🌍',
    color: '#06B6D4',
  },
]

// ─── Image Slider Items ───────────────────────────────────
export const SLIDER_ITEMS = [
  { id: 1, title: 'Design Systems',    tag: 'UI/UX',        emoji: '🎨', bg: '#6C63FF', desc: 'Scalable, consistent design tokens and component libraries.' },
  { id: 2, title: 'Data Pipelines',    tag: 'Engineering',  emoji: '🔧', bg: '#8B5CF6', desc: 'Real-time ETL pipelines processing millions of events daily.' },
  { id: 3, title: 'Growth Metrics',    tag: 'Marketing',    emoji: '📈', bg: '#F59E0B', desc: 'Funnel analysis, A/B testing, and cohort-based retention.' },
  { id: 4, title: 'API Gateway',       tag: 'Backend',      emoji: '⚙️', bg: '#10B981', desc: 'Rate-limited, versioned REST and GraphQL endpoints.' },
  { id: 5, title: 'Mobile Apps',       tag: 'Product',      emoji: '📱', bg: '#EF4444', desc: 'Native-like experiences with React Native and Expo.' },
  { id: 6, title: 'Content Hub',       tag: 'CMS',          emoji: '📝', bg: '#06B6D4', desc: 'Headless CMS with rich-text editor and media manager.' },
]

// ─── Animated Card Items ──────────────────────────────────
export const ANIMATED_CARDS = [
  {
    id: 1,
    title: 'User Research',
    category: 'Research',
    progress: 78,
    team: 4,
    dueDate: 'Jun 12',
    priority: 'High',
    color: '#6C63FF',
    emoji: '🔍',
  },
  {
    id: 2,
    title: 'Brand Identity',
    category: 'Design',
    progress: 92,
    team: 3,
    dueDate: 'Jun 5',
    priority: 'Critical',
    color: '#8B5CF6',
    emoji: '🎯',
  },
  {
    id: 3,
    title: 'Backend API',
    category: 'Engineering',
    progress: 55,
    team: 6,
    dueDate: 'Jun 20',
    priority: 'Medium',
    color: '#F59E0B',
    emoji: '🛠️',
  },
  {
    id: 4,
    title: 'Launch Campaign',
    category: 'Marketing',
    progress: 35,
    team: 5,
    dueDate: 'Jul 1',
    priority: 'High',
    color: '#10B981',
    emoji: '🚀',
  },
  {
    id: 5,
    title: 'QA & Testing',
    category: 'QA',
    progress: 67,
    team: 2,
    dueDate: 'Jun 18',
    priority: 'Medium',
    color: '#EF4444',
    emoji: '✅',
  },
  {
    id: 6,
    title: 'Documentation',
    category: 'Docs',
    progress: 80,
    team: 2,
    dueDate: 'Jun 8',
    priority: 'Low',
    color: '#06B6D4',
    emoji: '📚',
  },
]

// ─── Framer Motion Variants ───────────────────────────────
export const fadeInUp = {
  initial:   { opacity: 0, y: 30 },
  animate:   { opacity: 1, y: 0  },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

export const fadeInLeft = {
  initial:   { opacity: 0, x: -30 },
  animate:   { opacity: 1, x: 0   },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const scaleIn = {
  initial:   { opacity: 0, scale: 0.9 },
  animate:   { opacity: 1, scale: 1   },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
}

// ─── App Config ───────────────────────────────────────────
export const APP_CONFIG = {
  name: 'Noir',
  tagline: 'Premium SaaS Dashboard',
  version: '1.0.0',
  author: 'Noir Team',
}
