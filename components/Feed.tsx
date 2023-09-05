"use client"
import React from 'react'
import Stories from './Stories'
import Posts from './Posts'
import MiniProfile from './MiniProfile'
import Suggestions from './Suggestions'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { userState } from '@/atom/userAtom'


export default function Feed() {
  //const { data: session } = useSession();
  const [currentUser, setCurrentUser]: any = useRecoilState(userState);

  return (
    <div className='bg-gray-200 min-h-screen'>
         <div className={`grid ${currentUser ? "grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto pt-2" : "grid-cols-1 md:grid-cols-2 md:max-w-3xl mx-auto pt-2"} `}>
        <section className='md:col-span-2'>
          <Stories />
          <Posts />
        </section>

        {currentUser && (
          <section className='hidden md:inline-grid md:col-span-1 p-6'>
            <div className='fixed w-[400px]'>
              <MiniProfile />
              <Suggestions />
            </div>
          </section>
        )}

      </div>

      {/* <div className={`grid ${session ? "grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto pt-2" : "grid-cols-1 md:grid-cols-2 md:max-w-3xl mx-auto pt-2"} `}>
        <section className='md:col-span-2'>
          <Stories />
          <Posts />
        </section>

        {session && (
          <section className='hidden md:inline-grid md:col-span-1 p-6'>
            <div className='fixed w-[400px]'>
              <MiniProfile />
              <Suggestions />
            </div>
          </section>
        )}
      </div> */}

    </div>
  )
}
