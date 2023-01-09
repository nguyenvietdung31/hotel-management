import axios from "axios"
import axiosInstance from "../../Axios Interceptor/AxiosInstance"
import { baseUrl } from "../../constant/Constant"

/* handle post data to api: register, login, forgot password */
export const postDataService = async (path, obj) => {
    return await axios.post(`${baseUrl}${path}`, obj)
}

/* handle reset password */
export const resetPasswordService = async (resetCode, obj) => {
    return await axios.patch(`${baseUrl}/reset/${resetCode}`, obj)
}

/* handle change password */
export const changePasswordService = async (userID, obj) => {
    return await axiosInstance.patch(`${baseUrl}/users/${userID}`, obj)
}

