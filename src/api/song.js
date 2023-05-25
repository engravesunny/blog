import axios from "axios";

const getSongRequest = axios.create({
    baseURL: '/song'
})

export const getSong = params => getSongRequest({
    url: '/cloudsearch',
    params
})
export const getUrl = params => getSongRequest({
    url: "/song/url",
    params
})
