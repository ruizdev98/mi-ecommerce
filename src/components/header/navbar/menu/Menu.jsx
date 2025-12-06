import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { capitalizeFirstLetter } from '@/core/utils/textFormat'
import Submenu from './Submenu'
import styles from '../NavBar.module.css'


export default function Menu({ 
    openSubmenu,
    toggleSubmenu,
    submenuRef,
    isMobile,
    data,
    activeMenuId,
    secondaryMenuActions
}) {
    const { departments } = data
  
    // ✅ Creamos el arreglo del menú (departamentos + ofertas)
    const menuItems = [
        ...departments,
        { id: "offers", name: "Ofertas", hasSubcategories: false }
    ]

  return (
    <ul ref={submenuRef} className={styles.menuList}>
        {menuItems.map((item) => (
            <li key={item.id} className={styles.menuItem}>
                <a
                    href="#" 
                    className={styles.menuLink}
                    onClick={(e) => {
                        e.preventDefault()
                        if (isMobile && item.hasSubcategories) {
                            openSubmenu(item.id)
                        } else if (!isMobile && item.hasSubcategories) {
                            toggleSubmenu(item.id)
                        }
                    }}
                >
                    {capitalizeFirstLetter(item.name)}
                    {item.hasSubcategories && (
                        <FontAwesomeIcon 
                            icon={isMobile ? faChevronRight : faSortDown}
                            className={styles.menuIcon}
                        />
                    )}
                </a>
                {/* 👇 Renderiza el dropdown solo en desktop */}
                {!isMobile && item.hasSubcategories && activeMenuId === item.id && (
                    <div className={styles.submenuContainer}>
                        <Submenu
                            isMobile={false}
                            data={data}
                            activeMenuId={activeMenuId}
                            {...secondaryMenuActions}
                        />
                    </div>
                )}
            </li>
        ))}
    </ul>
  )
}
