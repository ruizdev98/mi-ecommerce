import { formatPrice } from '@/core/utils/pricing'
import styles from './OrderItemsList.module.css'

export default function OrderItemsList({ items }) {
    if (!items?.length) return null
  return (
    <section className={styles.items}>
      {items.map(item => (
        <div key={item.variantId} className={styles.item}>
          <img className={styles.image} src={item.image} alt={item.productName} />
          
          <div className={styles.info}>
            <p className={styles.name}>{item.productName}</p>
            <p className={styles.brand}>{item.brandName}</p>
            <p className={styles.sku}>{item.sku}</p>
            <div className={styles.colorSize}>
              <span>Color: <strong>{item.colorName}</strong></span>
              <div className={styles.verticalLine}></div>
              <span>Talla: <strong>{item.sizeName}</strong></span>
            </div>
            <p className={styles.quantity}>Cantidad: {item.quantity}</p>
          </div>

          <strong className={styles.price}>S/ {formatPrice(item.total)}</strong>
        </div>
      ))}
    </section>
  )
}
