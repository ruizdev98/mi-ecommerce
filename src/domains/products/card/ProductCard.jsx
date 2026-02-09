import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { formatPrice } from '@/core/utils/pricing'
import { Link } from 'react-router-dom'
import GeneralButton from '@/shared/ui/GeneralButton'
import ProductModal from '../modal/ProductModal'
import './ProductCard.css'

export default function ProductCard({product}) {

    const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className='product-section__card'>
        <div className='product-section__discount-circle'>
            <p>-{product.discount}%</p>
        </div>
        <div className='product-section__image-wrapper'>
            {product.stock === 0 && (
                <span className='product-section__out-of-stock'>Sin Stock</span>
            )}
            <Link to={`/products/${product.id}`}>
                <img src={product.image} alt={product.name} className='product-section__image'/>
            </Link>
        </div>
        <div className='product-section__info'>
            <div className='product-section__header'>
                <h3 className='product-section__name'>{product.name}</h3>
                <p className='product-section__brand'>{product.brandName}</p>
            </div>
            <div className='product-section__prices'>
                <span className={`product-section__original ${!product.promoNote ? 'product-section__original--strikethrough' : ''}`}>
                    S/ {formatPrice(product.price)}
                </span>
                {product.promoNote && (
                    <p className='product-section__promo-note'>{product.promoNote}</p>
                )}
                <span className='product-section__discount'>
                    S/ {formatPrice(product.discountPrice)}
                </span>
            </div>
        </div>
        <GeneralButton
            size="medium" 
            className="product-section__add-btn"
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
