'use client'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { toast } from 'react-toastify'


export default function SearchBox() {
  const searchParams = useSearchParams(); //get search params from web address
  const searchTerm = searchParams.get("searchTerm");
  const [term, setTerm] = useState(searchTerm || ""); 
  const router = useRouter();

  function handleSubmit(e: any){
    e.preventDefault();
    if(!term.trim()) {
      toast.warn("Please enter your search!");
      return;
    }
    router.push(`/search/web?searchTerm=${term}`)
  }
  
  return (
    <form onSubmit={handleSubmit} className='flex max-w-[80%] min-w-[40%] h-10 items-center border border-gray-200 rounded-xl hover:shadow focus:shadow transition-shadow'>
      <AiOutlineSearch className='text-lg text-gray-400 m-2 SearchIcon cursor-pointer ml-3 mt-[12px]' onClick={handleSubmit} />
      <input type="text" placeholder='my search' className='flex-grow bg-slate-50 focus:outline-none antialiased ml-2 mr-5'
        onChange={(e) => setTerm(e.target.value)}
        value={term}
      />
    </form>
  )
}
