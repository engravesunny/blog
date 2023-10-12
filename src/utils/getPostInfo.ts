import { post } from "../store/post";
const postStore = post();
import { PostSingle } from "../types";

export const getPostInfo = (postName: string): PostSingle => {
    return postStore.getPost(postName) as PostSingle;
};
