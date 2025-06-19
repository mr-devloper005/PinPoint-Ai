import axios from "axios";

export const sendMessage = async (chatId, content) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/ai/${chatId}`,
    { content },
    { withCredentials: true }
  );

  return response;
};
