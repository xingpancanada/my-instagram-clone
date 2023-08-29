'use client'
import { useEffect, useState } from 'react'
import Post from './Post'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';

export default function Posts() {
  // const posts = [
  //   {
  //     id: '1',
  //     username: 'sam',
  //     userImg: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
  //     img: 'https://images.unsplash.com/photo-1691491071054-6371dfc47d6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  //     caption: 'Music Heaven',
  //   },
  //   {
  //     id: '2',
  //     username: 'john',
  //     userImg: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
  //     img: 'https://images.unsplash.com/photo-1682685797229-b2930538da47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  //     caption: 'Life and death',
  //   }
  // ]

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'posts'), orderBy(('timestamp'), "desc")),
      (snapshot: any) => {
        setPosts(snapshot.docs);
      }
    );
    return unsubscribe; //if no return here, then it loops forever
  }, [posts])

  //console.log(posts);

  return (
    <div>
      {
        posts.map((post: any) => (
          <Post key={post.id} id={post.id} username={post.data().username} userImg={post.data().profileImg} img={post.data().image} caption={post.data().caption} timestamp={post.data().timestamp} />
        ))
      }
    </div>
  )
}
