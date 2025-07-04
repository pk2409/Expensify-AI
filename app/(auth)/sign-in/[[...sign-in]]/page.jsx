import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <SignIn forceRedirectUrl='/dashboard'/>
  )
}

export default page;

// catch all route allows us to write things after it