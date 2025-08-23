import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@/shared/ui/Button';
import './ProductCard.css'

export default function ProductCard({product}) {
    const formatPrice = (value) => {
        const num = Number(value);
        return isNaN(num) ? '0.00' : num.toFixed(2);
    };

  return (
    <div className='product-section__card'>
        <div className='product-section__discount-circle'>
            <p>-{product.discount}%</p>
        </div>
        <div className='product-section__image-wrapper'>
            {product.stock === 0 && (
                <span className='product-section__out-of-stock'>Sin Stock</span>
            )}
            <img src={product.image} alt={product.name} className='product-section__image'/>
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
        <Button
            size="medium" 
            className="product-section__add-btn"
        >
            <FontAwesomeIcon icon={faBagShopping} />
            Agregar
        </Button>
    </div>
  )
}
