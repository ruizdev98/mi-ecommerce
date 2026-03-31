import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import InputField from '@/shared/ui/InputField'
import GeneralButton from '@/shared/ui/GeneralButton'
import styles from './CategoryPage.module.css'

export default function FiltersPanel({
    brands,
    selectedBrands,
    toggleBrand,
    priceRange,
    setPriceRange,
    applyFilters,
    clearFilters,
    hasFilters
}) {
  return (
    <div className={styles.filters}>
        <h3 className={styles.filterTitle}><FontAwesomeIcon icon={faSliders} />Filtros</h3>
        
        {/* MARCAS */}
        <div className={styles.filterBlock}>
            <p className={styles.filterTitle}>Marca</p>

            {brands.map(brand => (
                <label key={brand} className={styles.checkbox}>
                <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                />
                <span className={styles.customCheckbox}></span>
                <span>{brand}</span>
                </label>
            ))}
        </div>

        {/* PRECIO */}
        <div className={styles.filterBlock}>
            <p className={styles.filterTitle}>Precio</p>
            <div className={styles.inputs}>
                <InputField
                name='numberMin'
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                />

                <InputField
                name='numberMax'
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                />
            </div>
        </div>

        {/* 🔥 BOTONES */}
        <div className={styles.filterActions}>
            <GeneralButton
                size='medium'
                className={styles.applyBtn}
                onClick={applyFilters}
                disabled={!hasFilters}
            >
                Aplicar filtros
            </GeneralButton>

            <GeneralButton
                variant='secondary'
                size='medium'
                className={styles.clearBtn}
                onClick={clearFilters}
                disabled={!hasFilters}
            >
                Limpiar
            </GeneralButton>
        </div>
    </div>
  )
}
