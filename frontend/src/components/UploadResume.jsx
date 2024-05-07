import { Input, Button, Form, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';

const UploadResume = () => {
  const [file, setFile] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log(file);
     const formData = new FormData();
     formData.append('file', file);
     try {
        const response = await fetch('/api/upload/resume',
        {
          method : 'POST',
          body: formData,
        });
        const data = await response.json();
        console.log('File uploaded:', data.file);  
        alert('File uploaded successfully');
     } catch (error) {
       alert(error)
     }
  }
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  }

  return (
    <section className='m-10 bg-white rounded-xl shadow-xl p-10 flex flex-col gap-2'>
      <Typography variant="h6" color="blue-gray" className="font-poppins text-xl">
              Upload your resume
            </Typography>
            <Typography
              variant="small"
              className="text-gray-600 font-normal font-poppins"
            >
              Upload your resume for easy apply.
            </Typography>
      <div className='flex flex-col items-center justify-center mt-4 '>
        <div className='border border-gray-500 border-dashed rounded-xl w-full h-[44.3vh] p-10 flex flex-col justify-center'>
          <ArrowUpTrayIcon className='h-20 text-gray-500 mb-6'/>

        <form className='flex flex-col justify-center items-center gap-4  border-none' onSubmit={handleSubmit}>
          <input type='file' className='text-gray-600 file:border-none file:bg-white file:underline file:hover:cursor-pointer
          ml-28 ' onChange={handleChange}/>
        
        <Button variant='gradient' color='black' className='text-white font-poppins w-1/4' type='submit' >Upload</Button>
        </form>
        </div>
        
        
      </div>
      </section>
  )
}

export default UploadResume