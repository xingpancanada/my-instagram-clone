/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import SearchBox from './SearchBox'
import { AiFillPlusCircle, AiFillHome } from 'react-icons/ai'

export default function Header() {
  return (
    <header className='sticky top-0 pt-4 pb-3 bg-white items-center justify-between z-30 shadow'>
      <div className='flex w-full px-10 items-center'>
        <Link href={''} className='flex items-center space-x-3'>
          <Image
            src="/BigAlsCanada.png"
            alt='logo'
            width="50"
            height="50"
            className='rounded shadow-sky-100 duration-300 transition-all ease-in-out hover:shadow-sky-50 hover:shadow-xl hover:-translate-y-1 bg-transparent'
          />
          <p className='font-semibold min-w-full hidden md:inline-flex shadow-sky-100 duration-300 transition-all ease-in-out hover:shadow-sky-50 hover:shadow-xl hover:-translate-y-1 bg-transparent'>My Instagram Clone </p>
        </Link>
        <div className='flex justify-center w-full'>
          <SearchBox />
        </div>
        <div className='flex space-x-4 items-center'>
          <AiFillHome className='hidden md:inline-flex h-10 w-auto cursor-pointer hover:scale-110 transition-transform duration-300 ease-out' />
          <AiFillPlusCircle className='h-14 sm:h-10 w-auto cursor-pointer hover:scale-110 transition-transform duration-300 ease-out' />
          <img src="/fish.jpeg" alt="user-image"  className='h-10 rounded-full'/>
          {/* <button className='bg-blue-500 text-white rounded px-4 py-1 w-[120px] text-sm mr-2 hover:brightness-105 hover:shadow-md transition-shadow mx-4'>Sign in</button> */}
        </div>
      </div>

    </header>
  )
}
