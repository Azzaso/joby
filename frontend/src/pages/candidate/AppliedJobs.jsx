import React, { useEffect, useState, useCallback } from 'react';
import AppliedJobsComponent from '../../components/AppliedJobsComponent';
import { useGetUserInfoQuery } from '../../slices/usersApiSlice';
import { useSelector } from 'react-redux';
import {
  Card,
  Button,
  Typography,
  CardFooter,
  CardBody,
  CardHeader,
  Input,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { BriefcaseIcon, ChevronDownIcon} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { formatDate } from '../admin/ReceivedApplications';

const AppliedJobs = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, error, refetch } = useGetUserInfoQuery(userInfo._id);

  return (
    <section className="m-10 h-[85vh] rounded-lg">
      <Card className='h-full'>
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-8"
        >
          <div>
            <Typography variant="h6" color="blue-gray" className="font-poppins text-xl">
              Applied Jobs
            </Typography>
            <Typography
              variant="small"
              className="text-gray-600 font-normal mt-1 font-poppins"
            >
              View the jobs you applied to.
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
        <CardBody className='!px-2 py-2 flex flex-col gap-1 overflow-scroll'>
        <div>{data && data.appliedJobs.map((appliedJob)=> (
          <div className='flex mb-1 justify-between border 
          border-gray-300 rounded-md p-4'>
            <div className='flex gap-2 items-center'>
            <div className="border border-gray-300 p-2.5 rounded-lg ">
          <BriefcaseIcon className='w-5 h-5' color="blue-gray"/>
          </div>
            <AppliedJobsComponent key={appliedJob._id} postId={appliedJob._id}/>
            </div>
            <div className='flex items-center text-gray-500'>{formatDate(appliedJob.appliedAt)}</div>
          </div>
        
         ))}</div>
        </CardBody>
        <CardFooter>
          <div></div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default AppliedJobs;

{/*const AppliedJobs = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, error, refetch } = useGetUserInfoQuery(userInfo._id);
  return (
    <div>{data && data.appliedJobs.map((appliedJob)=> (
      <AppliedJobsComponent postId={appliedJob._id}/>
    ))}</div>
  )
} */}