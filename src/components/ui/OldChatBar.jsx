"use client"


import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ToggleSidebar from '../smallComp/ToggleSidebar';
import ChatsSearch from '../smallComp/ChatsSearch';
import { motion, AnimatePresence } from "framer-motion";
import {useDispatch, useSelector} from 'react-redux';
import {createChat} from '@/services/chat-services/createChat';
import {getUserChatsThunk, setChatId} from '@/slices/chat/chatSlice';
import SkeletonUi from '../smallComp/loaders/SkeletonUi';
import ToolBar from '../smallComp/ToolBar';
import CreateChat from '../smallComp/CreateChat';

function OldChatBar() {

  
const [isVisible, setIsVisible] = useState(true);
const dispatch  =  useDispatch()
const isLoading = useSelector(state => state.chat.getChatLoading )
const userChats = useSelector(state => state.chat.userChats) || []
const [searchQuery, setSearchQuery] = useState('');


// const filteredChats = userChats?.filter(chat =>
//   chat.title?.toLowerCase().includes(searchQuery.toLowerCase())
// );

const filteredChats = (userChats || []).filter(chat =>
  chat?.title?.toLowerCase().includes(searchQuery.toLowerCase())
);


  const getThisChatMessages = (chatId)=>{
    dispatch(setChatId(chatId))
  }

  useEffect(() => {
    dispatch(  getUserChatsThunk())
   
  }, []);

  useEffect(() => {
    if (isVisible && typeof window !== "undefined" && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isVisible]);

  return (
    <>
    <AnimatePresence>
      {!isVisible && (
        <div className="fixed top-4 left-4 z-40">
          <ToggleSidebar toggle={() => setIsVisible(true)} />
        </div>
      )}
      
      {isVisible && (
  <div
    className="fixed inset-0 bg-black opacity-70 z-30 md:hidden"
    onClick={() => setIsVisible(false)}
  ></div>
)}



      {isVisible && (

           <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className={`fixed top-0 cursor-pointer left-0 h-screen bg-neutral-900 text-amber-50 z-40 flex flex-col
           transition-transform duration-700 ease-in-out
           w-full sm:w-2/3 md:w-1/3 lg:w-1/4 max-w-[300px]`}
            >
        
          <div className="h-20 w-full sticky top-0 bg-neutral-900 flex justify-between items-center px-4 z-10">
            <Image
              src="/ai.png"
              alt="pinpointai"
           width={45}
           height={49}
              className="object-cover rounded-xl"
            />
            <ToggleSidebar toggle={() => setIsVisible(false)} />
          </div>
          <div className='flex px-4'><CreateChat/>  </div>

          <div className="px-4 mt-3">
            <ChatsSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>


          <div className="flex-1 overflow-auto px-4 mt-4 custom-scrollbar pb-4">
            {isLoading && <SkeletonUi></SkeletonUi>}
            {filteredChats.map((obj) => (
              <p onClick={e => getThisChatMessages(obj._id)}
                key={obj._id}
                className="hover:bg-neutral-600 mt-2 h-14 rounded-xl flex items-center w-full truncate p-2"
              >
                {obj.title}
              </p>
            ))}
          </div>

          <ToolBar/>
        </motion.div>
        
      )}
      </AnimatePresence>
    </>
  );
}

export default OldChatBar;

