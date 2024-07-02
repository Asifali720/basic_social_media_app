import React from 'react'
import data from '../../../assets/cardData'
import CardReels from '../cards/CardReels'

const ReelSection = () => {
  return (
    <div className='grid grid-cols-5 mt-6 gap-1 mb-10'>
        {
          data.map(({id, image, name, status})=>{
            return <CardReels key={id} image={image} name={name} status={status}/>
          })
        }
    </div>
  )
}

export default ReelSection;