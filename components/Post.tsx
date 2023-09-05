/* eslint-disable @next/next/no-img-element */
import { userState } from '@/atom/userAtom';
import { db } from '@/firebase';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { BsChatDots, BsBookmark, BsHeart, BsEmojiSmile, BsHeartFill } from 'react-icons/bs'
import Moment from 'react-moment';
import { useRecoilState } from 'recoil';

export default function Post({ img, userImg, username, id, caption, timestamp }: any) {
  //const { data: session }: any = useSession();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  const [currentUser, setCurrentUser]: any = useRecoilState(userState);
  
  //console.log("session data user uid", session.user.uid);

  useEffect(() => {
    const unsubsribe = onSnapshot(
      query(collection(db, "posts", id, "comments"), orderBy(("timestamp"), "desc")), (snapshot: any) => {
        setComments(snapshot.docs)
      }
    );
    return unsubsribe;
  }, [id])

  async function sentCommentToDb(event: any) {
    event.preventDefault();
    const commentToSend = comment;
    setComment('');

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      // username: session?.user?.name,
      // userImage: session?.user?.image,
      username: currentUser?.name,
      userImage: currentUser?.userImg,
      timestamp: serverTimestamp(),
    })
  }

  useEffect(() => {
    const unsubsribe = onSnapshot(collection(db, "posts", id, "likes"), (snapshot: any) => setLikes(snapshot.docs));
    return unsubsribe;
  }, [id]);

  // useEffect(() => {
  //   setHasLiked(
  //     likes.findIndex((like: any) => like.id === session?.user?.uid) !== -1
  //   )
  // }, [likes, session?.user?.uid])
  useEffect(() => {
    setHasLiked(
      likes.findIndex((like: any) => like.id === currentUser?.uid) !== -1
    )
  }, [likes, currentUser?.uid])

  // async function likePost() {
  //   if (hasLiked) {
  //     await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
  //   } else {
  //     await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
  //       username: session?.user?.name,
  //     });
  //   }
  // }
  async function likePost() {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", currentUser?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", currentUser?.uid), {
        username: currentUser?.name,
      });
    }
  }

  return (
    <div className='bg-white my-6 border rounded-md'>
      {/* post header */}
      <div className='flex items-center p-6'>
        <div className='flex items-center space-x-2 flex-1'>
          <img src={userImg} alt={username} className='rounded-full h-14 object-cover border p-0.5 border-gray-400 hover:scale-110 transition-transform ease-out duration-200 cursor-pointer' />
          <p className='font-semibold'>{username}</p>
        </div>
        <BiDotsHorizontalRounded className='text-2xl hover:scale-125 transition-transform ease-out duration-200 cursor-pointer' />
      </div>

      {/* post img */}
      <img src={img} alt={img} className='object-cover w-full' />

      {/* post buttons */}
      {/* {session && ( */}
      {currentUser && (
        <div className='flex items-center justify-between px-6 pt-6'>
          <div className='flex space-x-6 items-center'>
            <div className='flex space-x-2 items-center'>
              {hasLiked ? (
                <BsHeartFill onClick={() => likePost()} className='text-2xl text-red-400 hover:scale-125 transition-transform ease-out duration-200 cursor-pointer' />
              ) : (
                <BsHeart onClick={() => likePost()} className='text-2xl hover:scale-125 transition-transform ease-out duration-200 cursor-pointer' />
              )}
              {likes.length > 0 && (
                <p className='font-semibold text-xs'>{likes.length} likes</p>
              )}
            </div>
            <BsChatDots className='text-2xl hover:scale-125 transition-transform ease-out duration-200 cursor-pointer' />
          </div>
          <BsBookmark className='text-2xl hover:scale-125 transition-transform ease-out duration-200 cursor-pointer' />
        </div>
      )}

      {/* post comments */}
      <div className='flex space-x-3 p-6 items-center justify-between'>
        <p className='font-semibold'>{username}</p>
        <p className='flex-1'>{caption}</p>
        <div className='flex space-x-3 items-center'>
          <p className='text-[10px]'>{new Date(timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000).toLocaleTimeString()}</p>
          <p className='text-[10px]'>{new Date(timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000).toDateString().slice(4)}</p>
        </div>
      </div>
      {comments?.length > 0 && (
        <div className='px-6 max-h-28 overflow-scroll scrollbar-none'>
          {comments?.map((comment: any) => (
            <div key={comment.id} className='flex items-center pb-4 space-x-2 justify-between'>
              <img src={comment.data().userImage} alt={userImg} className='h-8 rounded-full' />
              <p className='font-semibold text-xs'>{comment.data().username}</p>
              <p className='text-xs flex-1'>{comment.data().comment}</p>
              <div className='flex space-x-3 items-center'>
                <Moment fromNow className='text-[10px]'>{comment.data().timestamp?.toDate()}</Moment>
                {/* <p className='text-[10px]'>{new Date(comment.data().timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000).toLocaleTimeString()}</p>
                <p className='text-[10px]'>{new Date(comment.data().timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000).toDateString().slice(4)}</p> */}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* post input box */}
      {/* {session && ( */}
      {currentUser && (
        <form action="" className='flex space-x-4 items-center p-6'>
          <BsEmojiSmile className='text-2xl' />
          <input type="text" placeholder='Enter your comment' value={comment} onChange={(event: any) => setComment(event.target.value)} className='p-3 border rounded-md focus:ring-0 focus:outline-0 flex-1' />
          <button disabled={!comment?.trim()} onClick={sentCommentToDb} type="submit" className='bg-blue-400 px-4 py-2 text-sm rounded-md text-white hover:bg-blue-500 disabled:bg-gray-300 cursor-pointer transition-all ease-out duration-200 disabled:cursor-not-allowed'>POST</button>
        </form>
      )}
    </div>
  )
}
