import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React from 'react'

const Popup = ({children, open, handleOpen, title}) => {

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className='flex justify-between font-poppins'><span className='ml-5 mt-2'>{title}</span><XMarkIcon className='h-5 w-5 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer' onClick={handleOpen}/></DialogHeader>
        <DialogBody className='pt-0'>
          {children}
        </DialogBody>
       
      </Dialog>
    </>
  );
}

export default Popup