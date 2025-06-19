import React from 'react'

function ChatsSearch({searchQuery,setSearchQuery}) {
  return (
   <div className='h-14 w-full sticky top-20 bg-neutral-900 flex justify-between items-center z-10'><input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} type="text" placeholder='Search Chats' className='pl-3 h-full w-full  rounded-xl bg-neutral-700'/></div>
  )
}

export default ChatsSearch