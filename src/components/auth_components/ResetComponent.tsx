import React, { useContext, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {useToast} from '../ui/use-toast'
import clsx from 'clsx'
import { AuthContext, AuthContextType } from '../app_context/AppContext'
import {BounceLoader} from 'react-spinners'

const ResetComponent = () => {
  const {toast} = useToast()
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)

  const {resetPassword} = useContext(AuthContext) as AuthContextType

  const handleResetEmail = () => {
    if(!email){
      toast({
        title: "Error",
        description: "Please enter your email address."
      })
    }else if(!email.includes("@")){
       toast({
        title: "Error",
        description: "Please enter a valid email address.",
      })
      setError(true)
    }else if(!email.includes(".")){
        toast({
        title: "Error",
        description: "Please enter a valid email address.",
      })
      setError(true)
    }else{
      resetPassword(email)
       toast({
        title: "Email sent successfully",
        description: "We have sent an email to your email address.",
      })
      setError(false)
    }
  }

  return (
    <div className='bg-blue-50 w-full h-screen flex items-center justify-center'>
       <div className='w-full max-w-[400px]'>
        <p className='mb-5 font-roboto text-base text-gray-500 font-bold'>Enter the Email address associated with your account and we will send you a link to reset your password.</p>
        <div className='mb-5'>
        <Input placeholder='Enter your email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} className={clsx('focus:!ring-0 focus:!ring-offset-0 focus:!outline-none border-2 border-transparent focus:border-sky-500 font-roboto', error && 'border-red-600')}/>
        {error && <p className='text-red-600 text-xs font-roboto mt-[2px]'>Please enter a valid email address.</p>}
        </div>
        
        <Button className='w-full' onClick={handleResetEmail}>Continue</Button>
      </div> 
    </div>
  )
}

export default ResetComponent