import { apiSlice } from "./apiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
const userAdapter = createEntityAdapter({})
const initialState = userAdapter.getInitialState()
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            query: () => ({
                url: '/user/getAllUser',
            }),
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return userAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else 
                return [{ type: 'User', id: 'LIST' }]
            }
        }),
        updateUser: builder.mutation({
            query: ({email, images, username}) => {
                const data = new FormData()
                data.append('images', images[0])
                data.append('email', email)
                data.append('username', username)
                return {
                    url: '/user/updateUser',
                    method: 'PUT',
                    body: data
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    localStorage.setItem("imgPath", JSON.stringify(data.message))
                } catch (error) {
                    console.log(error);
                }
            },
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        })
    })
})

export const {
    useGetUserQuery,
    useUpdateUserMutation
} = userApiSlice

export const selectUserResult = userApiSlice.endpoints.getUser.select()

const selectUserData = createSelector(
    selectUserResult,
    userResult => userResult.data
)

export const {
    selectAll: selectAllUser,
    selectById: selectUserByEmail
} = userAdapter.getSelectors(state => selectUserData(state) ?? initialState)

