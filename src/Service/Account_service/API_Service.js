import axios from "axios"
import axiosInstance from "../../Axios Interceptor/AxiosInstance"

const API_account = 'https://639003d065ff41831106d1c8.mockapi.io/api/login/Account'
const API_resetP = 'api_reset_password'

/* post data to api */
export const postDataService = async (obj) => {
    return await axios.post(API_account, obj)
}


/* patch data */
export const resetPasswordService = async (obj) => {
    return await axiosInstance.patch(API_resetP, obj)
}


/* patch data */
export const changePasswordService = async (userID, obj) => {
    return await axiosInstance.patch(`${API_account}/${userID}`, obj)
}

