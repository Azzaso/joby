import React, { useEffect } from 'react'
import { useState } from 'react';
import {
  Input,
  Button,
  Typography,
  Card
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useUpdateMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice'

const Account = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [update, {isLoading}] = useUpdateMutation();

  const {userInfo} = useSelector((state) => state.auth);

  useEffect(()=>{
   setName(userInfo.name)
   setEmail(userInfo.email)
  },[userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
   if(password !== confirmPassword){
    alert('Passwords do not match')
   }
   else{
    try {
      const res = await update({_id:userInfo._id,name, email,password}).unwrap()
      dispatch(setCredentials({ ...res }))
      alert('Profile Updated')
      navigate('/dashboard')
    } catch (err) {
      console.log(err?.data?.message || err.error)
    }
   }
  }
  return (
     <Card color="transparent" shadow={false} className="font-poppin flex items-center justify-center mt-20 bg-white bg-opacity-10 p-12 rounded-none ">
      <Typography variant="h4" color="white" className="font-poppins flex flex-start text-4xl">
        Update Account
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 rounded-lg " onSubmit={submitHandler}>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="white" className="-mb-3 font-poppins">
            Name
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-pink-500"
            value={name}
            onChange={(e) => {setName(e.target.value)}}
            labelProps={{
              className: "before:content-none after:content-none",
            }}  
          />
          <Typography variant="h6" color="white" className="-mb-3 font-poppins">
            Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-pink-500"
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="white" className="-mb-3 font-poppins">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-pink-500"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="white" className="-mb-3 font-poppins">
            Confirm Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-pink-500"
            value={confirmPassword}
            onChange={(e) => {setConfirmPassword(e.target.value)}}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Button className="mt-6 font-poppins text-md" color="pink" variant="gradient" type="submit" fullWidth>
          Save
        </Button>
      </form>
    </Card>
  );
}

export default Account