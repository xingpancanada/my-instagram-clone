/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useRef, useState } from 'react'
import { useRecoilState } from 'recoil';
import { modalState } from '../atom/modalAtom';
import Modal from 'react-modal';
import { BsFillCameraFill } from 'react-icons/bs';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { userState } from '@/atom/userAtom';

export default function UploadModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef: any = useRef(null);
  const captionRef: any = useRef(null);

  //const {data: session}: any = useSession();
  const [currentUser, setCurrentUser]: any = useRecoilState(userState);

  // read image file from input
  function addImageToPost(event: any) {
    const reader = new FileReader();
    console.log("event.target.files:", event.target.files);
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (readerEvent: any) => {
      console.log("readerEvent:", readerEvent);
      setSelectedFile(readerEvent.target.result);
    }
    console.log("selected file:", selectedFile);
  }

  //post to firestore and firebase storage
  async function uploadPost() {
    if(loading) return;
    setLoading(true);
    //post to firestore
    const docRef: any = await addDoc(collection(db, "posts"), {
      caption: captionRef.current.value,
      // username: session.user.name,
      // profileImg: session.user.image,
      username: currentUser?.name,
      profileImg: currentUser?.userImg,
      timestamp: serverTimestamp(),
    });
    //store image into firebase storage & update document to add image downloadURL
    const imageRef: any = ref(storage, `posts/${docRef.id}/image`);
    if(selectedFile){
      await uploadString(imageRef, selectedFile, "data_url").then(
        async(snapshot: any)=>{
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "posts", docRef.id), {
            image: downloadURL, //https://firebasestorage.googleapis.com/v0/b/my-instagram-clone-30ea4.appspot.com/o/posts%2FrHwxhChteUV08SUkMPCs%2Fimage?alt=media&token=35619730-b6ee-45b6-972d-c42d93ffb8a5
          })
        }
      );
    }
    //init some settings
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  }

  return (
    <div>
      {open && (
        <Modal isOpen={open} onRequestClose={() => {setOpen(false); setSelectedFile(null);}} className="max-w-xl w-[90%] p-6 absolute top-[25%] left-[50%] translate-x-[-50%] bg-white border-1 border-gray-300 rounded-lg shadow-lg focus:outline-none">
          <div className='flex flex-col justify-center items-center h-[100%]'>

            {selectedFile ? (
              <img onClick={() => setSelectedFile(null)} src={selectedFile} alt="" className='w-auto max-h-[250px] object-cover cursor-pointer rounded' />
            ) : (
              <div className='bg-red-200 p-4 my-6 rounded-full border-2 shadow'>
                <BsFillCameraFill onClick={() => filePickerRef.current.click()} className='text-3xl cursor-pointer text-red-700' />
              </div>
            )}

            <input type="file" hidden ref={filePickerRef} onChange={addImageToPost} />

            <textarea ref={captionRef} maxLength={200} placeholder='Please enter your caption...' className='m-6 border-none p-2 w-[90%] outline-gray-300 outline-[1px]' />
            <button disabled={!selectedFile || loading} onClick={uploadPost} className='bg-blue-400 px-4 py-2 text-sm rounded-md text-white shadow hover:bg-blue-500 cursor-pointer transition-all ease-out duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed'>Upload Post</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
