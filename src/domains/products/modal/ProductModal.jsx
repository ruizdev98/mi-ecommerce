import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useCartContext } from "@/core/context/CartContext"
import { useProduct } from "@/core/hooks/useProduct"
import { useProductSelection } from "@/core/hooks/useProductSelection"
import GeneralButton from "@/shared/ui/GeneralButton"
import OptionButton from '../../../shared/ui/OptionButton'
import styles from "./ProductModal.module.css"

export default function ProductVariantModal({ product, onClose }) {

  const { addToCart, checkPendingOrder } = useCartContext()

  const {
    colors,
    loading,
    getSizesByColor,
    getVariant,
  } = useProduct(product.id)

  const {
    selectedColorId,
    setSelectedColorId,
    selectedSizeId,
    setSelectedSizeId,
    selectedColor,
    sizes,
    selectedVariant,
    resetSize
  } = useProductSelection({ colors, getSizesByColor, getVariant })

  const handleAddToCart = async () => {
    if (!selectedVariant) return

      // 🔒 Verificar si hay orden pendiente
    const hasPendingOrder = await checkPendingOrder()

    if (hasPendingOrder) {
      alert("⚠️ Tienes una orden pendiente de pago. Finalízala o cancélala para continuar.")
      onClose()
      return
    }

    addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      image: product.image,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      promoNote: product.promoNote,
      sku: selectedVariant.sku,
      color: selectedColor.name,
      size: selectedSizeId
      ? sizes.find(s => s.id === selectedSizeId).name
      : null
    })

    onClose()
  }

  if (loading) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h3 className={styles.title}>{product.name}</h3>

        {/* COLORES */}
        <div className={styles.section}>
          <p className={styles.label}>
            Color: <span className={styles.colorName}>{selectedColor ? selectedColor.name : ''}</span>
          </p>
          <div className={styles.colors}>
            {colors.map(color => (
              <OptionButton
                key={color.id}
                variant="color"
                value={color.hex}
                isActive={selectedColorId === color.id}
                onClick={() => {
                  setSelectedColorId(color.id)
                  resetSize()
                }}
              />
            ))}
          </div>
        </div>

        {/* TALLAS */}
        <div className={styles.section}>
          <p className={styles.label}>Talla</p>
          <div className={styles.sizes}>
            {sizes.map(size => (
              <OptionButton
                key={size.id}
                variant="size"
                value={size.name}
                isActive={selectedSizeId === size.id}
                onClick={() => setSelectedSizeId(size.id)}
              />
            ))}
          </div>
        </div>

        <GeneralButton
          size="large"
          disabled={!selectedVariant}
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </GeneralButton>
      </div>
    </div>
  )
}
