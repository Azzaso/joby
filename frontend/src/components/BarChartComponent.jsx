import React from 'react';
import { XAxis, CartesianGrid, YAxis, Legend, Tooltip, BarChart, Bar } from 'recharts';
import { useGetPostsQuery } from '../slices/postsApiSlice';

const BarChartComponent = () => {
  const { data: posts, isLoading, error, refetch } = useGetPostsQuery();

  let formatteddata = [];

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  if (posts) {
    formatteddata = formatDataArray(posts);
    console.log(formatteddata);
  }

  function formatDataArray(dataArray) {
    return dataArray.map(data => ({
      jobTitle: data.title,
      numberOfApplicants: data.applicants.length
    }));
  }

  const renderCustomTick = () => {
    return (
      <g>
      </g>
    );
  };

  return (
    <BarChart
      width={700}
      height={440}
      data={formatteddata}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <YAxis />
      <CartesianGrid strokeDasharray="4 4" />
      <Legend />
      <Tooltip />
      <XAxis dataKey="jobTitle" tick={renderCustomTick}/>
      <Bar type="monotone" dataKey="numberOfApplicants" stroke="white" fill="#1E1E1F" />
    </BarChart>
  );
};

export default BarChartComponent;