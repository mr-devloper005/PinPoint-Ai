import axios from "axios";

export const googleAuth = async (response) => {
  const idToken = response.credential;

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/googleauth`,
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
