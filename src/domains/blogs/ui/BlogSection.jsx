import SectionTitle from '@/shared/ui/SectionTitle'
import Button from '@/shared/ui/Button'
import './BlogSection.css'

export default function BlogSection({title, blogs}) {
  return (
    <section className='container blog-section'>
        <SectionTitle title={title} />
        <div className='blog-section__grid'>
            {blogs.map(post => (
                <div key={post.id} className='blog-section__card'>
                    <div className='blog-section__image-wrapper'>
                        <a href="#">
                            <img src={post.image} alt={post.title} className='blog-section__image' />
                        </a>
                    </div>
                    <div className='blog-section__details'>
                        <div className='blog-section__content'>
                            <a href="#">
                                <h4 className='blog-section__title'>{post.title}</h4>
                                <p className='blog-section__text'>{post.text}</p>
                            </a>
                        </div>
                        <Button
                          size="small" 
                          className="blog-section__btn"
                        >
                          Ver más
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}
