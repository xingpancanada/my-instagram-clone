/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import { getProviders, signIn } from 'next-auth/react'
import Header from '@/components/Header'

export default function signin() {
  return (
    <>
      <Header />
      <div className='grid justify-items-center p-36'>
        <img src="/instagram-logo.png" alt="instagram-logo" className='h-48 mb-6 rotate-6'/>
        <button onClick={() => signIn('google', {callbackUrl: "/"})} className='flex items-center font-semibold bg-slate-100 hover:bg-slate-200 hover:shadow px-6 py-1 rounded-md cursor-pointer transition-all ease-out duration-200'>
        <img src="/google-logo.png" alt="instagram-logo" className='h-10 pr-2'/>
          Sign In with Google
        </button>
      </div>
    </>
  )
}

