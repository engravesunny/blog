import { getPOSTJSON } from "@/api/getPostJson";
import { formatDateTime } from "./dateFormat";
import removeFileExtension from "@/utils/fileTrueName";
import { ElMessage } from "element-plus";
import { uploads } from "@/api/postApi";
import { uploadFile } from "@/utils/upload";

export const updateJSON = async (
  categoryName,
  tagNames,
  postImg,
  nowTime,
  file_name,
  post_url,
  cover_url
) => {
  try {
    const { data: currentJson } = await getPOSTJSON();
    const postItem = {
      postImg: postImg + ".webp",
      category: categoryName,
      tag: tagNames,
      date: formatDateTime(nowTime),
      name: removeFileExtension(file_name),
      post_url,
      cover_url,
    };
    let addTag = (tag) => {
      return currentJson.tagInfo?.some((item, index, arr) => {
        if (item.name === tag) {
          currentJson.tagInfo[index].posts.unshift(postItem);
          currentJson.tagInfo[index].num++;
          return true;
        }
        return false;
      });
    };
    currentJson.postInfo.unshift(postItem);
    for (let tag of tagNames) {
      if (!addTag(tag)) {
        const tagInfoItem = {
          num: 1,
          name: tag,
          posts: [postItem],
        };
        currentJson.tagInfo.unshift(tagInfoItem);
      }
    }
    const newJson = JSON.stringify(currentJson);
    const file = new File([newJson], "POSTINFO.json", {
      type: "application/json",
    });
    // TODO 将json文件也转移到存储桶中
    // const { data: jsonStatus } = await uploads({
    //   dir_path: `../../serve/blogServe/public/JSON/`,
    //   file,
    // });
    // if (jsonStatus.code === 0) return true;
    // else {
    //   return false;
    // }
    await uploadFile(file, "postJSON/", "postJSON.json");
    return true;
  } catch (error) {
    ElMessage.error(error.message);
    return false;
  }
};
