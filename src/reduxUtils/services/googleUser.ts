import {createSlice} from '@reduxjs/toolkit';

const googleUserSlice = createSlice({
  name: 'googleUser',
  initialState: {user: null, isCheckingSignIn: true},
  reducers: {
    setGoogleUser: (state, action) => {
      state.user = action.payload;
    },
    setCheckingSignIn: (state, action) => {
      state.isCheckingSignIn = action.payload;
    },
  },
});

export default googleUserSlice.reducer;

export const {setGoogleUser, setCheckingSignIn} = googleUserSlice.actions;

export const selectGoogleUser = (state: any) => state.googleUser.user;
export const selectCheckingSignIn = (state: any) =>
  state.googleUser.isCheckingSignIn;
