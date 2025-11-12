import { capitalizeFirstLetter } from '@/core/utils/textFormat'
import SectionTitle from '../../../shared/ui/SectionTitle'
import './Categories.css'

export default function Categories({title, categories}) {
  return (
    <section className='container categories'>
      <SectionTitle title={title} />
      <div className='categories__grid'>
        {categories.map(cat => (
          <div key={cat.id} className='categories__card'>
              <img src={cat.image} alt={cat.name} className='categories__image'/>
              <div className='categories__overlay'>
                <span className='categories__name'>{capitalizeFirstLetter(cat.name)}</span>
              </div>
          </div>
        ))}
      </div>
    </section>
  )
}
