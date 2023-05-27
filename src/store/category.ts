import { defineStore } from 'pinia'
import { CategorySingle } from '../types'

interface CategoryState {
    categoryInfo: CategorySingle[]
}

export const category = defineStore('category', {
    state: (): CategoryState => ({
        categoryInfo: []
    }),
    getters: {
    },
    actions: {
        setState(info: CategorySingle[]) {
            this.categoryInfo = info
        },
        getCategoryPost(name: string) {
            this.categoryInfo.map(item => {
                if (item.name === name) {
                    return item.posts
                }
            })
        }
    },
})