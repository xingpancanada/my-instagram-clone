'use client'
import React, { useEffect, useState } from 'react'
import "minifaker/locales/en"
import minifaker, { arrayElement } from 'minifaker'
import Story from './Story';



export default function Stories() {
  const [storyUsers, setStoryUsers] = useState([]);
  useEffect(() => {
    // use minifaker to get users data and get avatars from pravatar
    const users: any = minifaker.array(20, (i: number) => ({
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i
    }));
    setStoryUsers(users);
    console.log(users);
  }, []);

  return (

    <div className='flex space-x-2 bg-gray-50 px-6 py-4 border border-gray-200 mt-4 overflow-x-auto scrollbar-none rounded-md'>
      {
        storyUsers.map((user: any) => (
          <Story key={user.id} username={user.username} img={user.img} />
        ))
      }
    </div>

  )
}
