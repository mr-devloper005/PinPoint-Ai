import axios from "axios";

export const getUserChats = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/chat/getUserChats",
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching chats", error);
  }
};
