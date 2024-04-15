import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";

import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, {isLoading}] = useLoginMutation();

  const {userInfo} = useSelector((state) => state.auth);

  useEffect(()=>{
    if(userInfo){
      navigate('/dashboard')
    }
  },[navigate, userInfo])
  
 
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({email, password}).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate('/dashboard')
    } catch (err) {
      console.log(err?.data?.message || err.error)
    }
  }
  return (
    <Card color="transparent" shadow={false} className="font-poppins">
     <Typography variant="h4" color="white" className="font-poppins text-4xl">
       Login
     </Typography>
     <Typography color="gray" className="mt-1 font-normal font-poppins">
       Enter your details to log in.
     </Typography>
     <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={submitHandler}>
       <div className="mb-1 flex flex-col gap-6">
         <Typography variant="h6" color="white" className="-mb-3 font-poppins">
           Your Email
         </Typography>
         <Input
           size="lg"
           placeholder="name@mail.com"
           className=" !border-t-blue-gray-200 focus:!border-pink-500"
           value={email}
           onChange={(e)=>{setEmail(e.target.value)}}
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
           onChange={(e)=>setPassword(e.target.value)}
           labelProps={{
             className: "before:content-none after:content-none",
           }}
         />
       </div>
       <Button className="mt-6 font-poppins text-md" color="pink" variant="gradient" type="submit" fullWidth>
         Log in
       </Button>
       <Typography color="gray" className="mt-4 text-center font-poppins">
         Don't have an account?{" "}
         <Link to="/signup" className="font-medium text-pink-500 font-poppins text-md">Sign Up</Link>
         
       </Typography>
     </form>
   </Card>
 );
}

export default LoginForm