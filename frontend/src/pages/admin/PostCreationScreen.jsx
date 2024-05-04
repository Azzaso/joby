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
    <section className='m-10 h-[85vh] rounded-lg'>
    <Card color="transparent" shadow={false} className="font-poppins p-20 mt-10 bg-white  h-full">
     <Typography variant="h4" color="blue-gray" className="font-poppins text-4xl">
       Create a new job
     </Typography>
     <form className="w-full mt-8 mb-2" onSubmit={handleSubmit} >
       <div className="mb-1 w-full flex flex-col gap-6">
         <Typography variant="h6" color="blue-gray" className="-mb-3 font-poppins">
           Title
         </Typography>
         <Input
           size="lg"
           className=" !border-t-blue-gray-200 focus:!border-pink-500 w-full"
           value={title}
           onChange={(e)=>{setTitle(e.target.value)}}
           labelProps={{
             className: "before:content-none after:content-none",
           }}
         />
         <Typography variant="h6" color="blue-gray" className="-mb-3 font-poppins">
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
         <Typography variant="h6" color="blue-gray" className="-mb-3 font-poppins">
           Description
         </Typography>
         <Textarea color="pink"
         className='h-[23vh]'
          value={description}
          onChange={(e)=>{setDescription(e.target.value)}}></Textarea>
       </div>
       <Button className="mt-6 font-poppins text-md w-96" color="black" variant="gradient" type="submit" disabled={isLoading} >
         Submit
       </Button>
     </form>
   </Card>
   </section>
  )
}

export default PostCreationScreen