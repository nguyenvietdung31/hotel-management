import axios from "axios"

/* base API room */
const API = 'https://639003d065ff41831106d1c8.mockapi.io/api/login/rooms'

/* get data of all rooms */
export const getAllData = async () => {
    const res = await axios.get(API)
    return res.data
}

/* get data of a room */
export const getRoomData = async (roomID) => {
    const res = await axios.get(`${API}/${roomID}`)
    return res.data
}