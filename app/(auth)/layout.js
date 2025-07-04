
import React from 'react'

const AuthLayout = ({children}) => {
  return (
    
      <div className='flex justify-center pt-40'>
          {children}
        {/* This is where the sign-in or sign-up components will be rendered */}
      
      </div>
    
 
  )
}

export default AuthLayout;
