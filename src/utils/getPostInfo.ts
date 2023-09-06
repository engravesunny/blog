import { post } from "../store/post";
const postStore = post();
import { PostSingle } from "../types";

export const getPostInfo = async (postName: string): Promise<PostSingle> => {
  if (postStore.checkPost(postName)) {
    return postStore.getPost(postName) as PostSingle;
  } else {
    ElMessage.warning("加载失败，请刷新网页");
    return {} as PostSingle;
  }
};
