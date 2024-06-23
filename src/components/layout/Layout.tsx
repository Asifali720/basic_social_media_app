import React, {ReactNode} from 'react'

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