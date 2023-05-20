import axios from "axios";

const getSongRequest = axios.create({
    baseURL: 'http://kecat.top:3000/'
})

export const getSong = params => getSongRequest({
    url: '/cloudsearch',
    params
})
export const getUrl = params => getSongRequest({
    url: "/song/url",
    params
})
