import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

export default function Search({ isMobile, openSearch }) {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const query = e.target.search.value.trim()
        if (query) navigate(`/search?query=${encodeURIComponent(query)}`)
    }

  return (
    <div className={styles.search}>
        {!isMobile ? (
            <form className={styles.searchForm} onSubmit={handleSubmit}>
                <input type="text" name="search" placeholder="Buscar" className={styles.searchInput} />
                <button type="submit" className={styles.searchButton}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>
        ) : (
            <button className={styles.searchButton} onClick={openSearch}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        )}
    </div>
  )
}
