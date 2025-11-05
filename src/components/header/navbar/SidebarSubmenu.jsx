import { capitalizeFirstLetter } from '@/core/utils/textFormat'
import styles from './NavBar.module.css'
import AccountAction from './actions/AccountAction'

export default function SidebarSubmenu({ 
    isMobile,
    user, 
    handleLinkClick, 
    handleLogout,
    closeSidebar, 
    activeDepartmentId,
    data 
}) {

    const accountActions = {
        isMobile,
        user, 
        handleLinkClick, 
        handleLogout,
        closeSidebar
    }

    const { categories, departmentCategories, loading } = data

    if (loading || !activeDepartmentId) return <p>Cargando categorías...</p>

    // Encontrar las categorías relacionadas con el departamento actual
    const relatedCategoryIds = departmentCategories
        .filter(dc => dc.departmentId === activeDepartmentId)
        .map(dc => dc.categoryId)

    // Filtrar las categorías usando los IDs relacionados
    const filteredCategories = categories.filter(cat => relatedCategoryIds.includes(cat.id))

  return (
    <>
        {activeDepartmentId === 'account' ? (
            // 👉 Si el submenu activo es "Cuenta"
            <AccountAction {...accountActions}/>

        ) : (
            // 👉 Si el submenu es un departamento
            <div className={styles.subSidebar}>
                {/* Lista de categorías del departamento */}
                <ul className={styles.sidebarSubmenuList}>
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map(cat => (
                            <li key={cat.id} className={styles.sidebarSubmenuItem}>
                                <a href="#" className={styles.sidebarSubmenuLink}>
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
