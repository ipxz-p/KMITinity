import { createSlice } from "@reduxjs/toolkit";
import { setUserData } from "./userSlice";
const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => {
            const {accessToken} = action.payload
            state.token = accessToken
        },
        logout: (state, action) => {
            state.token = null
            const userData = {
                username: null,
                email: null,
                profileImgPath: null
            };
            setUserData(userData)
            localStorage.removeItem("imgPath")
        },
    }
})
export const {setCredentials, logout} = authSlice.actions
export default authSlice.reducer
export const selectCurrentToken = (state) => state.auth.token