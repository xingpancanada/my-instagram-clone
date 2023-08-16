/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { BsChatDots, BsBookmark, BsHeart, BsEmojiSmile } from 'react-icons/bs'

export default function Post({ img, userImg, username, id, caption }: any) {
  return (
    <div className='bg-white my-6 border rounded-md'>
      {/* post header */}
      <div className='flex items-center p-6'>
        <div className='flex items-center space-x-2 flex-1'>
          <img src={userImg} alt={username} className='rounded-full h-16 object-cover border border-gray-400 p-0.5 hover:scale-110 transition-transform ease-out duration-200 cursor-pointer' />
          <p className='font-semibold'>{username}</p>
        </div>
        <BiDotsHorizontalRounded className='text-2xl hover:scale-125 transition-transform ease-out duration-200 cursor-pointer' />
      </div>

      {/* post img */}
      <img src={img} alt={img} className='object-cover w-full' />

      {/* post buttons */}
      <div className='flex items-center justify-between p-6'>
        <div className='flex space-x-4'>
          <BsHeart className='text-2xl hover:scale-125 transition-transform ease-out duration-200 cursor-pointer' />
          <BsChatDots className='text-2xl hover:scale-125 transition-transform ease-out duration-200 cursor-pointer' />
        </div>
        <BsBookmark className='text-2xl hover:scale-125 transition-transform ease-out duration-200 cursor-pointer' />
      </div>

      {/* post comments */}
      <div className='flex space-x-3 px-6'>
        <p className='font-semibold'>{username}</p>
        <p className=''>{caption}</p>
      </div>

      {/* post input box */}
      <form action="" className='flex space-x-4 items-center p-6'>
        <BsEmojiSmile className='text-2xl' />
        <input type="text" placeholder='Enter your comment' className='p-3 border rounded-md focus:ring-0 focus:outline-0 flex-1' />
        <button className='bg-blue-400 px-4 py-2 text-sm rounded-md text-white hover:bg-blue-500 cursor-pointer transition-all ease-out duration-200 '>POST</button>
      </form>
    </div>
  )
}
