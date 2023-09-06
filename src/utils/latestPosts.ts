import { getDirNames } from "../api/postApi";
import { post } from "../store/post";
const postStore = post();

export const getLatestPostInfo = async () => {
  if (!postStore.checkLatestPosts()) {
    const { data: arList } = await getDirNames({
      dir_path: "./posts/postVirtual",
    });
    const leftArList: string[] = [];
    for (let i = 0; i < 15; i++) {
      if (arList.data.dir_names[i]) {
        leftArList.push(
          arList.data.dir_names[arList.data.dir_names.length - i - 1]
        );
      }
    }
    postStore.setLatestPost(leftArList);
  }
  return postStore.getLatestPost();
};
