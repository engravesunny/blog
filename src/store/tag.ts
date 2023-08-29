import { defineStore } from "pinia";
import { PostSingle, TagSingle } from "../types";

interface TagState {
    tagInfo: TagSingle[],
    tags:string[]
}

export const tag = defineStore('tag', {
    state: (): TagState => ({
        tagInfo: [],
        tags:[]
    }),
    getters: {
    },
    actions: {
        setState(info: TagSingle[]) {
            this.tagInfo = info
        },
        checkTag(tag: string) {
            return this.tagInfo.some(item => item.name === tag)
        },
        getTagInfo(tag: string) {
            let temp: TagSingle = {
                posts: [],
                num: 0,
                name: ''
            }
            this.tagInfo.map(item => {
                if (item.name === tag) {
                    temp = item
                }
            })
            return temp
        },
        getTagPost(name: string) {
            let postList: PostSingle[] = []
            this.tagInfo.map(item => {
                if (item.name === name) {
                    postList = item.posts
                }
            })
            return postList
        },
        addTagInfo(tagInfo: TagSingle) {
            this.tagInfo.push(tagInfo)
        },
        getAllTagInfo() {
            return this.tagInfo
        }
    },
})