import { apiSlice } from "./apiSlice";
import { setCredentials, logout, selectCurrentToken } from "../authSlice";
import { setUserData } from "../userSlice";
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                prepareHeaders: (headers, { getState }) => {
                    const token = getState().auth.token
                    if(!token) {
                        headers.set("authorization", `Bearer ${token}`)
                    }
                    
                    return headers
                },
                body: { ...credentials }
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: "POST",
                
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    dispatch(logout())
                    dispatch(setUserData({
                        username: null,
                        email: null,
                        profileImgPath: null,
                        id: null
                    }))
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        register: builder.mutation({
            query: userData => ({
                url: '/auth/reg',
                method: 'POST',
                body: { ...userData }
            })
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: "GET",
                prepareHeaders: (headers, { getState }) => {
                    const token = getState().auth.token
                    if(!token) {
                        headers.set("authorization", `Bearer ${token}`)
                    }
                    
                    return headers
                }
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (error) {
                    localStorage.removeItem("imgPath")
                    console.log(error);
                }
            }
        }),
        sendOTP: builder.mutation({
            query: userData => ({
                url: '/auth/sendOTP',
                method: "POST",
                body: { ...userData }
            }),
        })
        ,
        changePassword: builder.mutation({
            query: userData => ({
                url: '/auth/changePassword',
                method: "PUT",
                body: { ...userData }
            }),
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useRefreshMutation,
    useSendOTPMutation,
    useChangePasswordMutation
} = authApiSlice