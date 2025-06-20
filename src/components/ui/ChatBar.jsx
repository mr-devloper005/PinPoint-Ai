// "use client"


// import { sendMessage } from '@/services/chat-services/sendMessage';
// import { addMessage, getChatTitleThunk, getUserChatsThunk, sendMessageThunk } from '@/slices/chat/chatSlice';
// import axios from 'axios';
// import React, { useState, useRef, useEffect } from 'react';
// import { FiArrowUp } from 'react-icons/fi'
// import { FiMic } from 'react-icons/fi'
// import { useDispatch, useSelector } from 'react-redux';
// import { setChatId } from '@/slices/chat/chatSlice';
// import { createChat } from '@/services/chat-services/createChat';


// function ChatBar() {

//   const [input, setInput] = useState('');
//   const textareaRef = useRef(null);
//   const dispatch = useDispatch();
//   const chatId = useSelector(state => state.chat.chatId);
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;



//     useEffect(() => {
//       if ("webkitSpeechRecognition" in window) {
//         const recog = new window.webkitSpeechRecognition();
//         recog.continuous = false;
//         recog.interimResults = false;
//         recog.lang = "hi-IN"; 
//         recognition.current = recog;

//         recog.onresult = (event) => {
//           const transcript = event.results[0][0].transcript;
//           setInput(transcript); 
//         };

//         recog.onerror = (err) => {
//           console.error("Speech recognition error:", err);
//         };
//       } else {
//         alert("Speech recognition not supported in this browser.");
//       }
//     }, []);

//     const startListning = () => {
//       if (recognition.current) recognition.current.start();
//     }


//   useEffect(() => {
//     const textarea = textareaRef.current;
//     if (textarea) {
//       textarea.style.height = 'auto';
//       textarea.style.height = textarea.scrollHeight + 'px';
//     }
//   }, [input]);

//   const sendPrompt = async () => {
//     if (!input.trim()) return;
//     dispatch(addMessage({ sender: "user", content: input }));
//     setInput("");

//     let currentChatId = chatId

//     if(!currentChatId){

//    currentChatId = await createChat()
//     dispatch(getUserChatsThunk());
// dispatch(getChatTitleThunk({ content: input, chatId: currentChatId }));
//    dispatch(setChatId(currentChatId))    

//     }
//     dispatch(sendMessageThunk({ chatId:currentChatId, content: input }));
//   };
//   return (
//     <div style={{ backgroundColor: '#303030' }}  className=" flex justify-center items-center w-[95%] m-3  md:w-2/4  fixed bottom-2 z-0 min-w-96  md:left-[30%] max-h-60 overflow-auto rounded-4xl bg-transparent  p-4">
//       <textarea 
//         ref={textareaRef}
//         style={{ backgroundColor: '#303030' }}
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         rows={1}
//         placeholder="Ask anything"
//         className="w-[95%] md:w-full rounded-4xl  text-xl pt-5 pb-5 tracking-wide pl-7  min-h-32 md:min-h-36 resize-none overflow-auto bg-transparent text-white outline-none"
//       />
//       <div className='flex gap-3 '> <button><FiMic className="w-14 active:scale-90 h-14 p-3 rounded-[100%] cursor-pointer text-white hover:bg-neutral-600"/></button>
//       <button  onClick={sendPrompt}><FiArrowUp className="w-14 active:scale-90 h-14 cursor-pointer p-3 hover:bg-neutral-400 bg-white rounded-[100%] " /></button></div>

//     </div>
//   );
// }

// export default ChatBar;



"use client";

import { sendMessage } from '@/services/chat-services/sendMessage';
import { addMessage, getChatTitleThunk, getUserChatsThunk, sendMessageThunk, setChatId } from '@/slices/chat/chatSlice';
import { createChat } from '@/services/chat-services/createChat';
import { useState, useRef, useEffect } from 'react';
import { FiArrowUp, FiMic } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

function ChatBar() {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);
  const dispatch = useDispatch();
  const chatId = useSelector((state) => state.chat.chatId) || ""
  const [isListening, setIsListening] = useState("")
  // const allMessages = useSelector((state) => state.chat.messages) || []



  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recog = new window.webkitSpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = 'en-IN';

      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => prev + ' ' + transcript);
      };

      recog.onstart = () => setIsListening(true);
      recog.onend = () => setIsListening(false);

      recog.onerror = (err) => {
        console.error('Speech recognition error:', err);
      };

      recognitionRef.current = recog;
    } else {
      console.warn("Speech recognition not supported in this browser.");
    }
  }, []);


  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };


  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [input]);

  const sendPrompt = async () => {
    if (!input.trim()) return;

    dispatch(addMessage({ sender: 'user', content: input }));
    setInput('');

    let currentChatId = chatId;

    if (!currentChatId) {
      currentChatId = await createChat();
      dispatch(getUserChatsThunk());
      dispatch(getChatTitleThunk({ content: input, chatId: currentChatId }));
      dispatch(setChatId(currentChatId));
    }

    dispatch(sendMessageThunk({ chatId: currentChatId, content: input }));
  };


  return (
    <div
      className="flex justify-center  items-center w-[95%] m-3 md:w-2/4 fixed bottom-2 z-10 min-w-96 md:left-[30%] max-h-60 overflow-auto rounded-4xl p-4"
      style={{ backgroundColor: '#303030' }}
    >
      <textarea onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); 
      sendPrompt(); 
    }
  }}
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={1}
        placeholder="Ask anything"
        className="w-[95%] md:w-full rounded-4xl text-xl pt-5 pb-5 tracking-wide pl-7 min-h-32 md:min-h-36 resize-none overflow-auto bg-transparent text-white outline-none"
        style={{ backgroundColor: '#303030' }}
      />
      <div className="flex gap-3  right-1 sticky">
        <button onClick={startListening}>
          <FiMic className={`w-14 h-14 p-3 rounded-full cursor-pointer hover:bg-neutral-600 ${isListening ? "text-red-400 bg-neutral-600" : "text-white"} active:scale-90`} />
        </button>
        <button onClick={sendPrompt}>
          <FiArrowUp className="w-14 h-14 p-3 cursor-pointer rounded-full bg-white text-black hover:bg-neutral-400 active:scale-90" />
        </button>
      </div>
    </div>

    
  );
}

export default ChatBar;
