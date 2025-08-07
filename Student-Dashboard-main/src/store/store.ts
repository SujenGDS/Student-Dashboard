import { configureStore } from '@reduxjs/toolkit'
import assignmentsReducer from './slices/assignmentsSlice'
import subjectsReducer from './slices/subjectsSlice'

 const store = configureStore({
  reducer: {
    assignments: assignmentsReducer,
    subjects: subjectsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch