import axios from "axios"


const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(config => {
    //anything you want to attach to the requests such as token 
    config.params = config.params || {}
    // config.params['auth'] = localStorage.getItem('userToken')
    config.params['auth'] = localStorage.getItem('userToken')

    return config
}, error => {
    return Promise.reject(error)
})

//we intercept every response
axiosInstance.interceptors.response.use(response => {
    
    return response
}, error => {
    //check for authentication or anything like that
    return Promise.reject(error)
})

export default axiosInstance