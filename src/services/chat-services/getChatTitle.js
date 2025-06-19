import axios from "axios";

export const getChatTitle = async (content, chatId) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/getChatTitle`,
    {
      content,
      chatId,
    },
    { withCredentials: true }
  );

  return res.data.data;
};
