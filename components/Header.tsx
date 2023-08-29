/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import SearchBox from './SearchBox'
import { AiFillPlusCircle, AiFillHome } from 'react-icons/ai'
import SigninButton from './SigninButton'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { modalState } from '../atom/modalAtom' //for global state - modal opened or closed
import { useRecoilState } from 'recoil'

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("session data", session);

  const [open, setOpen] = useRecoilState(modalState);

  function goToSigninPage() {
    router.push('/auth/signin')
  }

  return (
    <header className='sticky top-0 py-5 bg-white items-center justify-between z-30 shadow'>
      <div className='flex w-full px-10 items-center'>
        <Link href={'/'} className='flex items-center space-x-3'>
          <Image
            src="/2673902.png"
            alt='logo'
            width="60"
            height="60"
            className='rounded shadow-sky-100 duration-300 transition-all ease-in-out hover:shadow-sky-50 hover:shadow-xl hover:-translate-y-1 bg-transparent'
          />
          <p className='font-semibold min-w-full hidden md:inline-flex shadow-sky-100 duration-300 w-44 transition-all ease-in-out hover:shadow-sky-50 hover:shadow-xl hover:-translate-y-1 bg-transparent'>My Instagram Clone </p>
        </Link>
        <div className='flex justify-center w-full'>
          <SearchBox />
        </div>
        <div className='flex space-x-4 items-center'>
          <AiFillHome onClick={() => router.push("/")} className='hidden md:inline-flex h-10 w-auto cursor-pointer hover:scale-110 transition-transform duration-300 ease-out' />

          {session ? (
            <>
              <AiFillPlusCircle onClick={() => setOpen(true)} className='h-14 sm:h-10 w-auto cursor-pointer hover:scale-110 transition-transform duration-300 ease-out' />
              <img src={session?.user?.image ?? "/fish.jpeg"} alt="user-image" className='h-10 rounded-full' />
            </>
          ) : (
            <button className='bg-blue-500 text-white rounded px-4 py-1 w-[120px] text-sm mr-2 hover:brightness-105 hover:shadow-md transition-shadow mx-4' onClick={goToSigninPage}>Sign in</button>
          )}

        </div>
      </div>

    </header>
  )
}
