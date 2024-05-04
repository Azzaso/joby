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
        url: `${POSTS_URL}/${postId}`,
        method: 'GET',
      }),
     
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
    }),
    applyForPost: builder.mutation({
      query:(postId, userId)=>({
        url: `${POSTS_URL}/${postId}`,
        method: 'POST',
        body: {userId},
      })
    })
    
  })
})

export const { useGetPostsQuery, useGetPostDetailsQuery, useCreatePostMutation, useDeletePostMutation, useApplyForPostMutation } = postsApiSlice;