import MainLayout from './MainLayout.jsx'
import AdminLayout from './AdminLayout.jsx'

const isAdmin = window.location.pathname.startsWith("/admin");

export const Layout = isAdmin ? AdminLayout : MainLayout;