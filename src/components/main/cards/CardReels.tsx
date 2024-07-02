import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../ui/card"
import clsx from 'clsx'
  

const CardReels = ({image, name, status}: {image:string, name:string, status: string}) => {
  return (
    <Card className='relative rounded-lg overflow-hidden h-56 transition-all ease-in-out duration-300 hover:scale-105'>
    <CardHeader>
    </CardHeader>
    <CardContent>
    <img src={image} alt='caption' className='absolute top-0 left-0 w-full h-full'/>
    </CardContent>
    <CardFooter className='flex items-center justify-between relative h-full !py-0 !px-2'>
      <p className='text-xs text-white font-roboto font-semibold'>{name}</p>
      <p className={clsx('text-xs font-roboto font-medium' ,status === 'Offline'?'text-red-600': 'text-green-600')}>{status}</p>
    </CardFooter>
  </Card>
  
  )
}

export default CardReels;