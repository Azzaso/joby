import React, { useState, useEffect } from 'react';
import { useGetPostsQuery, useDeletePostMutation, useApplyForPostMutation } from '../../slices/postsApiSlice';
import { Button, Typography, Card, CardFooter, CardBody, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '../../components/Avatar';
import Popup from '../../components/Popup';

const JobListings = () => {
  
  const { data, isLoading, error, refetch } = useGetPostsQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const [deletePost, { isLoading: loadingDelete }] = useDeletePostMutation();
  const [applyForPost, { isLoading: loadingApply }] = useApplyForPostMutation();
  const [showPopupIndex, setShowPopupIndex] = useState(null);
  const [search, setSearch] = useState('');
  const [applicantNames, setApplicantNames] = useState({});

  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const closePopup = () => {
    setIsPopupOpen(false);
    
  };

  useEffect(() => {
    const fetchApplicantNames = async () => {
      const names = {};
      try {
        for (const post of data) {
          for (const applicantId of post.applicants) {
            if (!names[applicantId]) {
              const name = await fetchUserName(applicantId);
              names[applicantId] = name;
            }
          }
        }
        setApplicantNames(names);
      } catch (error) {
        console.error("Error fetching applicant names:", error);
      }
    };

    if (data) {
      fetchApplicantNames();
    }
  }, [data]);

  const fetchUserName = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      return userData.name;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return "Unknown";
    }
  };

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
    <div>
      <div className='bg-white bg-opacity-15 p-6 flex gap-6'>
        <input
          color='white'
          placeholder='Search'
          strokeWidth={3}
          className='pl-4 flex-1 font-poppins p-2w-64 rounded-[7px] border-solid bg-transparent border-white border-[2px] focus:ring-pink-500 text-white'
          onClick={(e) => setSearch(e.target.value)}
        />
        <Button color='pink' variant='gradient' className='text-sm flex gap-2'>
          <PlusCircleIcon color='white' strokeWidth={3} className="h-5 w-5" />
          <Link to="/dashboard/post">Create New Job</Link>
        </Button>
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
                <Button color='green' variant='gradient' className='font-poppins flex-1'>Update</Button>
                <Button color='pink' variant='gradient' className='font-poppins flex-1' onClick={() => deleteHandler(post._id)}>Delete</Button>
              </div>
              <div className="mt-3 cursor-pointer flex items-center -space-x-4 overflow-hidden" onClick={() => setShowPopupIndex(index)}>
                {post.applicants.map((applicantId) => (
                  <Avatar key={applicantId} fullname={`${applicantNames[applicantId]}`} />
                ))}
              </div>
              <div>
                {showPopupIndex === index && isPopupOpen && (
                  <Popup isOpen={true} onClose={closePopup}>
                    <List>
                      
                      {post.applicants.map((applicantId) => (
                        <ListItem key={applicantId}>
                          <ListItemPrefix>
                          <Avatar key={applicantId} fullname={`${applicantNames[applicantId]}`} />
                          </ListItemPrefix>
                          <div className='text-gray-900 font-normal'>{`${applicantNames[applicantId]}`}</div>
                        </ListItem>
                      ))}
                    </List>
                  </Popup>    
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobListings;
