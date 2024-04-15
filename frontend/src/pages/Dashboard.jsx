import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex w-screen h-screen bg-dark '>
      <Sidebar className="h-screen relative top-0"/>
      <div className='w-full'>
        <Header/>
        <Outlet/>
      </div>
      </div>
  )
}

export default Dashboard