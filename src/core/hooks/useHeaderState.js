import { useState, useRef } from 'react'

export default function useHeaderState(logout) {
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
    const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen]           = useState(false)
    const [isSearchOpen, setIsSearchOpen]             = useState(false)
    const [activeMenuId, setActiveMenuId]             = useState(null)
    const userDropdownRef                             = useRef(null)
    const menuRef                                     = useRef(null)
    const submenuRef                                  = useRef(null)
    const cartDropdownRef                             = useRef(null)

    // User Dropdown
    const closeUserDropdown   = () => setIsUserDropdownOpen(false)
    const toggleUserDropdown  = () => setIsUserDropdownOpen((prev) => !prev)
    const handleLinkClick     = () => closeUserDropdown()

    // Cart Dropdown
    const closeCartDropdown   = () => setIsCartDropdownOpen(false)
    const toggleCartDropdown  = () => setIsCartDropdownOpen((prev) => !prev)

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
    isCartDropdownOpen,
    isSidebarOpen,
    isSearchOpen,
    activeMenuId,
    userDropdownRef,
    menuRef,
    submenuRef,
    cartDropdownRef,

    // Métodos
    closeUserDropdown,
    toggleUserDropdown,
    handleLinkClick,
    closeCartDropdown,
    toggleCartDropdown,
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