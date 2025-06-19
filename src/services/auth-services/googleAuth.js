import axios from "axios";

export const googleAuth = async (response) => {
  const idToken = response.credential;

  try {
    const res = await axios.post(
      "http://localhost:8000/api/auth/googleauth",
      {
        token: idToken,
      },
      { withCredentials: true }
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
