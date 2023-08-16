/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function MiniProfile() {
  return (
    <div className='flex items-center space-x-3 p-2'>
      <img src="/fish.jpeg" alt="user-image"  className='h-20 rounded-full border-2 p-0.5 border-gray-300'/>
      <div className='flex-1'>
        <p className='font-semibold'>XING</p>
        <p className='text-xs text-gray-400'>Welcome to My Instagram Clone</p>
      </div>
      <button className='bg-gray-400 py-1 px-2 rounded-md text-sm text-white hover:bg-gray-500 cursor-pointer transition-all ease-out duration-200'>Sign Out</button>
    </div>
  )
}
