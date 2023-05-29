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

let postList: string[] = []

export const getArchivePosts = async (year: string, month: string) => {
    postList.length = 0
    if (archiveStore.checkMonth(year, month)) {
        console.log('通过测试');
        const temp = archiveStore.getArchivePosts(year, month)
        console.log(temp);

        return temp
    } else {
        const date = year + '-' + month
        const res = await getDatePost(date)
        postList = [...res]
        const year_x: string = date.split('-')[0]
        archiveStore.addArchive(year_x, {
            month: date.split('-')[1],
            posts: [...postList]
        })
        const test1 = archiveStore.archiveInfo
        console.log('测试', test1);

        return postList
    }
}

