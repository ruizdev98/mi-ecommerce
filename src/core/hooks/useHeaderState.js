import { useState, useRef } from 'react'

export default function useHeaderState(logout) {
    const [isDropdownOpen, setIsDropdownOpen]         = useState(false)
    const [isSidebarOpen, setIsSidebarOpen]           = useState(false)
    const [isSearchOpen, setIsSearchOpen]             = useState(false)
    const [activeDepartmentId, setActiveDepartmentId] = useState(null)
    const dropdownRef                                 = useRef(null)

    // Dropdown
    const closeDropdown     = () => setIsDropdownOpen(false)
    const toggleDropdown    = () => setIsDropdownOpen((prev) => !prev)
    const handleLinkClick   = () => closeDropdown()

    // Buscador
    const openSearch        = () => setIsSearchOpen(true)
    const closeSearch       = () => setIsSearchOpen(false)

    // Sidebar
    const toggleSidebar     = () => setIsSidebarOpen(prev => !prev)
    const closeSidebar      = () => {
      setIsSidebarOpen(false)
      setActiveDepartmentId(null)
    }

    // Submenú del sidebar
    const openSidebarSubmenu    = (id) => setActiveDepartmentId(id)
    const closeSidebarSubmenu   = () => setActiveDepartmentId(null)

    // Logout con manejo de errores
    const handleLogout = async () => {
        try {
            await logout()
            closeDropdown()
        } catch (err) {
            console.error("Error al cerrar sesión:", err)
        }
    }

  return {
    // Estados
    isDropdownOpen,
    isSidebarOpen,
    isSearchOpen,
    activeDepartmentId,
    dropdownRef,

    // Métodos
    closeDropdown,
    toggleDropdown,
    handleLinkClick,
    openSearch,
    closeSearch,
    toggleSidebar,
    closeSidebar,
    openSidebarSubmenu,
    closeSidebarSubmenu,
    handleLogout
  }
}