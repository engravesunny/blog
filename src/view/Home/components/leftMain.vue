<template>
    <div class="leftMain">
        <big-card v-for="(post, index) in curList" :post-img="post.postImg" :right="!!(index % 2)" :key="post.name"
            :category="post.category" :tags="post.tag" :date="post.date" :title="post.name"></big-card>

        <div class="page-table">
            <page-table @to-page="toPage" :page-size="pageSize" :total="totalList.length" :cur-page="curPage"></page-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import pageTable from '@/view/article/archive/components/pageTable.vue';
import bigCard from '@/components/bigCard.vue';
import { post } from '@/store/post';
import { PostSingle } from '../../../types/index';
const postStore = post();

const curPage = ref(0);
const totalList = postStore.$state.postInfo.sort((a: any, b: any) => {
    const timea = new Date(a.date).getTime();
    const timeb = new Date(b.date).getTime();
    return timeb - timea;
});
const pageSize = 7;
const curList = computed(() => {
    return totalList.slice(curPage.value * pageSize, curPage.value * pageSize + pageSize) as PostSingle[];
})

const toPage = (page: number) => {
    curPage.value = page;
    const height = window.innerHeight;
    setTimeout(() => {
        window.scrollTo(0, height)
    })
}

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