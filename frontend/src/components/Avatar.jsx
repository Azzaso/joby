import { get } from 'mongoose';
import React from 'react'
import { useSelector } from 'react-redux'

const Avatar = ({fullname}) => {
  function getInitials(fullName) {
    return fullName.split(' ')
                   .map(word => word.charAt(0))
                   .join('')
                   .toUpperCase()
                   .substring(0, 2);
  }
  return (
    <div className={`h-10 w-10  flex items-center justify-center rounded-full bg-gray-900 border-[2px] border-white text-white`}>{getInitials(fullname)}</div>
  )
}

export default Avatar