import request from "../utils/request";

export const uploads = data => request({
    url:"/uploadFile",
    method:'post',
    data
})

export const del = data => request({
    url:"/deleteFile",
    method:'post',
    data
})