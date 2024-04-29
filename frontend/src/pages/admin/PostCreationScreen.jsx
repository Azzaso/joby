import React, { useState } from 'react';
import { useCreatePostMutation } from '../../slices/postsApiSlice';
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea
} from "@material-tailwind/react";

const PostCreationScreen = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  
  const [createPost, {isLoading}] = useCreatePostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        title: title,
        image: image,
        description: description}
        await createPost(formData).unwrap();
        alert('New Job Created')
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  }

  return (
    <Card color="transparent" shadow={false} className="font-poppins flex items-center mt-20 bg-white bg-opacity-10 p-12">
     <Typography variant="h4" color="white" className="font-poppins text-4xl">
       Create New Job
     </Typography>
     <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit} >
       <div className="mb-1 flex flex-col gap-6">
         <Typography variant="h6" color="white" className="-mb-3 font-poppins">
           Title
         </Typography>
         <Input
           size="lg"
           className=" !border-t-blue-gray-200 focus:!border-pink-500"
           value={title}
           onChange={(e)=>{setTitle(e.target.value)}}
           labelProps={{
             className: "before:content-none after:content-none",
           }}
         />
         <Typography variant="h6" color="white" className="-mb-3 font-poppins">
           Category
         </Typography>
         <Input
           size="lg"
           className=" !border-t-blue-gray-200 focus:!border-pink-500"
           value={image}
           onChange={(e)=>{setImage(e.target.value)}}
           labelProps={{
             className: "before:content-none after:content-none",
           }}
         />
         <Typography variant="h6" color="white" className="-mb-3 font-poppins">
           Description
         </Typography>
         <Textarea color="pink"
          value={description}
          onChange={(e)=>{setDescription(e.target.value)}}></Textarea>
       </div>
       <Button className="mt-6 font-poppins text-md" color="pink" variant="gradient" type="submit" disabled={isLoading} fullWidth>
         Submit
       </Button>
     </form>
   </Card>
  )
}

export default PostCreationScreen