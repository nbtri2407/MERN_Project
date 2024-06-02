import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import filterReducer from './filterSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer
  },
})