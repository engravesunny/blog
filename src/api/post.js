import axios from "axios";

const getPostRequest = axios.create({
    baseURL:'http://kecat.top/'
})

const getPost = data=>getPostRequest({
    method:'GET',
    url:'/post/' + data
})
export default getPost