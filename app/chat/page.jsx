

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
import React, { useState } from 'react'

function Page() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className='min-w-screen min-h-screen bg-neutral-950 flex relative'>
      <OldChatBar isVisible={sidebarVisible} setIsVisible={setSidebarVisible} />
      <main className={`flex-1 overflow-x-hidden transition-all duration-300 ${sidebarVisible ? 'ml-0 md:ml-[25%]' : ''}`}>
        {/* <h1 className=' absolute top-3 pl-36 w-full md:w-2/3 h-20 flex justify-center md:pl-20 items-center font-bold text-3xl  text-white text-center'>PinPoint Ai</h1> */}
        <ChatBar />
        <ChatsDisplay />
      </main>
    </div>
  );
}

export default Page;
