import axios from "axios";

const getRandomWord = axios.create({
    baseURL:'https://v1.hitokoto.cn/'
})

const getWord = ()=>getRandomWord({
    method:'GET',
    url:''
})
export default getWord


