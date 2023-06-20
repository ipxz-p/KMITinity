import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../app/api/authApiSlice'
import { setCredentials } from '../app/authSlice'
import { useDispatch } from 'react-redux'
import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, {isLoading}] = useLoginMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleEmailInput = (e) => setEmail(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({
        "email": email,
        "password" : password
      }).unwrap()
      dispatch(setCredentials({accessToken}))
      setEmail('')
      setPassword('')
      navigate('/')
    } catch (error) {
      alert(error.data.message)
    }
  }
  return (
    <div className='bg-dark-500 h-screen w-screen flex justify-center items-center'>
      <form  className='bg-dark-200 rounded-md max-w-[400px] w-full p-6 text-white' onSubmit={handleLogin}>
        <p className='text-header'>Login</p>
        <div className='bg-dark-100 rounded-md w-full flex p-2 mt-4'>
          <Mail className='mr-2' />
          <input value={email} onChange={handleEmailInput} className='bg-dark-100 w-full outline-none' type="email" placeholder='Email' autoComplete="new-password" />
        </div>
        <div className='bg-dark-100 rounded-md w-full flex p-2 mt-4'>
          <Lock className='mr-2' />
          <input value={password} onChange={handlePasswordInput} className='bg-dark-100 w-full outline-none' type="password" placeholder='Password' autoComplete="off" />
        </div>
        <div className='flex justify-end mt-2 cursor-pointer'>
          <Link to='/forgotPassword' className='text-gray-300 text-small underline'>
            Forgot Password?
          </Link>
        </div>
        <div className='flex justify-end '>
          <button className='bg-dark-400 rounded-md px-12 py-3 my-4'>
            Login
          </button>
        </div>
        <div className='flex justify-center'>
          <div>
            Don't have an account? <Link className='underline' to='/signup'>Sign up</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login