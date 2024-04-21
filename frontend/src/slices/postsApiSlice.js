import { POSTS_URL } from "../constants" ;
import { apiSlice } from "./apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query:() => ({
        url: `${POSTS_URL}/`,
      }),
    }),
    getPostDetails: builder.query({
      query : (postId) => ({
        url: `${POSTS_URL}/${postId}`
      }),
      providesTags: ['Posts'],
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/`,
        method: 'POST',
        body: data
      })
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
        method: 'DELETE'
      })
    })
    
  })
})

export const { useGetPostsQuery, useGetPostDetailsQuery, useCreatePostMutation, useDeletePostMutation } = postsApiSlice;