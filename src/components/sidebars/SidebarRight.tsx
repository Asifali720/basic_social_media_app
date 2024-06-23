import React, { useState } from 'react'
import waterSlidImage from '../../assets/images/waterslide.jpg'

const SidebarRight = () => {
    const [inputValue, setInputValue] = useState('')
    console.log("🚀 ~ SidebarRight ~ inputValue:", inputValue)

  return (
    <div className='w-full px-3 flex flex-col items-center pt-5 pb-10'>
      <img src={waterSlidImage} alt="water-slid" className='w-full h-40 rounded-lg mb-5'/>
      <p className='text-sm font-roboto'>Through photography, the beauty of Mother Nature can be frozen in time.
        This category celebrates the magic of our planet and beyond — from the
        immensity of the great outdoors, to miraculous moments in your own
        backyard.</p>
     <div className='w-full mt-5'>
     <h3 className='text-base font-roboto font-semibold text-left'>Friends:</h3>
     <input type="text" name="" id="" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} placeholder='search' className='w-full p-2 border border-blue-500 rounded-lg focus:outline-none focus:border-2'/>
     </div>
    
    </div>
  )
}

export default SidebarRight