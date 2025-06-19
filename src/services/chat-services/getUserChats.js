import axios from "axios";

export const getUserChats = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/getUserChats`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching chats", error);
  }
};
