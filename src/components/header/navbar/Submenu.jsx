import { capitalizeFirstLetter } from '@/core/utils/textFormat'
import AccountAction from './actions/AccountAction'
import styles from './NavBar.module.css'

export default function Submenu({ 
    user, 
    handleLinkClick, 
    handleLogout,
    closeSidebar, 
    isMobile,
    data,
    activeMenuId
}) {

    const accountActions = {
        user, 
        handleLinkClick, 
        handleLogout,
        closeSidebar,
        isMobile
    }

    const { categories, departmentCategories, loading } = data

    if (loading || !activeMenuId) return <p>Cargando categorías...</p>

    // Encontrar las categorías relacionadas con el departamento actual
    const relatedCategoryIds = departmentCategories
        .filter(dc => dc.departmentId === activeMenuId)
        .map(dc => dc.categoryId)

    // Filtrar las categorías usando los IDs relacionados
    const filteredCategories = categories.filter(cat => relatedCategoryIds.includes(cat.id))

  return (
    <>
        { activeMenuId === 'account' ? (
            isMobile && (
                // 👉 Si el submenu activo es "Cuenta"
                <AccountAction {...accountActions} />
            )
        ) : (
        // 👉 Si el submenu es un departamento
        <div className={styles.submenu}>
            {/* Lista de categorías del departamento */}
            <ul className={styles.submenuList}>
                {filteredCategories.length > 0 ? (
                    filteredCategories.map(cat => (
                        <li key={cat.id} className={styles.submenuItem}>
                            <a href="#" className={styles.submenuLink}>
                                {capitalizeFirstLetter(cat.name)}
                            </a>
                        </li>
                    ))
                ) : (
                    <p className={styles.sidebarSubmenuEmpty}>
                        No hay categorías disponibles.
                    </p>
                )}
            </ul>
        </div>
        )}
    </>
  )
}
