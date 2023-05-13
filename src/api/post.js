import axios from "axios";

const getPostRequest = axios.create({
    baseURL: '/api'
})

const getPost = data => getPostRequest({
    method: 'GET',
    url: '/post/' + data
})
export default getPost