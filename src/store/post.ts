import { defineStore } from "pinia";

import { PostSingle } from "../types";

interface PostState {
    postInfo: PostSingle[]
}

export const post = defineStore('post', {
    state: (): PostState => ({
        postInfo: []
    }),
    actions: {
        addPost(info: PostSingle) {
            this.postInfo.push(info)
        },
        checkPost(name: string) {
            return this.postInfo.some(item => {
                return item.name = name
            })
        },
        getPost(name: string): PostSingle | boolean {
            this.postInfo.map(item => {
                if (item.name === name) {
                    return item
                }
            })
            return false
        }
    }
})
