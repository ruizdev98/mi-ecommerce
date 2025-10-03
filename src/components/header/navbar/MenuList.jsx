import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { useData } from "@/core/hooks/useData"
import useIsMobile from '@/core/hooks/useIsMobile'
import styles from './NavBar.module.css'

export default function MenuList() {
    const { departments, categories, loading, error } = useData()
    const isMobile = useIsMobile()

    if (loading) return <p>Cargando menú...</p>

    const menuItems = [
        ...departments,
        { id: "offers", name: "Ofertas", isVirtual: true }
    ]

    const listClass         = isMobile ? styles.sidebarList : styles.menuList
    const itemClass         = isMobile ? styles.sidebarItem : styles.menuItem
    const linkClass         = isMobile ? styles.sidebarLink : styles.menuLink
    const icon              = isMobile ? faChevronRight : faSortDown
    const iconClass         = isMobile ? styles.sidebarIcon : styles.menuIcon

  return (
    <ul className={listClass}>
        {menuItems.map((item) => (
            <li key={item.id} className={itemClass}>
                <a href="#" className={linkClass}>
                    {item.name}
                    {item.hasSubcategories && (
                        <FontAwesomeIcon icon={icon} className={iconClass} />
                    )}
                </a>
            </li>
        ))}
    </ul>
  )
}
