import React from 'react'
import { useGetUsersQuery } from '../../slices/usersApiSlice'
import {
  Card,
  Button,
  Typography,
  CardFooter,
  CardBody
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { Link } from 'react-router-dom';

const ScoutCandidates = () => {
  const { data, isLoading, error, refetch } = useGetUsersQuery();
  
  return (
    <div >
      <div className='bg-white bg-opacity-15 p-6 flex gap-6'>
        <input color='white' placeholder='Search' strokeWidth={3} className='pl-4 flex-1 font-poppins p-2w-64 rounded-[7px] border-solid bg-transparent border-white border-[2px] focus:ring-pink-500 text-white'/>
        <Button color='pink' variant='gradient' className='text-sm flex  gap-2'><MagnifyingGlassIcon color='white' strokeWidth={3} className="h-5 w-5"/><Link to="/dashboard/post">Scout Candidates</Link></Button>
      </div>
      <div className='p-6 grid grid-cols-3 gap-4'>
      {data && data.map((user) => (
        <Card className='p-4 h-fit'>
          <CardBody key={user._id} className='flex flex-col'>
          <Typography className='font-poppins text-sm mb-2'></Typography>
          <Typography variant="h5" color="blue-gray" className='text-lg font-semibold font-poppins mb-2'>{user.name}</Typography>
          <Typography className='font-poppins truncate-after-sentences'>{user.email}</Typography>
          </CardBody>
          <CardFooter className='flex gap-2 justify-end pt-0'>
          <div className='flex w-full gap-2 justify-center items-center'>
          <Button color='green' variant='gradient' className='font-poppins flex-1'>Contact</Button>
          <Button color='blue' variant='gradient' className='font-poppins flex-1'>View Profile</Button>
          <Button color='pink' variant='gradient' className='font-poppins flex-1'>Delete</Button>
          </div>
          </CardFooter>
        </Card>
      ))}  
      </div>
       
     
    </div>
  )
}

export default ScoutCandidates