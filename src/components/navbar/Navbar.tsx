import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { House, Mail, Atom, Trophy, CircleUserRound, Bolt, Bell } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip"


const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-2 md:px-10 lg:px-20 xl:px-40 w-full py-3 border-b border-b-gray-200 shadow-xl fixed top-0 z-40 bg-white'>
      <div>
        <h3 className='font-roboto font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600'>Social media <span className='text-black'>App</span></h3>
      </div>

      <div>
        <ul className='flex items-center gap-4'>
          <li className='hover:text-sky-500 hover:translate-y-1 transition-all ease-in-out duration-300 cursor-pointer'>
            <House />
          </li>
          <li className='hover:text-sky-500 hover:translate-y-1 transition-all ease-in-out duration-300 cursor-pointer'>
            <Mail />
          </li>
          <li className='hover:text-sky-500 hover:translate-y-1 transition-all ease-in-out duration-300 cursor-pointer'>
            <Atom />
          </li>
          <li className='hover:text-sky-500 hover:translate-y-1 transition-all ease-in-out duration-300 cursor-pointer'>
            <Trophy />
          </li>
        </ul>
      </div>
      <div>
        <ul className='flex items-center gap-4'>
          <li className='hover:text-sky-500 hover:translate-y-1 transition-all ease-in-out duration-300 cursor-pointer'>
            <CircleUserRound />
          </li>
          <li className='hover:text-sky-500 hover:translate-y-1 transition-all ease-in-out duration-300 cursor-pointer'>
            <Bolt />
          </li>
          <li className='hover:text-sky-500 hover:translate-y-1 transition-all ease-in-out duration-300 cursor-pointer'>
            <Bell />
          </li>
          <li>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className='flex items-center gap-2'>
                  <Avatar className='!rounded-md'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className='text-base font-roboto font-medium'>User</p>
                </TooltipTrigger>
                <TooltipContent className='bg-gray-600'>
                  <p className='text-white font-roboto'>profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar