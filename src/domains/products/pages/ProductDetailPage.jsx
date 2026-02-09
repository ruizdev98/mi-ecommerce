import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCartContext } from '@/core/context/CartContext'
import { useProduct } from '@/core/hooks/useProduct'
import { useProductSelection } from '@/core/hooks/useProductSelection'
import GeneralButton from '@/shared/ui/GeneralButton'
import styles from './ProductDetailPage.module.css'
import OptionButton from '../../../shared/ui/OptionButton'
import QuantitySelector from '../../../shared/ui/QuantitySelector'

export default function ProductDetailPage() {
  const { productId } = useParams()
  const { addToCart } = useCartContext()

  const { product, colors, loading, getSizesByColor, getVariant } = useProduct(productId)

  // Hook para manejar selección de color y talla
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

  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (!selectedVariant || !product) return

    addToCart({
      variantId: selectedVariant.id,
      quantity,
      image: product.image,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      promoNote: product.promoNote,
      sku: selectedVariant.sku,
      color: selectedColor?.name,
      size: selectedSizeId ? sizes.find(s => s.id === selectedSizeId).name : null
    });
  };

  if (loading) return <p>Cargando...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  const formatPrice = value => Number(value ?? 0).toFixed(2);
  const hasPromo = Boolean(product.promoNote)
  const hasDiscount = Number(product.discount) > 0 && !hasPromo

  return (
    <div className={`container`}>
      <div className={styles.productDetail}>
        {/* IMAGEN */}
        <div className={styles.left}>
          <img src={product.image} alt={product.name} className={styles.productImage} />
        </div>

        {/* DETALLES */}
        <div className={styles.right}>
          
          <div className={styles.title}>
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.brandName}>{product.brandName}</p>
            
          </div>

          <div className={styles.properties}>
            <div className={styles.prices}>
              <p className={styles.description}>{product.description}</p>
              {/* 🔹 CASO 1: CON PROMONOTE */}
              {hasPromo && (
                <div className={styles.priceBlock}>
                  <div className={styles.promotion}>
                    <p className={styles.price}>
                      Normal: S/ {formatPrice(product.price)}
                    </p>
                    <p className={styles.promoNote}>
                      {product.promoNote}
                    </p>
                    <p className={styles.discountPercent}>
                      -{product.discount}%
                    </p>
                  </div>
                  <p className={styles.discountPrice}>
                    Oferta: S/ {formatPrice(product.discountPrice)}
                  </p>

                </div>
              )}

              {/* 🔹 CASO 2: CON DESCUENTO (SIN PROMO) */}
              {hasDiscount && (
                <>
                  <div className={styles.promotion}>
                    <span className={styles.originalPrice}>
                      Normal: S/ {formatPrice(product.price)}
                    </span>

                    <span className={styles.discountPercent}>
                      -{product.discount}%
                    </span>
                  </div>

                  <span className={styles.discountPrice}>
                    Oferta: S/ {formatPrice(product.discountPrice)}
                  </span>
                </>
              )}

              {/* 🔹 CASO 3: PRECIO NORMAL */}
              {!hasPromo && !hasDiscount && (
                <span className={styles.price}>
                  S/ {formatPrice(product.price)}
                </span>
              )}

            </div>

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
              <p className={styles.label}>Talla:</p>
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
          </div>
          <QuantitySelector
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={selectedVariant?.stock ?? 99}
          />

          <GeneralButton
            size="large"
            disabled={!selectedVariant}
            onClick={handleAddToCart}
            className={styles.addToCartBtn}
          >
            Agregar al carrito
          </GeneralButton>
        </div>
      </div>
    </div>
  )
}
