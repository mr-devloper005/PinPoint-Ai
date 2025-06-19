import axios from "axios";

export const createChat = async () => {
  const res = await axios.get("http://localhost:8000/api/chat/create", {
    withCredentials: true,
  });

  const chatId = res.data.chat._id;

  console.log(chatId);

  return chatId;
};
