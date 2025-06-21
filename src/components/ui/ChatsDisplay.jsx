

"use client";

import { getMessagesThunk } from "@/slices/chat/chatSlice";
import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { FiCopy } from "react-icons/fi";
import toast from "react-hot-toast";
import ChatLoding from "../smallComp/loaders/ChatLoding";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

function ChatsDisplay() {
  const loading = useSelector(state => state.chat.loading);
  const messages = useSelector((state) => state.chat.messages) || []
  const chatId = useSelector((state) => state.chat.chatId) || ""
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push("/login");
  //   }
  // }, [isAuthenticated]);

  // if (!isAuthenticated) {
  //   return null; 
  // }

  useEffect(() => {
    if (chatId) {
      dispatch(getMessagesThunk(chatId));
    }
  }, [chatId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  return (

    <div className="flex-1  w-full md:w-5/6 overflow-y-auto px-4  justify-center bg-neutral-950">
  <div className="max-w-3xl mb-44 mt-28 mx-auto flex flex-col gap-6">

      {!loading && messages?.length === 0 && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center mt-50 text-white px-4"
    >
      <h1 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-500 animate-pulse">
        Welcome to Pinpoint AI
      </h1>
      <p className="mt-4 text-lg text-gray-400">Start a conversation to begin your journey.</p>
    </motion.div>
  )}
{/* 

    {messages?.map((message, index) => {
      const isUser = message.sender === "user";

      return (
        <div
          key={index}
          className={`flex flex-col gap-2 ${isUser ? "items-end" : "items-start"}`}
        >
          <div
            className={`w-fit max-w-[100%] sm:max-w-[95%]  p-3 rounded-2xl relative group shadow-lg transition-all duration-300 ${
              isUser
                ? "bg-gradient-to-br from-neutral-800 to-neutral-900 text-white self-end"
                : " text-gray-100 self-start"
            }`}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-4 mt-6">
                    {props.children}
                  </h1>
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-200 mb-3 mt-5">
                    {props.children}
                  </h2>
                ),
                p: ({ node, ...props }) => (
                  <p className="text-base sm:text-lg text-gray-100 mb-4">
                    {props.children}
                  </p>
                ),
                a: ({ href, ...props }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 underline hover:text-sky-300"
                  >
                    {props.children}
                  </a>
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-semibold text-white">
                    {props.children}
                  </strong>
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-6 text-gray-100 space-y-2 mb-4">
                    {props.children}
                  </ul>
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal pl-6 text-gray-100 space-y-2 mb-4">
                    {props.children}
                  </ol>
                ),
                li: ({ node, ...props }) => (
                  <li className="leading-relaxed">{props.children}</li>
                ),
                code: ({ inline, children, ...props }) =>
                  inline ? (
                    <code className="bg-neutral-800 text-green-300 px-2 py-1 rounded text-base font-mono">
                      {children}
                    </code>
                  ) : (
                    <pre className="bg-neutral-900 border border-neutral-700 rounded-lg p-5 overflow-x-auto text-green-300 text-base font-mono mt-4 mb-4">
                      <code>{children}</code>
                    </pre>
                  ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-300 my-4">
                    {props.children}
                  </blockquote>
                ),
                hr: () => (
                  <hr className="my-6 border-t border-neutral-700 opacity-40" />
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>

            <button
              onClick={() => navigator.clipboard.writeText(message.content)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20 p-2 rounded-lg text-white"
              title="Copy"
            >
              <FiCopy size={16} />
            </button>
          </div>
        </div>
      );
    })} */}

    {messages?.map((message, index) => {
  const isUser = message.sender === "user";

  return (
    <div
      key={index}
      className={`flex flex-col gap-2 ${isUser ? "items-end" : "items-start"}`}
    >
      <div
        className={`max-w-[95%] w-fit px-6 py-4 rounded-2xl relative group shadow-xl transition-all duration-300 
        ${isUser 
          ? "bg-gradient-to-br from-neutral-800 to-neutral-900 text-white text-center font-semibold tracking-wide"
          : "bg-neutral-900 text-gray-100"
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            p: ({ node, ...props }) => (
              <p className={`text-lg sm:text-xl leading-relaxed ${isUser ? "text-gray-100 text-center" : "text-gray-200"}`}>
                {props.children}
              </p>
            ),
            h1: ({ node, ...props }) => (
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-4 mt-6">
                {props.children}
              </h1>
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-200 mb-3 mt-5">
                {props.children}
              </h2>
            ),
            a: ({ href, ...props }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline hover:text-sky-300"
              >
                {props.children}
              </a>
            ),
            strong: ({ node, ...props }) => (
              <strong className="font-semibold text-white">
                {props.children}
              </strong>
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-6 text-gray-100 space-y-2 mb-4">
                {props.children}
              </ul>
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal pl-6 text-gray-100 space-y-2 mb-4">
                {props.children}
              </ol>
            ),
            li: ({ node, ...props }) => (
              <li className="leading-relaxed">{props.children}</li>
            ),
            code: ({ inline, children, ...props }) =>
              inline ? (
                <code className="bg-neutral-800 text-green-300 px-2 py-1 rounded text-base font-mono">
                  {children}
                </code>
              ) : (
                <pre className="bg-neutral-900 border border-neutral-700 rounded-lg p-5 overflow-x-auto text-green-300 text-base font-mono mt-4 mb-4">
                  <code>{children}</code>
                </pre>
              ),
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-300 my-4">
                {props.children}
              </blockquote>
            ),
            hr: () => (
              <hr className="my-6 border-t border-neutral-700 opacity-40" />
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>

        <button
          onClick={() => navigator.clipboard.writeText(message.content)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20 p-2 rounded-lg text-white"
          title="Copy"
        >
          <FiCopy size={16} />
        </button>
      </div>
    </div>
  );
})}


    {loading && <ChatLoding />}
    <div ref={scrollRef} />
  </div>
</div>

  );
}

export default ChatsDisplay;
