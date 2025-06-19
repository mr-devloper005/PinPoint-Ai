import React from 'react'
import Lottie from 'lottie-react'
import loadingAnimation from "@/assets/animations/loding.json"

function AuthLoading() {
  return (
    <div className='fixed inset-0 h-screen min-w-screen bg-white  z-50 flex flex-col-reverse justify center items-center px-50'>
      
         <Lottie  animationData={loadingAnimation} loop autoplay /> . . . Loading
      
    </div>
  )
}

export default AuthLoading