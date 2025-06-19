import React from 'react'
import { ClipLoader } from "react-spinners";

function SkeletonUi() {
  return (
      <>  
    <div className="w-full h-12 bg-neutral-700 rounded-md animate-pulse mb-2"></div>
    <div className="w-full h-12 bg-neutral-700 rounded-md animate-pulse mb-2"></div>
    <div className="w-full h-12 bg-neutral-700 rounded-md animate-pulse mb-2"></div>
    <div className="w-full h-12 bg-neutral-700 rounded-md animate-pulse mb-2"></div>
    <div className="w-full h-12 bg-neutral-700 rounded-md animate-pulse mb-2"></div>
    <div className="w-full h-12 bg-neutral-700 rounded-md animate-pulse mb-2"></div>
    <div className="w-full h-12 bg-neutral-700 rounded-md animate-pulse mb-2"></div>
 </>
  )
}

export default SkeletonUi