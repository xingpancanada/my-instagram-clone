/* eslint-disable @next/next/no-img-element */
"use client"
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function MiniProfile() {
  const { data: session } = useSession();
  
  if(session){
    return (
      <div className='flex items-center space-x-3 p-2'>
        <img src={session?.user?.image ?? "/fish.jpeg"} alt="user-image"  className='h-20 rounded-full border-2 p-0.5 border-gray-300'/>
        <div className='flex-1'>
          <p className='font-semibold'>{session?.user?.name}</p>
          <p className='text-xs text-gray-400'>Welcome to My Instagram Clone</p>
        </div>
        <button onClick={() => signOut()}  className='bg-cyan-400 py-1 px-2 rounded-md text-sm text-white hover:bg-gray-400 cursor-pointer transition-all ease-out duration-200'>Sign Out</button>
      </div>
    )
  }
  else{
    return;
  }
}
