import React from 'react'
import useAuth from '../hooks/useAuth'
const Profile = () => {
  const {profileImgPath, username, email} = useAuth()
  return (
    <div>
      <form className='lg:flex-row 
      flex flex-col
      '
      enctype="multipart/form-data"
      >
        <div className='relative flex-shrink-0 basis-[300px] mx-auto'>
          <img className='w-[300px] relative h-[300px] rounded-full' src={`${process.env.REACT_APP_BASEURL}/public/img/${profileImgPath}`} alt />
          <input type="file" name="" id="" accept='.jpg,.png' className='absolute inset-0 opacity-0 w-[300px] h-[300px] rounded-full cursor-pointer' />
        </div>
        <div className='lg:ml-12 lg:pl-12 lg:border-l-gray-400 lg:border-l-2 
        w-full
        '>
          <div className='text-header font-semibold'>
            Your infomation
          </div>
          <div>
            <p>{username}</p>
          </div>
          <div className='flex justify-end'>
            <button className='bg-dark-400 rounded-md px-6 py-2 my-2'>
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile