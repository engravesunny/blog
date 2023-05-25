import axios from "axios"
import { myInfo } from '../constant/index'

const data = myInfo

const baseURL = 'https://v6-open.51.la'
const request = axios.create({
    baseURL,
})

export const getTraffic = () => request({
    method: 'post',
    url: '/open/overview/get',
    data
})


