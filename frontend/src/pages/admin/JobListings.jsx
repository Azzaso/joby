import React from 'react'
import { useGetPostsQuery, useDeletePostMutation } from '../../slices/postsApiSlice'
import { useState } from 'react';
import {
  Card,
  Button,
  Typography,
  CardFooter,
  CardBody
} from "@material-tailwind/react";
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const JobListings = () => {
  const { data, isLoading, error, refetch } = useGetPostsQuery();
  const [ deletePost, {isLoading:loadingDelete} ] = useDeletePostMutation();
  const [search, setSearch] = useState('')
  console.log(search);
  
  const filter = (searchResult) => {
    

  }

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
  
  const postedAt = (postDate) => {
    const postDateToString = new Date(postDate);
    const now = new Date();
    const differenceInMilliseconds = now - postDateToString;
    const differenceInDays = Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  
    return differenceInDays === 0
      ? 'Posted today'
      : differenceInDays === 1
      ? 'Posted 1 day ago'
      : `Posted ${differenceInDays} days ago`;
  };

  return (
    <div>
      <div className='bg-white bg-opacity-15 p-6 flex gap-6'>
        <input color='white' placeholder='Search' strokeWidth={3} className='pl-4 flex-1 font-poppins p-2w-64 rounded-[7px] border-solid bg-transparent border-white border-[2px] focus:ring-pink-500 text-white' onClick={(e)=>setSearch(e.target.value)}/>
        <Button color='pink' variant='gradient' className='text-sm flex  gap-2'><PlusCircleIcon color='white' strokeWidth={3} className="h-5 w-5"/><Link to="/dashboard/post">Create New Job</Link></Button>
      </div>
      <div className='grid grid-cols-4 gap-6 p-6'>
      {data && data.map((post) => (
        <Card className='p-4 h-fit'>
          <CardBody key={post._id} className='flex flex-col'>
          <Typography className='font-poppins text-sm mb-2'>{postedAt(post.date)}</Typography>
          <Typography variant="h5" color="blue-gray" className='text-lg font-semibold font-poppins mb-2'>{post.title}</Typography>
          <Typography className='font-poppins truncate-after-sentences'>{post.description}</Typography>
          </CardBody>
          <CardFooter className='flex gap-2 justify-end pt-0'>
          <Button color='green' variant='gradient' className='font-poppins flex-1'>Update</Button>
          <Button color='pink' variant='gradient' className='font-poppins flex-1' onClick={() => deleteHandler(post._id)}>Delete</Button>
          </CardFooter>
        </Card>
      ))}  
    </div>
    </div>
  )
}

export default JobListings;