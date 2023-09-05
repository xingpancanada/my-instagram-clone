/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import { getProviders, signIn } from 'next-auth/react'
import Header from '@/components/Header'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { db } from '@/firebase';
import { doc, getDoc, serverTimestamp, setDoc, collection } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

////next-auth signin
// export default function signin() {
//   return (
//     <>
//       <Header />
//       <div className='grid justify-items-center p-36'>
//         <img src="/instagram-logo.png" alt="instagram-logo" className='h-48 mb-6 rotate-6'/>
//         <button onClick={() => signIn('google', {callbackUrl: "/"})} className='flex items-center font-semibold bg-slate-100 hover:bg-slate-200 hover:shadow px-6 py-1 rounded-md cursor-pointer transition-all ease-out duration-200'>
//         <img src="/google-logo-xxs.png" alt="instagram-logo" className='h-10 pr-2'/>
//           Sign In with Google
//         </button>
//       </div>
//     </>
//   )
// }

////firebase auth signin
export default function Signin() {
  const router = useRouter();
  
  async function onGoogleClick(){
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("google auth signin:", auth);

      const user: any = auth.currentUser?.providerData[0];
      //use google uid as user id
      //debugger
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if(!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          userImg: user.photoURL,
          uid: user.uid,
          time: new Date()
          //timestamp: serverTimestamp(),//don't know this timestamp cannot work here!!!
        });
      }

      router.push("/");
    } catch (error) {
      console.log("google auth signin error:", error);
    }
  }

  return (
    <>
      <Header />
      <div className='grid justify-items-center p-36'>
        <img src="/instagram-logo.png" alt="instagram-logo" className='h-48 mb-6 rotate-6' />
        <button onClick={() => onGoogleClick()} className='flex items-center font-semibold bg-slate-100 hover:bg-slate-200 hover:shadow px-6 py-1 rounded-md cursor-pointer transition-all ease-out duration-200'>
          <img src="/google-logo-xxs.png" alt="instagram-logo" className='h-10 pr-2' />
          Sign In with Google
        </button>
      </div>
    </>
  )
}