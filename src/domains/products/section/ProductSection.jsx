import SectionTitle from '@/shared/ui/SectionTitle'
import ProductCard from '../card/ProductCard'
import GeneralButton from '@/shared/ui/GeneralButton'
import './ProductSection.css'

export default function ProductSection({title, products}) {

  return (
    <section className='container product-section'>
        <SectionTitle title={title} />
        <div className='product-section__grid'>
            {products.map(product => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
        <div className='product-section__view-all'>
            <GeneralButton className="product-section__btn">
              Ver todos los productos
            </GeneralButton>
        </div>
    </section>
  )
}
