import { apiSlice } from "./apiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
const questionAdapter = createEntityAdapter({})
const initialState = questionAdapter.getInitialState()
export const questionApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getQuestion: builder.query({
            query: () => ({
                url: '/question/getAllQuestion',
            }),
            transformResponse: responseData => {
                const loadedQuestions = responseData.map(question => {
                    question.id = question._id
                    return question
                });
                return questionAdapter.setAll(initialState, loadedQuestions)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                    { type: 'Question', id: 'LIST' },
                    ...result.ids.map(id => ({ type: 'Question', id }))
                    ]
                } else 
                return [{ type: 'Question', id: 'LIST' }]
            }
        }),
        createQuestion: builder.mutation({
            query: ({title, description, tags, owner, images}) => {
                const data = new FormData()
                data.append('title', title)
                data.append('description', description)
                data.append('owner', owner)
                images.forEach((image) => {
                    data.append('images', image[0], image[0].name)
                });
                tags.forEach((tag) => {
                    data.append('tags', tag)
                });
                return {
                    url: '/question/createQuestion',
                    method: 'POST',
                    body: data
                };
            },
            invalidatesTags: (result, error, arg) => [
                { type: 'Question', id: arg.id }
            ]
        })
    })
})

export const {
    useGetQuestionQuery,
    useCreateQuestionMutation
} = questionApiSlice

export const selectQuestionResult = questionApiSlice.endpoints.getQuestion.select()

const selectQuestionData = createSelector(
    selectQuestionResult,
    QuestionResult => QuestionResult.data
)

export const {
    selectAll: selectAllQuestion,
    selectById: selectQuestionByEmail
} = questionAdapter.getSelectors(state => selectQuestionData(state) ?? initialState)

