import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='bg-dark-500 text-white pt-[3.2rem] min-h-screen'>
        <div className='max-w-4xl mx-auto w-full mt-4 px-6'>
            <Outlet />
        </div>
    </div>
  )
}

export default Layout