import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType, RoomType } from '../types';

export type ChatAppState = {
  users: UserType[];
  rooms: RoomType[];
}

const initialState: ChatAppState = {
  users: [],
  rooms: [],
};

const slice = createSlice({
  name: 'chatapp',
  initialState: initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
    },
    addUsers: (state, action: PayloadAction<UserType>) => {
      state.users = [...state.users, action.payload]
    }
  }
})

const { reducer, actions } = slice;

const {
  setUsers,
  addUsers
} = actions;

export {
  setUsers,
  addUsers
};

export default reducer;