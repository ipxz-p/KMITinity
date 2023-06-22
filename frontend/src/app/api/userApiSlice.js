import { apiSlice } from "./apiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
const userAdapter = createEntityAdapter({})
const initialState = userAdapter.getInitialState()
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        updateUser: builder.mutation({
            query: ({email, images}) => {
                const data = new FormData()
                data.append('images', images[0])
                data.append('email', email)
                return {
                    url: '/user/updateUser',
                    method: 'PUT',
                    body: data
                };
            },
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        })
    })
})

export const {
    useUpdateUserMutation
} = userApiSlice
