/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function Story({username, img}: any) {
  return (
    <div className=''>
      <img src={img} alt={username} className='h-12 rounded-full p-[1px] border border-rose-500 cursor-pointer hover:scale-110 transition-transform duration-200 ease-out' />
      <p className='text-xs w-12 truncate'>{username}</p>
    </div>
  )
}
