import axios from "axios"
import { baseUrl } from "../Constant/Constant"

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use(async config => {
    let accessToken = localStorage.getItem('accessToken')

    if(accessToken) 
        config.headers.Authorization = 'Bearer ' + accessToken

    return config
}, error => {
    return Promise.reject(error)
})

//we intercept every response
axiosInstance.interceptors.response.use(response => {
    
    return response
}, async error => {
    
    /* if error of authorization -> refreshToken */
    if(error.response.status === 401) {
        const apiResp = await refreshToken()

        if(apiResp.status === 200) {
            const newAccessToken = apiResp.data.access_token
            localStorage.setItem('accessToken', newAccessToken)
            
            error.config.headers.Authorization = 'Bearer ' + newAccessToken
        }
    }

    return Promise.reject(error)
})

/* to refresh access token */
const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    const resp = await axios.post(`${baseUrl}/refresh`, {
        refreshToken: refreshToken
    })

    return resp
}

export default axiosInstance