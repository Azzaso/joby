import React, { useEffect } from 'react'
import { useState } from 'react';
import {
  Input,
  Button,
  Typography,
  Card,
  List,
  ListItem
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
    <section className="m-10 h-[85vh] rounded-lg">
     <Card color="transparent" shadow={false} className="font-poppins p-20 mt-10 bg-white h-full flex flex-row">
      <div className='w-1/2 '>
      <Typography variant="h4" color="blue-gray" className="font-poppins flex flex-start text-4xl">
        Edit Account
      </Typography>
      <form className="mt-8 mb-2 w-full max-w-screen-lg rounded-lg " onSubmit={submitHandler}>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3 font-poppins">
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
          <Typography variant="h6" color="blue-gray" className="-mb-3 font-poppins">
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
          <Typography variant="h6" color="blue-gray" className="-mb-3 font-poppins">
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
          <Typography variant="h6" color="blue-gray" className="-mb-3 font-poppins">
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
        <Button className="mt-10 w-96 font-poppins text-md" color="pink" variant="gradient" type="submit" fullWidth>
          Save
        </Button>
      </form>
      </div>
     
      <div className='px-28 flex flex-col justify-center'>
        <Typography variant="h6" color="blue-gray" className="-mb-3 font-poppins">Password Requirement</Typography>
        <Typography
              variant="small"
              className="text-gray-600 font-normal mt-4 font-poppins mb-2"
            >
              Please follow this guide for a strong password:
            </Typography>
            <ul className='list-disc ml-4 text-sm'>
            <li
              className="text-gray-600 font-normal mt-2 font-poppins"
            >
              - One special characters ( ! @ # $ % ^ & * ( ) - _ = + )
            </li>
            <li
              
              className="text-gray-600 font-normal mt-2 font-poppins"
            >
              - Min 6 characters
            </li>
            <li
             
              className="text-gray-600 font-normal mt-2 font-poppins"
            >
             - One number (2 are recommended):
            </li>
            <li
              className="text-gray-600 font-normal mt-2 font-poppins"
            >
             - Change it often
            </li>
            </ul>

      </div>
    </Card>
    
    </section>
  );
}

export default Account