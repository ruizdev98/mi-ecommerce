import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { formatPrice } from '@/core/utils/pricing'
import { Link } from 'react-router-dom'
import GeneralButton from '@/shared/ui/GeneralButton'
import ProductModal from '../modal/ProductModal'
import styles from './ProductCard.module.css'

export default function ProductCard({product}) {

    const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className={styles.card}>

        <div className={styles.discountCircle}>
            <p className={styles.discountText}>-{product.discount}%</p>
        </div>

        <div className={styles.imageWrapper}>
            {product.stock === 0 && (
                <span className={styles.outOfStock}>Sin Stock</span>
            )}

            <Link to={`/products/${product.id}`}>
                <img src={product.image} alt={product.name} className={styles.image} />
            </Link>
        </div>

        <div className={styles.info}>
            <div className={styles.header}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.brand}>{product.brandName}</p>
            </div>

            <div className={styles.prices}>
                <span
                    className={`${styles.original} ${
                    !product.promoNote ? styles.originalStrikethrough : ''
                    }`}
                >
                    S/ {formatPrice(product.price)}
                </span>

                {product.promoNote && (
                    <p className={styles.promoNote}>{product.promoNote}</p>
                )}

                <span className={styles.discount}>
                    S/ {formatPrice(product.discountPrice)}
                </span>
            </div>
        </div>

        <GeneralButton
            size='medium'
            className={styles.addBtn}
            disabled={product.stock === 0}
            onClick={() => setIsModalOpen(true)}
        >
            <FontAwesomeIcon icon={faBagShopping} />
            Agregar
        </GeneralButton>

        {isModalOpen && (
            <ProductModal
                product={product}
                onClose={() => setIsModalOpen(false)}
            />
        )}
    </div>
  )
}
