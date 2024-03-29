import axios from 'axios'


const request = axios.create({
    baseURL: '/api'
})

request.interceptors.request.use(config => {
    if (config.url === '/uploadFile' || config.url === '/getDirNames') {
        config.headers['Content-Type'] = 'multipart/form-data'
    }
    return config
}, error => {
    Promise.reject(error)
})

request.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error)
})

export default request