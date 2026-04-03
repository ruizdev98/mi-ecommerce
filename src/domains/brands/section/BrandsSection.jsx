import SectionTitle from '@/shared/ui/SectionTitle';
import GeneralButton from '@/shared/ui/GeneralButton';
import './BrandsSection.css'

export default function BrandsSection({title, products, brands}) {
    const usedBrandIds = new Set(products.map(p => p.brandId));
    const featuredBrands = brands.filter(brand => usedBrandIds.has(brand.id)).slice(0, 8);
  return (
    <section className='container brands-section'>
        <SectionTitle title={title} />
        <div className='brands-section__grid'>
            {featuredBrands.map(brand => (
                <div key={brand.id} className='brands-section__item'>
                    <a href="#" className='brands-section__link'>
                        <img src={`${brand.logo}`} alt={brand.name} className='brands-section__logo' />
                    </a> 
                </div>
            ))}
        </div>
        <div className='brands-section__view-all'>
            <GeneralButton className="product-section__btn">
                Ver todas las marcas
            </GeneralButton>
        </div>
    </section>
  )
}
