import React, { useEffect, useMemo, useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useLogoutMutation } from '../app/api/authApiSlice'
import { HelpCircle, LogOut, User } from 'lucide-react'
import { useGetUserQuery } from '../app/api/userApiSlice'
import { selectUserData } from '../app/userSlice'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const navigate = useNavigate()
  const {username, roles, profileImgPath, email} = useAuth()
  const [showMenu, setShowMenu] = useState(false)
  const [logout, {isSuccess}] = useLogoutMutation()
  const { user } = useGetUserQuery("usersList", {
    selectFromResult: ({ data }) => {
      if (data) {
        const userKeys = Object.keys(data.entities);
        for (let i = 0; i < userKeys.length; i++) {
          const userProp = userKeys[i];
          if (data.entities[userProp].email === email) {
            return {
              user: data.entities[userProp]
            };
          }
        }
      }
      return { user: null }; // หรือค่าเริ่มต้นที่ต้องการให้ถ้าไม่พบผู้ใช้
    }
  });
  const userData = useSelector(selectUserData)
  useEffect(()=>{
    if(isSuccess){
      navigate('/')
    }
  }, [isSuccess, navigate])
  return (
    <div>
        <nav className='bg-dark-200 z-50 text-white px-6 h-[3.5rem] flex justify-between items-center fixed top-0 left-0 w-full'>
          <div className='z-40' onClick={()=>setShowMenu(false)}>
            <Link to='/'>KMITinity</Link>
          </div>
          <div className='flex justify-center items-center'>
            {!userData?.profileImgPath ? 
              <div>
              <Link className='ml-4' to='/login'>Login</Link>
            </div>
            :
              (
              <div>
                <div className='relative z-40'>
                  <img onClick={(e)=>{
                  e.preventDefault()
                  setShowMenu(true)
                  }} 
                  className='h-[2.3rem] w-[2.3rem] ml-4 rounded-full cursor-pointer' 
                  src={`${process.env.REACT_APP_BASEURL}/public/img/${userData?.profileImgPath}`} alt="" />
                  {showMenu && (
                    <div className='bg-dark-100 border-2 border-white rounded-md absolute top-[120%] py-1 right-0'>
                    <div className='cursor-pointer flex items-center px-3 py-1' onClick={(e)=>{
                      e.preventDefault()
                      const bool = false;
                      setShowMenu(bool)
                      navigate(`/profile/${username}`)
                      }}>
                      <User className='h-4 w-4'/>
                      <p className='ml-2'>Profile</p>
                    </div>
                    <div className='cursor-pointer flex items-center px-3 py-1 ' onClick={(e)=>{
                      e.preventDefault()
                      const bool = false;
                      setShowMenu(bool)
                      navigate(`/profile/${username}`)
                      }}>
                      <HelpCircle className='h-4 w-4 flex-shrink-0'/>
                      <p className='ml-2 whitespace-nowrap w-full'>Your questions</p>
                    </div>
                    <div className='bg-gray-400 h-[1px] w-full my-1'></div>
                    <div className='cursor-pointer flex items-center px-3 py-1' onClick={()=>{
                      setShowMenu(false);
                      logout()
                    }}>
                      <LogOut className='h-4 w-4'/>
                      <p className='ml-2'>logout</p>
                    </div>
                  </div>
                  ) 
                }
                </div>
                {showMenu && (
                  <div onClick={()=>{
                    if(showMenu){
                      setShowMenu(false)
                    }
                  }} className='fixed inset-0 z-30'>
                  </div>)
                }
              </div>
              )
            }
          </div>
        </nav>
        <Outlet />
    </div>
  )
}

export default Navbar