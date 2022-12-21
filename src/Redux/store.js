import { configureStore } from '@reduxjs/toolkit'
import roomSlice from './Slice/roomSlice'

export default configureStore({
    reducer: {
        room: roomSlice
    }
})