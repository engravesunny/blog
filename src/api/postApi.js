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

// 获取目标目录全部文件夹
export const getDirNames = params => request({
    url:'/getDirNames',
    params
})

// 获取目标目录全部文件
export const getAllFileInfo = params => request({
    url:"/getAllFileInfo",
    params
})

// 新建文件夹
export const createDir = data => request({
    url:'/createDir',
    method:'post',
    data
})



