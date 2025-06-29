"use client"

import LoginForm from '@/components/ui/LoginForm'
import { getCurrentUserThunk } from '@/slices/auth/authSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function page() {

  const router = useRouter()
  const dispatch = useDispatch()

useEffect(() => {
  dispatch(getCurrentUserThunk())
    .unwrap()
    .then(() => {
     router.push("/chat");
    })  .catch((err) => {
      console.log("🔥 Thunk failed in overview", err);
    })
   
}, []);

  return (
    <div className='h-screen w-full '>
      
      
        <LoginForm/>
      
      
      
      
      </div>
  )
}

export default page


