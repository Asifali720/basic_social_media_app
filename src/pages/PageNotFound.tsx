import React from 'react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import {DoubleArrowLeftIcon} from '@radix-ui/react-icons'

const PageNotFound = () => {
  return (
    <div className='w-full h-screen bg-blue-100 flex items-center justify-center'>
        <div className='flex flex-col items-center gap-1'>
            <h1 className='font-roboto font-bold text-9xl'>404</h1>
            <p>Ooops! something went wrong!</p>
            <Link to='/' className='mt-4 w-full'><Button className='w-full flex items-center gap-2'><DoubleArrowLeftIcon /> <p>Go Home</p></Button></Link>
        </div>
    </div>
  )
}

export default PageNotFound