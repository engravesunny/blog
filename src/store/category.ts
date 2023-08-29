import { defineStore } from 'pinia'
import { CategorySingle, PostSingle } from '../types'

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
        getCategoryPost(name: string):PostSingle[] {
            let res: PostSingle[] = []
            this.categoryInfo.forEach(item => {
                if (item.name === name) {
                    res = item.posts
                }
            })
            return res
        },
        addCategoryInfo(info:CategorySingle) {
            this.categoryInfo.push(info);
        },
        getCategoryList() {
            let res : any[] = []
            this.categoryInfo.forEach(item => {
                res.push({
                    name:item.name,
                    value:item.num
                });
            })
            return res;
        }
    },
})