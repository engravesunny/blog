import { defineStore } from "pinia";
import { TagSingle } from "../types";

interface TagState {
    tagInfo: TagSingle[]
}

export const tag = defineStore('tag', {
    state: (): TagState => ({
        tagInfo: []
    }),
    getters: {
    },
    actions: {
        setState(info: TagSingle[]) {
            this.tagInfo = info
        },
        getTagPost(name: string) {
            this.tagInfo.map(item => {
                if (item.name === name) {
                    return item.posts
                }
            })
        }
    },
})