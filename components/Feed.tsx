
import React from 'react'
import Stories from './Stories'
import Posts from './Posts'
import MiniProfile from './MiniProfile'
import Suggestions from './Suggestions'

export default function Feed() {
  return (
    <div className='bg-gray-200 min-h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto pt-2'>
        <section className='md:col-span-2'>
          <Stories />
          <Posts />
        </section>

        <section className='hidden md:inline-grid md:col-span-1 p-6'>
          <div className='fixed w-[400px]'>
            <MiniProfile />
            <Suggestions />
          </div>
        </section>

      </div>
      
    </div>
  )
}
