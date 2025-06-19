import { googleAuth } from "@/services/auth-services/googleAuth";
import { loginUser } from "@/services/auth-services/login";
import { registerUser } from "@/services/auth-services/register";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  isLogin: false,
  isLoading: false,
  isAuthenticated: false,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password, toast, router }, thunkAPI) => {
    try {
      const res = await loginUser(email, password);

      toast.success("Registered Successfully", {
        position: "top-center",
      });

      router.push("/chat");

      return res;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";

      toast.error(errorMsg, {
        position: "top-center",
      });

      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, toast, router }, thunkAPI) => {
    try {
      const res = await registerUser(name, email, password);

      toast.success("Registered Successfully", {
        position: "top-center",
      });

      router.push("/chat");

      return res;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";

      toast.error(errorMsg, {
        position: "top-center",
      });

      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const googleAuthThunk = createAsyncThunk(
  "auth/googleAuth",
  async ({ response, toast, router }) => {
    try {
      const res = await googleAuth(response);
      router.push("/chat");
      toast.success(res.message);
      return res;
    } catch (error) {
      toast.error(error?.response?.data || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userName = action.payload.name;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.userName = action.payload.name;
        state.isAuthenticated = true;

        console.log(action.payload.name);
      })
      .addCase(registerThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(googleAuthThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleAuthThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userName = action.payload.name;
        state.isAuthenticated = true;

        console.log(action.payload.name);
      })
      .addCase(googleAuthThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice;
