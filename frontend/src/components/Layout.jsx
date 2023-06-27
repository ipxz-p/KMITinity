import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='bg-dark-500 text-white pt-[3.5rem] min-h-screen h-full'>
        <div className='max-w-[1200px] mx-auto w-full mt-4 px-6'>
            <Outlet />
        </div>
    </div>
  )
}

export default Layout