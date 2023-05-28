import { post } from "../store/post";
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


export const getPostInfo = async (postName: string): Promise<PostSingle> => {
    // 检查状态管理是否以加载了对应文章
    if (postStore.checkPost(postName)) {
        // 获取状态管理中的文章信息
        return postStore.getPost(postName) as PostSingle
    } else {
        const category = await getCategory(postName)
        const tag = await getTag(postName)
        const date = await getDateInfo(postName)
        const info: PostSingle = {
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
