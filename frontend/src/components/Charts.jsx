import React from 'react'
import BarChartComponent from './BarChartComponent'
import LineChartComponent from './LineChartComponent'

const Charts = () => {
  return (
    <section className='mx-10 bg-white border border-gray-800 rounded-xl shadow-xl px-3 py-8 flex flex-col gap-2 h-fit'>
      <div className='flex justify-around'>
        <div className='border border-gray-400 rounded-xl p-8 shadow-xl'>
        <BarChartComponent/>
        </div>
        <div className='border border-gray-400 rounded-xl p-8 shadow-2xl'>
        <LineChartComponent/>
        </div>
      </div>
      </section>
  )
}

export default Charts