import { useState, useRef } from 'react'

export default function useHeaderState(logout) {
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen]           = useState(false)
    const [isSearchOpen, setIsSearchOpen]             = useState(false)
    const [activeMenuId, setActiveMenuId]             = useState(null)
    const userDropdownRef                             = useRef(null)
    const menuRef                                     = useRef(null)
    const submenuRef                                  = useRef(null)

    // Dropdown
    const closeUserDropdown   = () => setIsUserDropdownOpen(false)
    const toggleUserDropdown  = () => setIsUserDropdownOpen((prev) => !prev)
    const handleLinkClick     = () => closeUserDropdown()

    // Buscador
    const openSearch  = () => setIsSearchOpen(true)
    const closeSearch = () => setIsSearchOpen(false)

    // Sidebar
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev)
    const closeSidebar  = () => {
      setIsSidebarOpen(false)
      setActiveMenuId(null)
    }

    // Submenú
    const openSubmenu   = (id) => setActiveMenuId(id)
    const closeSubmenu  = () => setActiveMenuId(null)
    const toggleSubmenu = (id) => setActiveMenuId(prev => (prev === id ? null : id))    

    // Logout con manejo de errores
    const handleLogout = async () => {
        try {
            await logout()
            closeUserDropdown()
        } catch (err) {
            console.error("Error al cerrar sesión:", err)
        }
    }

  return {
    // Estados
    isUserDropdownOpen,
    isSidebarOpen,
    isSearchOpen,
    activeMenuId,
    userDropdownRef,
    menuRef,
    submenuRef,

    // Métodos
    closeUserDropdown,
    toggleUserDropdown,
    handleLinkClick,
    openSearch,
    closeSearch,
    toggleSidebar,
    closeSidebar,
    openSubmenu,
    closeSubmenu,
    toggleSubmenu,
    handleLogout
  }
}