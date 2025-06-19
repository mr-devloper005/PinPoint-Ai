import React from 'react'
import { FiPlus } from "react-icons/fi";
import { createChat } from '@/services/chat-services/createChat';
import { useDispatch, useSelector } from 'react-redux';
import { getMessagesThunk } from '@/slices/chat/chatSlice';


// function CreateChat() {
//   const dispatch = useDispatch()

//   const createNewChat = async ()=>{
//    const chatId = await createChat()
//    dispatch(getMessagesThunk(chatId))
//   }
//   return (
//     <button onClick={createNewChat} className='h-14 cursor-pointer w-full pl-4 bg-neutral-700 rounded-xl active:scale-95 hover:bg-neutral-500 outline-0 mt-3 flex gap-3 font-bold items-center z-10'>New Chat  <FiPlus className="text-white w-6 h-6" /></button>

//   )
// }

// export default CreateChat


const CreateChat = () => {
  const dispatch = useDispatch();
  const chats = useSelector(state => state.chat.userChats);
  const messages = useSelector(state => state.chat.messages);

  const createNewChat = async () => {
    const lastChat = chats[chats.length - 1];

    if (lastChat && messages.length === 0) {
      console.warn(" Previous chat is empty. Add message before creating a new one.");
      return;
    }


    try {
   const chatId = await createChat()
   dispatch(getMessagesThunk(chatId))
 
    } catch (error) {
      console.error(" Error creating chat:", error);
    }
  };

  return (
    <button
      onClick={createNewChat}
      className='h-14 cursor-pointer w-full pl-4 bg-neutral-700 rounded-xl active:scale-95 hover:bg-neutral-500 outline-0 mt-3 flex gap-3 font-bold items-center z-10'>
      New Chat <FiPlus className="text-white w-6 h-6" />
    </button>
  );
};

export default CreateChat;
