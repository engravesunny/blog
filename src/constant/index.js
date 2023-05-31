import { computedSha256 } from '../utils/computedSHA256'

export const baseURL = 'https://cdn.jsdelivr.net/gh/engravesunny/CDN'
export const baseURL_PC = 'https://cdn.statically.io/gh/engravesunny/CDN/main'
export const imgBaseURL = 'https://kecat.top/images/'
export const username = 'engravesunny'
export const postImgUrl_PC = 'https://cdn.statically.io/gh/engravesunny/CDN/main/image/postImg'
export const postImgUrl = 'https://cdn.jsdelivr.net/gh/engravesunny/CDN/image/postImg'

const maskId = "K3xkYhOJwAanmd6k"
const accessKey = "pHbhn8iryYNdInZnez9lgc1zlKYby2U7"
const nonce = "1234"
const timestamp = Date.now()
const secretKey = '8ve4IXsaeDQeS1z389gi2bT7AdBgy7WH'
const string = `accessKey=${accessKey}&nonce=${nonce}&secretKey=${secretKey}&timestamp=${timestamp}`
console.log(string);
const sign = computedSha256(string)

export const myInfo = {
    maskId,
    accessKey,
    nonce,
    timestamp,
    sign
}