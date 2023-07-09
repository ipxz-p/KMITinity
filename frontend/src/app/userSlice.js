import { createSelector, createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: 'user',
    initialState: { username: null, profileImgPath: null, email: null, id: null },
    reducers: {
        setUserData: (state, action) => {
            const userData = action.payload
            state.username = userData?.username
            state.email = userData?.email
            state.profileImgPath = userData?.profileImgPath
            state.id = userData?.id
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
    state => state.user.id,
    (username, profileImgPath, email, id) => ({
        username,
        profileImgPath,
        email,
        id
    })
);