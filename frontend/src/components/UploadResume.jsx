import { Input, Button, Form } from '@material-tailwind/react'
import React, { useState } from 'react'

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
      UploadResume
      <div className='flex items-center justify-center gap-1'>
        <form className='flex gap-1' onSubmit={handleSubmit}>
        <Input type='file' className='w-96' onChange={handleChange}/>
        <Button variant='gradient' color='black' className='text-white font-poppins' type='submit' >Upload</Button>
        </form>
        
      </div>
      </section>
  )
}

export default UploadResume