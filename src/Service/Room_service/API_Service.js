import axios from "axios"
import { BASE_API_ROOMS } from "../../utility/constant/Constant"

/* get data of all rooms */
export const getAllData = async () => {
    const res = await axios.get(BASE_API_ROOMS)
    return res.data
}

/* get data of a room */
export const getRoomData = async (roomID) => {
    const res = await axios.get(`${BASE_API_ROOMS}/${roomID}`)
    return res.data
}

/* post data to api */
export const bookingService = async (path, obj) => {
    return await axios.post(`${BASE_API_ROOMS}${path}`, obj)
}