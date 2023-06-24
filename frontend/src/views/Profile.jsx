import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useGetUserQuery, useUpdateUserMutation } from '../app/api/userApiSlice'
const Profile = () => {
  const [updateUser, {isSuccess, isError}] = useUpdateUserMutation()
  const {profileImgPath, username, email} = useAuth()
  const [file, setFile] = useState(null);
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
  const [img, setImg] = useState('')
  useEffect(()=>{
    setImg(user?.profileImgPath)
  }, [user])
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(event.target.files)
    const url = URL.createObjectURL(file);
    setImg(url);
  };
  const handleUpdateUser = async (event) => {
    event.preventDefault();
    try {
      const res = await updateUser({email: email, images: file}).unwrap();
      setFile(null)
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
          <img className='w-[300px] relative h-[300px] rounded-full' 
          // src={`${process.env.REACT_APP_BASEURL}/public/img/${img}`} 
          src={file ? img : `${process.env.REACT_APP_BASEURL}/public/img/${img}`}
          />
          <input onChange={(e) => {
            handleFileChange(e)
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