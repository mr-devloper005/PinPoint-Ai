import { logoutThunk } from '@/slices/auth/authSlice'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

function Logout() {
    const dispatch = useDispatch()
    const router = useRouter()
  const handleLogout = async ()=>{

   
    dispatch(logoutThunk({toast , router}))
  }
  return (
<button onClick={handleLogout} className='text-red-500 font-bold text-2xl h-14 w-full md:w-1/2 hover:bg-neutral-600 rounded-2xl bg-neutral-800 cursor-pointer'>Logout</button>  )
}

export default Logout