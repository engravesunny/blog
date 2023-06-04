import axios from "axios"
import { myInfo, secretKey } from '../constant/index'
import { computedSha256 } from "../utils/computedSHA256"

const data = myInfo

const baseURL = 'https://v6-open.51.la'
const request = axios.create({
    baseURL,
})

export const getTraffic = () => {
    data.timestamp = Date.now()
    data.sign = computedSha256(`accessKey=${data.accessKey}&nonce=${data.nonce}&secretKey=${secretKey}&timestamp=${data.timestamp}`)
    return request({
        method: 'post',
        url: '/open/overview/get',
        data
    })
}


