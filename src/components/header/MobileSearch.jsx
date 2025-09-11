import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

export default function MobileSearch({ closeSearch }) {
    const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const query = e.target.search.value.trim()
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`)
      closeSearch()
    }
  }

  return (
    <div className={styles.searchPopup}>
        <div className={styles.searchPopupContent}>
            <form className={styles.searchPopupForm} onSubmit={handleSubmit}>
                <input type="text" name="search" placeholder="Buscar productos..." autoFocus className={styles.searchPopupInput} />
                <button type="submit" className={styles.searchPopupSubmit}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
                <button type="button" className={styles.searchPopupClose} onClick={closeSearch}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </form>
        </div>
    </div>
  )
}
