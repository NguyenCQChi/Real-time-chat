import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType, RoomType, MessageType } from '../types';

export type ChatAppState = {
  users: UserType[];
  rooms: RoomType[];
  chosenUser: UserType;
  messages: MessageType[];
}

const initialState: ChatAppState = {
  users: [],
  rooms: [],
  chosenUser: null,
  messages: []
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
    },
    setChosenUser: (state, action: PayloadAction<UserType>) => {
      state.chosenUser = action.payload;
    },
    addRoom: (state, action: PayloadAction<RoomType>) => {
      state.rooms = [...state.rooms, action.payload]
    },
    setRoom: (state, action: PayloadAction<RoomType[]>) => {
      state.rooms = action.payload;
    },
    addMessage: (state, action: PayloadAction<MessageType>) => {
      state.messages = [...state.messages, action.payload]
    }
  }
})

const { reducer, actions } = slice;

const {
  setUsers,
  addUsers,
  setChosenUser,
  setRoom,
  addRoom,
  addMessage
} = actions;

export {
  setUsers,
  addUsers,
  setChosenUser,
  setRoom,
  addRoom,
  addMessage
};

export default reducer;