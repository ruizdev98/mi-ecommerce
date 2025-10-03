import { useState, useRef } from 'react'

export default function useHeaderState(logout) {
    const [isDropdownOpen, setIsDropdownOpen]   = useState(false)
    const [isSidebarOpen, setIsSidebarOpen]     = useState(false)
    const [isSearchOpen, setIsSearchOpen]       = useState(false)
    const dropdownRef                           = useRef(null)

    // Dropdown
    const toggleDropdown    = () => setIsDropdownOpen(prev => !prev)
    const handleLinkClick   = () => setIsDropdownOpen(false)

    // Buscador
    const openSearch        = () => setIsSearchOpen(true)
    const closeSearch       = () => setIsSearchOpen(false)

    // Menú lateral
    const toggleSidebar     = () => setIsSidebarOpen(prev => !prev)
    const closeSidebar      = () => setIsSidebarOpen(false)

    // Logout con manejo de errores
    const handleLogout = async () => {
        try {
            await logout()
            setIsDropdownOpen(false)
        } catch (err) {
            console.error("Error al cerrar sesión:", err)
        }
    }

  return {
    // Estados
    isDropdownOpen,
    isSidebarOpen,
    isSearchOpen,
    dropdownRef,

    // Métodos
    toggleDropdown,
    handleLinkClick,
    openSearch,
    closeSearch,
    toggleSidebar,
    closeSidebar,
    handleLogout
  }
}