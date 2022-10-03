import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isAuthenticated: false,
  sesstionToken: '',
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sesstionId = localStorage.getItem('session');

      localStorage.setItem('accountId', action.payload.id);
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
export const userSelector = (state) => state.user;
