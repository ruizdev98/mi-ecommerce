import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import styles from '../Header.module.css'

export default function Search({ isMobile, isSearchOpen, openSearch, closeSearch }) {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const query = e.target.search.value.trim()
        if (!query) return
        navigate(`/search?query=${encodeURIComponent(query)}`)
        e.target.reset()
        if (isMobile && closeSearch) closeSearch()
    }

    // 🔍 Si está en mobile y el buscador está cerrado
    if (isMobile && !isSearchOpen) {
        return (
            <div className={styles.search}>
                <button 
                    className={styles.searchButton} 
                    onClick={openSearch} 
                    aria-label="Abrir búsqueda"
                >
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        )
    }

    return (
        <div className={`${styles.search} ${isSearchOpen ? styles.open : ''}`}>
            {isMobile ? (
                <div className={styles.searchPopup}>
                    <div className={styles.searchPopupContent}>
                        <form className={styles.searchPopupForm} onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="search"
                                placeholder="Buscar productos..."
                                autoFocus
                                className={styles.searchPopupInput}
                            />
                            <button 
                                type="submit" 
                                className={styles.searchPopupSubmit} 
                                aria-label="Buscar"
                            >
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                            <button 
                                type="button" 
                                className={styles.searchPopupClose} 
                                onClick={closeSearch}
                                aria-label="Cerrar búsqueda"
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <form className={styles.searchForm} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="search"
                        placeholder="Buscar"
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            )}
        </div>
    )
}
