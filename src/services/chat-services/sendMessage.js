import axios from "axios";

export const sendMessage = async (chatId, content) => {
  const response = await axios.post(
    `http://localhost:8000/api/chat/ai/${chatId}`,
    { content },
    { withCredentials: true }
  );

  return response;
};
