import axios from "axios";

const getPostRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export const getPOSTJSON = () => getPostRequest({
    method: 'GET',
    url: '/JSON/POSTINFO.json',
})
export const getDATAJSON = () => getPostRequest({
    method: 'GET',
    url: '/JSON/DATAINFO.json',
})

export default getPOSTJSON