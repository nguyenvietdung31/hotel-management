import { createSlice } from '@reduxjs/toolkit'

/* Create slice */
export const roomSlice = createSlice({
  name: 'room',

  initialState: {
    name: null,
    price: 0,
    size: 0,
    bed: null,
    type: null,
    startDate: null,
    endDate: null
  },

  reducers: {
    setRoomBooked: (state, action) => {
      state.name = action.payload.name
      state.price = action.payload.price
      state.size = action.payload.size
      state.bed = action.payload.bed
      state.type = action.payload.type
      state.startDate = action.payload.startDate
      state.endDate = action.payload.endDate
    },

  }
})

// Action creators are generated for each case reducer function
export const { setRoomBooked } = roomSlice.actions

export default roomSlice.reducer