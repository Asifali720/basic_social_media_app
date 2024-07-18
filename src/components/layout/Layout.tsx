import React, {ReactNode, useContext} from 'react'
import { AuthContext, AuthContextType } from '../app_context/AppContext'

interface ComponentProps{
    children: ReactNode
}


const Layout: React.FC<ComponentProps>= ({children}) => {
  return (
   <>
   {children}
   </>
  )
}

export default Layout