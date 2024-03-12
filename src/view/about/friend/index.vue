<template>
    <div class="test">
        <FlowList ref="FlowListRef" :item-width="itemWidth" :list="curRenderList"
            @handleUpdateItemWidth="handleUpdateItemWidth" @handleLoadMore="handleLoad">
            <template #item="{ item, listInstance, handleLoad }">
                <div class="img-container">
                    <img :src="item.imgUrl" :alt="item.imgUrl" @load="handleLoad">
                </div>
            </template>
        </FlowList>
    </div>
</template>

<script setup lang="ts">
import FlowList from '../../../components/FlowList/index.vue'
import { ImgItem, imgs } from '@/constant/imgs';

const curRenderList = ref<any[]>([])
const curPage = ref(-1)
const pageSize = ref(20)
const FlowListRef = ref()

const itemWidth = ref(19)
const handleUpdateItemWidth = (newWidth: number) => {
    itemWidth.value = newWidth
}

let getMore = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(imgs.slice(curPage.value * pageSize.value, curPage.value * pageSize.value + pageSize.value))
        }, 500);
    })
}

const handleLoad = async () => {
    curPage.value = curPage.value + 1;
    const res = await getMore() as ImgItem[];
    if (res.length < pageSize.value) {
        FlowListRef.value.handleFinished()
    }
    FlowListRef.value.handleLoadMore(res)
}

</script>

<style lang="less" scoped>
.img-container {
    border: 5px solid #fff;
}
</style>
