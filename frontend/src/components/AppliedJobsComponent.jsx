import React from 'react'
import { useGetPostDetailsQuery } from '../slices/postsApiSlice'

const AppliedJobsComponent = ({postId}) => {
  const {data,error, isLoading, refetch} = useGetPostDetailsQuery(postId)

  return (
    <div>{data && 
      <div className='text-blue-gray-900 font-medium' >{data.title}</div>
      }</div>
  )
}

export default AppliedJobsComponent