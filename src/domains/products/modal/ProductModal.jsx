import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react"
import { useCartContext } from "@/core/context/CartContext"
import { useProduct } from "@/core/hooks/useProduct"
import Button from "@/shared/ui/Button"
import styles from "./ProductModal.module.css"
import { color } from 'framer-motion'

export default function ProductVariantModal({ product, onClose }) {

  const { addToCart } = useCartContext()

  const {
    colors,
    loading,
    getSizesByColor,
    getVariant,
  } = useProduct(product.id)

  const [selectedColorId, setSelectedColorId] = useState(null)
  const [selectedSizeId, setSelectedSizeId] = useState(null)

  /**
   * 👉 Seleccionar el PRIMER color automáticamente
   */
  useEffect(() => {
    if (colors.length > 0 && !selectedColorId) {
      setSelectedColorId(colors[0].id)
    }
  }, [colors, selectedColorId])

  const selectedColor = colors.find(
    color => color.id === selectedColorId
  )

  const sizes = selectedColorId
    ? getSizesByColor(selectedColorId)
    : []

  const selectedVariant =
    selectedColorId && selectedSizeId
      ? getVariant(selectedColorId, selectedSizeId)
      : null

  const handleAddToCart = () => {
    if (!selectedVariant) return

    addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      image: product.image,
      name: product.name,
      price: product.price,
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
              <button
                key={color.id}
                className={`${styles.color} ${selectedColorId === color.id ? styles.active : ""}`}
                style={{ backgroundColor: color.hex }}
                onClick={() => {
                  setSelectedColorId(color.id)
                  setSelectedSizeId(null)
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
              <button
                key={size.id}
                className={`${styles.size} ${
                  selectedSizeId === size.id ? styles.active : ""
                }`}
                onClick={() => setSelectedSizeId(size.id)}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>

        <Button
          size="large"
          disabled={!selectedVariant}
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </Button>
      </div>
    </div>
  )
}
