import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { formatPrice } from '@/core/utils/pricing'
import styles from './OrderItemsList.module.css'

export default function OrderItemsList({ 
    items,
    showQuantityControls = false,
    showRemoveButton = false,
    showPrice = true,
    getOriginalPrice,
    getFinalPrice,
    onIncrease,
    onDecrease,
    onRemove,
    }) {

    if (!items?.length) return null

  return (
    <section className={styles.items}>
        {items.map(item => {
            const original = getOriginalPrice?.(item)
            const final = getFinalPrice?.(item)

            return (
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
                    
                    {showQuantityControls && (
                        <div className={styles.qtyControls}>
                            <button onClick={() => onDecrease(item)}><FontAwesomeIcon icon={faMinus} /></button>
                            <span>{item.quantity}</span>
                            <button onClick={() => onIncrease(item)}><FontAwesomeIcon icon={faPlus} /></button>
                        </div>
                    )}

                    {showRemoveButton && (
                        <button className={styles.removeBtn} onClick={() => onRemove(item)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    )}

                    {showPrice && (
                        <div className={styles.priceBlock}>
                            {original && final && original !== final && (
                                <p className={styles.originalPrice}>
                                    S/ {original.toFixed(2)}
                                </p>
                            )}
                            <p className={styles.price}>
                                S/ {(final ?? item.total).toFixed(2)}
                            </p>
                        </div>
                    )}
                </div>
            )
        })}
    </section>
  )
}
