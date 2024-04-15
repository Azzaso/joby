import React, { useEffect } from 'react'
import { useState } from 'react';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select, 
  Option
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { useRegisterMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice'

 
const SignupForm = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, {isLoading}] = useRegisterMutation();

  const {userInfo} = useSelector((state) => state.auth);

  useEffect(()=>{
    if(userInfo){
      navigate('/dashboard');
    }
  },[navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
   if(password !== confirmPassword){
    alert('Passwords do not match')
   }
   else{
    try {
      const res = await register({name,role,email,password}).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate('/dashboard')
    } catch (err) {
      console.log(err?.data?.message || err.error)
    }
   }
  }

  return (
     <Card color="transparent" shadow={false} className="font-poppins">
      <Typography variant="h4" color="white" className="font-poppins text-4xl">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal font-poppins">
        Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={submitHandler}>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="white" className="-mb-3 font-poppins">
            Your Name
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
            Are you a Recruiter or a Candidate ?
          </Typography>
          <Select label="role" color="pink" value={role}
            onChange={(value) => setRole(value)}>
           <Option value="Candidate">Candidate</Option>
           <Option value="Recruiter">Recruiter</Option>
          </Select>
          <Typography variant="h6" color="white" className="-mb-3 font-poppins">
            Your Email
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
        <Checkbox color="pink"
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal font-poppins text-white"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors text-pink-500 hover:text-pink-300"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button className="mt-6 font-poppins text-md" color="pink" variant="gradient" type="submit" fullWidth>
          Sign up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-poppins">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-pink-500 font-poppins text-md">
            Sign In
          </Link>
        </Typography>
      </form>
    </Card>
  );
}
export default SignupForm