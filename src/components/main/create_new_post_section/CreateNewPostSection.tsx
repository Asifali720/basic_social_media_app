import React, { useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { Button } from '../../ui/button'
import uploadIcon from '../../../assets/images/add-image.png'
import smileIcon from '../../../assets/images/smile.png'
import liveIcon from '../../../assets/images/live.png'

const CreateNewPostSection = () => {
 const uploadRef = useRef<HTMLInputElement | null>(null);

 const handleUpload=()=>{
    const uploadElement = uploadRef.current;

    if (uploadElement) {
        uploadElement.click();
    } else {
        console.error('uploadRef is null');
    }
 }

  return (
    <div className='border border-gray-200 shadow-xl rounded-xl w-full'>
       <div className='flex items-center justify-between p-2 border-b border-b-gray-300 w-full'>
          <div className='flex items-center gap-2'>
          <Avatar className=''>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
             <input type="text" name="" id="" className='p-2 font-roboto outline-none' placeholder='whats on your mind user'/>     
          </div>
          <Button variant='ghost' className='text-sky-600 hover:text-sky-600 hover:bg-sky-100 uppercase'>share</Button>
       </div>
       <div className='p-2 flex items-center justify-around'>
        <div onClick={handleUpload}>
            <img src={uploadIcon} alt='upload' className='w-10 h-10'/>
            <input ref={uploadRef} type="file" name='' id='addImage' className='hidden'/>
        </div>
        <div className='flex items-center gap-2'>
            <img src={liveIcon} alt='live' className='w-10 h-10'/>
            <p className='text-base font-roboto'>Live</p>
        </div>
        <div className='flex items-center gap-2'>
            <img src={smileIcon} alt='live' className='w-10 h-10'/>
            <p className='text-base font-roboto'>Feeling</p>
        </div>
       </div>
    </div>
  )
}

export default CreateNewPostSection