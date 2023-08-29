import axios from "axios";

const getPostRequest = axios.create({
    baseURL: 'https://kecat.top/' //不跨域
    // baseURL: '/post' // 跨域开发用
})

const getPost = data => getPostRequest({
    method: 'GET',
    url: '/post/' + data
})

export const getGithubToken = () => getPostRequest({
    method: 'GET',
    url: '/github_token.txt'
})
export default getPost