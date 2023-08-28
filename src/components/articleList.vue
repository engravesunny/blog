<template>
    <div class="articleList" v-loading="!articleList.length">
        <ul>
            <li v-for="item in articleList" :key="item">
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

</script>

<style lang="less" scoped>
.articleList {
    width: 100%;
    min-height: 400px;

    @media screen and (min-width:300px) and (max-width:500px) {
        padding: 0;
    }

    padding:0;

    ul {
        padding: 20px;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: repeat(2, 45%);
        gap: 30px;
        justify-items: stretch;
        justify-content: center;
        @media screen and (min-width:300px) and (max-width:1000px) {
            grid-template-columns: 100%;
            padding: 10px;
        }
    }
}
</style>