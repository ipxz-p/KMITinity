import { createSelector, createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: 'user',
    initialState: { username: null, profileImgPath: null, email: null },
    reducers: {
        setUserData: (state, action) => {
            const userData = action.payload
            state.username = userData?.username
            state.email = userData?.email
            state.profileImgPath = userData?.profileImgPath
        }
    }
})
export const {
    setUserData
} = userSlice.actions
export default userSlice.reducer
export const selectUserData = createSelector(
    state => state.user.username,
    state => state.user.profileImgPath,
    state => state.user.email,
    (username, profileImgPath, email) => ({
        username,
        profileImgPath,
        email,
    })
);