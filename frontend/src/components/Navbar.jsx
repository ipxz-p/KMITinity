import React from 'react'
import { Outlet, Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
        <nav className='bg-red-500 px-4 py-2'>
          <Link to='/login'>Login</Link>
        </nav>
        <Outlet />
    </div>
  )
}

export default Navbar