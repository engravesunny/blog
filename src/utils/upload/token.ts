import CryptoJS from 'crypto-js';

let AccessKey = import.meta.env.VITE_QINIU_ACCESS_TOKEN;
let SKey = import.meta.env.VITE_QINIU_SECRET_TOKEN;
const bucket = "kecatpostimage";

const getPutPolicy = (bucket: string, key: string) => {
  return JSON.stringify({
    scope: bucket + ":" + key,
    deadline: new Date().getTime() + 3600,
  });
};
// 上传凭证
export const getToken = (key: string = '/test/test.txt') => {
  let putPolicy = getPutPolicy(bucket, key);
  let encodedPutPolicy = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(putPolicy)).replace(/\+/g, '-').replace(/\//g, '_');
  let encodedSign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(encodedPutPolicy, SKey)).replace(/\+/g, '-').replace(/\//g, '_'); // 第一个参数为加密字符串，第二个参数为公共秘钥
  return AccessKey + ':' + encodedSign + ':' + encodedPutPolicy
}