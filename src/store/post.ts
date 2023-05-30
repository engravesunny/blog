import { defineStore } from "pinia";

import { PostSingle } from "../types";

interface PostState {
    postInfo: PostSingle[],
    latestPosts: string[]
}

export const post = defineStore('post', {
    state: (): PostState => ({
        postInfo: [],
        latestPosts: []
    }),
    actions: {
        addPost(info: PostSingle) {
            this.postInfo.push(info)
        },
        setLatestPost(posts: string[]) {
            this.latestPosts = posts
        },
        checkLatestPosts() {
            return this.latestPosts.length !== 0
        },
        getLatestPost(): string[] {
            return this.latestPosts
        },
        checkPost(name: string) {

            return this.postInfo.some(item => item.name === name)
        },
        getPost(name: string): PostSingle {
            let temp: PostSingle = {
                category: '',
                tag: [],
                date: '',
                name: ''
            }
            this.postInfo.map(item => {
                if (item.name === name) {
                    temp = item
                }
            })
            return temp
        }
    }
})
