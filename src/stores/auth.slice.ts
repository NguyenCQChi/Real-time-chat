import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthType } from '../types';

export type AuthState = {
  currentUser: AuthType
}

const initialState: AuthState = {
  currentUser: null
}

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<AuthType>) => {
      state.currentUser = action.payload
    }
  }
})