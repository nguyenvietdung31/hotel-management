import axios from "axios"
import axiosInstance from "../../config/axios/AxiosInstance"
import { BASE_URL } from "../../utility/constant/Constant"

/* handle post data to api: register, login, forgot password */
export const postDataService = async (path, obj) => {
    return await axios.post(`${BASE_URL}${path}`, obj)
}

/* handle reset password */
export const resetPasswordService = async (resetCode, obj) => {
    return await axios.patch(`${BASE_URL}/reset/${resetCode}`, obj)
}

/* handle change password */
export const changePasswordService = async (userID, obj) => {
    return await axiosInstance.patch(`${BASE_URL}/users/${userID}`, obj)
}

