import { formatPrice } from '@/core/utils/pricing'
import styles from './OrderItemsList.module.css'

export default function OrderItemsList({ 
    items,
    showQuantityControls = false,
    showRemoveButton = false,
    showPrice = true,
    onIncrease,
    onDecrease,
    onRemove,
    }) {

    if (!items?.length) return null

  return (
    <section className={styles.items}>
      {items.map(item => (
        <div key={item.variantId} className={styles.item}>
          <img className={styles.image} src={item.image} alt={item.productName || item.name} />

          <div className={styles.info}>
            <p className={styles.name}>{item.productName || item.name}</p>
            <p className={styles.brand}>{item.brandName}</p>
            <p className={styles.sku}>{item.sku}</p>

            <div className={styles.colorSize}>
              <span>Color: <strong>{item.colorName || item.color}</strong></span>
              <div className={styles.verticalLine}></div>
              <span>Talla: <strong>{item.sizeName || item.size}</strong></span>
            </div>

            {!showQuantityControls && (
                <p className={styles.quantity}>Cantidad: {item.quantity}</p>
            )}
          </div>

          {showPrice && (
                <strong className={styles.price}>S/ {formatPrice(item.total)}</strong>
          )}

          {showQuantityControls && (
            <div className={styles.qtyControls}>
                <button onClick={() => onDecrease(item)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => onIncrease(item)}>+</button>
            </div>
          )}

          {showRemoveButton && (
            <button className={styles.removeBtn} onClick={() => onRemove(item)}>
                Eliminar
            </button>
          )}
          
        </div>
      ))}
    </section>
  )
}
