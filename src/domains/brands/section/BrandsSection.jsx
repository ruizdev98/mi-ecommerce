import SectionTitle from '@/shared/ui/SectionTitle'
import styles from './BrandsSection.module.css'

export default function BrandsSection({title, products, brands}) {
    const usedBrandIds = new Set(products.map(p => p.brandId));
    const featuredBrands = brands.filter(brand => usedBrandIds.has(brand.id)).slice(0, 8);
  return (
    <section className={`container ${styles.brandsSection}`}>
        <SectionTitle title={title} />
        <div className={styles.grid}>
            {featuredBrands.map(brand => (
            <div key={brand.id} className={styles.item}>
                <a href="#" className={styles.link}>
                    <img src={brand.logo} alt={brand.name} className={styles.logo} />
                </a>
            </div>
            ))}
        </div>
    </section>
  )
}
