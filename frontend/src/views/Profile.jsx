import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useUpdateUserMutation } from '../app/api/userApiSlice'

const Profile = () => {
  const [updateUser, {isSuccess, isError}] = useUpdateUserMutation()
  const {profileImgPath, username, email} = useAuth()
  const [file, setFile] = useState(null);
  const handleUpdateUser = async (event) => {
    event.preventDefault();
    try {
      const res = await updateUser({email: email, images: file}).unwrap();
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form className='lg:flex-row 
      flex flex-col
      '
      encType="multipart/form-data"
      onSubmit={handleUpdateUser}
      >
        <div className='relative flex-shrink-0 basis-[300px] mx-auto'>
          <img className='w-[300px] relative h-[300px] rounded-full' src={`${process.env.REACT_APP_BASEURL}/public/img/${profileImgPath}`} />
          <input onChange={(e) => {
            setFile(e.target.files)
          }} type="file" name="images" id="" accept='.jpg,.png' className='absolute inset-0 opacity-0 w-[300px] h-[300px] rounded-full cursor-pointer' />
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