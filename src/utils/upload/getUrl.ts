import * as qiniu from 'qiniu-js'

let domain = import.meta.env.VITE_QINIU_DOMAIN

export const getImageUrl = (quality: number, key: string) => {
  return qiniu.imageMogr2({ quality }, key, domain)
}