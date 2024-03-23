import { getToken } from "./token";
import * as qiniu from 'qiniu-js';

const uploadPercentage = ref()

/**
 * 
 * @param { File } file 
 * @param { string } dir 
 * @param { string } name 
 * @returns { Promise<any> }
 */
const uploadFile = (file: any = null, dir: string = '/test', name: string = 'test.txt') => {
  return new Promise((resolve, reject) => {
    let key = dir + name;
    let token = getToken(key);
    const observable = qiniu.upload(file, key, token, {

    }, {
      useCdnDomain: true,
      region: qiniu.region.z2
    })
    observable.subscribe({
      next(res) {
        // 更新进度
        uploadPercentage.value = Math.ceil(res.total.percent);
      },
      error(err) {
        reject(err.message)
      },
      complete(res) {
        resolve('https://www.kecat.top/' + res.key)
        uploadPercentage.value = 0;
      }
    }) // 上传开始
  })
}

export { uploadFile }
export { getImageUrl } from './getUrl'