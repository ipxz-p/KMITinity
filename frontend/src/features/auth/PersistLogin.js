import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useRefreshMutation } from '../../app/api/authApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../app/authSlice'
const PersistLogin = () => {
    const [refresh] = useRefreshMutation()
    const token = useSelector(selectCurrentToken)
    const navigate = useNavigate()
    useEffect(()=>{
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch (error) {
                if(process.env.NODE_ENV === 'development'){
                    console.log(error);
                }
            }
        }
        if(!token) verifyRefreshToken()
    }, [])
    return (
        <Outlet />
    )
}

export default PersistLogin