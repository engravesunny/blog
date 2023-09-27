import { uploads } from "@/api/postApi";
import getPOSTJSON from "@/api/getPostJson";
import { PostSingle } from "@/types";

export const setTopArticle = async (name: string) => {
  try {
    const { data: jsonData } = await getPOSTJSON();
    const postInfo = jsonData.postInfo as PostSingle[];
    postInfo.forEach((item) => {
      if (item.name === name) {
        item.isTop = !item.isTop;
      }
    });
    const updatedJson = {
      postInfo: postInfo,
      tagInfo: jsonData.tagInfo,
    };
    const newJson = JSON.stringify(updatedJson);
    const file = new File([newJson], "POSTINFO.json", {
      type: "application/json",
    });
    const { data: jsonStatus } = await uploads({
      dir_path: `../../serve/blogServe/public/JSON/`,
      file,
    });
    if (jsonStatus.code === 0) {
      ElMessage.success("修改成功");
    } else {
      ElMessage.error("修改失败");
    }
  } catch (error) {
    ElMessage.error("内部错误");
  }
};
