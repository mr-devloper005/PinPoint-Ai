import axios from "axios";

export const updateChatLanguage = async (chatId, language) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/updateLanguage`,
      {
        chatId: chatId,
        language: language,
      },
      { withCredentials: true }
    );

    console.log(response);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.log("error in Update Chat Language");
  }
};
