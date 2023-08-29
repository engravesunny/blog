import { tag } from '../store/tag';
const tagStore = tag()

export const getTagPost = async (tag: string) => {
    return tagStore.getTagPost(tag)
}

export const getAllTagInfo = () => {
    return tagStore.getAllTagInfo();
}

export const getTagInfo = (tag:string) => {
    return tagStore.getTagInfo(tag);
}
