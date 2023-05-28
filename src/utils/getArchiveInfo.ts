import { getDirNames } from "../api/postApi"
import { ArchiveSingle, ArchiveMonthSingle } from "../types"
import { getPostInfo } from "./getPostInfo"
import { PostSingle } from '../types/index';
import { archive } from "../store/archive";
const archiveStore = archive()

let getDatePost = async (date: string) => {
    const { data: postListInfo } = await getDirNames({
        dir_path: './posts/date/' + date
    })
    return postListInfo.data.dir_names as string[]
}

const monthItem: ArchiveMonthSingle = {
    month: '',
    posts: []
}
const postList: PostSingle[] = []

export const getArchivePosts = async (year: string, month: string) => {
    postList.length = 0
    let temp: PostSingle[] = []
    if (archiveStore.checkMonth(year, month)) {
        return archiveStore.getArchivePosts(year, month)
    } else {
        const date = year + '-' + month
        const res = await getDatePost(date)
        const promises = res.map(name => getPostInfo(name))
        for await (let res of promises) {
            postList.push(res)
        }
        monthItem.month = date.split('-')[1]
        monthItem.posts = postList
        const year_x: string = date.split('-')[0]
        archiveStore.addArchive(year_x, monthItem)
        return postList
    }
}

