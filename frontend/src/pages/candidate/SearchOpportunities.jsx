import React, { useState} from 'react';
import { useGetPostsQuery, useDeletePostMutation, useApplyForPostMutation } from '../../slices/postsApiSlice';
import { Button, Typography, Card, CardFooter, CardBody, CardHeader, Input } from "@material-tailwind/react";
import { BriefcaseIcon, ChevronDownIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Popup from '../../components/Popup';

const SearchOpportunities = () => {
  
  const { data, isLoading, error, refetch } = useGetPostsQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const [applyForPost, { isLoading: loadingApply }] = useApplyForPostMutation();
  const [search, setSearch] = useState('');
  const [openPopups, setOpenPopups] = useState([]);
  
  const applyHandler = async (idPost, idUser) => {
    try {
      await applyForPost(idPost, idUser);
      refetch();
    } catch (error) {
      alert(error);
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
  
  };

  const handleOpenPopup = (index) => {
    setOpenPopups((prevOpenPopups) => {
      const newOpenPopups = [...prevOpenPopups];
      newOpenPopups[index] = true;
      return newOpenPopups;
    });
  };

  const handleClosePopup = (index) => {
    setOpenPopups((prevOpenPopups) => {
      const newOpenPopups = [...prevOpenPopups];
      newOpenPopups[index] = false;
      return newOpenPopups;
    });
  };

  return (
    <section className="m-10 h-[85vh] rounded-lg ">
      <Card className='h-full'>
      <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4"
        >
          <div>
            <Typography variant="h6" color="blue-gray" className="font-poppins text-xl">
              Search for opportunites
            </Typography>
            <Typography
              variant="small"
              className="text-gray-600 font-normal mt-1 font-poppins"
            >
              Apply to jobs that match your skills.
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
          </div>
        </CardHeader>
      <CardBody className='grid grid-cols-4 gap-6 overflow-scroll'>
        {data && data.map((post, index) => (
          <Card key={post._id} className='p-4 h-fit border shadow-md border-gray-300'>
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
                <Button color='black' variant='outlined' className='font-poppins flex-1' onClick={() => handleOpenPopup(index)}>Learn more</Button>
                <Button color='pink' variant='gradient' className='font-poppins flex-1' onClick={() => applyHandler(post._id, userInfo._id)}>Apply</Button>
              </div>
              <Popup title="Job Description" open={openPopups[index]} handleOpen={() => handleClosePopup(index)}>
                <div>
                  <div className='ml-6 text-lg font-semibold'>{post.title}</div>
                  <CardBody>{post.description}</CardBody>
                  <CardFooter className='flex'><Button color='pink' variant='gradient' className='font-poppins flex-1' onClick={() => applyHandler(post._id, userInfo._id)}>Apply</Button></CardFooter>
                </div>
              </Popup>
            </CardFooter>
          </Card>
        ))}
      </CardBody>
      
      </Card>
    </section>
  );
};

export default SearchOpportunities;
