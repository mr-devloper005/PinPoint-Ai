

// import ChatBar from '@/components/ui/ChatBar'
// import ChatsDisplay from '@/components/ui/ChatsDisplay'
// import OldChatBar from '@/components/ui/OldChatBar'
// import React from 'react'

// function page() {



//   return (
//     <div className='min-h-screen  min-w-screen absolute  bg-neutral-950 flex justify-center'>
//       <OldChatBar/><ChatBar/> <ChatsDisplay/></div>
//   )
// }

// export default page

"use client"

import ChatBar from '@/components/ui/ChatBar'
import ChatsDisplay from '@/components/ui/ChatsDisplay'
import OldChatBar from '@/components/ui/OldChatBar'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Page() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

    const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className='min-w-screen min-h-screen bg-neutral-950 flex relative'>
      <OldChatBar isVisible={sidebarVisible} setIsVisible={setSidebarVisible} />
      <main className={`flex-1 overflow-x-hidden transition-all duration-300 ${sidebarVisible ? 'ml-0 md:ml-[25%]' : ''}`}>

        <ChatBar />
        <ChatsDisplay />
      </main>
    </div>
  );
}

export default Page;
