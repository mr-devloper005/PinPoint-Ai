import axios from "axios";

export const getMessages = async (chatId) => {
  const res = await axios.get(
    `http://localhost:8000/api/chat/getChatMessages/${chatId}`,
    { withCredentials: true }
  );
  return res.data;
};
