import { archive } from "../store/archive";
import { post } from "../store/post";
import { ArchiveSingle } from "@/types";
import pinia from "@/store/index";
import { ArchiveMonthSingle } from "../types/index";
const archiveStore = archive(pinia);
const postStore = post(pinia);

let postList: string[] = [];

export const getArchivePosts = (year: string, month: string) => {
  try {
    postList.length = 0;
    if (archiveStore.checkMonth(year, month)) {
      const temp = archiveStore.getArchivePosts(year, month);
      return temp;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getArchiveInfos = () => {
  const posts = postStore.$state.postInfo;
  posts.sort((a: any, b: any) => {
    const timea = new Date(a.date).getTime();
    const timeb = new Date(b.date).getTime();
    return timea - timeb;
  });
  const archiveInfo: ArchiveSingle[] = [];
  let tempYear = posts[0].date.split("-")[0];
  let tempMonth = posts[0].date.split("-")[1];
  let tempPostList: string[] = [];
  const archiveMonthList: ArchiveMonthSingle[] = [];
  posts.forEach((postItem) => {
    const year = postItem.date.split("-")[0];
    const month = postItem.date.split("-")[1];
    const postName = postItem.name;

    if (tempYear === year) {
      if (tempMonth === month) {
        tempPostList.push(postName);
      } else {
        archiveMonthList.push({
          month: tempMonth,
          posts: [...tempPostList],
        });
        tempMonth = month;
        tempPostList.length = 0;
        tempPostList.push(postName);
      }
    } else {
      archiveMonthList.push({
        month: tempMonth,
        posts: [...tempPostList],
      });
      archiveInfo.push({
        year: tempYear,
        monthInfos: [...archiveMonthList],
      });
      archiveMonthList.length = 0;
      tempYear = year;
      tempMonth = month;
      tempPostList.length = 0;
      tempPostList.push(postName);
    }
  });
  archiveMonthList.push({
    month: tempMonth,
    posts: [...tempPostList],
  });
  archiveInfo.push({
    year: tempYear,
    monthInfos: [...archiveMonthList],
  });
  archiveStore.setState(archiveInfo);
};
