import axios from "axios";

export const createChat = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/create`,
    {
      withCredentials: true,
    }
  );

  const chatId = res.data.chat._id;

  console.log(chatId);

  return chatId;
};
