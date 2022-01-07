import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './Reducers/counterReducer'
import authSlice from './Reducers/AuthReducer'

const store = configureStore({
    reducer: {
        counter: counterSlice,
        Authentication: authSlice,
     } //add reducers here
})

export default store;