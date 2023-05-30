import { post } from '../store/post';
const postStore = post()
import { getDirNames, getAllFileInfo } from "../api/postApi";
import { PostSingle } from "../types";
// 请求获取分类信息
let getCategory = async (postName: string) => {
    const { data: categoryName } = await getDirNames({
        dir_path: './posts/postVirtual/' + postName + '/category'
    })
    return categoryName.data.dir_names[0]
}
// 请求获取标签信息
let getTag = async (postName: string) => {
    const { data: tagList } = await getDirNames({
        dir_path: './posts/postVirtual/' + postName + '/tag'
    })
    const list = tagList.data.dir_names as string[]
    return list
}
// 请求获取日期信息
let getDateInfo = async (postName: string) => {
    const { data: date_info } = await getAllFileInfo({
        dir_path: './posts/postVirtual/' + postName + '/'
    })
    return date_info.data.files[0].mod_time
}

// 请求获取文章封面信息
let getPostImg = async (postName: string) => {
    const { data: post_info } = await getDirNames({
        dir_path: './posts/postVirtual/' + postName + '/'
    })
    const postImg = post_info.data.dir_names[2] as string
    return postImg
}


export const getPostInfo = async (postName: string): Promise<PostSingle> => {

    if (postStore.checkPost(postName)) {
        return postStore.getPost(postName) as PostSingle
    } else {
        const category = await getCategory(postName)
        const tag = await getTag(postName)
        const date = await getDateInfo(postName)
        const postImg = await getPostImg(postName)
        const info: PostSingle = {
            postImg,
            category,
            tag,
            date,
            name: postName
        }
        // 存入状态管理
        postStore.addPost(info)
        return info
    }
}
