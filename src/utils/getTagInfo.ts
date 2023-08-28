import { getDirNames } from "../api/postApi";
import { getPostInfo } from "./getPostInfo";
import { PostSingle, TagSingle } from '../types/index';
import { tag } from '../store/tag';
const tagStore = tag()
// 获取标签列表
const getTags = async () => {
    const { data: tags } = await getDirNames({
        dir_path: './posts/tag'
    })
    const list = tags.data.dir_names as string[]
    return list
}
// 获取标签数量
export const getTagCount = async (tag: string) => {
    return getDirNames({
        dir_path: `./posts/tag/${tag}/`
    }).then(res => {
        const { data : tagInfos } = res;
        const list = tagInfos.data.dir_names as string[]
        return {
            num: list.length,
            name: tag
        }
    })
}


// 获取标签数量即包含文章信息
const getTagNum = async (tag: string) => {
    const { data: tagList } = await getDirNames({
        dir_path: `./posts/tag/${tag}/`
    })
    try {
        const postList: PostSingle[] = []
        const listInfo = tagList.data.dir_names as string[]
        const promises = listInfo.map(item => getPostInfo(item))
        for await (const res of promises) {
            postList.push(res)
        }
        const num = tagList.data.dir_names.length as number
        // 存入标签文章信息
        const tagInfo: TagSingle = {
            num,
            name: tag,
            posts: postList
        }
        tagStore.addTagInfo(tagInfo)
        return tagInfo
    } catch (err: any) {
        console.log(tagList, tag);
        console.log(err.message);
    }
}

export const getTagInfo = async (tag: string) => {
    if (tagStore.checkTag(tag)) {
        return tagStore.getTagInfo(tag)
    } else {
        await getTagNum(tag)
        return tagStore.getTagInfo(tag)
    }
}

export const getTagPost = async (tag: string) => {
    if (!tagStore.checkTag(tag)) {
        await getTagNum(tag)
    }
    return tagStore.getTagPost(tag)
}