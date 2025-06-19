import axios from "axios";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/loginuser",
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
