import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { getItemTotals, formatPrice } from '@/core/utils/pricing'
import styles from './OrderItemsList.module.css'

export default function OrderItemsList({ 
    items,
    showQuantityControls = false,
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
            const { total, originalTotal, hasDiscount } = getItemTotals(item)

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

                    {showPrice && (
                        <div className={styles.priceBlock}>
                            {hasDiscount && (
                                <p className={styles.originalPrice}>
                                    S/ {formatPrice(originalTotal)}
                                </p>
                            )}

                            <p className={styles.price}>
                                S/ {formatPrice(total)}
                            </p>
                        </div>
                    )}

                    {showQuantityControls && (
                        <div className={styles.qtyControls}>
                            <div className={styles.buttonDI}>
                                <button onClick={() => onDecrease(item)}><FontAwesomeIcon icon={faMinus} /></button>
                                <span> {item.quantity} </span>
                                <button onClick={() => onIncrease(item)}><FontAwesomeIcon icon={faPlus} /></button>
                            </div>
                            <button className={styles.removeBtn} onClick={() => onRemove(item)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    )}                    
                </div>
            )
        })}
    </section>
  )
}
