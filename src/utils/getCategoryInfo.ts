import { category } from '@/store/category'
import { post } from '@/store/post'
import { PostSingle } from '@/types'

const categoryStore = category()
const postStore = post()

export const toStoreCategoryInfo = () => {
    if(categoryStore.$state.categoryInfo.length){
        // 已经存过了
        return
    }
    const postInfo = postStore.$state.postInfo;
    const map = new Map();
    postInfo.forEach(post => {
        if(!map.has(post.category)){
            map.set(post.category,[]);
        }
        const categoryInfo = map.get(post.category) as PostSingle[];
        categoryInfo.push(post)
    })
    map.forEach((item, index) => {
        categoryStore.addCategoryInfo({
            posts:item,
            name:index,
            num:item.length
        })
    })
}

export const getCategoryPost = (name:string) => {
    console.log(categoryStore.$state);
    let res = categoryStore.getCategoryPost(name) as PostSingle[]
    return res;
}

export const getCategoryList = () => {
    return categoryStore.getCategoryList()
}