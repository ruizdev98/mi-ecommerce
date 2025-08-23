import SectionTitle from '@/shared/ui/SectionTitle'
import ProductCard from './ProductCard'
import Button from '@/shared/ui/Button'
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
            <Button className="product-section__btn">
              Ver todos los productos
            </Button>
        </div>
    </section>
  )
}
