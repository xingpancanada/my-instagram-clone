'use client'
import React from 'react'
import Post from './Post'

export default function Posts() {
  const posts = [
    {
      id: '1',
      username: 'xing',
      userImg: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      img: 'https://images.unsplash.com/photo-1691491071054-6371dfc47d6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      caption: 'Music Heaven',
    },
    {
      id: '2',
      username: 'pan',
      userImg: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      img: 'https://images.unsplash.com/photo-1682685797229-b2930538da47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      caption: 'Life and death',
    }
  ]
  return (
    <div>
      {
        posts.map((post: any) => (
          <Post key={post.id} id={post.id} username={post.username} userImg={post.userImg} img={post.img} caption={post.caption} />
        ))
      }
    </div>
  )
}
