/* eslint-disable @next/next/no-img-element */
"use client"
import { userState } from '@/atom/userAtom';
import { db } from '@/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { signOut, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';

export default function MiniProfile() {
  //const { data: session } = useSession();
  const [currentUser, setCurrentUser]: any = useRecoilState(userState);

  function onSignOut(){
    // const auth: any = getAuth();
    // signOut(auth);
    setCurrentUser(null);
  }
  
  if(currentUser){
    return (
      <div className='flex items-center space-x-3 p-2'>
        <img src={currentUser?.userImg ?? "/fish.jpeg"} alt="user-image"  className='h-20 rounded-full border-2 p-0.5 border-gray-300'/>
        <div className='flex-1'>
          <p className='font-semibold'>{currentUser?.name}</p>
          <p className='text-xs text-gray-400'>Welcome to My Instagram Clone</p>
        </div>
        <button onClick={() => onSignOut()}  className='bg-cyan-400 py-1 px-2 rounded-md text-sm text-white hover:bg-gray-400 cursor-pointer transition-all ease-out duration-200'>Sign Out</button>
        {/* <button onClick={() => signOut()}  className='bg-cyan-400 py-1 px-2 rounded-md text-sm text-white hover:bg-gray-400 cursor-pointer transition-all ease-out duration-200'>Sign Out</button> */}
      </div>
    )
    // return (
    //   <div className='flex items-center space-x-3 p-2'>
    //     <img src={session?.user?.image ?? "/fish.jpeg"} alt="user-image"  className='h-20 rounded-full border-2 p-0.5 border-gray-300'/>
    //     <div className='flex-1'>
    //       <p className='font-semibold'>{session?.user?.name}</p>
    //       <p className='text-xs text-gray-400'>Welcome to My Instagram Clone</p>
    //     </div>
    //     <button onClick={() => signOut()}  className='bg-cyan-400 py-1 px-2 rounded-md text-sm text-white hover:bg-gray-400 cursor-pointer transition-all ease-out duration-200'>Sign Out</button>
    //   </div>
    // )
  }
  else{
    return;
  }
}
