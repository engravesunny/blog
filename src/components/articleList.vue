<template>
    <div class="articleList" v-loading="!articleList.length">
        <ul>
            <li :style="{ width: `${liWidth}%` }" v-for="item in articleList" :key="item">
                <arCard :postName="item"></arCard>
            </li>
        </ul>
    </div>
</template>

<script setup>
import arCard from './arCard.vue';

const props = defineProps({
    articleList: {
        type: Array,
        default: []
    }
})

let liWidth = ref(45)

onMounted(() => {
    if (document.body.clientWidth <= 1000) {
        liWidth.value = 95
    } else {
        liWidth.value = 45
    }
    PubSub.subscribe('articleListSizeChange', (a, size) => {
        if (size <= 1000) {
            liWidth.value = 95
        } else {
            liWidth.value = 45
        }
    })
})

</script>

<style lang="less" scoped>
.articleList {
    width: 100%;
    min-height: 400px;

    @media screen and (min-width:300px) and (max-width:400px) {
        padding: 0;
    }

    padding:0;

    ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;

        li {
            margin: 10px 0;
            width: 45%;
        }
    }
}
</style>