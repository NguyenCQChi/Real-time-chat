import { configureStore } from '@reduxjs/toolkit';
import chatapp, { ChatAppState } from './chat.slice';
import { createWrapper } from 'next-redux-wrapper';

export const store = configureStore({
  reducer: chatapp
})

const makeStore = () => store

export type RootState = {
  chatapp: ChatAppState
}

export type AppDispatch = typeof store.dispatch

const wrapper = createWrapper(makeStore)
export { wrapper }
