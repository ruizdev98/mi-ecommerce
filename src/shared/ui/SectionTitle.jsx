import React from 'react'
import './SectionTitle.css'

export default function SectionTitle({title}) {
  return (
    <>
        <h2 className='section-title'>
            <span className='section-title__line'></span>
            {title}
            <span className='section-title__line'></span>
        </h2>
    </>
  )
}
