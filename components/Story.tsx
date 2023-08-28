/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

export default function Story({username, img, isUser}: any) {
  return (
    <div className='relative group cursor-pointer'>
      <img src={img} alt={username} className='h-12 rounded-full p-[1px] border border-rose-500 hover:scale-110 transition-transform duration-200 ease-out' />
      {isUser && <AiOutlinePlus className='h-6 absolute top-4 left-4 text-white' />}
      <p className='text-xs w-12 truncate'>{username.split(" ").join("").toLowerCase()}</p>
    </div>
  )
}
