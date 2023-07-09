import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../authSlice'
import { setUserData } from '../userSlice'
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
})

const baseQueryWithReauth = async (args, api, extraOptions, dispatch) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 403) {
        console.log('sending refresh token')
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
        if (refreshResult?.data) {
            api.dispatch(setCredentials({ ...refreshResult.data }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            if (refreshResult?.error?.status === 403) {
                const userData = {
                    username: null,
                    email: null,
                    profileImgPath: null,
                    id: null
                };
                dispatch(setUserData(userData))
                localStorage.removeItem("imgPath")
                refreshResult.error.data.message = "Your login has expired."
            }
            return refreshResult
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User'],
    endpoints: builder => ({})
})