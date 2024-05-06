import React from 'react';
import { useGetPostsQuery, useDeletePostMutation } from '../../slices/postsApiSlice';
import { Button, Typography, Card, CardFooter, CardBody, CardHeader, Input } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { BriefcaseIcon, ChevronDownIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid';

const JobListings = () => {
  
  const { data, isLoading, error, refetch } = useGetPostsQuery();
  const [deletePost, { isLoading: loadingDelete }] = useDeletePostMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        refetch();
      } catch (error) {
        alert('Error deleting post');
      }
    }
  };

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

  const filter = (searchResult) => {
    // Your filter logic here
  };

  return (
    <section className="m-10 h-[85vh] rounded-lg ">
      <Card className='h-full'>
      <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4 h-32"
        >
          <div>
            <Typography variant="h6" color="blue-gray" className="font-poppins text-xl">
              Job Listings
            </Typography>
            <Typography
              variant="small"
              className="text-gray-600 font-normal mt-1 font-poppins"
            >
              Manage your job listings.
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
              <PlusIcon strokeWidth={3} className="h-4 w-4" />
              <Link to="/dashboard/post">Add a new job offer</Link>
            </Button>
          </div>
        </CardHeader>
      <CardBody className='grid grid-cols-4 gap-6 overflow-scroll'>
        {data && data.map((post, index) => (
          <Card key={post._id} className='p-4 h-fit border border-gray-300'>
            <CardBody className='flex flex-col'>
            <Typography className='!text-gray-600 text-xs font-normal font-poppins mb-2'>{postedAt(post.date)}</Typography>
            <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
          <div className="border border-gray-300 p-2.5 rounded-lg">
          <BriefcaseIcon className='w-5 h-5' color="blue-gray"/>
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-1 font-bold font-poppins">
              {post.title}
            </Typography>
          </div>
          </div>
        </div>
              <Typography className='font-poppins truncate-after-sentences text-sm'>{post.description}</Typography>
            </CardBody>
            <CardFooter className='pt-0'>
              <div className='flex gap-2 justify-end '>
                <Button color='black' variant='gradient' className='font-poppins flex-1'>Update</Button>
                <Button color='pink' variant='outlined' className='font-poppins flex-1' onClick={() => deleteHandler(post._id)}>Delete</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </CardBody>
      <CardFooter><div></div></CardFooter>
      </Card>
    </section>
  );
};

export default JobListings;
