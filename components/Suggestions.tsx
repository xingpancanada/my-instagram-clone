/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import minifaker from "minifaker"

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  console.log("suggestions: ", suggestions);
  useEffect(() => {
    const suggestions: any = minifaker.array(8, (i: number) => ({
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      jobTitle: minifaker.jobTitle(),
      id: i,
      userImg: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className='px-2 pt-6'>
      <div className='flex items-center justify-between'>
        <p className='font-semibold text-gray-400'>Suggestions for you</p>
        <button className='bg-blue-400 py-1 px-2 rounded-md text-sm text-white hover:bg-blue-500 cursor-pointer transition-all ease-out duration-200'>See All</button>
      </div>

      <div className='px-2 pt-6'>
        {suggestions && suggestions.map((suggestion: any) => (
          <div key={suggestion.id} className='p-1 flex items-center space-x-2'>
            <img src={suggestion.userImg} alt="user-image" className='h-12 rounded-full p-[1px] border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform duration-200 ease-out' />
            <div>
              <p className='text-sm'>{suggestion.username}</p>
              <p className='text-xs text-gray-400 truncate w-[250px]'>{suggestion.jobTitle}</p>
            </div>
            <button className='py-1 px-2 rounded-md text-sm text-rose-400 hover:text-rose-600 cursor-pointer transition-all ease-out duration-200'>Follow</button>
          </div>
        ))}
      </div>

    </div>
  )
}
