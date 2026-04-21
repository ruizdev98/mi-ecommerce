import { useNavigate } from 'react-router-dom'
import SectionTitle from '@/shared/ui/SectionTitle'
import ProductCard from '../card/ProductCard'
import GeneralButton from '@/shared/ui/GeneralButton'
import styles from './ProductSection.module.css'

export default function ProductSection({title, products, type}) {

  const navigate = useNavigate()

  // 🔥 definir query según tipo
  const getQuery = () => {
    if (type === "bestSeller") return "?bestSeller=true"
    if (type === "featured") return "?featured=true"
    return ""
  }

  return (
    <section className={`container ${styles.productSection}`}>
        <SectionTitle title={title} />
        <div className={styles.grid}>
            {products.map(product => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
        <div className={styles.viewAll}>
          <GeneralButton 
            className={styles.btn}
            onClick={() => navigate(`/products${getQuery()}`)}
          >
            Ver todos los productos
          </GeneralButton>
        </div>
    </section>
  )
}
