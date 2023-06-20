import React, { useEffect, useState } from 'react'
import { Mail, KeyRound, Lock } from 'lucide-react';
import { useSendOTPMutation, useChangePasswordMutation } from '../app/api/authApiSlice';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState('enterEmail');
  const [email, setEmail] = useState('');
  const [OTP, setOTP] = useState('')
  const [checkOTP, setCheckOTP] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [checkNewPassword, setCheckNewPassword] = useState('')
  const [sendOTP, {isLoading}] = useSendOTPMutation()
  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const handleSendOTP = async () => {
    if(!email){
      return alert('Please enter email');
    }
    if(!isLoading){
      try {
        const newOTP = randomNumber(1000, 9999);
        setOTP(newOTP);
        await sendOTP({
          "OTP": newOTP,
          "recipient_email": email
        }).unwrap()
        setTab('enterOtp')
      } catch (error) {
        console.log(error);
      }
    }
  }
  const handleVerifyEmail = () => {
    if(checkOTP == OTP){
      setTab('changePassword')
    }
    else{
      alert("OTP incorrect")
    }
  }
  const [changePassword] = useChangePasswordMutation()
  const handleChangePassword = async () => {
    if(!newPassword || !checkNewPassword){
      return alert("Please enter all fields")
    }
    if(newPassword !== checkNewPassword){
      return alert("Password don't match")
    }
    try {
      const res = await changePassword({
        email: email,
        newPassword: newPassword
      }).unwrap()
      alert(res.message);
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  } 
  let content
  if (tab === 'enterEmail') {
    content = <form className='bg-dark-200 rounded-md max-w-[400px] w-full p-6 text-white' >
      <p className='text-header'>Forgot Password</p>
      <p className='text-small text-gray-400'>Enter your email and we'll send you a otp to reset your password</p>
      <div className='bg-dark-100 rounded-md w-full flex p-2 mt-4'>
        <Mail className='mr-2' />
        <input value={email} onChange={(e) => setEmail(e.target.value)} className='bg-dark-100 w-full outline-none' type="email" placeholder='Email' autoComplete="new-password" />
      </div>
      <div className='flex justify-end '>
        <button className='bg-dark-400 rounded-md px-12 py-3 mt-4' onClick={(e) => {
          e.preventDefault();
          handleSendOTP()
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
        <input value={checkOTP} onChange={(e)=>setCheckOTP(e.target.value)} className='bg-dark-100 w-full outline-none' type="text" placeholder='OTP' autoComplete="new-password" />
      </div>
      <div className='flex justify-end '>
        <button className='bg-dark-400 rounded-md px-12 py-3 my-4' onClick={(e) => {
          e.preventDefault();
          handleVerifyEmail()
        }}>
          Verify
        </button>
      </div>
      <div className='flex justify-center'>
        <div>
          Didn't recieve code? <span className='underline cursor-pointer' onClick={()=>handleSendOTP()}>Resend OTP</span>
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
        <input value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className='bg-dark-100 w-full outline-none' type="password" placeholder='New password' autoComplete="new-password" />
      </div>
      <div className='bg-dark-100 rounded-md w-full flex p-2 mt-4'>
        <Lock className='mr-2' />
        <input value={checkNewPassword} onChange={(e)=>setCheckNewPassword(e.target.value)} className='bg-dark-100 w-full outline-none' type="password" placeholder='Confirm password' autoComplete="new-password" />
      </div>
      <div className='flex justify-end '>
        <button className='bg-dark-400 rounded-md px-12 py-3 mt-4' onClick={(e) => {
          e.preventDefault();
          handleChangePassword()
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