import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { capitalizeFirstLetter } from '@/core/utils/textFormat'
import styles from './NavBar.module.css'

export default function MenuList({ isMobile, openSidebarSubmenu, data }) {
    const { departments } = data
  
    // ✅ Creamos el arreglo del menú (departamentos + ofertas)
    const menuItems = [
        ...departments,
        { id: "offers", name: "Ofertas", hasSubcategories: false }
    ]

    const listClass = isMobile ? styles.sidebarList : styles.menuList
    const itemClass = isMobile ? styles.sidebarItem : styles.menuItem
    const linkClass = isMobile ? styles.sidebarLink : styles.menuLink
    const iconClass = isMobile ? styles.sidebarIcon : styles.menuIcon

  return (
    <ul className={listClass}>
        {menuItems.map((item) => (
            <li key={item.id} className={itemClass}>
                <a 
                    href="#" 
                    className={linkClass}
                    onClick={(e) => {
                        if (isMobile && item.hasSubcategories) {
                            e.preventDefault()
                            openSidebarSubmenu(item.id) // Abrir SubSidebar con id del departamento
                        }
                    }}
                >
                    {capitalizeFirstLetter(item.name)}
                    {item.hasSubcategories && (
                        <FontAwesomeIcon 
                            icon={isMobile ? faChevronRight : faSortDown}
                            className={iconClass} 
                        />
                    )}
                </a>
            </li>
        ))}
    </ul>
  )
}
