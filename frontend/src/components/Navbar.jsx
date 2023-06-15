import React, { useEffect } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useLogoutMutation } from '../app/api/authApiSlice'
const Navbar = () => {
  const navigate = useNavigate()
  const {username, role} = useAuth()
  const [logout, {isSuccess}] = useLogoutMutation()
  useEffect(()=>{
    if(isSuccess){
      navigate('/')
    }
  }, [isSuccess, navigate])
  return (
    <div>
        <nav className='bg-red-500 px-4 py-2 flex justify-between'>
          <div>
            <Link to='/'>KMITinity</Link>
          </div>
          <div className='flex'>
            <div>
              <Link to='/post'>Post</Link>
            </div>
            {username === '' ? 
              <div>
              <Link className='ml-4' to='/login'>Login</Link>
            </div>
            :
              <div onClick={logout}>
                <Link className='ml-4'>Logout</Link>
              </div>
            }
            <div className='ml-4'>{username}</div>
          </div>
        </nav>
        <Outlet />
    </div>
  )
}

export default Navbar