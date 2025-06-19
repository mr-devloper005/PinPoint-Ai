import axios from "axios";

export const getMessages = async (chatId) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/getChatMessages/${chatId}`,
    { withCredentials: true }
  );
  return res.data;
};
