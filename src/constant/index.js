import { computedSha256 } from '../utils/computedSHA256'

export const baseURL = 'https://cdn.jsdelivr.net/gh/engravesunny/CDN'
export const imgBaseURL = 'http://kecat.top/images/'
export const token = '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'
export const username = 'engravesunny'

const maskId = "K3xkYhOJwAanmd6k"
const accessKey = "veBH4TLI9aMJyC50ArJYLVI9VGlpZme7"
const nonce = "1234"
const timestamp = Date.now()
const secretKey = 'noIGs850AX56dV2OZ0T8nEUX5TEr5pQs'
const string = `accessKey=${accessKey}&nonce={nonce}&secretKey=${secretKey}&timestamp=${timestamp}`

const sign = computedSha256(string)

export const myInfo = {
    maskId,
    accessKey,
    nonce,
    timestamp,
    sign
}