import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../app/api/authApiSlice'
import { Mail, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom'
const Signup = () => {
    const navigate = useNavigate()
    const [reg, { isLoading }] = useRegisterMutation()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleUsernameInput = (e) => setUsername(e.target.value)
    const handleEmailInput = (e) => setEmail(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)
    const handleReg = async (e) => {
        e.preventDefault()
        try {
            const res = await reg({
                "username": username,
                "email": email,
                "password": password
            }).unwrap()
            alert(res.message)
            setUsername('')
            setEmail('')
            setPassword('')
            navigate('/login')
        } catch (error) {
            alert(error.data.message)
        }
    }
    return (
        <div className='bg-dark-500 h-screen w-screen flex justify-center items-center'>
            <form className='bg-dark-200 rounded-md max-w-[400px] w-full p-6 text-white' onSubmit={handleReg}>
                <p className='text-header'>Signup</p>
                <div className='bg-dark-100 rounded-md w-full flex p-2 mt-4'>
                    <User className='mr-2' />
                    <input value={username} onChange={handleUsernameInput} className='bg-dark-100 w-full outline-none' type="text" placeholder='Username' autoComplete="new-password" />
                </div>
                <div className='bg-dark-100 rounded-md w-full flex p-2 mt-4'>
                    <Mail className='mr-2' />
                    <input value={email} onChange={handleEmailInput} className='bg-dark-100 w-full outline-none' type="email" placeholder='Email' autoComplete="new-password" />
                </div>
                <div className='bg-dark-100 rounded-md w-full flex p-2 mt-4'>
                    <Lock className='mr-2' />
                    <input value={password} onChange={handlePasswordInput} className='bg-dark-100 w-full outline-none' type="password" placeholder='Password' autoComplete="off" />
                </div>
                <div className='flex justify-end '>
                    <button className='bg-dark-400 rounded-md px-12 py-3 my-4'>
                        Signup
                    </button>
                </div>
                <div className='flex justify-center'>
                    <div>
                        Already have an account? <Link className='underline' to='/login'>Login</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup