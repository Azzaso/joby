import React from 'react'
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice'
import {
  Card,
  Button,
  Typography,
  CardFooter,
  CardBody,
  CardHeader,
  Input,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon, TrashIcon  } from '@heroicons/react/24/outline';
import Avatar from '../../components/Avatar';

import { Link } from 'react-router-dom';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/solid';

const ScoutCandidates = () => {
  const { data, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, {isLoading:loadingDelete}] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if(window.confirm('Are you sure you want to delete this user ?')){
      try {
        await deleteUser(id);
        refetch();
        alert('User deleted successfully')
      } catch (error) {
        alert(`Error deleting user: ${error.message}`);
      }
    }
  }

  return (
    <section className="m-10 h-[85vh] rounded-lg" >
      <Card className='h-full'>
      <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-8"
        >
          <div>
            <Typography variant="h6" color="blue-gray" className="font-poppins text-xl">
              Candidates
            </Typography>
            <Typography
              variant="small"
              className="text-gray-600 font-normal mt-1 font-poppins"
            >
              Manage and scout candidates.
            </Typography>
          </div>
          <div className="flex items-center w-full shrink-0 gap-4 md:w-max">
            <div className="w-full md:w-72">
              <Input
                size="lg"
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button
              variant="outlined"
              className="flex items-center gap-2"
            >
              Latest
              <ChevronDownIcon strokeWidth={3} className="w-3 h-3" />
            </Button>
            <Button
              variant="outlined"
              color="gray"
              className="flex justify-center gap-3 font-semibold md:max-w-fit w-full ml-auto"
            >
              <MagnifyingGlassIcon strokeWidth={3} className="h-4 w-4" />
              <Link to="/dashboard/post">Scout Candidates</Link>
            </Button>
          </div>
        </CardHeader>
      <CardBody className='!px-2 py-2 flex flex-col gap-1 overflow-scroll'>
        
        {data && data.map((user) => (
       user.role === "Candidate" && (
        <tr className='p-2 h-fit border border-gray-300 rounded-md'>
          <div key={user._id} className='flex flex-col'>
          <div className='flex w-full justify-between items-center'>
            <div className='flex gap-2'>
            <Avatar fullname={user.name}/>
            <div>
            <Typography variant="h5" color="blue-gray" className='text-md font-semibold font-poppins'>
            {user.name}</Typography>
          <Typography className='font-poppins truncate-after-sentences text-sm'>{user.email}</Typography>
            </div>
            </div>
            <div>
            <Button color='pink' variant='gradient' className='font-poppins flex-1 m-1'>Contact</Button>
          <Button color='black' variant='outlined' className='font-poppins flex-1 m-1'>View Profile</Button>
          <Button size='sm' color='pink' variant="outlined" className='font-poppins flex-1 m-1 w-fit h-fit' onClick={() => deleteHandler(user._id)}><TrashIcon className='w-5 h-5'/></Button>
            </div>
          </div>
          </div>
        </tr>
      )))}  
       
      </CardBody>
       <CardFooter></CardFooter>
     </Card>
    </section>
  )
}

export default ScoutCandidates