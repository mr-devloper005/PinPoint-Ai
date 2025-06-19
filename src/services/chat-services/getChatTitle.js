import axios from "axios";

export const getChatTitle = async (content, chatId) => {
  const res = await axios.post(
    "http://localhost:8000/api/chat/getChatTitle",
    {
      content,
      chatId,
    },
    { withCredentials: true }
  );

  return res.data.data;
};
