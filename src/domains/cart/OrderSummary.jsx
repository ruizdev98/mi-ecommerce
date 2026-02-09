import { getItemTotals, formatPrice } from '@/core/utils/pricing'
import GeneralButton from '../../shared/ui/GeneralButton'
import styles from './OrderSummary.module.css'

export default function OrderSummary({
    cartItems = [],
    totalItems,
    subtotal,
    totalDiscount,
    totalPrice,
    deliveryCost = 0,
    showDelivery = false,
    showItems = false,
    showGeneralButton = false,
    showCancelButton = false,
    generalButtonText,
    cancelButtonText,
    onButtonClick,
    onCancelClick,
    buttonDisabled = false
}) {

    /* 🧠 CÁLCULOS INTERNOS (fallback) */
    const calculated = cartItems.reduce(
        (acc, item) => {
            const {
                total,
                originalTotal,
                hasDiscount
            } = getItemTotals(item)

            acc.totalItems += item.quantity
            acc.subtotal += originalTotal
            acc.totalPrice += total
            if (hasDiscount) {
                acc.totalDiscount += originalTotal - total
            }

            return acc
        },
        {
            totalItems: 0,
            subtotal: 0,
            totalDiscount: 0,
            totalPrice: 0
        }
    )

    // 🔹 usa props si vienen, sino lo calculado
    const finalTotalItems = totalItems ?? calculated.totalItems
    const finalSubtotal = subtotal ?? calculated.subtotal
    const finalDiscount = totalDiscount ?? calculated.totalDiscount
    const finalTotalPrice = totalPrice ?? calculated.totalPrice
    
  return (
    <div className={styles.orderSummary}>
        <h3 className={styles.title}>Resumen del Pedido</h3>

        <p className={styles.productsCount}>
            {finalTotalItems} Productos
        </p>

        {/* 🔹 ITEMS (ShippingPage) */}
        {showItems && (
            <div className={styles.items}>
                <div className={styles.divider} />

                {cartItems.map(item => {
                    const {
                        total,
                        hasDiscount,
                        originalTotal
                    } = getItemTotals(item)

                    return (
                        
                        <div key={item.variantId} className={styles.item}>
                            <img
                                src={item.image}
                                alt={item.name}
                                className={styles.image}
                            />
                            <div className={styles.info}>
                                <p className={styles.name}>{item.name}</p>
                                <p className={styles.brand}>{item.brandName}</p>
                                
                                <div className={styles.row}>
                                    <p className={styles.qty}>Cantidad: {item.quantity}</p>

                                    {/* 💰 PRECIOS */}
                                    <div className={styles.priceBlock}>
                                        {hasDiscount && (
                                            <span className={styles.originalPrice}>
                                            Normal: S/ {formatPrice(originalTotal)}
                                            </span>
                                        )}
                                        <span className={styles.finalPrice}>
                                            S/ {formatPrice(total)}
                                        </span>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    )
                })}
            </div>
        )}
        
        <div className={styles.divider} />
        {/* 🔹 TOTALES */}
        <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>S/ {formatPrice(finalSubtotal)}</span>
        </div>

        <div className={styles.summaryRow}>
            <span>Descuento</span>
            <span>-S/ {formatPrice(finalDiscount)}</span>
        </div>
        {showDelivery && (
            <div className={styles.summaryRow}>
                <span>Envío</span>
                <span>S/ {formatPrice(deliveryCost)}</span>
            </div>
        )}

        <div className={`${styles.summaryRow} ${styles.total}`}>
            <span className={styles.priceTotalTitle}>Total</span>
            <span className={styles.priceTotal}>S/ {formatPrice(finalTotalPrice)}</span>
        </div>

        {/* 🔹 BOTÓN (CartPage) */}
        {showGeneralButton && (
            <GeneralButton
                size='medium'
                className={styles.button}
                disabled={buttonDisabled}
                onClick={onButtonClick}
            >
            {generalButtonText}
            </GeneralButton>
        )}
        {showCancelButton && (
            <GeneralButton
                variant='secondary'
                size='medium'
                className={styles.button}
                disabled={buttonDisabled}
                onClick={onCancelClick}
            >
            {cancelButtonText}
            </GeneralButton>
        )}
    </div>
  )
}
