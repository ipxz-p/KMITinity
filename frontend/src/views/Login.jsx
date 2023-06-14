import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../app/api/authApiSlice'
import { setCredentials } from '../app/authSlice'
import { useDispatch } from 'react-redux'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, {isLoading}] = useLoginMutation()
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({
        "email": "p@gmail.com",
        "password" : "123456"
      }).unwrap()
      dispatch(setCredentials({accessToken}))
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className=''>
      <form onSubmit={handleLogin}>
        <div>
          <input className='border-2 border-blue-500' type="email" placeholder='email'/>
        </div>
        <div>
          <input className='border-2 border-blue-500' type="text" placeholder='username'/>
        </div>
        <div>
          <input className='border-2 border-blue-500' type="password" placeholder='password'/>
        </div>
        <button className='border-2 border-blue-500' type='submit'>submit</button>
      </form>
    </div>
  )
}

export default Login