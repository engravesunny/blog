import axios from "axios";

const getPostRequest = axios.create({
    baseURL: 'https://kecat.top/' //不跨域
    // baseURL: '/post' // 跨域开发用
})

export const getPOSTJSON = () => getPostRequest({
    method: 'GET',
    url: '/JSON/POSTINFO.json',
})
export default getPOSTJSON