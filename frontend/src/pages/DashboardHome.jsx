import React from 'react';
import Widget from "../components/Widget";
import Charts from "../components/Charts";
import UploadResume from "../components/UploadResume";
import { useSelector } from 'react-redux';


const DashboardHome = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      <Widget/>
      {userInfo.role == "Recruiter" ? (<Charts/>) : (<UploadResume/>)}
    </div>
  )
}

export default DashboardHome