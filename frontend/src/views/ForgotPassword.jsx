import React, { useState } from 'react'
import { Mail, KeyRound, Lock } from 'lucide-react';
const ForgotPassword = () => {
  const [tab, setTab] = useState('enterEmail');
  let content
  if (tab === 'enterEmail') {
    content = <form className='bg-dark-200 rounded-md max-w-[400px] w-full p-6 text-white' >
      <p className='text-header'>Forgot Password</p>
      <p className='text-small text-gray-400'>Enter your email and we'll send you a otp to reset your password</p>
      <div className='bg-dark-100 rounded-md w-full flex p-2 mt-4'>
        <Mail className='mr-2' />
        <input className='bg-dark-100 w-full outline-none' type="text" placeholder='Email' autoComplete="new-password" />
      </div>
      <div className='flex justify-end '>
        <button className='bg-dark-400 rounded-md px-12 py-3 mt-4' onClick={(e) => {
          e.preventDefault();
          setTab('enterOtp')
        }}>
          Send
        </button>
      </div>
    </form>
  }
  if (tab === 'enterOtp') {
    content = <form className='bg-dark-200 rounded-md max-w-[400px] w-full p-6 text-white' >
      <p className='text-header'>Verify Your Email</p>
      <p className='text-small text-gray-400'>Enter your OTP in your email to verify your email</p>
      <div className='bg-dark-100 rounded-md w-full flex p-2 mt-4'>
        <KeyRound className='mr-2' />
        <input className='bg-dark-100 w-full outline-none' type="text" placeholder='OTP' autoComplete="new-password" />
      </div>
      <div className='flex justify-end '>
        <button className='bg-dark-400 rounded-md px-12 py-3 my-4' onClick={(e) => {
          e.preventDefault();
          setTab('changePassword')
        }}>
          Verify
        </button>
      </div>
      <div className='flex justify-center'>
        <div>
          Didn't recieve code? <span className='underline cursor-pointer'>Resend OTP</span>
        </div>
      </div>
    </form>
  }
  if (tab === 'changePassword') {
    content = <form className='bg-dark-200 rounded-md max-w-[400px] w-full p-6 text-white' >
      <p className='text-header'>Change Password</p>
      <p className='text-small text-gray-400'>Enter your new password</p>
      <div className='bg-dark-100 rounded-md w-full flex p-2 mt-4'>
        <Lock className='mr-2' />
        <input className='bg-dark-100 w-full outline-none' type="password" placeholder='New password' autoComplete="new-password" />
      </div>
      <div className='bg-dark-100 rounded-md w-full flex p-2 mt-4'>
        <Lock className='mr-2' />
        <input className='bg-dark-100 w-full outline-none' type="password" placeholder='Confirm password' autoComplete="new-password" />
      </div>
      <div className='flex justify-end '>
        <button className='bg-dark-400 rounded-md px-12 py-3 mt-4' onClick={(e) => {
          e.preventDefault();
        }}>
          Submit
        </button>
      </div>
    </form>
  }
  return (
    <div className='bg-dark-500 h-screen w-screen flex justify-center items-center'>
      {content}
    </div>
  )
}

export default ForgotPassword