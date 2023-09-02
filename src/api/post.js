import axios from "axios";

const getPostRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
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