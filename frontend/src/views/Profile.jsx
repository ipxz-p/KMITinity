import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useUpdateUserMutation } from '../app/api/userApiSlice'
import { Mail, User, Pen } from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectUserData } from '../app/userSlice'

const Profile = () => {
  const [updateUser, {isSuccess, isError}] = useUpdateUserMutation()
  const {profileImgPath, username, email} = useAuth()
  const [file, setFile] = useState('');
  const [emailProfile, setEmailProfile] = useState('')
  const [usernameProfile, setUsernameProfile] = useState('')
  const [img, setImg] = useState('')
  const userData = useSelector(selectUserData)
  useEffect(()=>{
    setImg(userData?.profileImgPath)
    setEmailProfile(userData?.email)
    setUsernameProfile(userData?.username)
  }, [userData])
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(event.target.files)
    const url = URL.createObjectURL(file);
    setImg(url);
  };
  const handleUpdateUser = async (event) => {
    event.preventDefault();
    try {
      const res = await updateUser({images: file, username: usernameProfile, email: emailProfile}).unwrap();
      setFile(null)
      alert(res.message)
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
        <div className='group relative flex-shrink-0 basis-[300px] mx-auto rounded-full'>
          <img className='w-[300px] relative h-[300px] rounded-full group-hover:opacity-70' 
          // src={`${process.env.REACT_APP_BASEURL}/public/img/${img}`} 
          src={file ? img :`${process.env.REACT_APP_BASEURL}/public/img/${userData.profileImgPath}`}
          />
          <div className='absolute inset-0 w-[300px] h-[300px] rounded-full cursor-pointer hidden group-hover:flex items-center justify-center'>
            <Pen className='h-10 w-10' />
          </div>
          <input onChange={(e) => {
            handleFileChange(e)
          }} type="file" name="images" id="" accept='.jpg,.png' className='absolute inset-0 opacity-0 w-[300px] h-[300px] rounded-full cursor-pointer' />
        </div>
        <div className='lg:ml-12 lg:pl-12 lg:border-l-gray-400 lg:border-l-2 
        w-full
        '>
          <div className='text-header font-semibold mt-2'>
            Your infomation
          </div>
          <div className='sm:flex gap-4'>
            <div className='w-full mt-3'>
              <label>Email</label>
              <div className='bg-dark-100 rounded-md w-full flex p-2 mt-1'>
                <Mail className='mr-2' />
                <input value={emailProfile} onChange={
                  (e) => setEmailProfile(e.target.value)
                  
                } className='bg-dark-100 w-full outline-none' type="email" placeholder='Email' autoComplete="new-password" />
              
              </div>
            </div>
            <div className='w-full mt-3'>
              <label>Username</label>
              <div className='bg-dark-100 rounded-md w-full flex p-2 mt-1'>
              <User className='mr-2' />
              <input value={usernameProfile} onChange={
                (e) => setUsernameProfile(e.target.value)
                
              } className='bg-dark-100 w-full outline-none' type="text" placeholder='Username' autoComplete="new-password" />
            
            </div>
          </div>
          </div>
          <div className='flex justify-end my-2'>
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