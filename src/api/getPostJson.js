import axios from "axios";
import { showLoadingProgress } from "@/utils/showLoadingProgress";
const getPostRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    onDownloadProgress: (progressEvent) => {
        // 对原生进度事件的处理
        let num = progressEvent.loaded / progressEvent.total * 100 // 计算进度
        const loadingText = '进度：' + num + '%'
        console.log('%c [ loadingText ]-9', 'font-size:13px; background:pink; color:#bf2c9f;', loadingText)
    }
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