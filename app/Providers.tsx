"use client"
import { SessionProvider, getProviders } from 'next-auth/react';
import React, { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

interface Props {
  children: ReactNode;
}

// for next-auth
// add RecoilRoot here to avoid 'use client' issues
export default function NextAuthProviders(props: Props) {
  return (
    <SessionProvider>
      <RecoilRoot>
        {props.children}
      </RecoilRoot>
    </SessionProvider>
  )
}

// export async function getServerSideProps(content: any){
//   const providers = await getProviders();
//   return {
//     props: {providers}
//   }
// }
