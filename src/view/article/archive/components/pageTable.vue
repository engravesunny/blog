<template>
    <div class="pageTable">
        <div v-if="curPage > 0" class="left iconfont" @click="toPage(curPage - 1)">&#xe658;</div>
        <div class="cube" @click="toPage(item === '...' ? item : item - 1)" :class="{ active: item === curPage + 1 }"
            v-for="item in  cubeList " :key="item">
            {{ item }}
        </div>
        <div @click="toPage(curPage + 1)" v-if="curPage < cubeList.length - 1" class="right iconfont">&#xe659;</div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import PubSub from 'pubsub-js';
const props = defineProps({
    pageSize: {
        type: Number,
        default: 1
    },
    curPage: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 1
    }
})
const emits = defineEmits(['toPage'])

const cubeList = computed(() => {
    let num = 1
    if (props.total % props.pageSize === 0) {
        num = props.total / props.pageSize
    } else {
        num = (props.total / props.pageSize) + 1
    }
    const res = []
    for (let i = 1; i < num; i++) {
        res.push(i)
    }
    // [1,2,3,4,5]
    const cur = props.curPage
    if (res[cur + 3]) {
        res.splice(cur + 2, res.length - cur - 1 - 2, '...')
    }
    if (res[cur - 3] || res[cur - 3] === 0) {
        res.splice(1, cur - 2, '...')
    }
    return res
})

const toPage = (pageNum) => {
    if (pageNum === '...') return
    else {
        PubSub.publish('toTop')
        emits('toPage', pageNum)
    }
}

onMounted(() => {

})

</script>

<style lang="less" scoped>
.pageTable {
    min-height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .cube,
    .left,
    .right {
        margin: 0 5px;
        width: 24px;
        height: 24px;
        line-height: 27px;
        text-align: center;
        font-size: 15.5px;
        cursor: pointer;
        border-radius: 3px;
        color: #a0a0a0;
    }

    .left,
    .right {
        font-size: 24px;
        font-weight: 700;
    }

    .active {
        background-color: var(--theme-color);
        color: #fff;
    }
}
</style>