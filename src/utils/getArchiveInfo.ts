import { getDirNames } from "../api/postApi"
import { archive } from "../store/archive";
const archiveStore = archive()

let getDatePost = async (date: string) => {
    const { data: postListInfo } = await getDirNames({
        dir_path: './posts/date/' + date
    })
    const postList = postListInfo.data.dir_names as string[]
    postList.reverse()
    return postList
}

let postList: string[] = []

export const getArchivePosts = async (year: string, month: string) => {
    postList.length = 0
    if (archiveStore.checkMonth(year, month)) {
        const temp = archiveStore.getArchivePosts(year, month)
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
        return postList
    }
}