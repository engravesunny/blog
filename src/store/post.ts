import { defineStore } from "pinia";

import { PostSingle } from '../types/index';

interface PostState {
    postInfo: PostSingle[]
}

export const post = defineStore('post', {
    state: (): PostState => ({
        postInfo: []
    }),
    getters:{
        latestPostList() {
            const postList:PostSingle[] = this.postInfo;
            postList.sort((a:PostSingle, b:PostSingle) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            })
            return postList.slice(0,5);
        }
    },
    actions: {
        addPost(info: PostSingle) {
            this.postInfo.push(info);
        },
        checkPost(name: string) {
            return this.postInfo.some((item:PostSingle) => item.name === name);
        },
        getPost(name: string): PostSingle {
            let temp: PostSingle = {
                category: '',
                tag: [],
                date: '',
                name: '',
                postImg:''
            }
            this.postInfo.map((item:PostSingle) => {
                if (item.name === name) {
                    temp = item;
                }
            })
            return temp;
        }
    }
})
