"use client"
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import React from 'react'

export default function SigninButton() {
  const {data: session} = useSession();
  
  if(session && session.user){
    return (
      <div className='space-y-1 items-center'>
        <p className='text-sm truncate'>{session.user.name}</p>
        <button onClick={() => signOut()} className='text-white bg-cyan-300 hover:bg-gray-400 text-xs px-2 py-1 w-20 rounded-md cursor-pointer transition-all ease-out duration-200'>
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <div>
       <button onClick={() => signIn('google')} className='text-white bg-green-500 text-xs p-2 w-40 rounded-md cursor-pointer transition-all ease-out duration-200'>
          Sign In with Google
        </button>
    </div>
  )
}

