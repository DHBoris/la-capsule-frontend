import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userToken: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.userToken = action.payload;
      console.log(state.userToken);
      state.isLoggedIn = true;
    },
    userLoggedOut: (state) => {
      state.userToken = null;
      state.isLoggedIn = false;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;