
import UserDashboard from '@/hooks/user-dashboard'
import { useUser } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

import React from 'react'

const page = async () => {
    
    const user = await currentUser()

  return (
    <div>
        <UserDashboard />
    </div>
  )
}

export default page