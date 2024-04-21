import React from 'react'
import { useGetPostsQuery, useDeletePostMutation } from '../../slices/postsApiSlice'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select, 
  Option
} from "@material-tailwind/react";

const JobListings = () => {
  const { data, isLoading, error, refetch } = useGetPostsQuery();
  const [ deletePost, {isLoading:loadingDelete} ] = useDeletePostMutation();

  const deleteHandler = async (id) => {
    if(window.confirm('Are you sure you want to delete this post ?')){
      try {
        await deletePost(id);
        refetch();
      } catch (error) {
        alert('error');
      }
    }
  }
 
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='grid grid-cols-4 gap-6 p-10'>
      {data.map((post) => (
        <Card className='p-4 h-fit'>
          <div key={post._id} className='flex flex-col'>
          <h2 className='font-medium text-lg'>{post.title}</h2>
          <p className='text-md mb-2'>{post.description}</p>
          <div className='flex flex-col gap-2 justify-end'>
          <Button color='green' variant='gradient'>Update</Button>
          <Button color='pink' variant='gradient' onClick={() => deleteHandler(post._id)}>Delete</Button>
          </div>
        </div>
        </Card>
        
      ))}
      
    </div>
  )
}

export default JobListings;