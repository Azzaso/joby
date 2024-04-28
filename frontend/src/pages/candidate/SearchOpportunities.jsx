import React, { useState} from 'react';
import { useGetPostsQuery, useApplyForPostMutation } from '../../slices/postsApiSlice';
import { Button, Typography, Card, CardFooter, CardBody } from "@material-tailwind/react";
import { PlusCircleIcon,MagnifyingGlassCircleIcon  } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '../../components/Avatar';
import Popup from '../../components/Popup';

const SearchOpportunities = () => {
  
  const { data, isLoading, error, refetch } = useGetPostsQuery();
  const { userInfo } = useSelector((state) => state.auth);

  const [applyForPost, { isLoading: loadingApply }] = useApplyForPostMutation();
  const [showPopupIndex, setShowPopupIndex] = useState(null);
  const [search, setSearch] = useState('');
  const [applicantNames, setApplicantNames] = useState({});

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
    // Your filter logic here
  };

  return (
    <div>
      <div className='bg-white bg-opacity-15 p-6 flex gap-6'>
        <input
          color='white'
          placeholder='Search'
          strokeWidth={3}
          className='pl-4 flex-1 py-2 font-poppins p-2w-64 rounded-[7px] border-solid bg-transparent border-white border-[2px] focus:ring-pink-500 text-white'
          onClick={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className='grid grid-cols-4 gap-6 p-6'>
        {data && data.map((post, index) => (
          <Card key={post._id} className='p-4 h-fit'>
            <CardBody className='flex flex-col'>
              <Typography className='font-poppins text-sm mb-2'>{postedAt(post.date)}</Typography>
              <Typography variant="h5" color="blue-gray" className='text-lg font-semibold font-poppins mb-2'>{post.title}</Typography>
              <Typography className='font-poppins truncate-after-sentences'>{post.description}</Typography>
            </CardBody>
            <CardFooter className='pt-0'>
              <div className='flex gap-2 justify-end '>
                <Button color='black' variant='gradient' className='font-poppins flex-1'>Learn more</Button>
                <Button color='pink' variant='gradient' className='font-poppins flex-1' onClick={() => applyHandler(post._id, userInfo._id)}>Apply</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchOpportunities;
