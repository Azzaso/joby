import { XCircleIcon } from '@heroicons/react/24/outline'
import { Button } from '@material-tailwind/react'
import { React, useState } from 'react'
import {Card} from '@material-tailwind/react'

const Popup = ({children, isOpen, onClose}) => {

  return (
    <Card>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center backdrop-blur-sm bg-gray-900 bg-opacity-10 z-50">
          <div className="bg-white p-4 rounded-lg w-96 h-fit mt-44 shadow-xl">
            <div className="flex justify-end">
              <XCircleIcon onClick={onClose}  className="h-6 w-6 cursor-pointer" />
            </div>
            <div className="mt-4">{children}</div>
          </div>
        </div>
      )}
    </Card>
  )
}

export default Popup