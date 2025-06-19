import axios from "axios";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/loginuser`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    return response.data.message;
  } catch (error) {
    console.log(error);
  }
};
