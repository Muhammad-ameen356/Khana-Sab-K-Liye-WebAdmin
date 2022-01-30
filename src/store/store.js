import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import counterSlice from './Reducers/counterReducer'
import authSlice from './Reducers/AuthReducer'

const store = configureStore({
    reducer: {
        counter: counterSlice,
        Authentication: authSlice,
        middleware: getDefaultMiddleware({
            serializableCheck: false,
        }),
    } //add reducers here
})

export default store;