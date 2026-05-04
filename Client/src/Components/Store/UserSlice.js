
import { createSlice } from "@reduxjs/toolkit";

const getInitialUser = () => {
  const storedValue = localStorage.getItem("user");

  if (storedValue === null || storedValue === "undefined") {
    return null;
  }

  try {
    return JSON.parse(storedValue);
  } catch (error) {
    return null;
  }
};

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: getInitialUser(),
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },

    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    //  ADD THIS (IMPORTANT FIX)
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, setUser } = UserSlice.actions;
export default UserSlice.reducer;