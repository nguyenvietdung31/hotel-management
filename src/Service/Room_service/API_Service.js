import axios from "axios"
import { base_API_room } from "../../Constant/Constant"

/* get data of all rooms */
export const getAllData = async () => {
    const res = await axios.get(base_API_room)
    return res.data
}

/* get data of a room */
export const getRoomData = async (roomID) => {
    const res = await axios.get(`${base_API_room}/${roomID}`)
    return res.data
}

/* post data to api */
export const bookingService = async (path, obj) => {
    return await axios.post(`${base_API_room}${path}`, obj)
}