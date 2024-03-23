<template>
  <div class="leftMain">
    <!-- 置顶文章 -->
    <template v-if="curPage === 0">
      <big-card
        v-for="(post, index) in topList"
        :post-img="post.postImg"
        :right="!!(index % 2) || !!(topList.length % 2)"
        :key="post.name"
        :isTop="true"
        :category="post.category"
        :tags="post.tag"
        :date="post.date"
        :title="post.name"
        :cover-key="post.cover_url"
        :post-url="post.post_url"
      ></big-card>
    </template>
    <!-- 置顶文章 -->
    <big-card
      v-for="(post, index) in curList"
      :post-img="post.postImg"
      :right="!!(index % 2)"
      :key="post.name"
      :category="post.category"
      :tags="post.tag"
      :date="post.date"
      :title="post.name"
      :cover-key="post.cover_url"
      :post-url="post.post_url"
    ></big-card>
    <div class="page-table">
      <page-table
        @to-page="toPage"
        :page-size="pageSize"
        :total="totalList.length"
        :cur-page="curPage"
      ></page-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import pageTable from "@/view/article/archive/components/pageTable.vue";
import bigCard from "@/components/bigCard.vue";
import { post } from "@/store/post";
import { PostSingle } from "../../../types/index";
// import postInfoTest from '../../../constant/POSTINFO.js'  // 测试文章数据
const postStore = post();

const curPage = ref(0);

// 真实文章数据
const totalList = postStore.$state.postInfo.sort((a: any, b: any) => {
  const timea = new Date(a.date).getTime();
  const timeb = new Date(b.date).getTime();
  return timeb - timea;
});
// // 测试文章数据
// const totalList = postInfoTest.postInfo.sort((a: any, b: any) => {
//     const timea = new Date(a.date).getTime();
//     const timeb = new Date(b.date).getTime();
//     return timeb - timea;
// })
// 置顶文章列表
const topList = computed(() => {
  return totalList.filter((item) => item.isTop);
});
const restTotalList = computed(() => {
  return totalList.filter((item) => !item.isTop);
});
const pageSize = 7;
const curList = computed(() => {
  if (curPage.value === 0) {
    const cueSize = pageSize - topList.value.length;
    return restTotalList.value.slice(
      curPage.value * cueSize,
      curPage.value * cueSize + cueSize
    ) as PostSingle[];
  } else {
    return restTotalList.value.slice(
      curPage.value * pageSize,
      curPage.value * pageSize + pageSize
    ) as PostSingle[];
  }
});

const toPage = (page: number) => {
  curPage.value = page;
};
</script>

<style lang="less" scoped>
.leftMain {
  width: 100%;
}

.page-table {
  margin: auto;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  width: 70%;
  height: 40px;
  background-color: skyblue;
}
</style>
