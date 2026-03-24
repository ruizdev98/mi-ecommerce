import { useNavigate } from "react-router-dom"
import { capitalizeFirstLetter } from '@/core/utils/textFormat'
import SectionTitle from '../../../shared/ui/SectionTitle'
import styles from './Categories.module.css'

export default function Categories({title, categories}) {
  const navigate = useNavigate()

  const handleClick = (cat) => {
    navigate(`/categories/${cat.id}`)
  }
  return (
    <section className={`container ${styles.categories}`}>
      <SectionTitle title={title} />
      <div className={styles.grid}>
        {categories.map(cat => (
          <div 
            key={cat.id} 
            className={styles.card}
            onClick={() => handleClick(cat)}
          >
            <img 
              src={cat.image} 
              alt={cat.name} 
              className={styles.image}
            />
            <div className={styles.overlay}>
              <span className={styles.name}>{capitalizeFirstLetter(cat.name)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
