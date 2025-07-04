import axios from "axios";

export const registerUser = async (name, email, password) => {
  try {
    console.log("hello");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/registeruser`,
      {
        name,
        email,
        password,
      },
      { withCredentials: true }
    );

    console.log(response.data.message);
    return response.data.message;
  } catch (error) {
    const errorMsg =
      error.response?.data?.data ||
      error.response?.data?.message ||
      error.message ||
      "Something went wrong!";

    toast.error(errorMsg, {
      position: "top-center",
    });
  }
};
