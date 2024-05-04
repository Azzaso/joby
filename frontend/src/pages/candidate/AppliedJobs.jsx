import React, { useEffect, useState } from 'react';
import { useGetUserInfoQuery } from '../../slices/usersApiSlice';
import { useSelector, shallowEqual } from 'react-redux';


const AppliedJobs = () => {

  const [appliedJobsNames, setApplicantNames] = useState({})
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, error, refetch } = useGetUserInfoQuery(userInfo._id);

  {/*const fetchJobName = async (id) => {
    try {
      const response = await fetch(`/api/posts/${id}`);
      const jobDetails = await response.json();
      return jobDetails.title;
    } catch (error) {
      alert(error);
      return "unknown";
    }
  }*/}
 
  return (
    <div>
      {data ? data.appliedJobs.map((jobId)=> (
        <div>{jobId}</div>
      )) : <div className='text-white text-xl'> loading..</div>}
    </div>
  )
}

export default AppliedJobs