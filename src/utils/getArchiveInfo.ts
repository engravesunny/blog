import { getDirNames } from "../api/postApi"
import { archive } from "../store/archive";
import { post } from "../store/post"
import { ArchiveSingle } from "@/types";
import pinia from '@/store/index'
import { ArchiveMonthSingle } from '../types/index';
const archiveStore = archive(pinia)
const postStore = post(pinia)

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


export const getArchiveInfos = () => {
    const posts = postStore.$state.postInfo
    posts.sort((a,b) => {
        const timea = new Date(a.date).getTime()
        const timeb = new Date(b.date).getTime()
        return timea - timeb;
    });
    console.log(posts);
    const archiveInfo: ArchiveSingle[] = []
    let tempYear = posts[0].date.split('-')[0];
    let tempMonth = posts[0].date.split('-')[1];
    let tempPostList:string[] = [];
    const archiveMonthList : ArchiveMonthSingle[] = []
    posts.forEach(postItem => {
        const year = postItem.date.split('-')[0];
        const month = postItem.date.split('-')[1];
        const postName = postItem.name;
        
        if(tempYear === year){
            if(tempMonth === month) {
                tempPostList.push(postName)
            } else {
                console.log(tempMonth);
                archiveMonthList.push({
                    month:tempMonth,
                    posts:[...tempPostList]
                })
                tempMonth = month;
                tempPostList.length = 0;
                tempPostList.push(postName);
            }
        } else {
            archiveMonthList.push({
                month:tempMonth,
                posts:[...tempPostList]
            })
            archiveInfo.push({
                year:tempYear,
                monthInfos:[...archiveMonthList]
            })
            archiveMonthList.length = 0;
            tempYear = year;
            tempMonth = month;
            tempPostList.length = 0;
            tempPostList.push(postName);
        }
    })
    archiveMonthList.push({
        month:tempMonth,
        posts:[...tempPostList]
    })
    archiveInfo.push({
        year:tempYear,
        monthInfos:[...archiveMonthList]
    })
    archiveStore.setState(archiveInfo)
}